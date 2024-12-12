import { Select, Input } from '@mui/material'
import '../App.css'
import { Link } from 'react-router-dom'

function Header() {
    const home = (event) => {
        event.preventDefault()
        
    }

    return (
       <>
            <header>
                <Link to='/'>
                    <img className="logo" id="header__home" src="src\assets\img\logo.png" alt="logo"/>
                </Link> 
            </header>
            <img src="" alt="" srcset="" />
       </>
    )
}

export default Header