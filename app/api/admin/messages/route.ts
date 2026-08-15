import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const messagesFilePath = path.join(process.cwd(), "data", "messages.json");
const activityFilePath = path.join(process.cwd(), "data", "activity.json");

function getMessagesData() {
  if (!fs.existsSync(messagesFilePath)) {
    fs.mkdirSync(path.dirname(messagesFilePath), { recursive: true });
    fs.writeFileSync(messagesFilePath, JSON.stringify([], null, 2), "utf-8");
    return [];
  }
  const fileContent = fs.readFileSync(messagesFilePath, "utf-8");
  try {
    return JSON.parse(fileContent);
  } catch {
    return [];
  }
}

function saveMessagesData(messages: any[]) {
  fs.mkdirSync(path.dirname(messagesFilePath), { recursive: true });
  fs.writeFileSync(messagesFilePath, JSON.stringify(messages, null, 2), "utf-8");
}

function logActivity(eventType: string, title: string, detail: string) {
  try {
    let activities = [];
    if (fs.existsSync(activityFilePath)) {
      activities = JSON.parse(fs.readFileSync(activityFilePath, "utf-8"));
    }
    activities.unshift({
      id: `act-${Date.now()}`,
      eventType,
      title,
      detail,
      timestamp: new Date().toISOString()
    });
    fs.writeFileSync(activityFilePath, JSON.stringify(activities.slice(0, 50), null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to log activity", err);
  }
}

export async function GET() {
  try {
    const messages = getMessagesData();
    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json({ error: "Failed to load messages" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newMessage = {
      id: `msg-${Date.now()}`,
      type: body.type || "cloth_inquiry", // 'cloth_inquiry' | 'contact_message' | 'price_request'
      customerName: body.customerName || "Customer",
      phone: body.phone || "",
      subject: body.subject || "Cloth Inquiry",
      message: body.message || "",
      action: body.action || "General Request",
      status: "unread",
      createdAt: new Date().toISOString()
    };

    const messages = getMessagesData();
    messages.unshift(newMessage);
    saveMessagesData(messages);

    logActivity(newMessage.type, "New Customer Inquiry Received", `${newMessage.customerName} (${newMessage.phone}) asked about: ${newMessage.subject}`);

    return NextResponse.json({ success: true, message: newMessage }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Failed to create message" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status } = body;
    if (!id) return NextResponse.json({ error: "Missing message ID" }, { status: 400 });

    const messages = getMessagesData();
    const idx = messages.findIndex((m: any) => m.id === id);
    if (idx === -1) return NextResponse.json({ error: "Message not found" }, { status: 404 });

    if (status) messages[idx].status = status;
    saveMessagesData(messages);

    return NextResponse.json({ success: true, message: messages[idx] });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Failed to update message" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

    const messages = getMessagesData();
    const updated = messages.filter((m: any) => m.id !== id);
    saveMessagesData(updated);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete message" }, { status: 500 });
  }
}
