/* ==========================================================================
   PROJECT DATA — edit this file to add / change projects.
   tab:     "games" | "jams" | "techart"
   thumb:   image URL (local "assets/images/x.jpg" or remote)
   actions: list of buttons. Types:
     { type: "play",     itchUpload: "<upload id>", url: "<itch page>" }   -> playable in a popup
     { type: "video",    src: "assets/videos/x.mp4" }                      -> local MP4 in a popup
     { type: "youtube",  id: "<youtube id>" }                              -> YouTube in a popup
     { type: "download", url: "...", label: "Download (Windows)" }
     { type: "link",     url: "...", label: "...", icon: "fab fa-itch-io" }
   ========================================================================== */
const WIX_IMG = (id) => `https://static.wixstatic.com/media/${id}/v1/fill/w_800,h_450,enc_auto/file.jpg`;
const YT_IMG = (id) => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;

const PROJECTS = [
    /* ---------------- GAMES ---------------- */
    {
        tab: "games",
        title: "Overseas [GAM150]",
        description: "A tense top-down survival fishing game where you brave deadly hazards and manage resources to hit your daily quota.",
        meta: "DigiPen Singapore · Team project",
        tags: ["C++", "Alpha Engine"],
        thumb: "assets/images/overseas.png",
        actions: [
            { type: "download", url: "assets/downloads/Overseas.exe", label: "Download (Windows)" },
            { type: "youtube", id: "lon1mHgS8kM", label: "Watch" }
        ]
    },
    {
        tab: "games",
        title: "Antsassin (2021)",
        description: "A VR game developed by Epic Boyz Studios. Team: Mervin Ko (Sound & VFX), Renfred Lee (Developer & Programmer), Kyle Asuncion (Art Lead & Creative Producer).",
        meta: "Role: Developer & Programmer",
        tags: ["VR", "Team of 3"],
        thumb: YT_IMG("KHbA7OeglYE"),
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
            { type: "youtube", id: "lhIZq1t71-g", label: "Watch Gameplay" }
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
            { type: "video", src: "assets/videos/fruit-jump.mp4" }
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

    /* ---------------- TECH ART, LEVELS & APPS ---------------- */
    {
        tab: "techart",
        title: "Game Effect Design",
        description: "A set of game effects made in Unity, each representing a different element from Genshin Impact.",
        meta: "VFX study",
        tags: ["Unity", "VFX", "Particles"],
        thumb: WIX_IMG("0aaa46_87564f387b5d4c819d7a42096f547973f002.jpg"),
        actions: [
            { type: "youtube", id: "eZMcznGID_4" }
        ]
    },
    {
        tab: "techart",
        title: "3D Apartment Render",
        description: "A fully modelled and lit 3D apartment interior, presented as a rendered walkthrough video.",
        meta: "3D modelling and rendering",
        tags: ["3D", "Modelling", "Rendering"],
        thumb: YT_IMG("1KH5lmCPn0k"),
        actions: [
            { type: "youtube", id: "1KH5lmCPn0k", label: "Watch Render" }
        ]
    },
    {
        tab: "techart",
        title: "Character Walk Animation",
        description: "A character walk animation set up and showcased in Unity.",
        meta: "Character animation",
        tags: ["Unity", "Animation"],
        thumb: YT_IMG("rYcTa6vmirY"),
        actions: [
            { type: "youtube", id: "rYcTa6vmirY" }
        ]
    },
    {
        tab: "techart",
        title: "Safe Dining",
        description: "A mobile application made in Unity to promote safe distancing in F&B outlets.",
        meta: "Mobile app",
        tags: ["Unity", "C#", "Mobile"],
        thumb: YT_IMG("IRGwIJ_fC5Y"),
        actions: [
            { type: "youtube", id: "IRGwIJ_fC5Y" }
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
