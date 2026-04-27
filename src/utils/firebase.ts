import { initializeApp, getApps, getApp } from 'firebase/app';
import { getMessaging, getToken, isSupported, onMessage, type Messaging } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyB_Itb5fd-0DOGLws2MXS-_PjGOP1i82Wg',
  authDomain: 'oathwall.firebaseapp.com',
  projectId: 'oathwall',
  storageBucket: 'oathwall.firebasestorage.app',
  messagingSenderId: '217266805307',
  appId: '1:217266805307:web:631aafd9a84780b8b15a1e',
};

const VAPID_KEY = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY ?? '';

function getFirebaseApp() {
  return getApps().length ? getApp() : initializeApp(firebaseConfig);
}

let messagingInstance: Messaging | null = null;

async function getMessagingInstance(): Promise<Messaging | null> {
  if (typeof window === 'undefined') return null;
  if (messagingInstance) return messagingInstance;

  const supported = await isSupported();
  if (!supported) return null;

  const app = getFirebaseApp();
  messagingInstance = getMessaging(app);
  return messagingInstance;
}

export async function requestFCMToken(): Promise<string | null> {
  try {
    const messaging = await getMessagingInstance();
    if (!messaging) return null;

    const permission = await Notification.requestPermission();
    if (permission !== 'granted') return null;

    const token = await getToken(messaging, {
      vapidKey: VAPID_KEY,
      serviceWorkerRegistration: await navigator.serviceWorker.register('/firebase-messaging-sw.js'),
    });

    return token || null;
  } catch (err) {
    console.error('FCM token request failed:', err);
    return null;
  }
}

export function listenForegroundMessages() {
  getMessagingInstance().then((messaging) => {
    if (!messaging) return;
    onMessage(messaging, (payload) => {
      const { title, body, image } = payload.notification ?? {};
      if (!title || Notification.permission !== 'granted') return;

      new Notification(title, {
        body: body ?? '',
        icon: '/logo.svg',
        badge: image ?? undefined,
      });
    });
  });
}
