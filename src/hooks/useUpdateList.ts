import {  useContext, useEffect } from 'react'
import BlogContext from '../context/articles/context' 

function useUpdateList() {

    const { listArticles } = useContext(BlogContext)

    const UpdateList = () => {
        useEffect(() => {
            listArticles()
        }, [])
    }

    return [
        UpdateList
    ] as const
}

export default useUpdateList
