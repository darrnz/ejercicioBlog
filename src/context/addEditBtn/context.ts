import { createContext } from 'react'
import { AddEditBtnInterface, AddEditBtnState } from './state'

const AddEditBtnContext = createContext<AddEditBtnInterface>({
    ...AddEditBtnState
})

export default AddEditBtnContext