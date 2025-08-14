import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const [kibbles, setKibbles] = useState(0);

    useEffect(() => {
        fetch(`https://gachat.onrender.com/kibbles/${localStorage.getItem('userId')}`)
            .then(res => res.json())
            .then(data => {
                setKibbles(data.kibbles);
        });
    }, []);

    const click = (e) => {
        navigate(e.target.value);
    }
    return (
        <div>
            <header className="App-header">
                <img alt='logo' src='/minou.png' style={{marginLeft: '3vw', maxHeight: '10vh'}} />
                <h1 style={{marginLeft: '7vw', marginRight: '3vw', width: '50%'}}>GaChat !</h1>
                <div className="kibbles">
                    <img alt="kibbles" src="/kibbles.png" style={{maxWidth: '10vw'}} />
                    <p>{kibbles}</p>
                </div>
            </header>
            <div className="navbar shadow">
                <button className="nav" value='/login' onClick={click}>Login</button>
                <button className="nav" value='/summon' onClick={click}>Invoquer</button>
                <button className="nav" value='/collection' onClick={click}>Chakidex</button>
            </div>
        </div>
    )
}

export default Navbar;