import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(2),
    marginTop: 'auto',
    backgroundColor: 'white',
  },
}));

export default function StickyFooter() {
  const classes = useStyles();
  document.title = '404 PAGE NOT FOUND';
  console.log(window.location.href)
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container component="main" className={classes.main} maxWidth="sm">
        <Typography variant="h2" component="h1" gutterBottom>
          TEKO APP
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          {'404. That\'s an error'}
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          {'The requested URL '} {window.location.href} {' was not found on this server'}
        </Typography>
        <Typography variant="body1">That's all we know</Typography>
      </Container>
    </div>
  );
}