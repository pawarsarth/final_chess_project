import { useEffect, useState } from "react";

const URL="ws://localhost:8080"

export function useSocket()
{
        const [socket,setSocket]=useState<WebSocket|null>(null)

        useEffect(()=>{
                const ws=new WebSocket(URL)
                ws.onopen=()=>{
                    console.log("connect")
                    setSocket(ws)
                }
                ws.onclose=()=>{
                    console.log("disconnect")
                    setSocket(ws)
                }
                return ()=>{
                    ws.close()
                }

        },[])
        return socket
}