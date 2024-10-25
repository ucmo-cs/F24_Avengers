import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider} from "react-router-dom";
import Layout from "@/components/Layout.tsx";
import Login from "@/routes/Login.tsx";
import {AuthProvider, ProtectedRoute} from "@/components/Auth.tsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path={"/"} element={<Layout />}>
            <Route index element={<Navigate to={"login"} replace />} />
            <Route path={"login"} element={<Login />} />
            <Route path={"register"} element={<h1>HELLO OTHER ROUTE</h1>} />
            <Route path={"/"} element={<ProtectedRoute />}>
                <Route path={"app-demo"} element={<App />} />
            </Route>
        </Route>
    )
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
