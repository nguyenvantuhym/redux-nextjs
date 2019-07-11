import { createStore, applyMiddleware } from 'redux'
import axios from 'axios';
import { composeWithDevTools } from 'redux-devtools-extension'

const exampleInitialState = {
  listItem :[]
}

export const actionTypes = {
  ADD: 'ADD',
  EDIT: 'EDIT',
  DELETE: 'DELETE',
  INIT :'INIT'
}

// REDUCERS
export const reducer = (state = exampleInitialState, action) => {
  switch (action.type) {
    case actionTypes.ADD:
      return ({listItem:[...state.listItem, action.item]})
    case actionTypes.EDIT:
      return {listItem: [...state.listItem.slice(0, action.index),action.item ,...state.listItem.slice(action.index+1)]}
    case actionTypes.DELETE:
            return {listItem: [...state.listItem.slice(0, action.index),...state.listItem.slice(action.index+1)]}
    case actionTypes.INIT:
        return {listItem: action.listItem}
    default:
      return state
  }
}

// ACTIONS
export const addItem = (item) => {
  return { type: actionTypes.ADD, item: item}
}
export const initdata = (listItem) => {
    return { type: actionTypes.INIT, listItem: listItem}
  }
export const editItem = (item, index) => {
  return { type: actionTypes.EDIT, item: item, index: index }
}

export const deleteItem = (index) => {
  return { type: actionTypes.DELETE, index: index }
}


export function initializeStore (initialState = exampleInitialState) {
  return createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware())
  )
}