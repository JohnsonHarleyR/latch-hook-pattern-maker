import React, { useContext, useEffect, useState } from 'react';
import { PatternContext } from '../../PatternContext';

const PrintModal = ({idName, doStartPrint, setDoStartPrint, modalRef, children}) => {

    const [displayCondition, setDisplayCondition] = useState("none");
    const {setIsPrinting} = useContext(PatternContext);

    const getDisplayContent = () => {
        if (!doStartPrint) {
            return (
                <></>
            );
        } else {
            return (
                <>
                {children}
                </>
            );
        }
    }
    const [content, setContent] = useState(getDisplayContent());

    useEffect(() => {
        setContent(getDisplayContent());
        //window.print();
    }, [doStartPrint]);

    useEffect(() => {
        if (content && doStartPrint === true) {
            setDisplayCondition("block");
        }
    }, [content]);

    useEffect(() => {
        if (content && doStartPrint === true && displayCondition === "block") {
            window.print();
            setDisplayCondition("none");
            setDoStartPrint(false);
            setIsPrinting(false);
        }
    }, [displayCondition]);

    return (
        <div  id={idName} className="modal print" style={{display:displayCondition, overflow: 'visible!important'}}>
            <div className="modal-content print" ref={modalRef}>
                {content}
            </div>
        </div>
    )
}

export default PrintModal;