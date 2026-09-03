import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {CalculatorExperience} from '@/components/calculator/CalculatorExperience';
import '@/app/globals.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CalculatorExperience />
  </StrictMode>,
);
