/* eslint-disable no-restricted-globals */
importScripts('https://www.gstatic.com/firebasejs/12.11.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/12.11.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: '***',
  authDomain: 'asuim.firebaseapp.com',
  projectId: 'asuim',
  storageBucket: 'asuim.firebasestorage.app',
  messagingSenderId: '***',
  appId: '***',
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const { title, body, image } = payload.notification || {};
  if (!title) return;

  self.registration.showNotification(title, {
    body: body || '',
    icon: '/logo.svg',
    image: image || undefined,
    data: payload.data,
  });
});
