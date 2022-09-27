import grecaptcha from "grecaptcha";

export declare global {
  interface Window {
    handleCaptchaCallback: (token: string) => void;
    resetCaptcha: () => void;
    handleCaptchaError: () => void;
  }
}
