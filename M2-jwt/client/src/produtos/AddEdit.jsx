import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';

import { history } from '_helpers';
import { produtoActions, alertActions } from '_store';

export { AddEdit };

function AddEdit() {
    const { id } = useParams();
    const [title, setTitle] = useState();
    const dispatch = useDispatch();
    const produto = useSelector(x => x.produtos?.item);

    // form validation rules 
    const validationSchema = Yup.object().shape({
        nome: Yup.string()
            .required('First Name is required'),
        preco: Yup.string()
            .required('Last Name is required'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    useEffect(() => {
        if (id) {
            setTitle('Edit Produto');
            // fetch user details into redux state and 
            // populate form fields with reset()
            dispatch(produtoActions.getById(id)).unwrap()
                .then(produto => reset(produto));
        } else {
            setTitle('Add Produto');
        }
    }, []);

    async function onSubmit(data) {
        dispatch(alertActions.clear());
        try {
            // create or update user based on id param
            let message;
            if (id) {
                await dispatch(produtoActions.update({ id, data })).unwrap();
                message = 'produto updated';
            } else {
                await dispatch(produtoActions.register(data)).unwrap();
                message = 'Produto added';
            }

            // redirect to user list with success message
            history.navigate('/produtos');
            dispatch(alertActions.success({ message, showAfterRedirect: true }));
        } catch (error) {
            dispatch(alertActions.error(error));
        }
    }

    return (
        <>
            <h1>{title}</h1>
            {!(produto?.loading || produto?.error) &&
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        <div className="mb-3 col">
                            <label className="form-label">Nome</label>
                            <input name="nome" type="text" {...register('nome')} className={`form-control ${errors.nome ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.nome?.message}</div>
                        </div>
                        <div className="mb-3 col">
                            <label className="form-label">Preco</label>
                            <input name="preco" type="number" {...register('preco')} className={`form-control ${errors.preco ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.preco?.message}</div>
                        </div>
                    </div>
                    <div className="mb-3">
                    <button type="submit" disabled={isSubmitting} className="btn btn-primary me-2">
                            {isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                            Save
                        </button>
                        <button onClick={() => reset()} type="button" disabled={isSubmitting} className="btn btn-secondary me-2">Reset</button>
                        <Link to="/produtos" className="btn btn-dark">Return</Link>
                    </div>
                </form>
            }
            {produto?.loading &&
                <div className="text-center m-5">
                    <span className="spinner-border spinner-border-lg align-center"></span>
                </div>
            }
            {produto?.error &&
                <div class="text-center m-5">
                    <div class="text-danger">Error loading user: {produto.error}</div>
                </div>
            }
        </>
    );
}
