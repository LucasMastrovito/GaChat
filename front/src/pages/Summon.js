import { useState } from "react";
import "./Summon.css";

function Summon() {
    const [Data, setData] = useState({});
    const [Url, setUrl] = useState('');
    const [attemps, setAttemps] = useState();

    console.log(Url)
    const summon = async (e) => {
        fetch('https://gachat.onrender.com/summon/' + localStorage.getItem('userId'))
        .then(res => res.json())
        .then(data => {
            if (data.hasOwnProperty('attemps')) {
                setAttemps("Plus d'essais...");
            } else {
                setData(data);
                console.log(data.id)
                setUrl(data.id.toLowerCase());
            }
        });
    }

    return (
    <div className="summon_container">
        {
            attemps ? 
            <h1>{attemps}</h1>
            :
        <div>
            <h1 className="name">{Data.id}</h1>
            <div className='summon_card'>
                { Url ?
                <img className="gif" alt="cat" src={'https://raw.githubusercontent.com/LucasMastrovito/GaChat/main/public/' + Url + '.gif'}></img>
                :
                <img className="box" alt="cat" src={'/abonnement.png'}></img>
                }
            </div>
            <button className="btn" onClick={summon}>Invoquer</button>
        </div>
        }
    </div>
    )
}

export default Summon;