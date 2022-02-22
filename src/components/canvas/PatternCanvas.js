import React, { useContext, useEffect, useState } from 'react';
import "../../styles.css";
import { PatternContext } from '../../PatternContext';
import PatternCell from '../PatternCell';

const PatternCanvas = () => {
    const {patternCells} = useContext(PatternContext);
    const [canvasDisplay, setCanvasDisplay] = useState([]);

    const createCanvas = () => {
        if (patternCells !== undefined && 
            patternCells !== null) {
                let newCanvasDisplay = [];
                for (let y = 0; y < patternCells.length; y++) {
                    let yRow = patternCells[y];
                    let newYDisplayRow = [];
//                    newYDisplayRow.push(<div className="yRow"></div>)
                    for (let x = 0; x < yRow.length; x++) {
                        let cell = yRow[x];
                        newYDisplayRow.push(<PatternCell key={cell.id} cell={cell}/>);
                    }
                    newCanvasDisplay.push(<div className="x-row" key={`r-${y}`}>{newYDisplayRow}</div>);
                }
                setCanvasDisplay(newCanvasDisplay);
        }
    }

    useEffect(() => {
        createCanvas();
    }, [patternCells]);

    return(
        <div>
            {canvasDisplay}
        </div>
    );
}

export default PatternCanvas;