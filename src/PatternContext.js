import React, {useState, useEffect, createContext} from 'react';
import { CellClass, PatternCellClass, ColorCellClass } from './classes/ComponentClasses';

// TODO add ability to undo and redo steps

const PatternContext = createContext({colorCells: [], patternCells: [], activeColorCell: null});

const PatternProvider = ({children}) => {
    const [isPrinting, setIsPrinting] = useState(false);

    const [colorCells, setColorCells] = useState([]); // the cells used in the list of colors - referenced by pattern cells
    const [activeColorCell, setActiveColorCell] = useState(null); // the selected color cell - selected by mouse
    const [comboColorCells, setComboColorCells] = useState([]); // for the sake of combining color cells
    const [selectMode, setSelectMode] = useState("add"); // add or combine mode

    const [unusedSymbols, setUnusedSymbols] = useState([
        '☐','⊡','◒','◓','◎','⊙','/','>','<','=','~',
        '∷','ツ','♀','♂','•','∀','≣','∻','∅','≐','≑','≚','⍮',
        '⑂','⑃','@','-','♫','☽','☾','↝','≠',
        'ξ','σ','⊜','⊗','⊛','◍','ω',
        '♡','♢','☋','⇩','+','?','✰'
    ]); // this is for adding symbols to color cells

    const [patternCells, setPatternCells] = useState(null); // cells on the canvas
    const [patternXLength, setPatternXLength] = useState(40); // the number of cells across
    const [patternYLength, setPatternYLength] = useState(40); // the number of cells down

    const [isMouseDown, setIsMouseDown] = useState(false);
    const [allowCountUpdate, setAllowCountUpdate] = useState(true); // whether to show the button to show the count for each color
    const [doMakeCopy, setDoMakeCopy] = useState(false); // tells the computer when to make a copy
    const [doClearHistory, setDoClearHistory] = useState(false);

    const [image, setImage] = useState(null); // uploaded image
    const [imagePattern, setImagePattern] = useState(null); // a pattern created from an image
    const [colorDifAllow, setColorDifAllow] = useState(10); // for adjusting tolerance in color similarity when mapping an immage
    const [yAlign, setYAlign] = useState('start'); // for mapping an image onto the canvas
    const [xAlign, setXAlign] = useState('start'); // how should the image be cropped, basically

    const [instructions, setInstructions] = useState(null);

    useEffect(() => {
        let symbolsCopy = [...unusedSymbols];
        let colorCellsCopy = [...colorCells];
        colorCellsCopy.push(createColorCell("color", "#FFFFFF", "White", symbolsCopy.pop(), colorCells));
        setColorCells(colorCellsCopy);
        setActiveColorCell(colorCellsCopy[0]);
        setUnusedSymbols(symbolsCopy);
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
                        let fill;
                        let symbol;
                        if (colorCells !== undefined && colorCells.length > 0) {
                            fill = colorCells[0].fillColor;
                            symbol = colorCells[0].symbol;
                        } else {
                            fill = "#fff";
                            symbol = '✰';
                        }
                        newCell= createCell("pattern", fill, symbol, x, y, "c0");
                    }
                    newRow.push(newCell);
                }
                newPatternCells.push(newRow);
            }
            setPatternCells(newPatternCells);
            setDoMakeCopy(true);
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
        image, imagePattern, selectMode, unusedSymbols,
        comboColorCells, colorDifAllow, xAlign, yAlign,
        allowCountUpdate, doMakeCopy, doClearHistory,
        instructions, isPrinting,
        setColorCells, setActiveColorCell, setPatternCells, 
        setPatternXLength, setPatternYLength, setIsMouseDown, 
        setImage, setImagePattern, setSelectMode, setUnusedSymbols,
        setComboColorCells, setColorDifAllow, setXAlign, setYAlign,
        setAllowCountUpdate, setDoMakeCopy, setDoClearHistory,
        setInstructions, setIsPrinting}}>
        {children}
    </PatternContext.Provider>
    );
}

const assignSymbol = (colorAssigned, symbolsList) => {

}

export const createColorCell = (type, color, colorName, symbol, colorCells) => {
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

export const createCell = (type, color, symbol, x, y, refId) => {
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

    let newCell = new PatternCellClass(id, refId, type, "cell", color, symbol, x, y);

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