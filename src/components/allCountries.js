import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Bar } from 'react-chartjs-2';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 1000,
        margin: '0 auto',
        marginTop: 50
    },
    title: {
        textAlign: 'left'
    },

}));


export default function AllCountries() {
    const [globalData, setGlobalData] = useState([]);
    useEffect(() => {
        async function getData() {
            const response = await fetch(
                "https://api.thevirustracker.com/free-api?global=stats"
            );
            let data = await response.json();
            delete data.results[0].source;
            setGlobalData(data.results[0]);
            // setGlobalData(data.results)
        }

        getData();
    }, []);
    // console.log(globalData)

    // useEffect(() => {
    //     async function getData() {
    //         const response = await fetch("https://api.thevirustracker.com/free-api?countryTotals=ALL");
    //         let data = await response.json();

    //         setGlobalData(Object.values(Object.values(data.countryitems)[0]));
    //         console.log(Object.values(Object.values(data.countryitems)[0]))
    //     }
    //     getData();
    // }, [])

    const classes = useStyles();
    return (
        <>

            <div className={classes.root}>
                <center><h2 style={{color:"blue"}}>Chart</h2></center>
                <Bar
                    data={{
                        labels: ['Total Cases', 'Recovered', 'Deaths'],
                        datasets: [
                            {
                                label: 'People',
                                backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
                                data: [globalData.total_cases, globalData.total_recovered, globalData.total_deaths],
                            },
                        ],
                    }}
                    options={{
                        legend: { display: false },
                        title: { display: true, text: `Current state in ` },
                    }}
                />
                {/* <table className={classes.table}>
                <thead>
                    <tr className={classes.title}>
                        <th>Country Name</th>
                        <th>Total Cases</th>
                        <th>Active Cases</th>
                    </tr>
                </thead>
                <tbody>
                    {globalData.map((key, ind) => {
                        return (
                            <tr key={ind}>
                                <th className={classes.title}>
                                    {key.total_active_cases}   another  method for maping through objects
                                </th>
                                <td>
                                    {key.total_cases}
                                </td>
                                <td>
                                    {key.total_active_cases}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table> */}

            </div>
        </>
    );
}
