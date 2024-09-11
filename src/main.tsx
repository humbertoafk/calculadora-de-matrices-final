import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import MatrixCalculator from './components/MatrixCalculator';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MatrixCalculator />
  </StrictMode>,
);
