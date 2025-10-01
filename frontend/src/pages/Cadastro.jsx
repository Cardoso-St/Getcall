import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../css/Login.css";

const Cadastro = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (response.ok) {
        setMensagem("✅ Conta criada com sucesso!");
        setTimeout(() => navigate("/"), 1500); // redireciona para login
      } else {
        setMensagem(`❌ ${data.error}`);
      }
    } catch (error) {
      setMensagem("❌ Erro ao conectar ao servidor.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <img src="/imagemDeFundinho.jpg" alt="Background" className="bg-image" />
      </div>

      <div className="login-right">
        <div className="login-box">
          <div className="login-logo">
            <img src="/Vector.svg" alt="GetCall Logo" />
            <h1>GetCall</h1>
          </div>

          <div className="login-card">
            <h2>Crie sua conta</h2>
            <p className="login-subtitle">Preencha os campos para se cadastrar</p>

            <form onSubmit={handleSubmit}>
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                placeholder="exemplo@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label htmlFor="password">Senha</label>
              <input
                type="password"
                id="password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />

              <button type="submit" className="btn-primary">Cadastrar</button>
            </form>
            {mensagem && (
              <p style={{ marginTop: "10px", color: mensagem.includes("✅") ? "green" : "red" }}>
                {mensagem}
              </p>
            )}
          </div>

          <div className="signup-card">
            <p>Já tem uma conta?</p>
            <button type="button" className="btn-secondary" onClick={() => navigate("/")}>
              Entrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
