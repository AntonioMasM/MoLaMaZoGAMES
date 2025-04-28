import { useState, useEffect, useRef } from "react";
import { useUser } from "@/context/UserContext";
import { getUsuarioPorEmail } from "@/services/usuarios";
import { useComentarios } from "@/hooks/useComentarios";
import ComentarioItem from "./ComentarioItem"; // ✅ Nuevo componente
import styles from "./AssetComments.module.css";

const AssetComments = ({ assetId }) => {
  const { user: contextUser } = useUser();
  const email = contextUser?.email;

  const [userData, setUserData] = useState(null);
  const [nuevoComentario, setNuevoComentario] = useState("");
  const textareaRef = useRef(null);
  const comentariosEndRef = useRef(null);

  const { comentarios, añadirComentario, cargarComentarios } = useComentarios(assetId);

  useEffect(() => {
    const cargarDatosUsuario = async () => {
      if (!email) return;
      try {
        const usuario = await getUsuarioPorEmail(email);
        setUserData(usuario);
      } catch (error) {
        console.error("Error al cargar datos del usuario:", error);
      }
    };

    cargarDatosUsuario();
  }, [email]);

  const manejarEnvio = async (e) => {
    e.preventDefault();
    if (nuevoComentario.trim() === "" || !userData) return;

    try {
      await añadirComentario(nuevoComentario.trim());
      setNuevoComentario("");
      await cargarComentarios();

      if (textareaRef.current) {
        textareaRef.current.classList.add(styles.vibrate);
        setTimeout(() => {
          textareaRef.current.classList.remove(styles.vibrate);
        }, 300);
        textareaRef.current.focus();
      }

      if (comentariosEndRef.current) {
        comentariosEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    } catch (error) {
      console.error("Error al publicar el comentario:", error);
    }
  };

  return (
    <section className={styles.commentsSection} aria-labelledby="comments-title" role="region">
      <h2 id="comments-title" className={styles.sectionTitle}>Comentarios</h2>

      <form onSubmit={manejarEnvio} className={styles.commentForm} aria-label="Formulario de comentarios">
        <textarea
          ref={textareaRef}
          className={styles.textarea}
          placeholder="Escribe un comentario..."
          value={nuevoComentario}
          onChange={(e) => setNuevoComentario(e.target.value)}
          aria-label="Área de texto para nuevo comentario"
          rows="4"
          disabled={!userData}
        />
        <button
          type="submit"
          className={styles.submitButton}
          disabled={nuevoComentario.trim() === "" || !userData}
        >
          Publicar
        </button>
      </form>

      <div className={styles.commentList} role="list">
        {comentarios.length === 0 ? (
          <p className={styles.noComments}>No hay comentarios aún.</p>
        ) : (
          comentarios.map((comentario, index) => (
            <ComentarioItem
              key={comentario._id}
              comentario={comentario}
              refProp={index === 0 ? comentariosEndRef : null}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default AssetComments;
