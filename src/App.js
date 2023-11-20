import React, { useState } from 'react';
import './App.css';
import FooterLayout from './footer';

function App() {

  const [textInput, setTextInput] = useState('');
  const [result, setResult] = useState(null);

  const analyzeImage = async () => {

    debugger;

    const subscriptionKey = process.env.SUBSCRIPTION_KEY;
    const apiUrl = process.env.API_ANALYZER_URL;
    const imageUrl = textInput;

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
        setResult(data);
      } else {
        console.error('Error:', response.status);
        setResult(null);
      }
    } catch (error) {
      console.error('Error:', error);
      setResult(null);
    }
  };

  const generateImage = async () => {
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    const urlApi = process.env.API_GENETATE_URL;

    try {
      debugger;

      const response = await fetch(urlApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          "model": "dall-e-2",
          "prompt": "A cute baby sea otter",
          "n": 1,
          "size": "1024x1024"
        })
      })
      debugger;
      if (response.ok) {
        const data = await response.json();
        setResult(data);
      } else {
        console.error('Error:', response.status);
        setResult(null);
      }

    } catch (error) {
      console.error('Error:', error);
      setResult(null);
    }
  }

  return (
    <>
      <div className='flex flex-col items-center w-full gap-7'>
        <h1 className='font-bold'>Computer Vision</h1>

        <p>This is a app for generate images using Azure AI.</p>


        <br />
        <input onChange={(e) => setTextInput(e.target.value)} type='text' name='text' className='input' placeholder='Enter URL to analyzate or textual prompt to genera at image' />

        <div className='flex flex-row justify-center items-center gap-5'>
          <button onClick={() => analyzeImage()} className="btn">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-scan-eye" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 8v-2a2 2 0 0 1 2 -2h2" />
              <path d="M4 16v2a2 2 0 0 0 2 2h2" />
              <path d="M16 4h2a2 2 0 0 1 2 2v2" />
              <path d="M16 20h2a2 2 0 0 0 2 -2v-2" />
              <path d="M7 12c3.333 -4.667 6.667 -4.667 10 0" />
              <path d="M7 12c3.333 4.667 6.667 4.667 10 0" />
              <path d="M12 12h-.01" />
            </svg>

            <span className='text'>Analyzate</span>
          </button>

          <button onClick={() => generateImage()} className='btn'>
            <svg height='24' width='24' fill='#FFFFFF' viewBox='0 0 24 24' data-name='Layer 1' id='Layer_1' className='sparkle'>
              <path d='M10,21.236,6.755,14.745.264,11.5,6.755,8.255,10,1.764l3.245,6.491L19.736,11.5l-6.491,3.245ZM18,21l1.5,3L21,21l3-1.5L21,18l-1.5-3L18,18l-3,1.5ZM19.333,4.667,20.5,7l1.167-2.333L24,3.5,21.667,2.333,20.5,0,19.333,2.333,17,3.5Z'></path>
            </svg>

            <span className='text'>Generate</span>
          </button>
        </div>

        <p>{result?.captionResult?.text}</p>
        <img alt='' src='' id='image' className='w-full' />
      </div>
      <FooterLayout />
    </>
  );
}

export default App;
