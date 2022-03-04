import React, { useContext, useRef } from 'react';
import { PatternContext } from '../../PatternContext';

const MovePattern = () => {
    const {patternCells, setPatternCells, 
        colorCells, setDoMakeCopy} = useContext(PatternContext);

    const upBtn = useRef();
    const downBtn = useRef();
    const leftBtn = useRef();
    const rightBtn = useRef();

    const moveDown = () => { // start from bottom for y
        // first save current state to UndoRedo - this will trigger that
        let newCellsChangeColor = colorCells[0];
        let cellsCopy = [...patternCells];
        for (let y = cellsCopy.length - 1; y > 0; y--) {
            for (let x = 0; x < cellsCopy[y].length; x++) {
                let cell = cellsCopy[y][x];
                let changeCell = cellsCopy[y - 1][x];
                cell.fillColor = changeCell.fillColor;
                cell.refId = changeCell.id;
                cell.symbol = changeCell.symbol;
                cell.symbolColor = changeCell.symbolColor;
            }
        }

        // now modify the top row to have the same color of the top color cell
        for (let x = 0; x < cellsCopy[0].length; x++) {
            let cell = cellsCopy[0][x];
            cell.fillColor = newCellsChangeColor.fillColor;
            cell.refId = newCellsChangeColor.id;
            cell.symbol = newCellsChangeColor.symbol;
            cell.symbolColor = newCellsChangeColor.symbolColor;
        }
        setPatternCells(cellsCopy);
        //setDoMakeCopy(true);
    }


    return (
        <div style={{display:"flex", flexDirection:"column"}}>
            <button ref={upBtn}>⇑</button>
            <div style={{display:"flex"}}>
                <button ref={leftBtn}>⇐</button>
                <button ref={rightBtn}>⇒</button>
            </div>
            <button ref={downBtn} onClick={moveDown}>⇓</button>
        </div>
    );
}

export default MovePattern;