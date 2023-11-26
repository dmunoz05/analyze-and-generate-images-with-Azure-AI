import React, { useState } from "react";
import Modal from "react-modal";
import customStyles from "./customStyles.css";

function ReactModal({ analyzeImage, generatedImages, generateImage, typeModal, closeModal, modalIsOpen, message, errorKeyInserted }) {
  const [keyOpenIA, setKeyOpenIA] = useState('');
  const [showMessageEmpty, setShowMessageEmpty] = useState(false);
  const [messageEmpty, setMessageEmpty] = useState('');

  function validateInputEmpty() {
    if (keyOpenIA.trim() === '') {
      return true;
    }
    return false;
  }

  function validateKeyInsert() {
    const emptyValue = validateInputEmpty();
    if (emptyValue) {
      setShowMessageEmpty(true);
      setMessageEmpty('Please insert a key...')
      return;
    }

    if (keyOpenIA === process.env.REACT_APP_OPENAI_API_KEY) {
      closeModal();
      generateImage();
      return;
    }
    errorKeyInserted();
  }

  function writeKeyAPI(value) {
    setKeyOpenIA(value);
  }

  return (
    <Modal
      ariaHideApp={false}
      isOpen={modalIsOpen}
      // onAfterOpen={afterOpenModal}
      // onRequestClose={}
      style={customStyles}
    >

      {typeModal === 'errorInput' &&
        (
          <>
            <div className="grid justify-center items-center h-full">
              <h2 className=" text-white text-center font-extrabold text-3xl ">Warning</h2>
              <div className="flex justify-center">
                <div className="terminal-loader">
                  <div className="terminal-header">
                    <div className="terminal-title">Failed</div>
                    <div className="terminal-controls">
                      <div className="control close"></div>
                      <div className="control minimize"></div>
                      <div className="control maximize"></div>
                    </div>
                  </div>
                  <div className="textMessage">{message}</div>
                </div>

              </div>
            </div>
            <div className="flex gap-5 justify-center">
              <button
                onClick={closeModal}
                className="outline-none cursor-pointer bg-gradient-to-r from-purple-600 via-purple-400 to-blue-500 text-white px-6 py-2 font-bold rounded-full hover:opacity-80"
                type="submit"
              >
                Again
              </button>
            </div>
          </>
        )
      }

      {typeModal === 'analyzateImage' && (
        <>
          <div className="grid justify-center items-center h-full">
            <h2 className=" text-white text-center font-extrabold text-3xl ">Image Analyzate</h2>
            <div className="flex justify-center">
              <div className="terminal-loader">
                <div className="terminal-header">
                  <div className="terminal-title">Successfully</div>
                  <div className="terminal-controls">
                    <div className="control close"></div>
                    <div className="control minimize"></div>
                    <div className="control maximize"></div>
                  </div>
                </div>
                <br />
                <div>Image analyzate is: </div>
                <div className="text-white">{analyzeImage?.captionResult?.text}</div>
                <br />
                <div>Metadata:</div>
                <div className="flex gap-1"> Has: <div className="text-white"> {analyzeImage?.captionResult?.confidence}</div></div>
                <div className="flex gap-1"> Height: <div className="text-white">{analyzeImage?.metadata.height}px</div></div>
                <div className="flex gap-1"> Width: <div className="text-white">{analyzeImage?.metadata.width}px</div></div>
                <div className="flex gap-1"> Model: <div className="text-white">{analyzeImage?.modelVersion}</div></div>
              </div>
            </div>
          </div>
          <div className="flex gap-5 justify-end">
            <button
              onClick={closeModal}
              className="outline-none cursor-pointer bg-gradient-to-r from-purple-600 via-purple-400 to-blue-500 text-white px-6 py-2 font-bold rounded-full hover:opacity-80"
              type="submit"
            >
              Ok
            </button>
          </div>
        </>
      )}

      {typeModal === 'errorAnalyzateImage' && (
        <>
          <div className="grid justify-center items-center h-full">
            <h2 className=" text-white text-center font-extrabold text-3xl ">Image Analyzate</h2>
            <div className="flex justify-center">
              <div className="terminal-loader">
                <div className="terminal-header">
                  <div className="terminal-title">Error</div>
                  <div className="terminal-controls">
                    <div className="control close"></div>
                    <div className="control minimize"></div>
                    <div className="control maximize"></div>
                  </div>
                </div>
                <br />
                <div>Analyze image failed </div>
                <div className="flex gap-1"> error: <div className="text-white"> {analyzeImage?.status}</div></div>
                <div className="flex gap-1"> successfully: <div className="text-white"> {analyzeImage?.ok.toString()}</div></div>
                <div className="flex gap-1"> type Error: <div className="text-white">{analyzeImage?.type}</div></div>
                <div className="flex gap-1"> statusText: <div className="text-white">{analyzeImage?.statusText || 'none'}</div></div>
                <div className="flex gap-1"> bodyUsed: <div className="text-white">{analyzeImage?.bodyUsed.toString()}</div></div>
                <div className="flex gap-1"> redirected: <div className="text-white">{analyzeImage?.redirected.toString()}</div></div>
                <br />
                <div> Recomendations: </div>
                <div className=" text-white"> Valid inserted url</div>
                <div className=" text-white"> Valid environments varibles</div>
                <div className=" text-white"> Valid key of service Azure AI</div>
                <div className=" text-white"> Valid URL of API Azure AI</div>
              </div>
            </div>
          </div>
          <div className="flex gap-5 justify-end">
            <button
              onClick={closeModal}
              className="cursor-pointer bg-gradient-to-r from-purple-600 via-purple-400 to-blue-500 text-white px-8 py-2 font-bold rounded-full hover:opacity-80"
              type="submit"
            >
              Again
            </button>
          </div>
        </>
      )}

      {
        typeModal === 'generateImage' && generatedImages?.length <= 0 && !showMessageEmpty && (
          <>
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Insert API Key</h2>

            <div className="mb-4">
              <label className="block text-base font-semibold text-gray-300" htmlFor="name"
              >Key OpenIA API </label>
              <input
                onChange={(e) => writeKeyAPI(e.target.value)}
                className=" outline-none mt-1 p-2 w-[25rem] bg-gray-700 border border-gray-600 rounded-md text-white"
                type="password"
              />
            </div>

            <div className="flex gap-5 justify-center">
              <button
                onClick={validateKeyInsert}
                className="cursor-pointer bg-gradient-to-r from-purple-600 via-purple-400 to-blue-500 text-white px-6 py-2 font-bold rounded-full hover:opacity-80"
              >
                Send
              </button>
              <button className="cursor-pointer text-white px-6 py-2 font-bold rounded-full hover:opacity-80" onClick={closeModal}>Close</button>
            </div>

          </>
        )
      }

      {typeModal === 'errorGenerateImage' && (
        <>
          <div className="grid justify-center items-center h-full">
            <h2 className=" text-white text-center font-extrabold text-3xl ">Generate Image</h2>
            <div className="flex justify-center">
              <div className="terminal-loader">
                <div className="terminal-header">
                  <div className="terminal-title">Error</div>
                  <div className="terminal-controls">
                    <div className="control close"></div>
                    <div className="control minimize"></div>
                    <div className="control maximize"></div>
                  </div>
                </div>
                <div>{message}</div>
                <div className="flex gap-1"> error: <div className="text-white"> {generatedImages?.status}</div></div>
                <div className="flex gap-1"> statusText: <div className="text-white">{generatedImages?.statusText || 'none'}</div></div>
                <div className="flex gap-1"> data: <div className="text-white"> {generatedImages?.data.toString()}</div></div>
                <br />
                <div> Recomendations: </div>
                <div className=" text-white"> Valid inserted url</div>
                <div className=" text-white"> Valid environments varibles</div>
                <div className=" text-white"> Valid key of service OpenAI</div>
                <div className=" text-white"> Valid URL of API OpenAI</div>
              </div>
            </div>
          </div>
          <div className="flex gap-5 justify-center">
            <button
              onClick={closeModal}
              className="cursor-pointer bg-gradient-to-r from-purple-600 via-purple-400 to-blue-500 text-white px-8 py-2 font-bold rounded-full hover:opacity-80"
              type="submit"
            >
              Again
            </button>
          </div>
        </>
      )}

      {typeModal === 'generateImage' && generatedImages?.length > 0 &&
        (
          <>
            <div className="grid justify-center items-center h-full">
              <h2 className=" text-white text-center font-extrabold text-3xl ">Generated Images</h2>
              <div className="flex flex-row justify-center gap-8">

                {generatedImages.map((image, index) => (
                  <div key={index} className=" flex flex-col justify-center items-center mt-4">
                    <img
                      className=" rounded-xl"
                      width={256}
                      height={256}
                      src={image.url}
                      alt={`Generated Img ${index}`}
                      style={{ maxWidth: '100%', height: 'auto' }}
                    />
                    <a href={image.url} src={image.url} target="_blank" rel="noopener noreferrer"
                      className="text-white px-6 py-2 font-bold rounded-full hover:opacity-80 flex gap-1 items-center justify-center"
                    >
                      Show
                      <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-click" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 12l3 0" /><path d="M12 3l0 3" /><path d="M7.8 7.8l-2.2 -2.2" /><path d="M16.2 7.8l2.2 -2.2" /><path d="M7.8 16.2l-2.2 2.2" /><path d="M12 12l9 3l-4 2l-2 4l-3 -9" /></svg>
                    </a>
                  </div>
                ))}
              </div>
            </div>
            <div className=" py-5 flex gap-5 justify-center">
              <button className="cursor-pointer text-white px-6 py-2 font-bold rounded-full hover:opacity-80" onClick={closeModal}>Close</button>
            </div>
          </>
        )}

      {showMessageEmpty && (
        <>
          <div className="grid justify-center items-center h-full">
            <h2 className=" text-white text-center font-extrabold text-3xl ">Warning</h2>
            <div className="flex justify-center">
              <div className="terminal-loader">
                <div className="terminal-header">
                  <div className="terminal-title">Failed</div>
                  <div className="terminal-controls">
                    <div className="control close"></div>
                    <div className="control minimize"></div>
                    <div className="control maximize"></div>
                  </div>
                </div>
                <div className="textMessage">{messageEmpty}</div>
              </div>

            </div>
          </div>
          <div className="flex gap-5 justify-center">
            <button
              onClick={() => setShowMessageEmpty(false)}
              className="outline-none cursor-pointer bg-gradient-to-r from-purple-600 via-purple-400 to-blue-500 text-white px-6 py-2 font-bold rounded-full hover:opacity-80"
              type="submit"
            >
              Again
            </button>
          </div>
        </>

      )}
    </Modal>
  );
}

export default ReactModal;
