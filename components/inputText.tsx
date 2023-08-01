export default function InputText({label,onChange,placeholder}:any){
    return (
        <div className="mb-6">
            <label htmlFor="default-input" className="block mb-2 text-sm font-medium text-gray-600 ">{label}</label>
            <input onChange={onChange} placeholder={placeholder} type="text" id="default-input" className="bg-base-100 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   " />
        </div>
    )
}