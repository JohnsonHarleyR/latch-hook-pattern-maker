import React, { useContext, useEffect, useState } from "react";
import { PatternContext } from "../PatternContext";
import "../styles.css";

const ColorCell = ({cell}) => {

    const {activeColorCell, setActiveColorCell, comboColorCells,
        patternCells, setPatternCells, selectMode, setComboColorCells,
        isMouseDown, setIsMouseDown, colorCells, 
        setColorCells} = useContext(PatternContext);
    const [isSelected, setIsSelected] = useState(false);
    const [isMainSelect, setIsMainSelect] = useState(false);
    const [cellClassName, setCellClassName] = useState(cell.className);


    const selectCell = () => {
        if (selectMode === 'add') {
            if (isSelected) {
                setActiveColorCell(null);
            } else {
                setActiveColorCell(cell);
            }
        } else { // if the mode is combining color cells
            if (isSelected && isMainSelect) { // if it's the first cell selected - deselect everything
                setActiveColorCell(null);
                setIsMainSelect(false);
                setIsSelected(false);
                setComboColorCells([]);
            } else if (isSelected) { // one of the combo cells, not first selected - deselect
                let comboCopy = [...comboColorCells];
                let removeIndex = null;
                for (let i = 0; i < comboCopy.length; i++) {
                    if (comboCopy[i].id === cell.id) {
                        removeIndex = i;
                        break;
                    }
                }
                if (removeIndex !== null) {
                    comboCopy.splice(removeIndex, 1);
                }
                setComboColorCells(comboCopy);
                setIsSelected(false);
            } else if (activeColorCell === null) { // selecting with no active color - make it the active main select
                setIsMainSelect(true);
                setActiveColorCell(cell);
            } else { // selecting but there's already an active color - make it a combo selected cell
                let comboCopy = [...comboColorCells];
                comboCopy.push(cell);
                setComboColorCells(comboCopy);
                setIsSelected(true);
            }
        }

    }

    const clickCell = () => {
        selectCell();
    }

    useEffect(() => {
        if (selectMode === 'add') {
            if (activeColorCell !== undefined && 
                activeColorCell !== null && 
                activeColorCell.id === cell.id) {
                setIsSelected(true);
            } else {
                setIsMainSelect(false);
                setIsSelected(false);
            }
        } else { // if it's combine mode
            // if there is no active color cells, then deselect this
            // it typically means they deselected the main cell, so all the other
            // selected cells need to be deselected too
            if (activeColorCell === null) {
                setIsSelected(false);
            } else if (activeColorCell && 
                activeColorCell !== undefined && 
                activeColorCell.id === cell.id) { 
                    setIsMainSelect(true);
                    setIsSelected(true);
                }
        }
    }, [activeColorCell]);

    useEffect(() => {
        if (isSelected) {
            if (!isMainSelect) {
                setCellClassName(`${cell.className} selected`);
            } else {
                setCellClassName(`${cell.className} selected-main`);
            }
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