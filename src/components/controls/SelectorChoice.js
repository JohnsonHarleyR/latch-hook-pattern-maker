import React, { useContext, useEffect, useState, useRef } from 'react';
import { PatternContext } from '../../PatternContext';
import ColorCell from '../ColorCell';
import "../../styles.css";

const SelectorChoice = () => {
    const {colorCells, setColorCells, 
        activeColorCell, setActiveColorCell} = useContext(PatternContext);
    const [color, setColor] = useState("#ffffff")
    const [buttonText, setButtonText] = useState("Add");
    const [showDelete, setShowDelete] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const selector = useRef();
    const nameInput = useRef();
    const defButton = useRef();
    const deleteButton = useRef();

    useEffect(() => {
        selector.current.value = "#ffffff";
    }, []);

    useEffect(() => {
        if (activeColorCell !== null) {
            setButtonText("Change");
            setShowDelete(true);
            nameInput.current.value = activeColorCell.colorName;
            selector.current.value = activeColorCell.fillColor;

        } else {
            setButtonText("Add");
            setShowDelete(false);
            nameInput.current.value = "";
            selector.current.value = color;
        }
    }, [activeColorCell]);

    useEffect(() => {
        if (showDelete) {
            deleteButton.current.style.display = "block";
        } else {
            deleteButton.current.style.display = "none";
        }
    }, [showDelete]);

    const changeColor = () => {
        setColor(selector.current.value);
    }

    const hitDefButton = () => {
        if (activeColorCell !== null) {

        } else {

        }
    }

    const hitDeleteButton = () => {
        if (activeColorCell !== null) {
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
                cellsCopy.splice(index, 1);
                setColorCells(cellsCopy);
            }
            
        }
    }

    return(
        <div>
            <input type="color" ref={selector} onChange={changeColor}/>
            <input type="text" placeholder="Color Name" ref={nameInput}/>
            <button ref={defButton} onClick={hitDefButton}>{buttonText}</button>
            <button ref={deleteButton} onClick={hitDeleteButton}>Delete</button>
        </div>
    );
}

export default SelectorChoice;