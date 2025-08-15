import { useEffect, useState } from "react";
import "./Summon.scss";
import SummonAnimation from "../SummonAnimation";

function Summon() {
    const [Data, setData] = useState({});
    const [Url, setUrl] = useState('');
    const [attemps, setAttemps] = useState(null);
    const [allAttemps, setAllAttemps] = useState({rare: 0, mythic: 0, legendary: 0});
    const [animKey, setAnimKey] = useState(0);
    const [animStill, setAnimStill] = useState(false);

    useEffect(() => {
        const get = async () => {
            const res = await fetch('https://gachat.onrender.com/attemps/' +  localStorage.getItem('userId'));
            const data = await res.json();
            console.log(data)
            setAttemps(data.basic);
            setAllAttemps(data);
        }
        get();
            
    }, []);

    const summon = async (type) => {
        console.log(type.target.value)
        fetch('https://gachat.onrender.com/summon/' + type.target.value + '/' + localStorage.getItem('userId'))
        .then(res => res.json())
        .then(data => {
            setAnimStill(true);
            if (data.hasOwnProperty('attemps')) {
                setAttemps(0);
            } else {
                setData(data);
                setUrl(data.id.toLowerCase());
                setAnimKey(animKey + 1);
            }
        });
    };

    const summonComplete = () => {
        setAttemps(attemps - 1);
        setAnimStill(false);
    }

    return (
    <div className="summon_container">
        { attemps === null ?
        <h1>Chargement...</h1>
        :
        <div className="summon_card">
            { Url ?
            <div className="summon_gif">
                <SummonAnimation
                    key={animKey}
                    rarity={Data.rarity} 
                    gifUrl={'https://raw.githubusercontent.com/LucasMastrovito/GaChat/main/public/' + Url + '.gif'}
                    name={Data.id}
                    onComplete={summonComplete}
                />
            </div>
             :
            <div className="summon_gif">
                <img alt="box" className="box" src="/abonnement.png" />
            </div>
            }
            {!animStill && (
                <div className="buttons-summon">
                    { attemps === 0 ? <span></span> :
                        <button className="btn" value="basic" onClick={summon}>Invoquer</button>
                    }
                    { allAttemps.rare === 0 ? <span></span> :
                        <button className="btn" value="rare" onClick={summon}>Invocation Rare</button>
                    }
                    { allAttemps.mythic === 0 ? <span></span> :
                        <button className="btn" value="mythic" onClick={summon}>Invocation Mythique</button>
                    }
                    { allAttemps.legendary === 0 ? <span></span> :
                        <button className="btn" value="legendary" onClick={summon}>Invocation Légendaire</button>
                    }
                    <h3>{attemps === 0 ? "Tu n'as plus d'invocations..." : `Il te reste ${attemps} invocations !`}</h3>
                </div>
            )}
        </div>
        }
    </div>
    )
}

export default Summon;