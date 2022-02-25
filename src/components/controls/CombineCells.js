import React, { useContext, useEffect, useState } from 'react';
import { PatternContext } from '../../PatternContext';
import ColorCell from '../ColorCell';
import SelectorChoice from './SelectorChoice';
import "../../styles.css";

const CombineCells = () => {
    const {colorCells, setColorCells, activeColorCell, selectMode,
        setActiveColorCell, comboColorCells, setComboColorCells,
        patternCells, setPatternCells} = useContext(PatternContext);
    
    const [mainSelect, setMainSelect] = useState(null);
    const [otherSelected, setOtherSelected] = useState([]);

    const combineCells = () => {
        // first loop through all combo cells, then pattern cells, change
        // the pattern cells to have active cell information
        for (let c = 0; c < comboColorCells.length; c++) {
            
        }

        // once done, delete all combo cells from color cell list

        // before setting new color cell list, remove all combo cells - then set list

        // deselect the active color cell
    }

    return(
        <div>
            <button onClick={combineCells}>Combine Cells</button>
        </div>
    );
}

export default CombineCells;