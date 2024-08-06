<center><img src="https://media.discordapp.net/attachments/551211620924260392/962460741829541959/cherry_code.png?width=376&height=904" width="40"/></center>

## Sobre a biblioteca

Focado em facilitar e deixar o código mais bonito, em vez de mandar uma string de html, utilizando as tecnologias front-end **React, vue, ejs**, assim evitando qualquer erro de escopo.
Biblioteca focado com os desenvolvimentos dentro da CherryCode com intuito de facilitar os desenvolvedores.

```
yarn add @cherry-code/mailer
```

## Como inicializar

Para inicializar seu primeito "Hello World", precisamos instancia a **Mailer** da biblioteca e dentro dele vai existir as seguintes opções:

- Dentro das opções de Client constructor:

| Atributo     | Tipo de valor       |
| ------------ | ------------------- |
| transporters | TransporterOption[] |
| templates    | TemplatesOptions[]  |

a opção transporters é herdada de **[nodemailer](https://nodemailer.com/about/)** no atributo chamado **transport** é você pode informar opção de uma criação de transport igual do exemplo do nodemailer em **createTransport**

- Mailer.options.transporters [OPCIONAL]

  | Atributo  | Tipo de valor                                         |
  | --------- | ----------------------------------------------------- |
  | name      | string                                                |
  | transport | [SMTPTransport.Options](https://nodemailer.com/smtp/) |

- Mailer.options.templates

  Caso seja path, ira renderizar para **ejs**, caso seja render vai renderizar para **React JSX**
  | Atributo | Tipo de valor |
  | -------- | -------------------------------------------------------------- |
  | name | string |
  | path? | string |
  | render? | [ReactElement](https://legacy.reactjs.org/docs/react-api.html) |

  **OBS:** Para conseguir renderizar um componente em react é preciso utilizar babel para transpilar.

## Funções

### **addTemplate(name: string, template: TemplatesOptions )**

- Função para adicionar mais um template de acordo com a render no atributo **template** utiliza mesmo tipo
  no new Mailer() **TemplatesOptions**.

### **start()**

- Caso inicialize o transport na constructor de Mailer, execute essa fução para ser criada os transport

### **addTransport(name: string, transport: [SMTPTransport.Options](https://nodemailer.com/smtp/) )**

- Função para adicionar um novo transport de nodemailer.

### **send(options: [Mail.Options](https://nodemailer.com/message/))**

- A mesma utilidade de **[sendMail](https://nodemailer.com/usage/)** de nodemailer

### getTransport(name: string)

- Recuperar um transport especifico
- dentro de transport você usa as funções de renderização:

  - ### **renderEngineView(name: string, data?: any)** renderizar para ejs
  - ### **renderReact(name: string)** renderizar para react
  - ## **renderEngineViewString(template: string, data?: any)** compilar uma string ejs para html

## Exemplos de inicialização:

```js
import { Mailer } from "@cherry-code/mailer";

const app = new Mailer();

// estou adicionando um transport (não é preciso usar start caso use o add)
app.addTransport("transportNotify", {
  host: "sandbox.smtp.mailtrap.io",
  port: 465,
  secure: false,
  auth: {
    user: "edummelo",
    pass: "senhadeseuemail",
  },
});

// aqui estou adicionando um template que vai renderizar como ejs
app.addTemplate("eduardoTemplate", { path: "./views/email.ejs" });

// estou recuperando um transport especifico
const transport = app.transporter.getTransport("transportNotify");

// como escolhi template que renderiza em ejs irei utilizar a função renderEngineView
await transport.renderEngineView("eduardoTemplate", { value: "Hello World" });

// após renderizar (é preciso aguardar a renderização você execute o send)
transport.send({
  from: "<CherryMailer>",
  to: "mailer@cherrycode.com.br",
  subject: "Cherry code libs",
});
```

Caso seja em react JSX

```js
import React from "react";

app.addTemplate("eduardoTemplate", { render: <p>Eduardo melo</p> });

await transport.renderReact("eduardoTemplate");

transport.send({
  from: "<CherryMailer>",
  to: "mailer@cherrycode.com.br",
  subject: "Cherry code libs",
});
```

Caso esteja em aplicação lado client ou que já transpila utilizando presets react , caso contrario utilize babel para transpilar

**EX:** `npx babel test/index.js --out-file test/app.js`

Esta biblioteca é para fins de trabalhos pessoais, mas você pode usar, caso tenha alguma sugestão ou algo a melhorar só abrir um PR ou um issue que irei avaliar.
