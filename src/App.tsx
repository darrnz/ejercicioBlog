import './App.css';
import { useState, useContext } from 'react'
import { BrowserRouter as Router,Route, Switch, Redirect } from 'react-router-dom'
import { Header }  from './components/Header'
import { AddArticleModal } from './components/AddArticleModal'
import { Articles } from './components/Articles'
import { AddArticleBtn } from './components/AddArticleBtn'
import { ReadArticle } from './components/ReadArticle'
import BlogContext  from './context/articles/context'
import useOpenModal from './hooks/useOpenModal'
//npx json-server --watch db.json --port 3004


function App() {

    const [editArticleActive, setEditArticleActive] = useState<boolean>(false)
    const { article } = useContext(BlogContext)
    const [openModal, closeModal, showModal] = useOpenModal()

    return (
        
            
        <Router>
        
            <AddArticleBtn/>

            {showModal? (<AddArticleModal 
                    setEditArticleActive={setEditArticleActive}
                    editArticleActive={editArticleActive}
                />) : ''
        } 

            {!article ? <Header/> : ''}

            <Switch>
                <Route exact path={`/`} render={() => <Redirect to='/articles?selection=All'/>}/>

                <Route exact path={`/articles`} render={
                    () => <Articles 
                        setEditArticleActive={setEditArticleActive}
                        />}
                />
                    
                <Route exact path={`/articles/:idArticle`} component={ReadArticle} />
            </Switch>
            
    
        </Router>
    
    );
}

export default App;
