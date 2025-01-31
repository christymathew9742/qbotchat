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
import { BarChart } from '@mui/x-charts/BarChart';

const Skeleton = styled('div')<{ height: number }>(({ theme, height }) => ({
    backgroundColor: theme.palette.action.hover,
    borderRadius: theme.shape.borderRadius,
    height,
    content: '" "',
}));

const Sales = () =>  {
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
                <BarChart
                    series={[
                        { data: [35, 44, 24, 34] },
                        { data: [51, 6, 49, 30] },
                        { data: [15, 25, 30, 50] },
                        { data: [60, 50, 15, 25] },
                    ]}
                    height={290}
                    xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
                    margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                />
            </Grid>
        </Grid>
    )
}

export default Sales

