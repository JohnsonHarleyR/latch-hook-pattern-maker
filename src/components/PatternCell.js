import React, { useContext, useEffect, useState } from "react";
import { PatternContext } from "../PatternContext";
import "../styles.css";

const PatternCell = ({cell}) => {

    const {activeColorCell, setActiveColorCell, allowCountUpdate,
        patternCells, setPatternCells, setAllowCountUpdate, colorCells,
        setColorCells, isMouseDown, setIsMouseDown} = useContext(PatternContext);
    const [cellClassName, setCellClassName] = useState(cell.className);

    const clickCell = () => {
        setIsMouseDown(true);
        changeColorAndSymbol();
    }

    const dragOverCell = () => {
        if (isMouseDown) {
            changeColorAndSymbol();
        }
    }

    const releaseMouse = () => {
        setIsMouseDown(false);
    }

    const changeColorAndSymbol = () => {
        let origColor = cell.fillColor;
        let newColor = null;
        let patternCellsCopy = [...patternCells];
            let cellCopy = patternCellsCopy[cell.yPos][cell.xPos];
            if (activeColorCell !== null) {
                cellCopy.fillColor = activeColorCell.fillColor;
                cellCopy.refId = activeColorCell.id;
                cellCopy.symbol = activeColorCell.symbol;
                cellCopy.symbolColor = activeColorCell.symbolColor;
                newColor = activeColorCell.fillColor;
            } else {
                let newColor = colorCells[0];
                cellCopy.fillColor = newColor.fillColor;
                cellCopy.refId = newColor.id;
                cellCopy.symbol = newColor.symbol;
            }
            setPatternCells(patternCellsCopy);
            if (origColor !== newColor) {
                setAllowCountUpdate(true);
            }
    }

    return (
        <div style={{backgroundColor: cell.fillColor, color: cell.symbolColor}} className={cellClassName} 
            onMouseDown={clickCell} onMouseOver={dragOverCell} 
            onMouseUp={releaseMouse}>
            {cell.symbol}
        </div>
    )
}

export default PatternCell;