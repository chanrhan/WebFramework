import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend, LineController,Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import Test from "./test.module.css"
import {useEffect, useRef} from "react";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
    // PluginService
);



function ChartJsTest({}){

    return (
        <div className={Test.chart_wrap}>
            <div className={Test.chart_inner}>
                <Line data={data} options={options}/>
            </div>
        </div>

    )
}


const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']; //x축 기준

const options = {
    // line 타입의 경우 중간에 누락된 데이터가 있을 경우 이어그릴지 여부를 정합니다
    spanGaps: true,
    // true면 부모의 container에 맞게 크기가 변함
    responsive: true,
    // (hover) 그래프에 커서를 올렸을 때 나타나는 박스에 대한 옵션
    interaction: {
        mode: 'nearest',  // index, dataset, point, nearest(defalut), x, y
        intersect: false // false면 마우스를 정확히 올리지 않고 가까이 대기만 해도 박스가 나타난다
    },
    // 척도 옵션
    scales: {
        x: {
            grid: { // x축 격자
                display: false
            }
        },
        y: {
            grid: { // y축 격자
                display: false
            }
        }
    },
    plugins: {
        legend: false,
        datalabels: {
            color: 'red',
            anchor: 'end',
            clamp: true,
            clip: true,
            align: '-135',
            offset: 100,
            formatter: function (value, context){
                let result = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                return result + '원'
            },
        },
    },
}

export const data = {
    labels,
    datasets: [
        {
            label: '분류 1', //그래프 분류되는 항목
            data: [19, 27, 13, 40, 25, 26, 37], //실제 그려지는 데이터(Y축 숫자)
            fill: true,
            borderColor: 'rgb(255,0,51)', //그래프 선 color
            backgroundColor: (context)=>{
                const bgColor = [
                    'red',
                    'rgba(255,255,255,0.07)'
                ]
                if(!context.chart.chartArea){
                    return;
                }
                // console.log(context.chart.chartArea)
                const {ctx, data, chartArea: {top, bottom}} = context.chart;
                const gradientBg = ctx.createLinearGradient(0, top, 0, bottom);
                const colorTranches = 1 / (bgColor.length - 1);
                for(let i=0;i < bgColor.length;++i){
                    gradientBg.addColorStop(i*colorTranches, bgColor[i])
                }

                return gradientBg;
            }, //마우스 호버시 나타나는 분류네모 표시 bg, fill=true일 시 선 아래쪽 배경색이 채워진다
            borderWidth: 3
        },
        // {
        //     label: '분류 2',
        //     data: [23, 33, 42, 25, 34, 47, 18],
        //     borderColor: 'rgb(53, 162, 235)', //실제 그려지는 데이터(Y축 숫자)
        //     backgroundColor: 'rgba(53, 162, 235, 0.5)',
        // },
    ],
};

export default ChartJsTest;