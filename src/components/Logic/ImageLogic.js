import { ColorCellClass } from "../../classes/ComponentClasses";
import { createColorCell } from "../../PatternContext";

const colorDifAllow = 30;

// this is for determining how many pixels each cell should be for the image when
// determining image information
export const getImageCellWidth = 
(canvasWidth, canvasHeight, xCount, yCount) => {
    // divide up the x and y counts with height and width.
    // the smaller pixel width should be the one returned.
    let acrossSize = Math.floor(canvasWidth / xCount);
    let downSize = Math.floor(canvasHeight / yCount);
    if ( acrossSize < downSize) {
        return acrossSize;
    } else {
        return downSize;
    }
}

export const createColorCells = (listOfColors) => {
    let colorCells = [];
    let newNumber = 0;
    listOfColors.forEach(color => {
        let id = `c${newNumber}`;
        let newCell = new ColorCellClass(id, "color", "cell", color, color, "");
        colorCells.push(newCell);
        newNumber++;
    });
    return colorCells;
}

export const getListOfColors = (cellColors) => {
    let allColors = [];
    for (let y = 0; y < cellColors.length; y++) {
        let yRow = cellColors[y];
        for (let x = 0; x < yRow.length; x++) {
            let color = cellColors[y][x];
            if (!allColors.includes(color)) {
                allColors.push(color);
            }
        }
    }
    return allColors;
}

export const narrowListOfColors = (listOfColors) => {
    let newList = [];
    listOfColors.forEach(color => {
        let isWithinRange = false;
        for (let i = 0; i < newList.length; i++) {
            if (isWithinColorRange(newList[i], color)) {
                isWithinRange = true;
                break;
            }
        }
        if (!isWithinRange) {
            newList.push(color);
        }
    });
    return newList;
}

const isWithinColorRange = (color1, color2) => {
    let dif = getColorDifference(color1, color2);
    if (dif < colorDifAllow) {
        return true;
    }
    return false;
}

export const setPatternCellInfo = (patternCells, setPatternCells, newColors) => {
    let cellsCopy = [...patternCells];
    for (let y = 0; y < cellsCopy.length; y++) {
        let yRow = cellsCopy[y];
        for (let x = 0; x < yRow.length; x++) {
            let newColor = newColors[y][x].color;
            let colorRef = newColors[y][x].refId;
            yRow[x].fillColor = newColor;
            yRow[x].refId = colorRef;
        }
    }
    setPatternCells(cellsCopy);
}

const getColorRef = (color, listOfColors) => {
    for (let i = 0; i < listOfColors.length; i++) {
        if (listOfColors[i].color === color) {
            return listOfColors[i].id;
        }
    }
    return null;
}

export const getCellColors = (ctx, cellWidth, xCount, yCount) => {
    let cellColors = [];
    let colorList = [];
    let colorListRGB = [];
    let listCount = 0;
    for (let y = 0; y < yCount; y++) {
        let startY = y * cellWidth;
        let yRow = [];
        for (let x = 0; x < xCount; x++) {
            let startX = x * cellWidth;
            let newColor = determineCellColor(ctx, startX, startY, cellWidth, cellWidth);

            // now get the difference with prev
            let similar = null;
            let refId = null;
            for (let i = 0; i < colorList.length; i++) {
                let dif = getColorDifference(colorListRGB[i], newColor);
                if (dif < colorDifAllow) {
                    newColor = colorListRGB[i];
                    similar = colorList[i];
                    refId = colorList[i].id;
                    break;
                }
            }
            if (!similar) {
                refId = `c${listCount}`;
                colorList.push(
                    new ColorCellClass(refId, "color", "cell", 
                    newColor.rgba, newColor.rgba, "")
                );
                colorListRGB.push(newColor);
                listCount++;
            }


            yRow.push({rgba: newColor.rgba, refId: refId });
        }
        cellColors.push(yRow);
    }
    return [cellColors, colorList];
}

const determineCellColor = (ctx, startX, startY, xLength, yLength) => {
    let colorCounts = getColorCounts(ctx, startX, startY, xLength, yLength);
    let highest = null;
    let highestCount = 0;
    colorCounts.forEach(color => {
        if (color.count > highestCount) {
            highest = color;
            highestCount = color.count;
        }
    });
    return highest;
}

// const getColorDifference = (color1, color2) => {
//     let rDif = color2.r - color1.r;
//     let gDif = color2.g - color1.g;
//     let bDif = color2.b - color1.b;
//     let rSq = Math.pow(rDif, 2);
//     let gSq = Math.pow(gDif, 2);
//     let bSq = Math.pow(bDif, 2);
// }

const getColorCounts = (ctx, startX, startY, xLength, yLength) => {
    let colorCounts = [];
    // let colorDifs = [];
    for (let y = startY; y < (startY + yLength); y++) {
        for (let x = startX; x < (startX + xLength); x++) {

            let pixel = ctx.getImageData(x,y,1,1);
            let data = pixel.data;
            let r = data[0];
            let g = data[1];
            let b = data[2];
            let a = data[3] / 255;
            let rgba = `rgba(${r}, ${g}, ${b}, ${a})`;

            let doesExist = false;
            for (let i = 0; i < colorCounts.length; i++) {
                //////////////
                // colorDifs.push(getColorDifference(colorCounts[i], {
                //     rgba: rgba,
                //     r: r,
                //     g: g,
                //     b: b,
                //     a: a,
                //     count: 1
                // }));
                //////////////
                if (colorCounts[i].rgba === rgba) {
                    doesExist = true;
                    colorCounts[i].count++;
                    break;
                }
            }
            
            if (!doesExist) {
                colorCounts.push({
                    rgba: rgba,
                    r: r,
                    g: g,
                    b: b,
                    a: a,
                    count: 1
                });
            }
        }
    }
    return colorCounts;
}

const getColorDifference = (color1, color2) => {
    let R = color1.r - color2.r;
    let G = color1.g - color2.g;
    let B = color1.b - color2.b;
    let r = (color1.r + color2.r) / 2;

    let preC = (2 + r) * Math.pow(R, 2) + 4 * Math.pow(G,2) + 
        (2 + ((255 - r) / 256)) * Math.pow(B,2);
    let C = Math.sqrt(preC);
    return C;
}

export const convertRGBtoXYZ = (color) => {
    let r = color.r / 255;
    let g = color.g / 255;
    let b = color.b / 255;

    // Inverse sRGB Companding
    r = inverseRGOCompanding(r);
    g = inverseRGOCompanding(g);
    b = inverseRGOCompanding(b);

    // multiply by matrix
    r = (0.4124 * r) + (0.3576 * r) + (0.1805 * r);
    g = (0.2126 * g) + (0.7152 * g) + (0.0722 * g);
    b = (0.0193 * b) + (0.1192 * b) + (0.9505 * b);

    return ({
        r: r,
        g: g,
        b: b
    });
}

const inverseRGOCompanding = (value) => {
    let v;
    if (value <= 0.04045) {
        v = value / 12.92;
    } else {
        v = Math.pow((value + 0.055 / 1.055), 2.4);
    }
    return v;
}

