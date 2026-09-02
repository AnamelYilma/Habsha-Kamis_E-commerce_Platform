import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const settingsFilePath = path.join(process.cwd(), "data", "settings.json");
const uploadsDir = path.join(process.cwd(), "public", "uploads");

// Keys that hold home-page image paths (admin-manageable)
export const HOME_IMAGE_KEYS = [
  "heroImage",
  "storyImage",
  "catImageWedding",
  "catImageFemale",
  "catImageMale",
  "catImageFamily"
] as const;

function getSettingsData() {
  const defaultSettings = {
    shopName: "Habesha Kamis Tailor Shop",
    amharicShopName: "ሐበሻ ቀሚስ የባህል አልባሳት",
    phone1: "+251 911 234 567",
    phone2: "+251 908 765 432",
    telegram: "https://t.me/HabeshaKamisTailorShop",
    telegramUsername: "@HabeshaKamisTailorShop",
    email: "contact@habeshakamis.et",
    address: "Bole Medhanialem Mall, 3rd Floor, Suite 304, Addis Ababa, Ethiopia",
    openingHours: "Monday – Saturday: 9:00 AM – 7:00 PM (Sunday by Appointment)",
    announcement: "Now accepting custom wedding bookings for the upcoming holiday season.",
    heroImage: "/hero_kemis.jpg",
    storyImage: "/hero_kemis.jpg",
    catImageWedding: "/hero_kemis.jpg",
    catImageFemale: "/hero_kemis.jpg",
    catImageMale: "/hero_kemis.jpg",
    catImageFamily: "/hero_kemis.jpg"
  };
  if (!fs.existsSync(settingsFilePath)) {
    fs.mkdirSync(path.dirname(settingsFilePath), { recursive: true });
    fs.writeFileSync(settingsFilePath, JSON.stringify(defaultSettings, null, 2), "utf-8");
    return defaultSettings;
  }
  const fileContent = fs.readFileSync(settingsFilePath, "utf-8");
  try {
    return { ...defaultSettings, ...JSON.parse(fileContent) };
  } catch {
    return defaultSettings;
  }
}

function saveSettingsData(settings: any) {
  fs.mkdirSync(path.dirname(settingsFilePath), { recursive: true });
  fs.writeFileSync(settingsFilePath, JSON.stringify(settings, null, 2), "utf-8");
}

async function saveUploadedImage(file: File, prefix: string): Promise<string> {
  fs.mkdirSync(uploadsDir, { recursive: true });
  const bytes = Buffer.from(await file.arrayBuffer());
  const fileExt = path.extname(file.name) || ".jpg";
  const fileName = `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}${fileExt}`;
  fs.writeFileSync(path.join(uploadsDir, fileName), bytes);
  return `/uploads/${fileName}`;
}

export async function GET() {
  try {
    const settings = getSettingsData();
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: "Failed to load settings" }, { status: 500 });
  }
}

// PATCH accepts both application/json and multipart/form-data (for image uploads)
export async function PATCH(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") || "";
    let updates: Record<string, any> = {};

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
          if (HOME_IMAGE_KEYS.includes(key as any) && value.size > 0) {
            updates[key] = saveUploadedImage(value, `home-${key}`);
          }
        } else {
          // Text field — keep existing value if an empty string was sent for an image key
          if (!(HOME_IMAGE_KEYS.includes(key as any) && !String(value).trim())) {
            updates[key] = String(value);
          }
        }
      }
    } else {
      updates = await request.json();
    }

    const current = getSettingsData();
    const updated = { ...current, ...updates, updatedAt: new Date().toISOString() };
    saveSettingsData(updated);
    return NextResponse.json({ success: true, settings: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Failed to update settings" }, { status: 500 });
  }
}
