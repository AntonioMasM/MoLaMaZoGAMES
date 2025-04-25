import styles from "./UserGroups.module.css";
import { FaUsers } from "react-icons/fa";

const UserGroups = ({ grupos = [] }) => (
  <div className={styles.groupsBox} aria-labelledby="grupos-title">
    <h3 id="grupos-title" className={styles.sectionTitle}>
      <FaUsers className={styles.icon} /> Grupos de Trabajo
    </h3>

    {grupos.length > 0 ? (
      <ul className={styles.groupList}>
        {grupos.map((grupo, idx) => (
          <li key={idx} className={styles.groupItem}>
            <span className={styles.groupIcon}>👥</span> {grupo}
          </li>
        ))}
      </ul>
    ) : (
      <p className={styles.emptyText}>No estás en ningún grupo actualmente.</p>
    )}
  </div>
);

export default UserGroups;
