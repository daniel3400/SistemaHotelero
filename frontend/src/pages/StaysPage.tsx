import React, { useEffect, useState } from "react";
import { listActiveStays } from "../services/api";
import { useAuth } from "../contexts/AuthContext";

export const StaysPage = () => {
  const { token } = useAuth();
  const [stays, setStays] = useState<Array<Record<string, unknown>>>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    listActiveStays(token)
      .then(setStays)
      .catch((err) => setError(err instanceof Error ? err.message : "Error inesperado"));
  }, [token]);

  return (
    <section className="panel">
      <header className="panel__header">
        <div>
          <h2>Estancias activas</h2>
          <p>Seguimiento de check-in y check-out.</p>
        </div>
      </header>
      {error ? <p className="error">{error}</p> : null}
      <div className="table" style={{ "--table-cols": "repeat(5, minmax(140px, 1fr))" } as React.CSSProperties}>
        <div className="table__row table__head">
          <span>Habitacion</span>
          <span>Huesped</span>
          <span>Ingreso</span>
          <span>Salida</span>
          <span>Estado</span>
        </div>
        {stays.length === 0 ? (
          <div className="table__row">
            <span>No hay estancias activas.</span>
          </div>
        ) : (
          stays.map((stay) => (
            <div className="table__row" key={stay.id as string}>
              <span>{stay.roomId as string}</span>
              <span>{stay.guestId as string}</span>
              <span>{new Date(stay.checkInDate as string).toLocaleDateString()}</span>
              <span>{new Date(stay.expectedCheckOutDate as string).toLocaleDateString()}</span>
              <span>{stay.status as string}</span>
            </div>
          ))
        )}
      </div>
    </section>
  );
};
