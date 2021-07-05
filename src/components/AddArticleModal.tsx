import React, { Dispatch, useState } from 'react'
import { Modal, FormControl, Input, Select, MenuItem ,InputLabel, Typography, InputAdornment, TextField , Container, Button, Box, Grid, IconButton, Collapse, Checkbox   } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { useForm, Controller } from "react-hook-form"
import CloseIcon from '@material-ui/icons/Close'
import LinkIcon from '@material-ui/icons/Link';
import { categories, ArticleStruct } from '../interfaces/interfaces'

interface Props {
    setShowAddArticle: Dispatch<React.SetStateAction<boolean>>,
    showAddArticle: boolean,
    articlesResponse: ArticleStruct[]
    setArticlesResponse: Dispatch<React.SetStateAction<ArticleStruct[]>>
}

function getModalStyle() {
    const top = 50 
    const left = 50

    return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    };
}
    
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        
        paper: {
            position: 'absolute',
            width: 350,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
        form: {
            width: '100%',
            '& > *': {
                marginTop: theme.spacing(1),
            
            },
        },
        alertroot: {
            width: '100%',
            '& > * + *': {
                marginTop: theme.spacing(2),
            },
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
    }),
);

export const AddArticleModal = ({ setShowAddArticle, showAddArticle, setArticlesResponse, articlesResponse } : Props) => {

    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [category, setCategory] = useState('');


    const { register, handleSubmit, control, watch, setValue, formState: { errors, isValid, dirtyFields, isDirty }, getValues } = useForm();
    console.log(watch())
    const handleOnClick = async() => {
        setValue('id', String(Math.floor(Math.random() * 90000) + 10000))
        setValue('author', `User${String(Math.floor(Math.random() * 90000) + 10000)}`)
        setValue('comments', [])
        const { title, author, id, content, comments, imgUrl, category } = getValues()
        setShowAddArticle(false);
        let newArticle = await fetch('http://localhost:3004/posts', {
            method:'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                title, author, id, content, comments, imgUrl, category
            })
        }).then(res => res.json())

        setArticlesResponse([...articlesResponse, newArticle])
        
    }

    
    return (
        <Modal
            open={showAddArticle}
            onClose={()=> setShowAddArticle(false)}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
                
            <Container style={modalStyle} className={classes.paper}>
            <Typography component="h1" variant="h5" style={{textAlign:'center', marginTop: '5px'}} >
                Agrega un artículo
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit(handleOnClick)}>
            <Grid spacing={3} container alignItems="center" justify="center" direction="column">
                <Grid item container xs >
                    <InputLabel style={{color: '#ff0000'}} required={true} focused={true}/>
                    <TextField
                        
                        {...register('title', { required: true })}
                        type='text' 
                        name='title'
                        placeholder='Escribe el título'
                        fullWidth
                        />
                    
                </Grid>
                <Grid item container xs>
                    <InputLabel style={{color: '#ff0000'}} required={true} focused={true} />    
                    <TextField
                        {...register('content', { required: true })}
                        type='text' 
                        name='content'
                        placeholder='Escribe el contenido'
                        fullWidth
                        />
                </Grid>

                <Grid item container xs>
                    <FormControl className={classes.formControl} fullWidth > 
                        <Controller
                            name='category'
                            control={control}
                            render={({ field }) => 
                                <Select {...field} color="primary" value={category} displayEmpty placeholder='Selecciona la categoría'>
                                        <MenuItem value="" disabled>None</MenuItem>
                                        {
                                        categories.map((category, index) => <MenuItem key={index} value={category}>{category}</MenuItem>)
                                        }
                                </Select>
                            }
                        />
                    </FormControl>
                </Grid>
                <Grid item container xs>
                    <InputLabel style={{color: '#ff0000'}} required={true} focused={true} />    
                    <TextField
                        {...register('imgUrl', { required: true })}
                        type='text' 
                        name='imgUrl'
                        placeholder='Agrega el link de la imagen'
                        fullWidth
                        InputProps={{
                            endAdornment:<InputAdornment position="end"><LinkIcon/></InputAdornment>
                        }}
                        />
                </Grid>
                <Grid item container lg direction='column' >  
                    <div  style={{
                        width:'auto', 
                        display: 'flex', 
                        alignContent: 'space-between', 
                        justifyContent:'space-between',
                        marginBottom: '8px'
                        }}>
                        <Button type='submit'                        
                                variant="contained" 
                                color="secondary"
                                onClick={()=>setShowAddArticle(false)}
                        >
                            Cancelar
                        </Button>
                        
                        <Button type='submit'                        
                                variant="contained" 
                                color="primary"
                                disabled={!isValid}
                        >
                            Guardar
                        </Button>
                    </div>
                    {
                        isValid ?
                        '' :
                        <Typography variant='caption' align="center" color='textSecondary'>
                            <strong>Completa la información para guardar el artículo</strong>
                        </Typography>
                    }
                </Grid>
            </Grid>
            </form>
            </Container>
        </Modal>
    )
}
