
import { createContext } from 'react'
import  { ArticlesContextStruct, initialState  } from './state'

const BlogContext = createContext<ArticlesContextStruct>({
    ...initialState
})

export default BlogContext