import React, { useReducer } from 'react'
import  { ArticlesContextStruct, initialState  } from './state'
import {blogReducer} from './reducer'
import { ActionType } from './actions'
import BlogContext from './context'

export const BlogContextProvider: React.FC = ({children}) => {

    const [state, dispatch] = useReducer(blogReducer, initialState)

    const listArticles = async(): Promise<void> => {
        try {            
            let responseSer = await fetch('http://localhost:3004/posts')
            let data: ArticlesContextStruct['posts'] = await responseSer.json()
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

    const addComment = async(
        article: ArticlesContextStruct['article'],
        newComment: string,
        author: string
        ) => {
        const articleWithNewComment = await fetch(`http://localhost:3004/posts/${article.id}`, {
            method:'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                title: article.title,
                category: article.category,
                content: article.content,
                imgUrl: article.imgUrl,
                id: article.id,
                author: article.author,
                comments: [...article.comments,{
                    comment: newComment,
                    author: author
                }]
            })
        }).then(res => res.json())
        console.log(articleWithNewComment)
        dispatch({
            type: ActionType.AddComment,
            payload: articleWithNewComment
        })
    }

    const addArticle = async(newArticleData: {[x: string]: any}) => {
        const newArticle = await fetch('http://localhost:3004/posts', {
            method:'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                ...newArticleData
            })
        }).then(res => res.json())

        dispatch({
            type: ActionType.AddArticle,
            payload: newArticle
        })
    }

    const editArticle = async(updateArticleData: {[x: string]: any}) => {
        const { title, content, imgUrl, category } = updateArticleData
        const responseUpdate = await fetch(`http://localhost:3004/posts/${state.article.id}`, {
            method:'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                ...state.article, title, content, imgUrl, category
            })
        }).then(res => res.json())

        dispatch({
            type: ActionType.EditArticle,
            payload: responseUpdate
        })
    }

    const deleteArticle = async(idArticle: string) => {
        await fetch(`http://localhost:3004/posts/${idArticle}`, {
            method:'DELETE',
            headers: { 'Content-Type': 'application/json'},
        }).then(res => res.json())
        alert('Article deleted')
        dispatch({
            type: ActionType.DeleteArticle,
            payload: idArticle
        })
    }

/*     const showModal = (toggleAddEdit: boolean) => {
        dispatch({
            type: ActionType.AddEditBtnState,
            payload: toggleAddEdit
        })
    } */

    return(

        <BlogContext.Provider 
            value={{
                posts: state.posts,
                article: state.article,
                //AddEditBtnState: state.AddEditBtnState,
                listArticles: listArticles,
                readArticle: readArticle,
                addComment: addComment,
                addArticle: addArticle,
                editArticle: editArticle, 
                deleteArticle: deleteArticle,
                // showModal: showModal
            }}>
            {children}
        </BlogContext.Provider>
        
    )

}

