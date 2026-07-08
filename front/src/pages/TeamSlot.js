function TeamSlot(props) {
    const url = props.id.toLowerCase() === '' ? 'blank.png' : props.id.toLowerCase() + '.gif';

    const click = () => {
        props.click(props.slot);
    }
    return (
        <div className="card_container" onClick={click}>
            <p>{props.id}</p>
            <div className='card'>
                <img className="gif_collec shadow-gif" style={{borderColor: props.active ? 'red' : '#293132'}} alt="cat" src={'https://raw.githubusercontent.com/LucasMastrovito/GaChat/main/public/' + url}></img>
            </div>
        </div>
    )
}

export default TeamSlot;