import { useHistory, useLocation } from 'react-router-dom'

function useHistoryPush() {

    const history = useHistory()
    const  { search } = useLocation()
    const searchURLResult = search.match(/selection=(.*)/)?.[1]

    const pushRedirect = (joinUrl: string) => {
        if(!search) {
            history.push(`/articles?selection=${joinUrl}`)
        } else {
            history.push(`/articles/${joinUrl}`)
        }
        
    }

    return {
        pushRedirect,
        searchURLResult
    } as const
}

export default useHistoryPush

