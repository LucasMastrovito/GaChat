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
    const [battleTeams, setBattleTeams] = useState(null);

        const chooseTeam = (team) => {
            setBattleTeams({ teamAIds: enemies, teamBIds: team });
            setInArena(true);
        }

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
        }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const launch = (e) => {
        setEnemies([]);
        enemies.push(cats[Math.floor(Math.random() * cats.length)].id);
        enemies.push(cats[Math.floor(Math.random() * cats.length)].id);
        enemies.push(cats[Math.floor(Math.random() * cats.length)].id);
        setEnemyTeam(<Team name={'Adversaires'} cats={enemies} />);
        setInFight(true);
    }

    return (
        <div>
            <h2>Arène</h2>
            {inFight
                ?
                <div>
                    {inArena ?
                        <div>
                            <Arena
                                teamAIds={battleTeams.teamAIds}
                                teamBIds={battleTeams.teamBIds}
                                allCats={cats}
                                onBattleEnd={(winner) => console.log(winner === "A" ? "Team 1 win" : "Team 2 win")}
                            />
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