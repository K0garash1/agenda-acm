import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { backend_url } from "../../constans/constants";

const CreateCategory = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const [eventData, setEventData] = useState({
    name: "",
    color: "",
  });

  const handleChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${backend_url}/create/category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: user.token,
        },
        body: JSON.stringify(eventData),
      });

      if (response.ok) {
        navigate("/");
      } else {
        navigate("/");
      }
    } catch (error) {
      navigate("/");
    }
  };

  //Colores disponibles
  const colorOptions = [
    { name: "Rojo", value: "#FF0000" },
    { name: "Verde", value: "#00FF00" },
    { name: "Azul", value: "#0000FF" },
    { name: "Amarillo", value: "#FFFF00" },
    { name: "Morado", value: "#FF00FF" },
    { name: "Cian", value: "#00FFFF" },
  ];

  return (
    <>
      <h2>Crear Categoria</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            name="name"
            value={eventData.name}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Color:
          <select
            name="color"
            value={eventData.color}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Selecciona un color
            </option>
            {colorOptions.map((color, index) => (
              <option
                key={index}
                value={color.value}
                style={{ backgroundColor: color.value }}
              >
                {color.name}
              </option>
            ))}
          </select>
        </label>
        <br />

        <button type="submit">Crear Categoria</button>
      </form>
    </>
  );
};

export default CreateCategory;
