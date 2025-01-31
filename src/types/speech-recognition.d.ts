declare global {
    interface Window {
        SpeechRecognition: SpeechRecognition;
        webkitSpeechRecognition: SpeechRecognition;
    }
    
    interface SpeechRecognition {
        new (): SpeechRecognition;
        lang: string;
        interimResults: boolean;
        maxAlternatives: number;
        start: () => void;
        stop: () => void;
        onstart: (event: Event) => void;
        onresult: (event: SpeechRecognitionEvent) => void;
        onerror: (event: SpeechRecognitionErrorEvent) => void;
        onend: (event: Event) => void;
    }
    
    interface SpeechRecognitionEvent {
        results: SpeechRecognitionResultList;
    }
    
    interface SpeechRecognitionResultList {
        [index: number]: SpeechRecognitionResult;
    }
    
    interface SpeechRecognitionResult {
        [index: number]: SpeechRecognitionAlternative;
    }
    
    interface SpeechRecognitionAlternative {
        transcript: string;
        confidence: number;
    }
    
    interface SpeechRecognitionErrorEvent extends Event {
        error: string;
        message: string;
    }
}
  
export {};
  