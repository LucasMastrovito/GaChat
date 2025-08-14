import { useEffect, useState } from "react";
import Card from "./Card";

function Collection() {
    const [display, setDisplay] = useState();
    const [total, setTotal] = useState(0);
    const [completion, setCompletion] = useState(0);

    useEffect(() => {
        const get = async () => {
        const res = await fetch('https://gachat.onrender.com/collection/' + localStorage.getItem('userId'));
        const data = await res.json();

        setTotal(Object.values(data).reduce((sum, count) => sum + count, 0));
        const newCards = Object.entries(data).map(([chatName, count]) => (
            <Card key={chatName} id={chatName} nb={count} />
        ));
        setDisplay(newCards);
        setCompletion(newCards.length);
    };
        get();
        
    }, [])
    return(
        <div>
            <h2>Bienvenue {localStorage.getItem('userId') === '1' ? "Lucas" : "Alix"} !</h2>
            <div className="collection_bar">
                <p>{total} chats invoqués</p>
                <p>{completion}/57 chats possédés</p>
            </div>
            <div className="collection_bar">
            </div>
            <div className="cards">
                {display}
            </div>
        </div>
    )
}

export default Collection;