import React, { useState } from 'react';
import './App.css';
import FooterLayout from '../layout/footer';
import axios from 'axios';
import { fadeIn } from '../utils/motionTransitions.ts'
import { motion } from 'framer-motion'
import ReactModal from '../components/Modal/ReactModal.jsx';

function App() {

  const [prompt, setPrompt] = useState('');
  const [analyzateImage, setAnalyzateImage] = useState(null);
  const [generatedImages, setGeneratedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [messageLoading, setMessageLoading] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState('');
  const [typeModal, setTypeModal] = useState('');


  function closeModal() {
    setOpenModal(false);
    setPrompt('');
    // setTypeModal('');
    setAnalyzateImage(null);
    setGeneratedImages([]);
  }

  function validarURLAgain(url) {
    const urlPattern = /^https:\/\/[^\s/$.?#].[^\s]*$/i;
    return urlPattern.test(url);
  }

  function validarURL(url) {
    try {
      new URL(url);
      const valid = validarURLAgain(url);
      if (valid) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  function validateInputEmpty() {
    if (prompt.trim() === '') {
      return true;
    }
    return false;
  }

  const writePrompt = (value) => {
    setPrompt(value)
  }

  function errorKeyInserted() {
    setIsLoading(true);
    setMessageLoading('Validating inserted key...');
    setOpenModal(false);

    setTimeout(() => {
      setTypeModal('errorInput')
      setMessage('Wrong key inserted...')
      setOpenModal(true)
      setIsLoading(false);
    }, 2500);
  }


  function validateKeyGenerateImg() {
    const emptyValue = validateInputEmpty();
    if (emptyValue) {
      setTypeModal('errorInput')
      setMessage('Please enter a text...')
      setOpenModal(true)
      return;
    }
    setOpenModal(true);
    setTypeModal('generateImage');
  }

  const analyzeImage = async () => {
    const emptyValue = validateInputEmpty();
    if (emptyValue) {
      setTypeModal('errorInput')
      setMessage('Please enter a text...')
      setOpenModal(true)
      return;
    }

    const validURL = validarURL(prompt);
    if (!validURL) {
      setTypeModal('errorInput')
      setMessage('Insert a url valid...');
      setOpenModal(true)
      return;
    }

    setIsLoading(true);
    setMessageLoading('Analyzing image...');
    const subscriptionKey = process.env.REACT_APP_SUBSCRIPTION_KEY;
    const apiUrl = process.env.REACT_APP_API_ANALYZER_URL;
    const imageUrl = prompt;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key': subscriptionKey,
        },
        body: JSON.stringify({ url: imageUrl }),
      });

      if (response.ok) {
        const data = await response.json();
        setOpenModal(true);
        setAnalyzateImage(data);
        setTypeModal('analyzateImage');
      } else {
        setTypeModal('errorAnalyzateImage')
        setAnalyzateImage(response);
        setMessage('Valid the url inserted...');
        setOpenModal(true)
      }
    } catch (error) {
      console.error('Error:', error);
      setAnalyzateImage(null);
    } finally {
      setIsLoading(false);
    }
  };

  const generateImage = async () => {
    setMessageLoading('Wait, generating images...');
    setIsLoading(true);
    try {
      const requestData = {
        prompt: prompt,
        n: 2,
        size: '1024x1024',
      };

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
      };

      const response = await axios.post(process.env.REACT_APP_API_GENETATE_IMAGE_URL, requestData, {
        headers: headers,
      });

      setGeneratedImages(response.data.data);
      setOpenModal(true);
    } catch (error) {
      setMessage('Error generating images...');
      setTypeModal('errorGenerateImage');
      setGeneratedImages(error.response);
      setIsLoading(false);
      setOpenModal(true);
    } finally {
      setIsLoading(false);
    }

  }

  return (
    <>
      <div className='flex flex-col items-center w-full gap-7 z-10'>
        <motion.div className="w-auto h-auto mx-auto block"
          variants={fadeIn('right', 0.5)}
          initial="hidden"
          animate="show"
          exit="hidden"
        >
          <h1 className='font-bold'>Computer vision</h1>

          <br />

          <p>This is a app for analyzate and generate images using IA.</p>
        </motion.div>

        <br />

        <div className='flex flex-row gap-3 '>
          <input autoComplete='off' onChange={(e) => writePrompt(e.target.value)} value={prompt} type='text' id='text' name='text' className='input' placeholder='Enter URL to analyzate or textual prompt to genera at image' />
        </div>

        <div className='flex flex-row justify-center items-center gap-5'>
          <button onClick={() => analyzeImage()} className="btn">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-scan-eye" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 8v-2a2 2 0 0 1 2 -2h2" />
              <path d="M4 16v2a2 2 0 0 0 2 2h2" />
              <path d="M16 4h2a2 2 0 0 1 2 2v2" />
              <path d="M16 20h2a2 2 0 0 0 2 -2v-2" />
              <path d="M7 12c3.333 -4.667 6.667 -4.667 10 0" />
              <path d="M7 12c3.333 4.667 6.667 4.667 10 0" />
              <path d="M12 12h-.01" />
            </svg>

            <span className='text'> Analyzate </span>
          </button>

          <button onClick={() => validateKeyGenerateImg()} className='btn'>
            <svg height='24' width='24' fill='#FFFFFF' viewBox='0 0 24 24' data-name='Layer 1' id='Layer_1' className='sparkle'>
              <path d='M10,21.236,6.755,14.745.264,11.5,6.755,8.255,10,1.764l3.245,6.491L19.736,11.5l-6.491,3.245ZM18,21l1.5,3L21,21l3-1.5L21,18l-1.5-3L18,18l-3,1.5ZM19.333,4.667,20.5,7l1.167-2.333L24,3.5,21.667,2.333,20.5,0,19.333,2.333,17,3.5Z'></path>
            </svg>

            <span className='text'>Generate</span>
          </button>
        </div>

        {
          openModal && (
            <ReactModal
              analyzeImage={analyzateImage}
              generatedImages={generatedImages}
              generateImage={() => generateImage()}
              typeModal={typeModal}
              closeModal={closeModal}
              modalIsOpen={openModal}
              message={message}
              errorKeyInserted={errorKeyInserted}
            />
          )
        }

        {
          isLoading && (
            <>
              <div className='absolute z-10 bg-black opacity-80 top-0 bottom-0 left-0 right-0
              backdrop-filter backdrop- blur-sm'>
              </div>
              <p className='font-bold text-4xl z-20'>{messageLoading}</p>
              <div className='spinner fixed z-20'>
                <div className='spinner1'></div>
              </div>
            </>
          )
        }
        <FooterLayout />
      </div>
    </>
  );
}

export default App;
