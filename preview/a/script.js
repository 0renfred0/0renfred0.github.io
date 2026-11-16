document.addEventListener('DOMContentLoaded', () => {
    const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

    // Mobile menu
    const toggle = document.getElementById('nav-toggle');
    const menu = document.getElementById('nav-menu');
    toggle?.addEventListener('click', () => menu.classList.toggle('open'));
    menu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));

    // Project rendering
    const TAB_LABELS = { games: 'Game', jams: 'Game jam', techart: 'Tech art' };
    const ACTION_DEFAULTS = {
        play:     { icon: 'fas fa-play',     label: 'Play' },
        video:    { icon: 'fas fa-film',     label: 'Watch' },
        youtube:  { icon: 'fas fa-film',     label: 'Watch trailer' },
        download: { icon: 'fas fa-download', label: 'Download' },
        link:     { icon: 'fas fa-arrow-up-right-from-square', label: 'Open' }
    };

    const idxOf = p => PROJECTS.indexOf(p);
    const mediaIndex = p => p.actions.findIndex(a => ['play', 'video', 'youtube'].includes(a.type));
    const badgeOf = p => p.actions.some(a => a.type === 'play') ? 'Playable'
                       : p.actions.some(a => a.type === 'download') ? 'Download'
                       : p.actions.some(a => a.type === 'video' || a.type === 'youtube') ? 'Video' : '';

    function actionHTML(p, a, i, primary) {
        const d = { ...ACTION_DEFAULTS[a.type], ...a };
        const cls = 'act' + (primary ? ' act-primary' : '');
        const inner = `<i class="${esc(d.icon)}" aria-hidden="true"></i><span>${esc(d.label)}</span>`;
        if (a.type === 'link' || a.type === 'download') {
            const extra = a.type === 'download' ? ' download' : ' target="_blank" rel="noopener"';
            return `<a href="${esc(a.url)}" class="${cls}"${extra}>${inner}</a>`;
        }
        return `<button type="button" class="${cls}" data-project="${idxOf(p)}" data-action="${i}">${inner}</button>`;
    }

    function thumbHTML(p) {
        const m = mediaIndex(p);
        const badge = badgeOf(p);
        const img = p.thumb
            ? `<img src="${esc(p.thumb)}" alt="" loading="lazy">`
            : `<div class="thumb-placeholder"><span>${esc(p.title)}</span></div>`;
        const inner = `${img}${badge ? `<span class="badge badge-${badge.toLowerCase()}">${badge}</span>` : ''}`;
        return m >= 0
            ? `<button type="button" class="thumb is-clickable" data-project="${idxOf(p)}" data-action="${m}" aria-label="Open ${esc(p.title)}">${inner}<span class="thumb-play" aria-hidden="true"><i class="fas fa-play"></i></span></button>`
            : `<div class="thumb">${inner}</div>`;
    }

    function cardHTML(p) {
        return `
        <article class="card" data-tab="${esc(p.tab)}">
            ${thumbHTML(p)}
            <div class="card-body">
                <p class="card-kicker">${esc(TAB_LABELS[p.tab] || '')}${p.meta ? ` · ${esc(p.meta)}` : ''}</p>
                <h3 class="card-title">${esc(p.title)}</h3>
                <p class="card-desc">${esc(p.description)}</p>
                <ul class="tags">${(p.tags || []).map(t => `<li>${esc(t)}</li>`).join('')}</ul>
                <div class="actions">${p.actions.map((a, i) => actionHTML(p, a, i, i === 0)).join('')}</div>
            </div>
        </article>`;
    }

    const featured = PROJECTS.find(p => p.featured);
    const featuredEl = document.getElementById('featured');
    if (featured && featuredEl) {
        featuredEl.innerHTML = `
            ${thumbHTML(featured)}
            <div class="featured-body">
                <p class="eyebrow">Featured project</p>
                <h3 class="featured-title">${esc(featured.title)}</h3>
                <p class="card-kicker">${esc(featured.meta || '')}</p>
                <p class="featured-desc">${esc(featured.description)}</p>
                <ul class="tags">${(featured.tags || []).map(t => `<li>${esc(t)}</li>`).join('')}</ul>
                <div class="actions">${featured.actions.map((a, i) => actionHTML(featured, a, i, i === 0)).join('')}</div>
            </div>`;
    }

    const grid = document.getElementById('project-grid');
    grid.innerHTML = PROJECTS.filter(p => !p.featured).map(cardHTML).join('');

    // Filters
    const filters = document.querySelectorAll('.filter');
    filters.forEach(btn => btn.addEventListener('click', () => {
        filters.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
        const f = btn.dataset.filter;
        grid.querySelectorAll('.card').forEach(c => { c.hidden = f !== 'all' && c.dataset.tab !== f; });
    }));

    // Media popup
    const modal = document.getElementById('media-modal');
    const body = document.getElementById('modal-body');
    const title = document.getElementById('modal-title');
    const foot = document.getElementById('modal-footer');

    function openModal(p, a) {
        title.textContent = p.title;
        foot.innerHTML = '';
        if (a.type === 'play') {
            body.innerHTML = `<div class="frame"><iframe src="https://itch.io/embed-upload/${encodeURIComponent(a.itchUpload)}?color=111318" allowfullscreen allow="autoplay; fullscreen; gamepad" title="${esc(p.title)}"></iframe></div>`;
            foot.innerHTML = `Click the game to give it keyboard focus. Not loading? <a href="${esc(a.url)}" target="_blank" rel="noopener">Play it on itch.io</a>.`;
        } else if (a.type === 'youtube') {
            body.innerHTML = `<div class="frame"><iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(a.id)}?autoplay=1&rel=0" allow="autoplay; encrypted-media; fullscreen; picture-in-picture" allowfullscreen title="${esc(p.title)}"></iframe></div>`;
        } else if (a.type === 'video') {
            body.innerHTML = `<div class="frame"><video src="${esc(a.src)}" controls autoplay playsinline ${p.thumb ? `poster="${esc(p.thumb)}"` : ''}></video></div>`;
            body.querySelector('video').addEventListener('error', () => {
                body.innerHTML = `<div class="frame frame-missing"><p>Video coming soon</p></div>`;
            });
        }
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        modal.querySelector('.modal-close').focus();
    }

    function closeModal() {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        body.innerHTML = '';
        document.body.style.overflow = '';
        if (document.fullscreenElement) document.exitFullscreen();
    }

    document.addEventListener('click', e => {
        const t = e.target.closest('[data-project][data-action]');
        if (t) {
            const p = PROJECTS[+t.dataset.project];
            openModal(p, p.actions[+t.dataset.action]);
            return;
        }
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
