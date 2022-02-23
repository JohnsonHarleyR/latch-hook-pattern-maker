import React, {useState} from 'react';    
import { post } from 'axios';    
const FileUpload = () => {  
        const [file, setFile] = useState({file: ''});
        
        const submit = async (e) => {    
                e.preventDefault();    
                const url = `http://localhost:61331/api/Uploadfiles/Uploadfile`;    
                const formData = new FormData();    
                formData.append('body', file);    
                const config = {    
                        headers: {    
                                'content-type': 'multipart/form-data',    
                        },    
                };    
                return post(url, formData, config);    
        }    

        const setTheFile = (e) => {    
                console.log(e.target.files[0]);
                setFile({ file: e.target.files[0] });    
        }  

        return (    
            <div className="container-fluid">    
                    <form onSubmit={e => this.submit(e)}>    
                            <div className="col-sm-12 btn btn-primary">       
                    </div>    
                            <h1>File Upload</h1>    
                            <input type="file" onChange={setTheFile} />    
                            <button className="btn btn-primary" onClick={submit}>Upload</button>    
                    </form>    
            </div>    
    )    
}    
export default FileUpload;