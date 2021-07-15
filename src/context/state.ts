import { categories } from '../interfaces/interfaces' 

export interface ArticleStruct {
    title: string,
    content: string,
    category: string,
    comments: {
        author: string,
        comment: string
    }[],
    imgUrl: string,
    author: string,
    id: string
}

export interface ArticlesList {
    posts: ArticleStruct[]
}

export interface ArticlesContextStruct {
    //categories: string[]
    posts: ArticleStruct[]
    article: ArticleStruct
    //showAddArticle: boolean
    //editArticleActive: boolean,
    addPost: () => Promise<void>
    readArticle: (idArticle: string) => void
}

export const initialState: ArticlesContextStruct = {
    //categories: categories,
    posts: [],
    article: null!,
    //showAddArticle: false,
    //editArticleActive: false,
    addPost: async() => {},
    readArticle: (id) => ''
}

