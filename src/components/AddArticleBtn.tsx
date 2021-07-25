import { useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Fab } from '@material-ui/core'
import  EditIcon from '@material-ui/icons/Edit'
import useOpenModal from '../hooks/useOpenModal'

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
    const [hovering, setHovering] = useState(false)
    const { openModal } = useOpenModal()

    const handleHover = () => {
        setHovering(!hovering)
    }

    return (
        <div className={classes.root}>
            {
            hovering? 
            <Fab 
                onMouseLeave={handleHover}
                variant="extended" 
                color="secondary" 
                aria-label="edit" 
                onClick={openModal} 
                className={classes.fab} >
                Add Article
                <EditIcon style={{paddingLeft:'2px'}} onClick={openModal} /> 
            </Fab> 
        :
            <Fab 
                onMouseEnter={handleHover} 
                color="secondary" 
                aria-label="edit" 
                onClick={openModal} 
                className={classes.fab} >
                <EditIcon style={{paddingLeft:'2px'}} onClick={openModal} /> 
            </Fab>
            }
        </div>
    )
}
