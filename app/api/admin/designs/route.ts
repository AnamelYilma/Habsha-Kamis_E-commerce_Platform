import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "designs.json");
const uploadsDir = path.join(process.cwd(), "public", "uploads");

// Helper to ensure files and directories exist
function getDesignsData() {
  if (!fs.existsSync(dataFilePath)) {
    fs.mkdirSync(path.dirname(dataFilePath), { recursive: true });
    fs.writeFileSync(dataFilePath, JSON.stringify([], null, 2), "utf-8");
    return [];
  }
  const fileContent = fs.readFileSync(dataFilePath, "utf-8");
  try {
    return JSON.parse(fileContent);
  } catch {
    return [];
  }
}

function saveDesignsData(designs: any[]) {
  fs.mkdirSync(path.dirname(dataFilePath), { recursive: true });
  fs.writeFileSync(dataFilePath, JSON.stringify(designs, null, 2), "utf-8");
}

// GET: Fetch all designs
export async function GET() {
  try {
    const designs = getDesignsData();
    return NextResponse.json(designs);
  } catch (error) {
    return NextResponse.json({ error: "Failed to read designs" }, { status: 500 });
  }
}

// POST: Add new design with optional image file upload
export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") || "";
    let name = "";
    let amharicName = "";
    let category = "wedding";
    let priceRange = "";
    let description = "";
    let material = "";
    let weaveTime = "";
    let production = "";
    let imageUrls: string[] = [];

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      name = (formData.get("name") as string) || "Custom Design";
      amharicName = (formData.get("amharicName") as string) || "";
      category = (formData.get("category") as string) || "wedding";
      priceRange = (formData.get("priceRange") as string) || "15,000 - 25,000 ETB";
      description = (formData.get("description") as string) || "";
      material = (formData.get("material") as string) || "100% Ethiopian Cotton";
      weaveTime = (formData.get("weaveTime") as string) || "60 Hours";
      production = (formData.get("production") as string) || "2 Weeks";

      // Process uploaded image file
      const imageFile = formData.get("imageFile") as File | null;
      if (imageFile && imageFile.size > 0) {
        if (!fs.existsSync(uploadsDir)) {
          fs.mkdirSync(uploadsDir, { recursive: true });
        }
        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const fileExt = path.extname(imageFile.name) || ".jpg";
        const fileName = `design-${Date.now()}-${Math.random().toString(36).substring(2, 7)}${fileExt}`;
        const filePath = path.join(uploadsDir, fileName);
        fs.writeFileSync(filePath, buffer);
        imageUrls.push(`/uploads/${fileName}`);
      }

      // If user also provided fallback URL
      const customUrl = formData.get("imageUrl") as string | null;
      if (customUrl && customUrl.trim()) {
        imageUrls.push(customUrl.trim());
      }
    } else {
      const body = await request.json();
      name = body.name || "Custom Design";
      amharicName = body.amharicName || "";
      category = body.category || "wedding";
      priceRange = body.priceRange || "15,000 - 25,000 ETB";
      description = body.description || "";
      material = body.material || "100% Ethiopian Cotton";
      weaveTime = body.weaveTime || "60 Hours";
      production = body.production || "2 Weeks";
      imageUrls = body.images || [];
    }

    if (imageUrls.length === 0) {
      imageUrls.push("https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80");
    }

    const newDesign = {
      id: `ds-${Date.now()}`,
      name,
      amharicName,
      category,
      priceRange,
      description,
      images: imageUrls,
      specs: {
        material,
        weaveTime,
        production
      },
      createdAt: new Date().toISOString()
    };

    const designs = getDesignsData();
    designs.unshift(newDesign);
    saveDesignsData(designs);

    return NextResponse.json({ success: true, design: newDesign }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating design:", error);
    return NextResponse.json({ error: error?.message || "Failed to create design" }, { status: 500 });
  }
}

// PATCH: Update an existing design by ID
export async function PATCH(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") || "";
    const designs = getDesignsData();

    let id = "";
    const updates: Record<string, any> = {};

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      id = (formData.get("id") as string) || "";
      if (!id) return NextResponse.json({ error: "Missing design ID" }, { status: 400 });

      const textFields = ["name", "amharicName", "category", "priceRange", "description", "material", "weaveTime", "production"] as const;
      for (const field of textFields) {
        const value = formData.get(field);
        if (value !== null && value !== undefined) updates[field] = String(value);
      }

      // Optional new image upload
      const imageFile = formData.get("imageFile") as File | null;
      if (imageFile && imageFile.size > 0) {
        if (!fs.existsSync(uploadsDir)) {
          fs.mkdirSync(uploadsDir, { recursive: true });
        }
        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const fileExt = path.extname(imageFile.name) || ".jpg";
        const fileName = `design-${Date.now()}-${Math.random().toString(36).substring(2, 7)}${fileExt}`;
        fs.writeFileSync(path.join(uploadsDir, fileName), buffer);
        // New uploaded image becomes the first (primary) image
        updates.images = [`/uploads/${fileName}`];
      } else {
        const customUrl = formData.get("imageUrl") as string | null;
        if (customUrl && customUrl.trim()) {
          updates.images = [customUrl.trim()];
        }
      }
    } else {
      const body = await request.json();
      id = body.id || "";
      if (!id) return NextResponse.json({ error: "Missing design ID" }, { status: 400 });

      const allowed = ["name", "amharicName", "category", "priceRange", "description", "images"] as const;
      for (const field of allowed) {
        if (body[field] !== undefined) updates[field] = body[field];
      }
    }

    const index = designs.findIndex((d: any) => d.id === id);
    if (index === -1) {
      return NextResponse.json({ error: "Design not found" }, { status: 404 });
    }

    const existing = designs[index];
    designs[index] = {
      ...existing,
      ...updates,
      // If specs fields provided individually, merge them
      specs:
        updates.material || updates.weaveTime || updates.production
          ? {
              ...existing.specs,
              material: updates.material ?? existing.specs?.material ?? "",
              weaveTime: updates.weaveTime ?? existing.specs?.weaveTime ?? "",
              production: updates.production ?? existing.specs?.production ?? ""
            }
          : existing.specs
    };
    delete designs[index].material;
    delete designs[index].weaveTime;
    delete designs[index].production;

    saveDesignsData(designs);

    return NextResponse.json({ success: true, design: designs[index] });
  } catch (error: any) {
    console.error("Error updating design:", error);
    return NextResponse.json({ error: error?.message || "Failed to update design" }, { status: 500 });
  }
}

// DELETE: Delete a design by ID
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Missing design ID" }, { status: 400 });
    }

    const designs = getDesignsData();
    const updated = designs.filter((d: any) => d.id !== id);
    saveDesignsData(updated);

    return NextResponse.json({ success: true, message: "Design deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete design" }, { status: 500 });
  }
}
