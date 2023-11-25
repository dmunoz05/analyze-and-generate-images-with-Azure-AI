import React from "react";
import Modal from "react-modal";
import customStyles from "./customStyles.css";

function ReactModal({ generatedImages, analyzeImage, typeModal, closeModal, modalIsOpen, message }) {
  debugger;

  return (
    <Modal
      isOpen={modalIsOpen}
      // onAfterOpen={afterOpenModal}
      // onRequestClose={}
      style={customStyles}
      contentLabel="Example Modal"
    >

      {typeModal === 'inputEmpty' &&
        (
          <>
            <div className="grid justify-center items-center h-full">
              <h2 className=" text-white text-center font-extrabold text-3xl ">Advertence</h2>
              <div className="flex justify-center">
                <div class="terminal-loader">
                  <div class="terminal-header">
                    <div class="terminal-title">Failed</div>
                    <div class="terminal-controls">
                      <div class="control close"></div>
                      <div class="control minimize"></div>
                      <div class="control maximize"></div>
                    </div>
                  </div>
                  <div class="textMessage">{message}</div>
                </div>

              </div>
            </div>
            <div class="flex gap-5 justify-end">
              <button
                onClick={closeModal}
                class="bg-gradient-to-r from-purple-600 via-purple-400 to-blue-500 text-white px-4 py-2 font-bold rounded-md hover:opacity-80"
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
              <div class="terminal-loader">
                <div class="terminal-header">
                  <div class="terminal-title">Sucess</div>
                  <div class="terminal-controls">
                    <div class="control close"></div>
                    <div class="control minimize"></div>
                    <div class="control maximize"></div>
                  </div>
                </div>
                <br />
                <div>Image analyzate is a: </div>
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
          <div class="flex gap-5 justify-end">
            <button
              onClick={closeModal}
              class="bg-gradient-to-r from-purple-600 via-purple-400 to-blue-500 text-white px-4 py-2 font-bold rounded-md hover:opacity-80"
              type="submit"
            >
              Ok
            </button>
          </div>
        </>
      )}

      {
        typeModal === 'generateImage' && (
          <>
            <h2 className=" text-black ">{message}</h2>

            <h2 class="text-2xl font-bold text-white mb-6">Update Your Profile</h2>

            {generatedImages?.length > 0 && (
              <div className="mt-4">
                {generatedImages.map((image, index) => (
                  <div key={index} className="mt-4">
                    <img
                      width={256}
                      height={256}
                      src={image.url}
                      alt={`Generated Img ${index}`}
                      style={{ maxWidth: '100%', height: 'auto' }}
                    />
                  </div>
                ))}
              </div>
            )}

            <form method="post" action="#">
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-300" for="name"
                >Full Name</label
                >
                <input
                  class="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
                  type="text"
                />
              </div>

              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-300" for="email"
                >Email Address</label
                >
                <input
                  class="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
                  name="email"
                  id="email"
                  type="email"
                />
              </div>

              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-300" for="bio"
                >Bio</label
                >
                <textarea
                  class="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
                  rows="3"
                  name="bio"
                  id="bio"
                ></textarea>
              </div>

              <div class="flex gap-5 justify-end">
                <button
                  class="bg-gradient-to-r from-purple-600 via-purple-400 to-blue-500 text-white px-4 py-2 font-bold rounded-md hover:opacity-80"
                  type="submit"
                >
                  Send
                </button>
                <button onClick={closeModal}>Close</button>
              </div>
            </form>

          </>

        )
      }


    </Modal>
  );
}

export default ReactModal;
