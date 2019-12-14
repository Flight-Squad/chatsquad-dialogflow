import { sessionClient } from "config/gcp";

/**
 *
 * @param session full session path
 */
export async function sendPricesToDialogflow(session: string, data?) {
  sessionClient.detectIntent(
    {
      session,
      // session: sessionId,

      // Trigger a response event
      // https://googleapis.dev/nodejs/dialogflow/latest/google.cloud.dialogflow.v2beta1.html#.QueryInput
      // https://cloud.google.com/dialogflow/docs/events-custom
      queryInput: {
        text: {
          text: "",
          languageCode: 'en-US',
        },
        event: {
          name: 'displayFlight',
          parameters: data || {},
          languageCode: "en-US",
        },
      },
    }
  );
}
