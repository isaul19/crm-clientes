import { Form, useActionData, useNavigate, redirect } from "react-router-dom";
import { BaseFormulary } from "../components/BaseFormulary";
import { Error } from "../components/Error";
import { createClient } from "../utils/clientes";
import { getFormErrors } from "../utils/getFormErrors";

export const NewClientPage = () => {
  const navigate = useNavigate();
  const errors = useActionData();

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Nuevo cliente</h1>
      <p className="mt-3">Llena todos los campos para registrar un nuevo cliente</p>

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
          <BaseFormulary />

          <button
            className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg"
            type="submit"
          >
            Registrar cliente
          </button>
        </Form>
      </div>
    </>
  );
};

export const newClientPageLoader = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const errors = await getFormErrors(data);

  // length !== 0 => execute
  if (errors.length) {
    return errors;
  }

  await createClient(data);

  return redirect("/");
};
