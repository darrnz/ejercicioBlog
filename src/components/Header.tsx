import React from 'react'
import { Link  as RouterLink, useLocation} from 'react-router-dom';
import { useMediaQuery, Box, Container, Typography, AppBar, Tabs, Tab } from '@material-ui/core'
import { makeStyles, Theme, createMuiTheme, ThemeProvider, responsiveFontSizes } from '@material-ui/core/styles';
import { categories } from '../interfaces/interfaces'

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
        alignItems: 'center'
    },

    tab: {
        fontSize: 20,
        textDecoration:'none',
        textAlign: 'center',
        
        [theme.breakpoints.down('sm')]: {
            textAlign: 'center',
            fontSize: 15,
        },
        '&:hover': {
            borderBottom: 'solid #888787'
        },
    },

    activeTab: {

            borderBottom: 'solid'
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

let theme = createMuiTheme();
theme = responsiveFontSizes(theme); 

export const Header = () => {

    const classes = useStyles();
    const { search } = useLocation();
    const match = search.match(/selection=(.*)/);
    const type = match?.[1];

    const [value, setValue] = React.useState(0)
console.log(value)
    const handleChangeTab = (event: React.ChangeEvent<{}>, newValue: number) => {
        console.log(newValue)
        setValue(newValue);
    };

    return (
        <ThemeProvider theme={theme}>
        <Container>
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
                <AppBar position="static" color='transparent'>
                    <Tabs 
                        value={value}
                        className={classes.tabList}
                        onChange={handleChangeTab} 
                        aria-label="simple tabs example"
                        variant="scrollable"
                        scrollButtons="off"
                        >
                    {
                        categories.map((category, index) => {
                            return(
                                <Tab 
                                    key={category}
                                    label={category} 
                                    className={classes.tab} 
                                    {...a11yProps(index)}
                                    component={RouterLink} 
                                    to={`/articles?selection=${category}`}>
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


