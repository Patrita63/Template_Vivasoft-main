const RESEND_API_KEY = "re_EPLAJcV9_6RyTtaemEfcSnVBnUinGkNV1";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { fullname, mailAddress, mailSubject, mailBody } = req.body;

    // Validate the input
    if (!fullname || !mailAddress || !mailSubject || !mailBody) {
      return res.status(400).json({ success: false, error: 'All fields are required.' });
    }

    try {
      // Call Resend API
      const apiResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          // 'Authorization': `Bearer ${process.env.RESEND_API_KEY}`, // Store the API key securely
        },
        body: JSON.stringify({
          to: mailAddress,
          from: 'onboarding@resend.dev', // Your verified sender email
          subject: mailSubject,
          text: `${fullname} says: ${mailBody}`,
        }),
      });

      // Handle Resend API response
      if (apiResponse.ok) {
        return res.status(200).json({ success: true });
      } else {
        const errorData = await apiResponse.json();
        return res.status(apiResponse.status).json({ success: false, error: errorData });
      }
    } catch (error) {
      console.error('Error sending email:', error.message);
      return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ success: false, error: `Method ${req.method} Not Allowed` });
  }
}
