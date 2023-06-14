import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {Styles} from '_styles/styles.jsx'
import { clienteActions } from '_store';

export { List };

function List() {
    const clientes = useSelector(x => x.clientes.list);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clienteActions.getAll());
    }, []);

    return (
        <Styles>
        <div>
            <h1>Clientes</h1>
            <Link to="add" className="btn btn-sm btn-success mb-2">Add cliente</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>Nome</th>
                        <th style={{ width: '30%' }}>Morada</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {clientes?.value?.map(cliente =>
                        <tr key={cliente.id}>
                            <td>{cliente.nome}</td>
                            <td>{cliente.morada}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`edit/${cliente.id}`} className="btn btn-sm btn-primary me-1">Edit</Link>
                            </td>
                        </tr>
                    )}
                    {clientes?.loading &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <span className="spinner-border spinner-border-lg align-center"></span>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
        </Styles>
    );
}
