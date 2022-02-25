import React, { useContext, useEffect, useRef, useState } from 'react';
import { PatternContext } from '../../PatternContext';

const ChooseSelectMode = () => {
    const {selectMode, setSelectMode} = useContext(PatternContext);
    const addMode = useRef();
    const combineMode = useRef();

    useEffect(() => {
        if (selectMode === 'add') {
            addMode.current.disabled = true;
            combineMode.current.disabled = false;
        } else {
            addMode.current.disabled = false;
            combineMode.current.disabled = true;
        }
    }, [selectMode]);

    const useAddMode = () => {
        setSelectMode('add');
    }

    const useCombineMode = () => {
        setSelectMode('combine');
    }

    return (
        <div>
            <button ref={addMode} onClick={useAddMode}>Add Mode</button>
            <button ref={combineMode} onClick={useCombineMode}>Combine Mode</button>
        </div>
    );
}

export default ChooseSelectMode;