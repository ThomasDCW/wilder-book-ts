import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import AddWilder from "./components/AddWilder";
import Wilder, { WilderProps } from "./components/Wilder";

function App() {
  const [wilders, setWilders] = useState<WilderProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const wilders = await axios.get("http://localhost:8000/api/wilder");
      setWilders(
        wilders.data.map((wilder: any) => ({
          id: wilder.id,
          name: wilder.name,
          skills: wilder.grades.map((grade: any) => ({
            vote: grade.grade,
            title: grade.skill.name,
          })),
        }))
      );
    };
    fetchData();
  }, []);
  console.log(wilders);

  return (
    <div>
      <header>
        <div className="container">
          <h1>Wilders Book</h1>
        </div>
      </header>
      <main className="container">
        <h2>Wilders</h2>
        <AddWilder />
        {/* <AddSkill names={wilders} /> */}
        <section className="card-row">
          {wilders?.map((wilderData, key) => {
            return (
              <Wilder
                key={key}
                id={wilderData.id}
                name={wilderData.name}
                skills={wilderData.skills}
                city={wilderData.city}
              />
            );
          })}
        </section>
      </main>
      <footer>
        <div className="container">
          <p>&copy; 2022 Wild Code School</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
