import React, { useState } from 'react';

const SizeSelect = ({setFunction, keyStart}) => {

    const [feet, setFeet] = useState(1);
    const [options, setOption] = useState(getOptions);

    const changeLength = (e) => {
        let newLength = e.target.value;
        setFeet(getFeet(newLength));
        setFunction(newLength);
    }

    return (
        <div>
            <select onChange={changeLength}>
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