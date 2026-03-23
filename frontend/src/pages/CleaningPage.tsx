import React, { useEffect, useState } from "react";
import { listRooms } from "../services/api";
import { useAuth } from "../contexts/AuthContext";

export const CleaningPage = () => {
  const { token } = useAuth();
  const [rooms, setRooms] = useState<Array<Record<string, unknown>>>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    listRooms(token, "CLEANING_PENDING")
      .then(setRooms)
      .catch((err) => setError(err instanceof Error ? err.message : "Error inesperado"));
  }, [token]);

  return (
    <section className="panel">
      <header className="panel__header">
        <div>
          <h2>Gestion de aseo diario</h2>
          <p>Habitaciones con solicitud pendiente.</p>
        </div>
      </header>
      {error ? <p className="error">{error}</p> : null}
      <div className="table" style={{ "--table-cols": "repeat(3, minmax(140px, 1fr))" } as React.CSSProperties}>
        <div className="table__row table__head">
          <span>Numero</span>
          <span>Estado</span>
          <span>Max. huespedes</span>
        </div>
        {rooms.length === 0 ? (
          <div className="table__row">
            <span>No hay solicitudes pendientes.</span>
          </div>
        ) : (
          rooms.map((room) => (
            <div className="table__row" key={room.id as string}>
              <span>{room.roomNumber as string}</span>
              <span>{room.status as string}</span>
              <span>{room.maxGuests as number}</span>
            </div>
          ))
        )}
      </div>
    </section>
  );
};
