import {ObjectUtils} from "../utils/objectUtil";

function ValidationError({error}){
    if(ObjectUtils.isEmpty(error)){
        return null;
    }
    return (
        <>
            <p className='text-danger'>{error}</p>
        </>
    )
}

export default ValidationError;