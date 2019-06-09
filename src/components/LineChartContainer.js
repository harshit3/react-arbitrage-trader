import React from 'react';
import { VictoryChart, VictoryLine, VictoryScatter, VictoryAxis } from 'victory';

function LineChartContainer(props) {
    let { data } = props;
    const chartData = [{x: 't10', y: data[10]}, 
        {x: 't9', y: data[9]}, 
        {x: 't8', y: data[8]},
        {x: 't7', y: data[7]},
        {x: 't6', y: data[6]},
        {x: 't5', y: data[5]},
        {x: 't4', y: data[4]},
        {x: 't3', y: data[3]},
        {x: 't2', y: data[2]},
        {x: 't1', y: data[1]},
        {x: 't0', y: data[0]}
    ];

    return (
        <VictoryChart
            height={600}
            width={800}
        >
            <VictoryScatter 
                style={{data: {fill: 'steelblue'}}}
                size={8} 
                data={chartData} 
            />
            <VictoryLine
                style={{
                    data: { stroke: "steelblue", strokeWidth: 5 },
                    labels: {fontSize: '30px' , fill: () => "white"}
                }}
                data={chartData}
                labels={(datum) => datum.y}
            />
            <VictoryAxis
                label="quarter"
                style={{
                    axis: { stroke: "white" },
                    ticks: { stroke: "white", size: 5, },
                    tickLabels: { fontSize: 35, padding:5, fill: "white" }
                }} 
            />
        </VictoryChart>
    ); 
}

export default LineChartContainer;