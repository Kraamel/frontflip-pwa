import React, {Component} from 'react';
import Routes from './Routes';
import {withStyles} from "@material-ui/core";
import {inject, observer} from "mobx-react";
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {AppBar, Button, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, Menu, MenuItem, Toolbar, Typography} from '@material-ui/core';
import {AccountCircle, ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon, Mail as MailIcon, Menu as MenuIcon, MoreVert as MoreIcon, MoveToInbox as InboxIcon} from '@material-ui/icons';
import {BrowserRouter, Link, Redirect, withRouter} from "react-router-dom";
import logoWingzy from './resources/images/wingzy_line_256.png';
import './components/header/header.css';
import AvailabilityToggle from './components/availabilityToggle/AvailabilityToggle';
import {styles} from './App.css.js'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            mobileMoreAnchorEl: null,
            successLogout: false,
            auth: false,
        };
    }
    
    componentDidMount() {
        if (this.props.commonStore.accessToken) {
            this.state.auth = true;
        } else {
            this.state.auth = false;
        }
        if (!this.props.userStore.values.currentUser._id && this.state.auth) {
            this.props.userStore.getCurrentUser();
        }
    }
    
    
    handleProfileMenuOpen = event => {
        this.setState({anchorEl: event.currentTarget});
    };
    
    handleMenuClose = () => {
        this.setState({anchorEl: null});
        this.handleMobileMenuClose();
    };
    
    handleMobileMenuOpen = event => {
        this.setState({mobileMoreAnchorEl: event.currentTarget});
    };
    
    handleMobileMenuClose = () => {
        this.setState({mobileMoreAnchorEl: null});
    };
    
    handleDrawerOpen = () => {
        this.setState({open: true});
    };
    
    handleDrawerClose = () => {
        this.setState({open: false});
    };
    
    handleLogout = () => {
        this.props.authStore.logout()
            .then(this.setState({successLogout: true}));
    };
    
    render() {
        const {anchorEl, mobileMoreAnchorEl} = this.state;
        const isMenuOpen = Boolean(anchorEl);
        const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
        const {auth} = this.state;
        const {classes, theme} = this.props;
        const {open, successLogout} = this.state;
        
        if (successLogout) return <Redirect to='/'/>;
        
        const renderMenu = (
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                transformOrigin={{vertical: 'top', horizontal: 'right'}}
                open={isMenuOpen}
                onClose={this.handleMenuClose}
            >
                <MenuItem onClick={this.handleMenuClose}><Link to='/profile'>Profile</Link></MenuItem>
                <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
            </Menu>
        );
        
        const renderMobileMenu = (
            <Menu
                anchorEl={mobileMoreAnchorEl}
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                transformOrigin={{vertical: 'top', horizontal: 'right'}}
                open={isMobileMenuOpen}
                onClose={this.handleMobileMenuClose}
            >
                <MenuItem onClick={this.handleProfileMenuOpen}>
                    <IconButton color="inherit">
                        <AccountCircle/>
                    </IconButton>
                    <p>Profile</p>
                </MenuItem>
            </Menu>
        );
        
        return (
            <BrowserRouter>
                <div className={classes.root}>
                    <CssBaseline/>
                    <AppBar
                        position="fixed"
                        color="default"
                        className={classNames(classes.appBar, {
                            [classes.appBarShift]: open,
                        })}
                    >
                        <Toolbar>
                            <IconButton style={{padding: 0}}
                                        color="inherit"
                                        aria-label="Open drawer"
                                        onClick={this.handleDrawerOpen}
                                        className={classNames(classes.menuButton, open && classes.hide)}
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                                <Link to='/'>
                                    <img src={logoWingzy} height="70px"/>
                                </Link>
                            </Typography>
                            
                            <div className={classes.grow}/>
                            <div className={classes.sectionDesktop}>
                                <Button variant={"text"} color="inherit">Why Wingzy ?</Button>
                                <Button variant={"text"} color="inherit">Pricing</Button>
                                {auth && (
                                    <IconButton
                                        aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                                        aria-haspopup="true"
                                        onClick={this.handleProfileMenuOpen}
                                        color="inherit"
                                    >
                                        <AccountCircle/>
                                    </IconButton>
                                )}
                                {!auth && (
                                    <Button variant={"text"} color="inherit">Login</Button>
                                )}
                            
                            </div>
                            <div className={classes.sectionMobile}>
                                <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit" style={{padding: 0}}>
                                    <MoreIcon/>
                                </IconButton>
                            </div>
                        </Toolbar>
                    </AppBar>
                    {renderMenu}
                    {renderMobileMenu}
                    
                    <Drawer
                        className={classes.drawer}
                        variant="persistent"
                        anchor="left"
                        open={open}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        <div className={classes.drawerHeader}>
                            <IconButton onClick={this.handleDrawerClose}>
                                {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                            </IconButton>
                        </div>
                        <Divider/>
                        <Button>List of the orgs</Button>
                        <Divider/>
                        
                        <div className={'leftMenu'}>
                            <Typography variant="h6" color="inherit" noWrap>
                                <IconButton
                                    aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                                    aria-haspopup="true"
                                    onClick={this.handleProfileMenuOpen}
                                    color="inherit"
                                >
                                    <AccountCircle/>
                                </IconButton>
                                Info current Org
                            </Typography>
                            
                            <List className={'leftSubmenu'}>
                                {auth && (
                                    <ListItem>
                                        <ListItemText primary="Disponibilité"/>
                                        <ListItemSecondaryAction>
                                            <AvailabilityToggle/>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                )}
                                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                                    <ListItem button key={text}>
                                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
                                        <ListItemText primary={text}/>
                                    </ListItem>
                                ))}
                            </List>
                        </div>
                    </Drawer>
                    
                    <main
                        className={classNames(classes.content, {
                            [classes.contentShift]: open,
                        })}
                    >
                        {/*<div className={classes.drawerHeader}/>*/}
                        <Routes/>
                    </main>
                </div>
            </BrowserRouter>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default inject('commonStore', 'userStore', 'authStore')(
    observer(
        withStyles(styles, {withTheme: true})(
            App
        )
    )
);
