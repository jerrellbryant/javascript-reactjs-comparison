
 function Button(props) {
    return (
    <>
      <button onClick={props.start}>Start Game</button>
      <button onClick={props.newCard}>New Card</button>
    </>
    )
}

function ResetButton(props) {
    return (
        <>
            <button onClick={props.reset}>Reset Game</button>
        </>
        )
}

export {Button, ResetButton}