import './App.css';
import { useState, useEffect } from 'react'
import { BrowserRouter as Router,Route, Switch, Redirect } from 'react-router-dom'
import { Header }  from './components/Header'
import { AddArticleModal } from './components/AddArticleModal'
import { Articles } from './components/Articles'
import { AddArticleBtn } from './components/AddArticleBtn'
import { ArticleStruct, ArticlesList } from './interfaces/interfaces'
import { ReadArticle } from './components/ReadArticle'
//npx json-server --watch db.json --port 3004


function App() {

    const [selectedCategory, setSelectedCategory] = useState<string>('All')
    const [showAddArticle, setShowAddArticle] = useState(false)
    const [selectedArticleToRead, setSelectedArticleToRead] = useState<ArticleStruct>(null!)
    const [articlesResponse, setArticlesResponse] = useState<ArticlesList['posts']>([])
    const [switchAdd, setSwitch] = useState(false)
    const [editArticleActive, setEditArticleActive] = useState<boolean>(false)
    console.log(selectedCategory)
    console.log(editArticleActive)

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
        <Router>
        
            <AddArticleBtn setShowAddArticle={setShowAddArticle} />

            {showModalForm()}
            
            {
                selectedArticleToRead == null ? 
                    <Header/> : ''
            }

            <Switch>
                <Route exact path={`/`} render={() => <Redirect to='/articles?selection=All'/>}/>
                <Route exact path={`/articles`} render={
                    () => <Articles 
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        articlesResponse={articlesResponse}
                        setArticlesResponse={setArticlesResponse}
                        setSelectedArticleToRead={setSelectedArticleToRead} 
                        setShowAddArticle={setShowAddArticle}
                        setEditArticleActive={setEditArticleActive}
                        />}
                />
                    
                <Route exact path={`/articles/:idArticle`} component={
                    (props: string) => 
                        <ReadArticle
                                selectedArticleToRead={selectedArticleToRead}
                                setSelectedArticleToRead={setSelectedArticleToRead} 
                                selectedCategory={selectedCategory}
                                setSwitch={setSwitch}
                    />}
                />
            </Switch>
            
    
        </Router>
  );
}

export default App;
