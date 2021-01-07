import { Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import * as React from "react";
import { Title } from 'react-admin';
import DummyChart from './charts/DummyChart';
import VouchersChart from './charts/VouchersChart';


export default () => (
    <Card style={{ height: '100%' }}>
        <Title title="Welcome to the Firdous ERP" />
        <CardContent>
            <Grid container spacing={6}>
                <Grid item xs={12} md={6}>
                    <DummyChart />
                </Grid>
                <Grid item xs={12} md={6}>
                    <VouchersChart />
                </Grid>
            </Grid>
        </CardContent>
    </Card>
);