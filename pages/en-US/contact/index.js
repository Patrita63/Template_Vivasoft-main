// components
import LayoutEnUs from '../../../components/LayoutEnUs';
// import Circles from '/components/Circles';

// icons
import { BsArrowRight } from 'react-icons/bs';

// framer
import { motion } from 'framer-motion';

// variants
import { fadeIn } from '../../../variants';

// 
import { SendMailResend } from '../../api/send'
// https://resend.com/nextjs
import { useState, useEffect } from 'react';
// import { Resend } from 'resend';
// import { EmailTemplate } from '@/components/email-template';
// import { NextRequest, NextResponse } from 'next/server';

// https://nextjs.org/docs/pages/api-reference/functions/use-router
import { useRouter } from 'next/router';
// import { NextResponse, NextRequest } from 'next/server'
// https://nextjs.org/docs/pages/building-your-application/routing/redirecting


const Contact = () => {

  // To navigate to another page
  const router = useRouter();

  let [fullname, setFullname] = useState('');
  let [mailAddress, setMailAddress] = useState('');
  let [mailSubject, setMailSubject] = useState('');
  let [mailBody, setMailBody] = useState('');


  useEffect(() => {
    setFullname('Patrizio Tardiolo Bonifazi');
    setMailAddress('p.tardiolobonifazi@vivasoft.it');
    setMailSubject('Send Mail');
    setMailBody('Test from Contact');
  }, [])

  const nominativoInputChangedHandler = (event) => {
    /* console.log('nominativoInputFunction (event.target.value) = ' + event.target.value);
    debugger;
    fullname = event.target.value;
    console.log('nominativoInputFunction (fullname) = ' + fullname); */
    setFullname(event.target.value);
  }

  const mailAddressInputChangedHandler = (event) => {
  
    setMailAddress(event.target.value);
  }

  const mailSubjectInputChangedHandler = (event) => {
  
    setMailSubject(event.target.value);
  }

  const mailBodyInputChangedHandler = (event) => {
  
    setMailBody(event.target.value);
  }

  const SendMail = async (event) => {
   // https://resend.com/docs/knowledge-base/how-do-i-fix-cors-issues
/*     Access to XMLHttpRequest at 'https://api.resend.com/emails'
    from origin 'http://localhost:3000' has been blocked by CORS policy:
    Response to preflight request doesn't pass access control check:
    No 'Access-Control-Allow-Origin' header is present on the requested resource. */

    const RESEND_API_KEY = "re_EPLAJcV9_6RyTtaemEfcSnVBnUinGkNV1";
    // from: 'onboarding@resend.dev'
    // https://resend.com/onboarding

    // Access to fetch at 'https://api.resend.com/emails' from origin 'http://localhost:3000' has been blocked by CORS policy: 
    const RESEND_MAIL_FROM = "onboarding@resend.dev";
    const RESEND_MAIL_TO = "p.tardiolobonifazi@vivasoft.it";
    // alert('SendMail');
    event.preventDefault();
    console.log(event.target);
    // debugger;
    const dataMailFullName = fullname; // event.target.form[0].value; // event.target.nominativo.value;
    // alert('Nominativo = ' + dataMailFullName);
    const dataMailAddress = mailAddress; //event.target.form[1].value; //event.target.email.value;
    const dataMailSubject = mailSubject; //event.target.form[2].value; //event.target.subject.value;

    const body =  `${dataMailFullName}  sent an email from ${dataMailAddress} - Subject: ${dataMailSubject} - Body: ${mailBody}`
    // alert(body);

    const dataMailBody = body; // event.target.form[3].value; //event.target.body.value;

    SendMailResend(mailSubject, dataMailBody);

    // TODO PATRIZIO
    // Gestire il ritorno dell'invio della mail
    // Attualmente non la manda

    // Redirect to home page 
    router.push("/en-US");


    // https://resend.com/nextjs
    // const resend = new Resend(process.env.RESEND_API_KEY);

   // https://resend.com/docs/api-reference/emails/send-email
   // const resend = new Resend(RESEND_API_KEY);

    /* try {
      const response = await fetch('https://api.resend.com/emails/api/send', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer re_EPLAJcV9_6RyTtaemEfcSnVBnUinGkNV1'
          },
          from: RESEND_MAIL_FROM,
          to: RESEND_MAIL_TO,
          subject: mailSubject,
          html: dataMailBody
          // body: JSON.stringify(values)
      });

      if (response.ok) {
          console.log('Email sent successfully!');
      } else {
          const errorDetails = await response.json();
          console.error('Error sending email:', errorDetails.message);
      }
    } catch (error) {
      console.error('There was a problem sending the email:', error);
    } */

    /* const response = await resend.emails.send({
      from: RESEND_MAIL_FROM,
      to: RESEND_MAIL_TO,
      subject: mailSubject,
      html: dataMailBody
    });

    console.log(response); */

    /* if (error) {
      return res.status(400).json(error);
    }
  
    return res.status(200).json(data); */
  }


  return (
    <LayoutEnUs>
    <div className='h-full bg-primary'>
      <div className='container mx-auto py-32 text-center xl:text-left flex items-center justify-center overflow-hidden h-full'>
        {/* text & form */}
        <div className='flex flex-col w-full max-w-[700px]'>
          {/* text */}
          <motion.h2
            variants={fadeIn('up', 0.2)}
            initial='hidden'
            animate='show'
            exit='hidden'
            className='h2 text-center mb-12'
          >
          Request<span className='text-accent'> info</span>
          </motion.h2>
          {/* form */}
          
            <motion.form
              variants={fadeIn('up', 0.4)}
              initial='hidden'
              animate='show'
              exit='hidden'
              className='flex-1 flex flex-col gap-6 w-full mx-auto'
            >
              
                {/* input group */}
                <div className='flex gap-x-6 w-full'>
                  <input type='text' placeholder='name and surname' name='nominativo' className='input' defaultValue={fullname} onChange={(event)=>nominativoInputChangedHandler(event)}  />
                  <input type='text' placeholder='email' name='email' className='input' defaultValue={mailAddress} onChange={(event)=>mailAddressInputChangedHandler(event)} />
                </div>
                <input type='text' placeholder='subject' name='subject' className='input' defaultValue={mailSubject} onChange={(event)=>mailSubjectInputChangedHandler(event)} />
                <textarea placeholder='body' name='body' className='textarea' defaultValue={mailBody} onChange={(event)=>mailBodyInputChangedHandler(event)}></textarea>
                
                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="gdpr-checkbox" 
                    className="accent-accent" 
                  
                  />
                  <label htmlFor="gdpr-checkbox" className="text-sm">
                    I consent to the processing of my personal data in accordance with the{' '}
                    <a href="#" className="text-accent" target="_blank">
                      Policy Privacy
                    </a>.
                  </label>
                </div>

                <button onClick={(event)=>SendMail(event)} className='btn rounded-full border border-white/50 w-full px-8 transition-all duration-300 flex items-center justify-center overflow-hidden hover:border-accent group' >
                  <span className='group-hover:-translate-y-[120%] group-hover:opacity-0 transition-all duration-500'>
                    Send
                  </span>
                  <BsArrowRight className='-translate-y-[120%] opacity-0 group-hover:flex group-hover:-translate-y-0 group-hover:opacity-100 transition-all duration-300 absolute text-[22px]' />
                </button>
            
              
            </motion.form>
         
        </div>
      </div>
    </div>
    </LayoutEnUs>
  );
};

export default Contact;
