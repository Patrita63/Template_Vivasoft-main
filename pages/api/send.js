// "use server";

/* ./pages/api/send.js
Error:
  To use Server Actions, please enable the feature flag in your Next.js config. 
  Read more: 
  https://nextjs.org/docs/app/building-your-application/data-fetching/forms-and-mutations#convention
*/

import { Resend } from 'resend';

const RESEND_API_KEY = "re_EPLAJcV9_6RyTtaemEfcSnVBnUinGkNV1";
// from: 'onboarding@resend.dev'
// https://resend.com/onboarding

// Access to fetch at 'https://api.resend.com/emails' from origin 'http://localhost:3000' has been blocked by CORS policy: 
const RESEND_MAIL_FROM = "onboarding@resend.dev";
const RESEND_MAIL_TO = "p.tardiolobonifazi@vivasoft.it";

// https://stackoverflow.com/questions/77596101/cors-issue-in-next-js-14-server-actions-with-third-party-api-calls
export const SendMailResend = async (mailSubject, dataMailBody) => {
  const resend = new Resend(RESEND_API_KEY);

  try {
      const response = await resend.emails.send({
          from: RESEND_MAIL_FROM,
          to: RESEND_MAIL_TO,
          subject: mailSubject,
          html: dataMailBody
      });

      console.log("Email sent successfully:", response);
      return { success: true, data: response };
  } catch (error) {
      console.error("Error sending email:", error);
      return { success: false, error: error.message || error };
  }
};

// export const SendMailResend = async (mailSubject, dataMailBody) => {
//     const resend = new Resend(RESEND_API_KEY);

//     const response = await resend.emails.send({
//         from: RESEND_MAIL_FROM,
//         to: RESEND_MAIL_TO,
//         subject: mailSubject,
//         html: dataMailBody
//     });

//     console.log(response);
    
    
    /* await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: ['delivered@resend.dev'],
    subject: 'hello world',
    html: '<p>it works!</p>',
    });
    */
// }
