import {cm} from "../utils/cm";
import User from "../../css/user.module.css";

export function ImageItem({className, fileName}){
    return (
        <img className={cm(User.img)} src={test()} alt="프로필 이미지"/>
    )
}