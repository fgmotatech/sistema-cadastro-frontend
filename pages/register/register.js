const API_URL =
 "https://sistema-cadastro-backend-9csb.onrender.com";

const nomeCompleto = document.getElementById("nomeCompleto");
const celular = document.getElementById("celular");
const email = document.getElementById("email");
const senha = document.getElementById("senha");
const confirmSenha = document.getElementById("confirmSenha");
const termos = document.getElementById("termos");

const senhaToggle = document.getElementById("toggleSenha");
const senhaIcon = document.getElementById("senhaIcon");

const confirmToggle = document.getElementById("toggleConfirmSenha");
const confirmIcon = document.getElementById("confirmIcon");

senhaToggle.addEventListener("click", () => {
  if (senha.type === "password") {
    senha.type = "text";
    senhaIcon.classList.remove("fa-eye");
    senhaIcon.classList.add("fa-eye-slash");
  } else {
    senha.type = "password";
    senhaIcon.classList.remove("fa-eye-slash");
    senhaIcon.classList.add("fa-eye");
  }
});
confirmToggle.addEventListener("click", () => {
  if (confirmSenha.type === "password") {
    confirmSenha.type = "text";
    confirmIcon.classList.remove("fa-eye");
    confirmIcon.classList.add("fa-eye-slash");
  } else {
    confirmSenha.type = "password";
    confirmIcon.classList.remove("fa-eye-slash");
    confirmIcon.classList.add("fa-eye");
  }
});

nomeCompleto.addEventListener("keydown", (e) => {
  if (e.key === " " && nomeCompleto.value.endsWith(" ")) {
    e.preventDefault();
  }
});
nomeCompleto.addEventListener("input", (e) => {
  e.target.value = e.target.value.trimStart();
});

// Máscara de celular
celular.addEventListener("input", (e) => {
  let apenasNumeros = e.target.value.replace(/\D/g, "");
  apenasNumeros = apenasNumeros.substring(0, 11);

  apenasNumeros = apenasNumeros.replace(/^(\d{2})(\d)/g, "($1) $2");
  apenasNumeros = apenasNumeros.replace(/(\d)(\d{4})$/, "$1-$2");

  e.target.value = apenasNumeros;
});

function removerEspacos(e) {
  e.target.value = e.target.value.replace(/\s/g, "");
}

email.addEventListener("input", removerEspacos);
senha.addEventListener("input", removerEspacos);
confirmSenha.addEventListener("input", removerEspacos);

const erroNome = document.getElementById("erroNome");
("");
const erroCelular = document.getElementById("erroCelular");
const erroEmail = document.getElementById("erroEmail");
const erroSenha = document.getElementById("erroSenha");
const erroConfirmSenha = document.getElementById("erroConfirmSenha");
const erroTermos = document.getElementById("erroTermos");

const erroGeral = document.getElementById("erroGeral");

function mostrarErro(elemento, mensagem) {
  if (!elemento) return;
  elemento.innerText = mensagem;
  elemento.style.display = "block";
}
function esconderErro(elemento) {
  if (!elemento) return;
  elemento.style.display = "none";
}

function validarNome() {
  const valor = nomeCompleto.value.trim();
  if (/[^a-zA-ZÀ-ÿ\s]/.test(valor) || valor.length < 3) {
    mostrarErro(erroNome, "Nome inválido");
    return false;
  }
  esconderErro(erroNome);
  return true;
}

function validarCelular() {
  const numeros = celular.value.replace(/\D/g, "");
  if (numeros.length < 10 || numeros.length > 11) {
    mostrarErro(erroCelular, "Número inválido");
    return false;
  }
  esconderErro(erroCelular);
  return true;
}

function validarEmail() {
  const valor = email.value.trim();

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) {
    mostrarErro(erroEmail, "Email inválido.");
    return false;
  }
  esconderErro(erroEmail);
  return true;
}

function validarSenha() {
  const valor = senha.value;
  const senhaValida =
    /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&*(),.?":{}|<>])\S{7,}$/.test(valor);
  if (!senhaValida) {
    mostrarErro(
      erroSenha,
      "A senha deve ter pelo menos 7 caracteres, uma letra maiúscula, um número e um caractere especial.",
    );
    return false;
  }
  esconderErro(erroSenha);
  return true;
}

function validarConfirmSenha() {
  if (senha.value !== confirmSenha.value) {
    mostrarErro(erroConfirmSenha, "As senhas não coincidem.");
    return false;
  }
  esconderErro(erroConfirmSenha);
  return true;
}

function validarTermos() {
  if (!termos.checked) {
    mostrarErro(erroTermos, "Aceite os termos para se cadastrar.");
    return false;
  }
  esconderErro(erroTermos);
  return true;
}

nomeCompleto.addEventListener("input", validarNome);
celular.addEventListener("input", validarCelular);
email.addEventListener("input", validarEmail);
senha.addEventListener("input", () => {
  validarSenha();
  if (confirmSenha.value) validarConfirmSenha();
});
confirmSenha.addEventListener("input", validarConfirmSenha);
termos.addEventListener("change", validarTermos);

// Captura do formulário
const form = document.getElementById("cadastroForm");
const botaoSubmit = form.querySelector('button[type="submit"]');

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  esconderErro(erroGeral);

  const nomeOk = validarNome();
  const celularOk = validarCelular();
  const emailOk = validarEmail();
  const senhaOk = validarSenha();
  const confirmSenhaOk = validarConfirmSenha();
  const termosOk = validarTermos();

  if (
    !(nomeOk && celularOk && emailOk && senhaOk && confirmSenhaOk && termosOk)
  ) {
    return;
  }

  const newDados = {
    nomeCompleto: nomeCompleto.value.trim(),
    celular: celular.value.replace(/\D/g, ""),
    email: email.value.trim(),
    senha: senha.value,
  };

  // Evita duplo submit enquanto a requisição está em andamento
  if (botaoSubmit) botaoSubmit.disabled = true;

  try {
    const resposta = await fetch(`${API_URL}/usuario`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newDados),
    });

    // Lê o corpo com segurança, mesmo se não vier JSON válido (ex: erro 500 com HTML)
    let dados = {};
    try {
      dados = await resposta.json();
    } catch {
      dados = {};
    }

    if (!resposta.ok) {
      switch (dados.erro) {
        case "EMAIL_EXISTE":
          mostrarErro(erroEmail, dados.mensagem);
          break;

        case "CELULAR_EXISTE":
          mostrarErro(erroCelular, dados.mensagem);
          break;

        default:
          console.error(dados.erro || `Erro HTTP ${resposta.status}`);
          mostrarErro(
            erroGeral,
            dados.mensagem ||
              "Não foi possível concluir o cadastro. Tente novamente.",
          );
      }
      return;
    }

    window.location.href = "../../pages/login/index.html";
  } catch (erro) {
    console.error("Erro:", erro);
    mostrarErro(
      erroGeral,
      "Erro de conexão. Verifique sua internet e tente novamente.",
    );
  } finally {
    if (botaoSubmit) botaoSubmit.disabled = false;
  }
});
