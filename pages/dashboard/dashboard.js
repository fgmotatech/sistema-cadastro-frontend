const API_URL = "https://sistema-cadastro-backend-9csb.onrender.com";

const botaoSair = document.getElementById("sair");
const botaoExcluir = document.getElementById("excluir");

function irParaLogin() {
  localStorage.removeItem("token");
  window.location.href = "../login/index.html";
}

async function carregarUsuario() {
  const token = localStorage.getItem("token");

  try {
    const resposta = await fetch(`${API_URL}/usuario/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      console.error(dados);
      return;
    }

    const { id, nome, celular, email } = dados.usuario;

    document.getElementById("nome").textContent = nome;
    document.getElementById("email").textContent = email;
    document.getElementById("celular").textContent = celular;
    document.getElementById("idUsuario").textContent = id;

    document.getElementById("nomeUsuario").textContent = nome;
    document.getElementById("emailUsuario").textContent = email;

    document.getElementById("avatar").textContent = nome
      .charAt(0)
      .toUpperCase();
  } catch (erro) {
    console.error("ERRO:", erro);
  }
}

botaoExcluir.addEventListener("click", async () => {
  const token = localStorage.getItem("token");

  try {
    // Busca o usuário
    const respostaUsuario = await fetch(`${API_URL}/usuario/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const dadosUsuario = await respostaUsuario.json();

    if (!respostaUsuario.ok) {
      console.error(dadosUsuario);
      return;
    }

    const emailUsuario = dadosUsuario.usuario.email;

    // SweetAlert
    const resultado = await Swal.fire({
      title: "Excluir conta?",
      html: `
              <p>Essa ação é permanente.</p>

              <p>
                Digite seu email para excluir:
              </p>

              <strong>${emailUsuario}</strong>
            `,

      input: "email",
      inputPlaceholder: "Digite seu email",

      icon: "warning",

      showCancelButton: true,

      confirmButtonText: "Excluir conta",
      cancelButtonText: "Cancelar",

      confirmButtonColor: "#d33",

      inputValidator: (valor) => {
        if (!valor) {
          return "Digite seu email.";
        }

        if (valor.trim() !== emailUsuario.trim()) {
          return "O email está incorreto.";
        }
      },
      didOpen: () => {
        const icone = document.querySelector(".swal2-icon.swal2-warning");
        icone.style.color = " #d33d";
        icone.style.borderColor = " #d33d";
      },
    });

    // Cancelou
    if (!resultado.isConfirmed) {
      return;
    }

    // DELETE
    const resposta = await fetch(`${API_URL}/usuario/me`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      Swal.fire({
        title: "Erro",
        text: dados.mensagem || "Não foi possível excluir a conta.",
        icon: "error",
      });

      return;
    }

    // Remove token
    localStorage.removeItem("token");

    // Sucesso
    await Swal.fire({
      title: "Conta excluída!",
      text: "Sua conta foi excluída com sucesso.",
      icon: "success",
      confirmButtonText: "Continuar",
    });

    // Login
    window.location.href = "../login/index.html";
  } catch (erro) {
    console.error("ERRO AO EXCLUIR:", erro);

    Swal.fire({
      title: "Erro",
      text: "Ocorreu um erro ao excluir sua conta.",
      icon: "error",
    });
  }
});

botaoSair.addEventListener("click", irParaLogin);

carregarUsuario();
