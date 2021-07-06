import React, { useEffect, useState, Dispatch } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { categories, ArticleStruct, ArticlesList } from '../interfaces/interfaces'
import { isWidthDown , CircularProgress, Grid, Typography, GridList, GridListTile, GridListTileBar, Container, IconButton, Box, Button,ButtonBase } from '@material-ui/core'
import { makeStyles, Theme, createStyles, createMuiTheme} from '@material-ui/core/styles';
import ChatIcon from '@material-ui/icons/Chat';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

interface StateProps {
    selectedCategory: string
    articlesResponse: ArticlesList['posts']
    setSelectedCategory: Dispatch<React.SetStateAction<string>>
    setSelectedArticleToRead: Dispatch<React.SetStateAction<ArticleStruct>> 
    setShowAddArticle: Dispatch<React.SetStateAction<boolean>>
    setEditArticleActive: Dispatch<React.SetStateAction<boolean>>
}

const useQuery = () => {
    console.log(useLocation())
    return new URLSearchParams(useLocation().search);
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
            padding: 10,
            border: 'solid',
            [theme.breakpoints.down('sm')]: {
                flexDirection: 'row',
                width: '100%',
                flexWrap:'nowrap',
                fontSize: 10,
                alignContent: 'center',
                alignItems: 'center', 
                justifyContent: 'center'
            },
            
        },
        gridTile: {
            minWidth: '30%',
            height: 350,
            //border: 'solid',
            flex: '1',
            display: 'flex',
            overflow:'hidden',
             opacity: 0.8,
            [theme.breakpoints.down('sm')]: {
                display: 'flex',
                width: 100,
                fontSize: 10,
                border: 'solid'
            },
            '&:hover':{
               opacity: 1,
                '& $imgBackground':{
                    transform: 'scale(1.1)',
                    transition: 'transform 6s cubic-bezier(0.25, 0.45, 0.45, 0.95)',
                },
                '& $crudBtn': {
                    display: 'block'
                }
            },
            position: 'relative',
        },
        icon: {
            color: 'rgba(255, 255, 255, 0.54)'
        },
        titleBar: {
            background:'none',
            marginTop: 60,
            position: 'absolute',
            display: 'flex',
            flexDirection:'column',
            justifyContent: 'flex-end',
            bottom:10,
            top: 0,
            left: 10,
            right: 10,
            alignContent: 'flex-end',
            alignItems: 'flex-start'
        },
        titleFromBar: {
            fontSize: 35,
            top:30,
            paddingBottom: 7,
            textAlign: 'left',
            width: 'inherit',
            overflowWrap: 'break-word',
            color: '#fff',
            whiteSpace: 'normal',
            lineHeight: 1.4,
            textShadow: '1.5px 1.5px #868686',
            '&:hover':{
                textDecoration: 'underline'
            }
        },
        imgBackground: {
            margin: 0,
            padding: 0,
            width: '100%',
            height: '100%',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            top: 0,
            right: 0,
            overflow: 'hidden',
        },
        subtitles: {
            paddingBottom: 3,
            color: '#fff',
            whiteSpace: 'normal',
            fontSize: 20,
            textShadow: '1px 1px #868686',
        },
        crudBtn: {
            //display: 'none',
            color: '#fff',
            textShadow: '2px 2px #474444',
            fontSize: 25,
            '&:hover': {
                color: '#363535',
            }
        },
        categoryAndCrud: {
            width: '100%',
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
        }, 
        infoCrud: {
            fontSize: 25
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
    selectedCategory, 
    setSelectedCategory,
    setSelectedArticleToRead,
    articlesResponse, 
    setShowAddArticle,
    setEditArticleActive 
}: StateProps) => {

    let query = useQuery();
    const { search } = useLocation();
    const classes = useStyles();
    const history = useHistory()
   // let columns = width === 'xs' || width === 'sm'  ? 1 : 2;
    const match = search.match(/selection=(.*)/);
    const type = match?.[1];
    console.log(selectedCategory)
    //const actions: string[] = ['read', 'edit']

    useEffect(() => {
        
    }, [articlesResponse])

    const handleSelectedArticleClick = (id:string, event: React.MouseEvent<HTMLButtonElement, MouseEvent>, actions: string) => {
        console.log(actions)
        event.preventDefault()
        const readArticle = articlesResponse?.filter((article) => article.id === id)
        console.log(readArticle)
        setSelectedArticleToRead(readArticle[0])
        if(actions === 'read') {
            history.push(`/articles/${id}`)
        } else {
            setEditArticleActive(true)
            setShowAddArticle(true)
        }

        
    }

    const handleEditArticle = (id:string, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()

    }
    
    return (

        <Grid  spacing={2} className={classes.rootGrid}>
            
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
                            <Grid 
                                item 
                                key={index}
                                lg={8}  
                                className={classes.gridTile}
                                >
                                <div  className={classes.imgBackground} style={{backgroundImage: `url(${article && article.imgUrl})`}}/>
                                <Box className={`${classes.titleBar}`}> 
                                    <Button onClick={(event, actions='read') => handleSelectedArticleClick(article.id, event, actions)}>
                                        <Typography 
                                            variant='h5' 
                                            className={classes.titleFromBar}
                                            >
                                            {article.title}
                                        </Typography>
                                    </Button>
                                    <Typography
                                        className={classes.subtitles} 
                                        variant='h5' 
                                        >
                                        {<>
                                        
                                        {article.comments.length <= 0 ? 
                                            '' : 
                                            <span className={classes.subtitles}>{article.comments.length} <ChatIcon style={{ fontSize: 15 }} /> Comments</span> 
                                        }
                                        </>}
                                    </Typography>
                                    <Typography
                                        className={classes.subtitles} 
                                        variant='h5' 
                                        >
                                        {article.content.slice(0,75)}...
                                    </Typography>
                                    <Box className={classes.categoryAndCrud}>
                                        <Typography
                                            className={classes.subtitles} 
                                            variant='h5' 
                                            >
                                            {article.category.toUpperCase()}
                                        </Typography>
                                        <Box style={{marginRight: '5px'}}>
                                            <IconButton
                                                onClick={(event, actions='edit') => handleSelectedArticleClick(article.id, event, actions)}
                                                className={classes.crudBtn}>
                                                <EditIcon className={classes.infoCrud}/>
                                            </IconButton>
                                            <IconButton 
                                                className={classes.crudBtn}>
                                                <DeleteOutlineIcon className={classes.infoCrud}/>
                                            </IconButton>
                                        </Box>
                                    </Box>        
                                </Box> 
                            </Grid>
                    )
                })
            }
        </Grid>
    )
}
