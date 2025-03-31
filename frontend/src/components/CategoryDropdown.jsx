import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/CategoryDropdown.css";

const CategoryDropdown = () => {
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/categorias");
        setCategories(res.data);
      } catch (error) {
        console.error("Error al obtener categorías", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div
      className="category-dropdown"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="dropdown-button">Categorías</button>
      {isOpen && (
        <div className="dropdown-panel">
          <span className="dropdown-title">Seleccionar categoría:</span>
          <ul>
            {categories.map((cat) => (
              <li key={cat._id}>{cat.nombre}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;
