import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const activityFilePath = path.join(process.cwd(), "data", "activity.json");
const ordersFilePath = path.join(process.cwd(), "data", "orders.json");
const designsFilePath = path.join(process.cwd(), "data", "designs.json");
const messagesFilePath = path.join(process.cwd(), "data", "messages.json");

function safeReadJson(filePath: string, fallback: any = []) {
  try {
    if (!fs.existsSync(filePath)) return fallback;
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch {
    return fallback;
  }
}

export async function GET() {
  try {
    const activities = safeReadJson(activityFilePath, []);
    const orders = safeReadJson(ordersFilePath, []);
    const designs = safeReadJson(designsFilePath, []);
    const messages = safeReadJson(messagesFilePath, []);

    const inProductionCount = orders.filter((o: any) => o.status === "in_production").length;
    const pendingOrdersCount = orders.filter((o: any) => o.status === "received" || o.status === "accepted").length;
    const unreadMessagesCount = messages.filter((m: any) => m.status === "unread").length;

    return NextResponse.json({
      stats: {
        totalOrders: orders.length,
        inProduction: inProductionCount,
        pendingOrders: pendingOrdersCount,
        totalDesigns: designs.length,
        totalInquiries: messages.length,
        unreadInquiries: unreadMessagesCount,
        estimatedVisitorsToday: 142 + Math.floor(orders.length * 3.5)
      },
      recentActivity: activities
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to load activity" }, { status: 500 });
  }
}
