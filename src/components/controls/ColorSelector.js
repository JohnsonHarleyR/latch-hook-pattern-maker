import React, { useContext, useEffect, useRef, useState } from 'react';
import { PatternContext } from '../../PatternContext';
import ColorCell from '../ColorCell';
import SelectorChoice from './SelectorChoice';
import ChooseSelectMode from './ChooseSelectMode';
import CombineCells from './CombineCells';
import InstructionIcon from '../Instructions/InstructionIcon';
import "../../styles.css";

const ColorSelector = () => {
    const {colorCells, selectMode, setActiveColorCell, 
        setComboColorCells, setColorCells, patternCells, 
        allowCountUpdate, setAllowCountUpdate} 
        = useContext(PatternContext);
    const [colorCellsDisplay, setColorCellsDisplay] = useState([]);
    const [controlDisplay, setControlDisplay] = useState(<SelectorChoice />);
    const updateBtn = useRef();

    useEffect(() => {
        let newDisplay = [];
        colorCells.forEach(cell => {
            newDisplay.push(
                <div key={`d-${cell.id}`} className="color-cell-row">
                    <ColorCell key={cell.id} cell={cell} />
                    {cell.colorName} ({cell.count ? cell.count : "?"})
                    <br></br>
                </div>
            );
        });
        setColorCellsDisplay(newDisplay);
    }, [colorCells]);

    useEffect(() => {
        setComboColorCells([]);
        setActiveColorCell(null);
        if (selectMode === "add") {
            setControlDisplay(<SelectorChoice />);
        } else if (selectMode === "combine") {
            setControlDisplay(<CombineCells />)
        }
    }, [selectMode]);

    useEffect(() => {
        if (allowCountUpdate) {
            updateBtn.current.disabled = false;
        } else {
            updateBtn.current.disabled = true;
        }
    }, [allowCountUpdate]);

    const updateColorCounts = () => {
        let cellsCopy = [...colorCells];
        for (let i = 0; i < cellsCopy.length; i++) {
            let count = countPatternInstances(cellsCopy[i]);
            cellsCopy[i].count = count;
        }
        setColorCells(cellsCopy);
        setAllowCountUpdate(false);
    }

    const countPatternInstances = (cell) => {
        let count = 0;
        for (let y = 0; y < patternCells.length; y++) {
            let yRow = patternCells[y];
            for (let x = 0; x < yRow.length; x++) {
                if (patternCells[y][x].refId === cell.id) {
                    count++;
                }
            }
        }
        return count;
        
    }

    return(
        <div>
            <button onClick={updateColorCounts} ref={updateBtn}>Update Counts</button>
            <InstructionIcon message="Clicking this button will count how many threads are needed for each color. You can update this anytime a change is made to the canvas."/>
            <div style={{overflowY: "scroll", width: "250px", height: "300px"}}>
            {colorCellsDisplay}
            </div>
            <ChooseSelectMode />
            {controlDisplay}
        </div>
    );
}

export default ColorSelector;