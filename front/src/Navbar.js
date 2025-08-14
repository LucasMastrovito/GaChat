import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const click = (e) => {
        navigate(e.target.value);
    }
    return (
        <div className="navbar">
            <button className="nav" value='/login' onClick={click}>Login</button>
            <button className="nav" value='/summon' onClick={click}>Invoquer</button>
            <button className="nav" value='/collection' onClick={click}>Chakidex</button>
        </div>
    )
}

export default Navbar;