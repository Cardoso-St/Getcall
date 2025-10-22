import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../css/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const context = useContext(AuthContext);

  // Verificação para evitar erro de contexto indefinido
  if (!context) {
    console.error("AuthContext não está disponível. Verifique se o Login está dentro de AuthProvider.");
    return <div>Erro: Contexto de autenticação não encontrado.</div>;
  }

  const { login } = context;
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await login(email, senha);
      if (result?.success) {
        setMensagem("✅ Login realizado com sucesso!");
        setTimeout(() => navigate("/app/chamados"), 1000);
      } else {
        setMensagem(`❌ ${result?.error || "Erro ao realizar login."}`);
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
            <h2>Acesse o portal</h2>
            <p className="login-subtitle">Entre usando seu e-mail e senha cadastrados</p>

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

              <button type="submit" className="btn-primary">Entrar</button>
            </form>
            {mensagem && (
              <p style={{ marginTop: "10px", color: mensagem.includes("✅") ? "green" : "red" }}>
                {mensagem}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;