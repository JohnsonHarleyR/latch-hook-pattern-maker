import React, { useContext, useEffect, useState } from 'react';
import "../../styles.css";
import { PatternContext, createCell } from '../../PatternContext';
import PatternCell from '../PatternCell';

const PatternCanvas = () => {
    const {patternCells, setPatternCells, colorCells} = useContext(PatternContext);
    const [canvasDisplay, setCanvasDisplay] = useState([]);

    const createCanvas = () => {
        if (patternCells !== undefined && 
            patternCells !== null) {
                let newCanvasDisplay = [];
                for (let y = 0; y < patternCells.length; y++) {
                    let yRow = patternCells[y];
                    let newYDisplayRow = [];
//                    newYDisplayRow.push(<div className="yRow"></div>)
                    for (let x = 0; x < yRow.length; x++) {
                        let cell = yRow[x];
                        newYDisplayRow.push(<PatternCell key={cell.id} cell={cell}/>);
                    }
                    newCanvasDisplay.push(<div className="x-row" key={`r-${y}`}>{newYDisplayRow}</div>);
                }
                setCanvasDisplay(newCanvasDisplay);
        }
    }

    useEffect(() => {
        if (colorCells && patternCells) {
            let allRefs = [];
            colorCells.forEach(cell => {
                allRefs.push(cell.id);
            });
            let cellsCopy = [...patternCells];
            for (let y = 0; y < cellsCopy.length; y++) {
                let yCopy = cellsCopy[y];
                for (let x = 0; x < yCopy.length; x++) {
                    let cell = cellsCopy[y][x];
                    let refId = null;
                    if (allRefs.includes(cell.refId)) {
                        refId = cell.refId;
                    }
                    if (refId === null) {
                        cellsCopy[y][x] = createCell("pattern", "#fff", "", x, y, null);
                    } else {
                        // figure out the new color and symbol for the cell
                        let newColor = null;
                        //let newSymbol = null;
                        colorCells.forEach(cCell => {
                            if (cCell.id === refId) {
                                newColor = cCell.fillColor;
                                //newSymbol = cCell.symbol;
                            }
                        });
                        //if (newColor !== null && newSymbol !== null) {
                        if (newColor !== null) {
                            cellsCopy[y][x].fillColor = newColor;
                            //cellsCopy[y][x].symbol = symbol;
                        }
                    }
                }
            }
            setPatternCells(cellsCopy);
        }
    }, [colorCells]);

    useEffect(() => {
        createCanvas();
    }, [patternCells]);

    return(
        <div>
            {canvasDisplay}
        </div>
    );
}

export default PatternCanvas;