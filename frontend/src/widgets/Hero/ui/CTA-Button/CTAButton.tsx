import type { ReactNode } from "react"
import style from "./ctabutton.module.css"

type ButtonProps = {
    children: ReactNode
}

export function CTAButton({children}: ButtonProps){
    return <button className={style.ctabutton}>
        {children}
    </button>
}