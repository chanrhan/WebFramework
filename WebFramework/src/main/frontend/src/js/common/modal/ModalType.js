export const ModalType = {
    LAYER: {
        // common
        Image_Preview: 'ImagePreview',
    },
    MENU: {
        Select_Date: 'SelectDate',
        Dynamic_Select: 'DynamicSelect',
        More_Option: 'MoreOption'
    },
    SNACKBAR: {
        Alert: 'Alert',
        Warn: 'Warning',
        Info: 'Info'
    },
    TOAST: {

    },
    TOOLTIP: {
        Hint: 'Hint'
    },
    getType: (modalName)=>{
        for(const type in ModalType){
            if(typeof ModalType[type] === 'object'){
                for(const name in ModalType[type]){
                   if(ModalType[type][name] === modalName){
                       return type;
                   }
                }
            }
        }
        return null;
    }
}
