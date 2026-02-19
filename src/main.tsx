import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './global.css'
import { RouterProvider } from 'react-router-dom';
import router from './routes/Routes';
import { Toaster } from "sonner";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Toaster richColors position="top-right" />
  </StrictMode>,
)
