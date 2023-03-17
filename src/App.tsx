import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import AddWilder from "./components/AddWilder";
import Wilder, { WilderProps } from "./components/Wilder";
import AddSkillWithGrade from "./components/AddSkillWithGrade";
import AddSkill from "./components/AddSkill";

export interface SkillAPI {
  id: number;
  name: string;
}

interface GradeAPI {
  grade: number;
  skill: SkillAPI;
}

interface WilderAPI {
  id: number;
  city: string;
  name: string;
  grades: GradeAPI[];
}

function App() {
  const [update, setUpdate] = useState(new Date().getTime());
  const [wilders, setWilders] = useState<WilderProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const wildersAPI = await axios.get("http://localhost:8000/api/wilder");

      setWilders(
        wildersAPI.data.map((wilder: WilderAPI) => ({
          id: wilder.id,
          city: wilder.city,
          name: wilder.name,
          skills: wilder.grades.map((grade) => ({
            vote: grade.grade,
            title: grade.skill.name,
          })),
        }))
      );
    };
    fetchData();
  }, [update]);

  return (
    <div>
      <header>
        <div className="container">
          <h1>Wilders Book</h1>
        </div>
      </header>
      <main className="container">
        <h2>Wilders</h2>
        <div className="addform">
          {" "}
          <AddWilder setUpdate={setUpdate} />
          <AddSkill />
          <AddSkillWithGrade wilders={wilders} />
        </div>

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
