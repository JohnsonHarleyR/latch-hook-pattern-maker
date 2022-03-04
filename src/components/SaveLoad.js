import React, { useContext, useRef, useState } from 'react';
import { PatternContext } from '../PatternContext';

const SaveLoad = () => {

    const {patternCells, colorCells, patternXLength, patternYLength,
        unusedSymbols, setPatternCells, setColorCells, setDoClearHistory,
        setPatternXLength, setPatternYLength,  doMakeCopy, setDoMakeCopy,
        setUnusedSymbols} = useContext(PatternContext);
    const [errorMessage, setErrorMessage] = useState('');
    const nameInput = useRef();

    const getSaveString = () => {
        let patternDetails = {
            pattern: patternCells,
            color: colorCells,
            yLength: patternYLength,
            xLength: patternXLength,
            symbols: unusedSymbols
        };
        return JSON.stringify(patternDetails);
    }

    const loadFronString = (jsonString) => {
        let newState = JSON.parse(jsonString);
        setPatternXLength(newState.xLength);
        setPatternYLength(newState.yLength);
        setUnusedSymbols(newState.symbols);
        setColorCells(newState.color);
        setPatternCells(newState.pattern);
        setDoMakeCopy(true);
    }

    const savePattern = () => {
        console.log(nameInput.current.value);
        if (nameInput.current.value.trim() === '') {
            setErrorMessage('Please give a pattern name.');
        } else {
            setErrorMessage('');
            let patternName = nameInput.current.value.trim().toLowerCase();
            let jsonString = getSaveString();
            localStorage.setItem(patternName, jsonString);
            setErrorMessage('Pattern saved!');
        }
    }

    const loadPattern = () => {
        if (nameInput.current.value.trim() === '') {
            setErrorMessage('Please enter the pattern name.');
        } else {
            setErrorMessage('');
            let patternName = nameInput.current.value.trim().toLowerCase();
            let patternString = localStorage.getItem(patternName);

            if (patternString === null) {
                setErrorMessage("There is no pattern saved with that name.");
            } else {
                loadFronString(patternString);
                setErrorMessage('Pattern loaded!');
                setDoClearHistory(true);
                setDoMakeCopy(true); // HACK it has to do this twice for it to register
            }
        }
    }

    const resetMessage = () => {
        setErrorMessage('');
    }

    return (
        <div style={{display: 'flex', flexDirection: "column"}}>
            <h2>Save/Load Pattern</h2>
            <div style={{display: 'flex'}}>
                Pattern Name: <input type="text" ref={nameInput} onChange={resetMessage}/>
                <button onClick={savePattern}>Save</button>
            <button onClick={loadPattern}>Load</button>

            </div>
            {errorMessage}
        </div>
    );
}

export default SaveLoad;