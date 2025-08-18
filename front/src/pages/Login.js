import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const click = (e) => {
        localStorage.setItem('userId', e.target.value);
        localStorage.setItem('username', e.target.value === '1' ? 'Lucas' : e.target.value === '2' ? 'Alix' : 'Romane');
        navigate('/summon');
    }
    return (
        <div className="login_container">
            <h2>Ptdr t ki</h2>
            <div className="btns">
                <button className="btn" value='1' onClick={click}>Lucas</button>
                <button className="btn" value='2' onClick={click}>Alix</button>
                {/* <button className="btn" value='3' onClick={click}>Test</button> */}
                <button className="btn" value='4' onClick={click}>Romane</button>
            </div>
        </div>
    )
}

export default Login;