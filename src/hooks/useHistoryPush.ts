import { useHistory, useLocation } from 'react-router-dom'

function useHistoryPush() {

    const history = useHistory()
    const  { search } = useLocation()
    const searchURLResult = search.match(/selection=(.*)/)?.[1]

    const pushSearch = (category: string) => {
            history.push(`/articles?selection=${category}`)
    }

    const pushArticle = (id: string) => {
        history.push(`/articles/${id}`)
    }

    return {
        pushSearch,
        pushArticle,
        searchURLResult
    } as const
}

export default useHistoryPush

