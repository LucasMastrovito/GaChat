import ShopItem from "./ShopItem";
import './Shop.scss';
import { useEffect, useState } from "react";

function Achievements(props) {
    const [Data, setData] = useState(null);

    useEffect(() => {
            const get = async () => {
                const res = await fetch('https://gachat.onrender.com/getAchievements/' +  localStorage.getItem('userId'));
                const data = await res.json();
                setData(data);
            }
            get();
                
    }, []);

    const check = (url) => {
        fetch(`https://gachat.onrender.com/${url}/${localStorage.getItem('userId')}`)
        .then(res => res.json())
        .then(data => {
            setData(data);
        });
    }

    return (
        <div>
            { Data ? 
            <div className="shop">
                <ShopItem name={`${(Data.invocations + 1) * 10} chats invoqués`} img='/abonnement.png' price={`${(Data.invocations + 1) * 10}`} click={() =>check('summonAchievements')}></ShopItem>
                <ShopItem name={`${(Data.collection + 1) * 10} chats collectés`} img='/abonnement.png' price={(Data.collection + 1) * 100} click={() =>check('collectionAchievements')}></ShopItem>
                <ShopItem name={`${(Data.rarity.rare + 1) * 3} chats rares`} img='/rarity/rare.png' price='10' click={() => check('rarityAchievements/rare')}></ShopItem>
                <ShopItem name={`${(Data.rarity.rare + 1) * 3} chats mythique`} img='/rarity/mythic.png' price='30' click={() =>check('rarityAchievements/mythic')}></ShopItem>
                <ShopItem name={`${(Data.rarity.rare + 1) * 3} chats légendaires`} img='/rarity/legendary.png' price='50' click={() =>check('rarityAchievements/legendary')}></ShopItem>
                <ShopItem name={`${(Data.rarity.rare + 1) * 3} chats divins`} img='/rarity/divin.png' price='100' click={() =>check('rarityAchievements/divin')}></ShopItem>
            </div>
            : <span></span> }
        </div>
    )
}

export default Achievements;