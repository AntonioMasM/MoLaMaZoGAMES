import UserCard from "../User/UserCard";
import styles from "./UserFollowing.module.css";

const UserFollowing = ({ usuarios = [] }) => {
  return (
    <section className={styles.followingBox} aria-labelledby="titulo-seguidores">
      <h3 id="titulo-seguidores" className={styles.sectionTitle}>
        Siguiendo
      </h3>

      {usuarios.length > 0 ? (
        <div className={styles.followingList}>
          {usuarios.map((usuario) => (
            <UserCard
              key={usuario._id}
              nickname={usuario.nickname}
              fotoPerfil={usuario.fotoPerfil}
            />
          ))}
        </div>
      ) : (
        <p className={styles.emptyText}>Aún no sigues a ningún usuario.</p>
      )}
    </section>
  );
};

export default UserFollowing;
