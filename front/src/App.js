import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Summon from './pages/Summon';
import Navbar from './Navbar';
import Collection from './pages/Collection';
import Shop from './pages/Shop';
import { useEffect, useState } from 'react';
import Achievements from './pages/Achievements';

function App() {
  const storedUserId = localStorage.getItem('userId');
  const [kibbles, setKibbles] = useState(0);

    useEffect(() => {
        fetch(`https://gachat.onrender.com/kibbles/${localStorage.getItem('userId')}`)
            .then(res => res.json())
            .then(data => {
                setKibbles(data.kibbles);
        });
    }, []);

  return (
    <Router>
    <div className="App">
      <Navbar kibbles={kibbles}></Navbar>
      <main>
        {
        storedUserId ?
         <Routes>
            <Route path="/" element={<Summon></Summon>}></Route>
            <Route path="/summon" element={<Summon></Summon>}></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/collection" element={<Collection></Collection>}></Route>
            <Route path="/shop" element={<Shop kibbles={kibbles} setKibbles={setKibbles}></Shop>}></Route>
            <Route path="/achievements" element={<Achievements kibbles={kibbles} setKibbles={setKibbles}></Achievements>}></Route>
        </Routes>
       : <Login></Login>
       }
      </main>
    </div>
    </Router>
  );
}

export default App;
