function Card(props) {
    const url = props.id.toLowerCase();
    const rarity = props.rarity;

    return (
        <div className="card_container">
            <p>{props.id}</p>
            <div className='card'>
                <img className="gif_collec shadow-gif" alt="cat" src={'https://raw.githubusercontent.com/LucasMastrovito/GaChat/main/public/' + url + '.gif'}></img>
            </div>
            <div className="infos shadow">
                <img alt="rarity" src={'/rarity/' + rarity + '.png'} style={{width: '10vw'}} />
                <p>{props.nb}</p>
            </div>
        </div>
    )
}

export default Card;