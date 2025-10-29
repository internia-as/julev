declare global {
  interface Window {
    umami?: {
      track: (event: string, data: any) => void;
    };
  }
}

const trackEvent = async (event: string, data?: any) => {
  if (window.umami) {
    window.umami.track(event, data);
  }
};

export { trackEvent };
