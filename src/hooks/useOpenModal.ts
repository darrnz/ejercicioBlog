import React, { useState, useContext } from 'react'
import useAddEditBtnState from './useAddEditBtnState'
import BlogContext from '../context/articles/context' 
import AddEditBtnContext from '../context/addEditBtn/context'

function useOpenModal() {

    const { article, readArticle } = useContext(BlogContext)
    const { setModalOpen, setModalClose, showModal } = useContext(AddEditBtnContext)
    const [editArticleActive, setEditArticleActive] = useState<boolean>(false)
    const [modalStatus, setModalStatus] = useState(false)
    const [selectedArticle, setSelectedArticle] = useState<string>(null!)

    const openModal = () => {
        setModalOpen()
    }

    const closeModal = () => {
        setModalClose()
        //setEditArticleActive(!editArticleActive)
    }

    const editMode = () => {
        setEditArticleActive(!editArticleActive)
    }

    return [
        openModal,
        closeModal,
        showModal,
        setModalStatus
    ] as const
}

export default useOpenModal
