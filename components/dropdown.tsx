
export default function Dropdown({children,label}){
    return(
        <div className="collapse bg-base-200 m-3 w-[95%] ">
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium">
                {label}
            </div>
            <div className="collapse-content"> 
                <p>{children}</p>
            </div>
        </div>
    )
}