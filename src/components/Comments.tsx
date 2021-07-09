import React, { Dispatch, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { Box, Grid, Container, Typography, Button, TextField } from '@material-ui/core'
import { useForm} from "react-hook-form";
import { ArticleStruct } from '../interfaces/interfaces'

export interface Props {
    selectedArticleToRead: ArticleStruct
    setSelectedArticleToRead: Dispatch<React.SetStateAction<ArticleStruct>> 
    setSwitch: Dispatch<React.SetStateAction<boolean>>
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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


export const Comments = ({ selectedArticleToRead, setSwitch, setSelectedArticleToRead }: Props) => {

    const { idArticle } = useParams<{ idArticle: string }>()
    const classes = useStyles()
    const { register, handleSubmit, reset, watch, setValue, formState: { isDirty }, getValues } = useForm();
    const randomNum = String(Math.floor(Math.random() * 90000) + 10000)

    const addNewComment = async() => {
        setSwitch(true)
        setValue('author', `User${randomNum}`)
        fetchComment()
        setSwitch(false)
    }

    const fetchComment = async() => {
        const { author, comment } = getValues()
        await fetch(`http://localhost:3004/posts/${idArticle}`, {
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
        reset()
        
    }
    useEffect(() => {
        
    }, [])

    return (
        <Container id='comments' className={classes.commentsContainer}>   
            <Typography variant='h5'>Comments</Typography> 
            <Box display='flex' flexDirection='column' justifyContent='space-between' alignItems='center' >
                <Box>
                    <Grid container  direction="column" justify="space-around" alignItems="stretch" >
                        {
                            selectedArticleToRead.comments.map((comment:any, index:any) => {
                                return(
                                    <>
                                    <Grid  key={randomNum} item xs={12} className={classes.userCommentContainer}>
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
                                defaultValue=''
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
    )
}
