import { useState } from "react";
import "./Summon.css";
import axios from 'axios';

function Summon() {
    const [Data, setData] = useState({});
    const [Url, setUrl] = useState('chakirock');

    const summon = async (e) => {
        await axios.get('http://localhost:3000/summon').then((response => {
            setData(response.data);
            console.log(Data.id)
            setUrl(Data.id);
        }));
    }

    return (
    <div className="summon_container">
         <div className='summon_card'>
            <img className="gif" alt="cat" src={'https://raw.githubusercontent.com/LucasMastrovito/GaChat/main/public/' + {Url} + '.gif'}></img>
         </div>
        <button className="btn" onClick={summon}>Invoquer</button>
    </div>
    )
}

export default Summon;