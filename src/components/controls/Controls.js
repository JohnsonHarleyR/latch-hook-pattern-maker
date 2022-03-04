import React from 'react';
import { PatternContext } from '../../PatternContext';
import SizeChanger from './SizeChanger';
import ColorSelector from './ColorSelector';
import UndoRedo from './UndoRedo';
import MovePattern from './MovePattern';
import FileUpload from '../Logic/FileUpload';


const Controls = () => {
    return (
        <div>
            <SizeChanger />
            <ColorSelector />
            <div style={{display: "flex"}}>
                <UndoRedo />
                <MovePattern />
            </div>
            <FileUpload />
        </div>
    )
}

export default Controls;