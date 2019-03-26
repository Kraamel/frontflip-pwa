const drawerWidth = 300;

export const styles = theme => ({
  root: {
    display: 'flex',
    width: '100%',
    textAlign: 'center',
    position: 'absolute',
  },
  menuLink: {
    minWidth: '130px',
    height: '30px',
    [theme.breakpoints.down('md')] : {
      '&:hover': {
        backgroundColor: 'transparent',
      }
    }
  },
  grow: {
    flexGrow: 1,
  },
  title: {
    lineHeight: '50%',
    [theme.breakpoints.down('sm')] : {
      display : 'none'
    }
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: 'transparent',
    boxShadow: 'none',
    zIndex: '999'
  },
  appBarShift: {
    width: '100%',
    marginLeft: 0,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    backgroundColor: theme.palette.primary.dark,
    width: drawerWidth,
    padding: '0 !important',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  drawerIconButton: {
    padding: 0,
    background: 'white',
    margin: '8px 16px',
  },
  drawerIcon: {
    color: theme.palette.secondary.main,
    fontSize: 40,
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -300,
    padding: 0,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  fixToRight: {
    position: 'absolute',
    right: 0
  },
  leftSubmenuLogo: {
    height: 30,
    width: 30,
    position: 'relative',
    top: '50%',
    transform: 'translateY(-50%)'
  },
  toolbar: {
    padding: 0
  },
  divider: {
    backgroundColor: 'rgba(255,255,255,.12)',
  },
  menuButton: {
    padding: 0,
    cursor: 'pointer',
    height: 48,
    width: 48,
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: 'white',
    }
  },
  logoBorder: {
    backgroundCOlor: 'white',
    border: '2px solid white',
  }
  
});
