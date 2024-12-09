import React, { useState } from "react";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null)); // 3x3 board
  const [isXTurn, setIsXTurn] = useState(true); // Alternates between 'X' and 'O'
  const [winner, setWinner] = useState(null);

  // Check for a winner
  const checkWinner = (board) => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columns
      [0, 4, 8],
      [2, 4, 6], // Diagonals
    ];
    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  // Handle a player's move
  const handleClick = (index) => {
    if (board[index] || winner) return; // Prevent overwriting or playing after win
    const newBoard = [...board];  //copy of the board
    newBoard[index] = isXTurn ? "X" : "O";
    setBoard(newBoard);
    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    } else {
      setIsXTurn(!isXTurn); // Switch turns
    }
  };

  // Reset the game
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
    setWinner(null);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#ecf0f3] text-gray-800">
      {/* Neumorphic Container */}
      <div
        className="w-[90%] max-w-[400px] p-6 bg-[#ecf0f3] rounded-[20px] shadow-lg 
                   shadow-[#ffffff]  hover:shadow-[10px_10px_20px_#bebebe,_-10px_-10px_20px_#ffffff] 
                   transition-all text-center"
      >
        <h1 className="text-3xl font-semibold mb-4">Tic Tac Toe</h1>

        <div className="grid grid-cols-3 gap-3">
          {board.map((value, index) => (
            <div
              key={index}
              onClick={() => handleClick(index)}
              className={`flex items-center justify-center h-[80px] w-[80px] bg-[#ecf0f3] rounded-lg 
                          shadow-[inset_2px_2px_5px_#bebebe,inset_-2px_-2px_5px_#ffffff] 
                          cursor-pointer text-2xl font-bold ${
                            value === "X" ? "text-blue-500" : "text-red-500"
                          }`}
            >
              {value}
            </div>
          ))}
        </div>

        {winner && (
          <p className="mt-4 text-lg">
            🎉 Winner: <span className="font-bold">{winner}</span> 🎉
          </p>
        )}
        {!winner && !board.includes(null) && (
          <p className="mt-4 text-lg">It's a Draw! 🤝</p>
        )}

        <button
          onClick={resetGame}
          className="mt-6 px-4 py-2 bg-[#ecf0f3] rounded-lg shadow-[2px_2px_5px_#bebebe,-2px_-2px_5px_#ffffff] 
                     text-blue-500 font-semibold hover:shadow-[4px_4px_10px_#bebebe,-4px_-4px_10px_#ffffff] 
                     transition-shadow"
        >
          Reset Game
        </button>
      </div>
    </div>
  );
};

export default TicTacToe;
