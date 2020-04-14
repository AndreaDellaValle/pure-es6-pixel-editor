import config from './config.json';
import {
  drawGrid,
  fillSquare,
  clearCanvas,
  targetSquare,
} from './src/canvas';
import {
  colorBox,
  leftInput,
  rightInput,
  colorPicker,
  downloadBtn,
  drawingGrid,
  sliderCursor,
} from './src/htmlElements';
import {
  pickColor,
  sliderPosition,
  drawPickerColumn,
} from './src/colorPicker';
import { download } from './src/utils';

let currentSliderPositon = 0;
let color = config.defaults.color;
let squaresNumber = config.defaults.squaresNumber;
const canvasSize = config.defaults.canvasSize;

// Set Grid canvas size
drawingGrid.width = canvasSize;
drawingGrid.height = canvasSize;

// Set color picker canvas size
colorPicker.height = canvasSize;

const context = drawingGrid.getContext('2d');

// Draw the grid the first time
drawGrid(context, squaresNumber, canvasSize);

// Draw the picker bar
drawPickerColumn();

// Send the default values even in the css file
document.documentElement.style.setProperty('--color-box-bg', color);
document.documentElement.style.setProperty('--canvas-size', `${canvasSize}px`);

// Put default values
// into the HTML elements
colorBox.innerText = color;
leftInput.value = squaresNumber;
rightInput.value = squaresNumber;

// Handle inputs change
leftInput.onchange = (event) => {
  squaresNumber = event.target.value;
  rightInput.value = event.target.value;
  clearCanvas(context, canvasSize);
  drawGrid(context, parseInt(event.target.value), canvasSize);
}

rightInput.onchange = (event) => {
  squaresNumber = event.target.value;
  leftInput.value = event.target.value;
  clearCanvas(context, canvasSize);
  drawGrid(context, parseInt(event.target.value), canvasSize);
}

// Listen for mouse clicks on the canvas
drawingGrid.addEventListener('click', (event) => { // For some reason mousedown won't work as expected wihtin canvas :-(
  const mouseCoordinates = targetSquare(drawingGrid, event, squaresNumber);
  fillSquare(
    color,
    context,
    canvasSize,
    squaresNumber,
    mouseCoordinates.x,
    mouseCoordinates.y,
  );
});

let mouseDragSlider = undefined;

// TODO This keeps the slider works but needs refactoring
sliderCursor.addEventListener('mousedown', () => {
  mouseDragSlider = true;
  sliderCursor.addEventListener('mousemove', (mouseEvent) => {
    // If the mouse is still pressed
    if (mouseDragSlider === true) {
      // Update slider color and position
      currentSliderPositon = sliderPosition(mouseEvent);
      const newColor = pickColor(colorPicker, currentSliderPositon);
      
      // Spread the new color and position to the HMTL and CSS
      color = newColor;
      colorBox.innerText = newColor;
      document.documentElement.style.setProperty('--color-box-bg', newColor);
      document.documentElement.style.setProperty('--slider-position', currentSliderPositon);
    }
  });
});

document.addEventListener('mouseup', () => {
  mouseDragSlider = false;
});

// Download the PNG
downloadBtn.addEventListener('click', download);
