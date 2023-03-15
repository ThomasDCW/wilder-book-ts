import axios from "axios";
import { useState } from "react";

export default function AddWilder() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  return (
    <form
      className="form"
      onSubmit={(e) => {
        axios.post("http://localhost:8000/api/wilder", {
          name: name,
          city: city,
        });
      }}
    >
      <label>Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>City</label>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button type="submit">Add Wilder</button>
    </form>
  );
}
