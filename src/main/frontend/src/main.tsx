import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import Layout from "@/components/Layout.tsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path={"/"} element={<Layout />}>
            <Route index element={<App />} /> {/* element={<Navigate to={"login"} replace />} */}
            <Route path={"login"} element={<h1>login page</h1>} />
        </Route>
    )
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
