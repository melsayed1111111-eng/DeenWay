// استدعاء مكتبات فيرباز داخل السيرفس وركر
importScripts('https://www.gstatic.com/firebasejs/9.22.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.1/firebase-messaging-compat.js');

// إعدادات فيرباز الخاصة بك
const firebaseConfig = {
    apiKey: "AIzaSyDKbtDRO104bk-ujmeuJ6a_qdnyES--51U",
    authDomain: "deenway-a108d.firebaseapp.com",
    projectId: "deenway-a108d",
    storageBucket: "deenway-a108d.firebasestorage.app",
    messagingSenderId: "170653007063",
    appId: "1:170653007063:web:6a59032bfdf5554a500492"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// التعامل مع الإشعارات الخلفية (والتطبيق مغلق)
messaging.onBackgroundMessage((payload) => {
  console.log('رسالة في الخلفية: ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: 'https://cdn-icons-png.flaticon.com/512/2913/2913520.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});