import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import Skeleton from "@material-ui/lab/Skeleton";
import CountUp from 'react-countup';

const useStyles = makeStyles({
  root: {
    maxWidth: 1000,
    height: 120,
    margin: "auto",
    marginTop: "50px",
  },
 
  title: {
    fontSize:19,
    color:"blue",
    textTransform:"uppercase",
  },
  pos: {
    marginBottom: 12,
  },
});

export default function GlobalStats() {
  const [globalData, setGlobalData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      const response = await fetch(
        "https://api.thevirustracker.com/free-api?global=stats"
      );
      let data = await response.json();
      delete data.results[0].source;
      setGlobalData(data.results[0]);
      setLoading(false);
    }

    getData();
  }, []);

  const classes = useStyles();
  if (loading === true) {
    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          {Array(9)
            .fill()
            .map((item, index) => (
              <Grid item xs={12} sm={6} md={6} xl={4} key={index}>
                <Skeleton variant="rect" height={118} />
              </Grid>
            ))}
        </Grid>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {Object.keys(globalData).map((key, ind) => {
          return (
            <Grid item xs={12} sm={6} md={6} xl={4} key={ind}>
              <Card className={classes.root}>
                <CardContent>
                  <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {key.replace(/_/g, " ")}
                  </Typography>

                  <Typography variant="h4" component="p">
                    <CountUp end={globalData[key]} separator="," />
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
