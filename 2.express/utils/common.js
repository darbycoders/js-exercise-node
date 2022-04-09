export const getPlaceholderStringForArray = (arr) => {
  if (!Array.isArray(arr)) {
      throw new Error('Invalid input');
  }

  // if is array, we'll clone the arr 
  // and fill the new array with placeholders
  const placeholders = [...arr];
  return placeholders.fill('?').join(', ').trim();
}


export const multipleColumnSet = (object) => {
  if (typeof object !== 'object') {
      throw new Error('Invalid input');
  }
  
  const keys = Object.keys(object);
  const values = Object.values(object);

  const columnSet = keys.map(key => `${key} = ?`).join(', ');

  return {
    columnSet,
    values
  }
}