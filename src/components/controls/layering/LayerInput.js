import React, { useContext, useEffect, useRef, useState } from 'react';
import { createColorCell } from '../../../PatternContext';
import { PatternContext } from '../../../PatternContext';

const LayerInput = () => {

    const {patternCells, setPatternCells,
        colorCells, setColorCells} = useContext(PatternContext);

    const input = useRef();
    const [fileContent, setFileContent] = useState(null);
    const [uploadMessage, setUploadMessage] = useState("");

    const readFile = (e) => {
        try {
            setUploadMessage("Reading file...");
            let fileReader = new FileReader();
            fileReader.onload = () => {
                setFileContent(fileReader.result);
            }
            fileReader.readAsText(e.target.files[0]);

        } catch (error) {
            setUploadMessage("Error: Could not read file.");
        }
    }

    const setTemp = () => {
        if (fileContent != null) {
            try {
                let newContent = JSON.parse(fileContent);
                let newColorCells = newContent.color;
                let newPatternCells = newContent.pattern;
                let oldAndNewIds = [];

                // add colors to color cells
                let newIdIndex = colorCells.length;
                let colorCellsCopy = [...colorCells];
                newColorCells.forEach(cell => {
                    let oldId = cell.id;
                    let newId = `c${newIdIndex}`;
                    cell.id = newId;
                    colorCellsCopy.push(cell);
                    oldAndNewIds.push({
                        oldId: oldId,
                        newId: newId
                    });
                    newIdIndex++;
                });
                setColorCells(colorCellsCopy);

                // now change pattern cells - loop through patterns
                // figure out max width and height for iteration - in case layers aren't same size
                let shortestYLength;
                if (patternCells.length > newPatternCells.length) {
                    shortestYLength = newPatternCells.length;
                } else {
                    shortestYLength = patternCells.length;
                }

                let shortestXLength;
                if (patternCells[0].length > newPatternCells[0].length) {
                    shortestXLength = newPatternCells[0].length;
                } else {
                    shortestXLength = patternCells[0].length;
                }

                let patternCellsCopy = [...patternCells];
                for (let y = 0; y < shortestYLength; y++) {
                    for (let x = 0; x < shortestXLength; x++) {
                        // check if new pattern cell is null
                        // if not, then make changes
                        if (newPatternCells[y][x] !== null) {
                            // figure out new refId
                            let newRefId = null;
                            for (let i = 0; i < oldAndNewIds.length; i++) {
                                if (newPatternCells[y][x].refId === oldAndNewIds[i].oldId) {
                                    newRefId = oldAndNewIds[i].newId;
                                    break;
                                }
                            }

                            // now set that cell to new cell data
                            patternCellsCopy[y][x].fillColor = newPatternCells[y][x].fillColor;
                            patternCellsCopy[y][x].refId = newRefId;
                            patternCellsCopy[y][x].symbol = newPatternCells[y][x].symbol;
                            patternCellsCopy[y][x].symbolColor = newPatternCells[y][x].symbolColor;
                        }
                    }
                }

                // now set the pattern cells
                setPatternCells(patternCellsCopy);
    
            } catch (error) {
                setUploadMessage("Error: The format is invalid.");
            }
        }

    }

    const eraseContent = () => {
        input.current.value = "";
        setFileContent(null);
    }

    useEffect(() => {
        if (fileContent != null) {
            setTemp();
            // try {
            //     setUploadMessage("Parsing file...");
    
            //     let answerArray = fileContent.split("\n");
            //     if (answerArray.length != 0) {
            //         resetRounds();
            //         tempArray = answerArray;
            //         //setTempArray(answerArray);
            //         tempIndex = 0;
            //         //setTempIndex(0);
            //         getWordleGuesses(answerArray[0], setTemp, 
            //             checkWordleCommon);
            //     } else {
            //         setUploadMessage("No input in files...");
            //     }
    
            // } catch (error) {
            //     setUploadMessage("Error: The text format is invalid.");
            // }
        }
    }, [fileContent]);

    const loadFile = () => {
        eraseContent();
        input.current.click();
    }

    return(
        <div>
            Upload JSON Layer
            <input type="file" id="layerInput" ref={input} onChange={readFile}/>
            <br></br>
            {uploadMessage}
        </div>
    );
}

export default LayerInput;