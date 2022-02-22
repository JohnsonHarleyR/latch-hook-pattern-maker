import React, { useContext, useEffect, useState } from "react";
import { PatternContext } from "../PatternContext";
import "../styles.css";

const PatternCell = ({cell}) => {

    const {activeColorCell, setActiveColorCell, 
        patternCells, setPatternCells, 
        isMouseDown, setIsMouseDown} = useContext(PatternContext);
    const [cellClassName, setCellClassName] = useState(cell.className);

    const clickCell = () => {
        setIsMouseDown(true);
        changeColor();
    }

    const dragOverCell = () => {
        if (isMouseDown) {
            changeColor();
        }
    }

    const releaseMouse = () => {
        setIsMouseDown(false);
    }

    const changeColor = () => {
        
        let patternCellsCopy = [...patternCells];
            let cellCopy = patternCellsCopy[cell.yPos][cell.xPos];
            if (activeColorCell !== null) {
                cellCopy.fillColor = activeColorCell.fillColor;
            } else {
                cellCopy.fillColor = "#fff";
            }
            setPatternCells(patternCellsCopy);
    }

    return (
        <div style={{backgroundColor: cell.fillColor}} className={cellClassName} 
            onMouseDown={clickCell} onMouseOver={dragOverCell} 
            onMouseUp={releaseMouse}>
            {cell.symbol}
        </div>
    )
}

export default PatternCell;