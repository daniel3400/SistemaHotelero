import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { logout } = useAuth();

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand__logo">SH</span>
          <div>
            <p className="brand__title">Sistema Hotelero</p>
            <p className="brand__subtitle">Operaciones en tiempo real</p>
          </div>
        </div>
        <nav className="nav">
          <NavLink to="/dashboard">Panel principal</NavLink>
          <NavLink to="/rooms">Habitaciones</NavLink>
          <NavLink to="/guests">Huespedes</NavLink>
          <NavLink to="/stays">Estancias</NavLink>
          <NavLink to="/payments">Pagos</NavLink>
          <NavLink to="/cleaning">Aseo diario</NavLink>
        </nav>
        <button className="ghost" onClick={logout}>
          Cerrar sesion
        </button>
      </aside>
      <div className="content">
        <header className="topbar">
          <div>
            <h1>Centro operativo</h1>
            <p>Gestion integral del hotel</p>
          </div>
          <div className="topbar__meta">
            <span className="pill">ADMIN</span>
          </div>
        </header>
        <main className="main">{children}</main>
      </div>
    </div>
  );
};
