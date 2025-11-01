'use client';

import { useState } from 'react';
import { LogIn, UserPlus, QrCode, Shield, Package, Clock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function EspaceClientPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="bg-primary-600 text-white p-2 rounded-lg">
                <Package size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">C'Propre</h1>
                <p className="text-xs text-gray-600">Pressing & Laverie</p>
              </div>
            </Link>
            <Link 
              href="/"
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Retour au site
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Bienvenue dans votre Espace Client
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Gérez votre abonnement, suivez vos commandes et accédez à tous vos services en ligne
          </p>
        </div>

        {/* Avantages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock size={32} className="text-primary-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Suivi en temps réel</h3>
            <p className="text-gray-600">
              Suivez l'avancement de vos commandes en direct
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package size={32} className="text-primary-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Gestion d'abonnement</h3>
            <p className="text-gray-600">
              Modifiez votre formule à tout moment
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield size={32} className="text-primary-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Sécurisé</h3>
            <p className="text-gray-600">
              Vos données sont protégées et confidentielles
            </p>
          </div>
        </div>

        {/* Actions principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Connexion */}
          <Link
            href="/espace-client/connexion"
            className="group bg-white rounded-2xl shadow-lg border-2 border-gray-200 hover:border-primary-500 p-8 transition-all hover:shadow-xl"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-primary-600 text-white p-4 rounded-xl group-hover:scale-110 transition-transform">
                <LogIn size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Se connecter</h2>
                <p className="text-gray-600">Déjà client</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              Accédez à votre espace personnel avec votre email ou votre QR code
            </p>
            <div className="flex items-center gap-2 text-primary-600 font-semibold">
              Connexion
              <span className="group-hover:translate-x-2 transition-transform">→</span>
            </div>
          </Link>

          {/* Inscription */}
          <Link
            href="/espace-client/inscription"
            className="group bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl shadow-lg p-8 transition-all hover:shadow-xl hover:scale-105"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-white/20 text-white p-4 rounded-xl group-hover:scale-110 transition-transform">
                <UserPlus size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">S'inscrire</h2>
                <p className="text-primary-100">Nouveau client</p>
              </div>
            </div>
            <p className="text-white/90 mb-4">
              Créez votre compte et choisissez votre formule d'abonnement
            </p>
            <div className="flex items-center gap-2 text-white font-semibold">
              Créer mon compte
              <span className="group-hover:translate-x-2 transition-transform">→</span>
            </div>
          </Link>
        </div>

        {/* Accès rapide par QR Code */}
        <div className="mt-16 max-w-2xl mx-auto">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl shadow-xl p-8 text-center text-white">
            <QrCode size={48} className="mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-3">Accès rapide par QR Code</h3>
            <p className="text-gray-300 mb-6">
              Scannez votre QR code client pour accéder directement à votre espace
            </p>
            <Link
              href="/espace-client/scan"
              className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-100 transition font-semibold"
            >
              <QrCode size={20} />
              Scanner mon QR Code
            </Link>
          </div>
        </div>
      </div>

      {/* Footer simple */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400 mb-3">
            © 2025 C'Propre Pressing. Tous droits réservés.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link 
              href="/admin/connexion" 
              className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105 shadow-lg"
            >
              <span>👑</span>
              Accès Admin
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
