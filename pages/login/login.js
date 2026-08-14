const API_URL =
  "https://sistema-cadastro-backend-9csb.onrender.com" ;

const senha = document.getElementById("senha");
const email = document.getElementById("email");
const formLogin = document.getElementById("loginForm");
const senhaToggle = document.getElementById("toggleSenha");
const senhaIcon = document.getElementById("senhaIcon");
const mula = document.getElementById("mula");
const erroGeral = document.getElementById("erroGeral");
const erroEmail = document.getElementById("erroEmail");
const erroSenha = document.getElementById("erroSenha");

function mostrarErro(elemento, mensagem) {
  if (!elemento) return;
  elemento.innerText = mensagem;
  elemento.style.display = "block";
}

function esconderErro(elemento) {
  if (!elemento) return;
  elemento.style.display = "none";
}

mula.addEventListener("click", () =>
  alert("Vc é uma mula ou só finge, acabou de criar"),
);

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

function validarEmail() {
  if (email.value.trim().length === 0) {
    mostrarErro(erroEmail, "Digite um e-mail");
    return false;
  }
  esconderErro(erroEmail);
  return true;
}
function validarSenha() {
  if (senha.value.length === 0) {
    mostrarErro(erroSenha, "Digite uma senha");
    return false;
  }
  esconderErro(erroSenha);
  return true;
}
email.addEventListener("input", validarEmail);
senha.addEventListener("input", validarSenha);

formLogin.addEventListener("submit", async (e) => {
  e.preventDefault();

  const usuario = {
    email: email.value.trim(),
    senha: senha.value,
  };

  esconderErro(erroEmail);
  esconderErro(erroSenha);
  esconderErro(erroGeral);

  const emailOk = validarEmail();
  const senhaOk = validarSenha();

  if (!(emailOk && senhaOk)) {
    return;
  }

  try {
    const resposta = await fetch(`${API_URL}/login`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(usuario),
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      switch (dados.erro) {
        case "MUITAS_TENTATIVAS":
          mostrarErro(erroGeral, dados.mensagem);
          break;
        case "DADOS_INVALIDOS":
          mostrarErro(erroGeral, dados.mensagem);
          break;
        case "LOGIN_INVALIDO":
          mostrarErro(erroGeral, dados.mensagem);
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

    localStorage.setItem("token", dados.token);

    window.location.href = "../../pages/dashboard/index.html";
  } catch (erro) {
    console.error("Erro:", erro);
  }
});
