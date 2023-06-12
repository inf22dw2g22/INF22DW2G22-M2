import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';

import { history } from '_helpers';
import { faturaActions, alertActions } from '_store';

export { View };

function View() {
    const { id } = useParams();
    const [title, setTitle] = useState();
    const dispatch = useDispatch();
    const fatura = useSelector(x => x.faturas?.item);

    // form validation rules 
    const validationSchema = Yup.object().shape({
        clienteId: Yup.number()
            .required('First Name is required'),
        descricao: Yup.string()
            .required('Last Name is required'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions para construir o form com useForm() hook
    const { register, handleSubmit, reset, formState, control } = useForm(formOptions);
    const { errors} = formState;
    const { fields } = useFieldArray({ control, name: 'produtos' });

    useEffect(() => {
        if (id) {
            setTitle('View fatura');
            // fetch user details into redux state and 
            // populate form fields with reset()
            dispatch(faturaActions.getById(id)).unwrap()
                .then(fatura => reset(fatura));
        } else {
            setTitle('Add Fatura');
        }
    }, []);

    async function onSubmit(data) {
        dispatch(alertActions.clear());
        try {
            // cria ou actualiza fatura com base  no id param
            let message;
            if (id) {
                await dispatch(faturaActions.update({ id, data })).unwrap();
                message = 'produto updated';
            } else {
                await dispatch(faturaActions.register(data)).unwrap();
                message = 'Produto added';
            }

            // redireciona para a lista de faturas com a mensagem de sucesso
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
                    <div className="row mb-4">
                        <div className="col col-lg-2">
                            <div><label className="form-label">ClienteId</label></div>
                            <div><label className="form-label">nome</label></div>
                            <div><label className="form-label">Descriçao</label></div>

                        </div>
                        <div className="col col-lg-6">
                            <input name="clienteId" disabled="disabled" type="number" {...register('clienteId')} className={`form-control ${errors.clienteId ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.clienteId?.message}</div>
                            <input name="nome" disabled="disabled"  type="text" {...register(`cliente.nome`)} className={`form-control ${errors.descricao ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.descricao?.message}</div>
                            <input name="descricao" disabled="disabled" type="text" {...register('descricao')} className={`form-control ${errors.descricao ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.descricao?.message}</div>
                        </div>
                    </div>
                    <div>
                        {fields.map((field, index) => {
                            return (
                                <div key={field.id}>
                                    <div className="row mb-4">
                                        <div className="col col-lg-2">
                                        <div><label className="form-label">Produto</label></div>
                                        </div>
                                        <div className="col col-lg-2">
                                        <div><label className="form-label">Preço por Unidade</label></div>

                                        </div>
                                        <div className="col col-lg-2">
                                        <div><label className="form-label">Quantidade</label></div>

                                        </div>
                                    </div>
                                    <div className="row mb-4">
                                        <div className="col col-lg-2">
                                            <input type="text" disabled="disabled"
                                                {...register(`produtos.${index}.nome`)} className={`form-control ${errors.descricao ? 'is-invalid' : ''}`}
                                                defaultValue={field.name}
                                            />
                                        </div>
                                        <div className="col col-lg-2">
                                            <input type="number" disabled="disabled"
                                                {...register(`produtos.${index}.preco`)} className={`form-control ${errors.descricao ? 'is-invalid' : ''}`}
                                                defaultValue={field.name}
                                            />
                                        </div>
                                        <div className="col col-lg-2">
                                            <input type="number" disabled="disabled"
                                                {...register(`produtos.${index}.detalheFaturas.quantidade`)} className={`form-control ${errors.descricao ? 'is-invalid' : ''}`}
                                                defaultValue={field.name}
                                            />
                                        </div>
                                    </div>
                                </div>

                            );
                        })}
                    </div>
                    <div className="mb-3">
                        <Link to="/faturas" className="btn btn-sm btn-dark">Return</Link>
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
