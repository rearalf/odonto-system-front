import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../index.css';
import App from './App';
import { ReactQueryProvider } from './providers/ReactQueryProvider';
import { ToasterProvider } from './providers/ToasterProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReactQueryProvider>
      <ToasterProvider>
        <App />
      </ToasterProvider>
    </ReactQueryProvider>
  </StrictMode>,
);
