export default function Log({logTurn, nameOfPlayer}){

    return(
        <ol id="log">
            {logTurn.map((eachTurn) => (
                <li key={`${eachTurn.square.row}${eachTurn.square.col}`}>
                {nameOfPlayer[eachTurn.playerSymbol]} selected {eachTurn.square.row},{eachTurn.square.col}
                </li>
            ))}
        </ol>
    );
}