import {cm} from "../../utils/cm";
import Graph from "../../../css/graph.module.css";
import PropTypes from "prop-types";
import {LineChartInstance} from "./LineChartInstance";
import {NumberUtils} from "../../utils/NumberUtils";

export const GraphSummaryCard = ({title, value, per, data, price})=>{
    let arrow = '';
    if(per > 0){
        arrow = '▲';
    }else{
        arrow = '▼';
    }


    return (
        <li className={cm(Graph.graph_item, `${per > 0 ? Graph.up : Graph.down}`)}>
            <div className={Graph.graph_title}>{title}</div>
            <div className={Graph.graph_count}><span className={Graph.span}>{price ? NumberUtils.toPrice(value) : value}</span>{price ? '원':'대'}</div>
            <div className={Graph.graph_per}><span className={Graph.span}>{arrow}</span> {per}% (전월대비)</div>
            <div className={Graph.graph_box}>
                <LineChartInstance color={per > 0 ? 'red':'blue'} pointRadius='0' tooltip_disabled data={data} x_axis_disabled y_axis_disabled/>
                {/*<img src={img} alt="그래프 영역 샘플"/>*/}
            </div>
        </li>
    )
}

GraphSummaryCard.prototype = {
    title: PropTypes.string,
    num: PropTypes.number,
    per: PropTypes.any,
    img: PropTypes.any,
    inclination: PropTypes.oneOf(["up","down"])
};
