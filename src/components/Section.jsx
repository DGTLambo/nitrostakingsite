import React from 'react';
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";
import {classBag} from "../Utils";

const useStyles = makeStyles((theme) => ({
    wrapper: {
        width: "100%",
        display: "grid",
        gridTemplateColumns: "100%",
        gridTemplateRows: "100%",
        position: "relative",
    },
    content: {
        zIndex: "10",
        width: "100%",
        margin: "0 auto",
        maxWidth: "1000px",
    },
    background: {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "flex-end",
    },
    gridSpot: {
        gridColumn: 1,
        gridRow: 1,
    }
}))

export default function Section(props){
    const classes = useStyles();
    return (
        <Box className={classBag(classes.wrapper, props.className)}>
            <Box className={classes.gridSpot} px={2}>
                <Box className={classes.content}>
                    {props.children}
                </Box>
            </Box>
            {props.background && (
                <div className={classBag(classes.background, classes.gridSpot)}>
                    {props.background}
                </div>
            )}
        </Box>
    )
}
