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
    editArticleActive: boolean,
    setEditArticleActive: Dispatch<React.SetStateAction<boolean>>
    selectedArticleToRead: ArticleStruct
    setSelectedArticleToRead: Dispatch<React.SetStateAction<ArticleStruct>> 
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
        asterisk:{
            color: '#f00000'
        }
    }),
);

export const AddArticleModal = ({ 
    setShowAddArticle, showAddArticle, 
    setArticlesResponse, articlesResponse, 
    setEditArticleActive, editArticleActive,
    setSelectedArticleToRead, selectedArticleToRead 
} : Props) => {

    console.log(selectedArticleToRead)
    console.log(editArticleActive)
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    //const [category, setCategory] = useState('');
    const [valueSelect, setValueSelect] = useState('')

    const { register, handleSubmit, control, watch, setValue, formState: { errors, isValid, dirtyFields, isDirty, isSubmitting }, getValues } = useForm({mode: "onChange"});
    console.log(valueSelect)
    console.log(watch())

    const handleChangeSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
        setValueSelect(event.target.value as string);
      };

    const handleOnClick = async() => {
        setValue('id', String(Math.floor(Math.random() * 90000) + 10000))
        setValue('author', `User${String(Math.floor(Math.random() * 90000) + 10000)}`)
        setValue('comments', [])
        setValue('category', valueSelect)
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

    const hadleModalClose = () => {
        setShowAddArticle(false)
        setEditArticleActive(false)
        setSelectedArticleToRead(null!)
    }

    
    return (
        <Modal
            open={showAddArticle}
            onClose={hadleModalClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-de|scription"
        >
                
            <Container style={modalStyle} className={classes.paper}>
            <Typography component="h1" variant="h5" style={{textAlign:'center', marginTop: '5px'}} >
                Agrega un artículo
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit(handleOnClick)}>
            <Grid spacing={3} container alignItems="center" justify="center" direction="column">
                <Grid item container xs >
                    <TextField
                        {...register('title', { required: true })}
                        type='text' 
                        name='title'
                        placeholder='Escribe el título'
                        fullWidth
                        required
                        label="Escribe el título"
                        />
                    
                </Grid>
                <Grid item container xs> 
                    <TextField
                        label="Escribe el contenido"
                        {...register('content', { required: true })}
                        type='text' 
                        name='content'
                        placeholder='Escribe el contenido'
                        fullWidth
                        required
                        />
                </Grid>

                <Grid item container xs>
                    <FormControl className={classes.formControl} fullWidth >
                    <InputLabel>Selecciona la categoría</InputLabel>
                        <Select 
                            value={valueSelect} 
                            required
                            onChange={handleChangeSelect}
                            label='Selecciona la categoría'>
                                {
                                categories.map((category, index) => <MenuItem key={index} value={category}>{category}</MenuItem>)
                                }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item container xs>  
                    <TextField
                        {...register('imgUrl', { required: true })}
                        type='text' 
                        name='imgUrl'
                        placeholder='Agrega el link de la imagen'
                        label='Agrega el link de la imagen'
                        fullWidth
                        InputProps={{
                            endAdornment:<InputAdornment position="end"><LinkIcon/></InputAdornment>
                        }}
                        required
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
                                onClick={hadleModalClose}
                        >
                            Cancelar
                        </Button>
                        
                        {/* {
                            editArticleActive === false ? */}
                            <Button 
                                type='submit'                        
                                variant="contained" 
                                color="primary"
                                disabled={!isValid}
                            >
                                Guardar
                            </Button>
                        {/* :
                            <Button type='submit'                        
                                variant="contained" 
                                color="primary"
                            >
                                Editar
                            </Button>
                        }*/}
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
