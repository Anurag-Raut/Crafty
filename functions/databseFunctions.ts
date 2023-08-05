


import {connectToDatabase} from '@/db';
async function submit(document,userId){


    const questions=[]
    async function save (){
        try {
            let res = await fetch("http://localhost:3000/api/post", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body:JSON.stringify({document,userId:userId})
              });
              let allPosts = await res.json();
        
            console.log('New question array saved successfully.',allPosts);
          } catch (error) {
            console.error('Error saving new question array:', error);
          }
      
    }
    save()

    // await questions.save()




}


export {submit}