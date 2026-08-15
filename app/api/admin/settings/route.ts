import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const settingsFilePath = path.join(process.cwd(), "data", "settings.json");

function getSettingsData() {
  if (!fs.existsSync(settingsFilePath)) {
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
      announcement: "Now accepting custom wedding bookings for the upcoming holiday season."
    };
    fs.mkdirSync(path.dirname(settingsFilePath), { recursive: true });
    fs.writeFileSync(settingsFilePath, JSON.stringify(defaultSettings, null, 2), "utf-8");
    return defaultSettings;
  }
  const fileContent = fs.readFileSync(settingsFilePath, "utf-8");
  try {
    return JSON.parse(fileContent);
  } catch {
    return {};
  }
}

function saveSettingsData(settings: any) {
  fs.mkdirSync(path.dirname(settingsFilePath), { recursive: true });
  fs.writeFileSync(settingsFilePath, JSON.stringify(settings, null, 2), "utf-8");
}

export async function GET() {
  try {
    const settings = getSettingsData();
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: "Failed to load settings" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const current = getSettingsData();
    const updated = { ...current, ...body, updatedAt: new Date().toISOString() };
    saveSettingsData(updated);
    return NextResponse.json({ success: true, settings: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Failed to update settings" }, { status: 500 });
  }
}
