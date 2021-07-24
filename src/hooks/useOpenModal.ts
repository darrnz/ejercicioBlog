import { useContext } from 'react'
import BlogContext from '../context/articles/context' 
import AddEditBtnContext from '../context/addEditBtn/context'

function useOpenModal() {

    const { selectArticleToEdit } = useContext(BlogContext)
    const { setModalOpen, setModalClose, showModal, editState, toggleEditMode } = useContext(AddEditBtnContext)
    
    const openModal = () => {
        setModalOpen()
    }

    const closeModal = () => {
        setModalClose()
        selectArticleToEdit(null!)
    }

    const editMode = () => {
        toggleEditMode()
        setModalOpen()
        
    }

    return { 
        openModal,
        closeModal,
        showModal,
        editMode,
        editState
    } as const
}

export default useOpenModal
