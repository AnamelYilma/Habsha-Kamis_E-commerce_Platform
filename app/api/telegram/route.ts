import { NextResponse } from "next/server";
import { sendTelegramMessage } from "@/lib/telegram";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, customer, measurements, designName, inquiry } = body;

    let messageText = "";

    if (type === "order") {
      messageText = `
🛍️ <b>NEW HABESHA KAMIS ORDER</b> 🛍️

👤 <b>Customer Info:</b>
• <b>Name:</b> ${customer?.fullName || "N/A"}
• <b>Phone:</b> ${customer?.phone || "N/A"}
• <b>Email:</b> ${customer?.email || "N/A"}

👗 <b>Design:</b> ${designName || "Custom Order"}

📐 <b>Measurements (cm/inches):</b>
• <b>Chest / Bust:</b> ${measurements?.chest || "N/A"}
• <b>Waist:</b> ${measurements?.waist || "N/A"}
• <b>Hips:</b> ${measurements?.hips || "N/A"}
• <b>Shoulder Width:</b> ${measurements?.shoulder || "N/A"}
• <b>Arm / Sleeve Length:</b> ${measurements?.sleeve || "N/A"}
• <b>Full Length / Height:</b> ${measurements?.height || "N/A"}

📝 <b>Notes:</b> ${customer?.notes || "None"}
      `.trim();
    } else if (type === "price_request") {
      messageText = `
💬 <b>PRICE INQUIRY REQUEST</b> 💬

👤 <b>Customer Info:</b>
• <b>Name:</b> ${customer?.fullName || "N/A"}
• <b>Phone:</b> ${customer?.phone || "N/A"}

👗 <b>Design Item:</b> ${designName || "General Inquiry"}
❓ <b>Question:</b> ${inquiry || "Customer requested current pricing details."}
      `.trim();
    } else {
      messageText = `📩 <b>NEW INQUIRY FROM WEBSITE</b>\n\n${JSON.stringify(body, null, 2)}`;
    }

    const result = await sendTelegramMessage(messageText);

    if (!result.success && result.error?.includes("Telegram Chat ID missing")) {
      // Graceful fallback for local dev when TELEGRAM_CHAT_ID is not set yet
      return NextResponse.json({
        success: true,
        message: "Order formatted successfully! (Set TELEGRAM_CHAT_ID in env to receive live messages on Telegram)",
        telegramSent: false,
      });
    }

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Sent successfully to Telegram!", telegramSent: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || "Server Error" }, { status: 500 });
  }
}
