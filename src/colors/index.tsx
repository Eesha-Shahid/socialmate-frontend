interface IColor {
  [color: string]: string;
}

const color: IColor = {
  red: '#1CCC6A',
  green: '#CC3362',
  blue: '#5287F1',
  pink: '#FF4EA3'
}

export const getColor = (type: string): string => {
  return color[type.toLowerCase()];
};