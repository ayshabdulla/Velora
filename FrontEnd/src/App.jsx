
import React from 'react';

import HomePage from './Pages/HomePage/HomePage'
import Navbar from './Components/Navbar/Navbar'
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuthcontext } from './Context/Authcontext';
import AdminRoute from './Components/AdminRoute';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import AdminLogin from './Pages/Admin/AdminLogin';
import EditProduct from './Pages/Admin/EditProduct';
import CancelPage from './Pages/CancelPage';
import CartPage from './Pages/HomePage/CartPage/CartPage';
import CreateProduct from './Pages/Admin/CreateProduct';
import LoginPage from './Pages/LoginPage/LoginPage';
import PageNotFound from './Pages/PageNotFound/PageNotFound';
import RegisterPage from './Pages/RegisterPage/RegisterPage';
import SuccessPage from './Pages/SuccessPage';
import ProductDetails from './Pages/ProductDetails/ProductDetails';
import ShopPage from './Pages/ShopPage/ShopPage';
import AboutPage from './Pages/AboutPage/AboutPage';
import ContactPage from './Pages/ContactPage/ContactPage';



const App = () => {
  const { user } = useAuthcontext();
  return (
    // grouping all the routes
    <>

      <Navbar />
      <Routes>
        {/* single route */}
        <Route path='/' element={<HomePage />} />
        <Route path='/admin/login' element={<AdminLogin />} />

        {/* PROTECTED ADMIN ROUTES */}
        <Route path='/admin/dashboard' element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        } />

        <Route path='/admin/create' element={
          <AdminRoute>
            <CreateProduct />
          </AdminRoute>
        } />

        <Route path='/admin/edit/:id' element={
          <AdminRoute>
            <EditProduct />
          </AdminRoute>
        } />

        <Route path='/login'
          element={user ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          path='/register'
          element={user ? <Navigate to="/" /> : <RegisterPage />}
        />

        <Route path='/shop' element={<ShopPage/>}/>

        <Route path='/about' element={<AboutPage/>}/>

        <Route path='/contact' element={<ContactPage/>}/>

        <Route path="/cart" element={<CartPage />} />
        

        <Route path="/success" element={<SuccessPage />} />
        <Route path="/cancel" element={<CancelPage />} />

        {/* page not found route should always add in last. * is used to show there is an errror */}
        <Route path="*" element={<PageNotFound />} />

        <Route path='/product/:id' element={<ProductDetails/>} />
      </Routes>

      

    </>
  );
};

export default App;
