import React from 'react'
import Web3 from 'web3'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import {createMuiTheme, withStyles, ThemeProvider} from '@material-ui/core/styles';
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import Homepage from './components/pages/Homepage'
import NitroPage from './components/pages/Nitro'
import DegenNavbar from './components/DegenNavbar'
import About from './components/pages/About'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import DegenFooter from './components/DegenFooter'
import Box from '@material-ui/core/Box'
import {AstroSpace} from "./fonts/AstroSpace";
import MusicProvider from "./components/MusicProvider";
import AlertProvider from "./components/AlertProvider";
import PresalePage from "./components/PreSale";
import NistProvider from "./components/NistProvider";
import {Web3ReactProvider} from "@web3-react/core";

/* CSS Styles */
const useStyles = {
  root: {
    backgroundColor: 'black',
    margin: '0',
    height: '100%',
    width: '100%',
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center top",
    backgroundSize: "100%",
  },
  main: {
    height: '100%',
    minHeight: "100vh",
    margin: '0',
    display: 'flex',
    flexDirection: 'column',
    backgroundSize: "100%",
    backgroundPosition: "bottom",
    backgroundRepeat: "no-repeat",
  },
  navContainer: {
    flex: '0 0 auto',
  },
  contentContainer: {
    marginTop: "50px",
    flex: '1 1 auto',
    display: "flex",
    flexDirection: "column",
  },
  footerContainer: {
    flex: '0 0 auto',
  },
  background: {
    position: 'relative',
    height: '100%',
    width: '100%',
    '& img': {
      position: 'absolute',
      width: "100%",
      left: "0",
    },
  },
  moon: {
    position: 'absolute',
    bottom: "0",
  }
};

const primaryColor = "#DE0000";
const primaryShadow = "0px 0px 10px 3px rgba(222,0,0,0.8),0px 0px 20px 6px rgba(222,0,0,0.5),0px 0px 50px 25px rgba(222,0,0,0.25)"
const secondaryColor = "#00C3E2";
const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: primaryColor,
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: secondaryColor,
      contrastText: '#FFFFFF',
    },
    background: {
      paper: '#120050',
      default: '#00072C'
    },
    success: {
      main: "#0bba0e",
      contrastText: "#FFF",
    }
  },
  shadows: [
      primaryShadow,
  ],
  shape: {
    borderRadius: "2em",
  },
  typography: {
    h1: {
      fontFamily: 'AstroSpace, Arial',
    },
    h2: {
      fontFamily: 'AstroSpace, Arial',
    },
    h3: {
      fontFamily: 'AstroSpace, Arial',
    },
    h4: {
      fontFamily: 'AstroSpace, Arial',
    },
    h5: {
      fontFamily: 'AstroSpace, Arial',
    }
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [AstroSpace],
      },
    },
    MuiButton:{
      root: {
        borderRadius: "2em",
      },
      label: {
        color: "#FFF"
      },
      containedPrimary: {
        boxShadow: `0 0 2px 1px ${primaryColor}, 0 0 10px 3px ${primaryColor}`,
        '&:hover': {
          boxShadow: "none"
        }
      },
      outlinedSecondary: {
        border: `4px solid ${secondaryColor}`,
        '&:hover': {
          border: `4px solid ${secondaryColor}`,
        }
      },
      "&$disabled": {
        boxShadow: "none",
      },
      outlined: {
        borderWidth: "30px"
      }
    }
  },
});

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  async loadUserWallet(){
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] });
  }


  render() {
    const { classes } = this.props;
    const getLibrary = (provider, connector) => {
      return new Web3(provider);
    }
    return (
        <MusicProvider>
            <ThemeProvider theme={theme}>
              <AlertProvider>
                <Web3ReactProvider getLibrary={getLibrary}>
                  <NistProvider>
                      <CssBaseline />
                      <Router>
                          <Container
                              className={classes.main}
                              component="main"
                              maxWidth={false}
                              disableGutters={true}
                          >
                            <Box className={classes.navContainer}>
                              <DegenNavbar>
                              </DegenNavbar>
                            </Box>
                            <Box className={classes.contentContainer}>
                              <Switch>
                                <Route exact path="/" component={Homepage} />
                                <Route exact path="/nitro" component={NitroPage} />
                                <Route exact path="/about" component={About} />
                                <Route exact path="/presale" component={PresalePage}/>
                              </Switch>
                            </Box>
                            <Box className={classes.footerContainer}>
                              <DegenFooter/>
                            </Box>
                          </Container>
                      </Router>
                  </NistProvider>
                </Web3ReactProvider>
              </AlertProvider>
            </ThemeProvider>
      </MusicProvider>
    )
  }
}

export default withStyles(useStyles)(App);
