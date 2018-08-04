import viewportSize from "viewport-size";

export const noOfColumn = 8;
export const numberOfRow = 10;
export const moveTime = 700;
export const checkWordTime = 2000;
export const cellSize = 10

export const windowHeight = () => viewportSize.getHeight();
export const windowWidth = () => viewportSize.getWidth();

export const gamebox = {
    width: 400,
    height: 400
}

export const boundary = {
    top: 0,
    bottom: gamebox.height - cellSize + 2,
    left: (windowWidth() / 2) - (gamebox.width / 2),
    right: (windowWidth() / 2) + (gamebox.width / 2) - cellSize,
}

export const blockSize = () => {
    const calculatedSize = (viewportSize.getWidth() - 10) / noOfColumn;
    return calculatedSize < 60 ? calculatedSize : 60;
}


export const COLORS = {
    MOVING: "#8237fb",
    NOTMOVING: "#262723",
    POSSIBLE_WORD: "#32bc4c"
}
