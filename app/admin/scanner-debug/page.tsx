'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Camera, X } from 'lucide-react';
import { Html5Qrcode } from 'html5-qrcode';

export default function ScannerDebugPage() {
  const router = useRouter();
  const [logs, setLogs] = useState<string[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [qrInput, setQrInput] = useState('');
  const hasScannedRef = useRef(false);
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
    console.log(message);
  };

  const handleScan = (code: string) => {
    addLog('='.repeat(50));
    addLog(`🔍 SCAN DÉTECTÉ: ${code}`);
    addLog(`Longueur: ${code.length}`);
    addLog(`Commence par CLIENT-: ${code.startsWith('CLIENT-')}`);
    
    if (code.startsWith('CLIENT-')) {
      addLog('✅ CODE CLIENT DÉTECTÉ !');
      
      if (typeof window !== 'undefined') {
        const rawData = localStorage.getItem('cpropre_clients');
        addLog(`📦 LocalStorage accessible: ${!!rawData}`);
        
        if (rawData) {
          try {
            const clients = JSON.parse(rawData);
            addLog(`📦 Nombre de clients: ${clients.length}`);
            
            const found = clients.find((c: any) => c.qrCode === code);
            addLog(`🔍 Client trouvé: ${!!found}`);
            
            if (found) {
              addLog(`✅✅✅ CLIENT TROUVÉ: ${found.name}`);
              addLog(`ID: ${found.id}`);
              addLog(`🔄 Redirection vers: /admin/clients/${found.id}`);
              
              setTimeout(() => {
                router.push(`/admin/clients/${found.id}`);
              }, 1000);
            } else {
              addLog('❌ Client non trouvé dans la base');
              clients.forEach((c: any, i: number) => {
                addLog(`  [${i}] ${c.qrCode} === ${code} ? ${c.qrCode === code}`);
              });
            }
          } catch (e: any) {
            addLog(`❌ Erreur parsing: ${e.message}`);
          }
        } else {
          addLog('❌ Pas de données dans localStorage');
        }
      } else {
        addLog('❌ Window non défini');
      }
    } else {
      addLog('❌ Ne commence pas par CLIENT-');
    }
    
    addLog('='.repeat(50));
  };

  const startScanner = async () => {
    addLog('📸 Démarrage du scanner...');
    setIsScanning(true);
    hasScannedRef.current = false;
    
    try {
      // Demander permission caméra d'abord
      addLog('📷 Demande permission caméra...');
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      stream.getTracks().forEach(track => track.stop());
      addLog('✅ Permission caméra accordée');
      
      const html5QrCode = new Html5Qrcode('qr-reader-debug');
      html5QrCodeRef.current = html5QrCode;
      
      const devices = await Html5Qrcode.getCameras();
      addLog(`📷 Caméras trouvées: ${devices.length}`);
      
      if (devices && devices.length > 0) {
        // Essayer d'utiliser la caméra arrière (environment) ou la première dispo
        let cameraId = devices[0].id;
        
        // Chercher une caméra arrière
        const backCamera = devices.find(d => d.label.toLowerCase().includes('back') || d.label.toLowerCase().includes('rear'));
        if (backCamera) {
          cameraId = backCamera.id;
          addLog(`📷 Caméra arrière trouvée: ${backCamera.label}`);
        } else {
          addLog(`📷 Utilisation première caméra: ${devices[0].label}`);
        }
        
        await html5QrCode.start(
          cameraId,
          { fps: 10, qrbox: { width: 250, height: 250 } },
          (decodedText) => {
            if (hasScannedRef.current) return;
            
            hasScannedRef.current = true;
            addLog('🎉🎉🎉 QR CODE SCANNÉ !');
            addLog(`Texte: ${decodedText}`);
            
            // Bip
            try {
              const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
              const osc = ctx.createOscillator();
              const gain = ctx.createGain();
              osc.connect(gain);
              gain.connect(ctx.destination);
              osc.frequency.value = 1500;
              osc.type = 'square';
              gain.gain.setValueAtTime(1.0, ctx.currentTime);
              gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
              osc.start(ctx.currentTime);
              osc.stop(ctx.currentTime + 0.2);
              addLog('🔊 Bip joué');
            } catch (e) {
              addLog('❌ Erreur son');
            }
            
            // Vibration
            if (navigator.vibrate) {
              navigator.vibrate(200);
              addLog('📳 Vibration');
            }
            
            stopScanner();
            handleScan(decodedText);
          },
          () => {}
        );
        
        addLog('✅ Scanner démarré');
      }
    } catch (e: any) {
      addLog(`❌ Erreur: ${e.message}`);
      setIsScanning(false);
    }
  };

  const stopScanner = async () => {
    if (html5QrCodeRef.current) {
      try {
        await html5QrCodeRef.current.stop();
        addLog('🛑 Scanner arrêté');
      } catch (e) {}
    }
    setIsScanning(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h1 className="text-2xl font-bold mb-4">🔍 Scanner Debug</h1>
        
        {!isScanning ? (
          <div className="space-y-4">
            <input
              type="text"
              value={qrInput}
              onChange={(e) => setQrInput(e.target.value)}
              placeholder="Ou tapez le code ici"
              className="w-full px-4 py-2 border rounded-lg"
            />
            <button
              onClick={() => handleScan(qrInput)}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium"
            >
              Tester le code
            </button>
            <button
              onClick={startScanner}
              className="w-full flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-medium"
            >
              <Camera size={20} />
              Scanner avec caméra
            </button>
          </div>
        ) : (
          <div>
            <div id="qr-reader-debug" className="mb-4"></div>
            <button
              onClick={stopScanner}
              className="w-full flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-medium"
            >
              <X size={20} />
              Arrêter
            </button>
          </div>
        )}
      </div>

      <div className="bg-gray-900 text-green-400 rounded-xl shadow-sm p-4 font-mono text-xs max-h-96 overflow-y-auto">
        <div className="flex justify-between items-center mb-2">
          <strong className="text-white">LOGS :</strong>
          <button
            onClick={() => setLogs([])}
            className="text-white text-xs bg-gray-700 px-2 py-1 rounded"
          >
            Effacer
          </button>
        </div>
        {logs.length === 0 ? (
          <p className="text-gray-500">Aucun log...</p>
        ) : (
          logs.map((log, i) => (
            <div key={i} className="mb-1">{log}</div>
          ))
        )}
      </div>
    </div>
  );
}
