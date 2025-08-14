function ShopItem(props) {
    return (
        <div className="shop-item" onClick={props.click}>
            <h2 style={{fontSize: 'large', marginTop: '1vh', height: '25%'}}>{props.name}</h2>
            <img className="shop-img" alt="img" src={props.img} />
            <div className="price">
                <h3>{props.price}</h3>
                <img className="kibbles-pic" alt="price" src="/kibbles.png" />
            </div>
        </div>
    )
}

export default ShopItem;