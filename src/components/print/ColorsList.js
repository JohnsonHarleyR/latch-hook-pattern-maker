import React, { useEffect, useState, useContext } from 'react';
import { PatternContext } from '../../PatternContext';
import ColorCell from '../ColorCell';

const ColorsList = (doUpdate) => {

    const {colorCells, selectMode, setActiveColorCell, 
        setComboColorCells, setColorCells, patternCells, 
        allowCountUpdate, setAllowCountUpdate} 
        = useContext(PatternContext);
    const [display, setDisplay] = useState("");

    useEffect(() => {
        if (doUpdate) {
            updateColorCounts();
        }
    }, [doUpdate]);

    useEffect(() => {
        if (doUpdate && colorCells) {
            let newDisplay = [];
            colorCells.forEach(cell => {
                newDisplay.push(
                    <div key={`d-${cell.id}`} className="color-cell-row">
                        <ColorCell key={cell.id} cell={cell} />
                        {cell.colorName} ({cell.count ? cell.count : "?"} pieces)
                        <br></br>
                    </div>
                );
            });
            setDisplay(newDisplay);
        }
        

    }, [colorCells]);

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

    return (
        <div style={{width:"100%", height:"100%"}}>
            <h2>Color List</h2>
            <div style={{display:"flex", flexDirection: "column"}}>
                {display}
            </div>
        </div>
    );
}

export default ColorsList;