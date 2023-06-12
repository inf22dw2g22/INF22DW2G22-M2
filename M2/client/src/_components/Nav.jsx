import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { authActions } from '_store';

export { Nav };

function Nav() {
    const auth = useSelector(x => x.auth.value);
    const dispatch = useDispatch();
    const logout = () => dispatch(authActions.logout());

    // only show nav when logged in
    if (!auth) return null;
    
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark px-3">
            <div className="navbar-nav ">
                <NavLink to="/" className="nav-item nav-link">Home</NavLink>
                <NavLink to="/users" className="nav-item nav-link">Users</NavLink>
                <NavLink to="/produtos" className="nav-item nav-link">Produtos</NavLink>
                <NavLink to="/clientes" className="nav-item nav-link">Clientes</NavLink>
                <NavLink to="/faturas" className="nav-item nav-link">Faturas</NavLink>
                
            </div>
            <div className ='user'> <h2>Hi {auth?.firstName}!</h2></div>
            <div className="navbar-nav" style={{ marginLeft: 'auto' }}>
                <button onClick={logout} className="btn btn-link nav-item nav-link">Logout</button>
            </div>
        </nav>
         
    );
}