export type IdentityRole = "participant" | "volunteer";

export interface CardData {
  name: string;
  photoUrl: string | null;
  role: IdentityRole;
}

// Cached static logo images
let cachedLogos: { [key: string]: HTMLImageElement | null } = {};
let latestRenderId = 0;

const loadImage = (src: string): Promise<HTMLImageElement | null> => {
  if (cachedLogos[src]) {
    return Promise.resolve(cachedLogos[src]);
  }
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      cachedLogos[src] = img;
      resolve(img);
    };
    img.onerror = () => resolve(null);
    img.src = src;
  });
};

export const generateCardCanvas = async (
  data: CardData,
  canvas: HTMLCanvasElement
): Promise<void> => {
  const currentRenderId = ++latestRenderId;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get 2d context");

  const width = 1080;
  const height = 1350;
  
  canvas.width = width;
  canvas.height = height;

  // Preload all 4 logos concurrently
  const [souImg, ieeeSbImg, ieeeCsImg, kalpvrukshImg] = await Promise.all([
    loadImage("/brand/logo1.png"),
    loadImage("/brand/logo3.png"),
    loadImage("/brand/logo2.png"),
    loadImage("/brand/kalpvruksh.png"),
  ]);

  if (currentRenderId !== latestRenderId) return;

  // Clear canvas completely
  ctx.clearRect(0, 0, width, height);

  // 1. Draw Background (White / Off-White theme from Image 5)
  ctx.fillStyle = "#FAFAF7";
  ctx.fillRect(0, 0, width, height);

  // Deep Navy footer area
  ctx.fillStyle = "#071D33";
  ctx.fillRect(0, height - 350, width, 350);

  // 2. Draw Geometry/Visuals (Abstract Quantum look in Cyan/Teal)
  ctx.strokeStyle = "rgba(0, 175, 196, 0.15)";
  ctx.lineWidth = 2;
  
  // Orbit 1
  ctx.beginPath();
  ctx.ellipse(width / 2, height / 2 - 120, 450, 450, 0, 0, Math.PI * 2);
  ctx.stroke();
  
  // Orbit 2
  ctx.beginPath();
  ctx.ellipse(width / 2, height / 2 - 120, 350, 550, Math.PI / 4, 0, Math.PI * 2);
  ctx.stroke();

  // Cyan circuit accent lines
  ctx.strokeStyle = "#11C5D9";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(100, height - 350);
  ctx.lineTo(300, height - 350);
  ctx.lineTo(350, height - 300);
  ctx.stroke();

  // Enable high-quality image smoothing
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  // Helper to draw images strictly contained within a bounding box
  const drawContained = (
    img: HTMLImageElement | null,
    boxX: number,
    boxY: number,
    boxW: number,
    boxH: number
  ) => {
    if (!img) return;
    const aspect = img.naturalWidth / (img.naturalHeight || 1);
    let drawW = boxW;
    let drawH = boxW / aspect;
    if (drawH > boxH) {
      drawH = boxH;
      drawW = boxH * aspect;
    }
    const drawX = boxX + (boxW - drawW) / 2;
    const drawY = boxY + (boxH - drawH) / 2;
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  };

  // 3. Draw Top Logos above ENTANGLE (All 4 Institutional Hosts)
  const bannerX = 36;
  const bannerY = 26;
  const bannerW = width - 72; // 1008px
  const bannerH = 96;

  // Draw sleek top institutional banner on the card
  ctx.fillStyle = "#071D33";
  ctx.beginPath();
  ctx.roundRect(bannerX, bannerY, bannerW, bannerH, 14);
  ctx.fill();

  ctx.strokeStyle = "rgba(0, 175, 196, 0.4)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(bannerX, bannerY, bannerW, bannerH, 14);
  ctx.stroke();

  // 1. Silver Oak University (Slot width: 260px)
  drawContained(souImg, bannerX + 10, bannerY + 12, 250, 72);

  // Divider 1
  ctx.strokeStyle = "rgba(0, 175, 196, 0.25)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(bannerX + 270, bannerY + 18);
  ctx.lineTo(bannerX + 270, bannerY + bannerH - 18);
  ctx.stroke();

  // 2. IEEE SOU Student Branch (Slot width: 245px)
  drawContained(ieeeSbImg, bannerX + 280, bannerY + 14, 235, 68);

  // Divider 2
  ctx.beginPath();
  ctx.moveTo(bannerX + 525, bannerY + 18);
  ctx.lineTo(bannerX + 525, bannerY + bannerH - 18);
  ctx.stroke();

  // 3. IEEE Computer Society (Slot width: 265px)
  drawContained(ieeeCsImg, bannerX + 535, bannerY + 12, 255, 72);

  // Divider 3
  ctx.beginPath();
  ctx.moveTo(bannerX + 800, bannerY + 18);
  ctx.lineTo(bannerX + 800, bannerY + bannerH - 18);
  ctx.stroke();

  // 4. Kalpvruksh (Slot width: 198px)
  drawContained(kalpvrukshImg, bannerX + 810, bannerY + 10, 188, 76);

  // 4. Draw User Photo (if available)
  const size = 460;
  const cx = width / 2;
  const cy = 640;

  if (data.photoUrl) {
    await new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.onload = () => {
        ctx.save();
        ctx.beginPath();
        // Circular frame for the photo
        ctx.arc(cx, cy, size / 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        
        // Calculate object-fit cover
        const imgAspect = img.width / img.height;
        let drawWidth = size;
        let drawHeight = size;
        let offsetX = 0;
        let offsetY = 0;
        
        if (imgAspect > 1) {
          drawWidth = size * imgAspect;
          offsetX = -(drawWidth - size) / 2;
        } else {
          drawHeight = size / imgAspect;
          offsetY = -(drawHeight - size) / 2;
        }
        
        ctx.drawImage(img, cx - size/2 + offsetX, cy - size/2 + offsetY, drawWidth, drawHeight);
        ctx.restore();
        
        resolve();
      };
      img.onerror = reject;
      img.src = data.photoUrl!;
    });
  } else {
    // Placeholder photo
    ctx.fillStyle = "#0B3554";
    ctx.beginPath();
    ctx.arc(cx, cy, size / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#092B46";
    ctx.beginPath();
    ctx.arc(cx, cy, size / 4, 0, Math.PI * 2);
    ctx.fill();
  }

  // Draw Photo Frame (Cyan/Navy rings)
  ctx.strokeStyle = "#071D33";
  ctx.lineWidth = 12;
  ctx.beginPath();
  ctx.arc(cx, cy, size / 2 + 6, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = "#00AFC4";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(cx, cy, size / 2 + 16, 0, Math.PI * 2);
  ctx.stroke();

  // 5. Draw Typography matching the poster
  ctx.textAlign = "center";
  
  // Event Title: ENTANGLE (Generous space below top logo banner)
  ctx.fillStyle = "#0B192C";
  ctx.font = "900 84px 'Inter', 'Montserrat', system-ui, sans-serif";
  ctx.letterSpacing = "3px";
  ctx.fillText("ENTANGLE", width / 2, 230);
  
  // Subtitle: A QUANTUM ODYSSEY
  ctx.fillStyle = "#0284C7"; // Vibrant blue/cyan as in poster
  ctx.font = "600 28px 'Inter', 'Montserrat', system-ui, sans-serif";
  ctx.letterSpacing = "12px";
  ctx.fillText("A QUANTUM ODYSSEY", width / 2, 285);
  ctx.letterSpacing = "0px";

  // Role Banner (e.g. I'M PARTICIPATING / I'M VOLUNTEERING)
  const roleText = data.role === "volunteer" ? "I'M VOLUNTEERING" : "I'M PARTICIPATING";
  ctx.fillStyle = "#00E5FF"; // Bright cyan
  ctx.font = "700 36px 'Inter', 'Montserrat', monospace, sans-serif";
  ctx.letterSpacing = "6px";
  ctx.fillText(roleText, width / 2, height - 265);
  ctx.letterSpacing = "0px";

  // User Name
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "800 68px 'Inter', 'Montserrat', 'Oswald', system-ui, sans-serif";
  ctx.letterSpacing = "2px";
  ctx.fillText(data.name || "YOUR NAME", width / 2, height - 165);

  // Event Details
  ctx.fillStyle = "#65C7D8"; // Soft blue
  ctx.font = "500 26px 'Inter', 'Montserrat', system-ui, sans-serif";
  ctx.letterSpacing = "3px";
  ctx.fillText("08 — 09 SEPT 2026 • SILVER OAK UNIVERSITY", width / 2, height - 70);
  ctx.letterSpacing = "0px";
};

export const exportCard = (canvas: HTMLCanvasElement, filename: string) => {
  const url = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.download = filename;
  link.href = url;
  link.click();
};
