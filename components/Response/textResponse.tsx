

export default function TextResponse({description,answer}){
    return (
        <div>

        <label htmlFor="" className="text-lg font-bold ">Description : </label>
                <div className="ml-4">{description}</div>
                <label htmlFor="" className="text-lg font-bold ">Answer : </label>
                <div className="ml-4">{answer}</div>
                



        </div>
        
    )
}