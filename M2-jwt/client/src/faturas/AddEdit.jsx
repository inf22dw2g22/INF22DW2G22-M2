import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { history } from '_helpers';
import { faturaActions, alertActions } from '_store';
import { clienteActions } from '_store';
import { produtoActions } from '_store';



export { AddEdit };

function AddEdit() {
    const { id } = useParams();
    const [title, setTitle] = useState();
    const dispatch = useDispatch();
    const fatura = useSelector(x => x.faturas?.item);
    const [selectedClienteId, setSelectedClienteId] = useState('');
    /*const [selectedProdutoId, setSelectedProdutoId] = useState('');*/
    const clientes = useSelector(x => x.clientes.list);


    useEffect(() => {
        dispatch(clienteActions.getAll())
    }, [dispatch]);
    useEffect(() => {
        dispatch(produtoActions.getAll())
    }, [dispatch]);
    useEffect(() => {
        dispatch(faturaActions.getAll())
    }, [dispatch]);


    // form validation rules 
    const validationSchema = Yup.object().shape({
        clienteId: Yup.number()
            .required('Client ID is required'),
        descricao: Yup.string()
            .required('A description is required'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions para construir form com useForm() hook
    const { register, handleSubmit, reset, formState, control } = useForm(formOptions);
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'produtos',
      });
    const { errors, isSubmitting } = formState;

    useEffect(() => {
        if (id) {
            setTitle('Edit fatura');
            // fetch faturas details into redux state and 
            // populate form fields with reset()
            dispatch(faturaActions.getById(id)).unwrap()
                .then(fatura => reset(fatura));
                dispatch(clienteActions.getAll());
        } else {
            setTitle('Add Fatura');
        }
    }, []);

    async function onSubmit(data) {
        dispatch(alertActions.clear());
              try {
            // cria ou edita uma fatura baseado no id param
            let message;
            if (id) {
                await dispatch(faturaActions.update({ id, data })).unwrap();
                message = 'Fatura updated';
            } else {
                
                await dispatch(faturaActions.register(data)).unwrap();
                message = 'Fatura added';
            }

            // redireciona para a lista de faturas com success message
            history.navigate('/faturas');
            dispatch(alertActions.success({ message, showAfterRedirect: true }));
        } catch (error) {
            dispatch(alertActions.error(error));
        }
    }

    return (
        <>
            <h1>{title}</h1>
            {!(fatura?.loading || fatura?.error) &&
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        <div className="mb-3 col">
                            <label className="form-label">ClienteId</label>
                            <select className={`form-control ${errors.descricao ? 'is-invalid' : ''}`} value={selectedClienteId} {...register('clienteId')} onChange={e => setSelectedClienteId(e.target.value)}>
                                <option value="">Selecione uma opção</option>
                                {clientes?.value?.map((cliente) => (
                                    <option key={cliente.id} value={cliente.id}>
                                        {cliente.nome}
                                    </option>
                                ))}
                            </select>                                
                            <div className="invalid-feedback">{errors.clienteId?.message}</div>
                        </div>
                        <div className="mb-3 col">
                            <label className="form-label">Descrição da Fatura</label>
                            <input name="descricao" type="text" {...register('descricao')} className={`form-control ${errors.descricao ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.descricao?.message}</div>
                        </div>
                    </div>
                    <div className="row">
                    <div>
                        <button
                        type="button" className="btn btn-secondary mb-4"
                        onClick={() => append({ id: '', quantidade: 0 })}>
                        Adicionar Produto
                        </button>
                    </div>  

                    {fields.map((item, index) => (
                        <div key={item.id}>
                            <div className="row">
                            <h3>Produto #{index + 1}</h3>
                            <div className="col col-lg-4">
                                <label className={`form-label produtos[${index}].produtoId`}>Nome</label>
                                <input
                                type="text" id={`produtos[${index}].produtoId`} class="form-control mb-4"
                                name={`produtos[${index}].produtoId`} {...register(`produtos[${index}].produtoId`)}
                                />
                            </div>
                            <div className="col col-lg-6">
                            <label class="form-label" htmlFor={`produtos[${index}].quantidade`}>Quantidade</label>
                            <input
                            type="number" id={`produtos[${index}].quantidade`} class="form-control" name={`produtos[${index}].quantidade`}
                            {...register(`produtos[${index}].quantidade`)}
                            />
                        </div>
                        </div>
                        <div>
                            <button type="button" onClick={() => remove(index)} className="btn btn-danger me-2 mb-4">
                                Remover Produto
                            </button>
                        </div>
                </div>
                ))}
                    <div className="mb-3">
                        <button type="submit" disabled={isSubmitting} className="btn btn-primary me-2">
                            {isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                            Save
                        </button>
                        <button onClick={() => reset()} type="button" disabled={isSubmitting} className="btn btn-secondary me-2">Reset</button>
                        <Link to="/users" className="btn btn-dark">Return</Link>
                    </div>
                    </div>
                </form>
            }
            {fatura?.loading &&
                <div className="text-center m-5">
                    <span className="spinner-border spinner-border-lg align-center"></span>
                </div>
            }
            {fatura?.error &&
                <div class="text-center m-5">
                    <div class="text-danger">Error loading user: {fatura.error}</div>
                </div>
            }
        </>
    );
}
