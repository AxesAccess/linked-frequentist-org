(function() {
    function getCookie(name) {
        const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
        return match ? decodeURIComponent(match[1]) : null;
    }

    function generateUUID() {
        if (crypto.randomUUID) return crypto.randomUUID();
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    const COOKIE_NAME = 'browser_id';
    const MAX_AGE = 3600 * 24 * 90; // 90 days

    let browserId = getCookie(COOKIE_NAME);
    if (!browserId) {
        browserId = generateUUID();
    }

    // --- detect base domain dynamically ---
    // e.g. "linked.frequentist.org" -> ".frequentist.org"
    const parts = window.location.hostname.split('.');
    let domain = '';
    if (parts.length >= 2) {
        domain = '.' + parts.slice(-2).join('.');
    }

    // --- set cookie with domain scope ---
    document.cookie = `${COOKIE_NAME}=${encodeURIComponent(browserId)}; path=/; max-age=${MAX_AGE}; domain=${domain}; SameSite=Lax`;

    window.browser_id = browserId;
})();
