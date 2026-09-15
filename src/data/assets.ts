// Canonical asset imports bundled and hashed by Vite for production reliability
import heroWebp from '../assets/images/nahalabs_hero_1789398573439_opt.webp';
import heroJpg from '../assets/images/nahalabs_hero_1789398573439_opt.jpg';

import flavourlyWebp from '../assets/images/flavourly_system_1789398600949_opt.webp';
import flavourlyJpg from '../assets/images/flavourly_system_1789398600949_opt.jpg';

import cargoiqWebp from '../assets/images/cargoiq_system_1789398617043_opt.webp';
import cargoiqJpg from '../assets/images/cargoiq_system_1789398617043_opt.jpg';

import railwatchWebp from '../assets/images/railwatch_system_1789398646749_opt.webp';
import railwatchJpg from '../assets/images/railwatch_system_1789398646749_opt.jpg';

import enterpriseJhbWebp from '../assets/images/enterprise_jhb_1789398631359_opt.webp';
import enterpriseJhbJpg from '../assets/images/enterprise_jhb_1789398631359_opt.jpg';

export interface SystemAsset {
  webp: string;
  jpg: string;
}

export const ASSETS = {
  hero: heroWebp,
  heroJpg: heroJpg,
  
  flavourly: flavourlyWebp,
  flavourlyJpg: flavourlyJpg,

  cargoiq: cargoiqWebp,
  cargoiqJpg: cargoiqJpg,

  railwatch: railwatchWebp,
  railwatchJpg: railwatchJpg,

  enterpriseJhb: enterpriseJhbWebp,
  enterpriseJhbJpg: enterpriseJhbJpg,

  logo: '/nahalabs-logo.svg',
  icon: '/nahalabs-icon.svg',
  
  // High-fidelity architectural backdrops
  insurance: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
  taxintel: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
  sella: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=1200&q=80',
  spatial: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80',
  digitalWorkers: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
};
