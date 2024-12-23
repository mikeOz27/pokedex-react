import '../App.css'
import { Link } from 'react-router-dom'

function Header() {
    return (
       <>
            <header>
                <Link to='/'>
                    <img className="logo" id="header__home" src="src\assets\img\logo.png" alt="logo"/>
                </Link> 
            </header>
       </>
    )
}

export default Header