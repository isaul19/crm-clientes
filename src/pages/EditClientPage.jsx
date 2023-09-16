import { Form, redirect, useActionData, useLoaderData, useNavigate } from "react-router-dom";
import { getClientById, updateClient } from "../utils/clientes";
import { BaseFormulary } from "../components/BaseFormulary";
import { getFormErrors } from "../utils/getFormErrors";
import { Error } from "../components/Error";

export const EditClientPage = () => {
  const navigate = useNavigate();
  const client = useLoaderData();
  const errors = useActionData();

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Editar cliente</h1>
      <p className="mt-3">A continuación podrás modificar los datos de un cliente</p>

      <div className="flex justify-end">
        <button
          className="bg-blue-800 text-white py-1 px-3 font-bold uppercase"
          onClick={() => navigate("/")}
        >
          &#60;- Volver
        </button>
      </div>

      <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">
        {errors?.map((error, key) => (
          <Error key={key}>{error}</Error>
        ))}

        <Form method="POST" noValidate>
          <BaseFormulary cliente={client} />

          <button
            className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg"
            type="submit"
          >
            Editar cliente
          </button>
        </Form>
      </div>
    </>
  );
};

export async function editClientLoader({ params }) {
  const clientId = params["clientId"];
  const client = await getClientById(clientId);
  return client;
}

export async function editClientAction({ request, params }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const clientId = params["clientId"];

  const errors = await getFormErrors(data);

  // length !== 0 => execute
  if (errors.length) {
    return errors;
  }

  await updateClient(data, clientId);
  return redirect("/");
}
