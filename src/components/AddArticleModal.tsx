import React, { Dispatch, useState, useEffect } from 'react'
import { Modal, FormControl, Select, MenuItem ,InputLabel, Typography, InputAdornment, TextField , Container, Button, Grid, Box } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { useForm, Controller } from "react-hook-form"
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
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    //const [category, setCategory] = useState('')

    const { handleSubmit, control, watch, setValue, formState: { isValid }, getValues } = useForm({mode: "onChange"});
    console.log(watch())

    const handleOnClick = async() => {
        setValue('id', String(Math.floor(Math.random() * 90000) + 10000))
        setValue('author', `User${String(Math.floor(Math.random() * 90000) + 10000)}`)
        setValue('comments', [])
        const { title, author, id, content, comments, imgUrl, category } = getValues()
        hadleModalClose();
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

    const handleEditArticle = async() => {
        const { title, content, imgUrl, category } = getValues()
        setShowAddArticle(false);
        const responseUpdate = await fetch(`http://localhost:3004/posts/${selectedArticleToRead.id}`, {
            method:'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                ...selectedArticleToRead, title, content, imgUrl, category
            })
        }).then(res => res.json())
        console.log(responseUpdate)
        const updatedArticle = articlesResponse.findIndex(article => article.id === responseUpdate.id)
        console.log(updatedArticle)
        articlesResponse[updatedArticle] = responseUpdate
        //console.log(updatedList)
        setArticlesResponse([...articlesResponse])
        hadleModalClose()
    }

    const editArticle = () => {
            const fields = Object.keys(selectedArticleToRead)
            console.log(fields)
            /* fields.forEach((field) => {
                setValue(field, selectedArticleToRead[field])
            })  */
            setValue('title', selectedArticleToRead.title)
            setValue('content', selectedArticleToRead.content)
            setValue('category', selectedArticleToRead.category)
            setValue('imgUrl', selectedArticleToRead.imgUrl)
    }

    useEffect(() => {
        if(editArticleActive) {
            editArticle()
        }
    }, [])
    
    return (
        <Modal
            open={showAddArticle}
            onClose={hadleModalClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-de|scription"
        >
                
            <Container style={modalStyle} className={classes.paper}>

            <Typography component="h1" variant="h5" style={{textAlign:'center', marginTop: '5px'}} >
                {editArticleActive? 'Edita' : 'Agrega'} un artículo
            </Typography>

            <form className={classes.form} onSubmit={editArticleActive? handleSubmit(handleEditArticle) : handleSubmit(handleOnClick)}>
            <Grid spacing={3} container alignItems="center" justify="center" direction="column">
                <Grid item container xs >
                    <Controller 
                        name='title'
                        control={control}
                        render={({ field }) => <TextField
                            {...field}
                            type='text' 
                            placeholder='Escribe el título'
                            fullWidth
                            required
                            label="Escribe el título"
                            defaultValue={selectedArticleToRead?.title}
                            />
                        }
                    />

                    
                </Grid>
                <Grid item container xs> 
                    <Controller 
                        name='content'
                        control={control}
                        render={({ field }) => <TextField
                            {...field}
                            label="Escribe el contenido"
                            type='text' 
                            placeholder='Escribe el contenido'
                            fullWidth
                            required
                            defaultValue={selectedArticleToRead?.content}
                            />
                        }        
                    />
                </Grid>
                <Grid item container xs>
                    <FormControl className={classes.formControl} fullWidth >
                    <InputLabel>Selecciona la categoría</InputLabel>
                        <Controller 
                            name='category'
                            control={control}
                            render={({field}) => <Select
                                defaultValue={selectedArticleToRead?.category} 
                                {...field}
                                required
                                label='Selecciona la categoría'>
                                    {
                                        categories.map((category, index) => <MenuItem key={index} value={category}>{category}</MenuItem>)
                                    }
                                </Select>
                            }
                        />
                    </FormControl>
                </Grid>
                <Grid item container xs>  
                    <Controller 
                        name='imgUrl'
                        control={control}
                        render={({ field }) => <TextField 
                            {...field} 
                            type='text' 
                            placeholder='Agrega el link de la imagen'
                            label='Agrega el link de la imagen'
                            fullWidth
                            InputProps={{
                                endAdornment:<InputAdornment position="end"><LinkIcon/></InputAdornment>
                            }}
                            required
                            defaultValue={selectedArticleToRead?.imgUrl} 
                        />
                    }
                    />
                </Grid>
                <Grid item container lg direction='column' >  
                    <Box  style={{
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
                        
                        {
                            editArticleActive === false ?
                            <Button 
                                type='submit'                        
                                variant="contained" 
                                color="primary"
                                disabled={!isValid}
                            >
                                Guardar
                            </Button>
                        :
                            <Button type='submit'                        
                                variant="contained" 
                                color="primary"
                                disabled={!isValid}
                            >
                                Editar
                            </Button>
                        }
                    </Box> 
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
