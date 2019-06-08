import React from 'react';
import { VictoryLine } from 'victory';

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
        <VictoryLine
            style={{
                data: { stroke: "steelblue" },
                labels: {fontSize: '20px' , fill: () => "white"}
            }}
            data={chartData}
            padding={10}
            labels={(datum) => datum.y}
        />
    ); 
}

export default LineChartContainer;