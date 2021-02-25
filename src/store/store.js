import { createStore } from 'redux'; // этот метод из библиотеки redux создаёт новое хранилище состояний
import { CHANGE_NAME, CHANGE_SECOND_NAME } from './constants/actionTypes'
import initialState from './initialState';

// функция reducer принимает в качестве аргументов объект с текущим состоянием и
// экшн - объект с уникальным названием экшена и новым значением "переменной состояния",
// в условной конструкции возвращаем новый объект состояния с изменённым свойством,
// которое мы передали в payload, в зависимости от экшена,
// если в условной конструкции ничего не вернули, то в конце вернуть изначальный стейт,
// это своего рода эвент лисенеры, если проводить аналогии
function reducer(state = initialState, action) {
  if (action.type === CHANGE_NAME) {
    return {
      ...state,
      name: action.payload,
    } // не мутируем текущий объект, а создаём новый, ключевая концепция redux
  }

  if (action.type === CHANGE_SECOND_NAME) {
    return {
      ...state,
      secondName: action.payload
    }
  }

  return state;
}

// создадим хранилище состояний, в котором хранится текущее состояние нашего приложения
// и передадим ему функцию reducer в качестве аргумента,
// и каждый раз когда мы запускаем экшн, с помощью метода dispatch(),
// стор будет вызывать функцию reducer,
// которая распределит дальнейший поток данных, она некая прослойка между стором и экшенами
// в теле этой функции описаны условные конструкции,
// чтобы изменить ту или иную "переменную состояния", в зависимости от названия экшена
// и записать новое значение в стор и выз
export const store = createStore(reducer);
