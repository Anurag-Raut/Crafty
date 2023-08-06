import { UploadToIPFS } from "@/functions/upload"
import { useState } from "react";
import Uploaded from "../../public/uploaded.json";
import Lottie from "lottie-react";
export default function ImageUpload({fileUrl,setFileUrl}){
    const [currFile,setCurrFile]=useState(null);
    const [loading,setLoading]=useState(false);
    
    const handleUpload=async()=>{
        setLoading(true);
        const link=await UploadToIPFS(currFile);
        console.log(link,'linlll')
        setFileUrl(link);
        setLoading(false);

    }

    return(
        <div className="my-4">
            <div>Select a File</div>
            <div className="flex justify-between items-center">
            <input onChange={(e)=>{setCurrFile(e.target.files);setFileUrl(null)}} type="file" className="file-input file-input-bordered scale-85 w-full max-w-xs" />
            
            {
                loading?
                <span className="loading loading-spinner loading-lg"></span>
                :
                fileUrl?
                <div>
                  <Lottie animationData={Uploaded} className="w-[60px] mr-3" loop={false} />
                </div>
                :
                <button onClick={handleUpload} className="btn">Upload</button>

            }

            </div>
          
        </div>
    )

}