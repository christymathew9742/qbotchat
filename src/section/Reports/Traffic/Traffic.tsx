"use client";

import React from "react";
import { useEffect, useState } from "react";
import {
  Divider,
  useMediaQuery,
  Collapse,
  Link,
  LinkProps,
} from "@mui/material";
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';
import { LineChart } from '@mui/x-charts/LineChart';

const Skeleton = styled('div')<{ height: number }>(({ theme, height }) => ({
    backgroundColor: theme.palette.action.hover,
    borderRadius: theme.shape.borderRadius,
    height,
    content: '" "',
}));

const Traffic = () =>  {
    const dataset = [
        { x: 1, y: 2 },
        { x: 2, y: 5.5 },
        { x: 3, y: 2 },
        { x: 5, y: 8.5 },
        { x: 8, y: 1.5 },
        { x: 10, y: 5 },
    ];
    return (
        <Grid container spacing={2}>
            <Grid size={3}>
                <Skeleton height={100} />
            </Grid>
            <Grid size={3}>
                <Skeleton height={100} />
            </Grid>
            <Grid size={3}>
                <Skeleton height={100} />
            </Grid>
            <Grid size={3}>
                <Skeleton height={100} />
            </Grid>

            <Grid size={12} mt={4}>
                <LineChart
                    dataset={dataset}
                    xAxis={[{ dataKey: 'x' }]}
                    series={[{ dataKey: 'y' }]}
                    height={300}
                    margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
                    grid={{ vertical: true, horizontal: true }}
                />
            </Grid>
        </Grid>
    )
}

export default Traffic

