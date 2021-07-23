import { ArticlesContextStruct } from './state' 

export enum ActionType {
    AddArticle,
    EditArticle,
    DeleteArticle,
    ArticleList,
    ReadArticle,
    AddComment
    //AddEditBtnState,
}

export interface AddArticle {
    type: ActionType.AddArticle
    payload: ArticlesContextStruct['article']
}

export interface EditArticle {
    type: ActionType.EditArticle
    payload: ArticlesContextStruct['article']
}

export interface DeleteArticle {
    type: ActionType.DeleteArticle
    payload: ArticlesContextStruct['article']['id']
}

export interface ArticleList {
    type: ActionType.ArticleList
    payload: ArticlesContextStruct['posts']
}

export interface ReadArticle {
    type: ActionType.ReadArticle
    payload: ArticlesContextStruct['article']['id']
}

export interface AddComment {
    type: ActionType.AddComment
    payload: ArticlesContextStruct['article']
}

export type BlogActions =    
    AddArticle |
    EditArticle |
    ArticleList |
    DeleteArticle |
    ReadArticle |
    AddComment