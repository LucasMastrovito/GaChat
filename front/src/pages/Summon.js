import { useEffect, useState } from "react";
import "./Summon.css";

function Summon() {
    const [Data, setData] = useState({});
    const [Url, setUrl] = useState('');
    const [attemps, setAttemps] = useState(null);

    useEffect(() => {
        const get = async () => {
            const res = await fetch('https://gachat.onrender.com/attemps/' + localStorage.getItem('userId'));
            const data = await res.json();
            console.log(data)
            setAttemps(data);
        }
        console.log('yo')
        get();
            
    }, []);

    const summon = async (e) => {
        fetch('https://gachat.onrender.com/summon/' + localStorage.getItem('userId'))
        .then(res => res.json())
        .then(data => {
            if (data.hasOwnProperty('attemps')) {
                setAttemps(0);
            } else {
                setData(data);
                console.log(data.id)
                setUrl(data.id.toLowerCase());
            }
        });
    };

    return (
    <div className="summon_container">
        {
            attemps === null ?
            <h1>Chargement...</h1> :
            attemps === 0 ?
            <h1>Plus d'essais...</h1>
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
            <h3>Il te reste {attemps} invocations !</h3>
        </div>
        }
    </div>
    )
}

export default Summon;