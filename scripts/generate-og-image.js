/**
 * Generate og-image.png (1200x630) from config/sot.json using Satori + sharp.
 *
 * Layout (minimal, "less is more"):
 *   - Brand row top-left:  [box icon] "Prompt Anatomy"
 *   - H1 (3 lines):        "Classroom-ready / AI prompts / for K-12 teachers"
 *   - Gold accent line under H1
 *   - URL bottom-left:     "promptanatomy.online"
 *
 * No AI brand names (ChatGPT/Claude/Gemini) appear in the image - those stay
 * in body copy (description meta) per docs/marketing_plan.md section 5; the
 * OG surface is the highest-amplification surface and stays vendor-neutral.
 *
 * Run: npm run generate:og
 */
'use strict';

const fs = require('fs');
const path = require('path');
const satoriModule = require('satori');
const satori = satoriModule.default || satoriModule;
const sharp = require('sharp');

const ROOT = path.join(__dirname, '..');
const SOT_PATH = path.join(ROOT, 'config', 'sot.json');
const FONTS_DIR = path.join(ROOT, 'assets', 'fonts');
const OUT_PATH = path.join(ROOT, 'og-image.png');

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;
const OG_MAX_BYTES = 300 * 1024;
const SAFE_PADDING = 80;

// Lucide "command" icon path (cloverleaf), viewBox 0 0 24 24.
// Source: lucide-static, MIT licensed.
const COMMAND_ICON_PATH =
  'M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z';

function buildTree({ navy, gold, brand, headline, url }) {
  return {
    type: 'div',
    props: {
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: `${SAFE_PADDING}px`,
        backgroundColor: navy,
        // Subtle gold radial highlight top-right echoing the live hero gradient.
        backgroundImage:
          'radial-gradient(ellipse 88% 65% at 100% 0%, rgba(245, 197, 24, 0.16) 0%, rgba(245, 197, 24, 0) 62%)',
        color: '#FFFFFF',
        fontFamily: 'Inter',
      },
      children: [
        // Top: brand row
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
            },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    width: 56,
                    height: 56,
                    borderRadius: 14,
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.22)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                  children: {
                    type: 'svg',
                    props: {
                      width: 30,
                      height: 30,
                      viewBox: '0 0 24 24',
                      fill: 'none',
                      stroke: '#FFFFFF',
                      strokeWidth: 2,
                      strokeLinecap: 'round',
                      strokeLinejoin: 'round',
                      children: {
                        type: 'path',
                        props: { d: COMMAND_ICON_PATH },
                      },
                    },
                  },
                },
              },
              {
                type: 'span',
                props: {
                  style: {
                    fontSize: 32,
                    fontWeight: 500,
                    color: 'rgba(255, 255, 255, 0.92)',
                    letterSpacing: '0.01em',
                  },
                  children: brand,
                },
              },
            ],
          },
        },
        // Middle: H1 + gold accent line
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: 32,
            },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    flexDirection: 'column',
                    fontSize: 96,
                    fontWeight: 800,
                    lineHeight: 1.04,
                    letterSpacing: '-0.02em',
                    color: '#FFFFFF',
                  },
                  children: headline.map((line) => ({
                    type: 'span',
                    props: { children: line },
                  })),
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    width: 112,
                    height: 5,
                    borderRadius: 3,
                    backgroundColor: gold,
                  },
                },
              },
            ],
          },
        },
        // Bottom: URL
        {
          type: 'span',
          props: {
            style: {
              fontSize: 30,
              fontWeight: 500,
              color: gold,
              letterSpacing: '0.01em',
            },
            children: url,
          },
        },
      ],
    },
  };
}

async function main() {
  const sot = JSON.parse(fs.readFileSync(SOT_PATH, 'utf8'));
  const navy = sot.colors && sot.colors.deepBlue;
  const gold = sot.colors && sot.colors.primaryYellow;
  if (!navy || !gold) {
    throw new Error('config/sot.json#colors.deepBlue and primaryYellow are required');
  }

  // Satori uses @shuding/opentype.js which accepts TTF/OTF/WOFF, but NOT WOFF2.
  // We ship the latin subset as WOFF (from @fontsource/inter, latin subset,
  // ~31 KB each) to keep the repo light while preserving high-fidelity glyphs.
  const interBold = fs.readFileSync(path.join(FONTS_DIR, 'Inter-Bold.woff'));
  const interMedium = fs.readFileSync(path.join(FONTS_DIR, 'Inter-Medium.woff'));

  const tree = buildTree({
    navy,
    gold,
    brand: 'Prompt Anatomy',
    headline: ['Classroom-ready', 'AI prompts', 'for K-12 teachers'],
    url: 'promptanatomy.online',
  });

  const svg = await satori(tree, {
    width: OG_WIDTH,
    height: OG_HEIGHT,
    fonts: [
      { name: 'Inter', data: interBold, weight: 800, style: 'normal' },
      { name: 'Inter', data: interMedium, weight: 500, style: 'normal' },
    ],
  });

  let png = await sharp(Buffer.from(svg))
    .png({ compressionLevel: 9, palette: true, quality: 90, effort: 10 })
    .toBuffer();

  if (png.length > OG_MAX_BYTES) {
    png = await sharp(Buffer.from(svg))
      .png({ compressionLevel: 9, colors: 64, effort: 10 })
      .toBuffer();
    if (png.length > OG_MAX_BYTES) {
      console.warn(
        `Warning: og-image.png still ${png.length} bytes (target <= ${OG_MAX_BYTES})`
      );
    }
  }

  fs.writeFileSync(OUT_PATH, png);
  console.log(`og-image.png: ${png.length} bytes (${OG_WIDTH}x${OG_HEIGHT})`);
}

main().catch(function (err) {
  console.error(err);
  process.exit(1);
});
