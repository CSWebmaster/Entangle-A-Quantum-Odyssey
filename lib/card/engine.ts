export type IdentityRole = "participant" | "volunteer";

export interface CardData {
  name: string;
  photoUrl: string | null;
  role: IdentityRole;
}

// Cached template images
let cachedTemplates: { [key: string]: HTMLImageElement | null } = {};
let latestRenderId = 0;

const loadTemplateImage = (src: string): Promise<HTMLImageElement | null> => {
  if (cachedTemplates[src]) {
    return Promise.resolve(cachedTemplates[src]);
  }
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      cachedTemplates[src] = img;
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

  // Select template image based on role
  const templateSrc = data.role === "volunteer" 
    ? "/cards/volunteer.png" 
    : "/cards/participant.png";

  const templateImg = await loadTemplateImage(templateSrc);

  if (currentRenderId !== latestRenderId) return;

  // High-res canvas dimensions based on template aspect ratio
  const naturalW = templateImg?.naturalWidth || 1080;
  const naturalH = templateImg?.naturalHeight || 1380;
  const width = 1080;
  const height = Math.round(width * (naturalH / naturalW));

  canvas.width = width;
  canvas.height = height;

  // Enable high-quality image smoothing
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  // Clear canvas
  ctx.clearRect(0, 0, width, height);

  // 1. Draw Template Background
  if (templateImg) {
    ctx.drawImage(templateImg, 0, 0, width, height);
  } else {
    // Fallback background if image is loading
    ctx.fillStyle = "#071D33";
    ctx.fillRect(0, 0, width, height);
  }

  // 2. Draw User Photo inside the circular frame
  // The circle center in the template: cx = 50% width, cy = 58.5% height
  const cx = width / 2;
  const cy = height * 0.585;
  const radius = width * 0.235; // ~254px radius at 1080px width

  if (data.photoUrl) {
    await new Promise<void>((resolve) => {
      const userPhoto = new Image();
      userPhoto.crossOrigin = "Anonymous";
      userPhoto.onload = () => {
        if (currentRenderId !== latestRenderId) return resolve();

        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();

        // Object-fit: cover
        const imgAspect = userPhoto.width / userPhoto.height;
        let drawW = radius * 2;
        let drawH = radius * 2;
        let offX = 0;
        let offY = 0;

        if (imgAspect > 1) {
          drawW = radius * 2 * imgAspect;
          offX = -(drawW - radius * 2) / 2;
        } else {
          drawH = (radius * 2) / imgAspect;
          offY = -(drawH - radius * 2) / 2;
        }

        ctx.drawImage(userPhoto, cx - radius + offX, cy - radius + offY, drawW, drawH);
        ctx.restore();

        // Draw crisp circular border matching template
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.arc(cx, cy, radius - 4, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = "#00AFC4";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(cx, cy, radius + 2, 0, Math.PI * 2);
        ctx.stroke();

        resolve();
      };
      userPhoto.onerror = () => resolve();
      userPhoto.src = data.photoUrl!;
    });
  }

  if (currentRenderId !== latestRenderId) return;

  // 3. Draw User Name
  // Clear the placeholder "Name" area
  const nameBoxW = width * 0.75;
  const nameBoxH = height * 0.06;
  const nameBoxX = (width - nameBoxW) / 2;
  const nameBoxY = height * 0.772;

  // Fill background over the template's placeholder "Name"
  ctx.fillStyle = "#071D33";
  ctx.fillRect(nameBoxX, nameBoxY, nameBoxW, nameBoxH);

  const displayName = data.name.trim() || "YOUR NAME";
  
  // Calculate dynamic font size based on name length
  let fontSize = 68;
  if (displayName.length > 24) {
    fontSize = 44;
  } else if (displayName.length > 18) {
    fontSize = 52;
  } else if (displayName.length > 12) {
    fontSize = 60;
  }

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#FFFFFF";
  ctx.font = `700 ${fontSize}px 'Outfit', 'Playfair Display', 'Cinzel', Georgia, serif, sans-serif`;
  ctx.letterSpacing = "1.5px";
  ctx.fillText(displayName, width / 2, height * 0.805);
};

export const exportCard = (canvas: HTMLCanvasElement, filename: string) => {
  const url = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.download = filename;
  link.href = url;
  link.click();
};

