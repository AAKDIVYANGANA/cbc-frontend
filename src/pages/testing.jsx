
import { useState } from "react";
import { toast } from "react-hot-toast"; 
import mediaUpload from "../utils/mediaUpload";

export default function Testing() {
    const [file, setFile] = useState(null);
    

    function handleUpload() {
        mediaUpload(file).then((url) => {
            console.log("File uploaded successfully. URL:", url);
            toast.success("File uploaded successfully");
        }).catch((error) => {
            console.log(error);
            toast.error("File upload failed")
    }) }

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center">
            <input type="file" onChange={
                (e) => {
                    console.log(e.target.files[0]);
                    setFile(e.target.files[0]); 
                }
            } />
            <button onClick={handleUpload} className="w-[200px] h-[50px] bg-green-500 text-white rounded-lg p-[10px] hover:bg-green-600">
                Upload
            </button>
        </div>
    );
}