import { useContext } from 'react';
import classes from './MainNavigation.module.css';
import { NavLink } from 'react-router-dom'
import AuthContext from '../../store/auth-context';

const MainNavigation = () => {
    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;

    const logoutHandler = () => {
        authCtx.logout();
    }

    return (
        <header className={classes.header}>
            <div className={classes.logo}> 
                <NavLink to="/quotes" activeClassName={classes.active}>
                    <img src={window.location.origin + '/logo.png'} alt="logo" />
                </NavLink>
            </div>
            <div className={classes.nav}>
                <ul>
                    <li>
                        <NavLink to="/quotes" activeClassName={classes.active}> All Quotes</NavLink>
                    </li>
                    <li>
                        <NavLink to="/quotes/new" activeClassName={classes.active}> Add a Quote</NavLink>
                    </li>
                    <li>
                        <NavLink to="/quotes/generate" activeClassName={classes.active}> Generate Quote</NavLink>
                    </li>
                    {!isLoggedIn && (<li> 
                        <NavLink to='/auth' activeClassName={classes.active}>Login</NavLink> 
                    </li>)}
                    {isLoggedIn && (<li>
                        <NavLink to='/profile' activeClassName={classes.active}>Profile</NavLink>
                    </li>)}
                    {isLoggedIn && (<li>
                        <a href="/#" onClick={logoutHandler}> Logout </a>
                    </li>)}
                </ul>
            </div>
        </header>
    )
}

export default MainNavigation;