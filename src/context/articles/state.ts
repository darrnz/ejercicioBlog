import { ArticleStruct } from '../../interfaces/interfaces' 

export interface ArticlesContextStruct {
    posts: ArticleStruct[]
    article: ArticleStruct
    articleToEdit: ArticleStruct
    listArticles: () => Promise<void>
    readArticle:(
        idArticle: string
        ) => void
    selectArticleToEdit:(
        idArticle: string
        ) => void
    addComment: (
        article: ArticlesContextStruct['article'],
        newComment: string,
        author: string
        ) => Promise<void>
    addArticle: (
        newArticleData: {[x: string]: any} 
        ) => Promise<void>,
    editArticle: (updateArticleData: {[x: string]: any},
        ) => Promise<void>
    deleteArticle: (
        idArticle: string
        ) => Promise<void>
}

export const initialState: ArticlesContextStruct = {
    posts: [],
    article: null!,
    articleToEdit: null!,
    listArticles: async() => {},
    readArticle:() => {},
    selectArticleToEdit: () => {},
    addComment: async() => {},
    addArticle: async() => {},
    editArticle:  async() => {},
    deleteArticle: async() => {},
}

