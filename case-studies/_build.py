# Regenerate pages: python case-studies/_build.py . <version>
"""Generates the case study pages in case-studies/. Content lives in CASES below."""
import html, pathlib, sys

ROOT = pathlib.Path(sys.argv[1])
VER = sys.argv[2]
OUT = ROOT / "case-studies"
OUT.mkdir(exist_ok=True)

CASES = [
    {
        "slug": "descent",
        "kicker": "Flagship · Engine lead",
        "title": "Descent: building the engine behind the game",
        "pitch": "As engine lead on a team of 8, I designed the entity-component-system and the OpenGL 2D renderer for our custom C++ engine, and set the technical direction that took it from an empty project to a finished puzzle-platformer with its own level editor.",
        "facts": [("Role", "Engine Lead"), ("Team", "8, Team CRASHOUTS"), ("Timeline", "Sep 2025 – Apr 2026"), ("Tech", "C++, OpenGL, C# scripting, Dear ImGui")],
        "media": {"type": "video", "src": "../assets/videos/descent-gameplay.mp4", "poster": "../assets/images/descent.jpg", "caption": "Descent gameplay, running in our engine."},
        "sections": [
            ("The problem", "problem", """
<p>Our year-long team project had one big rule: <strong>no off-the-shelf engine</strong>. Before Descent could exist, we had to build the engine it runs on, along with tools good enough for designers and artists to make levels without touching C++.</p>"""),
            ("Constraints", "constraints", """
<ul>
<li><strong>One academic year</strong> (September to April), alongside every other module.</li>
<li><strong>8 people across programming, design and art</strong>, all depending on the engine at the same time.</li>
<li><strong>Everything from scratch</strong> in C++ and OpenGL. No Unity, no Unreal.</li>
<li>The game had to be <strong>finished and playable</strong> for course assessment.</li>
</ul>"""),
            ("What I built", "built", """
<p><strong>An entity-component-system built on sparse and dense sets.</strong> Each component type lives in a tightly packed (dense) array, and a sparse array maps every entity ID straight to its slot. Looking up an entity's component is O(1), and systems walk through contiguous memory instead of chasing pointers, which keeps the CPU cache happy as entity counts grow.</p>
<p><strong>The OpenGL 2D rendering pipeline.</strong> I designed how the engine draws a frame: layered draw calls so backgrounds, gameplay objects and UI always sort correctly, plus lighting on top. It renders every scene in Descent.</p>
<div class="cs-gallery">
  <figure class="cs-figure"><img src="../assets/images/case/descent-lava.jpg" alt="Descent: the player beside a lava pool in a red cavern" loading="lazy"></figure>
  <figure class="cs-figure"><img src="../assets/images/case/descent-plates.jpg" alt="Descent: the player near a glowing rune stone, with the pressure plate counter in the corner" loading="lazy"></figure>
</div>
<p><strong>Technical direction.</strong> As engine lead I set the architecture and priorities across rendering, entity management and tooling, so a multidisciplinary team could work in parallel without blocking each other.</p>"""),
            ("Tools for the whole team", "tools", """
<p>An engine is only useful if the rest of the team can build with it. Together we shipped an in-engine editor with:</p>
<ul>
<li>A <strong>sprite sheet and animation clip editor</strong>, so artists can cut frames and save animation sets.</li>
<li>A <strong>rule-based tilemap editor</strong> with layers and colliders for painting levels.</li>
<li><strong>C# scripting</strong> that calls into the C++ core, so gameplay can be written without recompiling the engine.</li>
<li>A <strong>particle system</strong> with fire, fireball, explosion and trajectory presets.</li>
<li><strong>Play, pause, stop and save</strong> controls for editing scenes live, with scenes saved to JSON.</li>
</ul>
<div class="cs-gallery">
  <figure class="cs-figure"><img src="../assets/images/case/engine-animation.jpg" alt="Crashouts Engine editor: creating animation clips from a sprite sheet" loading="lazy"></figure>
  <figure class="cs-figure"><img src="../assets/images/case/engine-tilemap.jpg" alt="Crashouts Engine editor: the tilemap rule editor" loading="lazy"></figure>
</div>
<div class="cs-links"><button type="button" class="btn btn-ghost" data-video="../assets/videos/crashouts-level-editor.mp4" data-title="Crashouts Engine: Level Editor"><i class="fas fa-film"></i> Watch the editor tour</button></div>"""),
            ("Result", "result", """
<p>Descent shipped as a complete 2D puzzle-platformer running entirely on our engine. It was submitted for course assessment and published on GitHub, and every level in it was built with the team's own editor.</p>"""),
        ],
    },
    {
        "slug": "mask-motel",
        "kicker": "Constrained · 48-hour game jam",
        "title": "Mask Motel: a horror game in 48 hours",
        "pitch": "Built with two teammates at Global Game Jam 2026 Singapore. I programmed the camera systems and weapon interactions, laid out the levels, and made the scope call that let us ship on time: 2D characters instead of 3D.",
        "facts": [("Role", "Gameplay programmer, level layout, visual assets"), ("Team", "3, with JustHallowed and kulu"), ("Timeline", "48 hours, Jan 2026"), ("Tech", "Unity, C#")],
        "media": {"type": "itch", "id": "16527448", "poster": "https://img.itch.zone/aW1nLzI1MzE2Nzc0LnBuZw==/original/RrLPMN.png", "caption": "Playable right here. Click the game to give it keyboard focus."},
        "sections": [
            ("The problem", "problem", """
<p>Make a complete, playable game from nothing in one weekend. Our idea: you're a mask artist making ends meet by crafting human disguises for monsters. You take orders through your motel room's peephole, craft the mask at your work table and pass it through the hatch in the door, while the customers get rowdier.</p>"""),
            ("Constraints", "constraints", """
<ul>
<li><strong>48 hours</strong>, start to finish.</li>
<li><strong>3 people</strong> covering code, art, levels and audio.</li>
<li>Had to ship <strong>web and Windows builds</strong> to itch.io by the deadline.</li>
</ul>"""),
            ("The key decision", "decision", """
<p>We weighed 3D characters, but modelling, rigging and animating them would have taken most of the weekend. <strong>I chose 2D characters instead</strong>, which kept the eerie look while freeing up time for gameplay, and then produced the supporting visual assets for the release myself.</p>"""),
            ("What I built", "built", """
<ul>
<li><strong>Camera systems</strong> for moving around the motel room and looking through the peephole.</li>
<li><strong>Weapon interactions</strong> for dealing with customers who get out of hand.</li>
<li><strong>Level layout</strong> of the motel room.</li>
</ul>"""),
            ("Result", "result", """
<p>Mask Motel shipped on time and is live on itch.io with web and Windows builds. Players rated it <strong>4.8 out of 5</strong> on itch.io (5 ratings, November 2026).</p>
<div class="cs-links"><a class="btn btn-ghost" href="https://justhallowed.itch.io/mask-motel" target="_blank" rel="noopener"><i class="fab fa-itch-io"></i> Open on itch.io</a></div>"""),
        ],
    },
    {
        "slug": "graphics-pipeline",
        "kicker": "Specific skill · Real-time rendering",
        "title": "A real-time graphics pipeline in C++ and OpenGL",
        "pitch": "A solo renderer with physically based rendering and hardware-accelerated occlusion culling that holds 60+ FPS across more than 200 textured models, each shaded per light.",
        "facts": [("Role", "Solo project"), ("Timeline", "Jan – Apr 2026"), ("Tech", "C++, OpenGL, GLSL"), ("Focus", "Rendering and performance")],
        "metrics": [("60+", "frames per second, sustained"), ("200+", "textured models on screen"), ("PBR", "physically based materials"), ("GPU", "hardware occlusion culling")],
        "sections": [
            ("The goal", "problem", """
<p>Render a scene with hundreds of textured models and multiple lights at a steady 60 FPS, with materials that respond to light realistically, all built by hand on top of raw OpenGL.</p>"""),
            ("Constraints", "constraints", """
<ul>
<li><strong>Solo</strong>, alongside a full course load.</li>
<li><strong>No engine</strong>: C++, OpenGL and GLSL only.</li>
<li>Every light is shaded per model, so the cost grows quickly with scene size.</li>
</ul>"""),
            ("What I built", "built", """
<p><strong>Physically based rendering.</strong> Materials follow physically based shading, so metal, plastic and rough surfaces react to light consistently instead of being tweaked by hand per model.</p>
<p><strong>Hardware-accelerated occlusion culling.</strong> The GPU checks which models are hidden behind others, and those are skipped, so shading time is only spent on what the camera can actually see. This is what keeps per-light shading affordable with 200+ models in the scene.</p>"""),
            ("Result", "result", """
<p>The pipeline sustains <strong>60+ FPS with more than 200 textured models</strong>, each with per-light shading.</p>"""),
        ],
    },
]

HEAD = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="{desc}">
    <title>{title} | Renfred Lee</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="../styles.css?v={v}">
    <link rel="stylesheet" href="case.css?v={v}">
</head>
<body>
    <header class="nav">
        <div class="wrap nav-inner">
            <a href="../" class="logo">Renfred Lee</a>
            <nav class="cs-nav">
                <a href="../#case-studies">Case studies</a>
                <a href="../#work">Library</a>
                <a href="../#contact">Contact</a>
            </nav>
        </div>
    </header>
"""

FOOT = """
    <div class="modal" id="media-modal" aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div class="modal-backdrop" data-close></div>
        <div class="modal-window is-media">
            <div class="modal-head"><span id="modal-title"></span>
                <div><button class="modal-btn modal-close" data-close aria-label="Close"><i class="fas fa-xmark"></i></button></div>
            </div>
            <div id="modal-body"></div>
        </div>
    </div>
    <footer class="footer wrap">
        <p>© 2026 Renfred Lee</p>
        <p><a href="../">Back to portfolio</a></p>
    </footer>
    <script>
    (function () {
        var modal = document.getElementById('media-modal'), body = document.getElementById('modal-body');
        function close() { modal.classList.remove('open'); body.innerHTML = ''; document.body.style.overflow = ''; }
        document.addEventListener('click', function (e) {
            var v = e.target.closest('[data-video]');
            if (v) {
                document.getElementById('modal-title').textContent = v.dataset.title || '';
                body.innerHTML = '<div class="frame"><video src="' + v.dataset.video + '" controls autoplay playsinline></video></div>';
                modal.classList.add('open'); document.body.style.overflow = 'hidden'; return;
            }
            if (e.target.closest('[data-close]')) close();
            var p = e.target.closest('[data-itch]');
            if (p) { p.parentNode.innerHTML = '<iframe src="https://itch.io/embed-upload/' + p.dataset.itch + '?color=0f1115" allowfullscreen allow="autoplay; fullscreen; gamepad" title="Game"></iframe>'; }
        });
        document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
    })();
    </script>
</body>
</html>
"""

esc = html.escape


def media_html(m):
    if not m:
        return ""
    if m["type"] == "video":
        inner = f'<video src="{m["src"]}" poster="{m["poster"]}" controls preload="none" playsinline></video>'
    else:
        inner = (f'<div class="game-screen"><img src="{m["poster"]}" alt="" loading="lazy">'
                 f'<button type="button" class="press-start" data-itch="{m["id"]}"><i class="fas fa-play"></i><span>Click to play</span></button></div>')
    return f'<section class="wrap"><div class="cs-media">{inner}</div><p class="cs-caption">{esc(m["caption"])}</p></section>'


for i, c in enumerate(CASES):
    prev_c, next_c = CASES[i - 1], CASES[(i + 1) % len(CASES)]
    facts = "".join(f"<div><dt>{esc(k)}</dt><dd>{esc(v)}</dd></div>" for k, v in c["facts"])
    metrics = ""
    if c.get("metrics"):
        metrics = '<div class="cs-metrics">' + "".join(
            f'<div class="cs-metric"><strong>{esc(a)}</strong><span>{esc(b)}</span></div>' for a, b in c["metrics"]) + "</div>"
    toc = "".join(f'<a href="#{sid}">{esc(t)}</a>' for t, sid, _ in c["sections"])
    secs = "".join(
        f'<section class="cs-section" id="{sid}"><span class="cs-step">{n:02d}</span><h2>{esc(t)}</h2>{body}</section>'
        for n, (t, sid, body) in enumerate(c["sections"], 1))
    page = HEAD.format(desc=esc(c["pitch"]), title=esc(c["title"]), v=VER) + f"""
    <main>
        <section class="wrap cs-hero">
            <a class="cs-back" href="../#case-studies"><i class="fas fa-arrow-left"></i> All case studies</a>
            <p class="eyebrow">{esc(c["kicker"])}</p>
            <h1 class="cs-title">{esc(c["title"])}</h1>
            <p class="cs-pitch">{esc(c["pitch"])}</p>
            <dl class="cs-facts">{facts}</dl>
            {metrics}
        </section>
        {media_html(c.get("media"))}
        <div class="wrap cs-body">
            <nav class="cs-toc" aria-label="On this page">{toc}</nav>
            <article>{secs}</article>
        </div>
        <nav class="wrap cs-next" aria-label="More case studies">
            <a href="{prev_c["slug"]}.html"><small>Previous</small><span>{esc(prev_c["title"])}</span></a>
            <a href="{next_c["slug"]}.html"><small>Next</small><span>{esc(next_c["title"])}</span></a>
        </nav>
    </main>
""" + FOOT
    (OUT / f"{c['slug']}.html").write_text(page, encoding="utf-8")
    print("wrote", c["slug"])
