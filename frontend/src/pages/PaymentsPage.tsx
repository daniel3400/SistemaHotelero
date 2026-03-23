import React, { useEffect, useState } from "react";
import { listPayments } from "../services/api";
import { useAuth } from "../contexts/AuthContext";

export const PaymentsPage = () => {
  const { token } = useAuth();
  const [payments, setPayments] = useState<Array<Record<string, unknown>>>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    listPayments(token)
      .then(setPayments)
      .catch((err) => setError(err instanceof Error ? err.message : "Error inesperado"));
  }, [token]);

  return (
    <section className="panel">
      <header className="panel__header">
        <div>
          <h2>Pagos</h2>
          <p>Control de ingresos y pendientes.</p>
        </div>
      </header>
      {error ? <p className="error">{error}</p> : null}
      <div className="table">
        <div className="table__row table__head">
          <span>Estancia</span>
          <span>Monto</span>
          <span>Metodo</span>
          <span>Estado</span>
        </div>
        {payments.length === 0 ? (
          <div className="table__row">
            <span>No hay pagos registrados.</span>
          </div>
        ) : (
          payments.map((payment) => (
            <div className="table__row" key={payment.id as string}>
              <span>{payment.stayId as string}</span>
              <span>{Number(payment.amount).toLocaleString("es-CO")}</span>
              <span>{payment.method as string}</span>
              <span>{payment.status as string}</span>
            </div>
          ))
        )}
      </div>
    </section>
  );
};
