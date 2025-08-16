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
        fetch(`https://gachat.onrender.com/${url}/${localStorage.getItem('userId')}`);
    }

    return (
        <div>
            { Data ? 
            <div className="shop">
                <ShopItem name={`${(Data.invocations + 1) * 10} chats invoqués`} img='/abonnement.png' price={`${(Data.invocations + 1) * 10}`} click={() =>check('summonAchievement')}></ShopItem>
                <ShopItem name='Collection' img='/abonnement.png' price='100' click={() =>check('collectionAchievement')}></ShopItem>
                <ShopItem name='Chats Rares' img='/rarity/rare.png' price='10' click={() => check('rarityAchievement/rare')}></ShopItem>
                <ShopItem name='Chats Mythiques' img='/rarity/mythic.png' price='30' click={() =>check('rarityAchievement/mythic')}></ShopItem>
                <ShopItem name='Chats Légendaires' img='/rarity/legendary.png' price='50' click={() =>check('rarityAchievement/legendary')}></ShopItem>
                <ShopItem name='Chats Divins' img='/rarity/divin.png' price='100' click={() =>check('rarityAchievement/divin')}></ShopItem>
            </div>
            : <span> </span> }
        </div>
    )
}

export default Achievements;