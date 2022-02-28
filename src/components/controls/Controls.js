import React from 'react';
import { PatternContext } from '../../PatternContext';
import SizeChanger from './SizeChanger';
import ColorSelector from './ColorSelector';
import UndoRedo from './UndoRedo';
import FileUpload from '../Logic/FileUpload';


const Controls = () => {
    return (
        <div>
            <SizeChanger />
            <ColorSelector />
            <UndoRedo />
            <FileUpload />
        </div>
    )
}

export default Controls;