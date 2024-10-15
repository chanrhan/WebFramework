export const cssUtils = {
    borderDangerIfError
}

function borderDangerIfError(error){
    return `border ${error ? 'border-danger' : 'border-dark'}`;
}