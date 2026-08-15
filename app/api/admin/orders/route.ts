import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const ordersFilePath = path.join(process.cwd(), "data", "orders.json");

function getOrdersData() {
  if (!fs.existsSync(ordersFilePath)) {
    fs.mkdirSync(path.dirname(ordersFilePath), { recursive: true });
    fs.writeFileSync(ordersFilePath, JSON.stringify([], null, 2), "utf-8");
    return [];
  }
  const fileContent = fs.readFileSync(ordersFilePath, "utf-8");
  try {
    return JSON.parse(fileContent);
  } catch {
    return [];
  }
}

function saveOrdersData(orders: any[]) {
  fs.mkdirSync(path.dirname(ordersFilePath), { recursive: true });
  fs.writeFileSync(ordersFilePath, JSON.stringify(orders, null, 2), "utf-8");
}

// GET: Fetch all customer orders
export async function GET() {
  try {
    const orders = getOrdersData();
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: "Failed to read orders" }, { status: 500 });
  }
}

// POST: Create a new custom tailoring order
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    if (!body.phone) {
      return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
    }

    const trackingCode = `HK-${Math.floor(100000 + Math.random() * 900000)}`;

    const newOrder = {
      id: `ord-${Date.now()}`,
      trackingCode,
      customerName: body.customerName || "Customer",
      phone: body.phone,
      occasion: body.occasion || "Bespoke Fitting",
      garmentType: body.garmentType || "Custom Habesha Dress",
      fabric: body.fabric || "Fine Menen Cotton",
      embroidery: body.embroidery || "Royal Gold Tilf",
      measurements: {
        height: body.measurements?.height || "",
        shoulder: body.measurements?.shoulder || "",
        chest: body.measurements?.chest || "",
        waist: body.measurements?.waist || "",
        hip: body.measurements?.hip || "",
        sleeve: body.measurements?.sleeve || "",
        dressLength: body.measurements?.dressLength || ""
      },
      neededByDate: body.neededByDate || "",
      notes: body.notes || "",
      status: "received", // received -> accepted -> calling_customer -> in_production -> ready -> delivered
      createdAt: new Date().toISOString()
    };

    const orders = getOrdersData();
    orders.unshift(newOrder);
    saveOrdersData(orders);

    return NextResponse.json({ success: true, order: newOrder }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Failed to create order" }, { status: 500 });
  }
}

// PATCH: Update order status or notes
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status, notes } = body;

    if (!id) {
      return NextResponse.json({ error: "Missing order ID" }, { status: 400 });
    }

    const orders = getOrdersData();
    const orderIndex = orders.findIndex((o: any) => o.id === id);

    if (orderIndex === -1) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (status) orders[orderIndex].status = status;
    if (notes !== undefined) orders[orderIndex].notes = notes;
    orders[orderIndex].updatedAt = new Date().toISOString();

    saveOrdersData(orders);

    return NextResponse.json({ success: true, order: orders[orderIndex] });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Failed to update order" }, { status: 500 });
  }
}

// DELETE: Delete an order
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing order ID" }, { status: 400 });
    }

    const orders = getOrdersData();
    const updated = orders.filter((o: any) => o.id !== id);
    saveOrdersData(updated);

    return NextResponse.json({ success: true, message: "Order removed" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete order" }, { status: 500 });
  }
}
