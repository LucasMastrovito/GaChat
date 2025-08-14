import { useEffect, useState } from "react";
import Card from "./Card";

function Collection() {
    const [display, setDisplay] = useState();
    const cards = [];

    useEffect(() => {
        const summon = async () => {
            fetch('https://gachat.onrender.com/collection/' + localStorage.getItem('userId'))
            .then(res => res.json())
            .then(data => {
                cards.length = 0;
                Object.entries(data).forEach(([chatName, count]) => {
                    cards.push(<Card key={chatName} id={chatName} nb={count}></Card>);
                });
                setDisplay(cards);
            });
        }
        summon();
        
    }, [])
    return(
        <div>
            <h2>Bienvenue {localStorage.getItem('userId') === '1' ? "Lucas" : "Alix"} !</h2>
            <div className="cards">
                {display}
            </div>
        </div>
    )
}

export default Collection;