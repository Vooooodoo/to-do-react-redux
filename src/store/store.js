import { createStore } from 'redux'; // Этот метод из библиотеки redux создаёт новое хранилище состояний
import initialState from './initialState';

// Функция reducer принимает в качестве аргументов текущий объект состояния и
// экшн - объект с уникальным названием экшена и новым значением "переменной состояния",
// в условной конструкции возвращаем новый объект состояния с изменённым свойством,
// которое мы передали в payload, в зависимости от экшена,
// если в условной конструкции ничего не вернули, то в конце вернуть изначальный стейт
function reducer(state = initialState, action) {
  if (action.type === 'CHANGE_NAME') {
    return { ... state, name: action.payload}
  }

  if (action.type === 'CHANGE_SECOND_NAME') {
    return { ... state, secondName: action.payload}
  }

  return state;
}

// Создадим хранилище состояний и передадим ему функцию reducer в качестве аргумента,
// и каждый раз когда мы запускаем экшн, с помощью метода dispatch(),
// будет вызываться функция reducer,
// которая распределяет дальнейший поток данных,
// она некая прослойка между стором и экшенами
export const store = createStore(reducer);
