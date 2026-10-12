"use client";

import { useCallback, useState } from "react";

type Order = {
  id: string;
  created: number;
  total: number;
  currency: string | null;
  email: string | null;
  name: string | null;
  shipping: { line1?: string | null; postal_code?: string | null; city?: string | null } | null;
  cancelled: boolean;
  items: { name: string | null; quantity: number | null; amount: number }[];
};

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState("");

  const load = useCallback(async (pw: string) => {
    setError("");
    const response = await fetch("/api/admin/orders", { headers: { "x-admin-password": pw } });
    const data = await response.json();

    if (!response.ok) {
      setOrders(null);
      setError(data.error ?? "Fehler");
      return;
    }

    setOrders(data.orders);
  }, []);

  async function cancel(id: string) {
    if (!window.confirm("Bestellung stornieren und Betrag erstatten?")) {
      return;
    }

    setBusyId(id);
    const response = await fetch(`/api/admin/orders/${id}/cancel`, {
      method: "POST",
      headers: { "x-admin-password": password },
    });
    const data = await response.json();

    if (!response.ok) {
      setError(data.error ?? "Fehler");
    }

    setBusyId("");
    await load(password);
  }

  if (!orders) {
    return (
      <main className="mx-auto max-w-sm px-4 py-16">
        <h1 className="mb-4 text-2xl font-bold">Admin</h1>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            void load(password);
          }}
          className="space-y-3"
        >
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Admin-Passwort"
            className="w-full rounded border px-3 py-2"
          />
          <button className="w-full rounded bg-black px-3 py-2 text-white">Anmelden</button>
          {error && <p className="text-sm text-red-600">{error}</p>}
        </form>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Bestellungen ({orders.length})</h1>
        <button onClick={() => void load(password)} className="rounded border px-3 py-1 text-sm">
          Aktualisieren
        </button>
      </div>
      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
      <div className="space-y-4">
        {orders.map((order) => (
          <section key={order.id} className="rounded border p-4">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div className="text-sm">
                <p className="font-semibold">{order.name ?? "—"} · {order.email ?? "—"}</p>
                <p className="text-gray-500">{new Date(order.created * 1000).toLocaleString("de-DE")}</p>
                {order.shipping && (
                  <p className="text-gray-500">
                    {order.shipping.line1}, {order.shipping.postal_code} {order.shipping.city}
                  </p>
                )}
              </div>
              <div className="text-right">
                <p className="font-semibold">{order.total.toFixed(2)} {order.currency?.toUpperCase()}</p>
                {order.cancelled ? (
                  <span className="text-sm font-medium text-red-600">Storniert</span>
                ) : (
                  <button
                    disabled={busyId === order.id}
                    onClick={() => void cancel(order.id)}
                    className="mt-1 rounded bg-red-600 px-3 py-1 text-sm text-white disabled:opacity-50"
                  >
                    {busyId === order.id ? "…" : "Stornieren"}
                  </button>
                )}
              </div>
            </div>
            <ul className="mt-3 divide-y text-sm">
              {order.items.map((item, index) => (
                <li key={index} className="flex justify-between py-1">
                  <span>{item.quantity}× {item.name}</span>
                  <span>{item.amount.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
        {orders.length === 0 && <p className="text-gray-500">Keine Bestellungen.</p>}
      </div>
    </main>
  );
}
