import useApi from "../hook/useApi";
import {useEffect, useState} from "react";
import {HttpStatusCode} from "axios";
import * as XLSX from "xlsx"
import {ObjectUtils} from "../utils/objectUtil";

function ExcelTest(){
    const {testApi} = useApi();
    const [sale, setSale] = useState([]);

    const getData = async ()=>{
        await testApi.getSale(4).then(({status,data})=>{
            if(status === HttpStatusCode.Ok){
                setSale(data);
            }
        });
    }

    useEffect(() => {
        if(!ObjectUtils.isEmpty(sale)){
            downloadExcel();
        }
    }, [sale]);

    const downloadExcel = ()=>{
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(sale), "Test_Sheet_Name22");
        XLSX.writeFile(wb, "Test_File_Name22")
    }



    return (
        <div className='mt-5'>
            <button className='btn btn-outline-secondary' onClick={getData}>Download</button>
        </div>
    )
}

export default ExcelTest;