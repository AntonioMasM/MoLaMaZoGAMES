import React from "react";
import styles from "./GroupSelector.module.css";

const GroupSelector = ({
  grupos = [],
  selectedGroup = "",
  onChange = () => {},
  error = "",
  inputRef = null,
}) => {
  const noGrupos = !grupos || grupos.length === 0;

  return (
    <section className={styles.groupSelector}>
      <label htmlFor="grupo" className={styles.label}>
        Añadir Asset a Grupo
      </label>

      <select
        id="grupo"
        name="grupo"
        value={selectedGroup}
        onChange={onChange}
        ref={inputRef}
        disabled={noGrupos}
        aria-invalid={!!error}
        aria-describedby={error ? "error-grupo" : undefined}
        className={styles.select}
      >
        <option value="" disabled hidden>
          {noGrupos ? "No hay grupos disponibles" : "Selecciona un grupo"}
        </option>

        {grupos.map((grupo) => (
          <option key={grupo._id} value={grupo._id}>
            {grupo.titulo}
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
