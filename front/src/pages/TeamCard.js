function TeamCard(props) {
    const url = props.id.toLowerCase();

    const click = () => {
        props.click(props.id);
    }

    return (
        <div className="card_container" onClick={click}>
            <p>{props.id}</p>
            <div className='card'>
                <img className="gif_collec shadow-gif" alt="cat" src={'https://raw.githubusercontent.com/LucasMastrovito/GaChat/main/public/' + url + '.gif'}></img>
            </div>
            <p>{props.type}</p>
        </div>
    )
}

export default TeamCard;