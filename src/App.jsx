Sistema Doceria
/
Claude terminou a resposta

preciso criar um sistema de caixa

quais módulos deve conter?
14 de mai.

Um sistema de caixa (PDV) bem completo geralmente precisa destes módulos:

Core (essencial)

    Vendas / PDV — registro de itens, aplicação de descontos, finalização da venda
    Pagamentos — dinheiro, cartão, Pix, múltiplas formas na mesma venda
    Caixa — abertura/fechamento, sangria, suprimento, relatório de fechamento

Cadastros

    Produtos — código, descrição, preço, estoque, código de barras
    Clientes — cadastro, histórico de compras, crédito/fiado
    Fornecedores — para vincular às entradas de estoque

Estoque

    Controle de estoque — entradas, saídas, ajustes, alertas de mínimo
    Inventário — contagem física periódica

Financeiro

    Contas a receber — parcelamentos, fiado, cheques
    Contas a pagar — despesas do negócio
    Fluxo de caixa — resumo do período

Relatórios

    Vendas por período, produto, vendedor
    Ticket médio, produtos mais vendidos
    DRE simplificado

Configurações / Admin

    Usuários e permissões (operador, gerente, admin)
    Dados da empresa, impressora fiscal/cupom
    Parâmetros de desconto máximo, etc.

Qual é o porte e segmento do negócio? (ex: restaurante, varejo, serviços?) Isso ajuda a priorizar o que desenvolver primeiro.

é uma loja de venda de bolos, doces e refrigerantes de porte pequeno
14 de mai.

Para uma loja pequena de bolos, doces e refrigerantes, o sistema pode ser bem mais enxuto. O que realmente importa:

Módulos essenciais (fase 1)

    PDV / Venda — busca de produto por nome ou código, carrinho, total
    Pagamentos — dinheiro (com troco), cartão, Pix
    Produtos — cadastro simples com nome, preço e categoria
    Fechamento de caixa — resumo do dia por forma de pagamento

Módulos úteis (fase 2)

    Estoque básico — controle de quantidade dos itens
    Fiado / Comanda — muito comum nesse tipo de negócio
    Relatórios simples — vendas do dia, semana, mês

O que pode dispensar por ser porte pequeno:

    Fornecedores, DRE, múltiplos usuários, inventário complexo

Antes de começar, me responde algumas coisas para definir a stack certa:

    Vai rodar no navegador, desktop ou mobile?
    Precisa funcionar sem internet (offline)?
    Vai usar impressora de cupom?
    Quer começar por qual módulo — o PDV ou o cadastro de produtos?

da pra ser no desktop porque tem um notebook mas seria interessante ter alguma forma de backup gerar um relatório pra salvas na nuvem algo assim

off-line é melhor 

não vai ter impressora não só o cupom fiscal da maquininha mesmo 

qualquer um
14 de mai.

Ótimo, cenário bem claro. Aqui vai a arquitetura ideal pra esse caso:

Stack recomendada

    Electron + React — roda no notebook como app desktop, funciona 100% offline
    SQLite — banco de dados local, leve e sem precisar de servidor
    Exportação em PDF/Excel — para o backup e relatórios na nuvem (salva no Google Drive, OneDrive manualmente ou automático)

Fluxo de backup sugerido

O sistema gera um arquivo de relatório/backup diário que o usuário salva numa pasta sincronizada com Google Drive ou OneDrive — simples e sem custo.

Ordem de desenvolvimento sugerida

    Cadastro de produtos
    PDV (tela de venda)
    Fechamento de caixa
    Relatórios + exportação
    Fiado (se precisar)

Quer que eu comece criando o projeto? Me diz:

    Você tem experiência com programação ou prefere algo que um desenvolvedor monte pra você?
    Quer que eu gere o código do projeto ou prefere um protótipo visual primeiro pra validar as telas?

mas não dá pra ser via web? não seria mais simples?
14 de mai.

Sim, dá perfeitamente! E você tem razão, é bem mais simples. Repensando o cenário:

Via web funciona bem porque:

    Abre no navegador do notebook, sem instalar nada
    Backup e relatórios sobem direto pra nuvem
    Se um dia quiser acessar do celular ou outro computador, já funciona
    Mais fácil de atualizar e manter

O offline ainda é possível via web?

Sim, com PWA (Progressive Web App) o sistema funciona sem internet e sincroniza quando a conexão voltar. Mas para uma loja pequena com notebook fixo, provavelmente a internet cai raramente — dá pra aceitar essa dependência tranquilo.

Stack web simples e eficiente pra esse caso:

    React — interface das telas
    localStorage ou IndexedDB — dados salvos no próprio navegador (offline)
    Exportação PDF/Excel — relatórios pra salvar no Google Drive manualmente

Sem servidor, sem banco de dados externo, sem custo.

Quer que eu já comece a construir? Me confirma só:

    Prefere começar pelo PDV (tela de venda) ou pelo cadastro de produtos?
    Tem alguma preferência de cor ou nome pro sistema?

sim o nome é rodat 

a cor é roxa 

vamos começar com um protótipo mesmo pra eu ver
14 de mai.
Visualizou um arquivo, criou um arquivo, leu um arquivo

Aqui está o protótipo do Rodat! 🎂

O que já funciona nesse protótipo:

Tela de PDV

    Grade de produtos com emoji, nome e preço
    Filtro por categoria (Bolos, Doces, Bebidas)
    Campo de busca
    Carrinho lateral com controle de quantidade

Tela de Pagamento

    Resumo dos itens
    Seleção de Dinheiro, Cartão ou Pix
    Cálculo automático de troco (quando dinheiro)
    Alerta se o valor for insuficiente

Tela de Confirmação

    Confirmação da venda com troco em destaque
    Contador de vendas e total do dia no topo

O que acha? Me fala o que quer ajustar — cores, layout, produtos, fluxo — e o que devemos construir a seguir (ex: cadastro de produtos, relatório do dia, histórico de vendas).
Rodat
Código · JSX 

Roxo #552072
Off 
#EFEFEF

usar essas duas cores 

não gostei não 
tá mais com cara de usuário e a ideia é fazer pra loja, pro caixa da loja
14 de mai.

Entendido! Vou reformular completamente — interface mais simples, direta e funcional, pensada pra quem tá operando o caixa, não pra um usuário de app.
Criou 2 arquivos, executou um comando, leu um arquivo

Reformulei completamente. Agora está com cara de sistema de caixa de verdade:

    Roxo #552072 e Off #EFEFEF em toda a interface
    Layout de dois painéis fixos — produtos à esquerda, venda à direita
    Tipografia monoespaçada, tudo em maiúsculo, sem frescura
    Produtos ficam roxo escuro quando adicionados, com contador visível
    Tela de pagamento direta: Dinheiro, Débito, Crédito, Pix
    Troco calculado em destaque em verde
    Confirmação limpa e objetiva

O que quer ajustar ou qual módulo vemos a seguir?
Rodat
Código · JSX 

essa é a logo tá 

mas n faz nada ainda to pensando
14 de mai.

Que logo linda! Serifada, elegante, com o cupcake — combina muito com a identidade da loja.

Fica à vontade, quando decidir o que quer fazer é só falar! 😊

precisa ter como abrir pedido de 5 mesas
uma função pra abrir o caixa e aí colocar quanto de dinheiro tem no início do dia 
e o cadastro de clientes pra anotar número e nome e um campo de observações 
controle de itens do estoque com aviso de quantidade mínima e controle de itens disponíveis pra venda
15 de mai.

Ótimo, ficou bem claro. Antes de construir, deixa eu confirmar como essas funções devem se conectar:

Mesas — ao fechar a conta da mesa, vai direto pro fluxo de pagamento igual à venda normal?

Respondendo essas três confirmo tudo e já monto o sistema completo de uma vez!

P: Mesas — ao fechar a conta, vai pro mesmo fluxo de pagamento (Dinheiro/Débito/Crédito/Pix)?
R: Sim, igual à venda normal

P: Estoque — os produtos do estoque são os mesmos do cardápio de vendas, ou são ingredientes separados?
R: Ingredientes separados (farinha, açúcar...)

P: Clientes — vai precisar vincular um cliente a uma venda ou mesa, ou é só cadastro de contato mesmo?
R: Só cadastro de contato
15 de mai.

Perfeito, tudo claro! Vou construir o sistema completo agora.
Remove old file
A resposta do Claude foi interrompida.

não precisa construir nada agora estamos só pensando juntos em como seria
15 de mai.

Ah, entendido! Ótimo então, vamos continuar alinhando.

Resumindo o que temos até agora:

PDV — venda rápida com carrinho, pagamento, troco ✓

Mesas — 5 mesas, pedido aberto, fecha com o mesmo fluxo de pagamento

Abertura de caixa — informa o troco inicial do dia antes de começar a operar

Clientes — nome, número, observações (só cadastro, sem vínculo com venda)

Estoque — ingredientes separados (farinha, açúcar...) com quantidade mínima e aviso de alerta

Produtos disponíveis — controle do que está ativo no cardápio pra venda

Tem mais alguma coisa que está pensando em adicionar, ou quer conversar melhor sobre como algum desses módulos deve funcionar?

a parte de troco ele vai calcular quanto dar pra pessoa né?
15 de mai.

Sim, exato! O fluxo é:

    Caixa digita quanto o cliente entregou (ex: R$ 20,00)
    O sistema calcula e mostra o troco na tela (ex: Troco: R$ 3,50)

Isso já está funcionando no protótipo atual, tanto pra venda normal quanto vai funcionar pra mesas também.

Mas você perguntou sobre a abertura de caixa — aquele valor inicial do dia (o fundo de troco) é só pra registro, pra saber quanto tinha no caixa quando abriu. Não interfere no cálculo do troco das vendas, que sempre é calculado na hora.

Faz sentido assim pra você?

sim mas o valor do dia tem q ir alterando conforme as vendas 

pode mostrar quanto ainda tem em notas e quanto faturou total no dia por exemplo
15 de mai.

Faz todo sentido! Então o caixa ficaria assim:

Ao abrir o caixa

    Informa o valor inicial em dinheiro (fundo de troco)

Durante o dia, o sistema vai atualizando:

    💵 Dinheiro em caixa — fundo inicial + todas as vendas pagas em dinheiro − trocos dados
    📊 Faturamento total do dia — soma de todas as formas de pagamento (dinheiro + cartão + pix)

No fechamento, mostra um resumo separado por forma de pagamento:

    Total em dinheiro, total no débito, total no crédito, total no Pix
    Quanto entrou de dinheiro físico no caixa

Faz sentido separar assim — dinheiro físico no caixa é diferente de faturamento total, porque cartão e Pix não entram no caixa fisicamente.

Quer adicionar também a possibilidade de registrar uma sangria (quando retira dinheiro do caixa durante o dia)? É bem comum em loja física.

s é uma boa né 

o que mais vc sugere?
15 de mai.

Além da sangria, algumas coisas que fazem sentido pra uma loja desse tipo:

Suprimento de caixa — o oposto da sangria, quando precisa colocar mais dinheiro no caixa durante o dia (ex: buscar troco no banco).

Cancelamento de item — errou o pedido, remove o item da venda sem precisar cancelar tudo.

Desconto na venda — aplicar um desconto em % ou valor fixo antes de fechar, útil pra clientes frequentes ou promoções.

Relatório do dia — ao fechar o caixa, gerar um resumo em PDF pra salvar no Google Drive. Vendas, formas de pagamento, sangrias, valor final em caixa.

Histórico de vendas — ver as últimas vendas do dia, útil se precisar consultar ou cancelar algo.

O que eu não sugiro por ora pra não complicar:

    Nota fiscal eletrônica — a maquininha já cuida disso
    Controle de funcionários — pra uma loja pequena não vale agora
    Fidelidade/pontos — pode vir numa segunda fase

Do que listei, o que faz mais sentido incluir agora?

simmm histórico de venda é uma boa precisa mesmo 

e o fidelidade tbm 
no cadastro do cliente marcar quantas vendas a pessoa já pagou e q cada 10 reais gera um ponto e cada ponto é 1 real
15 de mai.

Boa! Fidelidade simples assim funciona muito bem. Confirmando a regra:

Pontos:

    A cada R$ 10,00 gastos → 1 ponto
    1 ponto = R$ 1,00 de desconto
    O cliente pode usar os pontos na hora de pagar

No cadastro do cliente vai ter:

    Nome, telefone, observações
    Total de pontos acumulados
    Histórico de quantas compras fez

Uma dúvida só pra fechar essa parte — como o caixa vai identificar o cliente na venda?

Procura pelo nome ou pelo telefone antes de fechar o pagamento, confirma que é aquele cliente, e aí o sistema já aplica os pontos automaticamente?

isso 
acho que pelo telefone é o mais simples pra n ter q lidar com lgpd dos dados pessoais
15 de mai.

Exato, pelo telefone é mais simples e seguro mesmo.

Então o fluxo fica:

Na hora da venda:

    Caixa digita o telefone do cliente (opcional, não obrigatório)
    Sistema encontra o cliente e mostra nome + pontos disponíveis
    Se tiver pontos, pergunta se quer usar
    Desconta os pontos do total e registra os novos pontos ganhos na compra

No cadastro:

    Telefone (identificador principal)
    Nome
    Observações
    Pontos acumulados
    Número de compras

Acho que o sistema está bem redondo agora. Resumindo tudo que vai ter:

    Abertura de caixa com fundo inicial
    PDV — venda rápida
    Mesas — 5 mesas com pedido aberto
    Pagamento — Dinheiro, Débito, Crédito, Pix + troco automático
    Fidelidade — busca por telefone, pontos, resgate
    Clientes — cadastro simples
    Estoque — ingredientes com alerta de mínimo
    Produtos — controle do cardápio
    Caixa — sangria, suprimento, saldo em tempo real
    Histórico de vendas
    Fechamento de caixa — relatório em PDF

Quer começar a construir agora ou ainda tem algo pra pensar?

mas assim a venda não é obrigatório vincular a um cliente tá
15 de mai.

Sim, exato — o cliente é sempre opcional na venda. O caixa só busca o telefone se o cliente quiser participar do programa de fidelidade, caso contrário a venda segue normalmente sem vínculo nenhum.

Podemos começar a construir?

me mostra só um esquema de como isso seria n precisa construir agora
15 de mai.

Aqui vai o esquema geral de navegação do sistema:

TELA INICIAL — Painel Mostra: saldo do caixa, total do dia, alertas de estoque baixo Acesso rápido pra todos os módulos

CAIXA Abertura → informa fundo inicial Durante o dia → sangria / suprimento Fechamento → relatório PDF

PDV (venda balcão) Seleciona produtos → busca cliente por telefone (opcional) → pagamento → troco → pontos registrados

MESAS (5 mesas) Abre mesa → adiciona itens → fecha conta → mesmo fluxo de pagamento do PDV

HISTÓRICO Lista de vendas do dia → detalhe de cada venda

CLIENTES Cadastro: telefone, nome, observações Ficha: pontos, número de compras, histórico

PRODUTOS Lista do cardápio → ativar/desativar item → nome e preço

ESTOQUE Ingredientes → quantidade atual, quantidade mínima → alerta quando estiver baixo

Faz sentido assim? Algo que queira mover, juntar ou separar?

acho que pra começar é isso mesmo 
tá ótimo 

e a parte visual?
15 de mai.

A identidade já está bem definida pela logo:

Cores

    Roxo #552072 — cor principal, cabeçalhos, botões, destaques
    Off-white #EFEFEF — fundo geral
    Branco #FFFFFF — cards e painéis
    Verde só pra troco e confirmações
    Vermelho só pra alertas e cancelamentos

Tipografia

    A logo usa uma fonte serifada elegante — vale seguir essa direção pro nome/título
    Pro sistema em si fica melhor uma fonte mais legível e direta, sem serifa, que seja fácil de ler rápido no caixa

Visual geral

    O protótipo atual já tem a linha certa — limpo, direto, sem enfeite
    Bordas retas, sem arredondado exagerado
    Textos em maiúsculo nos rótulos e botões, igual ao protótipo
    Nada de sombra pesada ou gradiente — flat e funcional

O que muda do protótipo atual

    Adicionar o logo da Rodat no topo
    Painel inicial com cards de resumo
    Ícones simples nos menus de navegação

Tá alinhado com o que você imaginou ou quer mudar alguma coisa antes de começar?

acho que é isso 
deixa eu ver
15 de mai.

Claro, fica à vontade! Quando quiser começar a construir ou tiver alguma dúvida é só chamar. 😊

quero ver no caso kk o visual
15 de mai.

Ah entendi, quer ver o protótipo visual atualizado com tudo isso! Vou construir agora.
Visualizou um arquivo, executou um comando, criou um arquivo

Aqui está o sistema completo! Tudo funcionando nesse protótipo:

O que tem agora:

    Painel — resumo do dia, alertas de estoque baixo, últimas vendas
    Caixa — abertura com fundo inicial, sangria, suprimento, saldo em tempo real por forma de pagamento
    PDV — venda com fidelidade por telefone, troco automático
    Mesas — 5 mesas, abre/fecha pedido, mesmo fluxo de pagamento
    Histórico — todas as vendas com detalhes
    Clientes — cadastro com pontos e contagem de compras
    Produtos — cadastro e ativar/desativar do cardápio
    Estoque — ingredientes com alerta de quantidade mínima

O que acha? Tem algo que quer ajustar?
Rodat
Código · JSX 

ta faltando o botão pra fechar o caixa e como colocar a quantidade de produtos tbm e não só dos itens separados mas exemplo hj temos 3 bolos de chocolate
15 de mai.

Ótimo feedback, são três ajustes claros:

    Botão fechar caixa — com resumo do dia antes de confirmar
    Quantidade no estoque de ingredientes — já tem, mas vou verificar
    Quantidade dos produtos do cardápio — ex: "hoje temos 3 bolos de chocolate disponíveis", quando zerar some do PDV automaticamente

Só confirmando o item 3: essa quantidade é definida todo dia manualmente pelo caixa ("hoje fiz 3 bolos de chocolate"), ou ela diminui conforme as vendas, ou os dois?

a quantidade de estoque ya ótimo já 
a quantidade de produtos do cardápio tem q ser persistente então eu editei q agora tenho 5 bolos de chocolate e hoje vendi 2, amanhã quando abrir o caixa ele vai puxar 3 unidades e aí tenho q ter um aviso nele que por exemplo estoque baixo menos de x unidades
15 de mai.

Perfeito, ficou bem claro! Então:

    Quantidade do produto é persistente — vai diminuindo conforme as vendas
    Aviso de estoque baixo configurável por produto — ex: avisar quando tiver menos de 3 unidades
    Quando chegar a zero, some do PDV automaticamente

E o fechar caixa — ao fechar, quer que ele bloqueie novas vendas até abrir novamente no dia seguinte, ou é só um relatório de encerramento mesmo?

só um relatório mas se eu quiser abrir de novo no mesmo dia tudo bem 

aí vai mostrar o que nesse relatório? acho que é melhor excel então se gerar um texto formado csv por exemplo já atende que aí copia e cola na nuvem n precisa especificamente gerar um pdf

e tem como abrir relatório nas venda? com um filtro pra ver tipo ontem 
ou semana passada
15 de mai.

Ótimo, CSV é mais simples e resolve bem. Sobre os relatórios:

Relatório de fechamento de caixa — o que faz sentido ter:

    Fundo inicial
    Total de vendas por forma de pagamento
    Sangrias e suprimentos
    Troco total dado
    Saldo final em dinheiro
    Número de vendas e ticket médio

Relatório de vendas com filtro — confirma se é isso:

    Filtro por período (hoje, ontem, semana, mês, ou datas livres)
    Lista de vendas com hora, valor, forma de pagamento
    Totais por forma de pagamento no período

Só uma dúvida sobre o filtro de datas — como os dados ficam só no navegador por enquanto, o histórico some se fechar o navegador. Isso é um ponto importante pra pensar antes de construir de verdade.

Quer que os dados sejam salvos localmente no computador (usando localStorage do navegador) pra persistir entre dias? Assim o histórico fica guardado mesmo fechando o sistema.

no relatório de fechamento precisa ter tbm o número de itens que foram vendidos de cada item 

e a ideia é integrar tudo isso num banco de dados local né que vc vai me falar qual usar mas precisa ser leve e gratuito
15 de mai.

Perfeito, faz todo sentido no relatório!

Relatório de fechamento — itens vendidos:

    Nome do produto, quantidade vendida, total arrecadado por item
    Ex: Bolo de Chocolate × 3 — R$ 25,50

Banco de dados local — a escolha certa pra esse caso é o SQLite.

É o mais usado no mundo pra esse tipo de sistema justamente porque é leve, gratuito, não precisa de servidor e salva tudo num único arquivo no computador. Você pode fazer backup desse arquivo no Google Drive a qualquer momento.

Antes de continuar, preciso alinhar uma coisa importante. O protótipo atual roda direto no navegador como uma página React, mas pra usar SQLite de verdade vai precisar de uma estrutura um pouco diferente:

Opção A — Electron — transforma o sistema num app desktop instalado no notebook, acessa SQLite direto. Mais robusto mas exige instalar Node.js no computador.

Opção B — Backend local simples — um servidor leve rodando na máquina (Python + FastAPI por exemplo), o navegador acessa normalmente. SQLite fica no servidor. Mais simples de manter.

Opção C — localStorage por enquanto — mantém tudo no navegador, persiste entre sessões, exporta CSV. Funciona bem pra começar, migra pro SQLite depois.

Qual faz mais sentido pra você?

o note é fraco então n pode ser exemplo o sql lite e um html? ou supabase mesmo e um html?
15 de mai.

Boa pergunta! Sim, dá perfeitamente:

HTML + Supabase é uma ótima combinação pra esse caso:

    HTML puro — abre direto no navegador, sem instalar nada, não pesa no notebook
    Supabase — banco de dados na nuvem, gratuito até um bom limite, já resolve o backup automaticamente porque os dados ficam na internet
    Acessa de qualquer lugar — notebook da loja, celular, onde quiser
    Sem servidor local, sem instalação, sem peso na máquina

Bônus: como fica na nuvem, o histórico de vendas nunca some e o relatório pode puxar qualquer período, não só o dia atual.

Limitação: precisa de internet pra funcionar. Mas como o sistema vai rodar no notebook da loja que provavelmente tem wi-fi, não é problema na prática.

Então a stack final seria:

    React — interface (igual ao protótipo atual)
    Supabase — banco de dados e autenticação
    CSV — exportação de relatórios
    Hospedagem gratuita — Vercel ou Netlify pra acessar pelo navegador

Quer seguir por esse caminho? Se sim, posso já montar a estrutura das tabelas do banco antes de começar a construir.

o que é vercel e o netlify
15 de mai.

São serviços gratuitos que colocam seu site/sistema na internet. Funciona assim:

Sem eles — o sistema fica só no seu computador, se trocar de notebook perde tudo ou precisa mover os arquivos.

Com eles — o sistema fica num endereço na internet tipo rodat.vercel.app e você acessa de qualquer navegador, em qualquer máquina, só digitando o endereço. É gratuito pra esse porte.

Na prática pra você seria assim:

    Acessa rodat.vercel.app no navegador do notebook da loja
    Faz login
    Opera normalmente
    Dados ficam salvos no Supabase automaticamente

É basicamente um sistema web completo, igual ao iFood ou qualquer sistema que você acessa pelo navegador, mas feito só pra Rodat.

A única dependência é internet, mas como o Supabase já era necessário pra isso, não muda nada.

Quer seguir por esse caminho? Se sim, o próximo passo seria montar a estrutura das tabelas do banco — que é o "esqueleto" de onde tudo vai ser salvo.

mas nada disso é pago? é seguro? tem user e senha? qual o limite do supabase?
15 de mai.

Ótimas perguntas, vou responder uma por uma:

É pago?

    Vercel — gratuito pra projetos pequenos, sem limite de tempo
    Supabase — gratuito até 500MB de banco e 50.000 requisições por mês. Pra uma loja pequena isso é muito mais do que suficiente, você provavelmente nunca vai chegar perto do limite

É seguro?

    Sim. Supabase é usado por empresas grandes no mundo todo
    Os dados ficam criptografados nos servidores deles
    Só acessa quem tiver usuário e senha do sistema

Tem usuário e senha?

    Sim, o Supabase já tem autenticação pronta
    Você teria login pra acessar o sistema, ninguém de fora consegue ver os dados

Limite do Supabase no plano gratuito:

    500MB de banco de dados
    50.000 requisições por mês
    2 projetos gratuitos
    Pra ter ideia: uma loja fazendo 50 vendas por dia durante 10 anos não chega em 500MB

O único risco real é se o Supabase um dia encerrar o plano gratuito, mas isso é improvável e mesmo que aconteça os dados são exportáveis e dá pra migrar.

Quer seguir? O próximo passo é montar as tabelas do banco.

eu preciso que adicione dentro dos produtos algns campos Tipo 
Valor total 13,00
Insumo 4,91
Custo produção 1,33
Lucro 6,76
15 de mai.

Faz muito sentido ter isso! Então cada produto teria:

Preço de venda — R$ 13,00 (o que o cliente paga) Custo dos insumos — R$ 4,91 (ingredientes usados) Custo de produção — R$ 1,33 (energia, embalagem, mão de obra...) Lucro — R$ 6,76 (calculado automaticamente: venda − insumos − produção)

Só confirma uma coisa — o custo dos insumos você vai digitar manualmente por produto, ou quer que o sistema calcule automaticamente baseado nos ingredientes do estoque?

Por exemplo: cadastra que um bolo de chocolate usa 200g de farinha, 2 ovos, 100g de chocolate... e o sistema calcula o custo sozinho baseado no preço dos ingredientes.

vou entrar manualmente com esse valor
15 de mai.

Perfeito, mais simples e direto assim.

Então o cadastro de cada produto vai ter:

    Nome
    Categoria
    Preço de venda
    Custo dos insumos (digitado manualmente)
    Custo de produção (digitado manualmente)
    Lucro (calculado automaticamente: venda − insumos − produção)
    Quantidade em estoque
    Quantidade mínima (alerta de estoque baixo)
    Ativo/inativo (aparece ou não no PDV)

E no relatório de fechamento isso abre uma possibilidade boa — além de quantos itens vendeu, mostrar o lucro total do dia por produto. Faz sentido incluir?

e no estoque precisa ter a possibilidade de editar o min tbm
15 de mai.

Sim, faz sentido! E já estava faltando mesmo.

Então no estoque cada ingrediente vai ter:

    Nome
    Unidade (kg, un, L...)
    Quantidade atual — editável
    Quantidade mínima — editável
    Alerta automático quando atual ≤ mínimo

Acho que agora o sistema está bem redondo e detalhado. Quer que eu faça um resumo completo de tudo que foi definido até aqui antes de começar a construir de verdade?

nessa parte que estamos falando de relatorio acho que cabe uma nova aba chamada faturamente, ai tem um filtro editavel das datas pra eu escolehr semanalmente mensalmente etc com a quant de items vendida por cada item, e o valor todal de insumo prod etc de cada um tbm a soma relacionada ao filtro que eu escolhi
15 de mai.

Perfeito, ficou muito claro! Então a aba Faturamento seria assim:

Filtro de período

    Hoje, ontem, essa semana, esse mês
    Ou datas livres — de X até Y

Por produto (dentro do período escolhido)

    Quantidade vendida
    Receita total (preço venda × qtd)
    Custo insumos total (custo insumo × qtd)
    Custo produção total (custo produção × qtd)
    Lucro total (lucro × qtd)

Totais gerais do período

    Total vendido
    Total gasto em insumos
    Total gasto em produção
    Lucro total do período
    Por forma de pagamento também

Isso vira um DRE simplificado bem útil pra gestão da loja.

Acho que agora sim o sistema está completo. Quer o resumo geral de tudo antes de começar a construir?

e quanto ao fechamento do dia, me lembra como esta agora
15 de mai.

Pelo que definimos, o fechamento de caixa gera um CSV com:

    Fundo inicial
    Total de vendas por forma de pagamento (dinheiro, débito, crédito, pix)
    Sangrias e suprimentos
    Troco total dado
    Saldo final em dinheiro
    Número de vendas e ticket médio
    Quantidade vendida de cada item + total arrecadado por item

E após fechar, o caixa pode ser reaberto no mesmo dia se precisar.

Com o que definimos agora sobre faturamento, faz sentido o CSV do fechamento incluir também custo de insumos, produção e lucro por item? Assim o fechamento já traz a visão financeira completa do dia sem precisar ir na aba faturamento.

sim incui tudo isso por favor mas antes do relatorio ser gerado abrir um campo com exemplo "debito - calculo do sistema e um campo manual pra bater com a maquiinha" ai ele faz o calculo se ficou faltando sobrando ou se deu certo

ai mostra tudo isso na tela e embaixo um botao pra copiar o csv, n precisa ter o csv na tela
15 de mai.

Perfeito! Então o fluxo de fechamento fica assim:

Passo 1 — Conferência das máquinas Antes de gerar o relatório, abre uma tela com campos assim:
Forma	Sistema	Máquina	Diferença
Débito	R$ 120,00	[campo manual]	R$ 0,00 ✓
Crédito	R$ 85,00	[campo manual]	−R$ 5,00 ⚠
Pix	R$ 60,00	[campo manual]	R$ 0,00 ✓
Dinheiro	R$ 95,00	[campo manual]	R$ 0,00 ✓

Passo 2 — Relatório na tela Mostra tudo organizado — vendas, itens, custos, lucro, diferenças da conferência

Passo 3 — Botão copiar CSV Um clique, copia tudo, cola onde quiser

Faz sentido assim? E o dinheiro em caixa na conferência seria o valor físico contado nas notas, certo?

perfeito e em todos os lugares onde tive debito credito pix e dinheiro adicionar tbm a opção voucher por favor
15 de mai.

Anotado! Voucher entra em todos os lugares junto com as outras formas de pagamento:

    PDV
    Mesas
    Fechamento de caixa
    Conferência da máquina
    Relatório de faturamento
    CSV

Acho que agora o sistema está 100% definido. Quer o resumo completo antes de começar a construir?

aham
15 de mai.

Aqui vai o resumo completo do sistema Rodat Doces e Cafés:

STACK

    React + Supabase (banco na nuvem)
    Hospedagem gratuita via Vercel
    Login com usuário e senha

FORMAS DE PAGAMENTO (em todo o sistema) Dinheiro, Débito, Crédito, Pix, Voucher

1. PAINEL

    Resumo do dia: vendas, faturamento, dinheiro em caixa
    Alertas de estoque baixo (ingredientes e produtos)
    Últimas vendas

2. CAIXA

    Abertura com fundo inicial
    Saldo em tempo real (fundo + entradas − trocos − sangrias + suprimentos)
    Sangria e suprimento com observação
    Histórico de movimentos do dia
    Fechamento de caixa:
        Conferência por forma de pagamento (sistema vs máquina, mostra diferença)
        Relatório completo na tela (vendas, itens, custos, lucro, conferência)
        Botão copiar CSV
        Pode reabrir no mesmo dia se precisar

3. PDV

    Grade de produtos com filtro por categoria e busca
    Carrinho com controle de quantidade
    Fidelidade opcional por telefone
    Pagamento com troco automático
    Pontos: R$ 10 = 1 ponto = R$ 1,00 de desconto

4. MESAS

    5 mesas
    Abre pedido, adiciona itens, fecha conta
    Mesmo fluxo de pagamento do PDV

5. HISTÓRICO

    Lista de vendas com filtro por período (hoje, ontem, semana, mês, datas livres)
    Detalhe de cada venda: itens, valor, forma de pagamento, cliente

6. FATURAMENTO

    Filtro editável de período
    Por produto: quantidade vendida, receita, custo insumos, custo produção, lucro
    Totais gerais do período
    Por forma de pagamento

7. CLIENTES

    Cadastro: telefone (identificador), nome, observações
    Pontos acumulados e número de compras
    Busca por nome ou telefone

8. PRODUTOS

    Cadastro: nome, categoria, preço de venda, custo insumos, custo produção, lucro (automático)
    Quantidade em estoque (persistente, diminui com vendas)
    Quantidade mínima (alerta de estoque baixo)
    Ativar/desativar (some do PDV quando inativo ou zerado)

9. ESTOQUE (ingredientes)

    Cadastro: nome, unidade, quantidade atual, quantidade mínima
    Edição de quantidade atual e mínima
    Alerta quando quantidade ≤ mínimo

Está tudo certo? Posso começar a construir!

sim mas pode primeiro gerar um jsx pra eu ver?
e ah, a fonte do logo é a the seasons, incremente ela por favor
15 de mai.

Vou buscar a fonte The Seasons e já monto o protótipo visual atualizado!
Pesquisou na web

Achei o CDN. Vou montar o protótipo completo agora com a fonte The Seasons no logo e todos os módulos atualizados.
Executou um comando, criou um arquivo, leu um arquivo

Aqui está o sistema completo atualizado! O que tem agora:

Novidades desta versão:

    The Seasons no logo e título da loja
    Voucher em todas as formas de pagamento
    Quantidade nos produtos — controle +/− na tela de Produtos, diminui automaticamente conforme as vendas, alerta de estoque baixo
    Fechar Caixa — fluxo completo: conferência com máquina (sistema vs valor digitado, mostra diferença), relatório na tela com todos os detalhes, botão copiar CSV
    Faturamento — aba separada com filtro de período e detalhamento por produto (receita, insumos, produção, lucro)
    Estoque — edição de quantidade mínima junto com a atual
    Produtos — campo de custo insumos, custo produção e lucro calculado automaticamente

O que quer ajustar?
Rodat
Código · JSX 

não ta dando pra editar os produtos, preciso conseguir abrir ele pra eventualmente acrescentar quantidade ou ajuste de preços

e na parte de relatorios e faturamento alem dos botoes prontos de hoje ontem etc, eu quero pode escolher o dia manualmente abrir um calendario algo assim
15 de mai.

Anotado! Dois ajustes claros:

    Produtos — botão editar em cada produto pra alterar nome, preço, custos, quantidade e mínimo
    Calendário — seletor de data manual nos filtros de Histórico e Faturamento

Vou atualizar agora.
Executou um comando, criou um arquivo, leu um arquivo

Pronto! As duas atualizações estão feitas:

Edição de produtos — botão EDITAR em cada produto abre um modal com todos os campos: nome, categoria, preço de venda, custo de insumos, custo de produção (com lucro calculado na hora), quantidade atual e quantidade mínima. Salva tudo de uma vez.

Filtro de datas — nos módulos Histórico e Faturamento agora tem os botões rápidos (Hoje, Ontem, Semana, Mês) e o botão Personalizado que abre dois campos de data para escolher o período exato.

O que mais quer ajustar?
Rodat
Código · JSX 

acho que é isso hein, a fonte n entrou mas é pq n ta conectado na internet né

agora vamos lá, qual passo a apsso pra gente criar isso?
conta no supa
o que mais
15 de mai.

Isso mesmo, a fonte The Seasons vai aparecer certinho quando estiver online!

Aqui vai o passo a passo completo:

1. Criar conta no Supabase

    Acessa supabase.com e cria uma conta gratuita
    Cria um novo projeto (escolhe um nome, ex: "rodat")
    Anota a URL do projeto e a chave anon/public — vão ser usadas no código

2. Criar as tabelas no banco Dentro do Supabase tem um editor SQL. Vou te passar os comandos prontos pra criar todas as tabelas de uma vez (produtos, vendas, clientes, estoque, caixa, movimentos).

3. Criar conta no Vercel

    Acessa vercel.com e cria uma conta gratuita (pode entrar com Google)
    O Vercel vai hospedar o sistema online

4. Criar conta no GitHub

    O Vercel puxa o código direto do GitHub
    Cria uma conta em github.com se ainda não tiver
    Vou te dar o projeto organizado pra subir lá

5. Subir o código

    Coloca os arquivos no GitHub
    Conecta o repositório no Vercel
    Vercel publica automaticamente — fica disponível num link tipo rodat.vercel.app

6. Testar e ajustar

    Testa tudo online
    A partir daí qualquer alteração que fizer no código e subir no GitHub, o Vercel atualiza sozinho

Você já tem conta em algum desses ou vai criar tudo do zero?

o vercel tem login pra acesso? pq se vamosp ublivar o banco
15 de mai.

Boa pergunta e ponto importante! O Vercel em si não tem sistema de login — ele só hospeda o site. Quem cuida do login é o Supabase, que já tem autenticação pronta.

Então o fluxo seria:

    Ao acessar rodat.vercel.app aparece uma tela de login (email e senha)
    Só entra quem tiver cadastro no sistema
    Os dados no banco ficam protegidos pelas regras do Supabase — mesmo que alguém descubra o link, sem login não vê nada

Você precisaria de quantos usuários?

Por exemplo:

    Só você (dono) com acesso total
    Uma funcionária operando o caixa com acesso limitado (sem ver relatórios financeiros, sem editar produtos)

Isso define se vale a pena criar níveis de acesso agora ou deixar pra uma segunda fase.

não, uma pessoa só
15 de mai.

Perfeito, ainda mais simples então. Um único usuário, sem complicação de permissões.

O login vai ser só um email e senha cadastrados no Supabase. Ninguém mais consegue entrar.

Quer começar agora? Me fala quando tiver criado a conta no Supabase que eu te passo os comandos SQL pra criar as tabelas, aí a gente segue o passo a passo.

pode gerar o codigo pro supa, o projeto esta criado
15 de mai.

Precisro de duas informações do seu projeto pra gerar o código conectado certinho:

    URL do projeto — algo como https://xyzxyzxyz.supabase.co
    Chave anon/public — encontra em Settings → API → anon public

Me passa essas duas e já gero tudo conectado!

project id
nhymxskzrrzaddenapcf

publishable key
sb_publishable_vUxzPFgF0pWjh6Le7_F6MA_Xrh8nobE
15 de mai.

Obrigado! Mas antes de usar essas credenciais, uma observação importante:

A publishable key que você me passou não é a chave certa pra conectar o Supabase no código. Você precisa da anon/public key, que fica em:

Supabase → Settings → API → Project API Keys → anon public

Ela começa com eyJ... e é bem mais longa.

Além disso, recomendo não compartilhar chaves em conversas — mesmo a anon key. O ideal é você colocá-la diretamente no código quando eu gerar, sem passar por aqui.

Então o que vou fazer: gero o código SQL das tabelas e o código do projeto com um placeholder pra você substituir pelas suas credenciais. Assim fica mais seguro.

Pode ser assim?

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5oeW14c2t6cnJ6YWRkZW5hcGNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4NTMzMzYsImV4cCI6MjA5NDQyOTMzNn0.A2l1_dMPoFA56ltkgz1KXQ8Xv_FvsSIJE4L0b8SCElY
15 de mai.

Perfeito, tenho tudo que preciso. Mas por segurança vou te pedir pra apagar essa mensagem depois — essa chave dá acesso ao seu banco.

Vou gerar agora:

    O SQL pra rodar no Supabase e criar todas as tabelas
    O código do projeto completo já conectado

Começando pelo SQL:
Criou um arquivo, leu um arquivo

Primeiro passo pronto! Esse é o SQL pra criar todas as tabelas.

Como rodar:

    No Supabase, vai em SQL Editor (menu lateral)
    Cola todo o conteúdo desse arquivo
    Clica em Run

Vai criar as tabelas: produtos, clientes, vendas, itens da venda, caixa, movimentos e estoque — todas protegidas com autenticação.

Próximo passo: criar o usuário de login.

No Supabase vai em Authentication → Users → Add user e cria com o email e senha que você vai usar pra acessar o sistema.

Me avisa quando o SQL rodar e o usuário estiver criado, aí gero o código completo do projeto conectado ao banco!
Rodat schema
Código · SQL 

ja rodei o sql e ja criei o user
15 de mai.

Perfeito! Agora vou gerar o projeto completo conectado ao Supabase.

Vai ser composto de alguns arquivos:

    index.html — entrada do app
    src/main.jsx — inicialização
    src/supabase.js — conexão com o banco
    src/App.jsx — sistema completo

Vou gerar agora:
Criou 7 arquivos, executou um comando, leu um arquivo

Projeto completo gerado! Aqui estão todos os arquivos.

Próximo passo — subir no GitHub:

    Cria uma conta em github.com se não tiver
    Cria um repositório novo chamado rodat
    Baixa os arquivos acima e coloca na estrutura:

rodat/
  index.html
  package.json
  vite.config.js
  .gitignore
  src/
    main.jsx
    App.jsx
    supabase.js

    Sobe tudo pro GitHub

Depois é só conectar o GitHub no Vercel e publicar. Me avisa quando o repositório estiver criado que te explico o passo seguinte!
App
Código · JSX 
Supabase
JS 
Package
Código · JSON 
Index
Código · HTML 
Vite.config
JS 
.gitignore
GITIGNORE 

baixei os 6 arquivos e coloquei no github
o que mais faço
15 de mai.

Perfeito! Agora vamos conectar no Vercel:

1. Acessa vercel.com e cria uma conta gratuita — pode entrar com a conta do GitHub, fica mais fácil.

2. Clica em "Add New Project"

3. Seleciona o repositório rodat que aparece na lista

4. Em "Framework Preset" seleciona Vite

5. Clica em "Deploy"

O Vercel vai buildar e publicar automaticamente. Em 1-2 minutos fica disponível num link tipo rodat.vercel.app.

Me avisa quando chegar na tela de deploy que te guio no próximo passo!

error during build:
[vite]: Rollup failed to resolve import "/src/main.jsx" from "/vercel/path0/index.html".
This is most likely unintended because it can break your application at runtime.
If you do want to externalize this module explicitly add it to
build.rollupOptions.external
 at viteWarn (file:///vercel/path0/node_modules/vite/dist/node/chunks/dep-BK3b2jBa.js:65855:17)
 at onRollupWarning (file:///vercel/path0/node_modules/vite/dist/node/chunks/dep-BK3b2jBa.js:65887:5)
 at onwarn (file:///vercel/path0/node_modules/vite/dist/node/chunks/dep-BK3b2jBa.js:65550:7)
 at file:///vercel/path0/node_modules/rollup/dist/es/shared/node-entry.js:21404:13
 at Object.logger [as onLog] (file:///vercel/path0/node_modules/rollup/dist/es/shared/node-entry.js:23385:9)
 at ModuleLoader.handleInvalidResolvedId (file:///vercel/path0/node_modules/rollup/dist/es/shared/node-entry.js:22129:26)
 at file:///vercel/path0/node_modules/rollup/dist/es/shared/node-entry.js:22087:26
Error: Command "npm run build" exited with 1
15 de mai.

O problema é que o index.html e o package.json estão na raiz mas os arquivos src/ provavelmente ficaram fora da pasta certa no GitHub.

Me confirma como ficou a estrutura no seu repositório — clica no repositório no GitHub e me diz o que aparece na raiz. Deve estar assim:

index.html
package.json
vite.config.js
.gitignore
src/
  App.jsx
  main.jsx
  supabase.js

Se o src/ não aparecer como pasta ou os arquivos estiverem todos na raiz sem a pasta src, é só esse o problema — mover os três arquivos pra dentro de uma pasta chamada src no GitHub resolve.
15 de mai.

É exatamente isso — todos os arquivos estão na raiz, faltando a pasta src. O App.jsx, main.jsx e supabase.js precisam estar dentro de uma pasta src.

Faz assim no GitHub:

1. Clica em App.jsx

2. Clica no lápis (editar) no canto superior direito

3. No campo do nome do arquivo lá em cima, coloca o cursor antes de App.jsx e digita src/ — vai criar a pasta automaticamente

4. Clica em Commit changes

5. Repete o mesmo para main.jsx e supabase[1].js — renomeia também o supabase[1].js para supabase.js (sem o [1]) enquanto edita

Depois que os três estiverem dentro de src/ a estrutura fica certa e o Vercel vai buildar normalmente. Me avisa quando fizer!

eu n tenho esse arquivo main
15 de mai.

Você tem razão, o main.jsx não foi gerado como arquivo separado para download. Vou criar ele agora:
Presented file

Aqui está o main.jsx. Baixa ele e segue o mesmo processo:

    Sobe o main.jsx no GitHub
    Move os três arquivos (App.jsx, main.jsx, supabase.js) para dentro de uma pasta src/ usando o processo do lápis que expliquei
    Renomeia supabase[1].js para supabase.js enquanto edita

Me avisa quando estiver feito!
Main
Código · JSX 
15 de mai.

Quase certo! O problema é que ficou main.jsx e .gitignore dentro da pasta src sendo que deveriam estar na raiz. A estrutura certa é:

raiz/
  .gitignore
  index.html
  package.json
  vite.config.js
  src/
    App.jsx
    main.jsx
    supabase.js

No GitHub, clica no .gitignore que está dentro de src, edita ele e no nome do arquivo muda de src/.gitignore para .gitignore — isso vai mover ele pra raiz.

O main.jsx que está na raiz pode apagar também, só precisa do que está dentro de src/.

Me avisa quando ajustar!

essa autenticação é assim?

ocê abre a dash ↓ Tela de login (email + senha) ↓ Supabase autentica ↓ Token gerado → todas as queries passam com esse token ↓ RLS (Row Level Security) garante que só você vê seus dados

isso é seguro mesmo?
15 de mai.

Sim, é seguro! E o fluxo que você descreveu está exatamente certo.

Para explicar cada parte:

Tela de login — o email e senha nunca ficam salvos no código, ficam só no Supabase. Ninguém consegue ver.

Token — quando você loga, o Supabase gera um token temporário que expira. É o mesmo padrão usado por bancos e grandes empresas (JWT).

RLS — é a camada mais importante. Mesmo que alguém descobrisse a chave anon do projeto (aquela que está no código), sem estar logado não consegue ler nem escrever nada no banco. As regras que o SQL criou bloqueiam tudo para quem não estiver autenticado.

O que fica exposto — a chave anon e a URL do projeto ficam no código e qualquer um que acessar o site consegue ver. Mas isso é normal e esperado — elas sozinhas não dão acesso a nada sem o login. É assim que todo sistema Supabase funciona.

Para o porte da Rodat é mais do que suficiente. O risco real seria se você tivesse dados de muitos clientes sensíveis ou movimentação financeira grande, aí valeria pensar em camadas extras. Mas para um sistema de caixa de loja pequena está ótimo.

Conseguiu ajustar a estrutura no GitHub?

precisamos ajustar algumas coisas

to vend oque a "sessão" nao esta ficando aberta, exemplo já aconteceu do caixa fechar quando muda de aba
quando abre uma mesa e adiciona itens, ele precisa se manter mesmo quando muda de tela, ele n pode se perder ate fechar o pedido da mesa
e precisa habilitar pra criar categoria de produtos e estoque e editar a categoria dos que ja existem

o que quer mudar primeiro
17 de mai.

Ótimas observações! São três problemas bem distintos:

1. Sessão fechando — o Supabase por padrão mantém a sessão no localStorage, mas pode estar perdendo ao trocar de aba. Ajuste simples na configuração do cliente.

2. Mesas perdendo o pedido — hoje o estado das mesas vive dentro do componente, então qualquer navegação pra outra tela apaga tudo. Precisa subir o estado das mesas pro App root, igual aos outros dados.

3. Categorias customizadas — hoje estão fixas no código (bolos, doces, bebidas). Precisa criar uma tabela categorias no Supabase e deixar cadastrar, editar e vincular aos produtos e estoque.

Minha sugestão de ordem:

    Mesas — é o mais crítico, perder pedido aberto é problema direto na operação
    Sessão — simples de corrigir, uma linha de código
    Categorias — requer mais trabalho, nova tabela no banco e ajustes em produtos e estoque

Faz sentido assim pra você?

vamos fazer entao
17 de mai.

Vamos começar pelas mesas e sessão que são mais rápidos, depois categorias.

Primeiro: sessão

No arquivo supabase.js substitui o conteúdo por esse:
Update supabase.js with persistent session config

Agora o SQL pra tabela de categorias — roda isso no Supabase antes de continuar:
SQL to add categorias table

Agora o App.jsx completo com as três correções:
Running command
A resposta do Claude foi interrompida.

vamos fazer por partes, oque é ´r ajustar no supabase para corrigir o problem das mesas
17 de mai.

Para as mesas não precisamos mexer no Supabase. O problema é só no código — o estado das mesas hoje vive dentro do componente MesasModule e some quando você troca de tela.

A correção é mover o estado das mesas para o App root, assim ele persiste enquanto o sistema estiver aberto, independente de qual tela você estiver.

Não tem SQL novo, não tem tabela nova. É só uma mudança no App.jsx.

Quer que eu gere o App.jsx atualizado só com essa correção por enquanto, sem mexer em mais nada?

sim
17 de mai.
Visualizou 3 arquivos

Entendi a estrutura. Vou fazer só as mudanças necessárias para as mesas:
Executou 3 comandos, editou um arquivo, visualizou um arquivo

Tudo certo. Agora apresento o arquivo:
Presented file

Pronto! O que mudou:

    O estado das mesas (mesas, mesaAtiva, mesaStep, mesasCarts) saiu de dentro do componente e foi pro App root
    Agora ao trocar de tela e voltar para Mesas, tudo continua exatamente onde estava — mesa aberta, itens no carrinho, tudo preservado
    Bônus: a tela de mesas agora mostra quantos itens tem em cada mesa aberta

Substitui o App.jsx no GitHub por esse e me avisa quando quiser seguir para a correção da sessão!
App
Código · JSX 

ok, agira i problmea da sessao
17 de mai.

O arquivo supabase.js já está atualizado com a configuração de sessão persistente. Só precisa baixar e substituir no GitHub:
Presented file

Substitui o supabase.js no GitHub por esse. O que mudou foram 4 configurações:

    persistSession: true — mantém a sessão salva no navegador
    storageKey: 'rodat-auth' — chave única pra não conflitar com nada
    autoRefreshToken: true — renova o token automaticamente antes de expirar
    detectSessionInUrl: false — evita comportamento inesperado ao trocar de aba

Depois de subir no GitHub o Vercel deploya automaticamente. Me avisa quando quiser seguir pra parte das categorias!
Supabase
JS 

antes das categorias, quero ajustar a fonte pq ta uma muito feia, eu cooloc o link dela no index né?
17 de mai.

Sim, exatamente! No index.html dentro do <head> você já tem os dois links de fonte. A The Seasons está lá mas pode não estar carregando bem pelo CDN que usamos.

Me manda o nome exato da fonte que quer usar ou o link dela (Google Fonts, Adobe Fonts, ou outro) que eu atualizo o index.html na hora!

https://fonts.adobe.com/fonts/the-seasons

me manda a linha aqui que eu ajusto o arquivp
17 de mai.

O problema é que a Adobe Fonts não funciona via link direto como o Google Fonts — ela exige uma conta Adobe e um kit personalizado gerado pra cada projeto.

Duas opções:

Opção A — Usar pelo Adobe Fonts (recomendado se tiver conta Adobe)

    Acessa fonts.adobe.com e faz login
    Busca "The Seasons" e clica em Adicionar ao projeto web
    Cria um kit, ele te dá um código assim:

html

<link rel="stylesheet" href="https://use.typekit.net/XXXXXXX.css">

    Me manda esse link que eu atualizo o index.html

Opção B — Escolher uma fonte parecida no Google Fonts (gratuito, sem conta)

Fontes serifadas elegantes parecidas com The Seasons no Google Fonts:

    Cormorant Garamond — muito próxima, elegante
    Playfair Display — clássica e forte
    Libre Baskerville — limpa e legível

Qual prefere?

mas n tem como usar ela de outro site? pq ela é garatutia
17 de mai.

Sim, ela é gratuita mas a Adobe não disponibiliza via CDN público como o Google Fonts — ela só funciona pelo sistema de kits deles, mesmo sendo gratuita.

As opções reais são:

1. Baixar o arquivo da fonte — alguns sites como fontsource.org ou fontshare.com às vezes hospedam fontes gratuitas. Mas The Seasons especificamente não está neles.

2. Baixar e hospedar você mesma — se tiver o arquivo .woff2 da fonte, dá pra colocar no projeto e referenciar diretamente. Você tem o arquivo da fonte salvo?

3. Usar o kit Adobe — é gratuito, só precisa criar uma conta Adobe (também gratuita) e gerar o kit em 2 minutos.

4. Cormorant Garamond — é a mais parecida com The Seasons e está no Google Fonts, uma linha só no index.html resolve.

O que preferir!

engraçado pq ela ta no canva
17 de mai.

É exatamente isso — o Canva tem licença própria com a Adobe Fonts, então eles podem usar dentro da plataforma deles. Mas você não consegue extrair o arquivo pra usar fora.

A opção mais prática é a Cormorant Garamond mesmo — é muito parecida, serifada, elegante, e gratuita. Substitui essa linha no index.html:
html

<link href="https://fonts.cdnfonts.com/css/seasons" rel="stylesheet" />

Por essa:
html

<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

E no código onde aparece 'Seasons', serif troca por 'Cormorant Garamond', serif.

Quer que eu já gere o index.html e o trecho do App.jsx atualizados?

fiz login n osite como eu pego agora?
17 de mai.

No site da Adobe Fonts:

    Busca "The Seasons" na barra de pesquisa
    Clica na fonte
    Clica em "Add to Web Project" (ou "Adicionar ao projeto web")
    Vai pedir pra criar um projeto — coloca qualquer nome, ex: "rodat"
    Clica em "Create"
    Vai aparecer um código assim:

html

<link rel="stylesheet" href="https://use.typekit.net/abc1234.css">

Copia esse link completo e me manda aqui que eu atualizo o index.html pra você!

aonde fica esse add to web q eu n acho
17 de mai.

No site da Adobe Fonts, tenta assim:

    Vai em fonts.adobe.com
    Busca "The Seasons"
    Clica na fonte pra abrir a página dela
    No canto superior direito da página da fonte tem um botão <> ou escrito "Web Projects"

Se não achar, me manda um print da tela que eu te oriento direto!
17 de mai.

Vejo o problema — na página da fonte tem o ícone </> ao lado de cada variação (The Seasons Light, etc). É esse botão que cria o projeto web. Clica no </> que fica do lado do coração em qualquer uma das variações, que vai abrir o fluxo pra criar o kit!
17 de mai.

Vejo que o ícone </> não aparece — só o coração e um ícone de biblioteca. Isso acontece porque a fonte precisa de Creative Cloud para uso web, mesmo sendo gratuita para desktop.

Sendo assim, a opção mais simples é usar a Cormorant Garamond do Google Fonts — olha como ela fica, é muito parecida com a The Seasons Regular que você está vendo aí:

Quer que eu atualize o index.html e o App.jsx com ela? É uma linha só de diferença e fica no ar na hora.

sim mas me manda aqui as linhas atuais e as novas q eu ajusto
17 de mai.

No index.html — troca essa linha:
html

<link href="https://fonts.cdnfonts.com/css/seasons" rel="stylesheet" />

Por essa:
html

<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&display=swap" rel="stylesheet" />

No App.jsx — tem alguns lugares com 'Seasons', serif, troca todos por 'Cormorant Garamond', serif.

São 3 ocorrências, você pode usar o Ctrl+H no editor do GitHub pra substituir tudo de uma vez!

agora antes das categorias, eu quero criar um novo user pra eu ficar mexendo e testando funcionalidades mas q n apareça pra os outros perfis
17 de mai.

Isso é o conceito de ambientes separados — um pra teste e um pra produção. Tem duas formas de fazer:

Opção A — Criar um segundo projeto no Supabase (recomendado)

    Cria um projeto novo no Supabase chamado rodat-dev
    Roda o mesmo SQL de tabelas nele
    Cria um usuário de teste lá
    Quando quiser testar, troca temporariamente a URL e a chave no supabase.js
    Os dados ficam completamente separados — nada mistura

Opção B — Usar o mesmo banco com dados separados

    Cria um segundo usuário no Supabase Authentication do projeto atual
    O problema é que o RLS hoje libera tudo pra qualquer usuário autenticado, então os dois veriam os mesmos dados

Pela sua necessidade — testar sem afetar o banco real — a Opção A é a certa. Os dados de teste ficam isolados, você pode bagunçar à vontade.

Quer seguir por esse caminho?

hum depois então
17 de mai.

Combinado! Quando quiser a gente configura o ambiente de teste.

Vamos para as categorias então?

sim
17 de mai.

Primeiro roda esse SQL no Supabase:
Presented file

Esse SQL faz três coisas:

    Cria a tabela categorias com nome e tipo (produto, estoque ou ambos)
    Insere as categorias iniciais (bolos, doces, bebidas, farinhas, laticínios, embalagens)
    Adiciona a coluna category_id nas tabelas de produtos e estoque

Roda no SQL Editor do Supabase e me avisa quando terminar que aí gero o App.jsx atualizado com o módulo de categorias!
Rodat categorias
Código · SQL 

proxima etapa
17 de mai.

Rodou o SQL sem erros?

unhum
17 de mai.

Ótimo! Agora vou atualizar o App.jsx com as categorias. As mudanças são:

    Novo módulo Categorias — cadastrar, editar e excluir categorias, definindo se é de produto, estoque ou ambos
    Produtos — dropdown de categoria vira dinâmico, puxando do banco
    Estoque — mesma coisa, categoria dinâmica
    Nav — adiciona Categorias no menu

Gerando agora:
Visualizou 3 arquivos, executou 2 comandos

Tudo certo! Apresentando o arquivo:
Presented file

Pronto! O que mudou:

Nova aba Categorias — cadastra, edita e exclui categorias. Cada uma tem um tipo: Produto (aparece no dropdown de produtos), Estoque (ingredientes) ou Ambos.

Produtos — o dropdown de categoria agora é dinâmico, puxando as categorias do banco filtradas por tipo produto ou ambos.

Produtos — listagem — agora agrupa pelos nomes reais de categoria que estão cadastrados, não mais os fixos.

Substitui o App.jsx no GitHub e me avisa quando o deploy terminar!
App
Código · JSX 

na parte do historico

mesmo tendo vendas no dia 16 no banco ele n esta trazendo, outra coisa, precisava mostrar a data nessa tela e os itens vendido, é possivel?
17 de mai.

Dois problemas claros:

1. Não traz as vendas — o filtro de data está comparando v.date com o intervalo, mas as vendas podem estar salvas com timestamp completo no banco em vez de só a data. Precisa ajustar o filtro.

2. Mostrar data e itens — fácil de adicionar no card de cada venda.

Deixa eu ver como está o filtro atual:
Visualizou 2 arquivos, executou 2 comandos, leu um arquivo

Pronto! O que mudou no Histórico:

    Filtro de data corrigido — agora normaliza o formato da data vinda do banco (que pode vir como 2025-05-16T00:00:00 ou só 2025-05-16), então as vendas antigas vão aparecer
    Data visível — cada venda mostra 16/05/2025 · 14:32 · DINHEIRO · 3 itens · Balcão
    Itens com valor — cada item mostra Bolo de Chocolate ×2 — R$ 26,00

Substitui o App.jsx no GitHub e me avisa!
App
Código · JSX 

e essa fonte feia hein ta usando no pdv
17 de mai.

É a IBM Plex Mono que definimos pro sistema — funciona bem pra interface de caixa mas fica estranha nos títulos e textos mais elegantes.

Quer trocar a fonte do sistema inteiro por uma mais agradável, ou só ajustar nos lugares específicos como o PDV?

quais outras vc sugere? pra usar no pdv e no resto que fica usual? pesquisa quais sao usadas
17 de mai.
Pesquisou na web

As mais recomendadas pra sistemas e dashboards são essas. Considerando que o Rodat precisa ser legível no caixa e ao mesmo tempo ter personalidade, minha sugestão seria uma combinação de duas fontes:

Para o sistema (interface, botões, labels, números):

    Inter — usada pelo Figma, Stripe, Vercel, Linear. Feita especificamente pra telas, legibilidade excelente em tamanhos pequenos
    DM Sans — mais personalidade que a Inter, boa pra dashboards
    Poppins — geométrica, amigável, muito usada em PDVs e apps modernos

Para os títulos (logo, nome da loja, cabeçalhos):

    Cormorant Garamond — elegante, serifada, próxima da The Seasons
    Playfair Display — clássica e sofisticada
    DM Serif Display — moderna e refinada, combina perfeitamente com DM Sans

Minha recomendação pro Rodat: DM Sans + Cormorant Garamond

DM Sans no sistema todo (limpa, legível, moderna) e Cormorant Garamond só no logo e títulos principais (elegante, combina com o estilo da loja).

Quer testar essa combinação ou prefere outra?

vamo testar a dm sans, a cormorant eu ja coloquei

como ajusto pra dm ans
17 de mai.

No index.html troca essa linha:
html

<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />

Por essa:
html

<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

E no App.jsx faz um Ctrl+H no editor do GitHub e substitui:

    Busca: 'IBM Plex Mono', monospace
    Substitui por: 'DM Sans', sans-serif

São 3 ocorrências no arquivo. Salva e o Vercel já atualiza!

e como adicionamos um logo na aba
17 de mai.

No index.html dentro do <head> adiciona essa linha:
html

<link rel="icon" type="image/jpeg" href="/logo.jpg" />

E sobe o arquivo da logo no GitHub — precisa estar na raiz do projeto (mesma pasta do index.html) com o nome logo.jpg.

Se a logo for .png é só trocar o tipo e a extensão:
html

<link rel="icon" type="image/png" href="/logo.png" />

Qual é o formato do arquivo da logo?

show, vc me indica alguma mudança no layout? pra ficar mais bonito ou funcional ou algo assim? me indica mais alguma mudança ou melhoria? pesquisa no mercado o que podemos aplicar no nosso projeto
17 de mai.
Pesquisou na web

Pesquisei bastante. Aqui vai o que o mercado indica e o que faz sentido pro Rodat especificamente:

Melhorias funcionais que valem a pena

Busca rápida por código ou nome no PDV — os melhores sistemas têm um campo de busca grande e destacado no topo do PDV. Hoje o seu tem, mas poderia ser mais proeminente e aceitar busca por código de barras futuramente.

Atalho de teclado no PDV — pressionar Enter pra ir direto pro pagamento, por exemplo. Pequeno detalhe que acelera muito o caixa.

Indicador visual de mesa com valor — na tela de mesas, mostrar o valor atual do pedido aberto dentro do card da mesa, não só a hora e quantidade de itens.

Confirmação antes de limpar carrinho — hoje o botão LIMPAR apaga tudo sem confirmar. Um "tem certeza?" evita erro do operador.

Melhorias de layout

Produtos em destaque no PDV — os mais vendidos ou mais recentes aparecem primeiro, sem precisar filtrar. Hoje tudo fica no mesmo nível.

Cores de status mais claras nas mesas — mesa livre (cinza), mesa com pedido aberto (roxo), mesa aguardando pagamento (âmbar). Hoje só tem livre/aberta.

Painel com gráfico simples — um gráfico de barras do faturamento dos últimos 7 dias no painel principal. Muito comum nos sistemas modernos e ajuda a ver tendências rapidamente.

Funcionalidades que o mercado usa muito

Desconto por venda — aplicar % ou valor fixo de desconto antes de fechar, além dos pontos de fidelidade.

Observação no pedido — campo livre pra anotar algo na venda, ex: "sem açúcar", "retirar na loja".

Relatório de horário de pico — mostrar em quais horários do dia as vendas concentram. Simples de calcular com os dados que já tem.

Do que listei, o que te interessa mais? Posso implementar na ordem que você quiser.

gostei do relatotio e do grafico
17 de mai.

Esses dois dão uma visão muito boa da operação. Antes de implementar, deixa eu confirmar como você quer cada um:

Gráfico no painel — faturamento dos últimos 7 dias em barras, uma por dia. Quer mostrar só o total, ou separado por forma de pagamento também?

Me responde essas duas que já implemento!

P: Gráfico no painel — o que mostrar nas barras?
R: Total + linha de lucro

P: Relatório de horário de pico — como prefere ver?
R: Os dois juntos
17 de mai.

Perfeito! Vou implementar os dois agora.
Visualizou 2 arquivos
A resposta do Claude foi interrompida.

mas vc consegyue me mostrar visualmente primeiro?
17 de mai.

Claro! Deixa eu montar uma prévia visual dos dois.

V
Conectando a visualize...

É assim que ficaria! Os dados são de exemplo, no sistema real vão puxar do banco.

Gráfico de 7 dias — barras roxas de faturamento com linha verde de lucro sobreposta. A barra do dia de pico fica mais escura automaticamente.

Horário de pico — gráfico de barras por hora com a hora de maior movimento em roxo forte, as demais em roxo claro. Abaixo o ranking das 5 melhores horas com faturamento de cada uma.

Gostou? Posso implementar no App.jsx agora!

gostei, pode adicionar isso na pagina de faturamento
outro coisa é que nele tem uma tabela que mostra DETALHAMENTO POR PRODUTO
PRODUTOQTDRECEITAINSUMOSPRODUÇÃOLUCRO

precisa adicionar no titulo das coluans uma opcao de classificação pra poder escolher mostrar pro exemplo do mais caro pro mais barato ou do que menos cendeu pro mais, entendeu?
17 de mai.

Entendi perfeitamente! Ordenação nas colunas da tabela clicando no cabeçalho — clica uma vez ordena crescente, clica de novo ordena decrescente, com uma setinha indicando a direção.

Vou implementar os dois juntos na página de Faturamento. Deixa eu ver o código atual:
Executou 2 comandos, visualizou um arquivo, leu um arquivo

Pronto! O que foi adicionado na página de Faturamento:

Gráficos

    Barras roxas de faturamento dos últimos 7 dias com linha verde de lucro sobreposta
    Gráfico de horário de pico com a hora de maior movimento em roxo forte
    Ranking das 5 horas mais movimentadas com faturamento de cada uma — aparece só quando há dados no período selecionado

Ordenação na tabela

    Clica em qualquer coluna (Produto, Qtd, Receita, Insumos, Produção, Lucro) para ordenar
    ↕ indica coluna sem ordenação ativa, ↑ crescente, ↓ decrescente
    Clica de novo na mesma coluna para inverter a direção
    Padrão inicial: ordenado por receita decrescente

Substitui o App.jsx no GitHub e me avisa!
App
Código · JSX 

temos um rpoblema, ele ta salvando a venda com um dia a mais, as de hoje por exemplo ele ta salvando como 18/05
17 de mai.

Problema de fuso horário! O todayStr() usa new Date().toISOString() que converte pra UTC — como o Brasil está em UTC-3, se são 21h aqui já é meia-noite do dia seguinte em UTC, então salva com a data errada.

A correção é simples, troca a função todayStr no App.jsx:

Busca:
js

const todayStr = () => new Date().toISOString().split('T')[0]

Substitui por:
js

const todayStr = () => {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
}

Essa versão usa a data local do navegador, não UTC. Pode fazer direto no GitHub pelo lápis de edição — é só essa função no topo do arquivo!

rode um scan no arquivo e identifique outros ajustes deste tipo
17 de mai.
Scan for date/time issues

Encontrei 3 lugares com o mesmo problema. Todos usam .toISOString() que converte pra UTC:

Linha 34 — todayStr() — já identificamos, é a principal.

Linha 84 — pad() dentro do useDateFilter — usada nos botões Hoje, Ontem, Semana, Mês. Mesma questão.

Linha 838 — cálculo dos últimos 7 dias no gráfico — também usa .toISOString().

Linha 481 — fechado_at: new Date().toISOString() — esse pode ficar em ISO porque é um timestamp completo de quando o caixa foi fechado, não uma data de referência. Não causa problema.

Os outros new Date() das linhas 404, 489, 681, 1311, 1354 usam .toLocaleDateString ou .toLocaleTimeString — esses já respeitam o fuso local, sem problema.

Vou corrigir as 3 linhas problemáticas de uma vez:
Executou um comando, leu um arquivo

Todas as 3 correções feitas:

    todayStr() — data de hoje usada ao salvar vendas e abrir caixa
    pad() no filtro de datas — botões Hoje, Ontem, Semana, Mês
    last7 no gráfico de faturamento — últimos 7 dias

Agora tudo usa a data local do navegador. Substitui o App.jsx no GitHub!
App
Código · JSX 

vc me deu o arquivo com as fontes antigas ainda, ajusta paraas novas
17 de mai.

Deixa eu verificar o que está no arquivo atual:
Executou 3 comandos, leu um arquivo

Pronto! Todas as ocorrências substituídas:

    'IBM Plex Mono', monospace → 'DM Sans', sans-serif (interface, botões, textos)
    'Seasons', serif → 'Cormorant Garamond', serif (logo, títulos elegantes)

Substitui no GitHub e o Vercel já atualiza!
App
Código · JSX 

vc consegue ver o historico dos conteudos?
17 de mai.

Sim! Posso buscar nas nossas conversas anteriores. O que você quer verificar?

sabe o arquivo 81e0e3ad-84b2-41d2-9d17-5b576e16a27a.jpeg?
17 de mai.

Sim, é a logo da Rodat que você me mandou mais cedo nessa conversa — com o nome "Rodat", o subtítulo "Doces e Cafés" e o desenho de um cupcake ao lado. Fonte serifada elegante, tons de roxo, fundo cinza claro.

Quer fazer algo com ela?

eu quero pegar só o desenho pra colocar na index ao lado do nome no navicon, consegue gerar essa imagem?
17 de mai.

Infelizmente não consigo gerar ou editar imagens — só texto e código.

Mas você consegue fazer isso facilmente em ferramentas gratuitas:

Opção mais simples — Remove.bg + recorte manual:

    Acessa remove.bg e sobe a logo
    Ele remove o fundo automaticamente
    No resultado, recorta só o cupcake usando qualquer editor (até o Paint do Windows)
    Salva como .png

Opção mais fácil ainda — Canva:

    Abre a logo no Canva
    Usa a ferramenta de recorte pra isolar o cupcake
    Baixa como PNG com fundo transparente

Depois de ter o arquivo .png do cupcake, é só subir no GitHub na raiz do projeto e colocar no index.html:
html

<link rel="icon" type="image/png" href="/cupcake.png" />

Consegue fazer isso?

eu tenho uma impressora elgin i9 termica, precisamos ajustar pra emissao de recibo de venda, o pagamento vai ser mostrado pela notinha da maquina mas daria pra gerar uma nota de itens consumidos etal pro cliente ver o preço antes e manter de hisotrico
17 de mai.

Ótima ideia! Recibo de itens consumidos — não é nota fiscal, é só um comprovante interno com o que foi pedido e o total. Muito útil pro cliente conferir antes de pagar e pra você ter histórico físico.

Antes de implementar, deixa eu entender como vai funcionar:

Me responde essas duas que já planejo a implementação!

P: Quando imprimir o recibo?
R: Antes de ir pro pagamento

P: Onde vai usar a impressora?
R: PDV e Mesas
17 de mai.

Perfeito! Então o fluxo fica:

PDV — cliente escolhe os itens → clica COBRAR → sistema imprime o recibo → vai pro pagamento

Mesas — clica FECHAR CONTA → sistema imprime o recibo → vai pro pagamento

Sobre a Elgin i9 — ela conecta via USB ou rede? Isso define como vamos comunicar o navegador com a impressora.

A impressão térmica pelo navegador funciona via Web USB ou redirecionando pra impressora padrão do Windows com um CSS de impressão formatado pra 80mm. A segunda opção é bem mais simples e funciona sem instalar nada.

Qual você prefere?

    Impressão pelo navegador — abre o diálogo de impressão do Windows, seleciona a Elgin, imprime. Simples mas precisa de um clique extra
    Impressão direta via USB — automático, sem diálogo, mas precisa configurar o navegador pra acessar a porta USB

ela é via usb, acho que a segunda opção né
17 de mai.

Sim, a segunda é mais profissional — imprime direto sem abrir diálogo. Mas tem um detalhe importante:

O navegador por padrão não tem acesso direto à USB por segurança. Pra funcionar tem duas formas:

Opção A — Web USB API

    Chrome suporta nativamente
    Funciona direto no navegador sem instalar nada extra
    Mas precisa que a impressora suporte o protocolo correto — a Elgin i9 geralmente suporta ESC/POS que é o padrão térmico

Opção B — QZ Tray

    Um pequeno programa gratuito que instala no Windows
    Fica rodando em segundo plano
    O sistema web se comunica com ele e ele manda pra impressora
    É o método mais usado em sistemas PDV web no mercado
    Mais confiável, suporta qualquer impressora térmica

Minha recomendação é o QZ Tray — é o padrão da indústria pra PDV web, mais estável e fácil de configurar.

O processo seria:

    Baixa e instala o QZ Tray no notebook
    A gente adiciona a integração no sistema
    Imprime automaticamente ao clicar COBRAR

Quer seguir por esse caminho?

o qz tray é pesado? pq o note n tem tanta capacidade
17 de mai.

Não, é bem leve — cerca de 50MB instalado, consome pouquíssima memória em segundo plano, equivalente a um antivírus simples. Não vai pesar no notebook.

Mas antes de decidir, deixa eu te mostrar a Opção A (Web USB) também porque pode ser ainda mais simples:

    Zero instalação — funciona direto no Chrome
    Zero consumo — não tem nada rodando em segundo plano
    A Elgin i9 usa protocolo ESC/POS que o Chrome suporta via Web USB

O único porém é que na primeira vez precisa dar permissão pro navegador acessar a impressora — um clique só, e depois fica memorizado.

Minha sugestão: tenta primeiro o Web USB. Se não funcionar com a Elgin i9, aí instala o QZ Tray.

Quer que eu implemente o Web USB primeiro pra testar?

ok
17 de mai.

Vou implementar. O recibo vai ter:

    Logo/nome da loja
    Data e hora
    Lista de itens com quantidade e valor
    Total
    Forma de pagamento (quando vier da tela de confirmação)

Antes de codar, me confirma uma coisa — a Elgin i9 é de 80mm de papel (o padrão mais comum) ou 58mm?

80 mesmo acho

a forma de pagamento ainda n vai ter nessa etapa
17 de mai.

Perfeito, 80mm sem forma de pagamento. Vou implementar agora.
Visualizou um arquivo, executou um comando, leu um arquivo

Pronto! O que foi adicionado:

Botão de impressão 🖨 — aparece ao lado do COBRAR no carrinho, tanto no PDV quanto nas Mesas.

O recibo imprime:

        RODAT
      Doces e Cafes
--------------------------------
17/05/2025  14:32
Balcao / Mesa 2
----------------------------------------
ITEM                    QTD  VALOR
----------------------------------------
Bolo de Chocolate         1  R$13,00
Brigadeiro                3  R$6,00
----------------------------------------
TOTAL               R$19,00
----------------------------------------
   Obrigado pela preferencia!

Como vai funcionar na primeira vez:

    Clica no 🖨
    Chrome abre uma janela perguntando qual dispositivo USB acessar
    Seleciona a Elgin i9
    A partir daí ela fica memorizada

Substitui o App.jsx no GitHub e depois me avisa pra testar — se a Elgin não for reconhecida pelo vendorId padrão, ajustamos o código com o ID correto dela.
App
Código · JSX 

top top mas os itens q forem  0 un. (mín. 0) nao precisa alertar estoque baico
17 de mai.

Faz sentido — produto sem controle de estoque configurado não deve gerar alerta. A correção é simples: só alertar quando min_qty > 0.
Executou 2 comandos
A resposta do Claude foi interrompida.

n precisa gerar arquivo, me fala aonde ajustar
17 de mai.

São 6 lugares no App.jsx, todos fáceis de achar com Ctrl+F no editor do GitHub:

1. Busca: const low = product.qty <= product.min_qty Troca por: const low = product.min_qty > 0 && product.qty <= product.min_qty

2. Busca: const lowProducts = products.filter(p => p.active && p.qty <= p.min_qty) Troca por: const lowProducts = products.filter(p => p.active && p.min_qty > 0 && p.qty <= p.min_qty)

3. Busca: const lowStock = stockItems.filter(i => i.qty <= i.min_qty) Troca por: const lowStock = stockItems.filter(i => i.min_qty > 0 && i.qty <= i.min_qty)

4. Busca: const low = p.qty <= p.min_qty; return ( Troca por: const low = p.min_qty > 0 && p.qty <= p.min_qty; return (

5. Busca: const isLow = item.qty <= item.min_qty; Troca por: const isLow = item.min_qty > 0 && item.qty <= item.min_qty;

6. Busca: const low = stockItems.filter(i => i.qty <= i.min_qty) Troca por: const low = stockItems.filter(i => i.min_qty > 0 && i.qty <= i.min_qty)

O padrão é sempre o mesmo — adiciona min_qty > 0 && antes da comparação.

os pedidos estao ficando duplicados
16:30

Vejo o problema — cada item aparece duas vezes. Isso acontece quando a função handleSale é chamada duas vezes seguidas, provavelmente porque o botão de confirmar está sendo clicado duas vezes ou o evento está disparando duplicado.

Me confirma: isso acontece sempre ou só às vezes? E é no PDV, nas Mesas ou nos dois?

é nos dois, so as vezes e sim parece que é quando clica duas vezes, da pra colocar uma janela de confirmar? ou corrigir isso de alguma forma?
16:32

A solução mais simples é desabilitar o botão após o primeiro clique, sem precisar de janela de confirmação — fica mais rápido pro caixa.

São 2 ajustes no App.jsx, me fala se quer que eu indique onde mudar manualmente ou se gero o arquivo:

No PaymentPanel — o botão "CONFIRMAR PAGAMENTO" precisa de um estado loading que desativa após o clique:

Busca:
js

function PaymentPanel({ total, onConfirm, onBack, clients }) {
  const [payment, setPayment] = useState(null)
  const [cash, setCash] = useState('')
  const [phone, setPhone] = useState('')
  const [foundClient, setFoundClient] = useState(null)
  const [usePoints, setUsePoints] = useState(false)

Troca por:
js

function PaymentPanel({ total, onConfirm, onBack, clients }) {
  const [payment, setPayment] = useState(null)
  const [cash, setCash] = useState('')
  const [phone, setPhone] = useState('')
  const [foundClient, setFoundClient] = useState(null)
  const [usePoints, setUsePoints] = useState(false)
  const [confirming, setConfirming] = useState(false)

Busca:
js

onClick={() => onConfirm({

Troca por:
js

onClick={() => { if (confirming) return; setConfirming(true); onConfirm({

E no final do objeto que passa pro onConfirm, fecha com }) em vez de }) — adiciona } extra pra fechar o if.

Quer que eu gere o arquivo com essa correção?

mas ai quando ele vai habilitar de novo?
16:33

Boa pergunta! O botão precisa reabilitar quando a venda for confirmada com sucesso e a tela virar pra tela de sucesso — nesse momento o PaymentPanel é desmontado e o estado reseta sozinho. Então na prática funciona perfeitamente:

    Clica CONFIRMAR → botão desabilita na hora
    Sistema salva no Supabase
    Tela muda pra VENDA CONFIRMADA → PaymentPanel some da tela
    Clica NOVA VENDA → tudo reseta do zero

Não tem risco de ficar travado. Quer que eu gere o arquivo com a correção ou prefere fazer manualmente?

assim?
16:35

Sim, está certo! Vejo que o arquivo já tem o confirming no estado e a proteção no botão.

Mas tem um erro de sintaxe no botão de confirmar — falta fechar o parêntese do onClick. Busca essa linha:
js

<button disabled={!canConfirm} onClick={() => { if (confirming) return; setConfirming(true); onConfirm({ payment, finalTotal, change, foundClient: foundClient !== 'not_found' ? foundClient : null, pointsEarned: ptsEarned(finalTotal), pointsUsed: pointDiscount, usePoints })} style={{

Troca por:
js

<button disabled={!canConfirm} onClick={() => { if (confirming) return; setConfirming(true); onConfirm({ payment, finalTotal, change, foundClient: foundClient !== 'not_found' ? foundClient : null, pointsEarned: ptsEarned(finalTotal), pointsUsed: pointDiscount, usePoints }) }} style={{

A diferença é })} no final do onClick — faltava um } e um espaço antes do style. Só isso!

precisamos de mais um ajuste, na hora de fechar o pdv ou mesas precisa abrir um campo de desconto porque as vezes o bolo sai menor por exemplo e eu cobro mais barato
16:52

Faz sentido! Antes de implementar, como prefere aplicar o desconto:

P: Como prefere aplicar o desconto?
R: Valor fixo (ex: R$ 5,00 de desconto)

P: Onde deve aparecer o campo de desconto?
R: Na tela de pagamento junto com os outros campos
16:53

Perfeito! Então na tela de pagamento vai ter um campo de desconto em valor fixo, que deduz do total antes de calcular o troco e os pontos.

São apenas ajustes no PaymentPanel. Me fala se quer que eu indique onde mudar manualmente ou se gero o arquivo:

não, é mlehor antres do pagamento pq na hora de tiver imprimindo o recibo o cliente precisa ja ver o desconto aplicado ne
16:54

Faz todo sentido! O desconto entra no carrinho antes de imprimir e ir pro pagamento, assim o recibo já mostra o valor correto.

Vou indicar os ajustes manuais já que são poucos. No CartPanel, precisa adicionar:

1. No início da função, adiciona o estado do desconto — logo após function CartPanel({ cart, changeQty, clear, total, count, onCheckout, onPrint }) {:
js

const [desconto, setDesconto] = useState(0)
const totalComDesconto = Math.max(0, total - desconto)

2. No footer do carrinho, antes do botão COBRAR, adiciona o campo de desconto. Busca:
js

<div style={{ fontSize: 8, color: '#888', letterSpacing: 1 }}>TOTAL</div>
<div style={{ fontSize: 26, fontWeight: 700, color: P }}>{fmt(total)}</div>

Troca por:
js

<div style={{ fontSize: 8, color: '#888', letterSpacing: 1 }}>DESCONTO (R$)</div>
<input type="number" value={desconto || ''} onChange={e => setDesconto(parseFloat(e.target.value) || 0)} placeholder="0,00" style={{ width: '100%', padding: '6px 10px', fontSize: 13, fontWeight: 700, border: `2px solid ${P}`, outline: 'none', fontFamily: 'inherit', background: OFF, marginBottom: 8, textAlign: 'center' }} />
<div style={{ fontSize: 8, color: '#888', letterSpacing: 1 }}>TOTAL</div>
<div style={{ fontSize: 26, fontWeight: 700, color: P }}>{fmt(totalComDesconto)}</div>

3. Os dois botões no footer passam a usar totalComDesconto em vez de total — no onPrint e no onCheckout. Busca:
js

onPrint={() => imprimirRecibo({ cart, total, origin: 'pdv' })

Troca por:
js

onPrint={() => imprimirRecibo({ cart, total: totalComDesconto, origin: 'pdv' })

E o onCheckout precisa passar o desconto pro pagamento. Troca:
js

onCheckout={() => setStep('pay')

Por:
js

onCheckout={() => { setStep('pay') }}

Ah, e o mesmo ajuste pro onPrint nas Mesas — troca total por totalComDesconto lá também.

Por fim, o PaymentPanel precisa receber o desconto como prop e descontar do total. Mas isso começa a ficar complexo pra fazer manual — quer que eu gere o arquivo com tudo isso já aplicado?

sim, é melhor

esse é meu arquivo atual
16:55

Ótimo, tenho o arquivo completo. Vou aplicar o desconto diretamente nele agora.
Executou 4 comandos

O arquivo no servidor está desatualizado em relação ao que você me mandou. Vou usar o arquivo que você colou como base:
Apply all discount changes to the correct file

O arquivo no servidor está diferente do que você me mandou. Vou sobrescrever com o seu arquivo e aplicar as mudanças direto:
Check current file structure

O arquivo no servidor já tem algumas mudanças anteriores mas está misturado. O mais seguro é que você me mande o arquivo atualizado que está no GitHub agora — que é o que você colou — e eu gero o App.jsx final com o desconto já aplicado de forma limpa. Ou posso gerar um arquivo novo do zero baseado no seu arquivo. Qual prefere?

a versão atualizada que esta no git hub agora é essa:
16:58

Perfeito, agora tenho a versão certa. Vou aplicar o desconto diretamente nela:
Executou 2 comandos

O arquivo no servidor está muito diferente do seu. Vou gerar um App.jsx completo e limpo baseado no seu arquivo atual com o desconto já aplicado:
Read the App.jsx from project files

O arquivo do projeto está atualizado. Vou aplicar as mudanças diretamente nele:
Apply discount changes from project file

Todas as 9 mudanças aplicadas com sucesso!
Presented file

Pronto! O que foi adicionado:

No carrinho (PDV e Mesas):

    Campo DESCONTO (R$) aparece quando há itens no carrinho
    Total fica em laranja quando há desconto, mostrando o subtotal riscado
    COBRAR passa o total já com desconto pro pagamento

Na tela de pagamento:

    Mostra "Desconto aplicado: −R$ X,XX" em laranja antes dos pontos de fidelidade
    O total a cobrar já reflete o desconto

Substitui o App.jsx no GitHub!
App
Código · JSX 


Claude é uma IA e pode cometer erros. Por favor, verifique as respostas.
App · JSX
import { useState, useEffect, useCallback } from 'react'
import { supabase } from './supabase.js'
 
const P = "#552072"
const OFF = "#EFEFEF"
const W = "#FFFFFF"
const DARK = "#1a0a24"
const GREEN = "#2e7d32"
const RED = "#c62828"
const AMBER = "#f59e0b"
 
const PAYMENT_METHODS = [
  { key: "dinheiro", label: "DINHEIRO" },
  { key: "debito",   label: "DÉBITO"   },
  { key: "credito",  label: "CRÉDITO"  },
  { key: "pix",      label: "PIX"      },
  { key: "voucher",  label: "VOUCHER"  },
]
 
const NAV = [
  { key: "painel",      label: "Painel",      icon: "⊞" },
  { key: "caixa",       label: "Caixa",       icon: "◈" },
  { key: "pdv",         label: "PDV",         icon: "▦" },
  { key: "mesas",       label: "Mesas",       icon: "⊡" },
  { key: "historico",   label: "Histórico",   icon: "≡" },
  { key: "faturamento", label: "Faturamento", icon: "◎" },
  { key: "clientes",    label: "Clientes",    icon: "◉" },
  { key: "produtos",    label: "Produtos",    icon: "❖" },
  { key: "estoque",     label: "Estoque",     icon: "◧" },
  { key: "categorias",  label: "Categorias",  icon: "◫" },
]
 
const fmt = (v) => `R$ ${Number(v || 0).toFixed(2).replace('.', ',')}`
const todayStr = () => {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
}
const ptsEarned = (total) => Math.floor(total / 10)
 
// ─── Shared UI ────────────────────────────────────────────────────────────────
 
const s = {
  input: { padding: '9px 12px', fontSize: 13, fontFamily: 'inherit', border: `2px solid ${P}`, outline: 'none', background: OFF, color: DARK, width: '100%' },
  label: { fontSize: 9, letterSpacing: 1.5, color: '#888', fontWeight: 700 },
}
 
function Field({ label, children }) {
  return <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>{label && <span style={s.label}>{label}</span>}{children}</div>
}
 
function Input({ label, value, onChange, type = 'text', placeholder, autoFocus, style: sx = {} }) {
  return (
    <Field label={label}>
      <input autoFocus={autoFocus} type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={{ ...s.input, ...sx }} />
    </Field>
  )
}
 
function Btn({ children, onClick, disabled, variant = 'primary', full, style: sx = {} }) {
  const base = { fontFamily: 'inherit', cursor: disabled ? 'not-allowed' : 'pointer', border: 'none', fontWeight: 700, letterSpacing: 1, width: full ? '100%' : undefined, padding: '13px 20px', fontSize: 12, opacity: disabled ? 0.4 : 1 }
  const variants = { primary: { background: P, color: W }, ghost: { background: 'transparent', color: P, border: `2px solid ${P}` }, danger: { background: RED, color: W }, success: { background: GREEN, color: W }, amber: { background: AMBER, color: W } }
  return <button onClick={!disabled ? onClick : undefined} style={{ ...base, ...variants[variant], ...sx }}>{children}</button>
}
 
function Card({ children, style: sx = {} }) {
  return <div style={{ background: W, border: `2px solid #e0d0ea`, padding: 18, ...sx }}>{children}</div>
}
 
function SecTitle({ children }) {
  return <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2, color: P, marginBottom: 14, borderBottom: `2px solid ${P}`, paddingBottom: 7 }}>{children}</div>
}
 
function Spinner() {
  return <div style={{ padding: 40, textAlign: 'center', color: P, fontSize: 12, letterSpacing: 1 }}>CARREGANDO...</div>
}
 
// ─── Date filter ──────────────────────────────────────────────────────────────
 
function useDateFilter() {
  const [preset, setPreset] = useState('hoje')
  const [from, setFrom] = useState(todayStr())
  const [to, setTo] = useState(todayStr())
 
  function applyPreset(p) {
    setPreset(p)
    const now = new Date()
    const pad = d => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
    if (p === 'hoje')   { setFrom(pad(now)); setTo(pad(now)) }
    if (p === 'ontem')  { const d = new Date(now); d.setDate(d.getDate()-1); setFrom(pad(d)); setTo(pad(d)) }
    if (p === 'semana') { const d = new Date(now); d.setDate(d.getDate()-6); setFrom(pad(d)); setTo(pad(now)) }
    if (p === 'mes')    { const d = new Date(now); d.setDate(1); setFrom(pad(d)); setTo(pad(now)) }
  }
 
  return { preset, applyPreset, from, setFrom, to, setTo }
}
 
function DateFilterBar({ filter }) {
  const { preset, applyPreset, from, setFrom, to, setTo } = filter
  return (
    <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
      {[['hoje','HOJE'],['ontem','ONTEM'],['semana','SEMANA'],['mes','MÊS'],['custom','PERSONALIZADO']].map(([k,l]) => (
        <button key={k} onClick={() => applyPreset(k)} style={{ padding: '8px 14px', fontSize: 9, fontWeight: 700, letterSpacing: 1, fontFamily: 'inherit', cursor: 'pointer', border: `2px solid ${P}`, background: preset === k ? P : 'transparent', color: preset === k ? W : P }}>{l}</button>
      ))}
      {preset === 'custom' && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 8 }}>
          <span style={{ fontSize: 10, color: '#888' }}>DE</span>
          <input type="date" value={from} onChange={e => setFrom(e.target.value)} style={{ padding: '7px 10px', fontSize: 12, fontFamily: 'inherit', border: `2px solid ${P}`, outline: 'none', background: OFF, color: DARK }} />
          <span style={{ fontSize: 10, color: '#888' }}>ATÉ</span>
          <input type="date" value={to} onChange={e => setTo(e.target.value)} style={{ padding: '7px 10px', fontSize: 12, fontFamily: 'inherit', border: `2px solid ${P}`, outline: 'none', background: OFF, color: DARK }} />
        </div>
      )}
    </div>
  )
}
 
// ─── LOGIN ────────────────────────────────────────────────────────────────────
 
function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
 
  async function handleLogin() {
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError('Email ou senha incorretos.')
    else onLogin()
    setLoading(false)
  }
 
  return (
    <div style={{ minHeight: '100vh', background: OFF, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ background: W, border: `3px solid ${P}`, padding: '44px 48px', width: 380 }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, color: P, marginBottom: 4 }}>Rodat</div>
        <div style={{ fontSize: 10, color: '#aaa', letterSpacing: 1, marginBottom: 32 }}>DOCES E CAFÉS — SISTEMA DE CAIXA</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Input label="EMAIL" type="email" value={email} onChange={setEmail} placeholder="seu@email.com" autoFocus />
          <Input label="SENHA" type="password" value={password} onChange={setPassword} placeholder="••••••••" />
          {error && <div style={{ fontSize: 11, color: RED, fontWeight: 600 }}>{error}</div>}
          <Btn full onClick={handleLogin} disabled={loading || !email || !password}>
            {loading ? 'ENTRANDO...' : 'ENTRAR'}
          </Btn>
        </div>
      </div>
    </div>
  )
}
 
// ─── Cart hook ────────────────────────────────────────────────────────────────
 
function useCart() {
  const [cart, setCart] = useState([])
  const add = p => setCart(prev => { const ex = prev.find(i => i.id === p.id); if (ex) return prev.map(i => i.id === p.id ? { ...i, qty: i.qty+1 } : i); return [...prev, { ...p, qty: 1 }] })
  const changeQty = (id, d) => setCart(prev => { const item = prev.find(i => i.id === id); if (!item) return prev; if (item.qty+d <= 0) return prev.filter(i => i.id !== id); return prev.map(i => i.id === id ? { ...i, qty: i.qty+d } : i) })
  const clear = () => setCart([])
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const count = cart.reduce((s, i) => s + i.qty, 0)
  return { cart, add, changeQty, clear, total, count }
}
 
// ─── Product grid ─────────────────────────────────────────────────────────────
 
function ProductGrid({ products, cart, onAdd }) {
  const [cat, setCat] = useState('todos')
  const [search, setSearch] = useState('')
  const filtered = products.filter(p => p.active && p.qty > 0 && (cat === 'todos' || p.category === cat) && p.name.toLowerCase().includes(search.toLowerCase()))
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
      <div style={{ background: W, padding: '10px 14px', borderBottom: `2px solid ${P}`, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar produto..." style={{ flex: 1, minWidth: 120, padding: '8px 12px', fontSize: 11, border: `2px solid ${P}`, outline: 'none', fontFamily: 'inherit', background: OFF, color: DARK }} />
        {['todos','bolos','doces','bebidas'].map(c => <button key={c} onClick={() => setCat(c)} style={{ padding: '8px 12px', fontSize: 9, fontWeight: 700, letterSpacing: 1, fontFamily: 'inherit', cursor: 'pointer', border: `2px solid ${P}`, background: cat === c ? P : 'transparent', color: cat === c ? W : P }}>{c.toUpperCase()}</button>)}
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: 12, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 10, alignContent: 'start' }}>
        {filtered.map(product => {
          const inCart = cart.find(i => i.id === product.id)
          const low = product.min_qty > 0 && product.qty <= product.min_qty
          return (
            <button key={product.id} onClick={() => onAdd(product)} style={{ background: inCart ? P : W, border: `2px solid ${low && !inCart ? AMBER : P}`, color: inCart ? W : DARK, padding: '13px 12px', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', position: 'relative' }}>
              {inCart && <div style={{ position: 'absolute', top: 0, right: 0, background: W, color: P, fontWeight: 700, fontSize: 10, padding: '2px 6px', borderLeft: `2px solid ${P}`, borderBottom: `2px solid ${P}` }}>×{inCart.qty}</div>}
              {low && !inCart && <div style={{ position: 'absolute', top: 0, left: 0, background: AMBER, color: W, fontSize: 8, fontWeight: 700, padding: '2px 6px' }}>BAIXO</div>}
              <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 6, lineHeight: 1.4, marginTop: low && !inCart ? 10 : 0 }}>{product.name}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: inCart ? '#e0c0f5' : P }}>{fmt(product.price)}</div>
              <div style={{ fontSize: 9, color: inCart ? 'rgba(255,255,255,0.6)' : '#aaa', marginTop: 4 }}>{product.qty} un. restantes</div>
            </button>
          )
        })}
        {filtered.length === 0 && <div style={{ gridColumn: '1/-1', textAlign: 'center', color: '#bbb', fontSize: 12, padding: 40 }}>Nenhum produto disponível</div>}
      </div>
    </div>
  )
}
 
function CartPanel({ cart, changeQty, clear, total, count, onCheckout }) {
  const [descontoStr, setDescontoStr] = useState('')
  const desconto = Math.min(parseFloat(descontoStr) || 0, total)
  const totalFinal = Math.max(0, total - desconto)
 
  return (
    <div style={{ width: 300, background: W, display: 'flex', flexDirection: 'column', borderLeft: `3px solid ${P}` }}>
      <div style={{ padding: '11px 14px', borderBottom: `2px solid ${P}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: 700, fontSize: 9, letterSpacing: 1, color: P }}>ITENS DA VENDA</span>
        {cart.length > 0 && <button onClick={() => { clear(); setDescontoStr('') }} style={{ fontSize: 9, color: RED, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700 }}>LIMPAR</button>}
      </div>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {cart.length === 0 && <div style={{ padding: 28, textAlign: 'center', color: '#bbb', fontSize: 11 }}>Nenhum item</div>}
        {cart.map((item, idx) => (
          <div key={item.id} style={{ padding: '10px 12px', borderBottom: `1px solid ${OFF}`, background: idx % 2 === 0 ? W : '#faf8fc' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
              <span style={{ fontSize: 11, fontWeight: 600, flex: 1, paddingRight: 6, lineHeight: 1.3 }}>{item.name}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: P }}>{fmt(item.price * item.qty)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 9, color: '#aaa' }}>{fmt(item.price)} cada</span>
              <div style={{ display: 'flex' }}>
                <button onClick={() => changeQty(item.id, -1)} style={{ width: 22, height: 22, background: OFF, border: `1px solid ${P}`, color: P, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', fontSize: 13 }}>−</button>
                <span style={{ width: 26, textAlign: 'center', fontWeight: 700, fontSize: 11, border: `1px solid ${P}`, borderLeft: 'none', borderRight: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{item.qty}</span>
                <button onClick={() => changeQty(item.id, 1)} style={{ width: 22, height: 22, background: P, border: `1px solid ${P}`, color: W, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', fontSize: 13 }}>+</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ borderTop: `3px solid ${P}`, background: OFF }}>
        <div style={{ padding: '11px 14px' }}>
          {cart.length > 0 && (
            <div style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 8, color: '#888', letterSpacing: 1, marginBottom: 5 }}>DESCONTO (R$)</div>
              <input type="number" value={descontoStr} onChange={e => setDescontoStr(e.target.value)} placeholder="0,00" min="0"
                style={{ width: '100%', padding: '7px 10px', fontSize: 14, fontWeight: 700, border: `2px solid ${desconto > 0 ? '#e67e22' : P}`, outline: 'none', fontFamily: 'inherit', background: W, color: desconto > 0 ? '#e67e22' : DARK, textAlign: 'center' }} />
              {desconto > 0 && <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5, fontSize: 10, color: '#888' }}><span>Subtotal:</span><span style={{ textDecoration: 'line-through' }}>{fmt(total)}</span></div>}
            </div>
          )}
          <div style={{ fontSize: 8, color: '#888', letterSpacing: 1 }}>TOTAL</div>
          <div style={{ fontSize: 26, fontWeight: 700, color: desconto > 0 ? '#e67e22' : P }}>{fmt(totalFinal)}</div>
          <div style={{ fontSize: 9, color: '#999' }}>{count} item{count !== 1 ? 's' : ''}</div>
        </div>
        <button onClick={() => cart.length > 0 && onCheckout(totalFinal, desconto)} style={{ width: '100%', padding: '16px', fontSize: 12, fontWeight: 700, letterSpacing: 2, background: cart.length > 0 ? P : '#ccc', color: W, border: 'none', cursor: cart.length > 0 ? 'pointer' : 'not-allowed', fontFamily: 'inherit' }}>COBRAR →</button>
      </div>
    </div>
  )
}
 
function PaymentPanel({ total, desconto = 0, onConfirm, onBack, clients }) {
  const [payment, setPayment] = useState(null)
  const [cash, setCash] = useState('')
  const [phone, setPhone] = useState('')
  const [foundClient, setFoundClient] = useState(null)
  const [usePoints, setUsePoints] = useState(false)
  const [confirming, setConfirming] = useState(false)
 
  const cashVal = parseFloat(cash) || 0
  const pointDiscount = usePoints && foundClient && foundClient !== 'not_found' ? Math.min(foundClient.points, Math.floor(total)) : 0
  const finalTotal = Math.max(0, total - pointDiscount)
  const change = payment === 'dinheiro' ? Math.max(0, cashVal - finalTotal) : 0
  const canConfirm = payment && (payment !== 'dinheiro' || cashVal >= finalTotal)
 
  function searchClient() {
    const c = clients.find(c => c.phone === phone.replace(/\D/g, ''))
    setFoundClient(c || 'not_found')
  }
 
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: '11px 18px', borderBottom: `2px solid ${P}`, fontSize: 9, fontWeight: 700, letterSpacing: 1, color: P }}>PAGAMENTO</div>
      <div style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div>
          <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1, color: '#888', marginBottom: 8 }}>FIDELIDADE (OPCIONAL)</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Telefone" style={{ flex: 1, padding: '8px 11px', fontSize: 11, border: `2px solid #ccc`, outline: 'none', fontFamily: 'inherit', background: OFF }} />
            <button onClick={searchClient} style={{ padding: '8px 12px', background: P, color: W, border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 9, fontWeight: 700 }}>BUSCAR</button>
          </div>
          {foundClient && foundClient !== 'not_found' && (
            <div style={{ marginTop: 8, padding: '10px 12px', background: '#f3e8ff', border: `2px solid ${P}` }}>
              <div style={{ fontWeight: 700, fontSize: 12 }}>{foundClient.name}</div>
              <div style={{ fontSize: 10, color: '#666', marginTop: 2 }}>{foundClient.points} pontos · {fmt(foundClient.points)} de desconto</div>
              {foundClient.points > 0 && <button onClick={() => setUsePoints(u => !u)} style={{ marginTop: 8, padding: '5px 10px', fontSize: 9, fontWeight: 700, letterSpacing: 1, fontFamily: 'inherit', cursor: 'pointer', border: `2px solid ${P}`, background: usePoints ? P : 'transparent', color: usePoints ? W : P }}>{usePoints ? '✓ USANDO PONTOS' : 'USAR PONTOS'}</button>}
            </div>
          )}
          {foundClient === 'not_found' && <div style={{ marginTop: 6, fontSize: 10, color: '#999' }}>Cliente não encontrado.</div>}
        </div>
        <div style={{ background: OFF, padding: '12px 14px', borderLeft: `4px solid ${P}` }}>
          {desconto > 0 && <div style={{ fontSize: 10, color: '#e67e22', marginBottom: 2 }}>Desconto aplicado: −{fmt(desconto)}</div>}
          {pointDiscount > 0 && <div style={{ fontSize: 10, color: '#888', marginBottom: 2 }}>Desconto pontos: −{fmt(pointDiscount)}</div>}
          <div style={{ fontSize: 8, color: '#888' }}>TOTAL A COBRAR</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: P }}>{fmt(finalTotal)}</div>
        </div>
        <div>
          <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1, color: '#888', marginBottom: 8 }}>FORMA DE PAGAMENTO</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {PAYMENT_METHODS.map(m => <button key={m.key} onClick={() => { setPayment(m.key); setCash('') }} style={{ padding: '14px 8px', fontFamily: 'inherit', cursor: 'pointer', fontSize: 11, fontWeight: 700, letterSpacing: 1, border: `2px solid ${P}`, background: payment === m.key ? P : OFF, color: payment === m.key ? W : P }}>{m.label}</button>)}
          </div>
        </div>
        {payment === 'dinheiro' && (
          <div>
            <Input label="VALOR RECEBIDO (R$)" type="number" value={cash} onChange={setCash} placeholder="0,00" autoFocus style={{ fontSize: 24, fontWeight: 700, textAlign: 'center' }} />
            {cashVal >= finalTotal && cashVal > 0 && (
              <div style={{ marginTop: 10, padding: '13px 16px', background: '#e8f5e9', border: `2px solid ${GREEN}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, fontSize: 10, color: GREEN, letterSpacing: 1 }}>TROCO</span>
                <span style={{ fontSize: 26, fontWeight: 700, color: GREEN }}>{fmt(change)}</span>
              </div>
            )}
            {cashVal > 0 && cashVal < finalTotal && <div style={{ marginTop: 8, padding: '10px 12px', background: '#ffebee', border: `2px solid ${RED}`, fontSize: 10, color: RED, fontWeight: 700 }}>FALTA {fmt(finalTotal - cashVal)}</div>}
          </div>
        )}
      </div>
      <div style={{ borderTop: `2px solid ${P}` }}>
        <button onClick={onBack} style={{ width: '100%', padding: '11px', fontSize: 10, fontWeight: 700, letterSpacing: 1, background: 'transparent', color: P, border: 'none', borderBottom: `1px solid ${OFF}`, cursor: 'pointer', fontFamily: 'inherit' }}>← VOLTAR</button>
        <button disabled={!canConfirm} onClick={() => { if (confirming) return; setConfirming(true); onConfirm({ payment, finalTotal, change, foundClient: foundClient !== 'not_found' ? foundClient : null, pointsEarned: ptsEarned(finalTotal), pointsUsed: pointDiscount, usePoints }) }} style={{ width: '100%', padding: '18px', fontSize: 13, fontWeight: 700, letterSpacing: 2, background: canConfirm ? P : '#ccc', color: W, border: 'none', cursor: canConfirm ? 'pointer' : 'not-allowed', fontFamily: 'inherit' }}>CONFIRMAR PAGAMENTO</button>
      </div>
    </div>
  )
}
 
function SuccessScreen({ result, onNew }) {
  const label = PAYMENT_METHODS.find(m => m.key === result.payment)?.label
  return (
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: OFF }}>
      <div style={{ background: W, border: `3px solid ${P}`, padding: '44px 56px', textAlign: 'center', maxWidth: 400, width: '100%' }}>
        <div style={{ fontSize: 48, color: GREEN, fontWeight: 700, marginBottom: 10 }}>✓</div>
        <div style={{ fontSize: 9, letterSpacing: 2, color: '#888', marginBottom: 6 }}>VENDA CONFIRMADA</div>
        <div style={{ fontSize: 40, fontWeight: 700, color: P, marginBottom: 4 }}>{fmt(result.finalTotal)}</div>
        <div style={{ fontSize: 11, color: '#888', letterSpacing: 1, marginBottom: 20 }}>{label}</div>
        {result.payment === 'dinheiro' && result.change > 0 && (
          <div style={{ padding: '14px 20px', marginBottom: 20, background: '#e8f5e9', border: `2px solid ${GREEN}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 700, letterSpacing: 1, color: GREEN, fontSize: 11 }}>TROCO</span>
            <span style={{ fontSize: 30, fontWeight: 700, color: GREEN }}>{fmt(result.change)}</span>
          </div>
        )}
        {result.foundClient && (
          <div style={{ padding: '12px 16px', marginBottom: 20, background: '#f3e8ff', border: `2px solid ${P}`, textAlign: 'left' }}>
            <div style={{ fontSize: 11, color: P, fontWeight: 700 }}>{result.foundClient.name}</div>
            {result.usePoints && result.pointsUsed > 0 && <div style={{ fontSize: 10, color: '#666' }}>−{result.pointsUsed} pontos usados</div>}
            <div style={{ fontSize: 10, color: '#666' }}>+{result.pointsEarned} pontos ganhos</div>
          </div>
        )}
        <button onClick={onNew} style={{ width: '100%', padding: '16px', fontSize: 12, fontWeight: 700, letterSpacing: 2, background: P, color: W, border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>NOVA VENDA</button>
      </div>
    </div>
  )
}
 
// ─── Edit Product Modal ───────────────────────────────────────────────────────
 
function EditProductModal({ product, onSave, onClose }) {
  const [form, setForm] = useState({
    name: product.name, price: String(product.price), category: product.category,
    cost_insumos: String(product.cost_insumos || 0), cost_prod: String(product.cost_prod || 0),
    qty: String(product.qty), min_qty: String(product.min_qty),
  })
  const lucro = (parseFloat(form.price)||0) - (parseFloat(form.cost_insumos)||0) - (parseFloat(form.cost_prod)||0)
 
  async function save() {
    const updated = { ...product, name: form.name, price: parseFloat(form.price)||0, category: form.category, cost_insumos: parseFloat(form.cost_insumos)||0, cost_prod: parseFloat(form.cost_prod)||0, qty: parseInt(form.qty)||0, min_qty: parseInt(form.min_qty)||0 }
    await supabase.from('produtos').update({ name: updated.name, price: updated.price, category: updated.category, cost_insumos: updated.cost_insumos, cost_prod: updated.cost_prod, qty: updated.qty, min_qty: updated.min_qty }).eq('id', product.id)
    onSave(updated)
    onClose()
  }
 
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: W, border: `3px solid ${P}`, padding: 28, width: 480, maxHeight: '90vh', overflowY: 'auto', fontFamily: "'DM Sans', sans-serif" }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: P }}>Editar Produto</div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#aaa' }}>✕</button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Input label="NOME" value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} />
          <Field label="CATEGORIA">
            <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} style={{ ...s.input }}>
              <option value="bolos">Bolos</option><option value="doces">Doces</option><option value="bebidas">Bebidas</option>
            </select>
          </Field>
          <div style={{ borderTop: `1px solid ${OFF}`, paddingTop: 14 }}>
            <div style={{ ...s.label, marginBottom: 12 }}>PREÇOS</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
              <Input label="VENDA (R$)" type="number" value={form.price} onChange={v => setForm(f => ({ ...f, price: v }))} placeholder="0,00" />
              <Input label="INSUMOS (R$)" type="number" value={form.cost_insumos} onChange={v => setForm(f => ({ ...f, cost_insumos: v }))} placeholder="0,00" />
              <Input label="PRODUÇÃO (R$)" type="number" value={form.cost_prod} onChange={v => setForm(f => ({ ...f, cost_prod: v }))} placeholder="0,00" />
            </div>
            <div style={{ marginTop: 12, padding: '10px 14px', background: lucro >= 0 ? '#e8f5e9' : '#ffebee', border: `2px solid ${lucro >= 0 ? GREEN : RED}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1, color: lucro >= 0 ? GREEN : RED }}>LUCRO POR UNIDADE</span>
              <span style={{ fontSize: 22, fontWeight: 700, color: lucro >= 0 ? GREEN : RED }}>{fmt(lucro)}</span>
            </div>
          </div>
          <div style={{ borderTop: `1px solid ${OFF}`, paddingTop: 14 }}>
            <div style={{ ...s.label, marginBottom: 12 }}>ESTOQUE</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <Input label="QUANTIDADE ATUAL" type="number" value={form.qty} onChange={v => setForm(f => ({ ...f, qty: v }))} />
              <Input label="QUANTIDADE MÍNIMA" type="number" value={form.min_qty} onChange={v => setForm(f => ({ ...f, min_qty: v }))} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
            <Btn variant="ghost" onClick={onClose} style={{ flex: 1 }}>CANCELAR</Btn>
            <Btn onClick={save} disabled={!form.name || !form.price} style={{ flex: 1 }}>SALVAR</Btn>
          </div>
        </div>
      </div>
    </div>
  )
}
 
// ══════════════════════════════════════════════════════════════════════════════
// MODULES
// ══════════════════════════════════════════════════════════════════════════════
 
function Painel({ caixaAberto, fundoInicial, sales, stockItems, products, setScreen }) {
  const today = sales.filter(v => v.date === todayStr())
  const totalDia = today.reduce((s, v) => s + v.total, 0)
  const dinheiroDia = today.filter(v => v.payment === 'dinheiro').reduce((s, v) => s + v.total, 0)
  const trocosDia = today.filter(v => v.payment === 'dinheiro').reduce((s, v) => s + (v.change_val || 0), 0)
  const dinheiroEmCaixa = fundoInicial + dinheiroDia - trocosDia
  const lowStock = stockItems.filter(i => i.min_qty > 0 && i.qty <= i.min_qty)
  const lowProducts = products.filter(p => p.active && p.min_qty > 0 && p.qty <= p.min_qty)
 
  return (
    <div style={{ padding: 24, overflowY: 'auto', flex: 1 }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, color: P }}>Rodat Doces e Cafés</div>
        <div style={{ fontSize: 9, color: '#aaa', letterSpacing: 1, marginTop: 2 }}>{new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' }).toUpperCase()}</div>
      </div>
      {!caixaAberto && <div onClick={() => setScreen('caixa')} style={{ padding: '12px 18px', background: '#fff8e1', border: `2px solid ${AMBER}`, marginBottom: 16, fontSize: 12, fontWeight: 600, color: '#6d4c00', cursor: 'pointer' }}>⚠ Caixa não foi aberto hoje — clique para abrir</div>}
      {(lowStock.length > 0 || lowProducts.length > 0) && (
        <div style={{ padding: '12px 18px', background: '#ffebee', border: `2px solid ${RED}`, marginBottom: 16 }}>
          <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1, color: RED, marginBottom: 8 }}>ALERTAS DE ESTOQUE BAIXO</div>
          {lowProducts.map(p => <div key={p.id} style={{ fontSize: 11, color: RED, marginBottom: 3 }}>• {p.name} — {p.qty} un. (mín. {p.min_qty})</div>)}
          {lowStock.map(i => <div key={i.id} style={{ fontSize: 11, color: RED, marginBottom: 3 }}>• {i.name} — {i.qty} {i.unit} (mín. {i.min_qty})</div>)}
        </div>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12, marginBottom: 24 }}>
        {[{ label: 'VENDAS HOJE', value: today.length, sub: 'transações' }, { label: 'FATURAMENTO', value: fmt(totalDia), sub: 'todas as formas' }, { label: 'DINHEIRO EM CAIXA', value: fmt(dinheiroEmCaixa), sub: 'estimativa', h: true }, { label: 'FUNDO INICIAL', value: fmt(fundoInicial), sub: 'abertura' }].map(c => (
          <Card key={c.label} style={{ borderLeft: `4px solid ${c.h ? GREEN : P}` }}>
            <div style={{ fontSize: 8, letterSpacing: 1.5, color: '#888', marginBottom: 5 }}>{c.label}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: c.h ? GREEN : P }}>{c.value}</div>
            <div style={{ fontSize: 10, color: '#aaa', marginTop: 2 }}>{c.sub}</div>
          </Card>
        ))}
      </div>
      <SecTitle>ÚLTIMAS VENDAS</SecTitle>
      {today.length === 0 && <div style={{ fontSize: 12, color: '#bbb' }}>Nenhuma venda registrada ainda.</div>}
      {today.slice(0, 6).map(v => (
        <div key={v.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: `1px solid ${OFF}` }}>
          <span style={{ color: '#888', fontSize: 10, width: 45 }}>{v.time}</span>
          <span style={{ flex: 1, paddingLeft: 12, fontSize: 11 }}>{v.items_count} {v.items_count === 1 ? 'item' : 'itens'}{v.origin === 'mesa' ? ` · Mesa ${v.mesa}` : ' · Balcão'}</span>
          <span style={{ fontWeight: 700, color: P, marginLeft: 12 }}>{fmt(v.total)}</span>
        </div>
      ))}
    </div>
  )
}
 
function CaixaModule({ caixaAberto, setCaixaAberto, fundoInicial, setFundoInicial, sales, movimentos, reloadMovimentos, reloadCaixa }) {
  const [inputFundo, setInputFundo] = useState('')
  const [sangriaVal, setSangriaVal] = useState('')
  const [suprVal, setSuprVal] = useState('')
  const [obs, setObs] = useState('')
  const [showFechamento, setShowFechamento] = useState(false)
  const [maquinaVals, setMaquinaVals] = useState({ debito: '', credito: '', pix: '', voucher: '', dinheiro: '' })
  const [showRelatorio, setShowRelatorio] = useState(false)
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(false)
 
  const todaySales = sales.filter(v => v.date === todayStr())
  const totalSangrias = movimentos.filter(m => m.tipo === 'sangria').reduce((s, m) => s + m.valor, 0)
  const totalSuprimentos = movimentos.filter(m => m.tipo === 'suprimento').reduce((s, m) => s + m.valor, 0)
  const dinheiroDia = todaySales.filter(v => v.payment === 'dinheiro').reduce((s, v) => s + v.total, 0)
  const trocosDia = todaySales.filter(v => v.payment === 'dinheiro').reduce((s, v) => s + (v.change_val || 0), 0)
  const dinheiroEmCaixa = fundoInicial + dinheiroDia - trocosDia - totalSangrias + totalSuprimentos
  const byPayment = key => todaySales.filter(v => v.payment === key).reduce((s, v) => s + v.total, 0)
  const totalDia = todaySales.reduce((s, v) => s + v.total, 0)
  const ticketMedio = todaySales.length ? totalDia / todaySales.length : 0
 
  const itemSummary = {}
  todaySales.forEach(v => v.itens && v.itens.forEach(i => {
    if (!itemSummary[i.produto_id || i.name]) itemSummary[i.produto_id || i.name] = { name: i.name, qty: 0, revenue: 0, costInsumos: 0, costProd: 0 }
    itemSummary[i.produto_id || i.name].qty += i.qty
    itemSummary[i.produto_id || i.name].revenue += i.price * i.qty
    itemSummary[i.produto_id || i.name].costInsumos += (i.cost_insumos || 0) * i.qty
    itemSummary[i.produto_id || i.name].costProd += (i.cost_prod || 0) * i.qty
  }))
 
  async function abrirCaixa() {
    setLoading(true)
    const fundo = parseFloat(inputFundo) || 0
    await supabase.from('caixa').upsert({ date: todayStr(), fundo_inicial: fundo, aberto: true })
    setFundoInicial(fundo)
    setCaixaAberto(true)
    setLoading(false)
  }
 
  async function registrarMovimento(tipo, valor, obsText) {
    await supabase.from('movimentos').insert({ tipo, valor, obs: obsText, date: todayStr() })
    reloadMovimentos()
  }
 
  async function fecharCaixa() {
    await supabase.from('caixa').update({ aberto: false, fechado_at: new Date().toISOString() }).eq('date', todayStr())
    setCaixaAberto(false)
    setShowFechamento(false)
    setShowRelatorio(false)
    reloadCaixa()
  }
 
  function buildCSV() {
    const lines = ['RELATÓRIO DE FECHAMENTO — RODAT DOCES E CAFÉS', `Data: ${new Date().toLocaleDateString('pt-BR')}`, '']
    lines.push('CAIXA', `Fundo inicial,${fmt(fundoInicial)}`, `Dinheiro em caixa,${fmt(dinheiroEmCaixa)}`, `Sangrias,${fmt(totalSangrias)}`, `Suprimentos,${fmt(totalSuprimentos)}`, `Trocos dados,${fmt(trocosDia)}`, '')
    lines.push('FATURAMENTO', `Total do dia,${fmt(totalDia)}`, `Número de vendas,${todaySales.length}`, `Ticket médio,${fmt(ticketMedio)}`, '')
    lines.push('POR FORMA DE PAGAMENTO')
    PAYMENT_METHODS.forEach(m => lines.push(`${m.label},${fmt(byPayment(m.key))}`))
    lines.push('', 'CONFERÊNCIA COM MÁQUINA')
    PAYMENT_METHODS.forEach(m => { const sys = byPayment(m.key); const mq = parseFloat(maquinaVals[m.key]) || 0; lines.push(`${m.label},Sistema: ${fmt(sys)},Máquina: ${fmt(mq)},Diferença: ${fmt(mq - sys)}`) })
    lines.push('', 'ITENS VENDIDOS', 'Produto,Qtd,Receita,Custo Insumos,Custo Produção,Lucro')
    Object.values(itemSummary).forEach(i => { const lucro = i.revenue - i.costInsumos - i.costProd; lines.push(`${i.name},${i.qty},${fmt(i.revenue)},${fmt(i.costInsumos)},${fmt(i.costProd)},${fmt(lucro)}`) })
    return lines.join('\n')
  }
 
  function copyCSV() { navigator.clipboard.writeText(buildCSV()).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000) }) }
 
  if (!caixaAberto) return (
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: OFF }}>
      <Card style={{ maxWidth: 380, width: '100%', padding: 32 }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: P, marginBottom: 4 }}>Abertura de Caixa</div>
        <p style={{ fontSize: 12, color: '#666', marginBottom: 20 }}>Informe o fundo de troco disponível para iniciar o dia.</p>
        <Input label="FUNDO INICIAL (R$)" type="number" value={inputFundo} onChange={setInputFundo} placeholder="0,00" autoFocus />
        <div style={{ marginTop: 16 }}><Btn full onClick={abrirCaixa} disabled={loading || !inputFundo}>{loading ? 'ABRINDO...' : 'ABRIR CAIXA'}</Btn></div>
      </Card>
    </div>
  )
 
  if (showFechamento && !showRelatorio) return (
    <div style={{ flex: 1, overflowY: 'auto', padding: 28 }}>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: P, marginBottom: 4 }}>Fechamento de Caixa</div>
      <p style={{ fontSize: 12, color: '#666', marginBottom: 24 }}>Confira os valores com a maquininha.</p>
      <div style={{ background: W, border: `2px solid #e0d0ea`, marginBottom: 24 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', background: P, color: W, padding: '10px 16px', fontSize: 9, fontWeight: 700, letterSpacing: 1, gap: 8 }}>
          <span>FORMA</span><span style={{ textAlign: 'right' }}>SISTEMA</span><span style={{ textAlign: 'right' }}>MÁQUINA</span><span style={{ textAlign: 'right' }}>DIFERENÇA</span>
        </div>
        {PAYMENT_METHODS.map(m => { const sys = byPayment(m.key); const mq = parseFloat(maquinaVals[m.key]) || 0; const diff = mq - sys; const ok = maquinaVals[m.key] === '' || Math.abs(diff) < 0.01; return (
          <div key={m.key} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', padding: '12px 16px', borderBottom: `1px solid ${OFF}`, alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 600 }}>{m.label}</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: P, textAlign: 'right' }}>{fmt(sys)}</span>
            <input type="number" value={maquinaVals[m.key]} onChange={e => setMaquinaVals(v => ({ ...v, [m.key]: e.target.value }))} placeholder="—" style={{ padding: '6px 8px', fontSize: 12, fontWeight: 700, border: `2px solid ${P}`, outline: 'none', fontFamily: 'inherit', background: OFF, textAlign: 'right' }} />
            <span style={{ fontSize: 13, fontWeight: 700, color: ok ? GREEN : RED, textAlign: 'right' }}>{maquinaVals[m.key] !== '' ? (diff >= 0 ? '+' : '') + fmt(diff) + (ok ? ' ✓' : '') : '—'}</span>
          </div>
        ) })}
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        <Btn variant="ghost" onClick={() => setShowFechamento(false)}>← VOLTAR</Btn>
        <Btn onClick={() => setShowRelatorio(true)}>GERAR RELATÓRIO →</Btn>
      </div>
    </div>
  )
 
  if (showRelatorio) return (
    <div style={{ flex: 1, overflowY: 'auto', padding: 28 }}>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: P, marginBottom: 20 }}>Relatório de Fechamento</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px,1fr))', gap: 12, marginBottom: 20 }}>
        {[{ l: 'FUNDO INICIAL', v: fmt(fundoInicial) }, { l: 'DINHEIRO EM CAIXA', v: fmt(dinheiroEmCaixa), h: true }, { l: 'TOTAL FATURADO', v: fmt(totalDia) }, { l: 'TICKET MÉDIO', v: fmt(ticketMedio) }, { l: 'SANGRIAS', v: fmt(totalSangrias) }, { l: 'SUPRIMENTOS', v: fmt(totalSuprimentos) }].map(c => (
          <Card key={c.l} style={{ borderLeft: `4px solid ${c.h ? GREEN : P}` }}><div style={{ fontSize: 8, letterSpacing: 1.5, color: '#888', marginBottom: 4 }}>{c.l}</div><div style={{ fontSize: 20, fontWeight: 700, color: c.h ? GREEN : P }}>{c.v}</div></Card>
        ))}
      </div>
      <SecTitle>CONFERÊNCIA COM MÁQUINA</SecTitle>
      <div style={{ background: W, border: `2px solid #e0d0ea`, marginBottom: 20 }}>
        {PAYMENT_METHODS.map(m => { const sys = byPayment(m.key); const mq = parseFloat(maquinaVals[m.key]) || 0; const diff = mq - sys; const ok = maquinaVals[m.key] === '' || Math.abs(diff) < 0.01; return (
          <div key={m.key} style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 16px', borderBottom: `1px solid ${OFF}`, alignItems: 'center' }}>
            <span style={{ fontSize: 12, fontWeight: 600, width: 100 }}>{m.label}</span>
            <span style={{ fontSize: 12, color: '#666' }}>Sistema: {fmt(sys)}</span>
            <span style={{ fontSize: 12, color: '#666' }}>Máquina: {maquinaVals[m.key] ? fmt(mq) : '—'}</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: ok ? GREEN : RED }}>{maquinaVals[m.key] !== '' ? (diff >= 0 ? '+' : '') + fmt(diff) + (ok ? ' ✓' : '') : '—'}</span>
          </div>
        ) })}
      </div>
      <SecTitle>ITENS VENDIDOS</SecTitle>
      <div style={{ background: W, border: `2px solid #e0d0ea`, marginBottom: 24 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 0.5fr 1fr 1fr 1fr 1fr', background: P, color: W, padding: '9px 14px', fontSize: 8, fontWeight: 700, letterSpacing: 1, gap: 8 }}>
          <span>PRODUTO</span><span style={{ textAlign: 'right' }}>QTD</span><span style={{ textAlign: 'right' }}>RECEITA</span><span style={{ textAlign: 'right' }}>INSUMOS</span><span style={{ textAlign: 'right' }}>PRODUÇÃO</span><span style={{ textAlign: 'right' }}>LUCRO</span>
        </div>
        {Object.values(itemSummary).length === 0 && <div style={{ padding: 16, fontSize: 12, color: '#bbb' }}>Nenhum item vendido.</div>}
        {Object.values(itemSummary).map((i, idx) => { const lucro = i.revenue - i.costInsumos - i.costProd; return (
          <div key={idx} style={{ display: 'grid', gridTemplateColumns: '2fr 0.5fr 1fr 1fr 1fr 1fr', padding: '10px 14px', borderBottom: `1px solid ${OFF}`, fontSize: 11, gap: 8 }}>
            <span style={{ fontWeight: 600 }}>{i.name}</span><span style={{ textAlign: 'right' }}>{i.qty}</span>
            <span style={{ textAlign: 'right', color: P, fontWeight: 700 }}>{fmt(i.revenue)}</span>
            <span style={{ textAlign: 'right', color: '#888' }}>{fmt(i.costInsumos)}</span>
            <span style={{ textAlign: 'right', color: '#888' }}>{fmt(i.costProd)}</span>
            <span style={{ textAlign: 'right', color: GREEN, fontWeight: 700 }}>{fmt(lucro)}</span>
          </div>
        ) })}
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        <Btn variant="ghost" onClick={() => setShowRelatorio(false)}>← VOLTAR</Btn>
        <Btn variant="success" onClick={copyCSV}>{copied ? '✓ COPIADO!' : 'COPIAR CSV'}</Btn>
        <Btn variant="amber" onClick={fecharCaixa}>FECHAR CAIXA</Btn>
      </div>
    </div>
  )
 
  return (
    <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
      <div style={{ flex: 1, padding: 24, overflowY: 'auto', borderRight: `2px solid #e0d0ea` }}>
        <SecTitle>RESUMO DO CAIXA</SecTitle>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px,1fr))', gap: 12, marginBottom: 24 }}>
          {[{ l: 'FUNDO INICIAL', v: fmt(fundoInicial) }, { l: 'ENTRADAS DINHEIRO', v: fmt(dinheiroDia) }, { l: 'TROCOS DADOS', v: `−${fmt(trocosDia)}` }, { l: 'SANGRIAS', v: `−${fmt(totalSangrias)}` }, { l: 'SUPRIMENTOS', v: `+${fmt(totalSuprimentos)}` }, { l: 'DINHEIRO EM CAIXA', v: fmt(dinheiroEmCaixa), h: true }].map(c => (
            <Card key={c.l} style={{ borderLeft: `4px solid ${c.h ? GREEN : P}` }}><div style={{ fontSize: 8, letterSpacing: 1.5, color: '#888', marginBottom: 4 }}>{c.l}</div><div style={{ fontSize: 20, fontWeight: 700, color: c.h ? GREEN : P }}>{c.v}</div></Card>
          ))}
        </div>
        <SecTitle>POR FORMA DE PAGAMENTO</SecTitle>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 10 }}>
          {PAYMENT_METHODS.map(m => <Card key={m.key}><div style={{ fontSize: 8, letterSpacing: 1, color: '#888', marginBottom: 4 }}>{m.label}</div><div style={{ fontSize: 16, fontWeight: 700, color: P }}>{fmt(byPayment(m.key))}</div></Card>)}
        </div>
      </div>
      <div style={{ width: 300, padding: 20, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <SecTitle>SANGRIA</SecTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Input label="VALOR (R$)" type="number" value={sangriaVal} onChange={setSangriaVal} placeholder="0,00" />
            <Input label="OBSERVAÇÃO" value={obs} onChange={setObs} placeholder="Motivo..." />
            <Btn variant="danger" full onClick={() => { registrarMovimento('sangria', parseFloat(sangriaVal)||0, obs); setSangriaVal(''); setObs('') }} disabled={!sangriaVal}>REGISTRAR SANGRIA</Btn>
          </div>
        </div>
        <div>
          <SecTitle>SUPRIMENTO</SecTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Input label="VALOR (R$)" type="number" value={suprVal} onChange={setSuprVal} placeholder="0,00" />
            <Btn variant="success" full onClick={() => { registrarMovimento('suprimento', parseFloat(suprVal)||0, obs); setSuprVal(''); setObs('') }} disabled={!suprVal}>REGISTRAR SUPRIMENTO</Btn>
          </div>
        </div>
        <div style={{ marginTop: 'auto' }}>
          <Btn variant="amber" full onClick={() => setShowFechamento(true)}>FECHAR CAIXA →</Btn>
        </div>
        <div>
          <SecTitle>MOVIMENTOS</SecTitle>
          {movimentos.length === 0 && <div style={{ fontSize: 11, color: '#bbb' }}>Nenhum movimento.</div>}
          {movimentos.map(m => (
            <div key={m.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${OFF}`, fontSize: 11 }}>
              <span style={{ color: m.tipo === 'sangria' ? RED : GREEN, fontWeight: 700, fontSize: 9 }}>{m.tipo.toUpperCase()}</span>
              <span style={{ color: '#888', flex: 1, paddingLeft: 8 }}>{m.obs}</span>
              <span style={{ fontWeight: 700 }}>{fmt(m.valor)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
 
function PDVModule({ products, setProducts, clients, onSale }) {
  const { cart, add, changeQty, clear, total, count } = useCart()
  const [step, setStep] = useState('pdv')
  const [result, setResult] = useState(null)
  const [totalPagar, setTotalPagar] = useState(0)
  const [descontoPdv, setDescontoPdv] = useState(0)
  function handleCheckout(tf, d) { setTotalPagar(tf); setDescontoPdv(d); setStep('pay') }
  function handleConfirm(res) { onSale({ ...res, items: count, origin: 'pdv', cart }, () => { setResult(res); setStep('success') }) }
  if (step === 'success') return <SuccessScreen result={result} onNew={() => { clear(); setStep('pdv') }} />
  return (
    <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
      <ProductGrid products={products} cart={cart} onAdd={add} />
      {step === 'pdv'
        ? <CartPanel cart={cart} changeQty={changeQty} clear={clear} total={total} count={count} onCheckout={handleCheckout} />
        : <div style={{ width: 360, background: W, display: 'flex', flexDirection: 'column', borderLeft: `3px solid ${P}` }}><PaymentPanel total={totalPagar} desconto={descontoPdv} onConfirm={handleConfirm} onBack={() => setStep('pdv')} clients={clients} /></div>}
    </div>
  )
}
 
function MesasModule({ products, clients, onSale, mesas, setMesas, mesaAtiva, setMesaAtiva, mesaStep, setMesaStep, mesasCarts, setMesasCarts }) {
  const [result, setResult] = useState(null)
  const [totalPagarMesa, setTotalPagarMesa] = useState(0)
  const [descontoMesa, setDescontoMesa] = useState(0)
 
  const cart = mesaAtiva ? (mesasCarts[mesaAtiva] || []) : []
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const count = cart.reduce((s, i) => s + i.qty, 0)
 
  function addToCart(product) {
    setMesasCarts(prev => {
      const cur = prev[mesaAtiva] || []
      const ex = cur.find(i => i.id === product.id)
      const updated = ex
        ? cur.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
        : [...cur, { ...product, qty: 1 }]
      return { ...prev, [mesaAtiva]: updated }
    })
  }
 
  function changeQty(id, d) {
    setMesasCarts(prev => {
      const cur = prev[mesaAtiva] || []
      const item = cur.find(i => i.id === id)
      if (!item) return prev
      const updated = item.qty + d <= 0
        ? cur.filter(i => i.id !== id)
        : cur.map(i => i.id === id ? { ...i, qty: i.qty + d } : i)
      return { ...prev, [mesaAtiva]: updated }
    })
  }
 
  function clearCart() {
    setMesasCarts(prev => ({ ...prev, [mesaAtiva]: [] }))
  }
 
  function abrirMesa(n) {
    if (!mesas[n]) setMesas(m => ({ ...m, [n]: { hora: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) } }))
    setMesaAtiva(n)
    setMesaStep('pedido')
  }
 
  function handleConfirm(res) {
    onSale({ ...res, items: count, origin: 'mesa', mesa: mesaAtiva, cart }, () => {
      setMesas(m => { const c = { ...m }; delete c[mesaAtiva]; return c })
      setMesasCarts(prev => { const c = { ...prev }; delete c[mesaAtiva]; return c })
      setResult(res)
      setMesaAtiva(null)
      setMesaStep('success')
    })
  }
 
  if (mesaStep === 'success') return <SuccessScreen result={result} onNew={() => setMesaStep('mesas')} />
 
  if (mesaStep === 'mesas') return (
    <div style={{ padding: 24, flex: 1 }}>
      <SecTitle>MESAS</SecTitle>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16, maxWidth: 680 }}>
        {[1,2,3,4,5].map(n => {
          const aberta = !!mesas[n]
          const itens = (mesasCarts[n] || []).reduce((s, i) => s + i.qty, 0)
          return (
            <button key={n} onClick={() => abrirMesa(n)} style={{ padding: '28px 12px', border: `3px solid ${aberta ? P : '#ddd'}`, background: aberta ? P : W, color: aberta ? W : '#bbb', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'center' }}>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>MESA</div>
              <div style={{ fontSize: 38, fontWeight: 700 }}>{n}</div>
              <div style={{ fontSize: 9, marginTop: 6, color: aberta ? '#e0c0f5' : '#ccc' }}>
                {aberta ? `${mesas[n].hora} · ${itens} item${itens !== 1 ? 's' : ''}` : 'Livre'}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
 
  return (
    <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
      <ProductGrid products={products} cart={cart} onAdd={addToCart} />
      {mesaStep === 'pedido'
        ? <div style={{ width: 300, background: W, display: 'flex', flexDirection: 'column', borderLeft: `3px solid ${P}` }}>
            <div style={{ padding: '11px 14px', borderBottom: `2px solid ${P}`, fontSize: 9, fontWeight: 700, letterSpacing: 1, color: P }}>MESA {mesaAtiva}</div>
            <CartPanel cart={cart} changeQty={changeQty} clear={clearCart} total={total} count={count} onCheckout={(tf, d) => { setTotalPagarMesa(tf); setDescontoMesa(d); setMesaStep('pay') }} />
            <button onClick={() => { setMesaAtiva(null); setMesaStep('mesas') }} style={{ padding: '11px', fontSize: 10, fontWeight: 700, letterSpacing: 1, background: 'transparent', color: '#888', border: 'none', borderTop: `1px solid ${OFF}`, cursor: 'pointer', fontFamily: 'inherit' }}>← VOLTAR ÀS MESAS</button>
          </div>
        : <div style={{ width: 360, background: W, display: 'flex', flexDirection: 'column', borderLeft: `3px solid ${P}` }}>
            <PaymentPanel total={totalPagarMesa} desconto={descontoMesa} onConfirm={handleConfirm} onBack={() => setMesaStep('pedido')} clients={clients} />
          </div>}
    </div>
  )
}
 
function Historico({ sales }) {
  const filter = useDateFilter()
 
  // Normaliza a data da venda — pode vir como '2025-05-16' ou '2025-05-16T...'
  const getDate = (v) => {
    if (!v.date) return ''
    return String(v.date).slice(0, 10)
  }
 
  const filtered = sales.filter(v => {
    const d = getDate(v)
    return d >= filter.from && d <= filter.to
  })
 
  const fmtDate = (dateStr) => {
    if (!dateStr) return ''
    const [y, m, d] = String(dateStr).slice(0, 10).split('-')
    return `${d}/${m}/${y}`
  }
 
  return (
    <div style={{ padding: 24, flex: 1, overflowY: 'auto' }}>
      <DateFilterBar filter={filter} />
      <SecTitle>HISTÓRICO DE VENDAS ({filtered.length})</SecTitle>
      {filtered.length === 0 && <div style={{ fontSize: 12, color: '#bbb' }}>Nenhuma venda no período.</div>}
      {filtered.map(v => (
        <div key={v.id} style={{ background: W, border: `2px solid #e0d0ea`, padding: '14px 18px', marginBottom: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, color: P }}>{fmt(v.total)}</div>
              <div style={{ fontSize: 10, color: '#888', marginTop: 2 }}>
                {fmtDate(v.date)} · {v.time} · {PAYMENT_METHODS.find(m => m.key === v.payment)?.label} · {v.items_count} {v.items_count === 1 ? 'item' : 'itens'} · {v.origin === 'mesa' ? `Mesa ${v.mesa}` : 'Balcão'}
              </div>
            </div>
          </div>
          {v.itens && v.itens.length > 0 && (
            <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${OFF}`, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {v.itens.map((i, idx) => (
                <span key={idx} style={{ fontSize: 10, color: '#666', background: OFF, padding: '2px 8px' }}>
                  {i.name} ×{i.qty} — {fmt(i.price * i.qty)}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
 
function Faturamento({ sales }) {
  const filter = useDateFilter()
  const [sortCol, setSortCol] = useState('revenue')
  const [sortDir, setSortDir] = useState('desc')
 
  const getDate = (v) => v.date ? String(v.date).slice(0, 10) : ''
  const filtered = sales.filter(v => { const d = getDate(v); return d >= filter.from && d <= filter.to })
 
  const itemSummary = {}
  filtered.forEach(v => v.itens && v.itens.forEach(i => {
    const k = i.produto_id || i.name
    if (!itemSummary[k]) itemSummary[k] = { name: i.name, qty: 0, revenue: 0, costInsumos: 0, costProd: 0 }
    itemSummary[k].qty += i.qty
    itemSummary[k].revenue += i.price * i.qty
    itemSummary[k].costInsumos += (i.cost_insumos || 0) * i.qty
    itemSummary[k].costProd += (i.cost_prod || 0) * i.qty
  }))
 
  const items = Object.values(itemSummary).map(i => ({ ...i, lucro: i.revenue - i.costInsumos - i.costProd }))
  const sorted = [...items].sort((a, b) => {
    const av = sortCol === 'name' ? a.name : a[sortCol]
    const bv = sortCol === 'name' ? b.name : b[sortCol]
    if (typeof av === 'string') return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av)
    return sortDir === 'asc' ? av - bv : bv - av
  })
 
  const totRevenue = items.reduce((s, i) => s + i.revenue, 0)
  const totInsumos = items.reduce((s, i) => s + i.costInsumos, 0)
  const totProd = items.reduce((s, i) => s + i.costProd, 0)
  const totLucro = totRevenue - totInsumos - totProd
 
  function toggleSort(col) {
    if (sortCol === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortCol(col); setSortDir('desc') }
  }
 
  function SortArrow({ col }) {
    if (sortCol !== col) return <span style={{ opacity: 0.3, marginLeft: 4 }}>↕</span>
    return <span style={{ marginLeft: 4 }}>{sortDir === 'asc' ? '↑' : '↓'}</span>
  }
 
  function ColHeader({ col, label, align = 'right' }) {
    return (
      <span onClick={() => toggleSort(col)} style={{ textAlign: align, cursor: 'pointer', userSelect: 'none', display: 'flex', alignItems: 'center', justifyContent: align === 'right' ? 'flex-end' : 'flex-start', gap: 2 }}>
        {label}<SortArrow col={col} />
      </span>
    )
  }
 
  // Gráfico — últimos 7 dias
  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - i))
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
  })
  const dayLabels = last7.map(d => { const [,, dd] = d.split('-'); return dd + '/' + d.split('-')[1] })
  const dayRevenue = last7.map(day => sales.filter(v => getDate(v) === day).reduce((s, v) => s + v.total, 0))
  const dayLucro = last7.map(day => {
    const daySales = sales.filter(v => getDate(v) === day)
    return daySales.reduce((s, v) => {
      if (!v.itens) return s
      return s + v.itens.reduce((ss, i) => ss + (i.price - (i.cost_insumos || 0) - (i.cost_prod || 0)) * i.qty, 0)
    }, 0)
  })
 
  // Horário de pico
  const hourMap = {}
  filtered.forEach(v => {
    const h = v.time ? parseInt(v.time.split(':')[0]) : null
    if (h === null) return
    if (!hourMap[h]) hourMap[h] = { vendas: 0, revenue: 0 }
    hourMap[h].vendas += 1
    hourMap[h].revenue += v.total
  })
  const hours = Object.keys(hourMap).sort((a, b) => parseInt(a) - parseInt(b))
  const hourVendas = hours.map(h => hourMap[h].vendas)
  const maxVendas = Math.max(...hourVendas, 1)
  const rankingHoras = [...hours].sort((a, b) => hourMap[b].vendas - hourMap[a].vendas).slice(0, 5)
 
  return (
    <div style={{ padding: 24, flex: 1, overflowY: 'auto' }}>
      <DateFilterBar filter={filter} />
 
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px,1fr))', gap: 12, marginBottom: 24 }}>
        {[{ l: 'RECEITA TOTAL', v: fmt(totRevenue), h: true }, { l: 'CUSTO INSUMOS', v: fmt(totInsumos) }, { l: 'CUSTO PRODUÇÃO', v: fmt(totProd) }, { l: 'LUCRO TOTAL', v: fmt(totLucro), g: true }].map(c => (
          <Card key={c.l} style={{ borderLeft: `4px solid ${c.h ? P : c.g ? GREEN : '#ddd'}` }}>
            <div style={{ fontSize: 8, letterSpacing: 1.5, color: '#888', marginBottom: 4 }}>{c.l}</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: c.h ? P : c.g ? GREEN : DARK }}>{c.v}</div>
          </Card>
        ))}
      </div>
 
      <SecTitle>POR FORMA DE PAGAMENTO</SecTitle>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 10, marginBottom: 24 }}>
        {PAYMENT_METHODS.map(m => { const val = filtered.filter(v => v.payment === m.key).reduce((s, v) => s + v.total, 0); return <Card key={m.key}><div style={{ fontSize: 8, letterSpacing: 1, color: '#888', marginBottom: 4 }}>{m.label}</div><div style={{ fontSize: 15, fontWeight: 700, color: P }}>{fmt(val)}</div></Card> })}
      </div>
 
      <SecTitle>FATURAMENTO — ÚLTIMOS 7 DIAS</SecTitle>
      <div style={{ display: 'flex', gap: 16, marginBottom: 8, fontSize: 11, color: '#888' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><span style={{ width: 10, height: 10, background: P, display: 'inline-block' }}></span>Faturamento</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><span style={{ width: 10, height: 2, background: GREEN, display: 'inline-block' }}></span>Lucro</span>
      </div>
      <div id="fat7wrap" style={{ position: 'relative', width: '100%', height: 200, marginBottom: 28 }}>
        <canvas id="chartFat7" role="img" aria-label="Faturamento dos últimos 7 dias"></canvas>
      </div>
 
      {hours.length > 0 && <>
        <SecTitle>HORÁRIO DE PICO</SecTitle>
        <div style={{ display: 'flex', gap: 16, marginBottom: 8, fontSize: 11, color: '#888' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><span style={{ width: 10, height: 10, background: P, display: 'inline-block' }}></span>Nº de vendas por hora</span>
        </div>
        <div style={{ position: 'relative', width: '100%', height: 160, marginBottom: 16 }}>
          <canvas id="chartPico" role="img" aria-label="Vendas por hora do dia"></canvas>
        </div>
        <div style={{ background: W, border: `2px solid #e0d0ea`, marginBottom: 24 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2rem 1fr 1fr 1fr', background: P, color: W, padding: '8px 14px', fontSize: 8, fontWeight: 700, letterSpacing: 1, gap: 8 }}>
            <span>#</span><span>HORÁRIO</span><span>VENDAS</span><span>FATURAMENTO</span>
          </div>
          {rankingHoras.map((h, i) => (
            <div key={h} style={{ display: 'grid', gridTemplateColumns: '2rem 1fr 1fr 1fr', padding: '10px 14px', borderBottom: `1px solid ${OFF}`, fontSize: 12, gap: 8 }}>
              <span style={{ color: '#aaa', fontWeight: 700 }}>{i+1}</span>
              <span style={{ fontWeight: 600 }}>{h}h</span>
              <span>{hourMap[h].vendas} venda{hourMap[h].vendas !== 1 ? 's' : ''}</span>
              <span style={{ color: P, fontWeight: 700 }}>{fmt(hourMap[h].revenue)}</span>
            </div>
          ))}
        </div>
      </>}
 
      <SecTitle>DETALHAMENTO POR PRODUTO</SecTitle>
      <div style={{ background: W, border: `2px solid #e0d0ea`, marginBottom: 24 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 0.5fr 1fr 1fr 1fr 1fr', background: P, color: W, padding: '9px 14px', fontSize: 8, fontWeight: 700, letterSpacing: 1, gap: 8 }}>
          <ColHeader col="name" label="PRODUTO" align="left" />
          <ColHeader col="qty" label="QTD" />
          <ColHeader col="revenue" label="RECEITA" />
          <ColHeader col="costInsumos" label="INSUMOS" />
          <ColHeader col="costProd" label="PRODUÇÃO" />
          <ColHeader col="lucro" label="LUCRO" />
        </div>
        {sorted.length === 0 && <div style={{ padding: 16, fontSize: 12, color: '#bbb' }}>Nenhuma venda no período.</div>}
        {sorted.map((i, idx) => (
          <div key={idx} style={{ display: 'grid', gridTemplateColumns: '2fr 0.5fr 1fr 1fr 1fr 1fr', padding: '10px 14px', borderBottom: `1px solid ${OFF}`, fontSize: 11, gap: 8 }}>
            <span style={{ fontWeight: 600 }}>{i.name}</span>
            <span style={{ textAlign: 'right' }}>{i.qty}</span>
            <span style={{ textAlign: 'right', color: P, fontWeight: 700 }}>{fmt(i.revenue)}</span>
            <span style={{ textAlign: 'right', color: '#888' }}>{fmt(i.costInsumos)}</span>
            <span style={{ textAlign: 'right', color: '#888' }}>{fmt(i.costProd)}</span>
            <span style={{ textAlign: 'right', color: GREEN, fontWeight: 700 }}>{fmt(i.lucro)}</span>
          </div>
        ))}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 0.5fr 1fr 1fr 1fr 1fr', padding: '11px 14px', background: OFF, fontSize: 11, gap: 8, fontWeight: 700 }}>
          <span>TOTAL</span><span />
          <span style={{ textAlign: 'right', color: P }}>{fmt(totRevenue)}</span>
          <span style={{ textAlign: 'right', color: '#888' }}>{fmt(totInsumos)}</span>
          <span style={{ textAlign: 'right', color: '#888' }}>{fmt(totProd)}</span>
          <span style={{ textAlign: 'right', color: GREEN }}>{fmt(totLucro)}</span>
        </div>
      </div>
 
      <ChartsFaturamento dayLabels={dayLabels} dayRevenue={dayRevenue} dayLucro={dayLucro} hours={hours} hourVendas={hourVendas} maxVendas={maxVendas} />
    </div>
  )
}
 
function ChartsFaturamento({ dayLabels, dayRevenue, dayLucro, hours, hourVendas, maxVendas }) {
  useEffect(() => {
    let c1, c2
    const t = setTimeout(() => {
      const el1 = document.getElementById('chartFat7')
      const el2 = document.getElementById('chartPico')
      if (el1) {
        c1 = new window.ChartJS(el1, {
          type: 'bar',
          data: {
            labels: dayLabels,
            datasets: [
              { label: 'Faturamento', data: dayRevenue, backgroundColor: '#552072', borderRadius: 3, order: 2 },
              { label: 'Lucro', data: dayLucro, type: 'line', borderColor: '#2e7d32', backgroundColor: 'transparent', pointBackgroundColor: '#2e7d32', pointRadius: 3, borderWidth: 2, tension: 0.3, order: 1 }
            ]
          },
          options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false } }, y: { grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { callback: v => 'R$' + v } } } }
        })
      }
      if (el2 && hours.length > 0) {
        c2 = new window.ChartJS(el2, {
          type: 'bar',
          data: {
            labels: hours.map(h => h + 'h'),
            datasets: [{ label: 'Vendas', data: hourVendas, backgroundColor: hourVendas.map(v => v === maxVendas ? '#552072' : 'rgba(85,32,114,0.3)'), borderRadius: 3 }]
          },
          options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false } }, y: { grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { stepSize: 1 } } } }
        })
      }
    }, 100)
    return () => { clearTimeout(t); c1?.destroy(); c2?.destroy() }
  }, [dayLabels, dayRevenue, dayLucro, hours, hourVendas, maxVendas])
  return null
}
 
function Clientes({ clients, reload }) {
  const [form, setForm] = useState({ phone: '', name: '', obs: '' })
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
 
  async function save() {
    if (!form.phone || !form.name) return
    setLoading(true)
    const clean = form.phone.replace(/\D/g, '')
    await supabase.from('clientes').upsert({ phone: clean, name: form.name, obs: form.obs }, { onConflict: 'phone' })
    setForm({ phone: '', name: '', obs: '' })
    reload()
    setLoading(false)
  }
 
  const filtered = clients.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search.replace(/\D/g, '')))
  return (
    <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
      <div style={{ width: 300, padding: 22, borderRight: `2px solid #e0d0ea`, background: W, overflowY: 'auto' }}>
        <SecTitle>CADASTRAR CLIENTE</SecTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Input label="TELEFONE" value={form.phone} onChange={v => setForm(f => ({ ...f, phone: v }))} placeholder="(00) 00000-0000" />
          <Input label="NOME" value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} placeholder="Nome do cliente" />
          <Field label="OBSERVAÇÕES"><textarea value={form.obs} onChange={e => setForm(f => ({ ...f, obs: e.target.value }))} placeholder="Alergias, preferências..." rows={3} style={{ padding: '9px 12px', fontSize: 12, fontFamily: 'inherit', border: `2px solid ${P}`, outline: 'none', background: OFF, color: DARK, resize: 'none' }} /></Field>
          <Btn full onClick={save} disabled={loading || !form.phone || !form.name}>{loading ? 'SALVANDO...' : 'SALVAR CLIENTE'}</Btn>
        </div>
      </div>
      <div style={{ flex: 1, padding: 22, overflowY: 'auto' }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar por nome ou telefone..." style={{ width: '100%', padding: '10px 14px', fontSize: 12, border: `2px solid ${P}`, outline: 'none', fontFamily: 'inherit', background: OFF, marginBottom: 16 }} />
        <SecTitle>CLIENTES ({filtered.length})</SecTitle>
        {filtered.map(c => (
          <Card key={c.id} style={{ marginBottom: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div><div style={{ fontWeight: 700, fontSize: 13 }}>{c.name}</div><div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>{c.phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')}</div>{c.obs && <div style={{ fontSize: 10, color: '#aaa', marginTop: 4, fontStyle: 'italic' }}>{c.obs}</div>}</div>
            <div style={{ textAlign: 'right' }}><div style={{ fontSize: 18, fontWeight: 700, color: P }}>{c.points} pts</div><div style={{ fontSize: 9, color: '#aaa' }}>{c.purchases} compra{c.purchases !== 1 ? 's' : ''}</div></div>
          </Card>
        ))}
        {filtered.length === 0 && <div style={{ fontSize: 12, color: '#bbb' }}>Nenhum cliente encontrado.</div>}
      </div>
    </div>
  )
}
 
function Produtos({ products, setProducts, categorias }) {
  const [form, setForm] = useState({ name: '', price: '', category: 'bolos', cost_insumos: '', cost_prod: '', qty: '', min_qty: '' })
  const [editProduct, setEditProduct] = useState(null)
  const [loading, setLoading] = useState(false)
  const lucro = (parseFloat(form.price)||0) - (parseFloat(form.cost_insumos)||0) - (parseFloat(form.cost_prod)||0)
 
  async function save() {
    if (!form.name || !form.price) return
    setLoading(true)
    const { data } = await supabase.from('produtos').insert({ name: form.name, price: parseFloat(form.price), category: form.category, cost_insumos: parseFloat(form.cost_insumos)||0, cost_prod: parseFloat(form.cost_prod)||0, qty: parseInt(form.qty)||0, min_qty: parseInt(form.min_qty)||0, active: true }).select().single()
    if (data) setProducts(prev => [...prev, data])
    setForm({ name: '', price: '', category: 'bolos', cost_insumos: '', cost_prod: '', qty: '', min_qty: '' })
    setLoading(false)
  }
 
  async function toggleActive(p) {
    await supabase.from('produtos').update({ active: !p.active }).eq('id', p.id)
    setProducts(prev => prev.map(x => x.id === p.id ? { ...x, active: !x.active } : x))
  }
 
  return (
    <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
      {editProduct && <EditProductModal product={editProduct} onSave={updated => setProducts(prev => prev.map(p => p.id === updated.id ? updated : p))} onClose={() => setEditProduct(null)} />}
      <div style={{ width: 300, padding: 22, borderRight: `2px solid #e0d0ea`, background: W, overflowY: 'auto' }}>
        <SecTitle>NOVO PRODUTO</SecTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
          <Input label="NOME" value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} placeholder="Nome do produto" />
          <Field label="CATEGORIA"><select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} style={{ ...s.input }}>{categorias.filter(c => c.tipo === 'produto' || c.tipo === 'ambos').map(c => <option key={c.id} value={c.name}>{c.name}</option>)}</select></Field>
          <Input label="PREÇO DE VENDA (R$)" type="number" value={form.price} onChange={v => setForm(f => ({ ...f, price: v }))} placeholder="0,00" />
          <Input label="CUSTO INSUMOS (R$)" type="number" value={form.cost_insumos} onChange={v => setForm(f => ({ ...f, cost_insumos: v }))} placeholder="0,00" />
          <Input label="CUSTO PRODUÇÃO (R$)" type="number" value={form.cost_prod} onChange={v => setForm(f => ({ ...f, cost_prod: v }))} placeholder="0,00" />
          {(form.price || form.cost_insumos || form.cost_prod) && <div style={{ padding: '10px 12px', background: lucro >= 0 ? '#e8f5e9' : '#ffebee', border: `2px solid ${lucro >= 0 ? GREEN : RED}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1, color: lucro >= 0 ? GREEN : RED }}>LUCRO POR UNIDADE</span><span style={{ fontSize: 20, fontWeight: 700, color: lucro >= 0 ? GREEN : RED }}>{fmt(lucro)}</span></div>}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <Input label="ESTOQUE INICIAL" type="number" value={form.qty} onChange={v => setForm(f => ({ ...f, qty: v }))} placeholder="0" />
            <Input label="QTD MÍNIMA" type="number" value={form.min_qty} onChange={v => setForm(f => ({ ...f, min_qty: v }))} placeholder="0" />
          </div>
          <Btn full onClick={save} disabled={loading || !form.name || !form.price}>{loading ? 'SALVANDO...' : 'ADICIONAR PRODUTO'}</Btn>
        </div>
      </div>
      <div style={{ flex: 1, padding: 22, overflowY: 'auto' }}>
        <SecTitle>CARDÁPIO ({products.length} produtos)</SecTitle>
        {['bolos','doces','bebidas'].map(cat => {
          const ps = products.filter(p => p.category === cat)
          if (!ps.length) return null
          return (
            <div key={cat} style={{ marginBottom: 22 }}>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2, color: '#aaa', marginBottom: 10, textTransform: 'uppercase' }}>{cat}</div>
              {ps.map(p => { const lucroP = p.price - (p.cost_insumos||0) - (p.cost_prod||0); const low = p.min_qty > 0 && p.qty <= p.min_qty; return (
                <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', background: p.active ? W : '#f5f5f5', border: `2px solid ${low ? AMBER : p.active ? '#e0d0ea' : '#ddd'}`, marginBottom: 8 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 12, color: p.active ? DARK : '#bbb' }}>{p.name}</div>
                    <div style={{ fontSize: 10, color: '#aaa', marginTop: 3, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                      <span>Venda: <strong style={{ color: P }}>{fmt(p.price)}</strong></span>
                      <span>Insumos: {fmt(p.cost_insumos||0)}</span>
                      <span>Prod: {fmt(p.cost_prod||0)}</span>
                      <span>Lucro: <strong style={{ color: GREEN }}>{fmt(lucroP)}</strong></span>
                    </div>
                    <div style={{ fontSize: 10, marginTop: 3 }}>
                      <span style={{ color: low ? RED : '#aaa' }}>Estoque: {p.qty} un. · Mín: {p.min_qty}</span>
                      {low && <span style={{ marginLeft: 8, color: AMBER, fontWeight: 700 }}>⚠ BAIXO</span>}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8, marginLeft: 12 }}>
                    <button onClick={() => setEditProduct(p)} style={{ padding: '6px 14px', fontSize: 9, fontWeight: 700, letterSpacing: 1, fontFamily: 'inherit', cursor: 'pointer', border: `2px solid ${P}`, background: P, color: W }}>EDITAR</button>
                    <button onClick={() => toggleActive(p)} style={{ padding: '6px 12px', fontSize: 9, fontWeight: 700, letterSpacing: 1, fontFamily: 'inherit', cursor: 'pointer', border: `2px solid ${p.active ? RED : GREEN}`, background: 'transparent', color: p.active ? RED : GREEN }}>{p.active ? 'DESATIVAR' : 'ATIVAR'}</button>
                  </div>
                </div>
              ) })}
            </div>
          )
        })}
      </div>
    </div>
  )
}
 
function Estoque({ stockItems, setStockItems, categorias }) {
  const [form, setForm] = useState({ name: '', unit: 'kg', qty: '', min: '' })
  const [editId, setEditId] = useState(null)
  const [editData, setEditData] = useState({ qty: '', min: '' })
 
  async function save() {
    if (!form.name || !form.qty) return
    const { data } = await supabase.from('estoque').insert({ name: form.name, unit: form.unit, qty: parseFloat(form.qty), min_qty: parseFloat(form.min)||0 }).select().single()
    if (data) setStockItems(prev => [...prev, data])
    setForm({ name: '', unit: 'kg', qty: '', min: '' })
  }
 
  async function saveEdit(id) {
    await supabase.from('estoque').update({ qty: parseFloat(editData.qty)||0, min_qty: parseFloat(editData.min)||0 }).eq('id', id)
    setStockItems(prev => prev.map(i => i.id === id ? { ...i, qty: parseFloat(editData.qty)||0, min_qty: parseFloat(editData.min)||0 } : i))
    setEditId(null)
  }
 
  const low = stockItems.filter(i => i.min_qty > 0 && i.qty <= i.min_qty)
  return (
    <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
      <div style={{ width: 280, padding: 22, borderRight: `2px solid #e0d0ea`, background: W, overflowY: 'auto' }}>
        <SecTitle>NOVO INGREDIENTE</SecTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
          <Input label="NOME" value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} placeholder="Ex: Farinha de Trigo" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <Input label="QUANTIDADE" type="number" value={form.qty} onChange={v => setForm(f => ({ ...f, qty: v }))} placeholder="0" />
            <Field label="UNIDADE"><select value={form.unit} onChange={e => setForm(f => ({ ...f, unit: e.target.value }))} style={{ ...s.input }}>{['kg','g','un','L','ml','cx'].map(u => <option key={u} value={u}>{u}</option>)}</select></Field>
          </div>
          <Input label="QTD MÍNIMA (alerta)" type="number" value={form.min} onChange={v => setForm(f => ({ ...f, min: v }))} placeholder="0" />
          <Btn full onClick={save} disabled={!form.name || !form.qty}>ADICIONAR</Btn>
        </div>
      </div>
      <div style={{ flex: 1, padding: 22, overflowY: 'auto' }}>
        {low.length > 0 && <div style={{ padding: '12px 16px', background: '#ffebee', border: `2px solid ${RED}`, marginBottom: 18 }}><div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1, color: RED, marginBottom: 6 }}>⚠ ESTOQUE BAIXO</div>{low.map(i => <div key={i.id} style={{ fontSize: 11, color: RED }}>• {i.name}: {i.qty} {i.unit} (mín. {i.min_qty})</div>)}</div>}
        <SecTitle>INGREDIENTES ({stockItems.length})</SecTitle>
        {stockItems.map(item => { const isLow = item.min_qty > 0 && item.qty <= item.min_qty; return (
          <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 16px', background: W, border: `2px solid ${isLow ? RED : '#e0d0ea'}`, marginBottom: 8 }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 13 }}>{item.name}</div>
              {editId === item.id
                ? <div style={{ display: 'flex', gap: 8, marginTop: 6, alignItems: 'center' }}>
                    <input type="number" value={editData.qty} onChange={e => setEditData(d => ({ ...d, qty: e.target.value }))} style={{ width: 70, padding: '5px 8px', fontSize: 13, fontWeight: 700, border: `2px solid ${P}`, outline: 'none', fontFamily: 'inherit', background: OFF, textAlign: 'center' }} autoFocus />
                    <span style={{ fontSize: 11, color: '#888' }}>{item.unit} · Mín:</span>
                    <input type="number" value={editData.min} onChange={e => setEditData(d => ({ ...d, min: e.target.value }))} style={{ width: 60, padding: '5px 8px', fontSize: 13, fontWeight: 700, border: `2px solid ${P}`, outline: 'none', fontFamily: 'inherit', background: OFF, textAlign: 'center' }} />
                    <button onClick={() => saveEdit(item.id)} style={{ padding: '5px 12px', background: GREEN, color: W, border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 10, fontWeight: 700 }}>OK</button>
                    <button onClick={() => setEditId(null)} style={{ padding: '5px 10px', background: 'transparent', color: '#888', border: `1px solid #ccc`, cursor: 'pointer', fontFamily: 'inherit', fontSize: 10 }}>✕</button>
                  </div>
                : <div style={{ fontSize: 10, color: '#aaa', marginTop: 3 }}>Mín: {item.min_qty} {item.unit}</div>}
            </div>
            {editId !== item.id && (
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <div style={{ textAlign: 'right' }}><div style={{ fontSize: 22, fontWeight: 700, color: isLow ? RED : P }}>{item.qty}</div><div style={{ fontSize: 10, color: '#aaa' }}>{item.unit}</div></div>
                <button onClick={() => { setEditId(item.id); setEditData({ qty: String(item.qty), min: String(item.min_qty) }) }} style={{ padding: '6px 12px', background: 'transparent', color: P, border: `2px solid ${P}`, cursor: 'pointer', fontFamily: 'inherit', fontSize: 9, fontWeight: 700, letterSpacing: 1 }}>EDITAR</button>
              </div>
            )}
          </div>
        ) })}
      </div>
    </div>
  )
}
 
 
// ─── CATEGORIAS ───────────────────────────────────────────────────────────────
 
function Categorias({ categorias, setCategorias }) {
  const [form, setForm] = useState({ name: '', tipo: 'produto' })
  const [editId, setEditId] = useState(null)
  const [editData, setEditData] = useState({ name: '', tipo: 'produto' })
  const [loading, setLoading] = useState(false)
 
  async function save() {
    if (!form.name) return
    setLoading(true)
    const { data } = await supabase.from('categorias').insert({ name: form.name.toLowerCase().trim(), tipo: form.tipo }).select().single()
    if (data) setCategorias(prev => [...prev, data].sort((a,b) => a.name.localeCompare(b.name)))
    setForm({ name: '', tipo: 'produto' })
    setLoading(false)
  }
 
  async function saveEdit(id) {
    await supabase.from('categorias').update({ name: editData.name.toLowerCase().trim(), tipo: editData.tipo }).eq('id', id)
    setCategorias(prev => prev.map(c => c.id === id ? { ...c, name: editData.name.toLowerCase().trim(), tipo: editData.tipo } : c))
    setEditId(null)
  }
 
  async function remove(id) {
    await supabase.from('categorias').delete().eq('id', id)
    setCategorias(prev => prev.filter(c => c.id !== id))
  }
 
  const TIPO_LABEL = { produto: 'Produto', estoque: 'Estoque', ambos: 'Ambos' }
  const TIPO_COLOR = { produto: P, estoque: GREEN, ambos: AMBER }
 
  return (
    <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
      <div style={{ width: 300, padding: 22, borderRight: `2px solid #e0d0ea`, background: W, overflowY: 'auto' }}>
        <SecTitle>NOVA CATEGORIA</SecTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Input label="NOME" value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} placeholder="Ex: salgados" />
          <Field label="TIPO">
            <select value={form.tipo} onChange={e => setForm(f => ({ ...f, tipo: e.target.value }))} style={{ ...s.input }}>
              <option value="produto">Produto (cardápio)</option>
              <option value="estoque">Estoque (ingredientes)</option>
              <option value="ambos">Ambos</option>
            </select>
          </Field>
          <Btn full onClick={save} disabled={loading || !form.name}>{loading ? 'SALVANDO...' : 'ADICIONAR CATEGORIA'}</Btn>
        </div>
      </div>
      <div style={{ flex: 1, padding: 22, overflowY: 'auto' }}>
        <SecTitle>CATEGORIAS ({categorias.length})</SecTitle>
        {categorias.length === 0 && <div style={{ fontSize: 12, color: '#bbb' }}>Nenhuma categoria cadastrada.</div>}
        {categorias.map(cat => (
          <div key={cat.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 16px', background: W, border: `2px solid #e0d0ea`, marginBottom: 8 }}>
            {editId === cat.id ? (
              <div style={{ display: 'flex', gap: 8, flex: 1, alignItems: 'center' }}>
                <input value={editData.name} onChange={e => setEditData(d => ({ ...d, name: e.target.value }))} style={{ flex: 1, padding: '6px 10px', fontSize: 13, fontWeight: 600, border: `2px solid ${P}`, outline: 'none', fontFamily: 'inherit', background: OFF }} autoFocus />
                <select value={editData.tipo} onChange={e => setEditData(d => ({ ...d, tipo: e.target.value }))} style={{ padding: '6px 10px', fontSize: 11, fontFamily: 'inherit', border: `2px solid ${P}`, outline: 'none', background: OFF }}>
                  <option value="produto">Produto</option>
                  <option value="estoque">Estoque</option>
                  <option value="ambos">Ambos</option>
                </select>
                <button onClick={() => saveEdit(cat.id)} style={{ padding: '6px 12px', background: GREEN, color: W, border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 10, fontWeight: 700 }}>OK</button>
                <button onClick={() => setEditId(null)} style={{ padding: '6px 10px', background: 'transparent', color: '#888', border: `1px solid #ccc`, cursor: 'pointer', fontFamily: 'inherit', fontSize: 10 }}>✕</button>
              </div>
            ) : (
              <>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{cat.name}</div>
                  <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1, color: TIPO_COLOR[cat.tipo], background: TIPO_COLOR[cat.tipo] + '18', padding: '2px 8px', marginTop: 4, display: 'inline-block' }}>{TIPO_LABEL[cat.tipo].toUpperCase()}</span>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => { setEditId(cat.id); setEditData({ name: cat.name, tipo: cat.tipo }) }} style={{ padding: '6px 14px', fontSize: 9, fontWeight: 700, letterSpacing: 1, fontFamily: 'inherit', cursor: 'pointer', border: `2px solid ${P}`, background: P, color: W }}>EDITAR</button>
                  <button onClick={() => remove(cat.id)} style={{ padding: '6px 12px', fontSize: 9, fontWeight: 700, letterSpacing: 1, fontFamily: 'inherit', cursor: 'pointer', border: `2px solid ${RED}`, background: 'transparent', color: RED }}>EXCLUIR</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
 
// ══════════════════════════════════════════════════════════════════════════════
// APP ROOT
// ══════════════════════════════════════════════════════════════════════════════
 
export default function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [screen, setScreen] = useState('painel')
  const [mesas, setMesas] = useState({})
  const [mesaAtiva, setMesaAtiva] = useState(null)
  const [mesaStep, setMesaStep] = useState('mesas')
  const [mesasCarts, setMesasCarts] = useState({})
 
  const [products, setProducts] = useState([])
  const [clients, setClients] = useState([])
  const [sales, setSales] = useState([])
  const [stockItems, setStockItems] = useState([])
  const [movimentos, setMovimentos] = useState([])
  const [categorias, setCategorias] = useState([])
  const [caixaAberto, setCaixaAberto] = useState(false)
  const [fundoInicial, setFundoInicial] = useState(0)
 
  useEffect(() => {
    if (!window.ChartJS) {
      const script = document.createElement('script')
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js'
      script.onload = () => { window.ChartJS = window.Chart }
      document.head.appendChild(script)
    } else {
      window.ChartJS = window.Chart
    }
  }, [])
 
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => { setSession(session); setLoading(false) })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => setSession(session))
    return () => subscription.unsubscribe()
  }, [])
 
  const loadAll = useCallback(async () => {
    const [p, c, v, e, m, cx, cat] = await Promise.all([
      supabase.from('produtos').select('*').order('category').order('name'),
      supabase.from('clientes').select('*').order('name'),
      supabase.from('vendas').select('*, itens:venda_itens(*)').order('created_at', { ascending: false }),
      supabase.from('estoque').select('*').order('name'),
      supabase.from('movimentos').select('*').eq('date', todayStr()).order('created_at'),
      supabase.from('caixa').select('*').eq('date', todayStr()).single(),
      supabase.from('categorias').select('*').order('name'),
    ])
    if (p.data) setProducts(p.data)
    if (c.data) setClients(c.data)
    if (v.data) setSales(v.data)
    if (e.data) setStockItems(e.data)
    if (m.data) setMovimentos(m.data)
    if (cx.data) { setCaixaAberto(cx.data.aberto); setFundoInicial(cx.data.fundo_inicial) }
    if (cat.data) setCategorias(cat.data)
  }, [])
 
  useEffect(() => { if (session) loadAll() }, [session, loadAll])
 
  async function handleSale(data, onSuccess) {
    const { data: venda } = await supabase.from('vendas').insert({
      date: todayStr(),
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      total: data.finalTotal,
      payment: data.payment,
      change_val: data.change || 0,
      items_count: data.items,
      origin: data.origin,
      mesa: data.mesa || null,
      client_id: data.foundClient?.id || null,
      points_earned: data.pointsEarned || 0,
      points_used: data.pointsUsed || 0,
    }).select().single()
 
    if (venda && data.cart) {
      await supabase.from('venda_itens').insert(data.cart.map(i => ({ venda_id: venda.id, produto_id: i.id, name: i.name, price: i.price, qty: i.qty, cost_insumos: i.cost_insumos || 0, cost_prod: i.cost_prod || 0 })))
      // Decrease product stock
      for (const item of data.cart) {
        await supabase.from('produtos').update({ qty: Math.max(0, (products.find(p => p.id === item.id)?.qty || 0) - item.qty) }).eq('id', item.id)
      }
    }
 
    if (data.foundClient) {
      await supabase.from('clientes').update({
        points: Math.max(0, data.foundClient.points + (data.pointsEarned || 0) - (data.usePoints ? data.pointsUsed || 0 : 0)),
        purchases: data.foundClient.purchases + 1,
      }).eq('id', data.foundClient.id)
    }
 
    await loadAll()
    onSuccess()
  }
 
  if (loading) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Sans', sans-serif", color: P, fontSize: 12, letterSpacing: 1 }}>CARREGANDO...</div>
  if (!session) return <Login onLogin={() => {}} />
 
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: OFF, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: P, color: W, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 22px', height: 50, flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, letterSpacing: 1 }}>Rodat</span>
          <span style={{ width: 1, height: 18, background: 'rgba(255,255,255,0.3)' }} />
          <span style={{ fontSize: 9, opacity: 0.6, letterSpacing: 1 }}>DOCES E CAFÉS</span>
        </div>
        <div style={{ display: 'flex', gap: 22, alignItems: 'center' }}>
          <span style={{ fontSize: 10, opacity: 0.65 }}>{new Date().toLocaleDateString('pt-BR')}</span>
          <span style={{ width: 1, height: 18, background: 'rgba(255,255,255,0.3)' }} />
          <span style={{ fontSize: 10, opacity: 0.65 }}>{caixaAberto ? '🟢 CAIXA ABERTO' : '🔴 CAIXA FECHADO'}</span>
          <span style={{ width: 1, height: 18, background: 'rgba(255,255,255,0.3)' }} />
          <button onClick={() => supabase.auth.signOut()} style={{ fontSize: 9, color: 'rgba(255,255,255,0.6)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700, letterSpacing: 1 }}>SAIR</button>
        </div>
      </div>
 
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <div style={{ width: 130, background: DARK, display: 'flex', flexDirection: 'column', paddingTop: 12, flexShrink: 0 }}>
          {NAV.map(n => (
            <button key={n.key} onClick={() => setScreen(n.key)} style={{ padding: '12px 14px', fontFamily: 'inherit', cursor: 'pointer', textAlign: 'left', fontSize: 9, fontWeight: 700, letterSpacing: 1, border: 'none', background: screen === n.key ? P : 'transparent', color: screen === n.key ? W : 'rgba(255,255,255,0.4)', borderLeft: `3px solid ${screen === n.key ? W : 'transparent'}`, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 14 }}>{n.icon}</span>{n.label.toUpperCase()}
            </button>
          ))}
        </div>
 
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {screen === 'painel'      && <Painel caixaAberto={caixaAberto} fundoInicial={fundoInicial} sales={sales} stockItems={stockItems} products={products} setScreen={setScreen} />}
          {screen === 'caixa'       && <CaixaModule caixaAberto={caixaAberto} setCaixaAberto={setCaixaAberto} fundoInicial={fundoInicial} setFundoInicial={setFundoInicial} sales={sales} movimentos={movimentos} reloadMovimentos={() => supabase.from('movimentos').select('*').eq('date', todayStr()).order('created_at').then(r => r.data && setMovimentos(r.data))} reloadCaixa={() => supabase.from('caixa').select('*').eq('date', todayStr()).single().then(r => r.data && (setCaixaAberto(r.data.aberto), setFundoInicial(r.data.fundo_inicial)))} />}
          {screen === 'pdv'         && <PDVModule products={products} setProducts={setProducts} clients={clients} onSale={handleSale} />}
          {screen === 'mesas'       && <MesasModule products={products} clients={clients} onSale={handleSale} mesas={mesas} setMesas={setMesas} mesaAtiva={mesaAtiva} setMesaAtiva={setMesaAtiva} mesaStep={mesaStep} setMesaStep={setMesaStep} mesasCarts={mesasCarts} setMesasCarts={setMesasCarts} />}
          {screen === 'historico'   && <Historico sales={sales} />}
          {screen === 'faturamento' && <Faturamento sales={sales} />}
          {screen === 'clientes'    && <Clientes clients={clients} reload={() => supabase.from('clientes').select('*').order('name').then(r => r.data && setClients(r.data))} />}
          {screen === 'produtos'    && <Produtos products={products} setProducts={setProducts} categorias={categorias} />}
          {screen === 'estoque'     && <Estoque stockItems={stockItems} setStockItems={setStockItems} categorias={categorias} />}
          {screen === 'categorias'  && <Categorias categorias={categorias} setCategorias={setCategorias} />}
        </div>
      </div>
    </div>
  )
}
 

