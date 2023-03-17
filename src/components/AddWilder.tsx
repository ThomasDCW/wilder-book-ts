import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

export default function AddWilder({
  setUpdate,
}: {
  setUpdate: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [name, setName] = useState<string>("");
  const [city, setCity] = useState<string>("");

  return (
    <form
      className="form"
      onSubmit={async (e) => {
        try {
          e.preventDefault();
          const result = await axios.post("http://localhost:8000/api/wilder", {
            name: name,
            city: city,
          });
          setUpdate(new Date().getTime());
          toast.success(
            `Le wilder ${result.data.name} de ${result.data.city} a était ajouté`
          );
          setName("");
          setCity("");
        } catch (error) {
          toast.error("Echec critique!");
          console.log(error);
        }
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
