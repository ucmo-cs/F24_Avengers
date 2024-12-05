import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider} from "react-router-dom";
import Layout from "@/components/Layout.tsx";
import Login from "@/routes/Login.tsx";
import { AuthProvider } from "@/components/Auth.tsx";
import ProtectedRoute from "@/components/ProtectedRoute.tsx";
import AdminTable from "@/routes/AdminTable.tsx";
import CustomerPage from "@/routes/CustomerPage.tsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path={"/"} element={<Layout />}>
            <Route index element={<Navigate to={"login"} replace />} />
            <Route path={"login"} element={<Login />} />
            <Route path={"register"} element={<h1>HELLO OTHER ROUTE</h1>} />
            <Route element={<ProtectedRoute />}>
                <Route path={"app-demo"} element={<AdminTable />} />
                <Route path={"account/:id"} element={<CustomerPage />} />
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
