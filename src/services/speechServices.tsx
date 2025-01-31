import * as SpeechSDK from "microsoft-cognitiveservices-speech-sdk";
import { AZURE_KEY, AZURE_REGION } from "../utils/env"; 

export const createSpeechRecognizer: any = () => {
    const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(AZURE_KEY, AZURE_REGION);
    speechConfig.speechRecognitionLanguage = "ml-IN"; // Malayalam
    const audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
    speechConfig.setProperty('speechRecognitionModel', 'interactive');
    speechConfig.setProperty('speechRecognitionNoiseSuppression', 'high');
    speechConfig.setProperty('speechServiceConnection_EndSilenceTimeoutMs', '1000');
    speechConfig.outputFormat = SpeechSDK.OutputFormat.Detailed;
    speechConfig.setProperty('speechServiceConnection_InitialSilenceTimeoutMs', '2000');
    speechConfig.setProperty('speechServiceConnection_AutoDetectSourceLanguage', 'true');
    return new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);
};

export const createSpeechSynthesizer = () => {
    if (!AZURE_KEY || !AZURE_REGION) {
        throw new Error("Azure subscription key and region are required.");
    }
    return SpeechSDK.SpeechConfig.fromSubscription(AZURE_KEY, AZURE_REGION);
};


