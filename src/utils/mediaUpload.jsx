import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
        "https://bhuhgxhxpjdrxmmhabyc.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJodWhneGh4cGpkcnhtbWhhYnljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwMDE2MjUsImV4cCI6MjA4NzU3NzYyNX0._l20WlzOQMMiygb4sLkWvB4RR4fuxPZw83gSPaYdjgQ"
    );
export default function mediaUpload(file) {
    const promise = new Promise(
        (resolve, reject) => {
            if(file == null){
                reject("No file selected");
            }   
            const timeStamp = new Date().getTime()
            const newFileName = timeStamp + file.name

            supabase.storage.from("images").upload(newFileName, file, {
                cacheControl: "3600",
                upsert: false,
            }).then(() => {
                const url = supabase.storage.from("images").getPublicUrl(newFileName).data.publicUrl
                resolve(url)
            }).catch((error) => {
                console.log(error)
                reject("File upload failed")
            });
        })
    return promise

}

