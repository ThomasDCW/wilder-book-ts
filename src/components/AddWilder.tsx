import { useState } from "react";
import { toast } from "react-toastify";
import { gql, useMutation } from "@apollo/client";
import { GET_WILDERS } from "../App";

const CREATE_WILDER = gql`
  mutation CreateWilder($name: String!, $city: String!) {
    createWilder(name: $name, city: $city) {
      name
      city
    }
  }
`;

export default function AddWilder() {
  const [CreateWilder, { loading, error }] = useMutation(CREATE_WILDER);

  const [name, setName] = useState<string>("");
  const [city, setCity] = useState<string>("");

  if (loading) return <p>"Submitting..."</p>;
  if (error) return <p>Submission error!</p>;

  return (
    <form
      className="form"
      onSubmit={async (e) => {
        try {
          e.preventDefault();
          CreateWilder({
            variables: { name: name, city: city },
            refetchQueries: [GET_WILDERS],
          });
          toast.success(`Le wilder ${name} de ${city} a était ajouté`);
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
