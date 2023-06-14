import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {Styles} from '_styles/styles.jsx'
import { faturaActions } from '_store';
import { clienteActions } from '_store';

export { List };

function List() {
    const faturas = useSelector(x => x.faturas.list);
    const dispatch = useDispatch();
    const clientes = useSelector(x => x.clientes.list);


    function getClientName(clienteId) {

        const cliente = clientes?.value?.find(cliente => cliente.id === clienteId);
        return cliente ? cliente.nome : '';
      }

    useEffect(() => {
        dispatch(faturaActions.getAll());
        dispatch(clienteActions.getAll())
    }, []);

    return (
        <Styles>
        <div>
            <h1>Faturas</h1>
            <Link to="add" className="btn btn-sm btn-success mb-2">Add Fatura</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '10%' }}>Nº Fatura</th>
                        <th style={{ width: '30%' }}>Cliente</th>
                        <th style={{ width: '30%' }}>Descrição</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {faturas?.value?.map(fatura =>
                            <tr key={fatura.id}>
                            <td>{fatura.id}</td>  
                            <td>{getClientName(fatura.clienteId)}</td>
                            <td>{fatura.descricao}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`view/${fatura.id}`} className="btn btn-sm btn-success me-1">View</Link>
                            </td>
                        </tr>
                    )}
                    {faturas?.loading &&
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


