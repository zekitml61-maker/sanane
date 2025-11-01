import { useState, useEffect } from 'react';

interface Settings {
  company: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  hours: {
    [key: string]: string;
  };
  pricing: {
    subscription: {
      essentiel: number;
      confort: number;
      premium: number;
    };
    oneTime: {
      small: number;
      medium: number;
      large: number;
    };
  };
  collectionDays: string[];
  deliveryDelay: number;
}

const DEFAULT_SETTINGS: Settings = {
  company: {
    name: "C'Propre",
    email: "c.propre84@gmail.com",
    phone: "07 56 95 86 94",
    address: "Vaison-la-Romaine, 84110, France"
  },
  hours: {
    'Lundi': '8h00 - 19h00',
    'Mardi': '8h00 - 19h00',
    'Mercredi': '8h00 - 19h00',
    'Jeudi': '8h00 - 19h00',
    'Vendredi': '8h00 - 19h00',
    'Samedi': '8h00 - 19h00',
    'Dimanche': 'Fermé'
  },
  pricing: {
    subscription: {
      essentiel: 29.90,
      confort: 49.90,
      premium: 79.90
    },
    oneTime: {
      small: 35.00,
      medium: 60.00,
      large: 95.00
    }
  },
  collectionDays: ['Lundi'],
  deliveryDelay: 7
};

export const useSettings = () => {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const loadSettings = () => {
      try {
        const saved = localStorage.getItem('cpropre_settings');
        if (saved) {
          const parsed = JSON.parse(saved);
          setSettings(parsed);
        }
      } catch (error) {
        console.error('Erreur chargement paramètres:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();

    // Écouter les changements de localStorage (si modifié dans un autre onglet)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'cpropre_settings' && e.newValue) {
        setSettings(JSON.parse(e.newValue));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return { settings, loading };
};

export type { Settings };
