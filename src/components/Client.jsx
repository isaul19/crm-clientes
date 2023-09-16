import { Form, redirect, useNavigate } from "react-router-dom";
import { destroyClient } from "../utils/clientes";

export const Client = ({ nombre, empresa, email, telefono, id }) => {
  const navigate = useNavigate();

  const onEdit = () => {
    navigate(`/clients/edit/${id}`);
  };

  return (
    <tr className="border-b">
      <td className="p-6 pl-[5%]">
        <p className="text-2xl text-gray-800">{nombre}</p>
        <p className="mt-2 font-bold">{empresa}</p>
      </td>

      <td className="p-6 pl-[8%]">
        <div>
          <p>
            <span className="text-gray-800 uppercase font-bold mr-3">Email:</span>
            {email}
          </p>
          <p>
            <span className="text-gray-800 uppercase font-bold mr-3">Tel:</span>
            {telefono}
          </p>
        </div>
      </td>

      <td className="p-6 flex justify-center items-center space-x-4">
        <button
          className="text-blue-600 hover:text-blue-800 uppercase font-bold text-xs"
          type="button"
          onClick={onEdit}
        >
          Editar
        </button>

        <Form
          method="POST"
          action={`/clients/destroy/${id}/`}
          onSubmit={(e) => {
            // Si confirma previene el comportamiento
            if (!confirm("deseas eliminar ese cliente?")) {
              e.preventDefault();
            }
            // ejecuta el action
          }}
        >
          <button
            className="text-red-600 hover:text-red-800 uppercase font-bold text-xs"
            type="submit"
          >
            Eliminar
          </button>
        </Form>
      </td>
    </tr>
  );
};

export const clientActionDestroy = async ({ params }) => {
  console.log(params);
  const clientId = params["clientId"];
  console.log(clientId);
  await destroyClient(clientId);
  return redirect("/");
};
