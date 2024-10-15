import Layout from "../../../css/layout.module.css";

export function SelectLayer({top, left, width, className, children, renderlessModal}){
    return (
        <>
            <button type="button" className={Layout.link_btn} onClick={renderlessModal.clickToOpen}>내 정보</button>
            <ul ref={renderlessModal.ref} className={`select_layer ${className} ${renderlessModal.active && 'active'}`}
                style={{
                    position: "absolute",
                    top: top,
                    left: left,
                    width: width
                }}>
                {children}
            </ul>
        </>
    )
}

export function SelectItem({className, key, children, onClick}) {
    return (
        <li key={key} className={`select_item ${className}`}>
            <button type="button" className='tool_btn' onClick={onClick}>{children}</button>
        </li>
    )
}