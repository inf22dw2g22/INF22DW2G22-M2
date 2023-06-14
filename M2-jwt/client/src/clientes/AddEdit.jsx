import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';

import { history } from '_helpers';
import { clienteActions, alertActions } from '_store';

export { AddEdit };

function AddEdit() {
    const { id } = useParams();
    const [title, setTitle] = useState();
    const dispatch = useDispatch();
    const cliente = useSelector(x => x.clientes?.item);

    // form validation rules 
    const validationSchema = Yup.object().shape({
        nome: Yup.string()
            .required('Nome is required'),
        morada: Yup.string()
            .required('Morada is required'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    useEffect(() => {
        if (id) {
            setTitle('Edit cliente');
            // fetch user details into redux state and 
            // populate form fields with reset()
            dispatch(clienteActions.getById(id)).unwrap()
                .then(cliente => reset(cliente));
        } else {
            setTitle('Add cliente');
        }
    }, []);

    async function onSubmit(data) {
        dispatch(alertActions.clear());
        try {
            // create or update user based on id param
            let message;
            if (id) {
                await dispatch(clienteActions.update({ id, data })).unwrap();
                message = 'cliente updated';
            } else {
                await dispatch(clienteActions.register(data)).unwrap();
                message = 'cliente added';
            }

            // redirect to user list with success message
            history.navigate('/clientes');
            dispatch(alertActions.success({ message, showAfterRedirect: true }));
        } catch (error) {
            dispatch(alertActions.error(error));
        }
    }

    return (
        <>
            <h1>{title}</h1>
            {!(cliente?.loading || cliente?.error) &&
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        <div className="mb-3 col">
                            <label className="form-label">Nome</label>
                            <input name="nome" type="text" {...register('nome')} className={`form-control ${errors.nome ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.nome?.message}</div>
                        </div>
                        <div className="mb-3 col">
                            <label className="form-label">Morada</label>
                            <input name="morada" type="text" {...register('morada')} className={`form-control ${errors.morada ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.morada?.message}</div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <button type="submit" disabled={isSubmitting} className="btn btn-primary me-2">
                            {isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                            Save
                        </button>
                        <button onClick={() => reset()} type="button" disabled={isSubmitting} className="btn btn-secondary me-2">Reset</button>
                        <Link to="/clientes" className="btn btn-dark">Return</Link>
                    </div>
                </form>
            }
            {cliente?.loading &&
                <div className="text-center m-5">
                    <span className="spinner-border spinner-border-lg align-center"></span>
                </div>
            }
            {cliente?.error &&
                <div class="text-center m-5">
                    <div class="text-danger">Error loading user: {cliente.error}</div>
                </div>
            }
        </>
    );
}
