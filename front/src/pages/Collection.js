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
                console.log(data)
                Object.entries(data).forEach(([chatName, count]) => {
                    cards.push(<Card key={chatName} id={chatName} nb={count}></Card>);
                });
                setDisplay(cards);
            });
        }
        summon();
        
    }, [])
    return(
        <div className="cards">
            {display}
        </div>
    )
}

export default Collection;