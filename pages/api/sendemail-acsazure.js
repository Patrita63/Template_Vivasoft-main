import { EmailClient } from "@azure/communication-email";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "❌ Method Not Allowed" });
    }

    try {
        debugger;
        console.log("📨 Request Body:", req.body);
        // Load connection string and sender
        const connectionString = process.env.NEXT_PUBLIC_AZURE_EMAIL_CONNECTION_STRING;
        console.log("🔍 NEXT_PUBLIC_AZURE_EMAIL_CONNECTION_STRING Loaded:", connectionString ? "Yes" : "No");

        const senderEmail = process.env.NEXT_PUBLIC_AZURE_EMAIL_SENDER;
        console.log("🔍 NEXT_PUBLIC_AZURE_EMAIL_SENDER Loaded:", senderEmail ? "Yes" : "No");
        console.log("🔍 Sender Email:", senderEmail);

        const connectionStringA = process.env.AZURE_EMAIL_CONNECTION_STRING;
        console.log("🔍 AZURE_EMAIL_CONNECTION_STRING Loaded:", connectionStringA ? "Yes" : "No");
        const senderEmailA = process.env.AZURE_EMAIL_SENDER;
        console.log("🔍 AZURE_EMAIL_SENDER Loaded:", senderEmailA ? "Yes" : "No");
        console.log("🔍 Sender EmailA:", senderEmailA);

        debugger;
        console.log("senderEmail: " + senderEmail);
        console.log("🔍 Sender EmailA:", senderEmailA);
        if (!connectionString || !senderEmail) {
            console.error("❌ Missing environment variables.");
            return res.status(500).json({ error: "Server misconfiguration. Missing environment variables." });
        }

        // Initialize Azure Email Client
        const emailClient = new EmailClient(connectionString);

        // Debug incoming request body
        console.log("📨 Request Body:", req.body);

        // Extract email details
        const { toEmail, subject, body } = req.body;

        console.log(`📧 Sending email to: ${toEmail}, Subject: ${subject}, Body: ${body}`);

        if (!toEmail || !subject || !body) {
            console.error("❌ Missing required fields:", { toEmail, subject, body });
            return res.status(400).json({ error: "❌ Missing required fields: toEmail, subject, or body." });
        }

        // Define email message
        const emailMessage = {
            senderAddress: senderEmail,
            recipients: { to: [{ address: toEmail }] },
            content: {
                subject: subject,
                plainText: body,
                html: `<p>${body}</p>`,
            },
        };

        // Send email
        const poller = await emailClient.beginSend(emailMessage);
        const response = await poller.pollUntilDone();

        console.log("✅ Email sent successfully:" + response);

        res.status(200).json({
            messageId: response.id,
            status: "Email sent successfully",
        });

    } catch (error) {
        console.error("❌ Error sending email:" + error);
        res.status(500).json({ error: "Failed to send email" });
    }
}
