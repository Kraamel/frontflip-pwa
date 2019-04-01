import {createMuiTheme} from '@material-ui/core/styles';

export const palette = {
  secondary: {
    light: '#EFA3A0',
    main: '#FF0018',
    dark: '#BA0012',
  },
  primary: {
    main: '#cccfe5',
    dark: '#2b2d3c',
    hover: '#aaacbe',
    contrastText: '#fff',
  },
  background: {
    default: '#f2f2f2',
  }
};

export default createMuiTheme({
  palette: palette,
  typography: {
    useNextVariants: true,
    fontSize: 12,
    fontFamily: [
      '"Open sans"',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  overrides: {
    // General styles
    MuiGrid: {
      "spacing-xs-16": {
        width: "auto",
        margin: "auto",
      },
    },
    MuiTypography: {
      root: {
        // overflow: 'hidden',
      },
      h6: {
        display: 'block',
        padding: 8,
      },
      h5: {
        color: 'white',
        fontWeight: '700',
      },
      h4: {
        color: 'white',
        fontWeight: '400',
      },
      body1: {
        color: 'white',
        fontWeight: '400',
        fontSize: '0.95rem',
      },
      body2: {
        fontWeight: '600',
      }
    },
    // Avatar
    MuiAvatar: {
      img: {
        height: 'auto',
      }
    },
    //Buttons
    MuiButton: {
      root: {
        borderRadius: 30,
        height: "56px",
        fontWeight: "600",
        transition: 'all 250ms',
        padding: '8px 24px',
      },
      disabled: {
        color:palette.primary.hover + '!important'
      },
      contained: {
        '&:hover': {
          backgroundColor: palette.secondary.dark,
          color: 'white',
        }
      },
      text: {
        color: "darkgrey",
        '&:hover': {
          color: 'black',
        }
      }
    },
    MuiIconButton: {
      root: {
        color: '#DDE9EB',
        padding: 8,
      }
    },
    MuiChip: {
      root: {
        padding: '6px 12px',
        fontWeight: '600',
        margin: '16px 8px 4px 8px',
        fontSize: '0.8125rem',
      },
      label: {
        '& div': {
          color: 'white',
          fontSize: '0.8125rem',
        },
        '& div:nth-child(2)': {
          cursor: 'pointer',
          height: 22,
          width: 22,
          borderRadius: '50%'
        }
      },
      colorPrimary: {
        color: palette.primary.dark,
        backgroundColor: palette.primary.main,
        '&:hover': {
          backgroundColor: palette.primary.hover +' !important',
        },
      },
      colorSecondary: {
        color: 'white',
        backgroundColor: palette.primary.dark,
        '&:hover': {
          // color: 'white',
          backgroundColor: palette.primary.hover +' !important'
        },
      },
    },
    MuiBackdrop: {
      root: {
        filter: 'brightness(0) invert(1)',
      },
    },
    //Cards
    MuiCard: {
      root: {
        padding: 0,
        borderRadius: 10,
        margin: 15,
        marginLeft: 0,
        boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
        transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
        '&:hover': {
          boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
        }
      }
    },
    MuiFab: {
      root: {
        transition: 'filter 0.3s cubic-bezier(.25,.8,.25,1)',
        '&:hover': {
          filter: 'brightness(88%)'
        }
      }
    },
    MuiCardActions: {
      root: {
        padding: '0 8px!important',
        display: 'flex',
      }
    },
    MuiCardContent: {
      root: {
        padding: '0 0 8px 8px!important',
        whiteSpace: 'nowrap',
        overflowX: 'scroll',
      }
    },
    MuiCardHeader: {
      root: {
        width: '100%',
        backgroundColor: palette.primary.dark,
      },
      content: {
        display: 'inline-grid',
        textAlign: 'left',
        resize: 'horizontal',
      },
    },
    //Header
    MuiAppBar: {
      root: {
        height: 64,
        maxWidth: '100vw',
        left: '0 !important',
      }
    },
    MuiDrawer: {
      root: {
        height: 64,
      }
    },
    MuiPaper: {
      root: {
        padding: '16px',
      }
    },
    MuiDialog: {
      paper: {
        margin: 16
      }
    },
    //Inputs
    MuiOutlinedInput: {
      root: {
        backgroundColor: 'white',
        borderRadius: 30,
        [`& fieldset`]: {
          borderRadius: 30
        },
      },
      input: {
        borderRadius: 30,
      },
      adornedEnd: {
        paddingRight: 8,
      }
    },
    //List
    MuiList: {
      padding: {
        paddingTop: 0,
        paddingBottom: 0,
      }
    },
    MuiListItem: {
      root: {
        paddingTop: 8,
        paddingBottom: 8,
      },
    },
    // Tabs
    MuiTab: {
      root: {
        fontSize: '0.875rem!important',
        fontWeight: '600',
        '&:hover': {
          color: palette.secondary.main
        },
      },
      labelContainer: {
        padding: '0px!important', // nous permet d'avoir nos espacement de 16px à chaques view
      }
    },
    MuiMobileStepper: {
      dot: {
        backgroundColor: palette.primary.main,
        margin: 8,
      },
      dotActive: {
        transform: 'scale(1.5)',
        backgroundColor: palette.secondary.main
      }
    }
  },
  
  // Props
    props: {
      MuiButton: {
        variant: "contained",
      },
      MuiInput: {
        margin: "none"
      }
    },
  });
