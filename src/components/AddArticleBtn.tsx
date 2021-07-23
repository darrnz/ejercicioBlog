import React, { Dispatch, useState, useContext } from 'react'
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles'
import { Fab, useMediaQuery } from '@material-ui/core'
import  EditIcon from '@material-ui/icons/Edit'
import useOpenModal from '../hooks/useOpenModal'
import BlogContext from '../context/articles/context'
import AddEditBtnContext from '../context/addEditBtn/context'
import { AddArticleModal } from '../components/AddArticleModal'

interface Props {
    setAddEditBtnState: Dispatch<React.SetStateAction<boolean>>,
    AddEditBtnState: boolean,
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            position: 'fixed',
            marginTop: 30,
            zIndex: 1,
            left: '90%',
            [theme.breakpoints.down('sm')]: {
                left: '79%',
        }
        },
        fab: {
                [theme.breakpoints.down('sm')]: {
                size:'small'
        }
        }
    }),
);

export const AddArticleBtn = () => {

    const classes = useStyles()
    const themes = useTheme()
    const [hovering, setHovering] = useState(false)
    const [openModal, closeModal, modalStatus] = useOpenModal()
    const isSmallScreen = useMediaQuery(themes.breakpoints.down("sm"));
/*     const buttonProps = {
        size: isSmallScreen ? "small" : "large"
    };
 */
    const handleHover = () => {
        setHovering(!hovering)
    }

    const onClickHandle = (event: React.MouseEvent<SVGSVGElement, MouseEvent> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()
        openModal()
    }
    

    return (
        <div className={classes.root}>
        {
            hovering? 
            <Fab 
                /* {...buttonProps} */
                onMouseLeave={handleHover} 
                variant="extended" 
                color="secondary" 
                aria-label="edit" 
                onClick={onClickHandle} 
                className={classes.fab} >
                Add Article
                
                <EditIcon style={{paddingLeft:'2px'}} onClick={onClickHandle} /> 
            </Fab> 
        :
            <Fab 
            /* {...buttonProps} */
                onMouseEnter={handleHover} 
                color="secondary" 
                aria-label="edit" 
                onClick={onClickHandle} 
                className={classes.fab} >
                <EditIcon style={{paddingLeft:'2px'}} onClick={onClickHandle} /> 
            </Fab>
        }
        </div>
    )
}
