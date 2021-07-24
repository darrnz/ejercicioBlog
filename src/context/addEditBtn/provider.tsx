import React, { useReducer } from 'react'
import { AddEditBtnState } from './state'
import { AddEditBtnReducer } from './reducer'
import { ActionType } from './actions'
import AddEditBtnContext from './context'

const AddEditBtnProvider: React.FC = ({ children }) => {

    const [state, dispatch] = useReducer(AddEditBtnReducer, AddEditBtnState)

    const setModalOpen = () => {
        dispatch({
            type: ActionType.ShowModal
        }) 
    }

    const setModalClose = () => {
        dispatch({
            type: ActionType.CloseModal
        })
    }

    const toggleEditMode = () => {
        dispatch({
            type: ActionType.EditModeToggle
        })
    }

    return(
        <AddEditBtnContext.Provider 
            value={{
                showModal: state.showModal,
                editState: state.editState,
                setModalOpen: setModalOpen,
                setModalClose: setModalClose,
                toggleEditMode: toggleEditMode
            }}    
        >
            {children}
        </AddEditBtnContext.Provider>
    )

}

export default AddEditBtnProvider