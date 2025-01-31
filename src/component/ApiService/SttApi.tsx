// // "use client";

// // import React, { useState, useRef, useEffect, useCallback } from "react";
// // import * as SpeechSDK from "microsoft-cognitiveservices-speech-sdk";
// // import { createSpeechRecognizer } from "../../services/speechServices";
// // import { useDispatch, useSelector } from 'react-redux';
// // import { AppDispatch } from '@/redux/store';
// // import { getAiSelector } from '@/redux/reducers/aimodal/selectors';
// // import {fetchPostAiRequest} from '@/redux/reducers/aimodal/actions';
// // import { getPendingSelector } from '@/redux/reducers/aimodal/selectors';
// // import { speakText } from '@/component/ApiService/TtsApi';


// // const SttApi = () => {
// //   const [recognizedText, setRecognizedText] = useState<string>(""); // Final recognized text
// //   const [isRecognizing, setIsRecognizing] = useState<boolean>(false); // Track recognition status
// //   const recognizedTextRef = useRef<string>(""); // Ref to hold intermediate text
// //   const recognitionTimeoutRef = useRef<any>(null); // Ref to handle timeout between updates
// //   const recognizerRef = useRef<any>(null); // Ref to hold the recognizer instance
// //   const aiResponse:any = useSelector(getAiSelector);
// //   const dispatch = useDispatch<AppDispatch>();


// //   // Start speech recognition
// //   const handleStart = useCallback(() => {
// //     if (isRecognizing) {
// //       console.warn("Recognition is already running.");
// //       return;
// //     }

// //     const recognizer = createSpeechRecognizer(); // Use the imported function
// //     recognizerRef.current = recognizer; // Store the recognizer in the ref

// //     recognizer.recognizing = (s: any, e: any) => {
// //       clearTimeout(recognitionTimeoutRef.current);
// //       recognizedTextRef.current = e.result.text;
// //       recognitionTimeoutRef.current = setTimeout(() => {
// //         setRecognizedText(recognizedTextRef.current);
// //       }, 500);
// //     };

// //     recognizer.recognized = (s: any, e: any) => {
// //         if (e.result.reason === SpeechSDK.ResultReason.RecognizedSpeech) {
// //             recognizedTextRef.current = e.result.text;
// //             console.log(e.result.text,'textttttt')
// //             dispatch(fetchPostAiRequest({ prompt: e.result.text }));
// //             setRecognizedText(e.result.text);
// //         } else if (e.result.reason === SpeechSDK.ResultReason.NoMatch) {
// //             console.warn("No speech recognized.");
// //         }
// //     };

// //     recognizer.canceled = (s: any, e: any) => {
// //       console.error("Recognition canceled:", e.errorDetails);
// //       handleStop();
// //     };

// //     recognizer.sessionStopped = (s: any, e: any) => {
// //       console.log("Session stopped.");
// //       handleStop();
// //     };

// //     recognizer.startContinuousRecognitionAsync(
// //       () => {
// //         console.log("Speech recognition started.");
// //         setIsRecognizing(true);
// //       },
// //       (error: any) => {
// //         console.error("Error starting recognition:", error);
// //       }
// //     );
// //   }, [isRecognizing]);

// //   // Stop speech recognition
// //   const handleStop = useCallback(() => {
// //     const recognizer = recognizerRef.current;
// //     if (!recognizer || !isRecognizing) {
// //       console.warn("Recognition is not running.");
// //       return;
// //     }

// //     recognizer.stopContinuousRecognitionAsync(
// //       () => {
// //         console.log("Speech recognition stopped.");
// //         setIsRecognizing(false);
// //         recognizerRef.current = null;
// //       },
// //       (error: any) => {
// //         console.error("Error stopping recognition:", error);
// //       }
// //     );
// //   }, [isRecognizing]);

// //   // Cleanup on component unmount
// //     useEffect(() => {
// //         return () => {
// //         if (recognizerRef.current) {
// //             recognizerRef.current.close();
// //         }
// //         };
// //     }, []);

// //     useEffect(() => {
// //         speakText(aiResponse?.aiResponse?.ai?.data?.data?.aiResponse);
// //     }, [aiResponse?.aiResponse?.ai?.data?.data?.aiResponse]);

// // return (
// //     <div>
// //       <button onClick={handleStart} disabled={isRecognizing}>
// //         Start Recognition
// //       </button>
// //       <button onClick={handleStop} disabled={!isRecognizing}>
// //         Stop Recognition
// //       </button>
// //       <p>Recognized Text:</p>
// //       <textarea
// //         value={recognizedText}
// //         readOnly
// //         rows={10}
// //         style={{ width: "100%" }}
// //       />
// //     </div>
// //   );
// // };

// // export default SttApi;


// "use client";

// import React, { useState, useRef, useEffect, useCallback } from "react";
// import * as SpeechSDK from "microsoft-cognitiveservices-speech-sdk";
// import { createSpeechRecognizer } from "../../services/speechServices";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch } from "@/redux/store";
// import { getAiSelector, getPendingSelector } from "@/redux/reducers/aimodal/selectors";
// import { fetchPostAiRequest } from "@/redux/reducers/aimodal/actions";
// import { speakText } from "@/component/ApiService/TtsApi";

// // Custom hook for speech recognition
// const useSpeechRecognition = () => {
//     const [isRecognizing, setIsRecognizing] = useState<boolean>(false);
//     const recognizerRef = useRef<any>(null);

//     const startRecognition = useCallback(() => {
//         if (isRecognizing) {
//             console.warn("Recognition is already running.");
//             return;
//         }

//         const recognizer = createSpeechRecognizer();
//         recognizerRef.current = recognizer;

//         recognizer.recognizing = (s: any, e: any) => {
//         console.log("Recognizing:", e.result.text);
//         };

//         recognizer.recognized = (s: any, e: any) => {
//         if (e.result.reason === SpeechSDK.ResultReason.RecognizedSpeech) {
//             console.warn("speech recognized.");
//         } else if (e.result.reason === SpeechSDK.ResultReason.NoMatch) {
//             console.warn("No speech recognized.");
//         }
//         };

//         recognizer.canceled = (s: any, e: any) => {
//         console.error("Recognition canceled:", e.errorDetails);
//         stopRecognition();
//         };

//         recognizer.sessionStopped = () => {
//         console.log("Session stopped.");
//         stopRecognition();
//         };

//         recognizer.startContinuousRecognitionAsync(
//         () => {
//             console.log("Speech recognition started.");
//             setIsRecognizing(true);
//         },
//         (error: any) => {
//             console.error("Error starting recognition:", error);
//         }
//         );
//     }, [isRecognizing]);

//     const stopRecognition = useCallback(() => {
//         if (!recognizerRef.current || !isRecognizing) {
//         console.warn("Recognition is not running.");
//         return;
//         }

//         recognizerRef.current.stopContinuousRecognitionAsync(
//         () => {
//             console.log("Speech recognition stopped.");
//             setIsRecognizing(false);
//             recognizerRef.current = null;
//         },
//         (error: any) => {
//             console.error("Error stopping recognition:", error);
//         }
//         );
//     }, [isRecognizing]);

//     useEffect(() => {
//         return () => {
//         if (recognizerRef.current) {
//             recognizerRef.current.close();
//         }
//         };
//     }, []);

//     return { startRecognition, stopRecognition, isRecognizing };
// };

// const SttApi = () => {
//   const [recognizedText, setRecognizedText] = useState<string>("");
//   const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
//   const aiResponse: any = useSelector(getAiSelector);
//   const dispatch = useDispatch<AppDispatch>();

//   const { startRecognition, stopRecognition, isRecognizing } = useSpeechRecognition();
//   console.log(startRecognition)
//   console.log(stopRecognition)
//   console.log(isRecognizing)


//     useEffect(() => {
//         const aiText = aiResponse?.aiResponse?.ai?.data?.data?.aiResponse;
    
//         if (aiText) {
//         setIsSpeaking(true);
//         stopRecognition(); // Stop the microphone while AI is speaking
//         speakText(aiText)
//             .finally(() => {
//             setIsSpeaking(false);
//             startRecognition(); // Restart the microphone after speaking
//             });
//         }
//     }, [aiResponse, stopRecognition, startRecognition]);

//   return (
//     <div>
//       <button onClick={startRecognition} disabled={isRecognizing || isSpeaking}>
//         Start Recognition
//       </button>
//       <button onClick={stopRecognition} disabled={!isRecognizing}>
//         Stop Recognition
//       </button>
//       <p>Recognized Text:</p>
//       <textarea
//         value={recognizedText}
//         readOnly
//         rows={10}
//         style={{ width: "100%" }}
//       />
//       {isSpeaking && <p>Loading... AI is responding.</p>}
//     </div>
//   );
// };

// export default SttApi;


"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import * as SpeechSDK from "microsoft-cognitiveservices-speech-sdk";
import { createSpeechRecognizer } from "../../services/speechServices";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { getAiSelector } from "@/redux/reducers/aimodal/selectors";
import { fetchPostAiRequest } from "@/redux/reducers/aimodal/actions";
import { speakText } from "@/component/ApiService/TtsApi";

// Custom hook for Malayalam-specific speech recognition
const useMalayalamSpeechRecognition = () => {
  const [recognizedText, setRecognizedText] = useState<string>("");
  const [isRecognizing, setIsRecognizing] = useState<boolean>(false);
  const recognizerRef = useRef<any>(null);

  const startRecognition = useCallback(() => {
    if (isRecognizing) {
      console.warn("Recognition is already running.");
      return;
    }

    // Initialize recognizer with Malayalam settings
    const recognizer = createSpeechRecognizer({
      language: "ml-IN", // Malayalam
      enableIntermediateResults: true,
      suppressNoise: false,
    });
    recognizerRef.current = recognizer;

    // Capture intermediate results
    recognizer.recognizing = (s: any, e: any) => {
      setRecognizedText((prev) => prev + " " + e.result.text);
    };

    // Capture final results
    recognizer.recognized = (s: any, e: any) => {
      if (e.result.reason === SpeechSDK.ResultReason.RecognizedSpeech) {
        setRecognizedText((prev) => prev + " " + e.result.text);
      } else if (e.result.reason === SpeechSDK.ResultReason.NoMatch) {
        console.warn("No speech recognized.");
      }
    };

    recognizer.canceled = (s: any, e: any) => {
      console.error("Recognition canceled:", e.errorDetails);
      stopRecognition();
    };

    recognizer.sessionStopped = () => {
      console.log("Session stopped.");
      stopRecognition();
    };

    recognizer.startContinuousRecognitionAsync(
      () => {
        console.log("Speech recognition started.");
        setIsRecognizing(true);
      },
      (error: any) => {
        console.error("Error starting recognition:", error);
      }
    );
  }, [isRecognizing]);

  const stopRecognition = useCallback(() => {
    const recognizer = recognizerRef.current;
    if (!recognizer || !isRecognizing) {
      console.warn("Recognition is not running.");
      return;
    }

    recognizer.stopContinuousRecognitionAsync(
      () => {
        console.log("Speech recognition stopped.");
        setIsRecognizing(false);
        recognizerRef.current = null;
      },
      (error: any) => {
        console.error("Error stopping recognition:", error);
      }
    );
  }, [isRecognizing]);

  useEffect(() => {
    return () => {
      if (recognizerRef.current) {
        recognizerRef.current.close();
      }
    };
  }, []);

  return { startRecognition, stopRecognition, recognizedText, isRecognizing };
};

const SttApi = () => {
  const aiResponse: any = useSelector(getAiSelector);
  const dispatch = useDispatch<AppDispatch>();

  const { startRecognition, stopRecognition, recognizedText, isRecognizing } =
    useMalayalamSpeechRecognition();
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  useEffect(() => {
    const aiText = aiResponse?.aiResponse?.ai?.data?.data?.aiResponse;

    if (aiText) {
      setIsSpeaking(true);
      stopRecognition(); // Pause recognition while AI responds
      speakText(aiText)
        .finally(() => {
          setIsSpeaking(false);
          startRecognition(); // Resume recognition
        });
    }
  }, [aiResponse, stopRecognition, startRecognition]);

  return (
    <div>
      <button onClick={startRecognition} disabled={isRecognizing || isSpeaking}>
        Start Recognition
      </button>
      <button onClick={stopRecognition} disabled={!isRecognizing}>
        Stop Recognition
      </button>
      <p>Recognized Text:</p>
      <textarea
        value={recognizedText}
        readOnly
        rows={10}
        style={{ width: "100%" }}
      />
    </div>
  );
};

export default SttApi;







