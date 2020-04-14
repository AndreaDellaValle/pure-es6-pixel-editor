export const drawGrid = (context, squaresNumber, canvasSize) => {
  // Define the step between one line and the other
  const lineGap = (canvasSize / squaresNumber);
  
  // Draw vertical lines
  for (let x = 0; x < (canvasSize + 1); x += lineGap) {
    context.moveTo(x, 0);
    context.lineTo(x, canvasSize);
  }

  // Draw horizontal lines
  for (let y = 0; y < (canvasSize + 1); y += lineGap) {
    context.moveTo(0, y);
    context.lineTo(canvasSize, y);
  }

  // Apply stiles to make them visible
  context.strokeStyle = "#e0e0e0";
  context.stroke();
}

export const targetSquare = (context, mouseEvent, squaresNumber) => {
  const rect = context.getBoundingClientRect();
  // Calculate the mouse position
  // measured from the canvas top left vertex
  const mouseX = (mouseEvent.clientX - rect.x);
  const mouseY = (mouseEvent.clientY - rect.y);
  
  // Calculate the gap from mouse position to the nearest square boundary
  const boundaryGapX = mouseX % (rect.width / squaresNumber);
  const boundaryGapY = mouseY % (rect.height / squaresNumber);

  // Return the top left vertex
  // of the square touched by the mouse
  return {
      x: mouseX - boundaryGapX,
      y: mouseY - boundaryGapY
  };
}

export const fillSquare = (color, context, canvasSize, squaresNumber, x, y) => {
  context.fillStyle = color;
  // Define the size of single square to fill
  const squareSize = (canvasSize / squaresNumber);
  context.fillRect(x, y, squareSize, squareSize);
}

export const clearCanvas = (context, canvasSize) => {
  context.clearRect(0, 0, canvasSize, canvasSize);
  context.beginPath();
}
