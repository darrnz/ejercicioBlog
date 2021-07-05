import React, { useState, Dispatch } from 'react'
import { Link, useLocation, withRouter } from 'react-router-dom';
import { useMediaQuery, Box, Container, Typography, AppBar, Tabs, Tab } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles';
import { categories } from '../interfaces/interfaces'
import { Articles } from './Articles'


interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
    }

interface StateProps {
    headerTabValue: number,
    setHeaderTabValue: Dispatch<React.SetStateAction<number>>,
    setSelectedCategory: Dispatch<React.SetStateAction<string | undefined>>
}

function a11yProps(index: any) {
    return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
    };
}
//backgroundColor: theme.palette.background.paper,
const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        display:'flex',
        flexWrap: 'wrap-reverse', 
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },

    tab: {
        //backgroundColor: '#dbdada',
        fontSize: 20,
        textDecoration:'none',
        textAlign: 'center',
        
        [theme.breakpoints.down('sm')]: {
            textAlign: 'center',
            fontSize: 10,
        },
    },

    tabList: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        margin: '0 30px',
    },
    link:{
        textDecoration:'none',
        width: '100%', 
        color: 'black'
    }
}))

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }    

export const Header = ({headerTabValue, setHeaderTabValue,setSelectedCategory}: StateProps) => {

    const classes = useStyles();
    let query = useQuery()

        

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
            setHeaderTabValue(newValue);
            setSelectedCategory(categories[newValue])
    };
    

    return (
        <Container>
            <Box textAlign='center'>

            <Typography variant='h6' gutterBottom>
                <span style={{fontSize: '40px'}}>[</span>
                Making your Life Easier
                <span style={{fontSize: '40px'}}>]</span>
            </Typography>

            <Typography variant="h2" gutterBottom>
                Discovering the world
            </Typography>
            </Box>
            <Box className={classes.root}>
                <AppBar position="static" color='transparent'>
                    <Tabs 
                        className={classes.tabList}
                        value={headerTabValue} 
                        onChange={handleChange} 
                        aria-label="simple tabs example"
                        variant="scrollable"
                        scrollButtons="off"
                        >
                    {
                        categories.map((category, index) => {
                            
                            return(
                                <Link 
                                    key={index} 
                                    to={`/actividad3/articles?selection=${category}`}  
                                    className={classes.link}
                                    >
                                    <Tab 
                                        label={category} 
                                        className={classes.tab} 
                                        {...a11yProps(index)}></Tab>
                                </Link>  
                            )
                        })
                    }
                    </Tabs>
                </AppBar>
            </Box>
            
        </Container>
    )
}


