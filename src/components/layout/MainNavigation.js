import classes from './MainNavigation.module.css';
import { NavLink } from 'react-router-dom'

const MainNavigation = () => {
    return (
        <header className={classes.header}>
            <div className={classes.logo}> <img src={process.env.PUBLIC_URL + 'logo.png'} alt="logo" /> </div>
            <div className={classes.nav}>
                <ul>
                    <li>
                        <NavLink to="/quotes" activeClassName={classes.active}> All Quotes</NavLink>
                    </li>
                    <li>
                        <NavLink to="/quotes/new" activeClassName={classes.active}> Add a Quote</NavLink>
                    </li>
                </ul>
            </div>
        </header>
    )
}

export default MainNavigation;