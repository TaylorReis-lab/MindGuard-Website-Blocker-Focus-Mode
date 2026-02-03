## 🛡️ MindGuard — Browser Extension

MindGuard é uma extensão de navegador **100% Open Source**, criada com foco em **segurança, privacidade e transparência**.

O projeto nasceu da necessidade de ter um bloqueador de sites simples, confiável e auditável — onde qualquer pessoa possa entender exatamente o que está sendo executado no seu navegador.

---

## 🔎 Open Source & Transparência

Todo o código do MindGuard está disponível neste repositório.

Qualquer pessoa pode:
- visualizar
- auditar
- modificar
- sugerir melhorias

Não existe código oculto, ofuscado ou carregado remotamente.  
O que você vê no repositório é exatamente o que a extensão executa.

---

## 🔐 Segurança e Privacidade

O MindGuard foi desenvolvido seguindo o princípio de **privacidade total por padrão**:

- ✅ Nenhuma coleta de dados
- ✅ Nenhum rastreamento
- ✅ Nenhuma comunicação com servidores externos
- ✅ Execução 100% local no navegador

A extensão não envia, armazena ou compartilha qualquer tipo de informação do usuário.

---

## ⚙️ Funcionamento Técnico

A extensão utiliza exclusivamente **APIs oficiais do navegador**, seguindo o padrão **Manifest V3**, incluindo:

- `declarativeNetRequest` para bloqueio de sites
- `service_worker` para gerenciamento das regras
- Páginas locais (`blocked.html`) para exibição do bloqueio

Os principais arquivos envolvidos são:

- `logica.js`
- `blockedSites.js`
- `block/blocked.html`
- `block/blocked.js`

Todo o fluxo pode ser analisado diretamente no código-fonte.

---

## 📦 Build e Distribuição

O projeto conta com **build automatizado via GitHub Actions**, gerando o arquivo da extensão pronto para testes e divulgação.

Isso garante consistência, organização e facilidade na distribuição do projeto.

---

## 🚧 Status do Projeto

O MindGuard está em **desenvolvimento ativo**.

Alguns pontos importantes:
- 🚧 Podem existir bugs em páginas específicas
- 🚧 Alguns sites de download podem não ser bloqueados corretamente
- 🚧 Melhorias e correções estão em andamento

Feedbacks são muito bem-vindos.

---

## 🤝 Contribuições

Se você encontrar problemas, tiver sugestões ou quiser contribuir:
- Abra uma **Issue**
- Envie um **Pull Request**

A ideia é evoluir o projeto de forma aberta e colaborativa.

---

💙 **Transparência gera confiança.  
Código aberto fortalece a comunidade.**
