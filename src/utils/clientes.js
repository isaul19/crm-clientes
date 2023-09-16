import { redirect } from "react-router-dom";

const url = import.meta.env.VITE_API_URL;

export const getClientById = async (clientId) => {
  const response = await fetch(`${url}/clientes/${clientId}`);
  const cliente = await response.json();

  // if not found client return "{}""
  if (!Object.keys(cliente).length) {
    throw new Error("Client not found");
  }

  return cliente;
};

export const getClients = async () => {
  const response = await fetch(`${url}/clientes`);
  const clientes = await response.json();

  return clientes;
};

export const createClient = async (data) => {
  await fetch(`${url}/clientes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const updateClient = async (data, cliendId) => {
  if (!Object.keys(data).length || !cliendId) return;

  await fetch(`${url}/clientes/${cliendId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const destroyClient = async (cliendId) => {
  await fetch(`${url}/clientes/${cliendId}`, {
    method: "DELETE",
  });
};
