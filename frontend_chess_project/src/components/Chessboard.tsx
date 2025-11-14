import type { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";

const PIECES: Record<Color, Record<PieceSymbol, string>> = {
  w: {
    p: "♙",
    r: "♖",
    n: "♘",
    b: "♗",
    q: "♕",
    k: "♔",
  },
  b: {
    p: "♟",
    r: "♜",
    n: "♞",
    b: "♝",
    q: "♛",
    k: "♚",
  },
};

export function Chessboard({
  board,
  socket
}: {
  board: (
    | {
        square: Square;
        type: PieceSymbol;
        color: Color;
      }
    | null
  )[][];
  socket: WebSocket;
}) {
  const [from, setFrom] = useState<null | Square>(null);

  function handleClick(i: number, j: number) {
    const file = "abcdefgh"[j];
    const rank = 8 - i;
    const sq = (file + rank) as Square;

    if (!from) {
      setFrom(sq);
      return;
    }

    socket.send(
      JSON.stringify({
        type: "move",
        move: {
          from,
          to: sq
        }
      })
    );

    setFrom(null);
  }

  return (
    <div className="text-black p-3">
      {board.map((row, i) => {
        return (
          <div key={i} className="flex">
            {row.map((square, j) => {
              const bg =
                (i + j) % 2 === 0 ? "bg-green-500" : "bg-green-700";

              const file = "abcdefgh"[j];
              const rank = 8 - i;
              const sq = (file + rank) as Square;
              const isSelected = from === sq;

              return (
                <div    
                  key={j}
                  onClick={() => handleClick(i, j)}
                  className={`w-12 h-12 flex items-center justify-center text-2xl cursor-pointer
                    ${bg}
                    ${isSelected ? "outline outline-4 outline-yellow-400" : ""}
                  `}
                >
                  {square ? (
                    <span
                      className={`${
                        square.color === "w" ? "text-black" : "text-black"
                      }`}
                    >
                      {PIECES[square.color][square.type]}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
