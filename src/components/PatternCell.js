import React, { useContext, useEffect, useState } from "react";
import { PatternContext } from "../PatternContext";
import "../styles.css";

const PatternCell = ({cell}) => {

    const {activeColorCell, setActiveColorCell, allowCountUpdate,
        patternCells, setPatternCells, setAllowCountUpdate, colorCells,
        setColorCells, isMouseDown, setIsMouseDown, 
        setDoMakeCopy} = useContext(PatternContext);
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
        let origRefId = cell.refId;
        let newRefId = null;
        let patternCellsCopy = [...patternCells];
            let cellCopy = patternCellsCopy[cell.yPos][cell.xPos];
            if (activeColorCell !== null) {
                cellCopy.fillColor = activeColorCell.fillColor;
                cellCopy.refId = activeColorCell.id;
                cellCopy.symbol = activeColorCell.symbol;
                cellCopy.symbolColor = activeColorCell.symbolColor;
                newRefId = activeColorCell.id;
            } else {
                let newColor = colorCells[0];
                cellCopy.fillColor = newColor.fillColor;
                cellCopy.refId = newColor.id;
                cellCopy.symbol = newColor.symbol;
                newRefId = newColor.id;
            }
            setPatternCells(patternCellsCopy);
            if (origRefId !== newRefId) {
                setAllowCountUpdate(true);
                setDoMakeCopy(true);
            }
    }

    return (
        <div style={{backgroundColor: cell.fillColor, color: cell.symbolColor, 
            pageBreakBefore: "always"}} className={cellClassName} 
            onMouseDown={clickCell} onMouseOver={dragOverCell} 
            onMouseUp={releaseMouse}>
            {cell.symbol}
        </div>
    )
}

export default PatternCell;