import React, {useContext, useEffect, useRef, useState} from 'react';    
import { PatternContext } from '../../PatternContext';
import { post } from 'axios';    
const FileUpload = () => {  
        const {image, setImage} = useContext(PatternContext);
        const canvasDiv = useRef();
        const canvasRef = useRef();
        let ctx;

        const submit = async (e) => {    
                console.log('upload');   
        }    

        const setTheFile = (e) => {    
                ctx = canvasRef.current.getContext("2d");
                let reader = new FileReader();
                reader.onload = (event) => {
                        let img = new Image();
                        img.onload = () => {
                                canvasRef.current.width = img.width;
                                canvasRef.current.height = img.height;
                                ctx.drawImage(img,0,0);
                                setImage(img);
                        }
                        img.src = event.target.result;
                }
                reader.readAsDataURL(e.target.files[0]);  
        }

        useEffect(() => {
                //canvasDiv.current.style.display = "none";
                canvasDiv.current.style.display = "block";
                ctx = canvasRef.current.getContext("2d");
        }, []);

        return (    
                <div className="container-fluid">    
                <h1>File Upload</h1>    
                        <input type="file" onChange={setTheFile} />    
                        <button className="btn btn-primary" onClick={submit}>Upload</button>    
                        <div ref={canvasDiv}>
                                <canvas ref={canvasRef}></canvas>
                        </div>   
                </div>    
        )    
}    
export default FileUpload;