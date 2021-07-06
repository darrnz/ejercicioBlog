import React, { Dispatch, useState } from 'react'
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles'
import { Fab, useMediaQuery } from '@material-ui/core'
import  EditIcon from '@material-ui/icons/Edit'

interface Props {
    setShowAddArticle: Dispatch<React.SetStateAction<boolean>>
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

export const AddArticleBtn = ({setShowAddArticle}: Props) => {

    const classes = useStyles()
    const themes = useTheme()
    const [hovering, setHovering] = useState(false)

    const isSmallScreen = useMediaQuery(themes.breakpoints.down("sm"));
/*     const buttonProps = {
        size: isSmallScreen ? "small" : "large"
    };
 */
    const handleHover = () => {
        setHovering(!hovering)
    }

    const expandIcon = () => {
        if(hovering === true) {

        }
    }

    const onClickHandle = () => {
        setShowAddArticle(true)
    }

    return (
        <div className={classes.root}>

        {
            hovering? 
            <Fab 
                /* {...buttonProps} */
                onMouseEnter={handleHover} 
                onMouseLeave={handleHover}
                variant="extended" 
                color="secondary" 
                aria-label="edit" 
                onClick={onClickHandle} 
                className={classes.fab} >
                Add Article<EditIcon style={{paddingLeft:'2px'}}   onClick={onClickHandle} /> 
            </Fab> 
        :
            <Fab 
            /* {...buttonProps} */
                onMouseEnter={handleHover} 
                onMouseLeave={handleHover}
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
