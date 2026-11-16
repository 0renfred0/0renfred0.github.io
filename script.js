document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile menu
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        document.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));
    }

    // 2. Render project cards from projects.js
    const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

    const ACTION_DEFAULTS = {
        play:     { icon: 'fas fa-play',     label: 'Play in Browser', primary: true },
        video:    { icon: 'fas fa-video',    label: 'Watch Video',     primary: true },
        youtube:  { icon: 'fab fa-youtube',  label: 'Watch Video',     primary: true },
        download: { icon: 'fas fa-download', label: 'Download',        primary: true },
        link:     { icon: 'fas fa-external-link-alt', label: 'Open',   primary: false }
    };

    function actionHTML(p, a, i) {
        const d = { ...ACTION_DEFAULTS[a.type], ...a };
        const cls = 'btn-card' + (d.primary ? ' btn-card-primary' : '');
        const inner = `<i class="${esc(d.icon)}"></i> ${esc(d.label)}`;
        if (a.type === 'link' || a.type === 'download') {
            const extra = a.type === 'download' ? ' download' : ' target="_blank" rel="noopener"';
            return `<a href="${esc(a.url)}" class="${cls}"${extra}>${inner}</a>`;
        }
        return `<button type="button" class="${cls}" data-project="${PROJECTS.indexOf(p)}" data-action="${i}">${inner}</button>`;
    }

    function cardHTML(p) {
        const idx = PROJECTS.indexOf(p);
        const media = p.actions.findIndex(a => ['play', 'video', 'youtube'].includes(a.type));
        const badge = p.actions.some(a => a.type === 'play') ? '<span class="card-badge">PLAYABLE</span>'
                    : p.actions.some(a => a.type === 'download') ? '<span class="card-badge badge-dl">DOWNLOAD</span>' : '';
        const img = p.thumb
            ? `<img src="${esc(p.thumb)}" alt="${esc(p.title)} preview" class="project-image" loading="lazy">`
            : `<div class="project-image placeholder-thumb"><span>${esc(p.title)}</span></div>`;
        const imgWrap = media >= 0
            ? `<button type="button" class="project-image-container is-clickable" data-project="${idx}" data-action="${media}" aria-label="Open ${esc(p.title)}">${img}<span class="thumb-play"><i class="fas fa-play"></i></span>${badge}</button>`
            : `<div class="project-image-container">${img}${badge}</div>`;
        return `
            <article class="project-card">
                ${imgWrap}
                <div class="project-content">
                    <h3 class="project-title">${esc(p.title)}</h3>
                    ${p.meta ? `<p class="project-meta">${esc(p.meta)}</p>` : ''}
                    <p class="project-description">${esc(p.description)}</p>
                    <ul class="tech-tags">${(p.tags || []).map(t => `<li>${esc(t)}</li>`).join('')}</ul>
                    <div class="project-links">${p.actions.map((a, i) => actionHTML(p, a, i)).join('')}</div>
                </div>
            </article>`;
    }

    document.querySelectorAll('.project-slider[data-tab]').forEach(slider => {
        slider.innerHTML = PROJECTS.filter(p => p.tab === slider.dataset.tab).map(cardHTML).join('');
    });

    // 3. Tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const subGrids = document.querySelectorAll('.project-subgrid');
    tabButtons.forEach(button => button.addEventListener('click', () => {
        tabButtons.forEach(b => b.classList.remove('active'));
        subGrids.forEach(g => g.classList.remove('active'));
        button.classList.add('active');
        document.getElementById(`tab-${button.dataset.filter}`)?.classList.add('active');
    }));

    // 4. Slider arrows
    document.querySelectorAll('.slider-wrapper').forEach(wrapper => {
        const slider = wrapper.querySelector('.project-slider');
        wrapper.querySelector('.next-arrow')?.addEventListener('click', () => slider.scrollBy({ left: 370, behavior: 'smooth' }));
        wrapper.querySelector('.prev-arrow')?.addEventListener('click', () => slider.scrollBy({ left: -370, behavior: 'smooth' }));
    });

    // 5. Media popup
    const modal = document.getElementById('media-modal');
    const modalBody = document.getElementById('modal-body');
    const modalTitle = document.getElementById('modal-title');
    const modalFooter = document.getElementById('modal-footer');

    function openModal(p, a) {
        modalTitle.textContent = `> ${p.title}`;
        modalFooter.innerHTML = '';
        if (a.type === 'play') {
            modalBody.innerHTML = `<div class="media-frame"><iframe src="https://itch.io/embed-upload/${encodeURIComponent(a.itchUpload)}?color=07090f" allowfullscreen allow="autoplay; fullscreen; gamepad" title="${esc(p.title)}"></iframe></div>`;
            modalFooter.innerHTML = `Not loading? <a href="${esc(a.url)}" target="_blank" rel="noopener">Play it on itch.io</a>. Click inside the game to give it keyboard focus.`;
        } else if (a.type === 'youtube') {
            modalBody.innerHTML = `<div class="media-frame"><iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(a.id)}?autoplay=1&rel=0" allow="autoplay; encrypted-media; fullscreen; picture-in-picture" allowfullscreen title="${esc(p.title)}"></iframe></div>`;
        } else if (a.type === 'video') {
            modalBody.innerHTML = `<div class="media-frame"><video src="${esc(a.src)}" controls autoplay playsinline ${p.thumb ? `poster="${esc(p.thumb)}"` : ''}></video></div>`;
            modalBody.querySelector('video').addEventListener('error', () => {
                modalBody.innerHTML = `<div class="media-frame media-missing"><p>&gt; VIDEO_NOT_FOUND</p><small>${esc(a.src)}</small></div>`;
            });
        }
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        modalBody.innerHTML = ''; // stops game / video audio
        document.body.style.overflow = '';
        if (document.fullscreenElement) document.exitFullscreen();
    }

    document.addEventListener('click', e => {
        const trigger = e.target.closest('[data-project][data-action]');
        if (trigger) {
            const p = PROJECTS[+trigger.dataset.project];
            openModal(p, p.actions[+trigger.dataset.action]);
            return;
        }
        if (e.target.closest('[data-close]')) closeModal();
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('open')) closeModal(); });
    document.getElementById('modal-fullscreen').addEventListener('click', () => {
        modalBody.querySelector('.media-frame')?.requestFullscreen?.();
    });
});
