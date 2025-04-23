// UserInfo2.jsx
import React from "react";
import {
  FaBookmark,
  FaMapMarkerAlt,
  FaEnvelope,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaUsers
} from "react-icons/fa";
import "../styles/UserInfo2.css";

const UserInfo = ({ user }) => {
  if (!user) {
    return <div>No se han encontrado datos del usuario.</div>;
  }
  
  const {
    nombre,
    nickname,
    fotoPerfil,
    seguidores = [],
    siguiendo = [],
    assetsPublicados = 0,
    tituloProfesional = "",
    pais = "",
    email = "",
    instagram,
    twitter,
    linkedin,
    grupos = [],
    software = [],
    skills = [],
    intereses = []
  } = user;

  return (
    <div className="user-info2">
      {/* CABECERA */}
      <div className="user-header-top">
        <div className="avatar-container">
          <img
            src={fotoPerfil || "/assets/users/default-avatar.png"}
            alt={nombre}
            className="avatar-img-large"
          />
        </div>
        <div className="user-header-details">
          <div className="name-follow">
            <h1 className="user-fullname">{nombre || nickname}</h1>
            <button className="btn-follow">Seguir</button>
          </div>
          <div className="user-metrics">
            <div><strong>{seguidores.length}</strong> Seguidores</div>
            <div><strong>{siguiendo.length}</strong> Seguidos</div>
            <div><strong>{assetsPublicados}</strong> Publicados</div>
          </div>
          <p className="user-bio">{tituloProfesional}</p>
        </div>
      </div>

      {/* CONTENIDO DETALLADO */}
      <div className="user-info-content">
        {/* Columna Izquierda */}
        <div className="user-info-left">
          <section>
            <h3>Info del Usuario</h3>
            <ul className="info-list">
              <li><FaBookmark className="icon" /> {tituloProfesional}</li>
              <li><FaMapMarkerAlt className="icon" /> {pais}</li>
              <li><FaEnvelope className="icon" /> {email}</li>
            </ul>
          </section>

          <section>
            <h3>Redes Sociales</h3>
            <div className="social-list">
              {instagram && <a href={instagram}><FaInstagram /></a>}
              {twitter   && <a href={twitter}><FaTwitter   /></a>}
              {linkedin  && <a href={linkedin}><FaLinkedin  /></a>}
            </div>
          </section>

          <button className="btn-message">Enviar Mensaje</button>
        </div>

        <div className="user-info-divider" />

        {/* Columna Derecha */}
        <div className="user-info-right">
          <section>
            <h3>Grupos de Trabajo</h3>
            <ul className="group-list">
              {grupos.map(g => (
                <li key={g._id} className="group-item">
                  <FaUsers className="icon" /> {g.nombre}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3>Software</h3>
            <div className="tag-list">
              {software.map(s => <span key={s} className="tag">{s}</span>)}
            </div>
          </section>

          <section>
            <h3>Skills</h3>
            <div className="tag-list">
              {skills.map(s => <span key={s} className="tag">{s}</span>)}
            </div>
          </section>

          <section>
            <h3>Intereses</h3>
            <div className="tag-list">
              {intereses.map(i => <span key={i} className="tag">{i}</span>)}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
