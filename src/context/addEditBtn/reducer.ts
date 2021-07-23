import { Reducer } from 'react'
import { AddEditBtnActions, ActionType } from './actions'
import { AddEditBtnInterface } from './state'

export const AddEditBtnReducer: Reducer<AddEditBtnInterface, AddEditBtnActions> = (
    state,
    action
) => {
    switch(action.type) {
        case ActionType.ShowModal:
            return {
                ...state,
                showModal: true
            }
        
        case ActionType.CloseModal:
            return {
                ...state,
                showModal: false,
            }

        default:
            return state;
    }
}

