export const categories: string[] = [
    'All',
    'Travel',
    'Lifestyle',
    'Business',
    'Food',
    'Work'
]

export interface ArticleStruct {
    [key: string]: number | string | boolean | undefined | { author: string; comment: string; }[]
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



export type ObjectKeys<T> = 
    T extends object? (keyof T)[]:
    T extends Array<any> | string? string[]:
    never

export interface ObjectConstructor {
    keys<T>(o: T): ObjectKeys<T>
}

export type ArticleStructKeyTypes = keyof ArticleStruct
