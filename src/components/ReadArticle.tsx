import React, { Dispatch, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { Grid, Container, Typography, Button } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { ArticleStruct } from '../interfaces/interfaces'
import { Comments } from './Comments'

export interface Props {
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
  }),
);


export const ReadArticle = ({ selectedArticleToRead, setSwitch, setSelectedArticleToRead }: Props) => {

    const classes = useStyles()
    const history = useHistory()

    const handleClickReturn = () => {
        history.push(`/articles?selection=${selectedArticleToRead?.category}`)
        setSelectedArticleToRead(null!)
    }
    console.log(selectedArticleToRead)

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

                <Comments 
                    selectedArticleToRead={selectedArticleToRead} 
                    setSwitch={setSwitch}
                    setSelectedArticleToRead={setSelectedArticleToRead} 
                />
            </Container>
        </Container>
    )
}
