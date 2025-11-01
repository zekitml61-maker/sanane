'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { getOrderByQRCode, getClientByQRCode, getAllOrders, createOrder, getSubscriptionCapacity, getReadyOrderByClientId, markOrderCollected, getCollectedOrderByClientId, markOrderDelivered } from '@/lib/database';
import { QrCode, Search, Package, User, Calendar, Camera, X, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Html5Qrcode } from 'html5-qrcode';

export default function ScannerPage() {
  const router = useRouter();
  const [qrInput, setQrInput] = useState('');
  const [scannedOrder, setScannedOrder] = useState<any>(null);
  const [error, setError] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scannerReady, setScannerReady] = useState(false);
  const [lastScanned, setLastScanned] = useState('');
  const [redirecting, setRedirecting] = useState(false);
  const hasScannedRef = useRef(false); // Pour éviter les scans multiples
  const isProcessingRef = useRef(false); // Pour éviter les traitements multiples
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);
  const scannerIdRef = useRef('qr-reader');

  useEffect(() => {
    return () => {
      // Cleanup scanner on unmount
      if (html5QrCodeRef.current && isScanning) {
        html5QrCodeRef.current.stop().catch(console.error);
      }
    };
  }, [isScanning]);

  const handleScan = (code?: string) => {
    // Empêcher les appels multiples
    if (isProcessingRef.current) return;
    
    isProcessingRef.current = true;
    
    setError('');
    setScannedOrder(null);
    setRedirecting(false);
    
    const searchCode = (code || qrInput).trim();
    
    // Vérifier si c'est un QR code CLIENT
    if (searchCode.startsWith('CLIENT-')) {
      try {
        const foundClient = getClientByQRCode(searchCode);
        
        if (foundClient) {
            console.log('🔍 Client trouvé:', foundClient.name);
            console.log('📋 Type client:', foundClient.clientType);
            console.log('📋 Abonnement:', foundClient.subscription);
            
            setError('');
            
            // 🚚 PRIORITÉ 1 : Vérifier si ce client a une commande PRÊTE à collecter (le plus urgent !)
            const readyOrder = getReadyOrderByClientId(foundClient.id);
            
            if (readyOrder) {
              // ✅ VALIDATION DE LA COLLECTE
              console.log('🚚 Commande prête trouvée ! Validation collecte...');
              
              const collectedOrderResult = markOrderCollected(readyOrder.id);
              
              if (collectedOrderResult) {
                // Son de succès
                const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                oscillator.frequency.value = 1500;
                gainNode.gain.value = 1.0;
                oscillator.start();
                setTimeout(() => oscillator.stop(), 100);
                
                // Vibration
                if ('vibrate' in navigator) {
                  navigator.vibrate(200);
                }
                
                alert(`✅ Collecte validée !\n\n👤 Client: ${foundClient.name}\n📦 Commande: ${collectedOrderResult.orderNumber}\n🚚 Statut: Collecté`);
                
                setRedirecting(true);
                setTimeout(() => {
                  router.push(`/admin/clients/${foundClient.id}`);
                }, 1500);
              } else {
                setError('❌ Erreur lors de la validation');
              }
              isProcessingRef.current = false;
              return;
            }
            
            // 🚚 PRIORITÉ 2 : Vérifier si ce client a une commande COLLECTÉE (pour livraison)
            const collectedOrder = getCollectedOrderByClientId(foundClient.id);
            
            if (collectedOrder) {
              // ✅ LIVRAISON
              console.log('📦 Commande collectée trouvée ! Livraison...');
              
              const deliveredOrder = markOrderDelivered(collectedOrder.id);
              
              if (deliveredOrder) {
                // Son de succès (tonalité différente pour la livraison)
                const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                oscillator.frequency.value = 2000; // Plus aigu pour livraison
                gainNode.gain.value = 1.0;
                oscillator.start();
                setTimeout(() => oscillator.stop(), 150);
                
                // Vibration double
                if ('vibrate' in navigator) {
                  navigator.vibrate([100, 50, 100]);
                }
                
                alert(`✅ Livraison confirmée !\n\n👤 Client: ${foundClient.name}\n📦 Commande: ${deliveredOrder.orderNumber}\n✅ Statut: Livré\n\nLe client a reçu son linge propre !`);
                
                setRedirecting(true);
                setTimeout(() => {
                  router.push(`/admin/clients/${foundClient.id}`);
                }, 1500);
              } else {
                setError('❌ Erreur lors de la livraison');
              }
              isProcessingRef.current = false;
              return;
            }
            
            // 🎯 SI CLIENT ABONNÉ SANS COMMANDE PRÊTE → Créer ET collecter directement
            if (foundClient.clientType === 'subscription' && foundClient.subscription) {
              console.log('✅ Client abonné sans commande prête. Création ET collecte...');
              
              const basketSize = getSubscriptionCapacity(foundClient.subscription);
              const collectionDate = new Date().toISOString().split('T')[0];
              const deliveryDate = new Date();
              deliveryDate.setDate(deliveryDate.getDate() + 7);

              const newOrder = createOrder({
                clientId: foundClient.id,
                basketSize: basketSize as '15L' | '30L' | '50L',
                collectionDate: collectionDate,
                deliveryDate: deliveryDate.toISOString().split('T')[0],
                items: [
                  {
                    id: `item-${Date.now()}`,
                    type: 'Nettoyage pressing abonnement',
                    description: `Panier ${basketSize} - Abonnement ${foundClient.subscription}`,
                    quantity: 1,
                    price: 0
                  }
                ],
                notes: `📦 Collecte - Scan du ${new Date().toLocaleString('fr-FR')}`
              });

              if (newOrder) {
                console.log('📦 Commande créée:', newOrder.id, 'Status:', newOrder.status);
                
                // Marquer immédiatement comme collecté
                const collectedOrder = markOrderCollected(newOrder.id);
                
                console.log('🚚 Après markOrderCollected:', collectedOrder?.status);
                
                if (collectedOrder) {
                  // Son de succès
                  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
                  const oscillator = audioContext.createOscillator();
                  const gainNode = audioContext.createGain();
                  oscillator.connect(gainNode);
                  gainNode.connect(audioContext.destination);
                  oscillator.frequency.value = 1500;
                  gainNode.gain.value = 1.0;
                  oscillator.start();
                  setTimeout(() => oscillator.stop(), 100);
                  
                  // Vibration
                  if ('vibrate' in navigator) {
                    navigator.vibrate(200);
                  }
                  
                  alert(`✅ Collecte créée et validée !\n\n👤 Client: ${foundClient.name}\n📦 Commande: ${newOrder.orderNumber}\n🎒 Panier: ${basketSize}\n🚚 Statut: ${collectedOrder.status}`);
                  
                  setRedirecting(true);
                  setTimeout(() => {
                    router.push(`/admin/clients/${foundClient.id}`);
                  }, 1500);
                } else {
                  console.error('❌ markOrderCollected a retourné null');
                  alert('❌ Erreur lors de la validation de la collecte');
                }
              } else {
                setError('❌ Erreur lors de la création');
              }
              isProcessingRef.current = false;
              return;
            }
            
            // Client à la carte → juste rediriger
            console.log('ℹ️ Client à la carte, redirection fiche');
            setRedirecting(true);
            router.push(`/admin/clients/${foundClient.id}`);
            return;
        } else {
          setError(`Client non trouvé pour le code: "${searchCode}".`);
          setScannedOrder(null);
          isProcessingRef.current = false;
          return;
        }
      } catch (e) {
        console.error('Erreur recherche client:', e);
        setError(`Erreur lors de la recherche du client: ${e}`);
        isProcessingRef.current = false;
        return;
      }
    }
    
    // Chercher par numéro de commande
    const order = getOrderByQRCode(searchCode);
    
    if (order) {
      setRedirecting(true);
      setScannedOrder(order);
      router.push(`/admin/clients/${order.clientId}`);
    } else {
      setError(`Code non trouvé: "${searchCode}".`);
      setScannedOrder(null);
      isProcessingRef.current = false;
    }
  };

  const startScanner = async () => {
    try {
      setError('');
      setIsScanning(true);
      hasScannedRef.current = false; // Reset le flag
      
      // Vérifier si le navigateur supporte getUserMedia
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        // Essayer les anciennes APIs pour compatibilité
        const getUserMedia = (navigator as any).getUserMedia || 
                            (navigator as any).webkitGetUserMedia || 
                            (navigator as any).mozGetUserMedia;
        
        if (!getUserMedia) {
          throw new Error('❌ Caméra non supportée. Utilisez Chrome, Firefox ou Safari sur HTTPS.');
        }
      }
      
      // Vérifier HTTPS (obligatoire pour la caméra)
      if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
        throw new Error('🔒 La caméra nécessite HTTPS. Utilisez le lien Cloudflare (trycloudflare.com)');
      }

      // Tester d'abord l'accès direct à la caméra
      console.log('Test accès caméra...');
      try {
        const testStream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } 
        });
        console.log('✅ Accès caméra OK');
        testStream.getTracks().forEach(track => track.stop());
      } catch (testErr) {
        console.error('❌ Test caméra échoué:', testErr);
        throw testErr;
      }

      const html5QrCode = new Html5Qrcode(scannerIdRef.current);
      html5QrCodeRef.current = html5QrCode;
      
      const config = { 
        fps: 10, 
        qrbox: { width: 300, height: 300 },
        aspectRatio: 1.0,
        disableFlip: false
      };
      
      // Lister les caméras disponibles
      console.log('Recherche des caméras...');
      const devices = await Html5Qrcode.getCameras();
      console.log('Caméras trouvées:', devices.length, devices);
      
      if (devices && devices.length > 0) {
        // Utiliser l'ID de la caméra directement
        const cameraId = devices[devices.length - 1].id; // Dernière caméra (souvent la caméra arrière)
        console.log('Utilisation caméra ID:', cameraId);
        
        await html5QrCode.start(
          cameraId,
          config,
          (decodedText, decodedResult) => {
            // Éviter les scans multiples
            if (hasScannedRef.current) {
              return;
            }
            
            hasScannedRef.current = true;
            console.log('🎉🎉🎉 QR CODE DÉTECTÉ PAR CAMERA !');
            console.log('Texte décodé:', decodedText);
            console.log('Type:', typeof decodedText);
            console.log('Longueur:', decodedText.length);
            
            // Son bip si disponible - VOLUME MAX
            try {
              const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
              const oscillator = audioContext.createOscillator();
              const gainNode = audioContext.createGain();
              
              oscillator.connect(gainNode);
              gainNode.connect(audioContext.destination);
              
              oscillator.frequency.value = 1500; // Fréquence du bip (très aigü pour être bien audible)
              oscillator.type = 'square'; // Type carré pour un son plus fort
              
              gainNode.gain.setValueAtTime(1.0, audioContext.currentTime); // VOLUME MAX 100%
              gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
              
              oscillator.start(audioContext.currentTime);
              oscillator.stop(audioContext.currentTime + 0.2);
            } catch (err) {
              console.log('Son non disponible');
            }
            
            // Vibration plus forte
            if (navigator.vibrate) {
              navigator.vibrate(200); // Vibration plus longue pour être bien perceptible
            }
            
            // Arrêter immédiatement le scanner
            console.log('🛑 Arrêt du scanner...');
            stopScanner();
            
            // Afficher ce qui a été scanné
            console.log('📝 Mise à jour état avec:', decodedText);
            setLastScanned(decodedText);
            setQrInput(decodedText);
            
            // Déclencher la recherche et redirection AVEC le code scanné
            console.log('🔍 Appel handleScan avec:', decodedText);
            handleScan(decodedText);
          },
          (errorMessage) => {
            // Erreur silencieuse pendant le scan (normal, scan continu)
            // console.log('Scan en cours...', errorMessage);
          }
        );
        
        setScannerReady(true);
      } else {
        throw new Error('Aucune caméra disponible sur cet appareil');
      }
    } catch (err: any) {
      console.error('Erreur complète:', err);
      console.error('Type:', typeof err);
      console.error('Name:', err?.name);
      console.error('Message:', err?.message);
      console.error('String:', String(err));
      
      let errorMsg = 'Impossible d\'accéder à la caméra.';
      
      // Convertir l'erreur en string pour analyse
      const errStr = String(err).toLowerCase();
      const errName = err?.name?.toLowerCase() || '';
      const errMessage = err?.message?.toLowerCase() || '';
      
      if (errName.includes('notallowed') || errName.includes('permission') || 
          errStr.includes('permission') || errStr.includes('denied')) {
        errorMsg = '🚫 Permission refusée. Autorisez l\'accès à la caméra dans votre navigateur.';
      } else if (errName.includes('notfound') || errStr.includes('not found') || 
                 errStr.includes('no camera')) {
        errorMsg = '📷 Aucune caméra détectée sur votre appareil.';
      } else if (errName.includes('notreadable') || errStr.includes('in use') || 
                 errStr.includes('already')) {
        errorMsg = '⚠️ La caméra est utilisée par une autre application.';
      } else if (errStr.includes('https') || errStr.includes('secure')) {
        errorMsg = '🔒 La caméra nécessite HTTPS. Utilisez le lien trycloudflare.com';
      } else if (err?.message) {
        errorMsg = `❌ ${err.message}`;
      } else {
        errorMsg = `❌ Erreur: ${String(err)}. Réessayez ou utilisez la saisie manuelle.`;
      }
      
      setError(errorMsg);
      setIsScanning(false);
      setScannerReady(false);
    }
  };

  const stopScanner = async () => {
    try {
      if (html5QrCodeRef.current && isScanning) {
        console.log('🛑 Arrêt du scanner...');
        await html5QrCodeRef.current.stop();
        html5QrCodeRef.current = null;
      }
    } catch (err) {
      console.error('Erreur lors de l\'arrêt du scanner:', err);
    } finally {
      setIsScanning(false);
      setScannerReady(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      pending: 'bg-yellow-100 text-yellow-800',
      collected: 'bg-blue-100 text-blue-800',
      in_progress: 'bg-orange-100 text-orange-800',
      ready: 'bg-green-100 text-green-800',
      delivered: 'bg-gray-100 text-gray-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    const labels = {
      pending: 'En attente',
      collected: 'Collecté',
      in_progress: 'En cours',
      ready: 'Prêt',
      delivered: 'Livré',
      cancelled: 'Annulé',
    };
    return (
      <span className={`px-4 py-2 rounded-full text-sm font-semibold ${badges[status as keyof typeof badges]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  // Si on est en cours de redirection, afficher un message
  if (redirecting) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">✅ Client trouvé !</h2>
          <p className="text-gray-600">Redirection en cours...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="text-center px-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Scanner Client</h1>
        <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">Scannez le QR code du client</p>
      </div>

      {/* Scanner / Input */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 md:p-8">
        {!isScanning && (
          <>
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="bg-primary-50 p-4 sm:p-6 rounded-2xl">
                <QrCode size={60} className="text-primary-600 sm:w-20 sm:h-20" />
              </div>
            </div>

            <div className="space-y-4">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
              Code QR Client
            </label>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <input
                type="text"
                value={qrInput}
                onChange={(e) => setQrInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleScan()}
                placeholder="CLIENT-XXXXX"
                className="flex-1 px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent text-base sm:text-lg font-mono touch-manipulation"
              />
              <button
                onClick={() => handleScan()}
                className="flex items-center justify-center gap-2 bg-primary-600 text-white px-6 py-4 rounded-xl hover:bg-primary-700 active:bg-primary-800 transition-colors font-bold touch-manipulation active:scale-95 shadow-lg whitespace-nowrap"
              >
                <Search size={20} />
                Rechercher
              </button>
            </div>

            {/* Bouton Scanner avec caméra */}
            <div className="text-center mt-4">
              <button
                onClick={startScanner}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-5 rounded-xl hover:bg-blue-700 active:bg-blue-800 transition-colors font-bold text-base sm:text-lg touch-manipulation active:scale-95 shadow-lg"
              >
                <Camera size={24} className="sm:w-7 sm:h-7" />
                Scanner avec la caméra
              </button>
              <p className="text-xs sm:text-sm text-gray-500 mt-2">📱 Utilisez la caméra de votre appareil</p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Info */}
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm font-medium text-green-900 mb-2">💡 Comment ça marche :</p>
              <ul className="text-xs text-green-800 space-y-1 list-disc list-inside">
                <li><strong>Scannez le QR code CLIENT</strong> (format CLIENT-XXXX)</li>
                <li>Vous accédez directement à la fiche du client</li>
                <li>Vous voyez toutes ses commandes et son historique</li>
                <li>Vous pouvez créer une nouvelle commande pour ce client</li>
              </ul>
            </div>
            </div>
          </div>
        </>
        )}

        {/* Zone de scan caméra */}
        {isScanning && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Scanner activé</h3>
              <button
                onClick={stopScanner}
                className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                <X size={20} />
                Arrêter
              </button>
            </div>

            <div className="relative">
              <div 
                id={scannerIdRef.current}
                className="rounded-lg overflow-hidden border-4 border-green-500 shadow-2xl"
                style={{ minHeight: '400px' }}
              />
              {!scannerReady && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 rounded-lg">
                  <div className="text-white text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                    <p className="font-medium">Initialisation de la caméra...</p>
                  </div>
                </div>
              )}
              {scannerReady && (
                <div className="mt-3 text-center space-y-2">
                  <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full font-medium">
                    <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></span>
                    Caméra active - Prête à scanner
                  </div>
                  {lastScanned && (
                    <div className="bg-yellow-100 border-2 border-yellow-400 text-yellow-900 px-4 py-3 rounded-lg font-mono text-sm">
                      <p className="font-bold mb-1">🎯 Dernier code scanné :</p>
                      <p className="break-all">{lastScanned}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-5">
              <p className="text-blue-900 font-bold text-lg mb-3 text-center">📱 Comment scanner :</p>
              <ul className="text-blue-800 space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="font-bold">1.</span>
                  <span>Tenez votre téléphone <strong>stable</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">2.</span>
                  <span>Placez le QR code dans le <strong>carré vert</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">3.</span>
                  <span>Gardez une <strong>distance de 15-20cm</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">4.</span>
                  <span>Assurez-vous d'avoir un <strong>bon éclairage</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">5.</span>
                  <span>Le scan est <strong>automatique</strong> ⚡</span>
                </li>
              </ul>
              <div className="mt-3 p-3 bg-yellow-100 border border-yellow-300 rounded text-center">
                <p className="text-yellow-900 font-medium text-sm">💡 Astuce : Scannez un QR code de test ci-dessous pour vérifier</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Message de redirection */}
      {redirecting && scannedOrder && (
        <div id="scan-result" className="bg-white rounded-xl shadow-lg border-2 border-green-500 overflow-hidden animate-fadeIn">
          <div className="bg-green-600 text-white px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="bg-white text-green-600 rounded-full p-2">
                <CheckCircle size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">✅ Commande trouvée !</h2>
                <p className="text-green-100 text-sm">Redirection vers la fiche client...</p>
              </div>
            </div>
          </div>
          
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto mb-4"></div>
            <p className="text-lg font-medium text-gray-900 mb-2">Chargement de la fiche client</p>
            <p className="text-gray-600">{scannedOrder.orderNumber} - {scannedOrder.clientName}</p>
          </div>
        </div>
      )}

      {/* Résultat du scan (si pas de redirection) */}
      {scannedOrder && !redirecting && (
        <div id="scan-result" className="bg-white rounded-xl shadow-lg border-2 border-green-500 overflow-hidden animate-fadeIn">
          <div className="bg-green-600 text-white px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="bg-white text-green-600 rounded-full p-2">
                <CheckCircle size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">✅ Commande trouvée !</h2>
                <p className="text-green-100 text-sm">Cliquez ci-dessous pour voir les détails</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Statut et info principale */}
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">N° de commande</p>
                <p className="text-2xl font-bold text-gray-900">{scannedOrder.orderNumber}</p>
                <p className="text-sm text-gray-500 font-mono mt-1">{scannedOrder.qrCode}</p>
              </div>
              {getStatusBadge(scannedOrder.status)}
            </div>

            {/* Informations client */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <User size={20} />
                Informations client
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-500">Nom</p>
                  <p className="font-medium text-gray-900">{scannedOrder.clientName}</p>
                </div>
                <div>
                  <p className="text-gray-500">Téléphone</p>
                  <p className="font-medium text-gray-900">{scannedOrder.clientPhone}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-gray-500">Adresse</p>
                  <p className="font-medium text-gray-900">{scannedOrder.clientAddress}</p>
                </div>
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-blue-700 flex items-center gap-2 mb-1">
                  <Calendar size={16} />
                  Collecte
                </p>
                <p className="font-bold text-blue-900">
                  {new Date(scannedOrder.collectionDate).toLocaleDateString('fr-FR')}
                </p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-sm text-green-700 flex items-center gap-2 mb-1">
                  <Calendar size={16} />
                  Livraison
                </p>
                <p className="font-bold text-green-900">
                  {new Date(scannedOrder.deliveryDate).toLocaleDateString('fr-FR')}
                </p>
              </div>
            </div>

            {/* Formule */}
            <div>
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Package size={20} />
                Formule d'abonnement
              </h3>
              <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-6 border-2 border-primary-200">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-primary-700 font-medium mb-1">Abonnement</p>
                    <p className="text-2xl font-bold text-primary-900 capitalize">{scannedOrder.subscription}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-primary-700 font-medium mb-1">Capacité panier</p>
                    <p className="text-3xl font-bold text-primary-900">
                      {scannedOrder.subscription === 'essentiel' ? '15L' : 
                       scannedOrder.subscription === 'confort' ? '30L' : '50L'}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <p className="text-lg font-bold text-gray-900">Montant mensuel</p>
                <p className="text-2xl font-bold text-primary-600">{scannedOrder.totalPrice}€</p>
              </div>
            </div>

            {/* Notes */}
            {scannedOrder.notes && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="font-bold text-yellow-900 mb-1">Notes spéciales</p>
                <p className="text-yellow-800">{scannedOrder.notes}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => router.push(`/admin/commandes/${scannedOrder.id}`)}
                className="flex-1 text-center bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Voir la fiche complète →
              </button>
              <button
                onClick={() => {
                  setScannedOrder(null);
                  setQrInput('');
                  setRedirecting(false);
                }}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Nouveau scan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
