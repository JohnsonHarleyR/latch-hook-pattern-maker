import { PatternContext } from "../PatternContext";
import Controls from "./controls/Controls";
import PatternCanvas from "./canvas/PatternCanvas";
import SaveLoad from "./SaveLoad";
import InstructionModal from "./Instructions/InstructionModal";
import "../styles.css";

const PatternMaker = () => {

    return (
        <div className="pattern-maker">
            <div>
                <SaveLoad />
                <PatternCanvas />
                <InstructionModal />
            </div>
            <div>
                <Controls />
            </div>
        </div>
    )
}

export default PatternMaker;