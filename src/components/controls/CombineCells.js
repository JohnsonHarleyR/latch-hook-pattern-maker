import React, { useContext, useEffect, useState } from 'react';
import { PatternContext } from '../../PatternContext';
import ColorCell from '../ColorCell';
import SelectorChoice from './SelectorChoice';
import "../../styles.css";

const CombineCells = () => {
    const {colorCells, setColorCells, activeColorCell,
        setActiveColorCell, comboColorCells, setComboColorCells,
        patternCells, setPatternCells, unusedSymbols,
        setUnusedSymbols, setDoMakeCopy} 
        = useContext(PatternContext);

    const combineCells = () => {
        if (activeColorCell === null || 
            comboColorCells.length === 0) {
                return;
            }

        // first loop through all combo cells, then pattern cells, change
        // the pattern cells to have active cell information
        let cellsCopy = [...patternCells];
        let activeColor = activeColorCell.fillColor;
        let activeRefId = activeColorCell.id;
        let activeSymbol = activeColorCell.symbol;
        for (let y = 0; y < cellsCopy.length; y++) {
            let yRow = cellsCopy[y];
            for (let x = 0; x < yRow.length; x++) {
                for (let c = 0; c < comboColorCells.length; c++) {
                    let comboColorCell = comboColorCells[c];
                    if (cellsCopy[y][x].refId === comboColorCell.id) {
                        cellsCopy[y][x].fillColor = activeColor;
                        cellsCopy[y][x].refId = activeRefId;
                        cellsCopy[y][x].symbol = activeSymbol;
                    }
                }
            }
        }
        setPatternCells(cellsCopy);

        // once done, delete all combo cells from color cell list
        let deleteCellIds = [];
        let symbolsCopy = [...unusedSymbols];
        comboColorCells.forEach(cell => { deleteCellIds.push(cell.id);
            symbolsCopy.push(cell.symbol);});
        let newColorCellList = [];
        colorCells.forEach(cell => {
            if (!deleteCellIds.includes(cell.id)) {
                newColorCellList.push(cell);
            }
        })

        // set unused symbols to have removed symbols
        setUnusedSymbols(symbolsCopy);

        // before setting new color cell list, remove all combo cells - then set list
        setComboColorCells([]);
        setColorCells(newColorCellList);

        // deselect the active color cell
        setActiveColorCell(null);

        // make copy
        setDoMakeCopy(true);
    }

    return(
        <div>
            <button onClick={combineCells}>Combine Cells</button>
        </div>
    );
}

export default CombineCells;