import React, { createContext, Dispatch, useReducer, Reducer } from 'react'
import  { ArticlesContextStruct, ArticleStruct, ArticlesList, initialState  } from './state'
import {blogReducer} from './reducer'
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
import { categories } from '../interfaces/interfaces' 
import { BlogContext } from './context'



export const BlogContextProvider: React.FC = ({children}) => {

    const [state, dispatch] = useReducer(blogReducer, initialState)

    const listArticles = async(): Promise<void> => {
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
    }

    const readArticle = (idArticle: string) => {
        dispatch({
            type: ActionType.ReadArticle,
            payload: idArticle
        })
    }

    return(

        <BlogContext.Provider 
            value={{
                posts: state.posts,
                article: state.article,
                addPost: listArticles,
                readArticle: readArticle
            }}>
            {children}
        </BlogContext.Provider>
        
    )

}

