import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './components/landing/Landing'
import Home from './components/home/Home';
import Detail from './components/detail/Detail'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route exact path='/home' element={<Home/>}/>
          <Route exact path='/pokemon/:id' element={<Detail/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
