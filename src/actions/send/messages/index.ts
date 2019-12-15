import MessagingPlatforms from "config/messaging";
import { sendToMessenger } from "./messenger";
import logger from "config/logger";

const Platforms = MessagingPlatforms;

export async function sendMessage(platform: string, userId: string, message: string) {
  switch (platform) {
    case Platforms.Facebook: return sendToMessenger(userId, message);
    default: logger.error('Messaging platform not found', { platform });
  }
}
