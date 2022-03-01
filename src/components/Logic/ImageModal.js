import React, { useEffect, useRef, useState } from 'react';
import ColorSelector from '../controls/ColorSelector';
import "../../styles.css";

const ImageModal = ({image, uploadMode, setIsFinished, showImageModal, setShowImageModal}) => {

    const maxCanvasHeight = 600;
    const maxCanvasWidth = 600;
    const readyButton = useRef();
    const cancelButton = useRef();
    const modalRef = useRef();
    const canvasRef = useRef();
    let ctx;

    useEffect(() => {
        if (image && uploadMode === "selector") {
            setCanvas();
        }
    }, [image]);

    useEffect(() => {
    if (showImageModal === true) {
            modalRef.current.style.display = "block";
        } else {
            modalRef.current.style.display = "none";
        }
    }, [showImageModal]);

    const finish = () => {
        setShowImageModal(false);
        setIsFinished(true);
    }

    const cancel = () => {
        setShowImageModal(false);
    }

    const setCanvas = () => {
        let imgWidth = image.width;
        let imgHeight = image.height;
        ctx = canvasRef.current.getContext("2d");
        let width;
        let height;
        if (imgHeight > imgWidth) {
            if (imgHeight <= maxCanvasHeight) {
                width = imgWidth;
                height = imgHeight;
            } else {
                height = maxCanvasHeight;
                let scale = maxCanvasHeight / imgHeight;
                width = imgWidth * scale;
            }
        } else {
            if (imgWidth <= maxCanvasWidth) {
                width = imgWidth;
                height = imgHeight;
            } else {
                width = maxCanvasWidth;
                let scale = maxCanvasWidth / imgWidth;
                height = imgHeight * scale;
            }
        }
        canvasRef.current.height = height;
        canvasRef.current.width = width;
        ctx.drawImage(image, 0, 0, imgWidth, imgHeight, 0, 0, 
            width, height);
    }

    return (
        <>
            <div id="myModal" className="modal" ref={modalRef}>

                <div className="modal-content">
                    <div style={{display: 'flex'}}>
                        <div>
                            <canvas ref={canvasRef} />
                        </div>
                        
                        <div>
                            <p>Use the color selector to choose the most import colors in the image. 
                                Hit the button when you are ready to generate the content!</p>
                            <ColorSelector />
                            <button ref={readyButton} onClick={finish}>Use these Colors</button>
                            <button ref={cancelButton} onClick={cancel}>Cancel</button>
                        </div>
                    </div>
                    
                </div>

            </div>
        </>
    );
}

export default ImageModal;