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
        console.log(kibbles)
        fetch(`https://gachat.onrender.com/buysummon/3`)
        if (kibbles >= 100) {
            fetch(`https://gachat.onrender.com/buysummon/${localStorage.getItem('userId')}`)
        }
    }
    return (
        <div className="shop">
            <ShopItem name='Invocation' img='/abonnement.png' price='100' click={buySummon('a')}></ShopItem>
            <ShopItem name='Invocation Rare' img='/abonnement.png' price='150' click={buySummon('b')}></ShopItem>
            <ShopItem name='Invocation Mythique' img='/abonnement.png' price='300' click={buySummon}></ShopItem>
            <ShopItem name='Invocation Légendaire' img='/abonnement.png' price='500' click={buySummon}></ShopItem>
        </div>
    )
}

export default Shop;