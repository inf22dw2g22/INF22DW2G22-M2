import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { history } from '_helpers';

export { PrivateRoute };

function PrivateRoute() {
    const auth = useSelector(x => x.auth.value);

    if (!auth) {
        // se bao logado redireciona para a pagina de login
        return <Navigate to="/account/login" state={{ from: history.location }} />
    }

    // authorized so return outlet for child routes
    return <Outlet />;
}