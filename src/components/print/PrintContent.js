import React, { useRef, useState, useContext, useEffect } from 'react';
import PrintModal from './PrintModal';
import ColorsList from './ColorsList';
import PatternCanvas from '../canvas/PatternCanvas.js';
import { PatternContext } from '../../PatternContext';

const PrintContent = () => {

    const [doPrintCanvas, setDoPrintCanvas] = useState(false);
    const [doPrintColors, setDoPrintColors] = useState(false);
    const canvasModalRef = useRef();
    const colorsModalRef = useRef();

    const {isPrinting, setIsPrinting} = useContext(PatternContext);
    const printHideRef = useRef();

    useEffect(() => {
        if (isPrinting) {
            printHideRef.current.style.display = "none";
        } else {
            printHideRef.current.style.display = "block";
        }
    }, [isPrinting]);

    const printPattern = () => {
        setIsPrinting(true);
        setDoPrintCanvas(true);
    }

    const printColors = () => {
        setIsPrinting(true);
        setDoPrintColors(true);
    }

    return(
        <div>
            <div ref={printHideRef}>
                <button onClick={printPattern}>Print Pattern</button>
                <button onClick={printColors}>Print Colors</button>
            </div>
            <PrintModal key="pCanvas" id="printPattern" doStartPrint={doPrintCanvas}
                setDoStartPrint={setDoPrintCanvas} modalRef={canvasModalRef}>
                <PatternCanvas />
            </PrintModal>
            <PrintModal key="pColors" id="printColors" doStartPrint={doPrintColors}
                setDoStartPrint={setDoPrintColors} modalRef={colorsModalRef}>
                <ColorsList doUpdate={doPrintColors}/>
            </PrintModal>
        </div>
    );
}

export default PrintContent;