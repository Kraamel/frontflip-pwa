import {createMuiTheme} from '@material-ui/core/styles';

export default createMuiTheme({
    palette: {
        primary: {
            main: '#dd362e',
            dark: '#ca342e'
        },
        secondary: {
            light: '#fff',
            main: '#a4c5cb',
            dark: '#8fbac0' /*for shadow*/
        }
    },
    overrides: {
        MuiGrid: { // Name of the component ⚛️ / style sheet
            "spacing-xs-16": { // Name of the rule
                width: "auto",
                margin: "auto",
            },
        },
        MuiButton: {
            "contained" : {
                borderRadius: 30,
                height: "56px"
            },
            "text": {
                borderRadius: 30,
                height: "56px",
                color: "darkgrey",
                ['&:hover'] : {
                    backgroundColor: "transparent",
                    color: "red"
                }
            }
        },
        MuiOutlinedInput: {
            root: {
                marginTop: 0,
                [`& fieldset`]: {
                    borderRadius: 30,
                    [`&:hover`]: {
                        borderColor: 'red'
                    }
                },
                [`&:hover`]: {
                    borderColor: 'red'
                }
            }
        }
    },
    props: {
        MuiButton: {
            variant: "contained"
        },
        MuiInput: {
            margin: "none"
        }
    }
});
