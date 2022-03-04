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

export const getRecommendedSize = (imgWidth, imgHeight) => {
    let recommededSizes = [];
    let ratio = imgWidth / imgHeight;
}

export const getRatio = (height, width) => {
    return (height / width).toFixed(2);
}

export const createColorCells = (listOfColors, unusedSymbols, setUnusedSymbols) => {
    let colorCells = [];
    let newNumber = 0;
    let symbolsCopy = [...unusedSymbols];
    listOfColors.forEach(color => {
        let id = `c${newNumber}`;
        let newSymbol;
        if (symbolsCopy.length === 0) {
            newSymbol = "!";
        } else {
            newSymbol = symbolsCopy.pop();
        }
        let newCell = new ColorCellClass(id, "color", "cell", color, color, newSymbol);
        colorCells.push(newCell);
        newNumber++;
    });
    setUnusedSymbols(symbolsCopy);
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

export const narrowListOfColors = (listOfColors, colorDifAllow) => {
    let newList = [];
    listOfColors.forEach(color => {
        let isWithinRange = false;
        for (let i = 0; i < newList.length; i++) {
            if (isWithinColorRange(newList[i], color, colorDifAllow)) {
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

const isWithinColorRange = (color1, color2, colorDifAllow) => {
    let dif = getColorDifference(color1, color2);
    if (dif < colorDifAllow) {
        return true;
    }
    return false;
}

export const setPatternCellInfo = (patternCells, setPatternCells, newColors, listOfColors) => {
    let cellsCopy = [...patternCells];
    for (let y = 0; y < cellsCopy.length; y++) {
        let yRow = cellsCopy[y];
        for (let x = 0; x < yRow.length; x++) {
            let newColor = newColors[y][x].color;
            let colorRef = newColors[y][x].refId;
            let symbol = newColors[y][x].symbol;
            yRow[x].fillColor = newColor;
            yRow[x].refId = colorRef;
            yRow[x].symbol = symbol;
        }
    }
    setPatternCells(cellsCopy);
}

export const setPatternCellInfoSelectorMode = (patternCells, setPatternCells, newColors) => {
    let cellsCopy = [...patternCells];
    for (let y = 0; y < cellsCopy.length; y++) {
        let yRow = cellsCopy[y];
        for (let x = 0; x < yRow.length; x++) {
            let newColor = newColors[y][x].color;
            let colorRef = newColors[y][x].refId;
            let symbol = newColors[y][x].symbol;
            yRow[x].fillColor = newColor;
            yRow[x].refId = colorRef;
            yRow[x].symbol = symbol;
        }
    }
    setPatternCells(cellsCopy);
}

const getNewSymbol = (refId, listOfColors) => {
    listOfColors.forEach(color => {
        if (color.id === refId) {
            return color.symbol;
        }
    })
}

const getColorRef = (color, listOfColors) => {
    for (let i = 0; i < listOfColors.length; i++) {
        if (listOfColors[i].color === color) {
            return listOfColors[i].id;
        }
    }
    return null;
}

const getStartPos = (alignment, fullLength, cellLength, cellCount) => {
    if (alignment === "start") {
        return 0;
    }

    let croppedLength = cellCount * cellLength;
    if (alignment === "end") {
        return fullLength - croppedLength - 1;
    }

    if (alignment === "center") {
        let unusedLength = fullLength - croppedLength;
        let padding = unusedLength / 2;
        return padding - 1;
    }

    return 0;
}

export const getCellColors = (ctx, cellWidth, xCount, yCount, colorDifAllow, 
    xAlign, yAlign, xFullLength, yFullLength, unusedSymbols, setUnusedSymbols) => {
    let symbolsCopy = [...unusedSymbols];
    let cellColors = [];
    let colorList = [];
    let colorListRGB = [];
    let listCount = 0;
    let xStartAdd = getStartPos(xAlign, xFullLength, cellWidth, xCount);
    let yStartAdd = getStartPos(yAlign, yFullLength, cellWidth, yCount);
    for (let y = 0; y < yCount; y++) {
        let startY = y * cellWidth + yStartAdd;
        let yRow = [];
        for (let x = 0; x < xCount; x++) {
            let startX = x * cellWidth + xStartAdd;
            let newColor = determineCellColor(ctx, startX, startY, cellWidth, cellWidth, colorDifAllow);

            // now get the difference with prev
            let similar = null;
            let refId = null;
            let newSymbol = null;
            for (let i = 0; i < colorList.length; i++) {
                let dif = getColorDifference(colorListRGB[i], newColor, colorDifAllow);
                if (dif < colorDifAllow) {
                    newColor = colorListRGB[i];
                    similar = colorList[i];
                    refId = colorList[i].id;
                    newSymbol = colorList[i].symbol;
                    break;
                }
            }
            if (!similar) {
                refId = `c${listCount}`;
                if (symbolsCopy.length === 0) {
                    newSymbol = "!";
                } else {
                    newSymbol = symbolsCopy.pop();
                }
                colorList.push(
                    new ColorCellClass(refId, "color", "cell", 
                    newColor.hex, newColor.rgba, newSymbol)
                );
                colorListRGB.push(newColor);
                listCount++;
            }


            yRow.push({rgba: newColor.rgba, refId: refId, symbol: newSymbol });
        }
        cellColors.push(yRow);
    }
    setUnusedSymbols(symbolsCopy);
    return [cellColors, colorList];
}

export const getClosestColor = (cellColors, newColor) => {
    let leastDif = null;
    let closestColor = null;
    cellColors.forEach(cellColor => {
        let cellRgb = hexToRgb(cellColor.fillColor);
        //let colorDif = getColorDifference(cellRgb, newColor);
        let colorDif = getColorDifferenceDeltaE(cellRgb, newColor);
        if (leastDif === null || colorDif < leastDif) {
            closestColor = {
                color: cellColor.fillColor,
                refId: cellColor.id,
                symbol: cellColor.symbol
            };
            leastDif = colorDif;
        }
    });
    return closestColor;
}

export const getCellColorsSelectMode = (ctx, cellWidth, xCount, yCount, colorDifAllow, 
    xAlign, yAlign, xFullLength, yFullLength, colorCells) => {
    let cellColors = [];
    let xStartAdd = getStartPos(xAlign, xFullLength, cellWidth, xCount);
    let yStartAdd = getStartPos(yAlign, yFullLength, cellWidth, yCount);
    for (let y = 0; y < yCount; y++) {
        let startY = y * cellWidth + yStartAdd;
        let yRow = [];
        for (let x = 0; x < xCount; x++) {
            let startX = x * cellWidth + xStartAdd;
            // get the main color of the cell
            let newColor = determineCellColor(ctx, startX, startY, cellWidth, cellWidth, colorDifAllow);

            // now get the closest cell color
            let closestColor = getClosestColor(colorCells, newColor);
            yRow.push(closestColor);
        }
        cellColors.push(yRow);
    }
    return cellColors;
}

const determineCellColor = (ctx, startX, startY, xLength, yLength, colorDifAllow) => {
    let colorCounts = getColorCounts(ctx, startX, startY, xLength, yLength, colorDifAllow);
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

const getColorCounts = (ctx, startX, startY, xLength, yLength, colorDifAllow) => {
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
            let newCount = {
                rgba: rgba,
                r: r,
                g: g,
                b: b,
                a: a,
                hex: rgbToHex(r,g,b),
                count: 1
            };

            let doesExist = false;
            for (let i = 0; i < colorCounts.length; i++) {
                if (colorCounts[i].rgba === rgba) {
                    doesExist = true;
                    colorCounts[i].count++;
                    break;
                }
                // let colorDif = getColorDifference(colorCounts[i], newCount);
                // if (colorCounts[i].rgba === rgba || 
                //     colorDif < colorDifAllow) {
                //     doesExist = true;
                //     colorCounts[i].count++;
                //     break;
                // }
            }
            
            if (!doesExist) {
                colorCounts.push(newCount);
            }
        }
    }
    return colorCounts;
}

const hexToRgb = (hex) => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

const rgbToHex = (r, g, b) => {
    return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`
}

const componentToHex = (c) => {
    let hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
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

const getColorDifferenceDeltaE = (color1, color2) => {
    let dif = deltaE(color1, color2);
    return dif;
}

const deltaE = (rgbA, rgbB) => {
    let labA = convertRGBtoLAB(rgbA.r, rgbA.g, rgbA.b);
    let labB = convertRGBtoLAB(rgbB.r, rgbB.g, rgbB.b);
    let deltaL = labA[0] - labB[0];
    let deltaA = labA[1] - labB[1];
    let deltaB = labA[2] - labB[2];
    let c1 = Math.sqrt(labA[1] * labA[1] + labA[2] * labA[2]);
    let c2 = Math.sqrt(labB[1] * labB[1] + labB[2] * labB[2]);
    let deltaC = c1 - c2;
    let deltaH = deltaA * deltaA + deltaB * deltaB - deltaC * deltaC;
    deltaH = deltaH < 0 ? 0 : Math.sqrt(deltaH);
    let sc = 1.0 + 0.045 * c1;
    let sh = 1.0 + 0.015 * c1;
    let deltaLKlsl = deltaL / (1.0);
    let deltaCkcsc = deltaC / (sc);
    let deltaHkhsh = deltaH / (sh);
    let i = deltaLKlsl * deltaLKlsl + deltaCkcsc * deltaCkcsc + deltaHkhsh * deltaHkhsh;
    return i < 0 ? 0 : Math.sqrt(i);
  }

export const convertRGBtoLAB = (red, green, blue) => {
    let r = red / 255;
    let g = green / 255;
    let b = blue / 255;

    r = (r > 0.04045) ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
    g = (g > 0.04045) ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
    b = (b > 0.04045) ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
    let x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
    let y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.00000;
    let z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;
    x = (x > 0.008856) ? Math.pow(x, 1/3) : (7.787 * x) + 16/116;
    y = (y > 0.008856) ? Math.pow(y, 1/3) : (7.787 * y) + 16/116;
    z = (z > 0.008856) ? Math.pow(z, 1/3) : (7.787 * z) + 16/116;
    return [(116 * y) - 16, 500 * (x - y), 200 * (y - z)]
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

