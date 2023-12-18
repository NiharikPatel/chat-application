import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/home';
import Login from './Pages/loginpage';
import Signup from './Pages/registerpage';
import Welcome from './Pages/welcome';
import Chat from './Pages/chatPage';
import store from './redux/store';
import { Provider } from 'react-redux';

function App() {
  return (
    <div >
        <BrowserRouter>
        <Provider store={store}>
        <Routes>
        <Route path='/' element={<Welcome/>}/>
        <Route path='/home' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path="/chat/:firstname" element={<Chat/>} />
        </Routes>
        </Provider>
        </BrowserRouter>

     </div>
  );
}

export default App;
