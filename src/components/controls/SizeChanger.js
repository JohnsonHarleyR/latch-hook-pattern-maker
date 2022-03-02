import React, { useContext, useEffect, useState } from 'react';
import { Flex, FlexCol } from '../../Styled';
import { PatternContext } from '../../PatternContext';
import SizeSelect from './SizeSelect';
import { getRatio } from '../Logic/ImageLogic';
import "../../styles.css";

const SizeChanger = () => {
    const {setPatternXLength, setPatternYLength,
        patternXLength, patternYLength, image} = useContext(PatternContext);
    const [xLengthSelect, setXLengthSelect] = useState(40);
    const [yLengthSelect, setYLengthSelect] = useState(40);
    const [patternRatio, setPatternRatio] = useState("n/a");
    const [imageRatio, setImageRatio] = useState("n/a");

    const changeDimensions = () => {
        setPatternXLength(xLengthSelect);
        setPatternYLength(yLengthSelect);
    }

    useEffect(() => {
        if (image) {
            setImageRatio(getRatio(image.height, image.width).toString());
        } else {
            setImageRatio("n/a");
        }
    }, [image]);

    useEffect(() => {
        if (xLengthSelect, yLengthSelect) {
            setPatternRatio(getRatio(yLengthSelect, xLengthSelect).toString());
        } else {
            setPatternRatio("n/a");
        }
    }, [xLengthSelect, yLengthSelect]);

    useEffect(() => {
        if (patternXLength && patternXLength !== xLengthSelect) {
            setXLengthSelect(patternXLength);
        }
    }, [patternXLength]);

    useEffect(() => {
        if (patternYLength && patternYLength !== yLengthSelect) {
            setYLengthSelect(patternYLength);
        }
    }, [patternYLength]);


    return(
        <FlexCol>
            <h2>Change Canvas Size</h2>
            <Flex>
                <SizeSelect key={"xSize"} setFunction={setXLengthSelect} keyStart={"x"} checkValue={patternXLength} />
                <span> X </span>
                <SizeSelect key={"ySize"} setFunction={setYLengthSelect} keyStart={"y"} checkValue={patternYLength} />
            </Flex>
            <p>
                Pattern ratio: {patternRatio} Image ratio: {imageRatio} (w / h)
            </p>
            <button onClick={changeDimensions}>Change Dimensions</button>
            
        </FlexCol>
    );
}

export default SizeChanger;