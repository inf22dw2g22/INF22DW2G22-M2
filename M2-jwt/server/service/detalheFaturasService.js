const db = require('_db/db');
const op = db.op;


module.exports = {
    createdetalhefatura
};


async function createdetalhefatura(lista) {
    lista.products.forEach((item) => {
        db.detalheFatura.create({faturaId: `${item.faturaId}`,produtoId: `${item.produtoId}`,quantidade: `${item.quantidade}`})
    });
    return  (lista)}






