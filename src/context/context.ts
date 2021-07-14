
import React, { createContext, Dispatch, useReducer, Reducer } from 'react'
import  { ArticlesContextStruct, ArticleStruct, ArticlesList, initialState  } from './state'

export const BlogContext = createContext<ArticlesContextStruct>({
    //categories: categories,
    posts: [],
    //article: null!,
    //showAddArticle: false,
    //editArticleActive: false,
    addPost: async() => {}
})