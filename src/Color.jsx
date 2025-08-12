import "./Game.css";

function Color(props) {
    //console.log(props)
    const styles = {
        backgroundColor: props.color,
        opacity: props.isHeld && 0.5
    }
    
    return <button className="color-btn" style={styles} onClick={props.hold} />;
}

export default Color;