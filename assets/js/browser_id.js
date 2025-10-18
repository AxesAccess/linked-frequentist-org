(function() {
    // --- Helper: read cookie by name ---
    function getCookie(name) {
        const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
        return match ? decodeURIComponent(match[1]) : null;
    }

    // --- Helper: generate a UUID v4 ---
    function generateUUID() {
        if (crypto.randomUUID) {
            return crypto.randomUUID();
        }
        // Fallback for older browsers
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    const COOKIE_NAME = 'browser_id';
    const MAX_AGE = 3600 * 24 * 90; // 90 days in seconds

    // --- Create or refresh cookie ---
    let browserId = getCookie(COOKIE_NAME);
    if (!browserId) {
        browserId = generateUUID();
    }

    // --- Store cookie with updated expiration ---
    document.cookie = `${COOKIE_NAME}=${encodeURIComponent(browserId)}; path=/; max-age=${MAX_AGE}; SameSite=Lax`;

    // --- Optional: expose for debugging or analytics ---
    window.browser_id = browserId;
})();
