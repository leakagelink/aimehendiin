import type { CapacitorConfig } from '@capacitor/cli';

// Production config: the app bundles the built site from `dist`.
// For live-reload testing only, temporarily add:
// server: { url: 'https://0252473b-15f1-4af3-b05e-734cfcc4d86e.lovableproject.com?forceHideBadge=true', cleartext: true }
const config: CapacitorConfig = {
  appId: 'app.lovable.p0252473b15f14af3b05e734cfcc4d86e',
  appName: 'AIMehendi',
  webDir: 'dist',
};

export default config;
