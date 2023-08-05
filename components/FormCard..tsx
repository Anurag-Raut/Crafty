import Link from "next/link";

export default function FormCard({name,href,onClick}:{name:string,href?:string,onClick?:any}){

        return (
            <>
            {
                href?
                <Link href={href} className="card w-fit h-fit p-7 bg-base-100 shadow-xl">
          
                <div className="card-body h-fit">
                  <h2 className="card-title text-2xl">{name}</h2>
    
                  
                </div>
              </Link>:
               <div onClick={onClick} className=" cursor-pointer card w-fit h-fit p-7 bg-base-100 shadow-xl">
          
               <div className="card-body h-fit">
                 <h2 className="card-title text-2xl">{name}</h2>
   
                 
               </div>
             </div>
            }
            </>
           
        )

}