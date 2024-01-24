export default function Gameboard({onSelectThis, gameBoard}){

    // const [gameBoard, setGameBoard] = useState(initialBoard);
    // function handleUserInput(rowIndex, colIndex){
    //     setGameBoard((previousBoard) => {
    //         const updatedBoard = [...previousBoard.map(innerArray => [...innerArray])]
    //         updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
    //         return updatedBoard;
    //     });
    //     onSelectThis();
    // }


    return(
        <ol id="game-board">
                {gameBoard.map((row, rowIndex) => <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, colIndex) => <li key={colIndex}>
                            <button onClick={() => onSelectThis(rowIndex, colIndex)} disabled={playerSymbol != null}>{playerSymbol}</button>
                        </li>)}
                    </ol>
                </li>)}
            
        </ol>
    )
}