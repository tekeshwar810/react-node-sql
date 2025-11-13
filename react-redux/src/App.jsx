import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ProductList from './pages/Products/ProductList'
import ProductForm from './pages/Products/ProductForm'
import ProtectedRoute from './routes/ProtectedRoute'
import './App.css'

const { Header, Content } = Layout

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Content style={{ padding: '24px' }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/products" element={<ProductList />} />
              <Route path="/products/new" element={<ProductForm />} />
              <Route path="/products/:id/edit" element={<ProductForm />} />
            </Route>

            <Route path="/" element={<Login />} />
          </Routes>
        </Content>
      </Layout>
    </BrowserRouter>
  )
}

export default App
