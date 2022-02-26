import React, { useContext, useEffect, useState } from 'react';
import { Flex, FlexCol } from '../../Styled';
import { PatternContext } from '../../PatternContext';
import SizeSelect from './SizeSelect';
import "../../styles.css";

const SizeChanger = () => {
    const {setPatternXLength, setPatternYLength} = useContext(PatternContext);
    const [xLengthSelect, setXLengthSelect] = useState(40);
    const [yLengthSelect, setYLengthSelect] = useState(40);

    const changeDimensions = () => {
        setPatternXLength(xLengthSelect);
        setPatternYLength(yLengthSelect);
    }

    return(
        <FlexCol>
            <h2>Change Canvas Size</h2>
            <Flex>
                <SizeSelect key={"xSize"} setFunction={setXLengthSelect} keyStart={"x"} />
                <span> X </span>
                <SizeSelect key={"ySize"} setFunction={setYLengthSelect} keyStart={"y"} />
            </Flex>
            <button onClick={changeDimensions}>Change Dimensions</button>
            
        </FlexCol>
    );
}

export default SizeChanger;