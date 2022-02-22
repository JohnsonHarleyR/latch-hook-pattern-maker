import React from 'react';
import { PatternContext } from '../../PatternContext';
import SizeChanger from './SizeChanger';
import ColorSelector from './ColorSelector';

const Controls = () => {
    return (
        <div>
            <SizeChanger />
            <ColorSelector />
        </div>
    )
}

export default Controls;