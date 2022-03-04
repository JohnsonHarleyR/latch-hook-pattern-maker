import React from 'react';
import LayerInput from './LayerInput';
import LayerOutput from './LayerOutput';

const Layers = () => {

    return(
        <div style={{display:"flex", flexDirection:"column"}}>
            <LayerOutput />
            <LayerInput />
        </div>
    );
}

export default Layers;