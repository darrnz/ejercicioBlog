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

export const BlogContext = createContext<{
    state: ArticlesContextStruct,
    dispatch: Dispatch<ArticlesContextStruct>
}>({
    state: initialState,
    dispatch: () => undefined
})

const BlogContextProvider: React.FC = ({children}) => {

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

    return(

        <BlogContext.Provider 
            value={{
                addPost: listArticles
            }}>
            {children}
        </BlogContext.Provider>
        
    )

}

export default BlogContextProvider