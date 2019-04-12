export const styles = theme => ({
  suggestionsContainer: {
    position: 'relative',
    textAlign: 'left',
    overflow: 'hidden',
    overflowX: 'auto',
    width: '100%',
    paddingBottom: 16,
    marginTop: 3,
    scrollbarWidth: 'thin',
    scrollbarColor:  'rgba(0, 0, 0, 0.26) transparent',
  },
  suggestionList: {
    whiteSpace: 'nowrap',
    padding: 0,
    margin:0,
    height: 52,
    listStyleType: 'none',
    paddingLeft: 8,
    paddingRight: 8,
    '& li ': {
      display: 'inline-block',
    }
  },
  suggestion: {
    color: theme.palette.secondary.dark,
  },
  suggestionSelected: {
    backgroundColor: theme.palette.secondary.main + ' !important',
    color: 'white !important',
    '&:hover': {
      backgroundColor: theme.palette.secondary.main + ' !important',
      color: 'white !important',
    }
  },
  animateIn: {
    // opacity: 0,
    transform: 'scale(0)',
    animation: ' 250ms ease-in easeIn',
    animationFillMode: 'forwards',
  },
  animateOut: {
    animation: ' 250ms ease-out easeOut',
    animationFillMode: 'forwards',
  },
  '@keyframes easeOut': {
    from: {
      opacity: 1,
      width: 100,
      transform: 'scale(1)'
    },
    '50%': {
      opacity: 0.5,
      width: 50,
      transform: 'scale(0.30)'
    },
    to: {
      opacity: 0,
      width: 0,
      transform: 'scale(0)'

    }
  },
  '@keyframes easeIn': {
    from: { transform: 'scale(0)' },
    to: { transform: 'scale(1)' }
  },
});
