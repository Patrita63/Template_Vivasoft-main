// components
import Circles from '/components/Circles';

// icons
import { BsArrowRight } from 'react-icons/bs';

// framer
import { motion } from 'framer-motion';

// variants
import { fadeIn } from '../../variants';

// https://resend.com/nextjs
import { useState, useEffect } from 'react';
// import { EmailTemplate } from '@/components/email-template';
// import { Resend } from 'resend';


const Contact = () => {
  let [fullname, setFullname] = useState('');
  let [mailAddress, setMailAddress] = useState('');
  let [mailSubject, setMailSubject] = useState('');
  let [mailBody, setMailBody] = useState('');


  useEffect(() => {
    setFullname('Patrizio Tardiolo Bonifazi');
    setMailAddress('p.tardiolobonifazi@vivasoft.it');
    setMailSubject('Invio Mail');
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

  const SendMail = (event) => {
    // alert('SendMail');
    event.preventDefault();
    console.log(event.target);
    debugger;
    const dataMailFullName = fullname; // event.target.form[0].value; // event.target.nominativo.value;
    // alert('Nominativo = ' + dataMailFullName);
    const dataMailAddress = mailAddress; //event.target.form[1].value; //event.target.email.value;
    const dataMailSubject = mailSubject; //event.target.form[2].value; //event.target.subject.value;
    const dataMailBody = mailBody; // event.target.form[3].value; //event.target.body.value;
    alert(`${dataMailFullName}  send an email to ${dataMailAddress} - Subject: ${dataMailSubject} - Body: ${dataMailBody}`);
  }

  return (
    <div className='h-full bg-primary'>
      <div className='container mx-auto py-32 text-center xl:text-left flex items-center justify-center h-full'>
        {/* text & form */}
        <div className='flex flex-col w-full max-w-[700px] pt-60'>
          {/* text */}
          <motion.h2
            variants={fadeIn('up', 0.2)}
            initial='hidden'
            animate='show'
            exit='hidden'
            className='h2 text-center mb-12'
          >
          Richiedi<span className='text-accent'> info</span>
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
                  <input type='text' placeholder='nome e cognome' name='nominativo' className='input' defaultValue={fullname} onChange={(event)=>nominativoInputChangedHandler(event)}  />
                  <input type='text' placeholder='email' name='email' className='input' defaultValue={mailAddress} onChange={(event)=>mailAddressInputChangedHandler(event)} />
                </div>
                <input type='text' placeholder='soggetto' name='subject' className='input' defaultValue={mailSubject} onChange={(event)=>mailSubjectInputChangedHandler(event)} />
                <textarea placeholder='messaggio' name='body' className='textarea' defaultValue={mailBody} onChange={(event)=>mailBodyInputChangedHandler(event)}></textarea>
                <button onClick={(event)=>SendMail(event)} className='btn rounded-full border border-white/50 w-full px-8 transition-all duration-300 flex items-center justify-center overflow-hidden hover:border-accent group' >
                  <span className='group-hover:-translate-y-[120%] group-hover:opacity-0 transition-all duration-500'>
                    Invia
                  </span>
                  <BsArrowRight className='-translate-y-[120%] opacity-0 group-hover:flex group-hover:-translate-y-0 group-hover:opacity-100 transition-all duration-300 absolute text-[22px]' />
                </button>
            
              
            </motion.form>
         
        </div>
      </div>
    </div>
  );
};

export default Contact;
