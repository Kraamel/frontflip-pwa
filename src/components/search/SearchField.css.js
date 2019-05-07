export const styles = theme => ({
  searchContainer: {
    position: 'relative',
    zIndex: 1198,
    border: 'none',
    borderRadius: 4,
    height: 50,
    background: 'rgba(255,255,255,.95)',
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('xs')]: {
      maxWidth: '100%',
    }
  },
  searchFiltersContainer: {
    display: 'flex',
    maxHeight: 42,
    maxWidth: '70%',
    background: 'transparent',
    '& >div': {
      margin: 8,
    },
    overflowX: 'auto',
    flexWrap: 'nowrap',
    overflowY: 'hidden',
    paddingRight: 8,
    borderRadius: 5,
  },
  searchInput: {
    flex: 'auto',
    background: 'transparent',
    outline: 'none',
    border: 'none',
    height: '100%',
    fontSize: '1.1em',
    paddingLeft: 8,
    minWidth: 0,
    cursor: 'pointer',
  },
  searchClear: {
    float: 'right',
    marginTop: 4,
    marginRight: 4,
    height: 40,
    '& svg': {
      color: theme.palette.primary.dark
    }
  }
});
