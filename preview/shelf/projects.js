/* ==========================================================================
   PROJECT DATA — edit this file to add / change projects.
   tab:     "games" | "jams" | "techart"
   thumb:   image URL (local "../../assets/images/x.jpg" or remote)
   actions: list of buttons. Types:
     { type: "play",     itchUpload: "<upload id>", url: "<itch page>" }   -> playable in a popup
     { type: "video",    src: "../../assets/videos/x.mp4" }                      -> local MP4 in a popup
     { type: "youtube",  id: "<youtube id>" }                              -> YouTube in a popup
     { type: "download", url: "...", label: "Download (Windows)" }
     { type: "link",     url: "...", label: "...", icon: "fab fa-itch-io" }
   ========================================================================== */
const WIX_IMG = (id) => `https://static.wixstatic.com/media/${id}/v1/fill/w_800,h_450,enc_auto/file.jpg`;

const PROJECTS = [
    /* ---------------- GAMES ---------------- */
    {
        tab: "games",
        title: "Overseas [GAM150]",
        description: "A tense top-down survival fishing game where you brave deadly hazards and manage resources to hit your daily quota.",
        meta: "DigiPen Singapore · Team project",
        tags: ["C++", "Alpha Engine"],
        thumb: "",
        actions: [
            { type: "download", url: "../../assets/downloads/Overseas.exe", label: "Download (Windows)" }
        ]
    },
    {
        tab: "games",
        title: "Antsassin (2021)",
        description: "A VR game developed by Epic Boyz Studios. Team: Mervin Ko (Sound & VFX), Renfred Lee (Developer & Programmer), Kyle Asuncion (Art Lead & Creative Producer).",
        meta: "Role: Developer & Programmer",
        tags: ["VR", "Team of 3"],
        thumb: "https://i.ytimg.com/vi/KHbA7OeglYE/maxresdefault.jpg",
        actions: [
            { type: "youtube", id: "KHbA7OeglYE", label: "Watch Trailer" }
        ]
    },
    {
        tab: "games",
        title: "Automaton",
        description: "A 3D game made in Unity.",
        meta: "Ngee Ann Polytechnic",
        tags: ["Unity", "C#", "3D"],
        thumb: WIX_IMG("0aaa46_c218830f1eb84f6b8e439f77ab79b86ff002.jpg"),
        actions: [
            { type: "video", src: "../../assets/videos/automaton.mp4" }
        ]
    },
    {
        tab: "games",
        title: "Fruit Jump",
        description: "A 2D platformer made in Unity, built around a unique mechanic: the whole game is controlled by tapping with one finger.",
        meta: "Ngee Ann Polytechnic",
        tags: ["Unity", "C#", "2D", "Mobile"],
        thumb: WIX_IMG("0aaa46_9443466259a9416199d094047e5315a2f000.jpg"),
        actions: [
            { type: "video", src: "../../assets/videos/fruit-jump.mp4" }
        ]
    },

    /* ---------------- GAME JAMS ---------------- */
    {
        tab: "jams",
        title: "Mask Motel",
        featured: true,
        description: "You are a mask artist making ends meet by crafting human disguises for monsters. Business is lucrative, but your customers can be quite... rowdy.",
        meta: "Global Game Jam SG 2026 · with JustHallowed & kulu",
        tags: ["Unity", "Horror", "Pixel Art"],
        thumb: "https://img.itch.zone/aW1nLzI1MzE2Nzc0LnBuZw==/original/RrLPMN.png",
        actions: [
            { type: "play", itchUpload: "16527448", url: "https://justhallowed.itch.io/mask-motel" },
            { type: "link", url: "https://justhallowed.itch.io/mask-motel", label: "itch.io", icon: "fab fa-itch-io" }
        ]
    },
    {
        tab: "jams",
        title: "Zombie Madness",
        description: "Survive endless hordes of zombies and kill as many as you can, without straying outside the map. WASD/Space to move & jump, Shift to sprint, Mouse 1 to shoot.",
        meta: "Brackeys Game Jam 2021.2",
        tags: ["Unity", "2D", "Shooter"],
        thumb: "https://img.itch.zone/aW1nLzY4NTgxNjgucG5n/original/dWn0Ir.png",
        actions: [
            { type: "play", itchUpload: "4379775", url: "https://tinyteaow.itch.io/zombie-madness" },
            { type: "link", url: "https://tinyteaow.itch.io/zombie-madness", label: "itch.io", icon: "fab fa-itch-io" }
        ]
    },
    {
        tab: "jams",
        title: "Famished Frog",
        description: "Help a famished frog eat as much as it can in 90 seconds, while dodging the big fish that steal your points and your time.",
        meta: "Mini Jam 106: Frogs²",
        tags: ["Unity", "3D", "Arcade"],
        thumb: "https://img.itch.zone/aW1nLzg5NDA4MjEucG5n/original/KwJy2W.png",
        actions: [
            { type: "play", itchUpload: "5797689", url: "https://tinyteaow.itch.io/famished-frog" },
            { type: "link", url: "https://tinyteaow.itch.io/famished-frog", label: "itch.io", icon: "fab fa-itch-io" }
        ]
    },
    {
        tab: "jams",
        title: "Umbilical Buddies",
        description: "Work together with your sibling, joined by an umbilical cord! Fight waves of evil toys and explore the dungeon in local co-op.",
        meta: "Game jam · RenKy Studios",
        tags: ["2D", "Local Co-op", "Action"],
        thumb: "https://img.itch.zone/aW1nLzYyNTg5ODYucG5n/original/BT8%2B%2FT.png",
        actions: [
            { type: "link", url: "https://tinyteaow.itch.io/umbilical-buddies", label: "Download on itch.io", icon: "fas fa-download", primary: true }
        ]
    },

    /* ---------------- TECH ART, LEVELS & APPS ---------------- */
    {
        tab: "techart",
        title: "Game Effect Design",
        description: "A set of game effects made in Unity, each representing a different element from Genshin Impact.",
        meta: "VFX study",
        tags: ["Unity", "VFX", "Particles"],
        thumb: WIX_IMG("0aaa46_87564f387b5d4c819d7a42096f547973f002.jpg"),
        actions: [
            { type: "video", src: "../../assets/videos/game-effects.mp4" }
        ]
    },
    {
        tab: "techart",
        title: "An Alien World",
        description: "A mini scene built to showcase level design in an alien world.",
        meta: "Level design",
        tags: ["Level Design", "Environment"],
        thumb: WIX_IMG("0aaa46_debcd26d009f431982d3a72f47907b7ef002.jpg"),
        actions: [
            { type: "video", src: "../../assets/videos/alien-world.mp4" }
        ]
    },
    {
        tab: "techart",
        title: "Safe Dining",
        description: "A mobile application made in Unity to promote safe distancing in F&B outlets.",
        meta: "Mobile app",
        tags: ["Unity", "C#", "Mobile"],
        thumb: WIX_IMG("0aaa46_34728a9e54f64700be8fe87122ef19caf001.jpg"),
        actions: [
            { type: "video", src: "../../assets/videos/safe-dining.mp4" }
        ]
    },
    {
        tab: "techart",
        title: "3D Models on Sketchfab",
        description: "A collection of my 3D models, viewable in the browser.",
        meta: "3D modelling",
        tags: ["3D", "Modelling"],
        thumb: "",
        actions: [
            { type: "link", url: "https://sketchfab.com/RenfredLee", label: "View on Sketchfab", icon: "fas fa-cube", primary: true }
        ]
    }
];
