import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    ArcElement,
    Title,
    Tooltip,
    Legend, LineController,Filler
} from 'chart.js';
import {Bar, Doughnut, Line, Pie} from 'react-chartjs-2';
import {ObjectUtils} from "../../utils/objectUtil";
import DataNotFound from "../../../images/no_data_icon.png"

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler
    // PluginService
);



export function PieChartInstance({labelName, labels, data, color, hoverColor,
                                     x_axis_disabled, y_axis_disabled, borderWidth=1,
                                     label_disabled, yAxisCallback}){

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
                borderColor: `rgb(0, 0, 0)`, //그래프 선 color
                backgroundColor: [
                    '#4781FF',
                    '#4A5BCF',
                  '#7EB1FA',
                  '#C5DCFC',
                ],
                hoverBackgroundColor: hoverColor,
                borderRadius: 0,
                borderWidth: 0,
                // borderDash: [10],
                // borderDashOffset: 1,
                // borderJoinStyle: 'round',
                // borderAlign: 'center',
                // circular: true
                rotation: 360,
                // circumference: 1,
                // spacing: 0,
                weight: 1,
                cutoutPercentage: 70,
                // offset: 1
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
        legend: {

        },
        // 척도 옵션
        scales: {

        },
        plugins: {
            emptyDataPlugin: emptyDataPlugin,
            legend: {
                position: 'bottom',
                maxHeight: 200,
                align: ()=>{
                    if(labels){
                        if(labels.length <= 4){
                            return 'center'
                        }
                    }
                    return 'start'
                },
                labels: {
                    // padding: 10
                }
            },
            datalabels: {
                color: 'black'
            },
            tooltip: {
                enabled: false // 마우스 호버 시 나타나는 툴팁 비활성화
            }
        },
    }

    return (
        <Doughnut data={chartData} options={options}/>
    )
}

const emptyDataPlugin = {
    id: 'emptyDataPlugin',
    afterDraw: (chart)=>{
        const dataList = chart.data.datasets[0].data;
        console.table(dataList)
        // 데이터가 없을 때 실행
        if (dataList.length === 0 || isZeroArray(dataList)) {
            // 이미지 로드
            const img = new Image();
            img.src = DataNotFound; // 표시할 이미지의 URL 또는 경로

            img.onload = function() {
                // 캔버스에 이미지 그리기
                const ctx = chart.ctx;
                const x = (chart.width - img.width) / 2;
                const y = (chart.height - img.height) / 2;
                ctx.drawImage(img, x, y, img.width, img.height);
            };
        }
    }
}

const isZeroArray = (arr: Array)=>{
    arr.forEach(v=>{
        if(v && v !== 0){
            return false;
        }
    })
    return true;
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