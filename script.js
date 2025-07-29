const cursos = [
  // Primer año
  { nombre: "Anatomía I", anio: 1, semestre: 1, requisitos: [] },
  { nombre: "Biología", anio: 1, semestre: 1, requisitos: [] },
  { nombre: "Química", anio: 1, semestre: 1, requisitos: [] },
  { nombre: "Anatomía II", anio: 1, semestre: 2, requisitos: ["Anatomía I"] },
  { nombre: "Bioquímica", anio: 1, semestre: 2, requisitos: ["Biología", "Química"] },

  // Segundo año
  { nombre: "Fisiología I", anio: 2, semestre: 1, requisitos: ["Anatomía II", "Bioquímica"] },
  { nombre: "Microbiología", anio: 2, semestre: 1, requisitos: ["Biología"] },
  { nombre: "Fisiología II", anio: 2, semestre: 2, requisitos: ["Fisiología I"] },
  { nombre: "Parasitología", anio: 2, semestre: 2, requisitos: ["Microbiología"] },

  // Tercer año
  { nombre: "Patología I", anio: 3, semestre: 1, requisitos: ["Fisiología II"] },
  { nombre: "Farmacología", anio: 3, semestre: 1, requisitos: ["Fisiología II"] },
  { nombre: "Patología II", anio: 3, semestre: 2, requisitos: ["Patología I"] },
  { nombre: "Toxicología", anio: 3, semestre: 2, requisitos: ["Farmacología"] },

  // Cuarto año
  { nombre: "Clínica Médica", anio: 4, semestre: 1, requisitos: ["Patología II"] },
  { nombre: "Clínica Quirúrgica", anio: 4, semestre: 1, requisitos: ["Farmacología"] },
  { nombre: "Reproducción", anio: 4, semestre: 2, requisitos: ["Clínica Médica"] },
  { nombre: "Epidemiología", anio: 4, semestre: 2, requisitos: [] },

  // Quinto año
  { nombre: "Internado", anio: 5, semestre: 1, requisitos: ["Clínica Quirúrgica", "Reproducción"] },
  { nombre: "Tesis", anio: 5, semestre: 2, requisitos: ["Internado"] },
];

let aprobados = JSON.parse(localStorage.getItem("aprobados")) || [];

function crearMalla() {
  const malla = document.getElementById("malla");
  malla.innerHTML = "";

  for (let anio = 1; anio <= 5; anio++) {
    const columnaAnio = document.createElement("div");
    columnaAnio.className = "anio";

    const tituloAnio = document.createElement("h2");
    tituloAnio.textContent = `${anio}° Año`;
    tituloAnio.style.textAlign = "center";
    columnaAnio.appendChild(tituloAnio);

    for (let semestre = 1; semestre <= 2; semestre++) {
      const bloqueSemestre = document.createElement("div");
      bloqueSemestre.className = "semestre";

      const tituloSem = document.createElement("h3");
      tituloSem.textContent = `${semestre}° Semestre`;
      bloqueSemestre.appendChild(tituloSem);

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
            if (!aprobados.includes(curso.nombre)) {
              aprobados.push(curso.nombre);
              localStorage.setItem("aprobados", JSON.stringify(aprobados));
              crearMalla();
            }
          };

          bloqueSemestre.appendChild(boton);
        });

      columnaAnio.appendChild(bloqueSemestre);
    }

    malla.appendChild(columnaAnio);
  }
}

function resetear() {
  localStorage.removeItem("aprobados");
  aprobados = [];
  crearMalla();
}

window.onload = crearMalla;
