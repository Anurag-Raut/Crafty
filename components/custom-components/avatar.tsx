
export default function Avatar({image,name}){
console.log(image,'image')
    return(
        <div className="avatar flex items-start h-10 ">
            <div className="font-bold mr-2"> {name}</div>
            
            <div className="w-10 rounded-full">
              
                <img src={image} />
            </div>
        </div>
    )

}