export interface AddEditBtnInterface {
    showModal: boolean
    editState: boolean
    setModalOpen: () => void,
    setModalClose: () => void
    toggleEditMode: () => void
}

export const AddEditBtnState = {
    showModal: false,
    editState: false,
    setModalOpen: () => {},
    setModalClose: () => {},
    toggleEditMode: () => {},
}