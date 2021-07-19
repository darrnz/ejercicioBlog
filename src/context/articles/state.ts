import { ArticleStruct } from '../../interfaces/interfaces' 

export interface ArticlesContextStruct {
    posts: ArticleStruct[]
    article: ArticleStruct
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
    deleteArticle: (idArticle: string) => Promise<void>
    //showModal: (toggleAddEdit: boolean) => void
}

export const initialState: ArticlesContextStruct = {
    posts: [],
    article: null!,
    listArticles: async() => {},
    readArticle:(id) => {},
    addComment: async() => {},
    addArticle: async() => {},
    editArticle:  async() => {},
    deleteArticle: async() => {},

}

