import { ArticleStruct, ArticlesList } from './state' 


export enum ActionType {
    AddArticle,
    AddComment,
    EditArticle,
    ShowAddArticle,
    ReadArticle,
    ArticleList,
    DeleteArticle
}

export interface AddArticle {
    type: ActionType.AddArticle
    payload: ArticleStruct
}

export interface AddComment {
    type: ActionType.AddComment
    payload: ArticleStruct
}

export interface EditArticle {
    type: ActionType.EditArticle
    payload: ArticleStruct
}

export interface ShowAddArticle {
    type: ActionType.ShowAddArticle
    payload: boolean
}

export interface ReadArticle {
    type: ActionType.ReadArticle
    payload: ArticleStruct['id']
}

export interface ArticleList {
    type: ActionType.ArticleList
    payload: ArticlesList['posts']
}

export interface DeleteArticle {
    type: ActionType.DeleteArticle
    payload: { id: string }
}

export type BlogActions =    
    AddArticle |
    AddComment |
    EditArticle |
    ShowAddArticle |
    ReadArticle |
    ArticleList |
    DeleteArticle
