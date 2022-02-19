export default function Results(props) {
    return (
        <div className="container"> 
            <h3>Calculation Results</h3>
            <p> Average is: <span>{props.average}</span></p>
            <p> Median is: <span>{props.median}</span></p>
        </div>

    )
}