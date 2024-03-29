import React, { useContext } from 'react'
import { CircularProgress, Grid, Typography, Box, Button } from '@material-ui/core'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CrudBtn from './CrudBtn'
import ChatIcon from '@material-ui/icons/Chat';
import BlogContext from '../context/articles/context' 
import useUpdateList from '../hooks/useUpdateList'
import useHistoryPush from '../hooks/useHistoryPush'

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
            flexWrap: 'wrap',
            overflow: 'hidden',
            backgroundColor: theme.palette.background.paper,
            marginTop: 30,
            flexDirection: 'row',
            width: '100%',

        },
        gridTile: {
            minWidth: '30%',
            height: 350,
            flex: '1',
            width: '90%',
            display: 'flex',
            overflow:'hidden',
            opacity: 0.8,
            left:0,
            right:0,
            margin:'0 auto',
            [theme.breakpoints.down('sm')]: {
                display: 'flex',
                width: 'auto',
                fontSize: 10,
                minWidth: '80%',
                height: 250,
                '&:hover':{
                    opacity: 'none',
                    '& $imgBackground':{
                        transform: 'none',
                        transition: 'unset',
                    },
                    '& $crudBtn': {
                        display: 'none'
                    }
                },
            },
            '&:hover':{
                opacity: 1,
                '& $imgBackground':{
                    transform: 'scale(1.1)',
                    transition: 'transform 6s cubic-bezier(0.25, 0.45, 0.45, 0.95)',
                },
                '& $crudBtns': {
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
            fontSize: 27,
            top:30,
            paddingBottom: 7,
            textAlign: 'left',
            width: 'inherit',
            overflowWrap: 'break-word',
            color: '#fff',
            whiteSpace: 'normal',
            lineHeight: 1.4,
            textShadow: '2px 2px #252323',
            '&:hover':{
                textDecoration: 'underline'
            },
            [theme.breakpoints.down('sm')]: {
                fontSize: 21,
            },
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
            [theme.breakpoints.down('sm')]: {
                fontSize: 15,
            },
        },
        categoryAndCrud: {
            width: '100%',
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
        }, 
        crudBtns: {
            display: 'none',
            [theme.breakpoints.down('sm')]: {
                display: 'block'
            },
        },
    }),
);

export const Articles = () => {
    
    const classes = useStyles();
    const { posts, readArticle } = useContext(BlogContext)
    const [ UpdateList ] = useUpdateList()
    const { pushArticle, searchURLResult } = useHistoryPush()

    UpdateList()

    const handleSelectedArticleClick = (
        id:string, 
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.preventDefault()
        readArticle(id)
        pushArticle(id)
    }

    return (
        <Grid container className={classes.rootGrid} >
            {
                posts == null ?  
                    <div className={classes.root}>
                        <CircularProgress color="primary"/>
                    </div> 
                :
                posts?.filter((article) => {
                        return searchURLResult === 'All' ? article : article.category === searchURLResult
                    }).map((article, index) => {
                        return(
                            <Grid 
                                item 
                                key={index}
                                lg={8}  
                                className={classes.gridTile}
                                >
                                <div className={classes.imgBackground} style={{backgroundImage: `url(${article && article.imgUrl})`}}/>
                                <Box className={`${classes.titleBar}`}> 
                                    <Button onClick={(event) => handleSelectedArticleClick(article.id, event)}>
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
                                        {
                                        <>
                                            {article.comments.length <= 0 || article.comments === [] ? 
                                                '' : 
                                                <span className={classes.subtitles}>{article.comments.length} 
                                                    <ChatIcon style={{ fontSize: 15 }} /> Comments
                                                </span> 
                                            }
                                        </>
                                        }
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

                                        <Box className={classes.crudBtns}>
                                        <CrudBtn
                                            mappedArticle={article}
                                        />
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
