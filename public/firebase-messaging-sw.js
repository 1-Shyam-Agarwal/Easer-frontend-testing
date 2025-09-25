// public/firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyA07gFIusB8FQmiYZJalTtEEPwINCzCFcA",
  authDomain: "uploaddocuments-3a515.firebaseapp.com",
  projectId: "uploaddocuments-3a515",
  storageBucket: "uploaddocuments-3a515.firebasestorage.app",
  messagingSenderId: "457293873292",
  appId: "1:457293873292:web:aedf76600a37afc0b4fba9",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
