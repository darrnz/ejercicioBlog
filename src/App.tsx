import './App.css';
import { useState, useContext, useEffect } from 'react'
import { BrowserRouter as Router,Route, Switch, Redirect } from 'react-router-dom'
import { Header }  from './components/Header'
import { AddArticleModal } from './components/AddArticleModal'
import { Articles } from './components/Articles'
import { AddArticleBtn } from './components/AddArticleBtn'
import { ArticleStruct, ArticlesList } from './interfaces/interfaces'
import { ReadArticle } from './components/ReadArticle'
import {BlogContextProvider} from './context/articles/provider'
import BlogContext  from './context/articles/context'
//npx json-server --watch db.json --port 3004


function App() {

    const [AddEditBtnState, setAddEditBtnState] = useState(false)
    const [selectedArticleToRead, setSelectedArticleToRead] = useState<ArticleStruct>(null!)
    const [articlesResponse, setArticlesResponse] = useState<ArticlesList['posts']>([])
    const [switchAdd, setSwitch] = useState(false)
    const [editArticleActive, setEditArticleActive] = useState<boolean>(false)

    //const { showModal, AddEditBtnState} = useContext(BlogContext)
    
    //console.log(!AddEditBtnState)
    function showModalForm (){
        if(AddEditBtnState) {
            return (<AddArticleModal 
                    setAddEditBtnState={setAddEditBtnState} 
                    AddEditBtnState={AddEditBtnState}
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
        
            <AddArticleBtn 
                setAddEditBtnState={setAddEditBtnState}
                AddEditBtnState={AddEditBtnState} />
            {/*  */}
            
            {showModalForm()}
            
            {selectedArticleToRead == null ? <Header/> : ''}

            <Switch>
                <Route exact path={`/`} render={() => <Redirect to='/articles?selection=All'/>}/>
                <Route exact path={`/articles`} render={
                    () => <Articles 
                        //setAddEditBtnState={setAddEditBtnState}
                        setEditArticleActive={setEditArticleActive}
                        />}
                />
                    
                <Route exact path={`/articles/:idArticle`} render={
                    () => <ReadArticle
                            setSwitch={setSwitch}
                    />}
                />
            </Switch>
            
    
        </Router>
    </BlogContextProvider>
  );
}

export default App;
