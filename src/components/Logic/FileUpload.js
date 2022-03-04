import React, {useContext, useEffect, useRef, useState} from 'react';    
import { createColorCell, PatternContext } from '../../PatternContext';
import { PatternImage } from '../../classes/ComponentClasses';
import { getImageCellWidth, getCellColors, setPatternCellInfo, getListOfColors, 
        createColorCells, narrowListOfColors, convertRGBtoXYZ, 
        getCellColorsSelectMode, 
        setPatternCellInfoSelectorMode} from './ImageLogic';
import ImageModal from './ImageModal';
import Layers from '../controls/layering/Layers';

// TODO Make it so you don't have to choose a different image every time you want to upload.
// TODO refactor some of this so that some of it shows up in the image modal instead

const FileUpload = () => {  
        const {image, setImage, imagePattern, setImagePattern, patternCells,
                setPatternCells, setPatternImage, patternXLength, colorDifAllow,
                patternYLength, setColorCells, colorCells, setColorDifAllow, 
                setXAlign, setYAlign, xAlign, yAlign, setAllowCountUpdate,
                setActiveColorCell, unusedSymbols, setDoClearHistory, 
                setUnusedSymbols} = useContext(PatternContext);
        const [loadingMessage, setLoadingMessage] = useState("");

        const [uploadMode, setUploadMode] = useState("selector");
        const [showImageModal, setShowImageModal] = useState(false);
        const [isFinishedSelectingColors, setIsFinishedSelectingColors] = useState(false);
        const [useColorDif, setUseColorDif] = useState(true);

        const fileInput = useRef();
        const difInput = useRef();
        const normalModeBtn = useRef();
        const selectorModeBtn = useRef();
        const xAlignInput = useRef();
        const yAlignInput = useRef();
        const colorAllowanceDiv = useRef();
        const canvasDiv = useRef();
        const canvasRef = useRef();
        let ctx;

        const setTheFile = (e) => {    
                if (e.target.files && e.target.files.length !== 0) {
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
                if (colorDifAllow) {
                        difInput.current.value = colorDifAllow;
                } else {
                        difInput.current.value = 10;
                }
                
                xAlignInput.current.value = 'start';
                selectorModeBtn.current.disabled = true;
        }, []);

        useEffect(() => {
                if (image) {
                        
                        // do depending on mode
                        if (uploadMode === "normal") {
                                normalModeSet();
                        } else if (uploadMode === "selector") {
                                setShowImageModal(true);
                        }

                        // clear the file upload
                        fileInput.current.value = null;
                }

        }, [image]);

        useEffect(() => {
                if (isFinishedSelectingColors === true) {
                        setIsFinishedSelectingColors(false);
                        let cellWidth = getImageCellWidth(canvasRef.current.width, 
                                canvasRef.current.height, patternXLength, 
                                patternYLength);
                        let newPatternImage = new PatternImage(
                                cellWidth,
                                patternXLength,
                                patternYLength,
                        );
                        // add all current list symbols back to the unused symbols list
                        let symbolsCopy = [...unusedSymbols];
                        for (let i = 0; i < colorCells.length; i++) {
                                symbolsCopy.push(colorCells[i].symbol);
                        }
                        // now do a function to calculate all the info inside this before setting it
                        ctx = canvasRef.current.getContext("2d");
        
                        let colorData = getCellColorsSelectMode(ctx, cellWidth, 
                                patternXLength, patternYLength, colorDifAllow, 
                                xAlign, yAlign, canvasRef.current.width, 
                                canvasRef.current.height, colorCells, useColorDif);
                        newPatternImage.cellColors = colorData;
                        newPatternImage.listOfColors = [...colorCells];
                        setImagePattern(newPatternImage);
                        setPatternCellInfoSelectorMode(patternCells, setPatternCells, colorData);
                        setLoadingMessage("");
                        setAllowCountUpdate(true);
                        setDoClearHistory(true);
                }
        }, [isFinishedSelectingColors])

        const normalModeSet = () => {
                let cellWidth = getImageCellWidth(canvasRef.current.width, 
                        canvasRef.current.height, patternXLength, 
                        patternYLength);
                let newPatternImage = new PatternImage(
                        cellWidth,
                        patternXLength,
                        patternYLength,
                );
                // add all current list symbols back to the unused symbols list
                let symbolsCopy = [...unusedSymbols];
                for (let i = 0; i < colorCells.length; i++) {
                        symbolsCopy.push(colorCells[i].symbol);
                }
                // now do a function to calculate all the info inside this before setting it
                ctx = canvasRef.current.getContext("2d");

                let colorData = getCellColors(ctx, cellWidth, 
                        patternXLength, patternYLength, colorDifAllow, 
                        xAlign, yAlign, canvasRef.current.width, 
                        canvasRef.current.height, symbolsCopy,
                        setUnusedSymbols, uploadMode, useColorDif);
                let listOfColors = colorData[1];
                let cellColors = colorData[0];
                newPatternImage.cellColors = cellColors;
                newPatternImage.listOfColors = listOfColors;
                setImagePattern(newPatternImage);
                setColorCells(listOfColors);
                setPatternCellInfo(patternCells, setPatternCells, cellColors, listOfColors);
                setLoadingMessage("");
                setAllowCountUpdate(true);
        }

        const clickNormalMode = () => {
                setUploadMode("normal");
                selectorModeBtn.current.disabled = false;
                normalModeBtn.current.disabled = true;
        }

        const clickSelectorMode = () => {
                setUploadMode("selector");
                selectorModeBtn.current.disabled = true;
                normalModeBtn.current.disabled = false;
        }
        

        return (    
                <div style={{display: "flex"}}>
                        <div className="container-fluid">    
                                <h2>File Upload</h2>    
                                {loadingMessage}
                                <br></br>
                                <div style={{display: "flex"}}>
                                        <button ref={normalModeBtn} onClick={clickNormalMode}>Normal Mode</button>
                                        <button ref={selectorModeBtn} onClick={clickSelectorMode}>Selector Mode</button>
                                </div>
                                Color Allowance<input type="number" min={0} max={100} 
                                        ref={difInput} onChange={changeColorAllowance}/>
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
                                <input type="file" ref={fileInput} onChange={setTheFile} />    
                                {/* <button className="btn btn-primary" onClick={submit}>Upload</button>     */}
                                <div ref={canvasDiv}>
                                        <canvas ref={canvasRef}></canvas>
                                </div>   
                                <ImageModal image={image} uploadMode={uploadMode} setIsFinished={setIsFinishedSelectingColors}
                                        showImageModal={showImageModal} setShowImageModal={setShowImageModal} />
                        </div>    
                        <div>
                                <Layers />
                        </div>
                </div>
                
        )    
}    
export default FileUpload;