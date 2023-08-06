import { useUser } from "@auth0/nextjs-auth0/client"
import Link from "next/link";
import { useRouter } from "next/router";

export default function Avatar({image,name}){
    const {user}=useUser();
    const router = useRouter();
   
     

console.log(image,'image')
    return(
        <Link href={"/api/auth/logout"} className="avatar flex items-start h-10 ">
            <div className="font-bold mr-2"> {name}</div>
            
            <div className="w-10 rounded-full">
              
                <img src={image} />
            </div>
        </Link>
    )

}