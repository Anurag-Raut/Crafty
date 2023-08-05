

export default function TextResponse({description,answer,image}){
    return (
        <div>

        <label htmlFor="" className="text-lg font-bold ">Description : </label>
                <div className="ml-4">{description}</div>
                {
                image && <div className="my-2">
                <div className='font-bold text-lg'>Image : </div>

                 <img src={image} className='max-h-[40vh]   border-2 p-5' alt={'image not able to load'} />
            </div>
            }
                <label htmlFor="" className="text-lg font-bold ">Answer : </label>
                <div className="ml-4">{answer}</div>
                



        </div>
        
    )
}