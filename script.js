document.addEventListener('DOMContentLoaded', () => {
    const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

    // Mobile menu
    const toggle = document.getElementById('nav-toggle');
    const menu = document.getElementById('nav-menu');
    toggle?.addEventListener('click', () => menu.classList.toggle('open'));
    menu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));

    const SHELVES = [
        { tab: 'games',   title: 'Games' },
        { tab: 'jams',    title: 'Game jams' },
        { tab: 'techart', title: 'Engine, tools and tech art' }
    ];
    const ACTION_DEFAULTS = {
        play:     { icon: 'fas fa-play',     label: 'Play' },
        video:    { icon: 'fas fa-film',     label: 'Watch' },
        youtube:  { icon: 'fas fa-film',     label: 'Watch trailer' },
        download: { icon: 'fas fa-download', label: 'Download' },
        link:     { icon: 'fas fa-arrow-up-right-from-square', label: 'Open' }
    };
    const idxOf = p => PROJECTS.indexOf(p);
    const badgeOf = p => p.actions.some(a => a.type === 'play') ? 'Playable'
                       : p.actions.some(a => a.type === 'download') ? 'Download'
                       : p.actions.some(a => a.type === 'video' || a.type === 'youtube') ? 'Video' : '';
    const itchSrc = id => `https://itch.io/embed-upload/${encodeURIComponent(id)}?color=0f1115`;

    function actionHTML(p, a, i, primary) {
        const d = { ...ACTION_DEFAULTS[a.type], ...a };
        const cls = 'act' + (primary ? ' act-primary' : '');
        const inner = `<i class="${esc(d.icon)}" aria-hidden="true"></i><span>${esc(d.label)}</span>`;
        if (a.type === 'link' || a.type === 'download') {
            const extra = a.type === 'download' ? ' download' : ' target="_blank" rel="noopener"';
            return `<a href="${esc(a.url)}" class="${cls}"${extra}>${inner}</a>`;
        }
        return `<button type="button" class="${cls}" data-media="${idxOf(p)}" data-action="${i}">${inner}</button>`;
    }

    const coverHTML = p => p.thumb
        ? `<img src="${esc(p.thumb)}" alt="" loading="lazy">`
        : `<div class="cover-placeholder"><span>${esc(p.title)}</span></div>`;

    // ---------- Playable hero ----------
    const featured = PROJECTS.find(p => p.featured);
    const heroGame = document.getElementById('hero-game');
    const play = featured?.actions.find(a => a.type === 'play');
    if (featured && play && heroGame) {
        heroGame.innerHTML = `
            <div class="game-window">
                <div class="game-bar"><span class="dots"><i></i><i></i><i></i></span><span class="game-name">${esc(featured.title)}</span>
                    <button class="modal-btn" id="hero-fs" aria-label="Fullscreen"><i class="fas fa-expand"></i></button></div>
                <div class="game-screen" id="game-screen">
                    ${coverHTML(featured)}
                    <button type="button" class="press-start" id="press-start"><i class="fas fa-play"></i><span>Click to play</span></button>
                </div>
            </div>
            <p class="game-caption">${esc(featured.meta || '')} · <a href="${esc(play.url)}" target="_blank" rel="noopener">Open on itch.io</a></p>`;
        document.getElementById('press-start').addEventListener('click', () => {
            document.getElementById('game-screen').innerHTML =
                `<iframe src="${itchSrc(play.itchUpload)}" allowfullscreen allow="autoplay; fullscreen; gamepad" title="${esc(featured.title)}"></iframe>`;
        });
        document.getElementById('hero-fs').addEventListener('click', () => document.getElementById('game-screen').requestFullscreen?.());
    }

    // ---------- Box-art shelves ----------
    const boxHTML = p => {
        const badge = badgeOf(p);
        return `
        <button type="button" class="box" data-detail="${idxOf(p)}" aria-label="${esc(p.title)}, details">
            <span class="box-art">
                ${coverHTML(p)}
                ${badge ? `<span class="badge badge-${badge.toLowerCase()}">${badge}</span>` : ''}
            </span>
            <span class="box-title">${esc(p.title)}</span>
            <span class="box-meta">${esc((p.tags || []).slice(0, 2).join(' · '))}</span>
        </button>`;
    };
    document.getElementById('shelves').innerHTML = SHELVES.map(s => {
        const items = PROJECTS.filter(p => p.tab === s.tab);
        if (!items.length) return '';
        return `
        <div class="shelf reveal">
            <div class="shelf-head"><h3>${esc(s.title)}</h3><span>${items.length} titles</span></div>
            <div class="shelf-row">${items.map(boxHTML).join('')}</div>
            <div class="shelf-ledge" aria-hidden="true"></div>
        </div>`;
    }).join('');

    // ---------- Modal: detail view and media view ----------
    const modal = document.getElementById('media-modal');
    const body = document.getElementById('modal-body');
    const title = document.getElementById('modal-title');
    const foot = document.getElementById('modal-footer');
    let lastFocus = null;

    function show() {
        if (!modal.classList.contains('open')) lastFocus = document.activeElement;
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        modal.querySelector('.modal-close').focus();
    }

    function openDetail(p) {
        modal.classList.remove('is-media');
        title.textContent = p.title;
        foot.innerHTML = '';
        body.innerHTML = `
            <div class="detail">
                <div class="detail-art">${coverHTML(p)}</div>
                <div class="detail-info">
                    <p class="card-kicker">${esc(p.meta || '')}</p>
                    <h3 class="featured-title">${esc(p.title)}</h3>
                    <p class="featured-desc">${esc(p.description)}</p>
                    <ul class="tags">${(p.tags || []).map(t => `<li>${esc(t)}</li>`).join('')}</ul>
                    <div class="actions">${p.actions.map((a, i) => actionHTML(p, a, i, i === 0)).join('')}</div>
                </div>
            </div>`;
        show();
    }

    function openMedia(p, a) {
        modal.classList.add('is-media');
        title.innerHTML = `<button class="modal-btn back" data-detail="${idxOf(p)}" aria-label="Back to details"><i class="fas fa-arrow-left"></i></button> ${esc(p.title)}`;
        foot.innerHTML = '';
        if (a.type === 'play') {
            body.innerHTML = `<div class="frame"><iframe src="${itchSrc(a.itchUpload)}" allowfullscreen allow="autoplay; fullscreen; gamepad" title="${esc(p.title)}"></iframe></div>`;
            foot.innerHTML = `Click the game to give it keyboard focus. Not loading? <a href="${esc(a.url)}" target="_blank" rel="noopener">Play it on itch.io</a>.`;
        } else if (a.type === 'youtube') {
            body.innerHTML = `<div class="frame"><iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(a.id)}?autoplay=1&rel=0" allow="autoplay; encrypted-media; fullscreen; picture-in-picture" allowfullscreen title="${esc(p.title)}"></iframe></div>`;
        } else if (a.type === 'video') {
            body.innerHTML = `<div class="frame"><video src="${esc(a.src)}" controls autoplay playsinline ${p.thumb ? `poster="${esc(p.thumb)}"` : ''}></video></div>`;
            body.querySelector('video').addEventListener('error', () => {
                body.innerHTML = `<div class="frame frame-missing"><p>Video coming soon</p></div>`;
            });
        }
        show();
    }

    function closeModal() {
        modal.classList.remove('open', 'is-media');
        modal.setAttribute('aria-hidden', 'true');
        body.innerHTML = '';
        document.body.style.overflow = '';
        if (document.fullscreenElement) document.exitFullscreen();
        lastFocus?.focus?.();
    }

    document.addEventListener('click', e => {
        const m = e.target.closest('[data-media]');
        if (m) { const p = PROJECTS[+m.dataset.media]; openMedia(p, p.actions[+m.dataset.action]); return; }
        const d = e.target.closest('[data-detail]');
        if (d) { openDetail(PROJECTS[+d.dataset.detail]); return; }
        if (e.target.closest('[data-close]')) closeModal();
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('open')) closeModal(); });
    document.getElementById('modal-fullscreen')?.addEventListener('click', () => body.querySelector('.frame')?.requestFullscreen?.());

    // Reveal-on-scroll
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
        const io = new IntersectionObserver(entries => entries.forEach(en => {
            if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
        }), { threshold: 0.12 });
        document.querySelectorAll('.reveal').forEach(el => io.observe(el));
    } else {
        document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
    }

    document.getElementById('year').textContent = new Date().getFullYear();
});
