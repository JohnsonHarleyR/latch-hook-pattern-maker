import React, {useContext, useEffect, useRef, useState} from 'react';    
import { createColorCell, PatternContext } from '../../PatternContext';
import { PatternImage } from '../../classes/ComponentClasses';
import { getImageCellWidth, getCellColors, setPatternCellInfo, getListOfColors, 
        createColorCells, narrowListOfColors, convertRGBtoXYZ } from './ImageLogic';

// TODO Make it so you don't have to choose a different image every time you want to upload.

const FileUpload = () => {  
        const {image, setImage, imagePattern, setImagePattern, patternCells,
                setPatternCells, setPatternImage, patternXLength, colorDifAllow,
                patternYLength, setColorCells, colorCells, setColorDifAllow, 
                setXAlign, setYAlign, xAlign, yAlign, setAllowCountUpdate,
                setActiveColorCell} = useContext(PatternContext);
        const [loadingMessage, setLoadingMessage] = useState("");
        const difInput = useRef();
        const xAlignInput = useRef();
        const yAlignInput = useRef();
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
                setActiveColorCell(null);
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

        const changeXAlign = () => {
                setXAlign(xAlignInput.current.value);
        }

        const changeYAlign = () => {
                setYAlign(yAlignInput.current.value);
        }

        useEffect(() => {
                canvasDiv.current.style.display = "none";
                //canvasDiv.current.style.display = "block";
                ctx = canvasRef.current.getContext("2d");
                difInput.current.value = 30;
                xAlignInput.current.value = 'start';
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
                                patternXLength, patternYLength, colorDifAllow, 
                                xAlign, yAlign, canvasRef.current.width, 
                                canvasRef.current.height);
                        let listOfColors = colorData[1];
                        let cellColors = colorData[0];
                        newPatternImage.cellColors = cellColors;
                        newPatternImage.listOfColors = listOfColors;
                        setImagePattern(newPatternImage);
                        setColorCells(listOfColors);
                        setPatternCellInfo(patternCells, setPatternCells, cellColors);
                        setLoadingMessage("");
                        setAllowCountUpdate(true);
                }

        }, [image]);

        return (    
                <div className="container-fluid">    
                <h2>File Upload</h2>    
                        {loadingMessage}
                        <br></br>
                        XAlign: 
                        <select ref={xAlignInput} onChange={changeXAlign}>
                                <option value="start">start</option>
                                <option value="center">center</option>
                                <option value="end">end</option>
                        </select>
                        YAlign: 
                        <select ref={yAlignInput} onChange={changeYAlign}>
                                <option value="start">start</option>
                                <option value="center">center</option>
                                <option value="end">end</option>
                        </select>
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