

<hr>

<h2 align="center">🔎 Open Source & Transparência</h2>

<p align="center">
  <strong>MindGuard</strong> é um projeto <b>100% Open Source</b>.
</p>

<p align="center">
  Nosso objetivo é oferecer um <b>bloqueador de sites confiável</b>, onde qualquer pessoa pode
  <b>ver, auditar e modificar</b> todo o código-fonte.
</p>

---

<h3>🛡️ Segurança e Privacidade</h3>

<ul>
  <li>✅ Nenhuma coleta de dados</li>
  <li>✅ Nenhum rastreamento</li>
  <li>✅ Nenhuma comunicação com servidores externos</li>
  <li>✅ Todo o código é executado localmente no navegador</li>
</ul>

<p>
  Todo o <strong>script utilizado pela extensão</strong> pode ser encontrado neste repositório.
  Não há código oculto, ofuscado ou injetado remotamente.
</p>

---

<h3>📜 Código Injetado</h3>

<p>
  A extensão utiliza apenas APIs oficiais do navegador (Manifest V3), como:
</p>

<ul>
  <li><code>declarativeNetRequest</code> para bloqueio de sites</li>
  <li><code>service_worker</code> para gerenciamento das regras</li>
  <li>Páginas locais (<code>blocked.html</code>) para exibição do bloqueio</li>
</ul>

<p>
  Você pode revisar exatamente o que é executado nos arquivos:
</p>

<ul>
  <li><code>logica.js</code></li>
  <li><code>blockedSites.js</code></li>
  <li><code>block/blocked.html</code></li>
  <li><code>block/blocked.js</code></li>
</ul>

---

<h3>⚠️ Aviso Importante</h3>

<p>
  O <strong>MindGuard ainda está em desenvolvimento ativo</strong>.
</p>

<ul>
  <li>🚧 Podem existir bugs em páginas específicas</li>
  <li>🚧 Alguns sites de download podem não ser bloqueados corretamente</li>
  <li>🚧 Melhorias e correções estão em andamento</li>
</ul>

<p>
  Se você encontrar problemas ou tiver sugestões, sinta-se à vontade para abrir uma
  <strong>Issue</strong> ou enviar um <strong>Pull Request</strong>.
</p>

---

<p align="center">
  💙 Transparência gera confiança. Código aberto fortalece a comunidade.
</p>

<hr>
