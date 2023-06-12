# C2 : Recursos

_A API tem os seguintes recursos_

## users
que contem os seguintes elementos (id, firstname, lastname, username  e hash)

## Clientes
que contem os seguintes elementos (id, nome e morada)

## Produtos
que contem os seguintes elementos (id, nome, preço)

## Fatura
que contem os seguintes elementos (id, clienteId, descriçao)

Os recursos Faturas e clientes têm a seguintes relação de 1:n
Os recursos Faturas e Produtos têm a seguintes relação de n:n

na relaçao de n:n é criado o recuso detalhefatura que contem as chaves estrangeiras faturaId, produtosId e o atributo quantidade

---
[< Previous](c1.md) | [^ Main](../../../) | [Next >](c3.md)
:--- | :---: | ---: 
