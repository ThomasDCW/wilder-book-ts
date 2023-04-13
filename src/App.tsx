import "./App.css";
import { useQuery, gql } from "@apollo/client";
import Wilder, { WilderProps } from "./components/Wilder";
import AddWilder from "./components/AddWilder";
import AddSkill from "./components/AddSkill";
import AddSkillWithGrade from "./components/AddSkillWithGrade";

// import AddSkillWithGrade from "./components/AddSkillWithGrade";
// import AddSkill from "./components/AddSkill";

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

export const GET_WILDERS = gql`
  query GetWilders {
    wilders {
      id
      name
      city
      grades {
        grade
        skill {
          name
        }
      }
    }
  }
`;

const formatWildersFromApi = (wilders: WilderAPI[]): WilderProps[] =>
  wilders.map((wilder) => {
    console.log(wilders);
    return {
      id: wilder.id,
      name: wilder.name,
      city: wilder.city,
      skills: wilder.grades.map((grade) => {
        return { vote: grade.grade, title: grade.skill.name };
      }),
    };
  });

function App() {
  const { loading, error, data } = useQuery(GET_WILDERS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  const wilders = formatWildersFromApi(data.wilders);

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
          <AddWilder />
          <AddSkill />
          <AddSkillWithGrade wilders={wilders} />
        </div>

        <section className="card-row">
          {wilders?.map((wilderData, key) => {
            console.log(wilders);
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
