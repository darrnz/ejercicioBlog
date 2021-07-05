import React, { Dispatch, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { Box, Grid, Paper, Container, Typography, Button, TextField } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { ArticleStruct } from '../interfaces/interfaces'

export interface Props {
    selectedCategory : string | undefined
    selectedArticleToRead: ArticleStruct
    setSelectedArticleToRead: Dispatch<React.SetStateAction<ArticleStruct>> 
    setSwitch: Dispatch<React.SetStateAction<boolean>>
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        display:'flex',
        flexDirection:'column',

    },
    backBtn: {
        flexGrow: 1,
        cursor: 'pointer',
        [theme.breakpoints.down('sm')]: {
            fontSize: 10,
        },
        '&:after': {
            content: '""',
            borderStyle: 'solid',
            borderWidth: 2,    
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: '-6px',
            opacity: 0,
            transformOrigin: 'left center',
            transition: 'all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s',
            
        },
        '&:hover': {
            textDecoration: 'underline'
        }
    },
    
    artTitle: {
        height: '30%',
        textAlign: 'center',
        verticalAlign: 'center', 
        alignContent: 'center',
        alignSelf: 'center',
        color: '#ffffff',
        textShadow: '2px 2px #272424',
        paddingTop: 10,
        [theme.breakpoints.down('sm')]: {
            fontSize: 30,
        },
    },
    artAuthor: {
        height: '30%',
        textAlign: 'center',
        verticalAlign: 'center', 
        alignContent: 'center',
        alignSelf: 'center',
        color: '#ffffff',
        textShadow: '2px 2px #272424',
        paddingTop: 10,
        [theme.breakpoints.down('sm')]: {
            fontSize: 15,
        },
    },
    headContainer: {
        backgroundSize: '100% 90%',
        backgroundRepeat:'no-repeat',
        overflow: 'visible',
        height: 500,
        paddingTop: 20,
        opacity: 0.7,
        right:0,
        left: 0,
        marginRight: 0,
        [theme.breakpoints.down('sm')]: {
            backgroundSize: '100% 90%',
            height: 250,
        },
    },
    contentContainer: {
        paddingLeft: 70,
        paddingTop: 40,
        paddingRight: 70,
        marginBottom: 50,
        [theme.breakpoints.down('sm')]: {
            
        },
        
    }, 
    commentsContainer: {
        paddingLeft: '25%',
        paddingTop: 40,
        paddingRight: '25%',
        marginBottom: 50,
    },
    userCommentContainer: {
        backgroundColor: '#ecebeb',
        marginTop: 15,
        padding: 15,
        borderRadius: 4,
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',

    },
    addComment: {
        width: 'auto',
    }
  }),
);


export const ReadArticle = ({ selectedArticleToRead, setSwitch, setSelectedArticleToRead, selectedCategory }: Props) => {

    const { idArticle } = useParams<{ idArticle: string }>()
    const classes = useStyles()
    const history = useHistory()
    const { register, reset, handleSubmit, control, watch, setValue, formState: { isSubmitSuccessful, isDirty,  errors, isValid, dirtyFields }, getValues } = useForm();
    console.log(watch('comment'))

    const handleClickReturn = () => {
        
        history.push(`/articles?selection=${selectedArticleToRead?.category}`)
        setSelectedArticleToRead(null!)
    }

    const addNewComment = async() => {
        setSwitch(true)
        setValue('author', `User${String(Math.floor(Math.random() * 90000) + 10000)}`)
        fetchComment()
        setSwitch(false)
        //selectedArticleToRead?.comments.push()
    }
    console.log(selectedArticleToRead)

    const fetchComment = async() => {
        const { author, comment } = getValues()
        const newComment = await fetch(`http://localhost:3004/posts/${idArticle}`, {
            method:'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                title: selectedArticleToRead.title,
                category: selectedArticleToRead.category,
                content: selectedArticleToRead.content,
                imgUrl: selectedArticleToRead.imgUrl,
                id: selectedArticleToRead.id,
                author: selectedArticleToRead.author,
                comments: [...selectedArticleToRead.comments,{
                    comment: comment,
                    author: author
                }]
            })
        }).then(res => res.json())

        setSelectedArticleToRead({
            ...selectedArticleToRead, 
            comments: [...selectedArticleToRead.comments,{
                comment: comment,
                author: author
            }]
        })
        
    }

    useEffect(() => {
        
    }, [])
    return (
        <Container className={classes.root}>
            <Container className={classes.headContainer} style={{backgroundImage: `url(${selectedArticleToRead && selectedArticleToRead.imgUrl})`}}>
                <Grid container   direction="column" justify="space-evenly" alignItems="stretch">
                    <Grid item xs={12}>
                        <Button className={classes.backBtn} onClick={handleClickReturn}><ArrowBackIcon/><strong>Back to {selectedArticleToRead.category} posts </strong></Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant={'h2'}  className={classes.artTitle}>{selectedArticleToRead.title}</Typography>
                        <Typography variant={'h5'}  className={classes.artAuthor}>By: <i>{selectedArticleToRead.author}</i></Typography>
                    </Grid>
                </Grid>
            </Container>

            <Container style={{backgroundColor: '#d1d1d1'}}>

                <Container className={classes.contentContainer}>
                    <Typography variant='h4'>{selectedArticleToRead.title}</Typography>
                    <Typography variant='body1'>{selectedArticleToRead.content}</Typography>
                </Container>

                <Container id='comments' className={classes.commentsContainer}>   
                    <Typography variant='h5'>Comments</Typography> 
                    <Box display='flex' flexDirection='column' justifyContent='space-between' alignItems='center' >
                        <Box>
                            <Grid container  direction="column" justify="space-around" alignItems="stretch" >
                                {
                                    selectedArticleToRead.comments.map((comment:any, index:any) => {
                                        return(
                                            <>
                                            <Grid  key={ index } item xs={12} className={classes.userCommentContainer}>
                                                <Typography variant={'body2'}  className=''> <i>{comment.author}</i></Typography>
                                                <Typography variant={'body2'}  className=''>{comment.comment}</Typography>
                                            </Grid>
                                            </>
                                        )
                                    })
                                }
                                <Grid item style={{marginTop:'25px'}} >
                                    <form onSubmit={handleSubmit(addNewComment)}>
                                    <TextField
                                        label="Comparte tu opinión"
                                        multiline
                                        rows={1}
                                        placeholder='Comparte tu opinión'
                                        fullWidth
                                        
                                        {...register('comment')}
                                    />
                                    <Button 
                                        style={{marginTop:'15px'}}
                                        type='submit'                        
                                        variant="contained" 
                                        color="primary"
                                        fullWidth
                                        disabled={!isDirty || watch('comment').length === 0}
                                    >Add comment</Button>
                                    </form>
                                </Grid>
                                
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </Container>
        </Container>
    )
}
