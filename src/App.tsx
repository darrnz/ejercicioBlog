import './App.css';
import { useState, useEffect, useContext } from 'react'
import { BrowserRouter as Router,Route, Switch, Redirect } from 'react-router-dom'
import { Header }  from './components/Header'
import { AddArticleModal } from './components/AddArticleModal'
import { Articles } from './components/Articles'
import { AddArticleBtn } from './components/AddArticleBtn'
import { ArticleStruct, ArticlesList } from './context/state'
import { ReadArticle } from './components/ReadArticle'
import BlogContextProvider, {BlogContext}  from './context/context'
//npx json-server --watch db.json --port 3004


function App() {

    const [showAddArticle, setShowAddArticle] = useState(false)
    const [selectedArticleToRead, setSelectedArticleToRead] = useState<ArticleStruct>(null!)
    const [articlesResponse, setArticlesResponse] = useState<ArticlesList['posts']>([])
    const [switchAdd, setSwitch] = useState(false)
    const [editArticleActive, setEditArticleActive] = useState<boolean>(false)

    //const { listArticles } = useContext(BlogContext)

    const getArticles = async() => {
        let responseSer = await fetch('http://localhost:3004/posts')
        let data: ArticlesList['posts'] = await responseSer.json()
        setArticlesResponse(data)
    }

    useEffect(() => {
        getArticles()
    }, [switchAdd])

    const showModalForm = () => {
        if(showAddArticle) {
            return (<AddArticleModal 
                        setShowAddArticle={setShowAddArticle} 
                        showAddArticle={showAddArticle}
                        setArticlesResponse={setArticlesResponse}
                        articlesResponse={articlesResponse}
                        setEditArticleActive={setEditArticleActive}
                        editArticleActive={editArticleActive}
                        setSelectedArticleToRead={setSelectedArticleToRead}
                        selectedArticleToRead={selectedArticleToRead}
                    />)
        }
    }

  return (
      <BlogContextProvider>
        <Router>
        
            <AddArticleBtn setShowAddArticle={setShowAddArticle} />

            {showModalForm()}
            
            {selectedArticleToRead == null ? <Header/> : ''}

            <Switch>
                <Route exact path={`/`} render={() => <Redirect to='/articles?selection=All'/>}/>
                <Route exact path={`/articles`} render={
                    () => <Articles 
                        articlesResponse={articlesResponse}
                        setArticlesResponse={setArticlesResponse}
                        setSelectedArticleToRead={setSelectedArticleToRead} 
                        setShowAddArticle={setShowAddArticle}
                        setEditArticleActive={setEditArticleActive}
                        />}
                />
                    
                <Route exact path={`/articles/:idArticle`} render={
                    () => <ReadArticle
                            selectedArticleToRead={selectedArticleToRead}
                            setSelectedArticleToRead={setSelectedArticleToRead} 
                            setSwitch={setSwitch}
                    />}
                />
            </Switch>
            
    
        </Router>
    </BlogContextProvider>
  );
}

export default App;
