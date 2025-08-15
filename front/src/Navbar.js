import { useNavigate } from "react-router-dom";

function Navbar(props) {
    const navigate = useNavigate();

    const click = (e) => {
        navigate(e.target.value);
    }

    const shop = (e) => {
        navigate('/shop');
    }
    return (
        <div>
            <header className="App-header">
                <img alt='logo' src='/minou.png' style={{marginLeft: '3vw', maxHeight: '10vh'}} />
                <h1 style={{marginLeft: '7vw', marginRight: '3vw', width: '50%'}}>GaChat !</h1>
                <div className="kibbles" onClick={shop}>
                    <img alt="kibbles" src="/kibbles.png" style={{maxWidth: '10vw'}} />
                    <p>{props.kibbles}</p>
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