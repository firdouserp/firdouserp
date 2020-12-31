import * as React from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Title } from 'react-admin';
import DummyChart from './charts/DummyChart'

export default () => (
    <Card style={{height:'100%'}}>
        <Title title="Welcome to the Firdous ERP" />
        <CardContent><DummyChart/></CardContent>
    </Card>
);