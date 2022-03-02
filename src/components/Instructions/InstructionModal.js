import React, { useEffect, useRef, useState, useContext } from 'react';
import { PatternContext } from '../../PatternContext';
import { Flex } from '../../Styled';
import "../../styles.css";

const InstructionModal = () => {
    const {instructions, setInstructions} = useContext(PatternContext);
    const [showModal, setShowModal] = useState(false);
    const modalRef = useRef();

    useEffect(() => {
        if (instructions) {
            setShowModal(true);
        } else {
            setShowModal(false);
        }
    }, [instructions]);

    useEffect(() => {
        if (showModal) {
            modalRef.current.style.display = "block";
        } else {
            modalRef.current.style.display = "none";
        }
    }, [showModal]);

    const closeModal = () => {
        // setting the instructions back to null will trigger it to close
        setInstructions(null);
    }


    return(
        <div id="instructionModal" className="modal" ref={modalRef}>
            <div className="modal-content instruction" 
            style={{display: Flex, 
                justifyContent: 'center', textAlign: 'center'}}>
                {instructions ?? ""}
                <br></br>
                <div style={{marginTop:'10px'}}>
                    <button style={{width: '75px'}} onClick={closeModal}>Gotcha</button>
                </div>
            </div>
        </div>
    );
}

export default InstructionModal;