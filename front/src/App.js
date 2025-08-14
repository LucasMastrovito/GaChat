import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Summon from './pages/Summon';
import Navbar from './Navbar';
import Collection from './pages/Collection';

function App() {
  const storedUserId = localStorage.getItem('userId');

  return (
    <Router>
    <div className="App">
      <header className="App-header">
        <img alt='logo' src='/minou.png' style={{marginLeft: '3vw'}} />
        <h1 style={{marginLeft: '7vw'}}>GaChat !</h1>
      </header>
      <Navbar></Navbar>
      <main>
        {
        storedUserId ?
         <Routes>
            <Route path="/" element={<Summon></Summon>}></Route>
            <Route path="/summon" element={<Summon></Summon>}></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/collection" element={<Collection></Collection>}></Route>
        </Routes>
       : <Login></Login>
       }
      </main>
    </div>
    </Router>
  );
}

export default App;
