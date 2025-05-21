export const buildQueryParamsFromFiltros = (query, tipo, filtros = {}, orden = "relevancia") => {
  const params = new URLSearchParams();

  if (query) params.set("q", query);
  if (tipo) params.set("tipo", tipo);
  if (orden) params.set("orden", orden);

  for (const [clave, valor] of Object.entries(filtros)) {
    if (Array.isArray(valor)) {
      valor.forEach((v) => params.append(clave, v));
    } else if (valor !== undefined && valor !== "") {
      params.set(clave, valor);
    }
  }

  return params;
};

export const parseFiltrosFromQueryParams = (searchParams) => {
  const filtros = {};
  for (const [key, value] of searchParams.entries()) {
    if (["q", "tipo", "orden"].includes(key)) continue; // no meter estos en filtros

    if (filtros[key]) {
      filtros[key] = Array.isArray(filtros[key])
        ? [...filtros[key], value]
        : [filtros[key], value];
    } else if (["categorias", "formatos", "software"].includes(key)) {
      filtros[key] = [value]; // multivalor
    } else {
      filtros[key] = value;
    }
  }

  return filtros;
};
