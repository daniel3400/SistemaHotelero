import React, { useEffect, useState } from "react";
import { listGuests } from "../services/api";
import { useAuth } from "../contexts/AuthContext";

export const GuestsPage = () => {
  const { token } = useAuth();
  const [guests, setGuests] = useState<Array<Record<string, unknown>>>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    listGuests(token)
      .then(setGuests)
      .catch((err) => setError(err instanceof Error ? err.message : "Error inesperado"));
  }, [token]);

  return (
    <section className="panel">
      <header className="panel__header">
        <div>
          <h2>Huespedes</h2>
          <p>Registro de clientes activos y frecuentes.</p>
        </div>
      </header>
      {error ? <p className="error">{error}</p> : null}
      <div className="table" style={{ "--table-cols": "repeat(3, minmax(160px, 1fr))" } as React.CSSProperties}>
        <div className="table__row table__head">
          <span>Nombre</span>
          <span>Documento</span>
          <span>Telefono</span>
        </div>
        {guests.length === 0 ? (
          <div className="table__row">
            <span>No hay huespedes registrados.</span>
          </div>
        ) : (
          guests.map((guest) => (
            <div className="table__row" key={guest.id as string}>
              <span>{guest.fullName as string}</span>
              <span>{guest.documentNumber as string}</span>
              <span>{guest.phone as string}</span>
            </div>
          ))
        )}
      </div>
    </section>
  );
};
