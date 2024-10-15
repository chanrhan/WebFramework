export const getSaleSample = (type: boolean = false)=>{
    return [
        {
            key: 'actv_dt',
            value: type ? '2024-05-04' : '2021-12-20'
        },
        {
            key: 'provider',
            value: type ? 0 : 2
        },
        {
            key: 'cust_nm',
            value: type ? '박희찬' : '신건호'
        },
        {
            key: 'cust_gd',
            value: type ? 1 : 2
        },
        {
            key: 'cust_tel',
            value: type ? '010-4524-0636' : '010-9936-0636'
        },
        {
            key: 'cust_cd',
            value: type ? '001104' : '5000142120'
        },
        {
            key: 'ct_actv_div',
            value: type ? 1 : 0
        },
        {
            key: 'device_md',
            value: type ? 2 : 3
        },
        {
            key: 'ct_actv_plan',
            value: type ? 0 : 2
        },
        {
            key: 'ct_dec_plan',
            value: type ? 1 : 3
        },
        {
            key: 'ct_actv_tp',
            value: type ? 1 : 2
        },
        {
            key: 'device_stor',
            value: type ? 3: 4
        },
        {
            key: 'ct_istm',
            value: type ? 1 : 5
        },
        {
            key: 'ct_cms',
            value: type ? '298000' : '78500'
        },
        {
            key: 'wt_actv_tp',
            value: 0
        },
        {
            key: 'wt_cms',
            value: 0
        },
        {
            key: 'internet_plan',
            value: 0
        },
        {
            key: 'tv_plan',
            value: 0
        },
        {
            key: 'sec_md',
            value: 1
        },
        {
            key: 'docs',
            value: null
        },
        {
            key: 'spec',
            value: null
        },
        {
            key: 'memo',
            value: null
        },
        {
            key: 'document',
            value: null
        },
        {
            key: 'apm_content_list',
            value: []
        },
        {
            key: 'apm_check_list',
            value: []
        }
    ]
}