export const categories: string[] = [
    'All',
    'Travel',
    'Lifestyle',
    'Business',
    'Food',
    'Work'
]

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