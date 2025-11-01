'use client';

import { useState } from 'react';
import { Menu, X, Phone, Crown } from 'lucide-react';
import { useSettings } from '@/lib/useSettings';
import ClientLoginModal from './ClientLoginModal';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const { settings } = useSettings();

  return (
    <nav className="bg-white shadow-md fixed w-full z-50 top-[36px]">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <div className="flex items-center">
            <a href="/" className="group relative text-3xl font-black overflow-hidden">
              <span className="relative inline-block text-primary-600">
                {settings?.company?.name || "C'Propre"}
                {/* Effet K2000 - balayage lumineux permanent */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-60 animate-k2000" style={{ filter: 'blur(1px)' }}></span>
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-1 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 group-hover:w-full transition-all duration-700 ease-out rounded-full"></span>
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-2">
            <a 
              href="#tarifs" 
              className="relative px-5 py-2 text-gray-800 font-medium hover:text-primary-600 transition-all duration-300 group"
            >
              <span className="relative z-10">Nos Tarifs</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a 
              href="#suivi" 
              className="relative px-5 py-2 text-gray-800 font-medium hover:text-primary-600 transition-all duration-300 group"
            >
              <span className="relative z-10">Suivi Commande</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a 
              href="#contact" 
              className="relative px-5 py-2 text-gray-800 font-medium hover:text-primary-600 transition-all duration-300 group"
            >
              <span className="relative z-10">Contact</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300"></span>
            </a>
            <button
              onClick={() => setLoginModalOpen(true)}
              className="relative px-5 py-2 bg-gradient-to-r from-primary-600 to-blue-600 text-white font-bold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 ml-2 overflow-hidden group"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Crown size={18} className="animate-pulse text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" fill="white" />
                Espace Client
              </span>
              {/* Effet shimmer */}
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent"></span>
              {/* Effet glow animé autour de la couronne */}
              <span className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 bg-white/30 rounded-full blur-md animate-ping"></span>
            </button>
            <a
              href={`tel:${settings?.company?.phone?.replace(/\s/g, '') || '+33756958694'}`}
              className="relative flex items-center gap-2 bg-primary-600 text-white px-6 py-2.5 rounded-full transition-all duration-300 ml-4 font-semibold overflow-hidden group hover:scale-105 hover:shadow-2xl"
            >
              {/* Effet shimmer style Apple - balayage brillant diagonal */}
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"></span>
              
              {/* Icône et texte */}
              <Phone size={16} className="relative z-10 sm:w-5 sm:h-5" />
              <span className="relative z-10 hidden sm:inline">{settings?.company?.phone || '07 56 95 86 94'}</span>
              <span className="relative z-10 sm:hidden">Appeler</span>
            </a>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-primary-600"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t animate-fadeIn">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <a
              href="#tarifs"
              className="block py-3 px-4 text-gray-800 font-medium hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-all duration-300"
              onClick={() => setIsOpen(false)}
            >
              Nos Tarifs
            </a>
            <a
              href="#suivi"
              className="block py-3 px-4 text-gray-800 font-medium hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-all duration-300"
              onClick={() => setIsOpen(false)}
            >
              Suivi Commande
            </a>
            <a
              href="#contact"
              className="block py-3 px-4 text-gray-800 font-medium hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-all duration-300"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </a>
            <button
              onClick={() => {
                setIsOpen(false);
                setLoginModalOpen(true);
              }}
              className="relative flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-primary-600 to-blue-600 text-white font-bold rounded-lg hover:shadow-lg transition-all duration-300 mt-2 overflow-hidden group w-full"
            >
              <Crown size={18} className="animate-pulse text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" fill="white" />
              <span className="relative z-10">Espace Client</span>
              {/* Effet shimmer */}
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent"></span>
              {/* Effet glow animé autour de la couronne */}
              <span className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 bg-white/30 rounded-full blur-md animate-ping"></span>
            </button>
            <a
              href={`tel:${settings?.company?.phone?.replace(/\s/g, '') || '+33756958694'}`}
              className="flex items-center gap-2 justify-center bg-primary-600 text-white px-6 py-3 rounded-full hover:bg-primary-700 font-medium mt-2"
            >
              <Phone size={18} />
              <span>{settings?.company?.phone || '07 56 95 86 94'}</span>
            </a>
          </div>
        </div>
      )}

      {/* Modal de connexion */}
      <ClientLoginModal 
        isOpen={loginModalOpen} 
        onClose={() => setLoginModalOpen(false)} 
      />
    </nav>
  );
}
