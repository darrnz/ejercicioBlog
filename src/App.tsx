import './App.css';
import { useContext } from 'react'
import { BrowserRouter as Router,Route, Switch, Redirect } from 'react-router-dom'
import { Header }  from './components/Header'
import { AddArticleModal } from './components/AddArticleModal'
import { Articles } from './components/Articles'
import { AddArticleBtn } from './components/AddArticleBtn'
import { ReadArticle } from './components/ReadArticle'
import BlogContext  from './context/articles/context'
import AddEditBtnContext from './context/addEditBtn/context';
//npx json-server --watch db.json --port 3004


function App() {

    const { article } = useContext(BlogContext)
    const { showModal } = useContext(AddEditBtnContext)

    return (
        <Router>
            <AddArticleBtn/>
            {showModal? <AddArticleModal /> : ''} 
            {!article ? <Header/> : ''}
            <Switch>
                <Route 
                    exact path={`/`} 
                    render={() => <Redirect to='/articles?selection=All'/>}
                    />
                <Route 
                    exact path='/articles' 
                    component={Articles}
                    />
                <Route 
                    exact path={`/articles/:idArticle`} 
                    component={ReadArticle} 
                    />
            </Switch>
            
    
        </Router>
    
    );
}

export default App;
