import {Link, Outlet} from "react-router-dom";
import User from "../../css/user.module.css"
import logo from "../../images/user/logo.png"

export function AccountLayout({children}){

    return (
        <div>
            <div className={User.user}>
                <div className={`container ${User.container}`}>
                    <header className={User.header}>
                        <h1 className={User.logo}>
                            <Link to='/' className={User.a}><img src={logo} alt="momo" className={User.img}/></Link>
                        </h1>
                    </header>
                    {children}
                    <Outlet/>
                    <footer className={User.footer}>
                        <p className={User.user_copyright}>COPYRIGHT(C) MOMO, INC. ALL RIGHTS RESERVED.</p>
                    </footer>
                </div>
            </div>
        </div>
    )
}