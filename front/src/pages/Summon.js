import { useState } from "react";
import "./Summon.css";

function Summon() {
    const [Data, setData] = useState({});
    const [Url, setUrl] = useState('');

    console.log(Url)
    const summon = async (e) => {
        fetch('http://localhost:3000/summon')
        .then(res => res.json())
        .then(data => {
            setData(data);
            console.log(data.id)
            setUrl(data.id.toLowerCase());
        });
    }

    return (
    <div className="summon_container">
         <div className='summon_card'>
            <img className="gif" alt="cat" src={'https://raw.githubusercontent.com/LucasMastrovito/GaChat/main/public/' + Url + '.gif'}></img>
         </div>
        <button className="btn" onClick={summon}>Invoquer</button>
    </div>
    )
}

export default Summon;