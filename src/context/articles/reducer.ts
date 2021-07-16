import { Reducer } from 'react'
import  { ArticlesContextStruct } from './state'
import { ActionType, BlogActions } from './actions'


//buscar type
export const blogReducer: Reducer<ArticlesContextStruct,BlogActions> = (
    state, 
    action
) => {
    switch (action.type) {
        case ActionType.ArticleList:
            return {
                ...state,
                posts: [...action.payload]
            }
    
        case ActionType.ReadArticle:
            return {
                
                ...state,
                article: state.posts.filter(post => post.id === action.payload)[0]
            }

        case ActionType.AddComment:
            console.log(action.payload)
            return {
                ...state,
                article: action.payload
            }
        
        case ActionType.AddArticle:
            return {
                ...state,
                posts: [...state.posts, action.payload]
            }

/*         case ActionType.AddEditBtnState:
            return {
                ...state,
                AddEditBtnState: action.payload
            } */
    
        default:
            return state;
    }
}
