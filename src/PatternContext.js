import React, {useState, useEffect, createContext} from 'react';
import { CellClass, ColorCellClass } from './classes/ComponentClasses';

const PatternContext = createContext({colorCells: [], patternCells: [], activeColorCell: null});

const PatternProvider = ({children}) => {
    const [colorCells, setColorCells] = useState([]);
    const [activeColorCell, setActiveColorCell] = useState(null);
    const [patternCells, setPatternCells] = useState(null);
    const [patternXLength, setPatternXLength] = useState(40);
    const [patternYLength, setPatternYLength] = useState(40);
    const [isMouseDown, setIsMouseDown] = useState(false);

    useEffect(() => {
        let colorCellsCopy = [...colorCells];
        colorCellsCopy.push(createColorCell("color", "#FFFF00", "Yellow", "", colorCells));
        setColorCells(colorCellsCopy);
        setActiveColorCell(colorCellsCopy[0]);
    }, []);

    const createPatternCells = () => {
        if (patternXLength && patternYLength) {
            let newPatternCells = [];
            let cellsCopy = patternCells === null ? [] : [...patternCells];
            for (let y = 0; y < patternYLength; y++) {
                let newRow = [];
                for (let x = 0; x < patternXLength; x++) {
                    let newCell;
                    if (cellsCopy[y] && cellsCopy[y][x]) {
                        newCell = cellsCopy[y][x];
                    } else {
                        newCell= createCell("pattern", "#fff", "", x, y);
                    }
                    newRow.push(newCell);
                }
                newPatternCells.push(newRow);
            }
            setPatternCells(newPatternCells);
        }
    }

    useEffect(() => {
        createPatternCells();
    }, [patternXLength, patternYLength]);

    document.body.onmousedown = () => {
        setIsMouseDown(true);
    }
    document.body.onmouseup = () => {
        setIsMouseDown(false);
    }

    return (
        <PatternContext.Provider value={{colorCells, activeColorCell, 
        patternCells, patternXLength, patternYLength, isMouseDown,
    setColorCells, setActiveColorCell, setPatternCells, 
    setPatternXLength, setPatternYLength, setIsMouseDown}}>
        {children}
    </PatternContext.Provider>
    );
}

const createColorCell = (type, color, colorName, symbol, colorCells) => {
    let newNumber;
    if (colorCells === null || colorCells === undefined || 
        colorCells.length === 0) {
        newNumber = 0;
    } else {
        newNumber = colorCells.length;
    }
    let id = `c${newNumber}`;

    let newCell = new ColorCellClass(id, type, "cell", color, colorName, symbol);
    return newCell;
}

const createCell = (type, color, symbol, x, y) => {
    let id = `p${x}-${y}`;

    let topBorder = false;
    let bottomBorder = false;
    if (y === 0 || (y + 1) % 10 === 1) {
        topBorder = true;
    } else if ((y + 1) % 10 === 0) {
        bottomBorder = true;
    }

    let rightBorder = false;
    let leftBorder = false;
    if ( x === 0 || (x + 1) % 10 === 1) {
        leftBorder = true;
    } else if ((x + 1) % 10 === 0) {
        rightBorder = true;
    }

    let newCell = new CellClass(id, type, "cell", color, symbol, x, y);

    if (topBorder) {
        newCell.className += " top";
    } else if (bottomBorder) {
        newCell.className += " bottom";
    }

    if (leftBorder) {
        newCell.className += " left";
    } else if (rightBorder) {
        newCell.className += " right";
    }

    return newCell;
}

export {PatternContext};
export default PatternProvider;