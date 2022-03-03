import React, { useContext, useEffect, useState } from 'react';
import { PatternContext } from '../../../PatternContext';

const LayerOutput = () => {

    const {patternCells, colorCells, 
        activeColorCell} = useContext(PatternContext);

    const [uploadMessage, setUploadMessage] = useState("");

    const createOutputText = () => {
        let patternCellsLayer = [];
        let activeRefId = activeColorCell.id;
    
        for (let y = 0; y < patternCells.length; y++) {
            let newRow = [];
            for (let x = 0; x < patternCells[0].length; x++) {
                // if it's the active color, push null instead
                if ( activeColorCell && patternCells[y][x].refId === activeRefId) {
                    newRow.push(null);
                } else {
                    newRow.push(patternCells[y][x]);
                }
            }
            patternCellsLayer.push(newRow);
        }

        // create object
        let newOutput = {
            color: colorCells,
            pattern: patternCellsLayer
        };

        let jsonString = JSON.stringify(newOutput);
        return jsonString;
    }

    const download = (e) => {
        setUploadMessage('(downloading...');
        let text = createOutputText();
        e.target.href = `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`;
        e.target.download = "pattern-json.txt";
        setUploadMessage('(check downloads folder...)');
    }

    return(
        <>
        <a href="" onClick={download}>Download JSON Layer</a>
        <div>{uploadMessage}</div>
        </>
    );
}

export default LayerOutput;