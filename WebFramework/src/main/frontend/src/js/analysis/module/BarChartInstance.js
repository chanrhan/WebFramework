import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    LineElement,
    Title,
    Tooltip,
    Legend, LineController,Filler
} from 'chart.js';
import {Bar, Line} from 'react-chartjs-2';
import {ObjectUtils} from "../../utils/objectUtil";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
    // PluginService
);



export function BarChartInstance({labelName, labels, data, color, hoverColor,
                                     x_axis_disabled, y_axis_disabled,
                                     borderWidth=1, label_disabled, yAxisCallback}){

    if(ObjectUtils.isEmpty(data)){
        return null;
    }

    if(ObjectUtils.isEmpty(labels)){
        labels = new Array(data.length).fill('')
    }

    const chartData = {
        labels,
        datasets: [
            {
                label: labelName, //그래프 분류되는 항목
                data: data, //실제 그려지는 데이터(Y축 숫자)
                fill: true,
                borderColor: `rgb(0,0,0,0)`, //그래프 선 color
                backgroundColor: color,
                hoverBackgroundColor: hoverColor,
                borderRadius: 5,
                borderWidth: borderWidth,
                pointRadius: 1, // 데이터 꼭짓점 동그라미 크기
                pointHoverRadius: 1.2 // 마우스  호버 시 동그라미 크기
            },
        ],
    };

    const options = {
        // line 타입의 경우 중간에 누락된 데이터가 있을 경우 이어그릴지 여부를 정합니다
        spanGaps: true,
        // true면 부모의 container에 맞게 크기가 변함
        responsive: true,
        maintainAspectRatio: false,
        // (hover) 그래프에 커서를 올렸을 때 나타나는 박스에 대한 옵션
        interaction: {
            mode: 'nearest',  // index, dataset, point, nearest(defalut), x, y
            intersect: false // false면 마우스를 정확히 올리지 않고 가까이 대기만 해도 박스가 나타난다
        },
        // 척도 옵션
        scales: {
            x: {
                display: !x_axis_disabled, // x축 표시 여부
                grid: { // x축 격자
                    display: false
                }
            },
            y: {
                display: !y_axis_disabled, // y축 표시 여부
                grid: { // y축 격자
                    display: false
                },
                ticks:{
                    // stepSize: 1,
                    callback: (value)=>{
                        if(yAxisCallback){
                            return yAxisCallback(value)
                        }
                        return value;
                    }
                },
                min: 0
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
            },
            tooltip: {
                enabled: false // 마우스 호버 시 나타나는 툴팁 비활성화
            }
        },
    }

    return (
        <Bar data={chartData} options={options}/>
    )
}




const getChartColor = (color)=>{
    let borderColor = 'rgb(0,0,0)';
    let bgStartColor = 'rgb(33,33,33)'
    switch (color){
        case 'red':
            borderColor = 'rgb(255,39,39)'
            bgStartColor = 'rgb(252,87,87)'
            break;
        case 'blue':
            borderColor = 'rgb(0,72,255)'
            bgStartColor = 'rgb(57,113,253)'
            break;
        case 'grey':
            borderColor = 'rgb(173,173,173)'
            bgStartColor = 'rgb(190,190,190)'
            break;
    }
    return {
        borderColor,
        bgStartColor
    }
}