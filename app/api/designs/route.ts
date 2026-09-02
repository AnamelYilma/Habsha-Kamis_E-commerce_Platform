import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "designs.json");

// Safe-read helper: returns [] if file missing or corrupted JSON
function getDesignsData() {
  if (!fs.existsSync(dataFilePath)) {
    return [];
  }
  try {
    const fileContent = fs.readFileSync(dataFilePath, "utf-8");
    const parsed = JSON.parse(fileContent);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

// GET /api/designs — public endpoint feeding Gallery + Homepage
export async function GET() {
  try {
    const designs = getDesignsData();
    // newest first so admin additions appear at the top of the gallery
    const sorted = [...designs].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return NextResponse.json(sorted);
  } catch (error) {
    console.error("Error reading designs:", error);
    return NextResponse.json({ error: "Failed to load designs" }, { status: 500 });
  }
}
