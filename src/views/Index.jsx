import { Link } from 'react-router-dom'

function Index() {
    return (
        <>
            <div className='fondo'>
                <Link to='/pokemons'>
                    <img className="logo" id="header__home" src="src\assets\img\logo.png" alt="logo" />
                </Link>
            </div>
        </>
    )
}

export default Index