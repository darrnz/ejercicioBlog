import React, { Dispatch, useEffect, useContext } from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { Box, Grid, Container, Typography, Button, TextField } from '@material-ui/core'
import { useForm} from "react-hook-form";
import { ArticleStruct } from '../interfaces/interfaces'
import BlogContext  from '../context/articles/context'

export interface Props {
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


export const Comments = ({ setSwitch }: Props) => {

    const { article, addComment } = useContext(BlogContext)
    const classes = useStyles()
    const { register, handleSubmit, reset, watch, setValue, formState: { isDirty }, getValues } = useForm();
    const randomNum = String(Math.floor(Math.random() * 90000) + 10000)

    const addNewComment = async() => {
        setSwitch(true)
        setValue('author', `User${randomNum}`)
        const { author, comment } = getValues()
        addComment(article, comment, author)
        setSwitch(false)
        reset()
    }

    return (
        <Container id='comments' className={classes.commentsContainer}>   
            <Typography variant='h5'>Comments</Typography> 
            <Box display='flex' flexDirection='column' justifyContent='space-between' alignItems='center' >
                <Box>
                    <Grid container  direction="column" justify="space-around" alignItems="stretch" >
                        {
                            article.comments.map((comment:any, index:any) => {
                                return(
                                    <>
                                    <Grid  key={index} item xs={12} className={classes.userCommentContainer}>
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
