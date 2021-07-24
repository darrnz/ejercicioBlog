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
                showModal: !state.showModal
            }
        
        case ActionType.CloseModal:
            return {
                ...state,
                showModal: !state.showModal,
                editState: false
            }

        case ActionType.EditModeToggle:
            return {
                ...state,
                editState: true
            }

        default:
            return state;
    }
}

