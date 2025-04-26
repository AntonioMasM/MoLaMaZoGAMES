import React from "react";
import styles from "./GroupSelector.module.css";

const GroupSelector = ({
  grupos = [],
  selectedGroup = "",
  onChange = () => {},
  error = "",
  inputRef = null,
}) => {
  const noGrupos = grupos.length === 0;

  return (
    <section className={styles.groupSelector}>
      <label htmlFor="grupo">
        Añadir Asset a Grupo
      </label>

      <select
        id="grupo"
        name="grupo"
        value={selectedGroup}
        onChange={onChange}
        ref={inputRef}
        disabled={noGrupos}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? "error-grupo" : undefined}
      >
        <option value="" disabled hidden>
          {noGrupos ? "No hay grupos disponibles" : "Selecciona un grupo"}
        </option>
        {!noGrupos &&
          grupos.map((grupo) => (
            <option key={grupo._id} value={grupo._id}>
              {grupo.nombre}
            </option>
          ))}
      </select>

      {error && (
        <p id="error-grupo" className={styles.errorMessage}>
          {error}
        </p>
      )}
    </section>
  );
};

export default GroupSelector;
