// src/utils/fontLoader.js
export const loadGoogleFont = (fontName) => {
    const formattedFontName = fontName.replace(/\s+/g, '+'); // Replace spaces with '+'
    const fontLink = `https://fonts.googleapis.com/css2?family=${formattedFontName}&display=swap`;
  
    // Check if the font is already loaded
    if (!document.querySelector(`link[href="${fontLink}"]`)) {
      const link = document.createElement('link');
      link.href = fontLink;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
  };
  