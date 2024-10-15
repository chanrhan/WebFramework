import Test from "./test.module.css"
import {cm} from "../utils/cm";

export function CssTest(){
    return (
        <div>
            <h1>CSS 테스트</h1>
            <div className={Test.main}>
                <div className={Test.body}>
                    <p className={cm(Test.test, Test.blue)}>Hello</p>
                    <p className={cm(Test.test, Test.pink)}>World!</p>
                </div>
            </div>
        </div>
    )
}