import React, { useReducer, Reducer } from 'react'
import  { ArticlesContextStruct, ArticlesList, initialState } from './state'
import { 
    ActionType,
    AddArticle,
    AddComment,
    EditArticle,
    ShowAddArticle,
    ReadArticle,
    ArticleList,
    DeleteArticle, 
    BlogActions 
} from './actions'


//buscar type
export const blogReducer: Reducer<ArticlesContextStruct,BlogActions> = (
    state: ArticlesContextStruct, 
    action: BlogActions
) => {

    switch (action.type) {
        case ActionType.ArticleList:
            return {
                ...state,
                posts: [...action.payload]
            }
            
    
        default:
            state;
    }
}


/* export const ListArticles = async() => {

    const [state, dispatch] = useReducer(blogReducer, initialStateContext)
    try {            
        let responseSer = await fetch('http://localhost:3004/posts')
        let data: ArticlesList['posts'] = await responseSer.json()
        dispatch({
            type: ActionType.ArticleList,
            payload: data
        })

    } catch (error) {
        console.log(error)
    }
} */