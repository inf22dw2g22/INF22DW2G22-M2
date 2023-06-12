import { configureStore } from '@reduxjs/toolkit';

import { alertReducer } from './alert.slice';
import { authReducer } from './auth.slice';
import { usersReducer } from './users.slice';
import { produtosReducer } from './produtos.slice';
import { clientesReducer } from './clientes.slice';
import { faturasReducer } from './faturas.slice';

export * from './alert.slice';
export * from './auth.slice';
export * from './users.slice';
export * from './produtos.slice';
export * from './clientes.slice';
export * from './faturas.slice';
export * from './detalheFaturas.slice';

export const store = configureStore({
    reducer: {
        alert: alertReducer,
        auth: authReducer,
        users: usersReducer,
        produtos:produtosReducer,
        clientes:clientesReducer,
        faturas:faturasReducer
    },
});