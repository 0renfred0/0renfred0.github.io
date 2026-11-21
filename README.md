# Renfred Lee: Game Developer Portfolio

Live site: https://0renfred0.github.io

Static site for GitHub Pages. No build step: edit the files and push.

## Layout
- `index.html`: page structure
- `styles.css`: look and layout
- `script.js`: renders the shelves, playable hero and popups
- `projects.js`: **all project cards. Edit this to add or change projects.**
- `assets/images/`: covers and screenshots (JPG/PNG, aim for under 500 KB)
- `assets/videos/`: web-ready MP4s (H.264 + AAC, keep each under ~50 MB)
- `_source-media/`: original full-quality files. Ignored by git, never published.

## Adding a project
1. Put the cover in `assets/images/` and any video in `assets/videos/`.
2. Add an entry to `projects.js` (see the comment at the top of that file).
3. Bump the `?v=` number on the CSS/JS links in `index.html` so returning visitors get the new files.
4. Commit and push. The site updates within a minute or two.

## Video tip
Phone/OBS recordings are often HEVC or AV1, which many browsers can't play. Convert with:
`ffmpeg -i input.mp4 -vf scale=-2:1080 -c:v libx264 -preset veryfast -crf 26 -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart output.mp4`
