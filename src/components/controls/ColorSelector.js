import React, { useContext, useEffect, useState } from 'react';
import { PatternContext } from '../../PatternContext';
import ColorCell from '../ColorCell';
import SelectorChoice from './SelectorChoice';
import "../../styles.css";

const ColorSelector = () => {
    const {colorCells} = useContext(PatternContext);
    const [colorCellsDisplay, setColorCellsDisplay] = useState([]);

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

    return(
        <div>
            {colorCellsDisplay}
            <SelectorChoice />
        </div>
    );
}

export default ColorSelector;