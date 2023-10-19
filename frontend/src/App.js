import { Routes, Route, Link } from 'react-router-dom';
import Main from './pages/Main/Main';
import LandingPage from './pages/LandingPage/LandingPage';
import Create from './pages/Create/Create';
import './App.css';
import Register from './pages/Register/Register';
import Footer from './components/Footer';
import Detail from './pages/Detail/Detail'
import LoadingPage from './pages/LoadingPage/LoadingPage';
import Update from './pages/Update/Update';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/main' element={<Main />} />
        <Route path='/create' element={<Create />} />
        <Route path='/posts/:id' element={<Detail />} />
        <Route path='/loading' element={<LoadingPage />} />
        <Route path='/main/update/:id' element={<Update />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
