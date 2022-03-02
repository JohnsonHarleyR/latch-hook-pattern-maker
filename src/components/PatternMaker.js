import { PatternContext } from "../PatternContext";
import Controls from "./controls/Controls";
import PatternCanvas from "./canvas/PatternCanvas";
import SaveLoad from "./SaveLoad";
import InstructionModal from "./Instructions/InstructionModal";
import PrintContent from "./print/PrintContent";
import "../styles.css";
import { useContext, useEffect, useRef } from "react";

const PatternMaker = () => {

    const {isPrinting} = useContext(PatternContext);
    const printHide1Ref = useRef();
    const printHide2Ref = useRef();
    const printHide3Ref = useRef();

    useEffect(() => {
        if (isPrinting) {
            printHide1Ref.current.style.display = "none";
            printHide2Ref.current.style.display = "none";
            printHide3Ref.current.style.display = "none";
        } else {
            printHide1Ref.current.style.display = "block";
            printHide2Ref.current.style.display = "block";
            printHide3Ref.current.style.display = "block";
        }
    }, [isPrinting]);

    return (
        <div className="pattern-maker">
            <div>
                <div style={{display:"flex"}}>
                    <div ref={printHide1Ref}>
                        <SaveLoad />
                    </div>
                    <PrintContent />
                </div>
                <div ref={printHide2Ref}>
                    <PatternCanvas />
                    <InstructionModal />
                </div>
            </div>
            <div>
                <div ref={printHide3Ref}>
                    <Controls />
                </div>
            </div>
        </div>
    )
}

export default PatternMaker;