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
  transparentGradientBoxRight: {
    position: 'absolute',
    right:0,
    top:0,
    width: 24,
    height: '100%',
    // eslint-disable-next-line
    backgroundImage: '-moz-linear-gradient(to right, rgba(205, 207, 229, 0), '+theme.palette.primary.main+')',
    // eslint-disable-next-line
    backgroundImage: '-webkit-gradient(to right, rgba(205, 207, 229, 0), '+theme.palette.primary.main+')',
    // eslint-disable-next-line
    backgroundImage: '-webkit-linear-gradient(to right, rgba(205, 207, 229, 0), '+theme.palette.primary.main+')',
    // eslint-disable-next-line
    backgroundImage: '-o-linear-gradient(to right, rgba(205, 207, 229, 0), '+theme.palette.primary.main+')',
    // eslint-disable-next-line
    backgroundImage: '-ms-linear-gradient(to right, rgba(205, 207, 229, 0), '+theme.palette.primary.main+')',
    // eslint-disable-next-line
    backgroundImage: 'linear-gradient(to right, rgba(205, 207, 229, 0), '+theme.palette.primary.main+')',
    zIndex: 2,
  },
  transparentGradientBoxLeft: {
    position: 'absolute',
    left:0,
    top:0,
    width: 24,
    height: '100%',
    // eslint-disable-next-line
    backgroundImage: '-moz-linear-gradient(to right, '+theme.palette.primary.main+', rgba(205, 207, 229, 0))',
    // eslint-disable-next-line
    backgroundImage: '-webkit-gradient(to right, '+theme.palette.primary.main+', rgba(205, 207, 229, 0))',
    // eslint-disable-next-line
    backgroundImage: '-webkit-linear-gradient(to right, '+theme.palette.primary.main+', rgba(205, 207, 229, 0))',
    // eslint-disable-next-line
    backgroundImage: '-o-linear-gradient(to right, '+theme.palette.primary.main+', rgba(205, 207, 229, 0))',
    // eslint-disable-next-line
    backgroundImage: '-ms-linear-gradient(to right, '+theme.palette.primary.main+', rgba(205, 207, 229, 0))',
    // eslint-disable-next-line
    backgroundImage: 'linear-gradient(to right, '+theme.palette.primary.main+', rgba(205, 207, 229, 0))',
    zIndex: 2,
  },
  scrollLeft: {
    left: -64,
  },
  scrollRight: {
    right: -64,
  },
  scrollButton: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    border: 'none',
    color: 'rgba(0, 0, 0, 0.26)',
    fontSize: 45,
    padding: 0,
    overflow: 'hidden',
    minWidth: 0,
    width: 56,
  }
});
