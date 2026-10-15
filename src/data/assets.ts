// Canonical asset URLs from /public/assets/images (stable, unhashed).
// These MUST be plain public paths: the prerender script renders React outside
// the Vite bundle, so Vite import URLs leak into prerendered HTML as broken
// /src/assets/... paths (broken homepage film strip + preload links before hydration).
const heroWebp = '/assets/images/nahalabs_hero_1789398573439_opt.webp';
const heroJpg = '/assets/images/nahalabs_hero_1789398573439_opt.jpg';

const flavourlyWebp = '/assets/images/flavourly_system_1789398600949_opt.webp';
const flavourlyJpg = '/assets/images/flavourly_system_1789398600949_opt.jpg';

const cargoiqWebp = '/assets/images/cargoiq_system_1789398617043_opt.webp';
const cargoiqJpg = '/assets/images/cargoiq_system_1789398617043_opt.jpg';

const railwatchWebp = '/assets/images/railwatch_system_1789398646749_opt.webp';
const railwatchJpg = '/assets/images/railwatch_system_1789398646749_opt.jpg';

const enterpriseJhbWebp = '/assets/images/enterprise_jhb_1789398631359_opt.webp';
const enterpriseJhbJpg = '/assets/images/enterprise_jhb_1789398631359_opt.jpg';

const netpulseWebp = '/assets/images/netpulse_system_opt.webp';
const netpulseJpg = '/assets/images/netpulse_system_opt.jpg';

const fieldproofWebp = '/assets/images/fieldproof_system_opt.webp';
const fieldproofJpg = '/assets/images/fieldproof_system_opt.jpg';

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

  netpulse: netpulseWebp,
  netpulseJpg: netpulseJpg,

  fieldproof: fieldproofWebp,
  fieldproofJpg: fieldproofJpg,

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
