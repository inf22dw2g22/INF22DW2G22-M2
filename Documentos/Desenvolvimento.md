
# C3 : Desenvolvimento


O desenvolvimento da API procurou utilizar  os conhecimentos lecionados na Disciplina de Desenvolvimento WEB II, bem como as ferramentas/aplicações indicadas na mesma.

Para o desenvolvimento da interface utilizamos a framework REACT.

![REACT](images/react.png)

Em cumprimento do requisitos do projeto e após a construção dos métodos (get, post, put, delete), foi usado a plataforma Docker, que proporciona a virtualização dos aplicativos utilizando o conceito de containers. 
No projeto em causa foram criados o ficheiro docker.compose.yml que onde foram configurados os serviços do aplicativo de modo podermos utilizar a ferramenta Docker Compose para a criaçao das  imagens e containers que vai usar também os ficheiros dockerfile e dockerfile.mysql.

O resultado foi a criaçao de 3s imagens (school-app-react , scholl-app-lb4)  3 _containers_ (react-1, db-1, lb4-1) bem como um _volume_. 






---
[< Previous](Recursos.md) | [^ Main](../../../) |
