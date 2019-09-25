import * as React from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    maxWidth: 1200,
    margin: '0 auto',
  }
}));

function App() {
  const classes = useStyles();

  return (
    <Grid container spacing={3} className={classes.root}>
      <Grid item xs={12}>
        <Typography variant="h2" align="center" gutterBottom>Ethereum DAI {'<-->'} AkropolisOS Bridge</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h3" align="center" gutterBottom>Ethereum to Substrate</Typography>
        Coming soon
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h3" align="center" gutterBottom>Substrate to Ethereum</Typography>
        Coming soon
      </Grid>
    </Grid>
  );
}

export default App;
