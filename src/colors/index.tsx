interface IColor {
  [color: string]: string;
}

const color: IColor = {
  green: '#1CCC6A',
  red: '#CC3362',
  blue: '#5287F1',
  pink: '#FF4EA3',
  grey: '#666666',
  peach: '#D96570',
  lightGrey: '#F3F4F6'
}

export const getColor = (type: string): string => {
  return color[type.toLowerCase()];
};