import { useNavigate } from "react-router-dom";
import "../css/Login.css";
import imagemDeFundinho from "../../public/imagemDeFundinho.jpg";
const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: validar login
    navigate("/app/chamados");
  };

  return (
    <div className="login-page">
      {/* Lado esquerdo com fundo */}
      <div className="login-left">
        <img src={imagemDeFundinho} alt="Background" className="bg-image" />
      </div>

      {/* Lado direito com formulário */}
      <div className="login-right">
        <div className="login-box">
          {/* Logo */}
          <div className="login-logo">
            <img src="/Vector.svg" alt="GetCall Logo" />
            <h1>GetCall</h1>
          </div>

          {/* Card de login */}
          <div className="login-card">
            <h2>Acesse o portal</h2>
            <p className="login-subtitle">
              Entre usando seu e-mail e senha cadastrados
            </p>

            <form onSubmit={handleSubmit}>
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                placeholder="exemplo@mail.com"
                required
              />

              <label htmlFor="password">Senha</label>
              <input
                type="password"
                id="password"
                placeholder="Digite sua senha"
                required
              />

              <button type="submit" className="btn-primary">
                Entrar
              </button>
            </form>
          </div>

          {/* Card de cadastro */}
          <div className="signup-card">
            <p>Ainda não tem uma conta?</p>
            <button type="button" className="btn-secondary">
              Criar conta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
