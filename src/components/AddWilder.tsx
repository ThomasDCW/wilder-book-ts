import axios from "axios";
import { useState } from "react";

export default function AddWilder() {
  const [name, setName] = useState<string>("");
  const [city, setCity] = useState<string>("");
  return (
    <form
      className="form"
      onSubmit={() => {
        axios.post("http://localhost:8000/api/wilder", {
          name: name,
          city: city,
        });
      }}
    >
      <label>Name</label>
      <input
        placeholder="toto, tata, tutu..."
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>City</label>
      <input
        placeholder="Lille, Paris, Lyon..."
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button type="submit">Add Wilder</button>
    </form>
  );
}
