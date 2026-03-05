importScripts('https://www.gstatic.com/firebasejs/9.22.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.1/firebase-messaging-compat.js');

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

// هذه الدالة تعمل فور وصول إشارة من فيرباز والموبايل مغلق
messaging.onBackgroundMessage((payload) => {
    console.log('وصل تنبيه صلاة في الخلفية:', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: 'https://cdn-icons-png.flaticon.com/512/2913/2913520.png',
        badge: 'https://cdn-icons-png.flaticon.com/512/2913/2913520.png',
        vibrate: [500, 110, 500, 110, 500, 110, 500], // نمط اهتزاز قوي
        tag: 'adhan-alert', // لمنع تكرار الإشعارات
        renotify: true,
        requireInteraction: true, // يظل الإشعار ثابتاً حتى يضغط عليه المستخدم
        data: {
            url: '/index.html' // يفتح التطبيق عند الضغط عليه
        }
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
});

// عند الضغط على الإشعار، يتم فتح التطبيق لتشغيل صوت الأذان
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow(event.notification.data.url + "?startAdhan=true")
    );
});