/**
 * Helper to send messages via Telegram Bot API
 */
export async function sendTelegramMessage(text: string, chatId?: string): Promise<{ success: boolean; error?: string }> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    console.warn("TELEGRAM_BOT_TOKEN is missing in environment variables.");
    return { success: false, error: "TELEGRAM_BOT_TOKEN missing in server configuration." };
  }
  const targetChatId = chatId || process.env.TELEGRAM_CHAT_ID;

  if (!targetChatId) {
    console.warn("Telegram Chat ID is missing. Message logged locally:\n", text);
    return { success: false, error: "Telegram Chat ID missing. Please set TELEGRAM_CHAT_ID in environment variables." };
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: targetChatId,
        text: text,
        parse_mode: "HTML",
      }),
    });

    const data = await response.json();
    if (!response.ok || !data.ok) {
      return { success: false, error: data.description || "Failed to send Telegram message" };
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || "Network error while connecting to Telegram API" };
  }
}
