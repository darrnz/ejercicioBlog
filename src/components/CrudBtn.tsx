import React, { Dispatch, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { IconButton, Box } from '@material-ui/core'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import BlogContext from '../context/articles/context' 
import { ArticleStruct } from '../interfaces/interfaces';
import useOpenModal from '../hooks/useOpenModal'

interface StateProps {
    setEditArticleActive: Dispatch<React.SetStateAction<boolean>>
    mappedArticle: ArticleStruct
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        deleteEditBtns: {
            textShadow: '2px 2px #161515',
            '&:hover': {
                color: '#363535',
            }
        },
        iconBtnDrw: {
            fontSize: 30,
            padding: 5,
            borderRadius: '50%',
            border: 'solid',
            textShadow: '5px 5px #161515',
            [theme.breakpoints.down('sm')]: {
                fontSize: 30,
                fontWeight: 'bold'
            },
        }
    }),
);

function CrudBtn({ setEditArticleActive, mappedArticle }: StateProps) {
    const classes = useStyles();
    const history = useHistory()
    const [openModal, closeModal, modalStatus] = useOpenModal()
    const { readArticle, deleteArticle } = useContext(BlogContext)
    
    const handleSelectedArticleClick = (
        id:string, 
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>, 
        actions: string
        ) => {
        event.preventDefault()
        readArticle(id)
        if(actions === 'read') {
            history.push(`/articles/${id}`)
        } else {
            openModal()
            setEditArticleActive(true)
        }
    }
    
    return (
        <Box className={classes.deleteEditBtns}>
            <IconButton 
                style={{color: '#e0e0e0', textShadow: '2px 2px #252323'}}
                onClick={(event, actions='read') => handleSelectedArticleClick(mappedArticle.id, event, actions)}
                >
                <InfoOutlinedIcon style={{color: '#e0e0e0'}} className={classes.iconBtnDrw}/>
            </IconButton>
            <IconButton 
                style={{color: '#fff176'}}
                onClick={(event, actions='edit') => handleSelectedArticleClick(mappedArticle.id, event, actions)}
                >
                <EditIcon style={{color: '#fff176'}} className={classes.iconBtnDrw}/>
            </IconButton>
            <IconButton color="secondary"
                onClick={() => deleteArticle(mappedArticle.id) }
                >
                <DeleteOutlineIcon  className={classes.iconBtnDrw}/>
            </IconButton>
        </Box>
    )
}

export default CrudBtn
