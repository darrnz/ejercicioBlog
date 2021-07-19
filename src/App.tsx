import './App.css';
import { useState, useContext } from 'react'
import { BrowserRouter as Router,Route, Switch, Redirect } from 'react-router-dom'
import { Header }  from './components/Header'
import { AddArticleModal } from './components/AddArticleModal'
import { Articles } from './components/Articles'
import { AddArticleBtn } from './components/AddArticleBtn'
import { ReadArticle } from './components/ReadArticle'
import BlogContext  from './context/articles/context'
//npx json-server --watch db.json --port 3004


function App() {

    const [AddEditBtnState, setAddEditBtnState] = useState(false)
    const [editArticleActive, setEditArticleActive] = useState<boolean>(false)

    const { article } = useContext(BlogContext)
    
    //console.log(!AddEditBtnState)
    function showModalForm() {
        if(AddEditBtnState || editArticleActive) {
            return (<AddArticleModal 
                    setAddEditBtnState={setAddEditBtnState} 
                    AddEditBtnState={AddEditBtnState}
                    setEditArticleActive={setEditArticleActive}
                    editArticleActive={editArticleActive}
                />)
        }
            
    }
    console.log(article)

    return (
        
            
        <Router>
        
            <AddArticleBtn 
                setAddEditBtnState={setAddEditBtnState}
                AddEditBtnState={AddEditBtnState} />

            {showModalForm()}
            
            {!article ? <Header/> : ''}

            <Switch>
                <Route exact path={`/`} render={() => <Redirect to='/articles?selection=All'/>}/>

                <Route exact path={`/articles`} render={
                    () => <Articles 
                        setAddEditBtnState={setAddEditBtnState}
                        setEditArticleActive={setEditArticleActive}
                        />}
                />
                    
                <Route exact path={`/articles/:idArticle`} component={ReadArticle} />
            </Switch>
            
    
        </Router>
    
  );
}

export default App;
