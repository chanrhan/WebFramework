import {Outlet} from "react-router-dom";

export function StudyLayout(){
    return (
        <div>
            <h1>Study Header</h1>
            <Outlet/>
        </div>
    )
}