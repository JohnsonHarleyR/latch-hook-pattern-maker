import React, { useContext, useState, useEffect, useRef } from 'react';
import { PatternContext } from '../../PatternContext';

const UndoRedo = () => {

    // TODO fix this so that the copies of the data aren't referenced but are deep copies instead

    const {patternCells, colorCells, patternXLength, patternYLength, setActiveColorCell,
        unusedSymbols, setPatternCells, setColorCells, doClearHistory, setDoClearHistory,
        setPatternXLength, setPatternYLength,  doMakeCopy, setDoMakeCopy,
        setUnusedSymbols, setComboColorCells} = useContext(PatternContext);
    const [prevMoves, setPrevMoves] = useState([]);
    const [nextMoves, setNextMoves] = useState([]);
    const [isUndoing, setIsUndoing] = useState(false);
    const [isRedoing, setIsRedoing] = useState(false);
    const undoButton = useRef();
    const redoButton = useRef();
    let hitCount = 0;

    useEffect(() => {
        if (doMakeCopy) {
            let prevCopy = [...prevMoves];
                let newMove = {
                    pattern: patternCells,
                    color: colorCells,
                    yLength: patternYLength,
                    xLength: patternXLength,
                    symbols: unusedSymbols
                };
                prevCopy.push(JSON.stringify(newMove));
                setPrevMoves(prevCopy);
                setDoMakeCopy(false);

                if (!isRedoing) {
                    if (nextMoves.length !== 0) {
                        setNextMoves([]);
                    }
                } else {
                    setIsRedoing(false);
                }
        }
    }, [doMakeCopy]);

    useEffect(() => {
        if (doClearHistory) {
            setNextMoves([]);
            setPrevMoves([]);
            setDoClearHistory(false);
        }
    }, [doClearHistory]);

    useEffect(() => {
        if (prevMoves.length < 2) {
            undoButton.current.disabled = true;
        } else {
            undoButton.current.disabled = false;
        }
    }, [prevMoves]);

    useEffect(() => {
        if (nextMoves.length === 0) {
            redoButton.current.disabled = true;
        } else {
            redoButton.current.disabled = false;
        }
    }, [nextMoves]);


    const undo = () => {
        setComboColorCells([]);
        setActiveColorCell(null);
        let prevCopy = [...prevMoves];
        let nextCopy = [...nextMoves];
        let lastIndex = prevCopy.length - 1;
        let prevIndex = prevCopy.length - 2;
        nextCopy.push(prevCopy[lastIndex]);
        let newState = JSON.parse(prevCopy[prevIndex]);
        prevCopy.splice(lastIndex, 1);
        setPrevMoves(prevCopy);
        setNextMoves(nextCopy);
        setPatternXLength(newState.xLength);
        setPatternYLength(newState.yLength);
        setUnusedSymbols(newState.symbols);
        setColorCells(newState.color);
        setPatternCells(newState.pattern);
    }

    const redo = () => {
        setIsRedoing(true);
        setComboColorCells([]);
        setActiveColorCell(null);
        let nextCopy = [...nextMoves];
        let lastIndex = nextCopy.length - 1;
        let newState = JSON.parse(nextCopy[lastIndex]);
        nextCopy.splice(lastIndex, 1);
        setNextMoves(nextCopy);
        setPatternXLength(newState.xLength);
        setPatternYLength(newState.yLength);
        setUnusedSymbols(newState.symbols);
        setColorCells(newState.color);
        setPatternCells(newState.pattern);
        setDoMakeCopy(true);
    }


    return (
        <div>
            <button ref={undoButton} onClick={undo}>Undo</button>
            <button ref={redoButton} onClick={redo}>Redo</button>
        </div>
    )
}

export default UndoRedo;