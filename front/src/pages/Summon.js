import { useEffect, useState } from "react";
import "./Summon.scss";
import SummonAnimation from "../SummonAnimation";

function Summon() {
    const [Data, setData] = useState({});
    const [Url, setUrl] = useState('');
    const [attemps, setAttemps] = useState(null);
    const [animKey, setAnimKey] = useState(0);

    useEffect(() => {
        const get = async () => {
            const res = await fetch('https://gachat.onrender.com/attemps/' +  '3'/* localStorage.getItem('userId') */);
            const data = await res.json();
            console.log(data)
            setAttemps(data);
        }
        console.log('yo')
        get();
            
    }, []);

    const summon = async (e) => {
        fetch('https://gachat.onrender.com/summon/' + '3'/* localStorage.getItem('userId') */)
        .then(res => res.json())
        .then(data => {
            if (data.hasOwnProperty('attemps')) {
                setAttemps(0);
            } else {
                setData(data);
                setUrl(data.id.toLowerCase());
                setAnimKey(animKey + 1);
                setAttemps(attemps - 1);
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
        <div className="summon_card">
            { Url ?
            <div className="summon_gif">
                <SummonAnimation
                    key={animKey}
                    rarity={Data.rarity} 
                    gifUrl={'https://raw.githubusercontent.com/LucasMastrovito/GaChat/main/public/' + Url + '.gif'}
                    name={Data.id}
                    onFinish={() => console.log("Animation terminée")}
                />
            </div>
             :
            <div className="summon_gif">
                <img alt="box" className="box" src="/abonnement.png" />
            </div>
            }
            <button className="btn" onClick={summon}>Invoquer</button>
            <h3>Il te reste {attemps} invocations !</h3>
        </div>
        }
    </div>
    )
}

export default Summon;