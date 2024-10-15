import {useEffect} from "react";

export function AsyncTest(){

    function test(){
         console.log(1)
        delay()
        console.log(2)
    }

    async function delay(){
        for(let i=0;i<7000;++i){
            console.log('loading...')
        }
    }

    return (
        <div>
            <h1>비동기 테스트 (async/await)</h1>
            <button onClick={test}>go</button>
        </div>
    )
}