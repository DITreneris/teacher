/**
 * Shared Lucide SVG sprite helpers (no CDN).
 * Sprite: /assets/icons.svg — rebuild via `node scripts/build-icon-sprite.js`.
 */
(function (global) {
    'use strict';

    var ICON_ALLOWLIST = {
        command: true,
        moon: true,
        sun: true,
        'graduation-cap': true,
        'book-open': true,
        'clipboard-check': true,
        'pencil-ruler': true,
        presentation: true,
        brain: true,
        copy: true,
        'arrow-right': true,
        history: true,
        save: true,
        'trash-2': true,
        sparkles: true,
        users: true,
        'file-text': true,
        list: true,
        'chevron-down': true,
        eye: true,
        'shield-check': true,
        'credit-card': true,
        apple: true,
        lock: true,
        'badge-check': true,
        zap: true,
        'external-link': true,
        layers: true,
        'life-buoy': true,
        x: true,
        check: true,
        'alert-circle': true,
        'rotate-ccw': true,
        'file-input': true,
        'refresh-ccw': true,
        'check-circle': true
    };

    var SPRITE_HREF = '/assets/icons.svg#icon-';

    function iconHtml(name, className) {
        var safe = typeof name === 'string' && ICON_ALLOWLIST[name] ? name : 'sparkles';
        var cls = typeof className === 'string' && className ? className : 'icon';
        return (
            '<svg class="' +
            cls +
            '" aria-hidden="true" focusable="false">' +
            '<use href="' +
            SPRITE_HREF +
            safe +
            '"></use></svg>'
        );
    }

    global.CPBIcons = {
        allowlist: ICON_ALLOWLIST,
        iconHtml: iconHtml
    };
})(typeof window !== 'undefined' ? window : globalThis);
