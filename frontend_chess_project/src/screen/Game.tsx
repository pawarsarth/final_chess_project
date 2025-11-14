import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Chessboard } from "../components/Chessboard";
import { useSocket } from "../hooks/useSockets";
import { Chess } from "chess.js";

export function Game ()
{
    const socket=useSocket()
    const [chess,setChess]=useState(new Chess())
    const [board,setBoard]=useState(chess.board())

    useEffect(()=>{
        if(!socket)return ;

        socket.onmessage=(event)=>{
            const message =JSON.parse(event.data)
            switch(message.type)
            {
                case "Init_game":
                    
                    setBoard(chess.board())
                    console.log("game inittialized")
                    break;
                case "move":
                    const move=message.payload
                    chess.move(move)
                    setBoard(chess.board())
                    console.log("move made")    
                    break 
                case "game_over":
                    console.log("game over ")    
                    break 
            }
        }

    },[socket])

    if(!socket) return <div>loading.....</div>

    return (
      <div className="flex justify-center">
        <div className=" pt-8 max-w-5xl">
            <div className="grid grid-col-1 gap-4 md:grid-cols-2">
                <div>
                    <Chessboard socket={socket} board={board}></Chessboard>
                </div>
                <div className="col-span-2 bg-green-200 w-full flex justify-center  ">
                    <div className="pt-8">
                  <Button onClick={()=>{
                            socket.send(JSON.stringify({
                                type:"Init_game"
                            }))
                  }}>play</Button>
                  </div>
                </div>

            </div>

        </div>
      </div>
    )
}