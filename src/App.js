import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Pages/Navbar';
import Home from './Pages/Home';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import Dashboard from './Pages/Dashboard';
import ChatPage from './Pages/ChatPage';
import { useSelector } from 'react-redux';

function App() {
  const loading = useSelector(state=>state.loading.value)
  
  
  return (
    <div className='w-screen min-h-screen relative flex flex-col items-center
    bg-svg bg-repeat bg-cover bg-center mx-auto lg:max-h-screen overflow-y-hidden'>
      <div className='relative w-full flex-1 h-full max-w-[1200px] flex flex-col items-center pb-2'>
        <Navbar/>
        

        
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/signup' element={<SignupPage/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/chat/:userName' element={<ChatPage/>}/>
        </Routes>
      </div>

      <div className={`fixed top-0 left-0 right-0 bottom-0 bg-black/40 ${loading?'flex justify-center items-center':'hidden'}`}>
        <div className='loader'></div>
      </div>
      
    </div>
  );
}

export default App;
