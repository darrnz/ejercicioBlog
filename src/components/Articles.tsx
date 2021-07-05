import React, { useEffect, useState, Dispatch } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import  { ReadArticle }  from './ReadArticle'
import { categories, ArticleStruct, ArticlesList } from '../interfaces/interfaces'
import { isWidthDown , CircularProgress, Typography, GridList, GridListTile, GridListTileBar, Container, IconButton, Box, Button,ButtonBase } from '@material-ui/core'
import { makeStyles, Theme, createStyles, createMuiTheme} from '@material-ui/core/styles';
import InfoIcon from '@material-ui/icons/Info'
import { blueGrey } from '@material-ui/core/colors';
import ChatIcon from '@material-ui/icons/Chat';

interface StateProps {
    selection: string | null
    selectedCategory: undefined | string
    setSelectedCategory: Dispatch<React.SetStateAction<string | undefined>>
    setSelectedArticleToRead: Dispatch<React.SetStateAction<ArticleStruct>> 
    articlesResponse: ArticlesList['posts']
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
            
        },
        },

        rootGrid: {
            display: 'flex',
            height: 'auto',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            backgroundColor: theme.palette.background.paper,
            marginTop: 30,

        },
        gridList: {
            width: '100%',
            height: 800,
            padding: 10,
            border: 'solid',
            [theme.breakpoints.down('sm')]: {
                flexDirection: 'column',
                flexWrap:'nowrap',
                fontSize: 10,
                alignContent: 'center',
                alignItems: 'center', 
                justifyContent: 'center'
            },
            
        },
        icon: {
            color: 'rgba(255, 255, 255, 0.54)'
        },
        titleBar: {
            background:'none',
            textAlign:'center',
            fontWeight: 'bold',
            marginTop: 60,
            textShadow:'1px 1px black'
        },
        titleFromBar: {
            fontSize: 40,
            width: 'inherit',
            inlineSize: 50,
            //overflow: 'hidden',
            overflowWrap: 'break-word',
            color: '#fff',
            whiteSpace: 'normal',
            lineHeight: 1.4,

            '&:hover':{
                border: 'solid 3px',
                borderColor: 'grey',
                cursor: 'pointer'
            },

            '&:active':{
                color: '#000000',
            },
        },
        gridTile: {
            [theme.breakpoints.down('sm')]: {
                display: 'flex',
                width: 100,
                fontSize: 10,
                border: 'solid'
            },
            
        }
    }),
);

const theme = createMuiTheme({
    props: {
      // withWidth component ⚛️
      MuiWithWidth: {
        // Initial width property
        initialWidth: 'lg', // Breakpoint being globally set 🌎!
      },
    },
  });

//mostrar articulo en ruta independiente
//Json server -> API FAKE

export const Articles = ({ 
    selectedCategory, setSelectedCategory,
    setSelectedArticleToRead,
    selection,
    articlesResponse 
}: StateProps) => {

    const { search } = useLocation();
    const classes = useStyles();
    const history = useHistory()

   // let columns = width === 'xs' || width === 'sm'  ? 1 : 2;

    const match = search.match(/selection=(.*)/);
    const type = match?.[1];
    console.log(selectedCategory)

    useEffect(() => {
        
    }, [articlesResponse])

    const handleSelectedArticleClick = (id:string, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        console.log(articlesResponse)
        event.preventDefault()
        const readArticle = articlesResponse?.filter((article) => article.id === id)
        console.log(readArticle)
        setSelectedArticleToRead(readArticle[0])
        history.push(`/actividad3/articles/${id}`)
    }

    return (

        <Container className={classes.rootGrid}>
            <GridList  cols={1} cellHeight={250} className={classes.gridList} >
            {
                articlesResponse == null ?  
                    <div className={classes.root}>
                        <CircularProgress color="primary"/>
                    </div> 
                :
                    articlesResponse?.filter((article) => {
                        return type === 'All' ? article : article.category === type
                    }).map((article, index) => {
                        return(
                            <GridListTile key={index}  className={classes.gridTile}>
                                <img 
                                    src={article.imgUrl} 
                                    alt='' 
                                />
                                
                                <GridListTileBar 
                                   // className={classes.titleBar}
                                    classes={{title: classes.titleFromBar}}
                                    title={article.title}
                                    titlePosition="top"
                                    /> 
                                        <ButtonBase 
                                            aria-label={`info about ${article.title}`} 
                                            className={classes.icon}
                                            onClick={(event) => handleSelectedArticleClick(article.id, event)}
                                            >
                                            {classes.titleBar}
                                        </ButtonBase>
                                
                                <GridListTileBar
                                    title={article.title}
                                    subtitle={
                                        <>
                                        
                                        {article.comments.length <= 0 ? 
                                            '' : 
                                            <span style={{ fontSize: 15, paddingTop:'2px'  }}>{article.comments.length} <ChatIcon style={{ fontSize: 15 }} /></span> 
                                        }
                                            <br/>
                                        <span style={{ fontSize: 15, paddingTop:'2px' }}>by: {article.author}</span>
                                        </>
                                    }
                                    actionIcon={
                                        <IconButton 
                                            aria-label={`info about ${article.title}`} 
                                            className={classes.icon}
                                            onClick={(event) => handleSelectedArticleClick(article.id, event)}
                                            >
                                            <InfoIcon />
                                        </IconButton>
                                    }
                                />
                            </GridListTile>
                    )
                })
            }
            </GridList>
        </Container>
    )
}
