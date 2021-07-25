import React, { useState } from 'react'
import { Box, Container, Typography, AppBar, Tabs, Tab } from '@material-ui/core'
import { makeStyles, Theme, createMuiTheme, ThemeProvider, responsiveFontSizes } from '@material-ui/core/styles';
import { categories } from '../interfaces/interfaces'
import useHistoryPush from '../hooks/useHistoryPush'

function a11yProps(index: any) {
    return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        display:'flex',
        flexWrap: 'wrap-reverse', 
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        right: 0,
        left:0,
    },
    tab: {
        fontSize: 20,
        textDecoration:'none',
        [theme.breakpoints.down('sm')]: {
            textAlign: 'center',
            fontSize: 12,
        },
        '&:hover': {
            borderBottom: 'solid #888787'
        },
    },
    tabList: {
        margin: '0 30px',
        right: 0,
        alignContent: 'center',
    },
    link:{
        textDecoration:'none',
        width: '100%', 
        color: 'black'
    },
    appbar: {
        display: 'flex', 
        justifyContent: 'center',
        alignContent: 'center'
    },
}))

let theme = createMuiTheme();
theme = responsiveFontSizes(theme); 

export const Header = () => {

    const classes = useStyles();
    const [value, setValue] = useState(0)
    const { pushSearch } = useHistoryPush()

    const handleChangeTab = (event: React.ChangeEvent<{}>, newValue: number) => {
        event.preventDefault()
        setValue(newValue);
    };

    return (
        <ThemeProvider theme={theme}>
        <Container >
            <Box textAlign='center'>

            <Typography variant='h6' gutterBottom style={{color:'#f19225'}}>
                <span style={{fontSize: '40px'}}>[</span>
                Making your Life Easier
                <span style={{fontSize: '40px'}}>]</span>
            </Typography>

            <Typography variant="h2" gutterBottom>
                Discovering the world
            </Typography>
            </Box>
            <Box className={classes.root}>
                <AppBar position="static" color='transparent' className={classes.appbar}>
                    <Tabs 
                        value={value}
                        className={classes.tabList}
                        onChange={handleChangeTab} 
                        aria-label="simple tabs example"
                        variant="scrollable"
                        scrollButtons="on"
                        >
                    {
                        categories.map((category, index) => {
                            
                            return(
                                <Tab 
                                    key={category}
                                    label={category} 
                                    className={classes.tab} 
                                    {...a11yProps(index)}
                                    onClick={()=>pushSearch(category)}
                                    >
                                </Tab>
                            )
                        })
                    }
                    </Tabs>
                </AppBar>
            </Box>
            
        </Container>
        </ThemeProvider>
    )
}


