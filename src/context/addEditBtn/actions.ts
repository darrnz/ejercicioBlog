export enum ActionType {
    ShowModal,
    EditModeToggle,
    CloseModal
}

export interface ShowModal {
    type: ActionType.ShowModal
}

export interface EditModeToggle {
    type: ActionType.EditModeToggle
}

export interface CloseModal{ 
    type: ActionType.CloseModal
}

export type AddEditBtnActions = ShowModal | EditModeToggle | CloseModal
