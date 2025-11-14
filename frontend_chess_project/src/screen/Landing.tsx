import { useNavigate } from "react-router-dom"
import { Button } from "../components/Button"

export function Landing()
{
    const navigate=useNavigate()
    return(
         <div className="pt-2">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 ">
               <div className="flex justify-center">
                 <img className="max-w-96" src={"/chess.png"} alt="chess.com" />
               </div>

            <div>
                <div className="text-4xl font-bold ">
                        play chess online on the #3 site 
                        <div className="mt-4">
                               <Button onClick={()=>{
                                navigate("/game")
                               }}>play game</Button>
                        </div>
                </div>

            </div>

          </div>
        </div>
    )
}