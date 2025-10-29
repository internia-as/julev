declare global {
  interface Window {
    umami?: {
      track: (event: string) => void;
    };
  }
}

const trackEvent = (event: string) => {
  if (window.umami) {
    window.umami.track(event);
  }
};

export { trackEvent };
