/**
 * SVG placeholder used when a registry item has no image_url. Encoded as a data
 * URI so it needs no network round-trip and no bundler asset handling.
 *
 * Follow-up: automatically extract an og:image from external_url server-side
 * when an owner adds an item without pasting an image. Tracked in the roadmap.
 */
const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#fdf3ec"/>
      <stop offset="1" stop-color="#f5e2d3"/>
    </linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(#g)"/>
  <g fill="none" stroke="#c99274" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
    <path d="M170 200 q30 -60 60 0"/>
    <circle cx="200" cy="140" r="34"/>
    <path d="M186 138 q4 -4 8 0" />
    <path d="M206 138 q4 -4 8 0" />
    <path d="M192 155 q8 6 16 0" />
  </g>
  <text x="200" y="260" font-family="ui-sans-serif, system-ui" font-size="14" fill="#b07a5a" text-anchor="middle">Image coming soon</text>
</svg>`;

export const registryPlaceholderImage =
  "data:image/svg+xml;utf8," + encodeURIComponent(svg);

export function itemImage(image: string | null | undefined): string {
  return image && image.trim().length > 0 ? image : registryPlaceholderImage;
}
