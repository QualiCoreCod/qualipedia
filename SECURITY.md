# Segurança e privacidade

## Conteúdo permitido no repositório

O repositório pode conter conceitos públicos de gestão da qualidade, referências bibliográficas, exemplos fictícios ou anonimizados e a descrição geral das metodologias da autora.

## Conteúdo proibido no repositório público

- documentos internos de empresas;
- dados de clientes, colaboradores ou fornecedores;
- avaliações individuais;
- planilhas com ocorrências, elogios ou não conformidades identificáveis;
- pesos, fórmulas, prompts e critérios proprietários;
- credenciais, tokens, chaves e arquivos `.env`;
- informações cobertas por confidencialidade profissional.

## Área de metodologias

A página `/metodologias` aplica duas verificações no servidor:

1. autenticação da conta;
2. correspondência do e-mail autenticado com `OWNER_EMAIL`.

Se `OWNER_EMAIL` não estiver configurado, o acesso permanece bloqueado por padrão.

## Publicação de exemplos profissionais

Antes de publicar um caso, remova nomes, identificadores e dados individuais. Use resultados agregados somente quando houver autorização para divulgação. Não use informações de produção como conteúdo de demonstração.

## Histórico do Git

Excluir um arquivo em um commit novo não o remove de commits anteriores. Se um dado confidencial já entrou no histórico, torne o repositório privado e execute uma limpeza completa do histórico antes de republicá-lo.
