import React, {useContext, useEffect, useRef, useState} from 'react';    
import { createColorCell, PatternContext } from '../../PatternContext';
import { PatternImage } from '../../classes/ComponentClasses';
import { getImageCellWidth, getCellColors, setPatternCellInfo, getListOfColors, 
        createColorCells, narrowListOfColors, convertRGBtoXYZ } from './ImageLogic';
const FileUpload = () => {  
        const {image, setImage, imagePattern, setImagePattern, patternCells,
                setPatternCells, setPatternImage, patternXLength, colorDifAllow,
                patternYLength, setColorCells, colorCells, setColorDifAllow} 
                = useContext(PatternContext);
        const [loadingMessage, setLoadingMessage] = useState("");
        const difInput = useRef();
        const canvasDiv = useRef();
        const canvasRef = useRef();
        let ctx;

        // test method
        useEffect(() => {
                let color = {
                        r: 55,
                        g: 0,
                        b: 0
                };
                console.log(convertRGBtoXYZ(color));
        }, []);

        const setTheFile = (e) => {    
                setLoadingMessage("loading image...");
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

        const changeColorAllowance = () => {
                setColorDifAllow(difInput.current.value);
        }

        useEffect(() => {
                //canvasDiv.current.style.display = "none";
                canvasDiv.current.style.display = "block";
                ctx = canvasRef.current.getContext("2d");
                difInput.current.value = 30;
        }, []);

        useEffect(() => {
                if (image) {
                        let cellWidth = getImageCellWidth(canvasRef.current.width, 
                                canvasRef.current.height, patternXLength, 
                                patternYLength);
                        let newPatternImage = new PatternImage(
                                cellWidth,
                                patternXLength,
                                patternYLength,
                        );
                        // now do a function to calculate all the info inside this before setting it
                        ctx = canvasRef.current.getContext("2d");
                        let colorData = getCellColors(ctx, cellWidth, 
                                patternXLength, patternYLength, colorDifAllow);
                        let listOfColors = colorData[1];
                        let cellColors = colorData[0];
                        newPatternImage.cellColors = cellColors;
                        newPatternImage.listOfColors = listOfColors;
                        setImagePattern(newPatternImage);
                        setColorCells(listOfColors);
                        setPatternCellInfo(patternCells, setPatternCells, cellColors);
                        setLoadingMessage("");
                }

        }, [image]);

        return (    
                <div className="container-fluid">    
                <h1>File Upload</h1>    
                        {loadingMessage}
                        <br></br>
                        Color Allowance<input type="number" ref={difInput} onChange={changeColorAllowance}/>
                        <br></br>
                        <input type="file" onChange={setTheFile} />    
                        {/* <button className="btn btn-primary" onClick={submit}>Upload</button>     */}
                        <div ref={canvasDiv}>
                                <canvas ref={canvasRef}></canvas>
                        </div>   
                </div>    
        )    
}    
export default FileUpload;