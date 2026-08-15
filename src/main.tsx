import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { LanguageProvider } from './lib/LanguageContext.tsx';
import { HebatDataProvider } from './lib/HebatDataContext.tsx';
import { AuthProvider } from './lib/AuthContext.tsx';
import JuryDemo from './features/demo/JuryDemo.tsx';
import { DemoProvider } from './features/demo/DemoContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {window.location.pathname === '/demo' ? <DemoProvider><JuryDemo /></DemoProvider> : <LanguageProvider>
      <AuthProvider>
        <HebatDataProvider>
          <App />
        </HebatDataProvider>
      </AuthProvider>
    </LanguageProvider>}
  </StrictMode>,
);
