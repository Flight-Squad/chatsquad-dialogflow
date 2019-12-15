import { MessengerClient } from 'messaging-api-messenger';
import { MESSENGER_ACCESS_TOKEN } from 'config/facebook';

// get accessToken from facebook developers website
const client = MessengerClient.connect(MESSENGER_ACCESS_TOKEN);

export async function sendToMessenger(userId: string, message: string) {
  return client.sendText(userId, message);
}
