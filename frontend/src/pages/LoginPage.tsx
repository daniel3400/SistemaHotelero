import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";
import { useAuth } from "../contexts/AuthContext";

export const LoginPage = () => {
  const { login: storeLogin } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = await login(username, password);
      storeLogin(result.token);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      const message = err instanceof Error ? err.message : "No se pudo iniciar sesion.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="login__panel">
        <div className="login__brand">
          <span className="brand__logo">SH</span>
          <div>
            <h1>Sistema Hotelero</h1>
            <p>Acceso seguro a operaciones</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="login__form">
          <label>
            Usuario
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="admin"
              autoComplete="username"
            />
          </label>
          <label>
            Contrasena
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="********"
              autoComplete="current-password"
            />
          </label>
          {error ? <p className="error">{error}</p> : null}
          <button className="primary" type="submit" disabled={loading}>
            {loading ? "Ingresando..." : "Iniciar sesion"}
          </button>
        </form>
        <div className="login__hint">
          <p>Solo ADMIN autorizado. Credenciales en la base de datos.</p>
        </div>
      </div>
      <div className="login__visual">
        <div className="login__glow"></div>
        <div className="login__card">
          <h2>Panel operativo</h2>
          <p>Habitaciones, estancias, pagos y aseo en un solo lugar.</p>
          <div className="login__stats">
            <div>
              <strong>24</strong>
              <span>Habitaciones</span>
            </div>
            <div>
              <strong>8</strong>
              <span>Estancias</span>
            </div>
            <div>
              <strong>3</strong>
              <span>Pendientes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
