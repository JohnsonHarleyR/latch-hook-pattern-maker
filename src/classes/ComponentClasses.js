export class CellClass {
    constructor(id, cellType, className, fillColor, symbol, xPos, yPos) {
        this.id = id;
        this.cellType = cellType;
        this.className = className;
        this.fillColor = fillColor;
        this.symbol = symbol;
        this.xPos = xPos;
        this.yPos = yPos;
    }
}

export class ColorCellClass extends CellClass {
    constructor(id, cellType, className, fillColor, colorName, symbol) {
        super(id, cellType, className, fillColor, symbol, null, null);
        this.colorName = colorName;
    }
}