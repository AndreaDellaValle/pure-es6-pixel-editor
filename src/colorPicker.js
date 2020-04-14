import { colorPicker } from './htmlElements';

export const drawPickerColumn = () => {
  const context = colorPicker.getContext('2d');
  const gradient = context.createLinearGradient(0, 0, 0, colorPicker.height);
  // Define RGB scale
  const colorList = ['#ff0000', '#ff00ff', '#0000ff', '#00ffff', '#00ff00', '#ffff00', '#ff0000'];

  // Create gradient structure
  colorList.forEach((color, index) => {
    gradient.addColorStop((index / (colorList.length - 1)).toFixed(2), color);
  });
  
  // Apply gradient and draw the bar
  context.fillStyle = gradient;
  context.fillRect(0, 0, colorPicker.width, colorPicker.height);
}

export const pickColor = (picker, mousePosition) => {
  const context = picker.getContext('2d');
  // Retrieve info from the selected pixel
  const rgba = context.getImageData(0, mousePosition, 1, 1).data;
  // Translate infos into a HEX color
  const color = rgbToHex(rgba[0], rgba[1], rgba[2]);

  return color;
}

export const sliderPosition = (mouseEvent) => {
  const rect = colorPicker.getBoundingClientRect();
  // Calculate the mouse position
  // measured from the top of the color bar
  const mouseY = (mouseEvent.clientY - rect.y);

  let positionY = undefined;
  // Limit the slider travel
  // within the canvas boundaries
  if (mouseY < 0) {
    positionY = 0;
  } else if (mouseY > (rect.height)) {
    positionY = rect.height - 1;
  } else {
    positionY = mouseY;
  }

  return positionY;
}

const componentToHex = (c) => {
  const hex = c.toString(16);
  
  return hex.length == 1 ? "0" + hex : hex;
}

const rgbToHex = (r, g, b) => {
  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
}
