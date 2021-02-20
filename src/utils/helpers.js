const addDataToLocalStorage = data => localStorage.setItem('to-do-items', JSON.stringify(data));
const getDataFromLocalStorage = () => localStorage.getItem('to-do-items');

export { addDataToLocalStorage, getDataFromLocalStorage };
