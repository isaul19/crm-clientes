const camposOpcionales = ["notas"];

export const getFormErrors = async (data) => {
  let regex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );

  const campos = Object.keys(data);

  // Válidate fields
  const errors = [];
  campos.forEach((campo) => {
    if (camposOpcionales.includes(campo)) return;

    const campoValor = data[campo];
    if (campoValor.trim().length) return;

    errors.push("Todos los campos son obligatorios");
  });

  if (data.email && !regex.test(data.email)) {
    errors.push("El Email no es válido");
  }

  return errors;
};
