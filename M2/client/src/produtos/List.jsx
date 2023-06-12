import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { produtoActions } from '_store';
import {Styles} from '_styles/styles.jsx'


export { List };



function List() {
    const produtos = useSelector(x => x.produtos.list);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(produtoActions.getAll());
    }, []);

    return (
        <Styles>
            <h1>Produtos</h1>
            <Link to="add" className="btn btn-sm btn-success mb-2">Add Produto</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>Nome</th>
                        <th style={{ width: '30%' }}>Preço</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {produtos?.value?.map(produto =>
                        <tr key={produto.id}>
                            <td>{produto.nome}</td>
                            <td>{produto.preco}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`edit/${produto.id}`} className="btn btn-sm btn-primary me-1">Edit</Link>
                            </td>
                        </tr>
                    )}
                    {produtos?.loading &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <span className="spinner-border spinner-border-lg align-center"></span>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </Styles>
 );
}

