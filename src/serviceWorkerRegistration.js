// Đăng ký service worker mặc định cho PWA (Create React App style)
export function register() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(registration => {
          // Đăng ký thành công
        })
        .catch(error => {
          // Đăng ký thất bại
          console.error('Service worker registration failed:', error);
        });
    });
  }
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
}