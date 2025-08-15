import ShopItem from "./ShopItem";
import './Shop.scss';

function Shop(props) {

    const buySummon = (type) => {
        if (type === 'basic' && props.kibbles >= 100) {
            props.setKibbles(props.kibbles - 100);
        } else if (type === 'rare' && props.kibbles >= 150) {
            props.setKibbles(props.kibbles - 150);
        } else if (type === 'mythic' && props.kibbles >= 300) {
            props.setKibbles(props.kibbles - 300);
        } else if (type === 'legendary' && props.kibbles >= 500) {
            props.setKibbles(props.kibbles - 500);
        }
        fetch(`https://gachat.onrender.com/buysummon/${type}/${localStorage.getItem('userId')}`);
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