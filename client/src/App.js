import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './components/landing/Landing'
import Home from './components/home/Home';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>Henry Pokemon</h1>
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route exact path='/home' element={<Home/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
