export const MouseEventUtils = {
    getAbsolutePos: (e: MouseEvent<HTMLButtonElement>)=>{
        return {
            top: window.pageYOffset + e.currentTarget.getBoundingClientRect().top,
            left: window.pageXOffset + e.currentTarget.getBoundingClientRect().left
        }
    }
}