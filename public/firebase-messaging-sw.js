importScripts("https://www.gstatic.com/firebasejs/11.0.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/11.0.2/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyD3iAhm2hzUabQf9TIfrSxa7o10tFCMmqA",
  authDomain: "flashnews24-5bfd6.firebaseapp.com",
  projectId: "flashnews24-5bfd6",
  storageBucket: "flashnews24-5bfd6.firebasestorage.app",
  messagingSenderId: "192814639105",
  appId: "1:192814639105:web:2fd1fbe341d8c33e577800",
  measurementId: "G-E20Q4FXVCM"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  self.registration.showNotification(
    payload.notification.title,
    {
      body: payload.notification.body,
      icon: "/logo192.png",
    }
  );
});
