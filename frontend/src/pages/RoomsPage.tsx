import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { listRooms } from "../services/api";
import { useAuth } from "../contexts/AuthContext";

export const RoomsPage = () => {
  const { token } = useAuth();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const status = params.get("status") ?? "";
  const [rooms, setRooms] = useState<Array<Record<string, unknown>>>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    listRooms(token, status || undefined)
      .then(setRooms)
      .catch((err) => setError(err instanceof Error ? err.message : "Error inesperado"));
  }, [token, status]);

  return (
    <section className="panel">
      <header className="panel__header">
        <div>
          <h2>Habitaciones</h2>
          <p>Filtra por estado y monitorea capacidad.</p>
        </div>
        <div className="filters">
          <span className="pill">{status || "TODAS"}</span>
        </div>
      </header>
      {error ? <p className="error">{error}</p> : null}
      <div className="table">
        <div className="table__row table__head">
          <span>Numero</span>
          <span>Estado</span>
          <span>Max. huespedes</span>
          <span>Aseo</span>
        </div>
        {rooms.length === 0 ? (
          <div className="table__row">
            <span>No hay habitaciones para mostrar.</span>
          </div>
        ) : (
          rooms.map((room) => (
            <div className="table__row" key={room.id as string}>
              <span>{room.roomNumber as string}</span>
              <span>{room.status as string}</span>
              <span>{room.maxGuests as number}</span>
              <span>{room.dailyCleaningRequested ? "Solicitado" : "No"}</span>
            </div>
          ))
        )}
      </div>
    </section>
  );
};
