import { Chess } from "chess.js";
import type WebSocket from "ws";

export class Game {
  public player1: WebSocket;
  public player2: WebSocket;
  public board: Chess;
  private startTime: Date;

  constructor(player1: WebSocket, player2: WebSocket) {
    this.player1 = player1;
    this.player2 = player2;
    this.board = new Chess();
    this.startTime = new Date();

    // Initial color assignment
    this.player1.send(
      JSON.stringify({
        type: "gameinit",
        payload: { color: "white" },
      })
    );

    this.player2.send(
      JSON.stringify({
        type: "gameinit",
        payload: { color: "black" },
      })
    );
  }

  makeMove(socket: WebSocket, move: { from: string; to: string }) {
    try {
      const result = this.board.move(move);

      if (!result) {
        console.log("Invalid move!", move);
        return;
      }

      // Check for game over
      if (this.board.isGameOver()) {
        const winner = this.board.turn() === "w" ? "black" : "white";

        this.player1.send(
          JSON.stringify({
            type: "game_over",
            payload: { winner },
          })
        );

        this.player2.send(
          JSON.stringify({
            type: "game_over",
            payload: { winner },
          })
        );
        return;
      }

      // Notify BOTH players (keeps clients in sync)
      const payload = {
        type: "move",
        payload: move,
      };

      this.player1.send(JSON.stringify(payload));
      this.player2.send(JSON.stringify(payload));

    } catch (e) {
      console.log("Error in move:", e);
    }
  }
}
