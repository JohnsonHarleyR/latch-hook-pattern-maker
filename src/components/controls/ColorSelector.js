import React, { useContext, useEffect, useState } from 'react';
import { PatternContext } from '../../PatternContext';
import ColorCell from '../ColorCell';
import SelectorChoice from './SelectorChoice';
import ChooseSelectMode from './ChooseSelectMode';
import CombineCells from './CombineCells';
import "../../styles.css";

const ColorSelector = () => {
    const {colorCells, selectMode, setActiveColorCell, 
        setComboColorCells} = useContext(PatternContext);
    const [colorCellsDisplay, setColorCellsDisplay] = useState([]);
    const [controlDisplay, setControlDisplay] = useState(<SelectorChoice />);

    useEffect(() => {
        let newDisplay = [];
        colorCells.forEach(cell => {
            newDisplay.push(
                <div key={`d-${cell.id}`} className="color-cell-row">
                    <ColorCell key={cell.id} cell={cell} />
                    {cell.colorName}
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

    return(
        <div>
            <div style={{overflowY: "scroll", width: "250px", height: "300px"}}>
            {colorCellsDisplay}
            </div>
            <ChooseSelectMode />
            {controlDisplay}
        </div>
    );
}

export default ColorSelector;