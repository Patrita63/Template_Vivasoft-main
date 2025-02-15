import { Client } from '@microsoft/microsoft-graph-client';
import { ClientSecretCredential } from '@azure/identity';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed. Use POST.' });
  }

  // Extract data from the request body
  const { to, subject, body, contentType = 'Text' } = req.body;

  // Validate required fields
  if (!to || !subject || !body) {
    return res.status(400).json({
      message: 'Missing required fields. Ensure "to", "subject", and "body" are provided.',
    });
  }

  // Validate contentType (must be either "Text" or "HTML")
  if (contentType !== 'Text' && contentType !== 'HTML') {
    return res.status(400).json({
      message: 'Invalid contentType. Use "Text" or "HTML".',
    });
  }

  // Microsoft 365 credentials
  const tenantId = process.env.NEXT_PUBLIC_AZURE_TENANT_ID;
  console.log("🔍 NEXT_PUBLIC_AZURE_TENANT_ID Loaded:", tenantId);
  const clientId = process.env.NEXT_PUBLIC_AZURE_CLIENT_ID;
  console.log("🔍 NEXT_PUBLIC_AZURE_CLIENT_ID Loaded:", clientId);
  const clientSecret = process.env.NEXT_PUBLIC_AZURE_CLIENT_SECRET;
  console.log("🔍 NEXT_PUBLIC_AZURE_CLIENT_SECRET Loaded:", clientSecret);

  try {
    // Authenticate with Microsoft Graph API
    const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);

    const client = Client.initWithMiddleware({
      authProvider: {
        getAccessToken: async () => {
          const token = await credential.getToken('https://graph.microsoft.com/.default');
          return token.token;
        },
      },
    });

    // // Create the email object
    // const email = {
    //   message: {
    //     subject: subject,
    //     body: {
    //       contentType: contentType, // "Text" or "HTML"
    //       content: body,
    //     },
    //     toRecipients: [
    //       {
    //         emailAddress: {
    //           address: to,
    //         },
    //       },
    //     ],
    //   },
    //   saveToSentItems: true, // Save a copy of the email in the sent folder
    // };

    // Correct email payload structure
    const email = {
      subject: subject,
      body: {
        contentType: contentType,
        content: body,
      },
      toRecipients: [
        {
          emailAddress: {
            address: to,
          },
        },
      ],
    };

    // Send the email
    await client.api('/users/info@vivasoft.it/sendMail').post({ message: email });

    // Return success response
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);

    // Return error response
    res.status(500).json({
      message: 'Failed to send email',
      error: error.message || 'An unknown error occurred.',
    });
  }
}