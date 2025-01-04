import { EmailClient } from "@azure/communication-email";
import { DefaultAzureCredential } from "@azure/identity";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    // Authenticate using Azure Entra ID (Azure AD)
    const credential = new DefaultAzureCredential();
    const emailClient = new EmailClient("https://viva-email-service.communication.azure.com", credential);

    const { email, name } = req.body;

    const emailMessage = {
      senderAddress: process.env.AZURE_EMAIL_SENDER, // Your verified email
      recipients: {
        to: [{ address: email, displayName: name }],
      },
      content: {
        subject: "Welcome to Our Web App!",
        plainText: `Hello ${name}, welcome to our app!`,
        html: `<p>Hello <strong>${name}</strong>, welcome to our app!</p>`,
      },
    };

    const poller = await emailClient.beginSend(emailMessage);
    const response = await poller.pollUntilDone();

    if (response.id) {
      return res.status(200).json({ message: "Email sent successfully", id: response.id });
    } else {
      throw new Error("Failed to send email");
    }
  } catch (error) {
    console.error("Email sending error:", error);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
