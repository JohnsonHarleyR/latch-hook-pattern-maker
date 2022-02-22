import React, { useContext, useEffect, useState } from "react";
import { PatternContext } from "../PatternContext";
import "../styles.css";

const ColorCell = ({cell}) => {

    const {activeColorCell, setActiveColorCell, 
        patternCells, setPatternCells, 
        isMouseDown, setIsMouseDown} = useContext(PatternContext);
    const [isSelected, setIsSelected] = useState(false);
    const [cellClassName, setCellClassName] = useState(cell.className);


    const selectCell = () => {
        if (isSelected) {
            setActiveColorCell(null);
        } else {
            setActiveColorCell(cell);
        }
    }

    const clickCell = () => {
        selectCell();
    }

    useEffect(() => {
        if (activeColorCell !== undefined && 
            activeColorCell !== null && 
            activeColorCell.id === cell.id) {
            setIsSelected(true);
        } else {
            setIsSelected(false);
        }
    }, [activeColorCell]);

    useEffect(() => {
        if (isSelected) {
            setCellClassName(`${cell.className} selected`);
        } else {
            setCellClassName(cell.className);
        }
    }, [isSelected]);

    return (
        <div style={{backgroundColor: cell.fillColor}} className={cellClassName} 
            onMouseDown={clickCell}>
            {cell.symbol}
        </div>
    )
}

export default ColorCell;