import ValidationError from "../../error/ValidationError";

function InputBox({flexDir = 'row', type = 'text', inputField, className, subject, name, value}){

    const handleChange = e=>{
        if(inputField !== null && inputField !== undefined){
            inputField.handleInput(e);
        }
    }

    if(typeof inputField !== 'object'){
        return null;
    }

    switch (type){
        case 'text' :
            return (
                <div className='d-flex flex-column'>
                    <div className={`d-flex flex-${flexDir} justify-content-center align-items-baseline mt-2 ms-3 ${className}`}>
                        <p>{subject}</p>
                        <input className='ms-2' type={type} name={name} value={inputField.input[name]} placeholder={subject}
                               onChange={handleChange}/>
                        <br/>
                    </div>
                    <ValidationError error={inputField.error[name]}/>
                </div>
            )
        case 'file' :
            return (
                <div className='d-flex flex-column'>
                    <div className={`d-flex flex-${flexDir} justify-content-center align-items-baseline mt-2 ms-3 ${className}`}>
                        <p>{subject}</p>
                        <input className='ms-2' type={type} onChange={handleChange}/>
                        <br/>
                    </div>
                    <ValidationError error={inputField.error[name]}/>
                </div>
            )
        case 'checkbox' :
            return (
                <div className='d-flex flex-column'>
                    <div
                        className={`d-flex flex-${flexDir} justify-content-center align-items-baseline mt-2 ms-3 ${className}`}>
                        <input type={type} name={name} value={value} placeholder={subject} onChange={handleChange}/>
                        <p className='ms-2'>{subject}</p>
                        <br/>
                    </div>
                    <ValidationError error={inputField.error[name]}/>
                </div>
            )
    }
}

export default InputBox;