export const ModalType = {
    LAYER: {
        // common
        Bulk_Upload: 'BulkUpload',
        Invite: 'Invite',
        Payment_Card: 'Payment_Card',
        Charge_Point: 'ChargePoint',
        Image_Preview: 'ImagePreview',

        // Profile
        Update_Password: 'UpdatePassword',
        Name_Card: 'NameCard',

        Change_Nickname: 'ChangeNickname',
        Add_Shop: 'AddShop',
        // sale
        Sale_Detail: 'SaleDetail',
        Sale_Card: 'SaleCard',
        Sale_Comb: 'SaleComb',
        Sale_Exsvc: 'SaleExsvc',
        Sale_Wt_Plan: 'SaleWtPlan',
        Sale_Second: 'SaleSecond',
        Sale_Used_Phone: 'SaleUsedPhone',

        // sale common
        Device_Search: 'DeviceSearch',
        Plan_Search: 'PlanSearch',

        Table_Validation: 'TableValidation',
        Sale_Filter: 'SaleFilter',
        Reserve_Message: 'ReserveMessage',
        Reserve_Date: 'ReserveDate',

        // Task
        Used_Device_Cms: 'UsedDeviceCms',

        //todo
        Todo_Add: 'TodoAdd',

        // study_private
        Add_Study_Node: 'AddStudyNode'
    },
    MENU: {
        // Change_Shop: 'ChangeShop',
        Test: 'MenuModalTest',
        Select_Table_Header: 'SelectTableHeader',
        // Select_Month: 'SelectMonth',
        Select_Date: 'SelectDate',
        // Select: 'Select',
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
