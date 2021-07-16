import { categories, ArticleStruct, ArticlesList  } from '../../interfaces/interfaces' 

export interface ArticlesContextStruct {
    //categories: string[]
    posts: ArticleStruct[]
    article: ArticleStruct
    //AddEditBtnState: boolean
    //editArticleActive: boolean,
    addPost: () => Promise<void>
    readArticle:(idArticle: string) => void
    addComment: (
        article: ArticlesContextStruct['article'],
        newComment: string,
        author: string
    ) => Promise<void>
    addArticle: (newArticleData: {[x: string]: any} ) => Promise<void>
    //showModal: (toggleAddEdit: boolean) => void
}

export const initialState: ArticlesContextStruct = {
    //categories: categories,
    posts: [],
    article: null!,
    //AddEditBtnState: false,
    //editArticleActive: false,
    addPost: async() => {},
    readArticle:(id) => {},
    addComment: async() => {},
    addArticle: async() => {},
    //showModal: (toggleAddEdit) => {}
}

