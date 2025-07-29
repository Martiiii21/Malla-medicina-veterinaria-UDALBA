const data = [
  {
    year: "Primer Año",
    semesters: [
      {
        name: "1° Semestre",
        subjects: [
          { name: "Química general", unlocks: ["Química orgánica y bioquímica"] },
          { name: "Biología", unlocks: ["Histología y embriología"] },
          { name: "Zoología", unlocks: ["Ecología"] },
          { name: "Introducción a la medicina veterinaria" },
          { name: "Tecnología e innovación" },
          { name: "Práctica I", unlocks: ["Práctica II"] },
        ]
      },
      {
        name: "2° Semestre",
        subjects: [
          { name: "Química orgánica y bioquímica" },
          { name: "Histología y embriología", unlocks: ["Fisiología veterinaria", "Anatomía I"] },
          { name: "Estadística" },
          { name: "Ecología", unlocks: ["Gestión ambiental y conservación"] },
          { name: "Inglés básico" },
          { name: "Práctica II", unlocks: ["Práctica III"] }
        ]
      }
    ]
  },
  {
    year: "Segundo Año",
    semesters: [
      {
        name: "3° Semestre",
        subjects: [
          { name: "Anatomía I", unlocks: ["Anatomía II"] },
          { name: "Fisiología veterinaria", unlocks: ["Interacción hospedero patógeno", "Fisiología especial"] },
          { name: "Etología y bienestar animal", unlocks: ["Módulo integrador ciclo inicial"] },
          { name: "Gestión ambiental y conservación", unlocks: ["Módulo integrador ciclo inicial"] },
          { name: "Práctica III", unlocks: ["Módulo integrador ciclo inicial"] }
        ]
      },
      {
        name: "4° Semestre",
        subjects: [
          { name: "Anatomía II" },
          { name: "Fisiología especial", unlocks: ["Alimentación y nutrición animal", "Patología funcional", "Hematología y laboratorio clínico"] },
          { name: "Interacción hospedero patógeno", unlocks: ["Inspección y control de alimentos", "Epidemiología"] },
          { name: "Módulo integrador ciclo inicial", unlocks: ["Práctica IV"] },
          { name: "Principios éticos veterinarios" },
          { name: "Genética pecuaria" }
        ]
      }
    ]
  },
  {
    year: "Tercer Año",
    semesters: [
      {
        name: "5° Semestre",
        subjects: [
          { name: "Alimentación y nutrición animal", unlocks: ["Producción animal I"] },
          { name: "Patología funcional", unlocks: ["Patología especial"] },
          { name: "Inspección y control de alimentos" },
          { name: "Epidemiología", unlocks: ["Salud pública"] },
          { name: "Desarrollo sostenible" },
          { name: "Práctica IV", unlocks: ["Práctica V"] }
        ]
      },
      {
        name: "6° Semestre",
        subjects: [
          { name: "Farmacología y terapéutica", unlocks: ["Cirugía General"] },
          { name: "Semiología", unlocks: ["Ginecología y obstetricia"] },
          { name: "Hematología y laboratorio clínico" },
          { name: "Patología especial", unlocks: ["Enfermedades infecciosas y parasitarias"] },
          { name: "Inglés técnico" },
          { name: "Práctica V", unlocks: ["Práctica VI"] }
        ]
      }
    ]
  },
  {
    year: "Cuarto Año",
    semesters: [
      {
        name: "7° Semestre",
        subjects: [
          { name: "Producción animal I", unlocks: ["Producción animal II", "Módulo integrador ciclo intermedio"] },
          { name: "Enfermedades infecciosas y parasitarias", unlocks: ["Medicina interna"] },
          { name: "Ginecología y obstetricia" },
          { name: "Metodología de la investigación" },
          { name: "Responsabilidad social y emprendimiento" },
          { name: "Práctica VI", unlocks: ["Módulo integrador ciclo intermedio"] }
        ]
      },
      {
        name: "8° Semestre",
        subjects: [
          { name: "Producción animal II" },
          { name: "Medicina interna", unlocks: ["Clínica de animal mayores", "Clínica de animales menores", "Imagenologia"] },
          { name: "Cirugía General", unlocks: ["Técnicas quirúrgicas"] },
          { name: "Salud pública" },
          { name: "Módulo integrador ciclo intermedio" },
          { name: "Preparación para la vida laboral" }
        ]
      }
    ]
  },
  {
    year: "Quinto Año",
    semesters: [
      {
        name: "9° Semestre",
        subjects: [
          { name: "Técnicas quirúrgicas" },
          { name: "Imagenologia" },
          { name: "Clínica de animal mayores", unlocks: ["Módulo integrador profesional"] },
          { name: "Economía y administración de empresas veterinarias", unlocks: ["Evaluación de proyectos"] },
          { name: "Clínica de animales menores", unlocks: ["Módulo integrador profesional"] },
          { name: "Electivo de especialidad I" }
        ]
      },
      {
        name: "10° Semestre",
        subjects: [
          { name: "Módulo integrador profesional" },
          { name: "Evaluación de proyectos" },
          { name: "Salud laboral y legislación veterinaria" },
          { name: "Electivo de especialidad II" }
        ]
      }
    ]
  }
];

const curriculum = document.getElementById("curriculum");
const subjectMap = new Map();

function createSubject(subject) {
  const div = document.createElement("div");
  div.className = "subject" + (subject.unlocks ? " locked" : "");
  div.textContent = subject.name;
  if (subject.unlocks) div.dataset.unlocks = subject.unlocks.join(",");
  div.addEventListener("click", () => {
    if (div.classList.contains("locked")) return;
    div.classList.toggle("completed");
    const unlocks = div.dataset.unlocks?.split(",");
    if (unlocks) {
      unlocks.forEach(name => {
        const target = subjectMap.get(name.trim());
        if (target && target.classList.contains("locked")) {
          target.classList.remove("locked");
        }
      });
    }
  });
  subjectMap.set(subject.name, div);
  return div;
}

data.forEach(year => {
  const yearDiv = document.createElement("div");
  yearDiv.className = "year";

  year.semesters.forEach(sem => {
    const semDiv = document.createElement("div");
    semDiv.className = "semester";
    const title = document.createElement("h2");
    title.textContent = sem.name;
    semDiv.appendChild(title);
    sem.subjects.forEach(subject => {
      const subj = createSubject(subject);
      semDiv.appendChild(subj);
    });
    yearDiv.appendChild(semDiv);
  });

  curriculum.appendChild(yearDiv);
});
