import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDashboardSummary } from "../services/api";
import { useAuth } from "../contexts/AuthContext";

interface SummaryData {
  roomsAvailable: number;
  roomsCleaningPending: number;
  roomsOccupied: number;
  activeStays: number;
  pendingPayments: number;
}

export const DashboardPage = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [summary, setSummary] = useState<SummaryData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    getDashboardSummary(token)
      .then(setSummary)
      .catch((err) => setError(err instanceof Error ? err.message : "Error inesperado"));
  }, [token]);

  return (
    <section className="panel">
      <header className="panel__header">
        <div>
          <h2>Panel operativo</h2>
          <p>Indicadores claves del hotel</p>
        </div>
      </header>
      {error ? <p className="error">{error}</p> : null}
      <div className="stats-grid">
        <button className="stat-card green" onClick={() => navigate("/rooms?status=AVAILABLE")}>
          <span>Habitaciones disponibles</span>
          <strong>{summary?.roomsAvailable ?? "--"}</strong>
        </button>
        <button className="stat-card amber" onClick={() => navigate("/cleaning")}>
          <span>Habitaciones pendientes de aseo</span>
          <strong>{summary?.roomsCleaningPending ?? "--"}</strong>
        </button>
        <button className="stat-card red" onClick={() => navigate("/rooms?status=OCCUPIED")}>
          <span>Habitaciones ocupadas</span>
          <strong>{summary?.roomsOccupied ?? "--"}</strong>
        </button>
        <button className="stat-card blue" onClick={() => navigate("/stays")}>
          <span>Estancias activas</span>
          <strong>{summary?.activeStays ?? "--"}</strong>
        </button>
        <button className="stat-card purple" onClick={() => navigate("/payments") }>
          <span>Pagos pendientes</span>
          <strong>{summary?.pendingPayments ?? "--"}</strong>
        </button>
      </div>
      <div className="panel__grid">
        <div className="panel__card">
          <h3>Agenda inmediata</h3>
          <p>Revisa las salidas de hoy, solicitudes de aseo y pagos en mora.</p>
          <button className="ghost" onClick={() => navigate("/stays")}>Ver estancias</button>
        </div>
        <div className="panel__card">
          <h3>Flujo de caja</h3>
          <p>Controla los pagos pendientes y actualiza estados.</p>
          <button className="ghost" onClick={() => navigate("/payments")}>Ir a pagos</button>
        </div>
      </div>
    </section>
  );
};
