import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import styles from '../../static/css/components/InfoWithPics/InfoWithPics'
import withStyles from "@material-ui/core/styles/withStyles";


class InfoWithPics extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {data, equipmentsSelected, classes} = this.props;

        let result = [];
        if (equipmentsSelected) {
            Object.keys(equipmentsSelected).map(res => {
                result.push(equipmentsSelected[res]._id)
            })
        }

        return (
            <Grid>
                {
                    data ?
                        <Grid className={classes.infoWithPicsMainContainer}>
                            {
                                data.IconName ?
                                    <Grid className={classes.infoWithPicsMarginRight}>
                                        {data.IconName}
                                    </Grid> :
                                    data.name_logo && data.logo ?
                                        <Grid className={classes.infoWithPicsMarginRight}>
                                            <img
                                                style={{
                                                    opacity: equipmentsSelected ? !result.includes(data._id) ? 0.2 : 1 : 1
                                                }}
                                                src={`../../../static/equipments/${data.logo.slice(0, -4)}.svg`}
                                                alt={`${data.name_logo.slice(0, -4)}.svg`}
                                                className={classes.picsSize}
                                            />
                                        </Grid> : null
                            }
                            {
                                data.label || data.summary ?
                                    <Grid className={classes.containerListIcon}>
                                        {
                                            data.label ?
                                                <Grid>
                                                    <h4
                                                        style={{
                                                            margin: 0,
                                                            textDecoration: equipmentsSelected ? !result.includes(data._id) ? 'line-through' : 'none' : 'none',
                                                            opacity: equipmentsSelected ? !result.includes(data._id) ? 0.2 : 1 : 1
                                                        }}
                                                    >
                                                        {data.label}
                                                    </h4>
                                                </Grid> : null
                                        }
                                        {
                                            data.summary ?
                                                <Grid>
                                                    <Typography
                                                        className={classes.infoWithPicsColorText}>{data.summary}</Typography>
                                                </Grid> : null
                                        }
                                    </Grid> : null
                            }
                        </Grid> : null
                }

            </Grid>
        );
    }
}

export default withStyles(styles)(InfoWithPics)
