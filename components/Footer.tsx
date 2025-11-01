'use client';

import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import { useSettings } from '@/lib/useSettings';

export default function Footer() {
  const { settings } = useSettings();

  return (
    <footer id="contact" className="bg-gray-900 text-white pt-12 sm:pt-16 pb-6 sm:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-8 sm:mb-12">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">{settings?.company?.name || "C'Propre"}</h3>
            <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6">
              Votre pressing professionnel à domicile. Service premium, collecte {settings?.collectionDays?.length > 0 ? `chaque ${settings.collectionDays[0].toLowerCase()}` : 'chaque lundi'}.
            </p>
            <div className="flex gap-3 sm:gap-4">
              <a href="#" className="bg-gray-800 p-2.5 sm:p-3 rounded-full hover:bg-primary-600 transition touch-manipulation active:scale-95">
                <Facebook size={20} />
              </a>
              <a href="#" className="bg-gray-800 p-3 rounded-full hover:bg-primary-600 transition">
                <Instagram size={20} />
              </a>
              <a href="#" className="bg-gray-800 p-3 rounded-full hover:bg-primary-600 transition">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Services</h4>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-white transition">Nettoyage pressing</a></li>
              <li><a href="#" className="hover:text-white transition">Nettoyage à sec</a></li>
              <li><a href="#" className="hover:text-white transition">Repassage</a></li>
              <li><a href="#" className="hover:text-white transition">Détachage expert</a></li>
              <li><a href="#" className="hover:text-white transition">Linge de maison</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Informations</h4>
            <ul className="space-y-3 text-gray-400">
              <li><a href="/#tarifs" className="hover:text-white transition">Nos formules</a></li>
              <li><a href="/#suivi" className="hover:text-white transition">Suivre ma commande</a></li>
              <li><a href="/faq" className="hover:text-white transition">FAQ</a></li>
              <li><a href="/conditions-generales" className="hover:text-white transition">Conditions générales</a></li>
              <li><a href="/mentions-legales" className="hover:text-white transition">Mentions légales</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Contact</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start gap-3">
                <Phone size={20} className="flex-shrink-0 mt-1" />
                <div>
                  <a href={`tel:${settings?.company?.phone || '0756958694'}`} className="text-white font-semibold hover:text-primary-400 transition">
                    {settings?.company?.phone || '07 56 95 86 94'}
                  </a>
                  <p className="text-sm">
                    {settings?.hours?.['Lundi'] && settings?.hours?.['Samedi'] 
                      ? `Lun-Sam: ${settings.hours['Lundi']}` 
                      : 'Lun-Sam: 8h-19h'}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={20} className="flex-shrink-0 mt-1" />
                <div>
                  <a href={`mailto:${settings?.company?.email || 'c.propre84@gmail.com'}`} className="text-white hover:text-primary-400 transition">
                    {settings?.company?.email || 'c.propre84@gmail.com'}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={20} className="flex-shrink-0 mt-1" />
                <div>
                  <p className="text-white">{settings?.company?.address || 'Vaison-la-Romaine, 84110, France'}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2025 {settings?.company?.name || "C'Propre"}. Tous droits réservés.
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition">Politique de confidentialité</a>
              <a href="#" className="hover:text-white transition">Cookies</a>
              <a href="#" className="hover:text-white transition">Plan du site</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
