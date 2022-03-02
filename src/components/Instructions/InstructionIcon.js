import React, { useContext } from 'react';
import { PatternContext } from '../../PatternContext';
import "../../styles.css";

const InstructionIcon = ({message}) => {
    const {setInstructions} = useContext(PatternContext);

    // when you set the instruction message, the InstructionModal will automatically show
    // a modal with this particular message.
    const showInstructions = () => {
        setInstructions(message);
    }

    return(
        <>
            <span className="question-icon" onClick={showInstructions}>
                (?)
            </span>
        </>
    );
}

export default InstructionIcon;