
# C3 : Desenvolvimento


O desenvolvimento da API procurou utilizar  os conhecimentos lecionados na Disciplina de Desenvolvimento WEB II, bem como as ferramentas/aplicações indicadas na mesma.

Para o desenvolvimento da interface utilizamos a framework REACT.

![REACT](/Documentos/Imagens/react.png "React")

outras librarias usadas

##React Hook Form
React Hook Form é uma biblioteca que auxilia na criação e validação dos formulários, como já mencionado, além de reduzir a quantidade de código desenvolvido, 
fazendo com que a captura de ações do formulário também seja mais objetiva. Outra facilidade que ele traz é na melhora significativa de desempenho, já que a 
ação de renderização também pode ser controlada. Dessa forma, apenas as alterações de entradas são rerrenderizadas, não o formulário inteiro..

## Redux
Redux é uma biblioteca para armazenamento de estados de aplicações JavaScript, criado por Dan Abramov. Ele nasceu através de uma implementação do Flux, 
uma arquitetura criada pelo Facebook para contribuir com as aplicações de User Interface, utilizando o conceito de fluxo de dados unidirecional. Quando 
desenvolvemos aplicações utilizando Javascript, sempre temos que lidar com o gerenciamento de estado. O Redux veio para suprir essa necessidade de simplificar 
o controle dos estados de uma aplicação. Compartilhar estados entre vários componentes diferentes se torna uma coisa muito fácil quando o utilizamos.
Ele basicamente tira a responsabilidade de cada um dos componentes de armazenar os estados, deixando tudo isso centralizado, sendo utilizado ao mesmo tempo 
por todos os componentes de forma compartilhada. Ele também roda em diferentes ambientes como servidor, cliente e nativo.

Fazendo o uso do Redux todos esses estados ficarão armazenados em uma árvore de objetos através do store. Para que isso aconteça, o Redux utiliza 3 recursos:

  * Store: você pode pensar em store como um container ou um grande centro de informações, que tem disponibilidade para receber e entregar o que o 
      seu componente requisita. A store armazena de forma centralizada todos os estados da aplicação. Vale ressaltar que a store é imutável.
  * Actions: São ações disparadas da aplicação para o store. Elas são criadas através das action creators. As actions são a única forma de acionar 
      uma mudança de estados no store.
  * Reducers: Cada dado da store deve ter o seu próprio reducer. Ele é encarregado de lidar com todas as ações e especificam como o estado da 
      aplicação irá mudar de acordo com a action que foi enviada para o store.

## Redux Toolkit
O Redux Toolkit é uma biblioteca de ferramentas para o Redux, que é uma biblioteca de gerenciamento de estado para aplicativos JavaScript. 
O Redux Toolkit fornece uma série de recursos que facilitam a implementação do Redux em seus aplicativos, incluindo uma abstração para a criação 
de ações e reduções, integração com middlewares populares como o Redux Thunk e o Redux Saga, e ferramentas para lidar com ações assíncronas de maneira 
mais fácil. Além disso, o Redux Toolkit inclui uma série de recursos de otimização para ajudar a manter o código do seu aplicativo enxuto e fácil de gerenciar.

## Styled-components
Styled-components é uma biblioteca para React e React Native que permite que você use estilos ao nível de componente na sua aplicação. 
Eles são escritos em uma mistura de JavaScript com CSS. 

## Yup
É um construtor de esquemas para validação de campos e transformação de valores no JavaScript. Simplificando, a partir do Yup temos o conceito de schema,
que nada mais é que o formato que os seus campos devem seguir, ou seja, se tivermos um objeto, que dentro temos três campos que devem ser textos, a partir 
do Yup definimos um schema para isso. Os esquemas (schemas) são muito flexíveis e permitem modelar complexas validações, correlacionadas ou não e até mesmo 
transformação de valores.

---
[< Previous](Recursos.md) | [^ Main](../../../) |
