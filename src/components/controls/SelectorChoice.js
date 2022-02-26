import React, { useContext, useEffect, useState, useRef } from 'react';
import { PatternContext, createColorCell } from '../../PatternContext';
import "../../styles.css";

const SelectorChoice = () => {
    const {colorCells, setColorCells, 
        activeColorCell, setActiveColorCell, 
        unusedSymbols, setUnusedSymbols} = useContext(PatternContext);
    const [color, setColor] = useState("#ffffff");
    const [symbolColor, setSymbolColor] = useState("#707070");
    const [buttonText, setButtonText] = useState("Add");
    const [showDelete, setShowDelete] = useState(false);
    const [showMove, setShowMove] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const selector = useRef();
    const symbolColorSelector = useRef();
    const nameInput = useRef();
    const defButton = useRef();
    const deleteButton = useRef();
    const moveUpButton = useRef();
    const moveDownButton = useRef();

    useEffect(() => {
        selector.current.value = "#ffffff";
        symbolColorSelector.current.value = "#707070";
    }, []);

    useEffect(() => {
        if (activeColorCell !== null) {
            setColor(activeColorCell.fillColor);
            setButtonText("Change");
            setShowDelete(true);
            nameInput.current.value = activeColorCell.colorName;
            selector.current.value = activeColorCell.fillColor;
            symbolColorSelector.current.value = activeColorCell.symbolColor;
            if (colorCells.length > 1) {
                setShowMove(true);
            }
        } else {
            setButtonText("Add");
            setShowDelete(false);
            nameInput.current.value = "";
            setShowMove(false);
        }
    }, [activeColorCell]);

    useEffect(() => {
        if (showDelete) {
            deleteButton.current.style.display = "block";
        } else {
            deleteButton.current.style.display = "none";
        }
    }, [showDelete]);

    useEffect(() => {
        if (showMove) {
            moveUpButton.current.style.display = "block";
            moveDownButton.current.style.display = "block";
        } else {
            moveUpButton.current.style.display = "none";
            moveDownButton.current.style.display = "none";
        }
    }, [showMove]);

    useEffect(() => {
        if (colorCells.length > 1) {
            deleteButton.current.disabled = false;
        } else {
            deleteButton.current.disabled = true;
        }
    })

    const changeColor = () => {
        setColor(selector.current.value);
    }

    const changeSymbolColor = () => {
        setSymbolColor(symbolColorSelector.current.value);
    }

    const getNextSymbol = () => {
        if (unusedSymbols.length === 0) {
            return "!";
        }
        let symbolsCopy = [...unusedSymbols];
        let newSymbol = symbolsCopy.pop();
        setUnusedSymbols(symbolsCopy);
        return newSymbol;
    }

    const getActiveIndex = () => {
        if (!activeColorCell || colorCells.length === 0) {
            return;
        }
        for (let i = 0; i < colorCells.length; i++) {
            if (activeColorCell.id === colorCells[i].id) {
                return i;
            }
        }
        return null;
    }

    const moveCellUp = () => {
        let currentIndex = getActiveIndex();
        let spliceIndex = currentIndex - 1;
        let cell = colorCells[currentIndex];
        if (spliceIndex < 0) {
            spliceIndex = 0;
        }
        let cellsCopy = [...colorCells];
        cellsCopy.splice(currentIndex, 1);
        cellsCopy.splice(spliceIndex, 0, cell);
        setColorCells(cellsCopy);
    }

    const moveCellDown = () => {
        let currentIndex = getActiveIndex();
        let spliceIndex = currentIndex + 1;
        let cell = colorCells[currentIndex];
        if (spliceIndex >= colorCells.length) {
            spliceIndex = colorCells.length - 1;
        }
        let cellsCopy = [...colorCells];
        cellsCopy.splice(currentIndex, 1);
        cellsCopy.splice(spliceIndex, 0, cell);
        setColorCells(cellsCopy);
    }

    const hitDefButton = () => {
        let newName = nameInput.current.value;
        console.log(newName);
        if (newName === "") {
            setErrorMessage("You must enter a value for the color name.");
        } else if (activeColorCell !== null) {
            setErrorMessage("");
            let cellsCopy = [...colorCells];
            let index = null;
            let count = 0;
            cellsCopy.forEach(cell => {
                if (cell.id === activeColorCell.id) {
                    index = count;
                }
                count++;
            });
            if (index !== null) {
                let newCell = cellsCopy[index];
                newCell.colorName = newName;
                newCell.fillColor = color;
                newCell.symbolColor = symbolColor;
                cellsCopy[index] = newCell;
                setActiveColorCell(cellsCopy[index])
                setColorCells(cellsCopy);
            }
        } else {
            setErrorMessage("");
            let cellsCopy = [...colorCells];
            let newCell = createColorCell("color", color, newName, getNextSymbol(), colorCells);
            newCell.symbolColor = symbolColor;
            cellsCopy.push(newCell);
            setColorCells(cellsCopy);
        }
    }

    const hitDeleteButton = () => {
        if (activeColorCell !== null && colorCells.length > 1) {
            let index = null;
            let count = 0;
            colorCells.forEach(cell => {
                if (cell.id === activeColorCell.id) {
                    index = count;
                }
                count++;
            });
            if (index !== null) {
                setActiveColorCell(null);
                let cellsCopy = [...colorCells];
                let cellSymbol = cellsCopy[index].symbol;
                cellsCopy.splice(index, 1);
                setColorCells(cellsCopy);

                let symbolsCopy = [...unusedSymbols];
                symbolsCopy.push(cellSymbol);
                setUnusedSymbols(symbolsCopy);
            }
            
        }
    }

    return(
        <div>
            <input type="color" ref={selector} onChange={changeColor}/>
            <input type="text" placeholder="Color Name" ref={nameInput}/>
            <br></br>
            Symbol color: <input type="color" ref={symbolColorSelector} onChange={changeSymbolColor}/>
            <button ref={defButton} onClick={hitDefButton}>{buttonText}</button>
            <button ref={moveUpButton} onClick={moveCellUp}>Move Up</button>
            <button ref={moveDownButton} onClick={moveCellDown}>Move Down</button>
            <button ref={deleteButton} onClick={hitDeleteButton}>Delete</button>
            <br></br>
            {errorMessage}
        </div>
    );
}

export default SelectorChoice;