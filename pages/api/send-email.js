export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { fullname, mailAddress, mailSubject, mailBody } = req.body;

    // Validate the input
    debugger;
    if (!fullname || !mailAddress || !mailSubject || !mailBody) {
      return res.status(400).json({ success: false, error: 'All fields are required.' });
    }

    try {
      // Call Resend API  
      const apiResponse = await fetch(`${process.env.REACT_APP_RESEND_API_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_RESEND_API_KEY}`, 
        },
        body: JSON.stringify({
          to: `${process.env.REACT_APP_RESEND_MAIL_TO}`,
          from: `${process.env.REACT_APP_RESEND_MAIL_FROM}`, 
          subject: mailSubject,
          text: `Gentile ${fullname} grazie per averci mandato questa mail. Subject: ${mailSubject} Body: ${mailBody}`
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
