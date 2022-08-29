import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './components/landing/Landing'
import Home from './components/home/Home';
import Detail from './components/detail/Detail';
import Formulario from './components/formulario/Formulario';
import Error from './components/404/Error';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route exact path='/home' element={<Home/>}/>
          <Route exact path='/pokemon/:id' element={<Detail/>}/>
          <Route exact path='/pokemon' element={<Formulario/>}/>
          <Route path='*' element={<Error/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
