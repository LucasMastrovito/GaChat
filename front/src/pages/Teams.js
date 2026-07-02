import { useEffect, useState } from "react";
import "./Menu.scss";
import Team from "./Team";

function Teams () {
    const [userTeams, setUserTeams] = useState([]);

        useEffect(() => {
            const get = async () => {
                const res = await fetch('https://gachat.onrender.com/teams/' + localStorage.getItem('userId'));
                const data = await res.json();

                const newCards = data.map(item => (
                    <Team key={item.id} cats={item} />
                ));
                setUserTeams(newCards);
            };
    
            get();
            
        }, [])
    return (
        <div className="teams">
            <h2>Equipes</h2>
            { userTeams }
        </div>
    )
}

export default Teams;