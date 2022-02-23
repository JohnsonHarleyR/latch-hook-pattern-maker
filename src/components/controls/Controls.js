import React from 'react';
import { PatternContext } from '../../PatternContext';
import SizeChanger from './SizeChanger';
import ColorSelector from './ColorSelector';
import FileUpload from '../Logic/FileUpload';

const Controls = () => {
    return (
        <div>
            <SizeChanger />
            <ColorSelector />
            <FileUpload />
        </div>
    )
}

export default Controls;