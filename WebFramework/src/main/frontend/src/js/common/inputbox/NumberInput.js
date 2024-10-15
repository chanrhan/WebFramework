export function NumberInput({id, name, className, maxLength, readOnly,
                                value, preprocess, postprocess, placeholder, onChange}){
    const handleInput = (e)=>{
        if(preprocess){
            e = preprocess(e);
        }
        if(!Number.isNaN(Number(e.target.value))){
            if(postprocess){
                e = postprocess(e)
            }
            onChange(e)
        }
    }

    return (
        <input type="text" id={id} name={name}
               className={`${className}`}
               maxLength={maxLength}
               value={value} onChange={handleInput}
               readOnly={readOnly}
               placeholder={placeholder}/>
    )
}