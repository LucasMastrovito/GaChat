import "./Menu.scss";
import { useNavigate } from "react-router-dom";

function Menu () {
    const navigate = useNavigate();

    const navTo = (path) => {
        navigate(path);
    }
    return (
        <div className="menu">
            <h2>Bienvenue {localStorage.getItem('username')} !</h2>
            <button className="btn" onClick={() => navTo('/summon')} style={{marginTop: '5vh'}}>Invoquer</button>
            <button className="btn" onClick={() => navTo('/teams')} style={{marginTop: '5vh'}}>Equipes</button>
            <button className="btn" onClick={() => navTo('/fight')} style={{marginTop: '5vh'}}>Combat</button>
        </div>
    )
}

export default Menu;