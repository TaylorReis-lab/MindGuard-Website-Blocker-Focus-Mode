// contactSuporte.js
// Script para gerenciar o formulário de contato da página de suporte

// Aguarda o DOM carregar completamente
document.addEventListener("DOMContentLoaded", function () {
  // Seleciona os elementos do formulário
  const form = document.querySelector(".grid"); // Container dos campos
  const nameInput = document.querySelector('input[type="text"]'); // Campo de nome
  const emailInput = document.querySelector('input[type="email"]'); // Campo de e-mail
  const messageTextarea = document.querySelector("textarea"); // Campo de mensagem
  const sendButton = document.querySelector("button"); // Botão de envio
  const closeButton = document.querySelector(".absolute.right-4.top-4"); // Botão de fechar
  const faqButton = document.querySelector(".faqButton"); // Botão FAQ

  // Redireciona para a página de FAQ ao clicar no botão
  function openFAQ() {
    alert("Pagina de FAQ em construção. Em breve estará disponível!");
  }

  // Função para validar os campos do formulário
  function validateForm() {
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageTextarea.value.trim();

    // Verifica se o nome tem pelo menos 2 caracteres
    if (name.length < 2) {
      alert("Por favor, insira um nome válido (mínimo 2 caracteres).");
      return false;
    }

    // Verifica se o e-mail é válido usando regex simples
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Por favor, insira um e-mail válido.");
      return false;
    }

    // Verifica se a mensagem tem pelo menos 10 caracteres
    if (message.length < 10) {
      alert(
        "Por favor, escreva uma mensagem mais detalhada (mínimo 10 caracteres).",
      );
      return false;
    }

    return true; // Formulário válido
  }

  // Função para simular o envio do formulário
  function submitForm() {
    if (validateForm()) {
      // Mostra mensagem de sucesso
      alert(
        "Mensagem enviada com sucesso! Nossa equipe responderá em até 24 horas.",
      );

      // Limpa os campos após envio
      nameInput.value = "";
      emailInput.value = "";
      messageTextarea.value = "";

      // Fecha a aba após envio (opcional)
      // window.close(); // Desabilitado para manter a aba aberta
    }
  }

  // Função para fechar a página (botão X)
  function closePage() {
    if (
      confirm("Tem certeza que deseja fechar? Sua mensagem não será salva.")
    ) {
      window.close(); // Fecha a aba
    }
  }

  // Adiciona event listeners aos botões
  sendButton.addEventListener("click", submitForm); // Envio ao clicar no botão
  closeButton.addEventListener("click", closePage); // Fechar ao clicar no X
  faqButton.addEventListener("click", openFAQ); // Abrir FAQ ao clicar no botão

  // Permite envio com Enter no campo de mensagem
  messageTextarea.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && event.ctrlKey) {
      // Ctrl+Enter para enviar
      submitForm();
    }
  });

  // Foco automático no primeiro campo
  nameInput.focus();

  console.log("Formulário de contato carregado e funcional.");
});
