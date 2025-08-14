import { useEffect, useState } from "react";
import Card from "./Card";

function Collection() {
    const [display, setDisplay] = useState();
    const [total, setTotal] = useState(0);
    const [completion, setCompletion] = useState(0);
    const [rarities, setRarities] = useState();
    const rarityOrder = ['divin', 'legendary', 'mythic', 'rare', 'basique'];

    useEffect(() => {
        const get = async () => {
        const res = await fetch('https://gachat.onrender.com/collection/' + localStorage.getItem('userId'));
        const data = await res.json();

        const rarityCounts = data.reduce((acc, item) => {
            acc[item.rarity] = (acc[item.rarity] || 0) + item.count;
            return acc;
        }, {});
        setRarities(rarityCounts);

        const total = data.reduce((sum, item) => sum + item.count, 0);
        setTotal(total);

        const sortedData = [...data].sort((a, b) => {
            return rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity);
        });
        const newCards = sortedData.map(item => (
            <Card key={item.id} id={item.id} nb={item.count} rarity={item.rarity} />
        ));
        setDisplay(newCards);

        setCompletion(newCards.length);
    };
        get();
        
    }, [])

    return(
        <div>
            <h2>Bienvenue {localStorage.getItem('userId') === '1' ? "Lucas" : "Alix"} !</h2>
            <div className="collection_header shadow">
                <div className="collection_bar">
                    <p>{total} chats invoqués</p>
                    <p>{completion}/57 chats possédés</p>
                </div>
                { rarities ? 
                <div className="collection_bar">
                    <div className="rarity">
                        <p>{rarities.basique ? rarities.basique : 0}</p>
                        <img alt="rarity" src={'/rarity/basique.png'} style={{width: '10vw'}} />
                    </div>
                    <div className="rarity">
                        <p>{rarities.rare ? rarities.rare : 0}</p>
                        <img alt="rarity" src={'/rarity/rare.png'} style={{width: '10vw'}} />
                    </div>
                    <div className="rarity">
                        <p>{rarities.mythic ? rarities.mythic : 0}</p>
                        <img alt="rarity" src={'/rarity/mythic.png'} style={{width: '10vw'}} />
                    </div>
                    <div className="rarity">
                        <p>{rarities.legendary ? rarities.legendary : 0}</p>
                        <img alt="rarity" src={'/rarity/legendary.png'} style={{width: '10vw'}} />
                    </div>
                    <div className="rarity">
                        <p>{rarities.divin ? rarities.divin : 0}</p>
                        <img alt="rarity" src={'/rarity/divin.png'} style={{width: '10vw'}} />
                    </div>
                </div> : <span></span> }
            </div>
            <div className="cards">
                {display}
            </div>
        </div>
    )
}

export default Collection;