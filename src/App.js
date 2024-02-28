import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Pages/Navbar';
import Home from './Pages/Home';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import Dashboard from './Pages/Dashboard';
import ChatPage from './Pages/ChatPage';

function App() {
  
  
  return (
    <div className='w-screen max-w-[100vw] min-h-screen flex flex-col items-center pb-2'>
      <Navbar/>
      

      
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/chat/:userName' element={<ChatPage/>}/>
      </Routes>

      
    </div>
  );
}

export default App;
