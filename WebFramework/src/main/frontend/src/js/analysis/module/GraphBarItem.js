import Graph from "../../../css/graph.module.css";

export function GraphBarItem({text, per}){
    return (
        <li className={Graph.bar_item}>
            <div className={Graph.bar_text}>{text}<span className={Graph.bar_per}>{per}%</span></div>
            <div className={Graph.bar}><span className={Graph.span} style={{width: `${per}%`}}></span></div>
        </li>
    )
}