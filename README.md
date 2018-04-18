# Entre no Fluxo - Assignment #3!
[FLUXO](http://entrenofluxo.com.br/mvp/)  é um projeto investigativo feito por alunos da Gama Academy, que quer melhorar a contratação de UX designers no Brasil.
Esse projeto foi desenvolvido para avaliar o nível do usuário que atua ou pretende atuar na área de design, através de perguntas, mostrando sua posição no mercado.
&nbsp;

## Pré requisito
Para compilar o projeto é necessário ter o [Node](https://nodejs.org/en/) instalado, para executar o NPM.

## Iniciando o projeto


Os códigos abaixo servem para instalar as dependências do projeto.

Para baixar todas dependências, executamos:
```javascript
npm install
```

Depois que finalizar a instalação das dependências do projeto, será necessário rodar o comando ```ng serve``` para disponibilizar um servidor local para testar a aplicação
```javascript
ng serve
```
# Desenvolvimento

Informações de desenvolvimento, estratégias, ferramentas, time e etc...

## Desenvolvido com
* [JavaScript](https://www.javascript.com/) - Linguagem de Programação
    * [jQuery (3.3.1)](https://jquery.com/) - Biblioteca JavaScript
* [Angular](https://angular.io/) - Utilizado o framework para criar uma aplicação webapp
* [Node JS](https://nodejs.org/en/) - Usado o Gerenciador de Pacotes
* [Bootstrap 4](https://getbootstrap.com/) - Framework utilizado para agilizar o desenvolvimento.
* [Firebase](https://firebase.google.com/) - Persistência de dados e autenticação de usuário
* [Github Pages](https://pages.github.com/) - Hospedagem direta do repositório do Github
* [Tiny JPG / Tiny PNG](https://tinyjpg.com/) - Compressão de imagens
* [Cloudflare](https://www.cloudflare.com) - Desempenho e segurança. No projeto, usado apenas para ativarmos o HTTPS.


## Time do projeto

* **Eduardo Shoiti Fujiwara** - *#HACKER* - [Github](https://github.com/eduardosht)
* **Andrey Kenji Tsuzuki** - *#HACKER* - [Github](https://github.com/Rosnaldo) [Github](https://github.com/ThaisDomingues)
* *Felippe Hiroyuki* - *#HUSTLER*
* *Rafael de Araujo Lindoso* - *#HUSTLER*
* *Krishna Balarama das Brunassi Barroso* - *#HUSTLER*
* *Gabriela Caldas Jorge* - *#HIPSTER*
* *Thiago Inforzato Virgilio* - *#HIPSTER*
* *Adonias Fernandes Pimenta Júnior* - *#HYPER*
* *Luisa Ferreira de Bello Vieira* - *#HYPER*
* *Bernardo Priolli* - *#HYPER*

## Estratégia de desenvolvimento
Com o prazo curto e com uma ferramenta nunca trabalhada pela equipe para elaboração do MVP, separamos inicialmente o MVP em dois componentes essenciais e mais complexos (login/cadastro e avaliação). 
O componente de avaliação por ser algo mais dinâmico através do front, a responsabilidade ficou com o [@Edu](https://github.com/eduardosht) pela facilidade. 
O componente de login/cadastro, não havia muita dinamização do front e menos layout. Com isso, como o [@Andrey](https://github.com/Rosnaldo) há havia feito essa integração, e tem maior interesse pelo back-end, a divisão ficou desta forma.

##### Cálculo do MVP
Como são 10 questões, cada questão tem o memso peso, valendo 10% cada questão respondida corretamente. Para aquelas que há mais de uma opção para selecionar, equivale os mesmos 10%, porém conforme a quantidade de acerto. Considerando x(número de acerto) e y(número de questões corretas).
```javascript
(x / y) * 10
```
##### Persistência
Parte das variáveis de identificação(nome, email, nível etc) estão sendo transportadas para outras sessões através do localStorage. O restante o envio é feito normalmente para o firebase.


#### Eduardo Shoiti Fujwara (Front-end):
* Desenvolvimento do WireFrame
* Desenvolvimento do Layout final
* Componente de avaliação
* Routes
* Validação com GA
* Lógica para a avaliação e resultado final
* Componente de instruções
* Envio de dados para o Firebase
* Integração com Cloudflare

#### Andrey Kenji Tsuzuki:
* Integração com Firebase
* Testes e Validações dos dados com Firebase
* Autenticação de usuários com Firebase
* Componente timer
* Componente de login e cadastro
* Component GuardAuth
