import { Link } from "react-router-dom";
import styles from "./UserGroups.module.css";
import { FaUsers } from "react-icons/fa";

const UserGroups = ({ grupos = [] }) => {
  return (
    <section
      className={styles.container}
      aria-labelledby="grupos-title"
      role="region"
    >
      <h3 id="grupos-title" className="sr-only">Grupos del usuario</h3>

      {grupos.length > 0 ? (
        <ul className={styles.list} role="list">
          {grupos.map((grupo) => (
            <li key={grupo._id} className={styles.item}>
              <Link
                to={`/groups/${grupo._id}`}
                className={styles.link}
                aria-label={`Ir al grupo ${grupo.titulo}`}
              >
                <span className={styles.badge} aria-hidden="true">👥</span>
                <span className={styles.name}>{grupo.titulo}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.empty}>
          <FaUsers className={styles.emptyIcon} aria-hidden="true" />
          No perteneces a ningún grupo todavía.
        </p>
      )}
    </section>
  );
};

export default UserGroups;
