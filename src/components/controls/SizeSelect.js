import React, { useState, useContext, useEffect, useRef } from 'react';
import { PatternContext } from '../../PatternContext';

const SizeSelect = ({setFunction, keyStart, checkValue}) => {

    const [feet, setFeet] = useState(1);
    const [options, setOption] = useState(getOptions);
    const [isSetting, setIsSetting] = useState(false);
    const selectRef = useRef();

    const changeLength = () => {
        let newLength = selectRef.current.value;
        setFeet(getFeet(newLength));
        setIsSetting(true);
        setFunction(newLength);
    }

    useEffect(() => {
        if (!isSetting) {
            selectRef.current.value = checkValue;
            setFeet(getFeet(checkValue));
        } else {
            setIsSetting(false);
        }
    }, [checkValue]);

    return (
        <div>
            <select onChange={changeLength} ref={selectRef}>
                {options.map((option => {
                    return (<option key={`${keyStart}${option.value}`} value={option.value}>{option.label}</option>)
                }))}
            </select>
            <br></br>
            <span>{feet} ft</span>
        </div>
    );

}

export default SizeSelect;

const getLengths = () => {
    let currentLength = 40;
    let lengths = [];
    let numOfTimes = (5 * 4); // 5 ft, 40 = 1ft
    for (let i = 0; i < numOfTimes; i++) {
        lengths.push(currentLength);
        currentLength += 10;
    } 
    return lengths;
}

const getOptions = () => {
    let lengths = getLengths();
    let newOptions = [];
    for (let i = 0; i < lengths.length; i++) {
        newOptions.push({
            label: lengths[i],
            value: lengths[i]
        });
    }
    return newOptions;
}

const getFeet = (length) => {
    return length / 40;
}