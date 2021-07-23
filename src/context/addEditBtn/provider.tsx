import React, { useReducer } from 'react'
import { AddEditBtnInterface, AddEditBtnState } from './state'
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

    return(
        <AddEditBtnContext.Provider 
            value={{
                showModal: state.showModal,
                editArticleMode: state.editArticleMode,
                setModalOpen: setModalOpen,
                setModalClose: setModalClose
            }}    
        >
            {children}
        </AddEditBtnContext.Provider>
    )

}

export default AddEditBtnProvider