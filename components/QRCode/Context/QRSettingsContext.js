import React, { createContext, useContext, useReducer } from 'react';

const QRSettingsContext = createContext();

const initialState = {
  label: {
    text: 'Scan Me',
  },
  color: {
    foreground: '#000000',
    background: '#FFFFFF',
  },
  frame : {
    showLabel : true,
    showFrame : true,
  },
  logo : {
    url: null,
  }
};

function settingsReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_LABEL':
      return {
        ...state,
        label: { ...state.label, text : action.payload }
      };
    case 'UPDATE_BACKGROUND_COLOR':
      return {
        ...state,
        color: { ...state.color, background: action.payload }
      };
    case 'UPDATE_FOREGROUND_COLOR':
      return {
        ...state,
        color: { ...state.color, foreground: action.payload }
      };
    case 'UPDATE_SHOW_FRAME_TEXT':
      return {
        ...state,
        frame: { ...state.frame,  showLabel: action.payload}
      };
    case 'UPDATE_SHOW_FRAME':
    return {
      ...state,
      frame: { ...state.frame,  showFrame: action.payload}
    }
    case 'UPDATE_LOGO_URL':
    return {
      ...state,
      logo: { url: action.payload}
    }
    case 'GENERATE_QR':
      return {
        ...state,
        generateQR: action.payload, // Ensure this is independent of the logo
      };
    default:
      return state;
  }
}

export function QRSettingsProvider({ children }) {
  const [state, dispatch] = useReducer(settingsReducer, initialState);

  return (
    <QRSettingsContext.Provider value={{ state, dispatch }}>
      {children}
    </QRSettingsContext.Provider>
  );
}

export function useQRSettings() {
  const context = useContext(QRSettingsContext);
  if (!context) {
    throw new Error('useQRSettings must be used within QRSettingsProvider');
  }
  return context;
}