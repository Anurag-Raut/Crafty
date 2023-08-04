

export default function TextArea({ placeholder, onChange, value,label }) {

    return (
        <div className="mt-2">
            <label className="font-bold text-lg" >{label}</label>
            <textarea value={value} placeholder={placeholder} onChange={onChange} className="textarea textarea-bordered textarea-md w-full " ></textarea>
        </div>


    )

}