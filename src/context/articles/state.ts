import { ArticleStruct } from '../../interfaces/interfaces' 

export interface ArticlesContextStruct {
    //categories: string[]
    posts: ArticleStruct[]
    article: ArticleStruct
    //AddEditBtnState: boolean
    //editArticleActive: boolean,
    listArticles: () => Promise<void>
    readArticle:(idArticle: string) => void
    addComment: (
        article: ArticlesContextStruct['article'],
        newComment: string,
        author: string
    ) => Promise<void>
    addArticle: (newArticleData: {[x: string]: any} ) => Promise<void>,
    editArticle: (updateArticleData: {[x: string]: any},
    ) => Promise<void>
    //showModal: (toggleAddEdit: boolean) => void
}

export const initialState: ArticlesContextStruct = {
    //categories: categories,
    posts: [],
    article: null!,
    //AddEditBtnState: false,
    //editArticleActive: false,
    listArticles: async() => {},
    readArticle:(id) => {},
    addComment: async() => {},
    addArticle: async() => {},
    editArticle:  async() => {}
    //showModal: (toggleAddEdit) => {}
}

