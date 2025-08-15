import ShopItem from "./ShopItem";
import './Shop.scss';
import { useEffect, useState } from "react";

function Shop() {
    const [kibbles, setKibbles] = useState(0);
    
    useEffect(() => {
        fetch(`https://gachat.onrender.com/kibbles/${localStorage.getItem('userId')}`)
        .then(res => res.json())
        .then(data => {
            setKibbles(data.kibbles);
        });
    }, []);

    const buySummon = (yo) => {
        fetch(`https://gachat.onrender.com/buysummon/${yo}/${localStorage.getItem('userId')}`);
    }
    return (
        <div className="shop">
            <ShopItem name='Invocation' img='/abonnement.png' price='100' click={() =>buySummon('basic')}></ShopItem>
            <ShopItem name='Invocation Rare' img='/abonnement.png' price='150' click={() =>buySummon('rare')}></ShopItem>
            <ShopItem name='Invocation Mythique' img='/abonnement.png' price='300' click={() => buySummon('mythic')}></ShopItem>
            <ShopItem name='Invocation Légendaire' img='/abonnement.png' price='500' click={() =>buySummon('legendary')}></ShopItem>
        </div>
    )
}

export default Shop;