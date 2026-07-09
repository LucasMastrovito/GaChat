import { useEffect, useRef, useState } from "react";
import "./Menu.scss";
import Team from "./Team";
import TeamCard from "./TeamCard";
import TeamSlot from "./TeamSlot";

function Teams() {
    const [userTeams, setUserTeams] = useState([]);
    const [display, setDisplay] = useState();
    const [add, setAdd] = useState(false);
    const [name, setName] = useState('');
    const [active, setActive] = useState(0);
    const activeRef = useRef(0);
    const [slots, setSlots] = useState(['', '', '']);
    const [reload, setReload] = useState(false);


    const activeSlot = (index) => {
        setActive(index);
        activeRef.current = index;
    }

    const updateSlot = (id) => {
        setSlots(slots => slots.map((c, i) => {
            if (i === activeRef.current) {
                return id;
            } else {
                return c;
            }
        }))
    }

    useEffect(() => {
        const get = async () => {
            const res = await fetch('https://gachat.onrender.com/teams/' + localStorage.getItem('userId'));
            const data = await res.json();

            const newCards = data.map((element, index) =>
                <Team key={index} name={element.name} cats={element.cats} canRemove={true} />
            );

            setUserTeams(newCards);
        };

        const getCats = async () => {
            const res = await fetch('https://gachat.onrender.com/collection/' + localStorage.getItem('userId'));
            const data = await res.json();
            const rarityOrder = ['divin', 'legendary', 'mythic', 'rare', 'basique'];

            const sortedData = [...data].sort((a, b) => {
                return rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity);
            });
            const newCards = sortedData.map(item => (
                <TeamCard key={item.id} id={item.id} type={item.type} click={updateSlot} />
            ));
            setDisplay(newCards);
        };

        get();
        getCats();
        setReload(false);
    }, [reload])

    function handleChange(e) {
        setName(e.target.value);
    }

    const createTeam = async () => {
        if (name !== '' && slots[0] !== '' && slots[1] !== '' && slots[2] !== '') {
            try {
                const res = await fetch('https://gachat.onrender.com/addteam', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userId: localStorage.getItem('userId'),
                        name,
                        slots
                    })
                });

                if (!res.ok) {
                    throw new Error(`Erreur ${res.status}`);
                }

                const data = await res.json();
                return data;
            } catch (err) {
                console.error('Erreur lors du POST:', err);
            }
        }
        setReload(true);
        setAdd(false);
    }

    return (
        <div>
            {add ?
                <div>
                    <h2>Nouvelle Equipe</h2>
                    <input className="team-name" name="Nom" value={name} onChange={handleChange} />
                    <div className="team-slots">
                        <TeamSlot id={slots[0]} slot={0} active={active === 0} click={activeSlot} />
                        <TeamSlot id={slots[1]} slot={1} active={active === 1} click={activeSlot} />
                        <TeamSlot id={slots[2]} slot={2} active={active === 2} click={activeSlot} />
                    </div>
                    <button className="btn" onClick={createTeam} style={{ marginTop: '5vh' }}>Ajouter</button>
                    <div className="allcats">
                        {display}
                    </div>
                </div>
                :
                <div className="teams">
                    <h2>Equipes</h2>
                    {userTeams}
                    <button className="btn" onClick={() => { setAdd(true) }} style={{ marginTop: '5vh' }}>Nouvelle</button>
                </div>
            }
        </div>
    )
}

export default Teams;