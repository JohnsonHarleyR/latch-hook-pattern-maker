import { PatternContext } from "../PatternContext";
import Controls from "./controls/Controls";
import PatternCanvas from "./canvas/PatternCanvas";
import "../styles.css";

const PatternMaker = () => {

    return (
        <div className="pattern-maker">
            <PatternCanvas />
            <Controls />
        </div>
    )
}

export default PatternMaker;