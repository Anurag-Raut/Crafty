import { useUser } from "@auth0/nextjs-auth0/client";
import Avatar from "./avatar";

export default function Header(){
    const {user}=useUser();
    return(
        <div className="navbar z-[5] sticky top-0 right-0 left-0 w-full  bg-[#A076F9] flex justify-between rounded-b-lg ">
        <a href="/" className="btn  btn-ghost normal-case text-xl">Crafty</a>
        {
            user?  <Avatar name={user.name} image={user.picture} />:null
        }
      
      </div>
    )
}