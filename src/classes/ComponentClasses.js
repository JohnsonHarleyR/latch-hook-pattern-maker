export class PatternImage {
    constructor(cellPixelWidth, xCount, yCount) {
        this.cellPixelWidth = cellPixelWidth;
        this.xCount = xCount;
        this.yCount = yCount;
        this.cellColors = [];
        this.listOfColors = [];
    }
}

export class CellClass {
    constructor(id, cellType, className, fillColor, symbol, xPos, yPos) {
        this.id = id;
        this.cellType = cellType;
        this.className = className;
        this.fillColor = fillColor;
        this.symbol = symbol;
        this.xPos = xPos;
        this.yPos = yPos;
        this.colorName = "";
        this.symbolColor = "#707070";
    }
}

export class ColorCellClass extends CellClass {
    constructor(id, cellType, className, fillColor, colorName, symbol) {
        super(id, cellType, className, fillColor, symbol, null, null);
        this.colorName = colorName;
        this.count = null;
    }
}

export class PatternCellClass extends CellClass {
    constructor(id, refId, cellType, className, fillColor, symbol, xPos, yPos) {
        super(id, cellType, className, fillColor, symbol, xPos, yPos);
        this.refId = refId;
    }
}