export interface AddEditBtnInterface {
    showModal: boolean,
    editArticleMode: boolean,
    setModalOpen: () => void,
    setModalClose: () => void
}

export const AddEditBtnState = {
    showModal: false,
    editArticleMode: false,
    setModalOpen: () => {},
    setModalClose: () => {},
}