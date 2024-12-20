const RESEND_API_KEY = "re_EPLAJcV9_6RyTtaemEfcSnVBnUinGkNV1";
// pages/api/proxy.js  now   pages/api/send-email.js
export default async function handler(req, res) {

  console.log('handler sendEmail');
  if (req.method === 'POST') {
    console.log('Incoming Request Body:', req.body);
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${RESEND_API_KEY}`, // Replace with your actual API key
        },
        body: JSON.stringify(req.body), // Pass the request body to the API
      });

      const data = await response.json();

      // Log the response for debugging
      console.log('API Response Status:', response.status);
      console.log('API Response Data:', data);

      if (!response.ok) {
        // Forward the error response from the API
        console.log('handler sendEmai Forward the error response from the API: ', response.status);
        return res.status(response.status).json(data);
      }

      // Forward the successful response
      console.log('handler sendEmai Forward the successful response: ', res.status(200).json(data));
      return res.status(200).json(data);
    } catch (error) {
      console.error('Error in Proxy Handler:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}