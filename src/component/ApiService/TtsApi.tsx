
// import * as SpeechSDK from "microsoft-cognitiveservices-speech-sdk";
// import { createSpeechSynthesizer } from "../../services/speechServices";

// let synthesizer: any = null; // Keep a single instance of the synthesizer

// export const speakText = async (
//   text: string,
//   { language = "ml-IN", voiceName = "" } = {}
// ): Promise<void> => {
//   if (!text) {
//     console.error("Text is required for speech synthesis.");
//     return Promise.resolve();
//   }

//   // Stop any ongoing speech synthesis
//   if (synthesizer) {
//     synthesizer.close();
//     synthesizer = null;
//   }

//   const speechConfig = createSpeechSynthesizer();
//   speechConfig.speechSynthesisLanguage = language;
//   if (voiceName) {
//     speechConfig.speechSynthesisVoiceName = voiceName;
//   }

//   speechConfig.speechSynthesisOutputFormat =
//     SpeechSDK.SpeechSynthesisOutputFormat.Audio24Khz48KBitRateMonoMp3;
//   const audioConfig = SpeechSDK.AudioConfig.fromDefaultSpeakerOutput();

//   synthesizer = new SpeechSDK.SpeechSynthesizer(speechConfig, audioConfig);

//   return new Promise((resolve, reject) => {
//     synthesizer.speakTextAsync(
//       text,
//       (result: any) => {
//         if (result.reason === SpeechSDK.ResultReason.SynthesizingAudioCompleted) {
//           console.log("Speech synthesis succeeded.");
//           resolve(); // Resolve the promise when the speech synthesis completes
//         } else {
//           console.error("Speech synthesis failed:", result.errorDetails);
//           reject(new Error(result.errorDetails)); // Reject on failure
//         }
//         synthesizer.close();
//         synthesizer = null; // Clean up
//       },
//       (error: any) => {
//         console.error("Speech synthesis error:", error);
//         synthesizer.close();
//         synthesizer = null; // Clean up
//         reject(error); // Reject on error
//       }
//     );
//   });
// };

import * as SpeechSDK from "microsoft-cognitiveservices-speech-sdk";
import { createSpeechSynthesizer } from "../../services/speechServices";

let synthesizer: any = null; // Keep a single instance of the synthesizer

export const speakText = async (
  text: string,
  setSpeaking: (isSpeaking: boolean) => void = () => {},// Ensure this is passed correctly
  language = "en-IN", //en-IN ml-IN
  voiceName = "" //en-IN-NeerjaNeural
): Promise<void> => {
  if (!text) {
    console.error("Text is required for speech synthesis.");
    return Promise.resolve();
  }

  setSpeaking(true); // Mark speaking as true

  // Stop any ongoing speech synthesis
  if (synthesizer) {
    synthesizer.close();
    synthesizer = null;
  }

  const speechConfig = createSpeechSynthesizer();
  speechConfig.speechSynthesisLanguage = language;
  if (voiceName) {
    speechConfig.speechSynthesisVoiceName = voiceName;
  }

  speechConfig.speechSynthesisOutputFormat = SpeechSDK.SpeechSynthesisOutputFormat.Audio24Khz48KBitRateMonoMp3;
  const audioConfig = SpeechSDK.AudioConfig.fromDefaultSpeakerOutput();
  synthesizer = new SpeechSDK.SpeechSynthesizer(speechConfig, audioConfig);

  return new Promise((resolve, reject) => {
    synthesizer.speakTextAsync(
      text,
      (result: any) => {
        try {
          if (result.reason === SpeechSDK.ResultReason.SynthesizingAudioCompleted) {
            console.log("Speech synthesis succeeded.");
            resolve(); // Resolve the promise when the speech synthesis completes
          } else {
            console.error("Speech synthesis failed:", result.errorDetails);
            reject(new Error(result.errorDetails)); // Reject on failure
          }
        } finally {
          // Clean up and ensure setSpeaking(false) is called
          synthesizer?.close();
          synthesizer = null;
          setSpeaking(false); // Mark speaking as completed
        }
      },
      (error: any) => {
        console.error("Speech synthesis error:", error);
        synthesizer?.close();
        synthesizer = null;
        setSpeaking(false); // Ensure this is always called
        reject(error); // Reject on error
      },
    );
  });
};


