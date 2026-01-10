// client/public/sw.js

self.addEventListener('push', (event) => {
    const data = event.data.json();
    console.log('Push received:', data);

    const options = {
        body: data.body,
        icon: '/vite.svg', // আপনার লোগোর পাথ
        badge: '/vite.svg',
        data: {
            url: data.url || '/'
        }
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

// নোটিফিকেশনে ক্লিক করলে ওয়েবসাইট ওপেন হবে
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow(event.notification.data.url)
    );
});