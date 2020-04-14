import { link, drawingGrid } from './htmlElements';

export const download = () => {
  const url = drawingGrid.toDataURL();
  const d = new Date;
  const dateTime = `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()} ${d.getHours()} ${d.getMinutes()}`;
  
  link.setAttribute('href', url);
  link.setAttribute('download', `pixel_editor_image ${dateTime}.png`);

  link.click();
}