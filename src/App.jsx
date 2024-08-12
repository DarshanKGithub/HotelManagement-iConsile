import './App.css';
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import Login from './Components/Login';
import Register from './Components/Register';
import ForgotPassword from './Components/ForgotPassword';
import Footer from './Components/Footer'; // Import Footer
import Background from "./assets/BG.jpg";
import { Route, Routes } from 'react-router-dom';
import HotelDetails from './Components/HotelDetails';
import BookingForm from './Components/BookingForm';
import Admin from './Components/Admin';
import AdminLogin from './Components/AdminLogin';
import Forgot from './Components/Forgot';

function App() {
  return (
    <div className='flex flex-col min-h-screen'>
      <div 
        className='flex-grow bg-cover bg-center relative'
        style={{ backgroundImage: `url(${Background})` }}
      >
        {/* Overlay */}
        <div className='absolute inset-0 bg-black opacity-70'></div>

        {/* Content */}
        <div className='relative z-10'>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/forgot' element={<ForgotPassword />} />
            <Route path="/hotel-details" element={<HotelDetails />} />
            <Route path="/confirmed-booking" element={<BookingForm />} />
            <Route path='/admin' element={<Admin/>} />
            <Route path='/admin-login' element={<AdminLogin/>} />
            <Route path='/reset-password' element={<Forgot/>} />
          </Routes>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
