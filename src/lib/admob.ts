import { Capacitor } from "@capacitor/core";

/**
 * AdMob integration — runs ONLY inside the native Android/iOS app.
 * The website keeps AdSense. Policy rules enforced here:
 * - Interstitials: only at natural breaks, max 1 per 3 minutes, every 3rd design.
 * - Rewarded: always user-initiated with a clear reward.
 * - Test ads in development builds to avoid invalid-traffic flags.
 */
export const ADMOB_IDS = {
  appId: "ca-app-pub-1475323931624357~2123650707",
  banner: "ca-app-pub-1475323931624357/3908254096",
  interstitial: "ca-app-pub-1475323931624357/1980180474",
  rewarded: "ca-app-pub-1475323931624357/6023281542",
};

const IS_TESTING = import.meta.env.DEV;
const INTERSTITIAL_GAP_MS = 3 * 60 * 1000;
const INTERSTITIAL_EVERY_N = 3;

export const isNativeApp = () => Capacitor.isNativePlatform();

let initPromise: Promise<boolean> | null = null;
let lastInterstitial = 0;
let designCount = 0;

async function mod() {
  return import("@capacitor-community/admob");
}

export function initAdMob(): Promise<boolean> {
  if (!isNativeApp()) return Promise.resolve(false);
  if (!initPromise) {
    initPromise = (async () => {
      try {
        const { AdMob, AdmobConsentStatus } = await mod();
        await AdMob.initialize({ initializeForTesting: IS_TESTING });
        // Google UMP consent form (EEA/UK) — configured in AdMob > Privacy & messaging
        const info = await AdMob.requestConsentInfo();
        if (info.isConsentFormAvailable && info.status === AdmobConsentStatus.REQUIRED) {
          await AdMob.showConsentForm();
        }
        return true;
      } catch (e) {
        console.warn("AdMob init failed", e);
        return false;
      }
    })();
  }
  return initPromise;
}

export async function showBanner() {
  if (!(await initAdMob())) return;
  try {
    const { AdMob, BannerAdSize, BannerAdPosition } = await mod();
    await AdMob.showBanner({
      adId: ADMOB_IDS.banner,
      adSize: BannerAdSize.ADAPTIVE_BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 72, // sits above the bottom tab bar, never overlapping buttons
      isTesting: IS_TESTING,
    });
  } catch (e) {
    console.warn("Banner failed", e);
  }
}

export async function hideBanner() {
  if (!isNativeApp()) return;
  try {
    const { AdMob } = await mod();
    await AdMob.removeBanner();
  } catch {
    /* ignore */
  }
}

/** Call after a design finishes. Shows an interstitial only at safe frequency. */
export async function maybeShowInterstitialAfterDesign() {
  if (!(await initAdMob())) return;
  designCount += 1;
  const now = Date.now();
  if (designCount % INTERSTITIAL_EVERY_N !== 0 || now - lastInterstitial < INTERSTITIAL_GAP_MS) return;
  try {
    const { AdMob } = await mod();
    await AdMob.prepareInterstitial({ adId: ADMOB_IDS.interstitial, isTesting: IS_TESTING });
    await AdMob.showInterstitial();
    lastInterstitial = Date.now();
  } catch (e) {
    console.warn("Interstitial failed", e);
  }
}

/** User-initiated rewarded ad. Resolves true only if the reward was earned. */
export async function showRewarded(): Promise<boolean> {
  if (!(await initAdMob())) return false;
  try {
    const { AdMob, RewardAdPluginEvents } = await mod();
    let earned = false;
    const sub = await AdMob.addListener(RewardAdPluginEvents.Rewarded, () => {
      earned = true;
    });
    await AdMob.prepareRewardVideoAd({ adId: ADMOB_IDS.rewarded, isTesting: IS_TESTING });
    const reward = await AdMob.showRewardVideoAd();
    await sub.remove();
    return earned || !!reward;
  } catch (e) {
    console.warn("Rewarded failed", e);
    return false;
  }
}
