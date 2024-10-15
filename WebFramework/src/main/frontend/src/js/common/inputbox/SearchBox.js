import { FaSearch } from "react-icons/fa";
import {useEffect, useState} from "react";

function SearchBox({thead= [], tbody=[], onSearch = null, onSelect = null}){
    const [searchResult, setSearchResult] = useState([]);
    const [keyword, setKeyword ] = useState('')

    useEffect(() => {
        search(keyword);
    }, []);

    const handleKeywordInput = e=>{
        setKeyword(e.target.value);
    }

    const search = ()=>{
        if(onSearch != null && typeof onSearch === 'function'){
            onSearch(keyword).then(({status,data})=>{
                if(status === 200 && typeof data === 'object'){
                    setSearchResult(data);
                }
            })
        }
    }

    const select = (result)=>{
        if(onSelect != null && typeof onSelect === 'function'){
            onSelect(result);
        }
    }

    return (
        <div className='d-flex flex-column'>
            <div className='d-flex flex-row align-items-center'>
                <input type="text" placeholder='검색어를 입력해주세요' onChange={handleKeywordInput}/>
                <FaSearch className='ms-3' onClick={search}/>
            </div>
            <div>
                <table>
                    <thead>
                    <tr>
                    {
                        thead && thead.map(value=>{
                            return <th>{value}</th>
                        })
                    }
                    </tr>
                    </thead>
                    <tbody>
                    {
                        searchResult && searchResult.map(result=>{
                            return <tr onClick={()=>{
                                select(result);
                            }}>{
                                tbody && tbody.map(value=>{
                                    return <td>{result[value]}</td>;
                                })
                            }</tr>
                        })
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default SearchBox;