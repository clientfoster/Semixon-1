// Node.js ID card generator (uses node-canvas)

const fs = require("fs");
const path = require("path");
const { createCanvas, loadImage, registerFont } = require("canvas");
const QRCode = require("qrcode");
const { parse } = require("csv-parse/sync");

// ---- Font setup (adjust to your .ttf name if you have one) ----
const tryFonts = [
  { path: "DejaVuSans.ttf", family: "DejaVuSans" },
  { path: "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", family: "DejaVuSans" },
  { path: "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf", family: "LiberationSans" },
];

for (const f of tryFonts) {
  if (fs.existsSync(f.path)) {
    try { registerFont(f.path, { family: f.family }); break; } catch {}
  }
}
const FONT_FAMILY = "DejaVuSans, Sans-Serif";

// ---- Helpers ----
function drawCentered(ctx, text, x, y, fontPx, color = "#000") {
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `${fontPx}px "${FONT_FAMILY}"`;
  ctx.fillText(text, x, y);
}

function drawLeft(ctx, text, x, y, fontPx, color = "#141414") {
  ctx.fillStyle = color;
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.font = `${fontPx}px "${FONT_FAMILY}"`;
  ctx.fillText(text, x, y);
}

async function drawCircularImage(ctx, img, cx, cy, diameter) {
  const r = diameter / 2;
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();
  // draw so the circle is centered at (cx, cy)
  ctx.drawImage(img, cx - r, cy - r, diameter, diameter);
  ctx.restore();
}

function initialsFrom(name) {
  return (name || "")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(s => s[0]?.toUpperCase() || "")
    .join("") || "NA";
}

async function generateCard(row, frontPath, backPath, outDir) {
  const frontTpl = await loadImage(frontPath);
  const backTpl  = await loadImage(backPath);

  // Canvas sizes from your template (approx 1011x639)
  const W = frontTpl.width, H = frontTpl.height;

  // COLORS (tweak if needed)
  const BLACK = "#000000";
  const DARK  = "#141414";
  const SEMIXON_BLUE = "#2D82FF";

  // ---------- FRONT ----------
  const front = createCanvas(W, H);
  const fctx = front.getContext("2d");
  fctx.drawImage(frontTpl, 0, 0, W, H);

  const company = (row.company || "COMPANY").toUpperCase();
  const name    = (row.name || "FULL NAME").toUpperCase();
  const role    = row.role || "Professional Employee";
  const phone   = row.phone || "";
  const email   = row.email || "";
  const empId   = row.employee_id || "XXXXXX";

  // Layout tuned for your artwork
  const cx = Math.floor(W / 2) + 60; // shift because photo is left
  const y0 = 120;

  drawCentered(fctx, company, cx, y0, 64, BLACK);
  drawCentered(fctx, name,    cx, y0 + 78, 72, SEMIXON_BLUE);
  drawCentered(fctx, role,    cx, y0 + 78 + 60, 36, DARK);

  let dx = cx - 250, dy = y0 + 78 + 60 + 50;
  const lineGap = 44;
  if (phone) { drawLeft(fctx, `Phone : ${phone}`, dx, dy, 30, DARK); dy += lineGap; }
  if (email) { drawLeft(fctx, `Mail : ${email}`,   dx, dy, 30, DARK); dy += lineGap + 10; }

  drawCentered(fctx, `ID : ${empId}`, cx, H - 120, 54, BLACK);

  // Photo (circular). Approximate circle in the left band.
  const circleSize = 260;
  const circleCX = 130 + circleSize / 2;
  const circleCY = H / 2 - 10;
  if (row.photo_path && fs.existsSync(row.photo_path)) {
    const head = await loadImage(row.photo_path);
    await drawCircularImage(fctx, head, circleCX, circleCY, circleSize);
  } else {
    // No photo -> initials badge
    fctx.save();
    fctx.beginPath();
    fctx.arc(circleCX, circleCY, circleSize/2, 0, Math.PI*2);
    fctx.fillStyle = "#EBEBEB";
    fctx.fill();
    fctx.lineWidth = 6;
    fctx.strokeStyle = "#FFFFFF";
    fctx.stroke();
    fctx.restore();
    drawCentered(fctx, initialsFrom(name), circleCX, circleCY, 96, "#323232");
  }

  // ---------- BACK ----------
  const back = createCanvas(W, H);
  const bctx = back.getContext("2d");
  bctx.drawImage(backTpl, 0, 0, W, H);

  const titleRaw = (row.back_title && row.back_title.trim())
    ? row.back_title
    : `${company} TECHNOLOGIES`;
  const words = titleRaw.split(/\s+/);
  const line1 = words.length > 1 ? words[0] : titleRaw;
  const line2 = words.length > 1 ? words.slice(1).join(" ") : "";

  drawLeft(bctx, line1.toUpperCase(), Math.floor(W * 0.32), 70 + 60, 72, SEMIXON_BLUE);
  drawLeft(bctx, line2.toUpperCase(), Math.floor(W * 0.32), 70 + 60 + 76, 68, SEMIXON_BLUE);

  // QR (center)
  if (row.qr_data) {
    const dataUrl = await QRCode.toDataURL(row.qr_data, { margin: 1, errorCorrectionLevel: "M" });
    const qrImg = await loadImage(dataUrl);
    const target = 350;
    bctx.drawImage(qrImg, W/2 - target/2, H/2 - target/2 + 10, target, target);
  }

  // Website footer
  if (row.website) {
    bctx.textAlign = "center";
    bctx.textBaseline = "alphabetic";
    bctx.font = `40px "${FONT_FAMILY}"`;
    bctx.fillStyle = DARK;
    bctx.fillText(row.website, W/2, H - 60);
  }

  // ---------- SAVE ----------
  const safe = (row.name || "employee").replace(/[^a-z0-9 _-]/gi, "").trim().replace(/\s+/g, "_");
  const outFront = path.join(outDir, `${safe}_front.jpg`);
  const outBack  = path.join(outDir, `${safe}_back.jpg`);
  fs.writeFileSync(outFront, front.toBuffer("image/jpeg", { quality: 0.95 }));
  fs.writeFileSync(outBack,  back.toBuffer("image/jpeg",  { quality: 0.95 }));
  return { outFront, outBack };
}

async function main() {
  const csvPath   = process.argv[2];                   // e.g., employees.csv
  const frontPath = process.argv[3];                   // e.g., bf1c44cc-...jpg
  const backPath  = process.argv[4];                   // e.g., 4319e999-...jpg
  const outDir    = process.argv[5] || "output";

  if (!csvPath || !frontPath || !backPath) {
    console.error("Usage: node generate.js <employees.csv> <front.jpg> <back.jpg> [outDir]");
    process.exit(1);
  }
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const csvText = fs.readFileSync(csvPath, "utf8");
  const rows = parse(csvText, {
    columns: true,
    skip_empty_lines: true,
    trim: true
  });

  for (const row of rows) {
    const r = await generateCard(row, frontPath, backPath, outDir);
    console.log("Saved:", r.outFront, "and", r.outBack);
  }
}

// Export functions for use in the Next.js application
module.exports = {
  generateCard,
  initialsFrom
};

// Only run main if this file is executed directly
if (require.main === module) {
  main().catch(err => { console.error(err); process.exit(1); });
}