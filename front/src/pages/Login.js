import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const click = (e) => {
        localStorage.setItem('userId', e.target.value);
        navigate('/summon');
    }
    return (
        <div className="login_container">
            <h2>Ptdr t ki</h2>
            <div className="btns">
                <button className="btn" value='1' onClick={click}>Lucas</button>
                <button className="btn" value='2' onClick={click}>Alix</button>
            </div>
        </div>
    )
}

export default Login;