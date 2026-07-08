import { useEffect, useState } from "react";
import Team from "./Team";
import Arena from "./Arena";

function Fight() {
    const [userTeams, setUserTeams] = useState([]);
    const [cats, setCats] = useState([]);
    const [inFight, setInFight] = useState(false);
    const [inArena, setInArena] = useState(false);
    const [enemies, setEnemies] = useState([]);
    const [enemyTeam, setEnemyTeam] = useState();
    const [battle, setBattle] = useState();

    useEffect(() => {
        const get = async () => {
            const res = await fetch('https://gachat.onrender.com/teams/' + localStorage.getItem('userId'));
            const data = await res.json();

            const newCards = data.map((element, index) =>
                <Team key={index} name={element.name} cats={element.cats} index={index} click={chooseTeam} />
            );

            setUserTeams(newCards);
        };

        const getCats = async () => {
            const res = await fetch('https://gachat.onrender.com/collection/' + localStorage.getItem('userId'));
            const data = await res.json();

            setCats(data);
        };

        get();
        getCats();
    }, [])

    const launch = (e) => {
        setEnemies([]);
        console.log(cats[0])
        enemies.push(cats[Math.floor(Math.random() * cats.length)].id);
        enemies.push(cats[Math.floor(Math.random() * cats.length)].id);
        enemies.push(cats[Math.floor(Math.random() * cats.length)].id);
        setEnemyTeam(<Team name={'Adversaires'} cats={enemies} />);
        setInFight(true);
    }

    const chooseTeam = (index) => {
        setBattle(<Arena />)
        setInArena(true);
    }

    return (
        <div>
            <h2>Arène</h2>
            {inFight
                ?
                <div>
                    {inArena ?
                        <div>
                            {battle}
                        </div>
                        :
                        <div>
                            {enemyTeam}
                            < h2 > Choisi une équipe</h2>
                            {userTeams}
                        </div>
                    }
                </div>
                :
                <button className="btn" onClick={launch} style={{ marginTop: '5vh' }}>Combattre</button>
            }
        </div >
    )
}

export default Fight;