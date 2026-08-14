import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { LanguageProvider } from './lib/LanguageContext.tsx';
import { HebatDataProvider } from './lib/HebatDataContext.tsx';
import { AuthProvider } from './lib/AuthContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <AuthProvider>
        <HebatDataProvider>
          <App />
        </HebatDataProvider>
      </AuthProvider>
    </LanguageProvider>
  </StrictMode>,
);
