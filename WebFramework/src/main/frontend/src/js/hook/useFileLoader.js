import useApi from "./useApi";
import defaultProfileImage from "../../images/profile_img1.jpg"

export function useFileLoader(){
    const {fileApi} = useApi();

    const load = async (dir, fileName)=>{
        if(!fileName){
            return null;
        }
        let url = defaultProfileImage;

        const res = await fileApi.load(dir, fileName);
        if(res.status === 200 && res.data){
            url = window.URL.createObjectURL(res.data)
        }
        return url;
    }

    const pimg = async (fileName)=>{
        return await load('pimg',fileName)
    }

    const pfp = async (fileName)=>{
        return await load('pfp',fileName);
    }

    const saleFile = async (fileName)=>{
        return await load('sale',fileName);
    }

    return {
        pfp,
        pimg,
        saleFile,
    }
}