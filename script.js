const cursos = [
  // Primer Año - 1er Semestre
  { nombre: "Química general", anio: 1, semestre: 1, requisitos: [], desbloquea: ["Química orgánica y bioquímica"] },
  { nombre: "Biología", anio: 1, semestre: 1, requisitos: [], desbloquea: ["Histología y embriología"] },
  { nombre: "Zoología", anio: 1, semestre: 1, requisitos: [], desbloquea: ["Ecología"] },
  { nombre: "Introducción a la medicina veterinaria", anio: 1, semestre: 1, requisitos: [], desbloquea: [] },
  { nombre: "Tecnología e innovación", anio: 1, semestre: 1, requisitos: [], desbloquea: [] },
  { nombre: "Práctica I", anio: 1, semestre: 1, requisitos: [], desbloquea: ["Práctica II"] },

  // Primer Año - 2do Semestre
  { nombre: "Química orgánica y bioquímica", anio: 1, semestre: 2, requisitos: ["Química general"], desbloquea: [] },
  { nombre: "Histología y embriología", anio: 1, semestre: 2, requisitos: ["Biología"], desbloquea: ["Fisiología veterinaria", "Anatomía I"] },
  { nombre: "Ecología", anio: 1, semestre: 2, requisitos: ["Zoología"], desbloquea: [] },
  { nombre: "Bioestadística", anio: 1, semestre: 2, requisitos: [], desbloquea: [] },
  { nombre: "Desarrollo personal", anio: 1, semestre: 2, requisitos: [], desbloquea: [] },
  { nombre: "Práctica II", anio: 1, semestre: 2, requisitos: ["Práctica I"], desbloquea: [] },

  // Segundo Año - 1er Semestre
  { nombre: "Anatomía I", anio: 2, semestre: 1, requisitos: ["Histología y embriología"], desbloquea: ["Anatomía II"] },
  { nombre: "Fisiología veterinaria", anio: 2, semestre: 1, requisitos: ["Histología y embriología"], desbloquea: ["Fisiopatología"] },
  { nombre: "Microbiología e inmunología", anio: 2, semestre: 1, requisitos: [], desbloquea: ["Enfermedades infecciosas"] },
  { nombre: "Genética animal", anio: 2, semestre: 1, requisitos: [], desbloquea: [] },
  { nombre: "Ética y legislación", anio: 2, semestre: 1, requisitos: [], desbloquea: [] },
  { nombre: "Práctica III", anio: 2, semestre: 1, requisitos: [], desbloquea: [] },

  // Segundo Año - 2do Semestre
  { nombre: "Anatomía II", anio: 2, semestre: 2, requisitos: ["Anatomía I"], desbloquea: [] },
  { nombre: "Farmacología", anio: 2, semestre: 2, requisitos: ["Fisiología veterinaria"], desbloquea: [] },
  { nombre: "Parasitología", anio: 2, semestre: 2, requisitos: [], desbloquea: [] },
  { nombre: "Producción animal", anio: 2, semestre: 2, requisitos: [], desbloquea: [] },
  { nombre: "Bioética", anio: 2, semestre: 2, requisitos: [], desbloquea: [] },
  { nombre: "Práctica IV", anio: 2, semestre: 2, requisitos: [], desbloquea: [] },

  // Puedes agregar los cursos del 3º, 4º y 5º año siguiendo esta estructura
];

let aprobados = JSON.parse(localStorage.getItem("aprobados")) || [];

function crearMalla() {
  const malla = document.getElementById("malla");
  malla.innerHTML = "";

  for (let anio = 1; anio <= 5; anio++) {
    const fila = document.createElement("div");
    fila.className = "anio";

    for (let semestre = 1; semestre <= 2; semestre++) {
      const columna = document.createElement("div");
      columna.className = "semestre";

      const titulo = document.createElement("h2");
      titulo.textContent = `${anio}° Año - ${semestre}° Semestre`;
      columna.appendChild(titulo);

      cursos
        .filter(c => c.anio === anio && c.semestre === semestre)
        .forEach(curso => {
          const boton = document.createElement("button");
          boton.className = "curso";
          boton.textContent = curso.nombre;

          const requisitosCumplidos = curso.requisitos.every(r => aprobados.includes(r));
          boton.disabled = !requisitosCumplidos && !aprobados.includes(curso.nombre);

          if (aprobados.includes(curso.nombre)) {
            boton.classList.add("aprobado");
          }

          boton.onclick = () => {
            aprobados.push(curso.nombre);
            localStorage.setItem("aprobados", JSON.stringify(aprobados));
            crearMalla();
          };

          columna.appendChild(boton);
        });

      fila.appendChild(columna);
    }

    malla.appendChild(fila);
  }
}

function resetearMalla() {
  aprobados = [];
  localStorage.removeItem("aprobados");
  crearMalla();
}

crearMalla();
