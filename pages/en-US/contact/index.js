// components
import LayoutEnUs from '../../../components/LayoutEnUs';
// import Circles from '/components/Circles';

// icons
import { BsArrowRight } from 'react-icons/bs';

// framer
import { motion } from 'framer-motion';

// variants
import { fadeIn } from '../../../variants';

import { useState, useEffect } from 'react';

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
   
    // TODO PATRIZIO
    // Gestire il ritorno dell'invio della mail
    // Attualmente non la manda

    // Redirect to home page 
    router.push("/en-US");


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
