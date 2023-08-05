
import dotenv from 'dotenv'
dotenv.config({path:'../.env.loc'})
const { Web3Storage  ,getFilesFromPath ,File } = require('web3.storage');
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDY2MmMzMzA3OTkxRmM0Nzg0NzNmMmMwMDFmNzBCMGFFQTE2ZjM0NzEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzczNDIxNDI0NTAsIm5hbWUiOiJzdG9yZTIifQ.K2OCaGVt86PlyD7Tyq71NMCrxwuxK9xmflbYNe0_cIo";

const web3Client = new Web3Storage({token:token});

async function UploadToIPFS(files){
    console.log(files[0].name,'hellll')
  


 
   
  
    const cid = await web3Client.put(files) 
    return 'https://'+cid+'.ipfs.w3s.link/'+files[0].name;  

}

export{UploadToIPFS}