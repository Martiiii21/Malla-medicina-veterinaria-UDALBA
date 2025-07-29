// Estructura de la malla con requisitos
const malla = [
  {
    año: "Primer Año",
    semestres: [
      {
        nombre: "1° semestre",
        ramos: [
          { nombre: "Química general", abre: ["Química orgánica y bioquímica"] },
          { nombre: "Biología", abre: ["Histología y embriología"] },
          { nombre: "Zoología", abre: ["Ecología"] },
          { nombre: "Introducción a la medicina veterinaria" },
          { nombre: "Tecnología e innovación" },
          { nombre: "Práctica I", abre: ["Práctica II"] }
        ]
      },
      {
        nombre: "2° semestre",
        ramos: [
          { nombre: "Química orgánica y bioquímica" },
          { nombre: "Histología y embriología", abre: ["Fisiología veterinaria", "Anatomía I"] },
          { nombre: "Estadística" },
          { nombre: "Ecología", abre: ["Gestión ambiental y conservación"] },
          { nombre: "Inglés básico" },
          { nombre: "Práctica II", abre: ["Práctica III"] }
        ]
      }
    ]
  },
  {
    año: "Segundo Año",
    semestres: [
      {
        nombre: "3° semestre",
        ramos: [
          { nombre: "Anatomía I", abre: ["Anatomía II"] },
          { nombre: "Fisiología veterinaria", abre: ["Interacción hospedero patógeno", "Fisiología especial"] },
          { nombre: "Etología y bienestar animal", abre: ["Módulo integrador ciclo inicial"] },
          { nombre: "Gestión ambiental y conservación", abre: ["Módulo integrador ciclo inicial"] },
          { nombre: "Práctica III", abre: ["Módulo integrador ciclo inicial"] }
        ]
      },
      {
        nombre: "4° semestre",
        ramos: [
          { nombre: "Anatomía II" },
          { nombre: "Fisiología especial", abre: ["Alimentación y nutrición animal", "Patología funcional", "Hematología y laboratorio clínico"] },
          { nombre: "Interacción hospedero patógeno", abre: ["Inspección y control de alimentos", "Epidemiología"] },
          { nombre: "Módulo integrador ciclo inicial", abre: ["Práctica IV"] },
          { nombre: "Principios éticos veterinarios" },
          { nombre: "Genética pecuaria" }
        ]
      }
    ]
  },
  {
    año: "Tercer Año",
    semestres: [
      {
        nombre: "5° semestre",
        ramos: [
          { nombre: "Alimentación y nutrición animal", abre: ["Producción animal I"] },
          { nombre: "Patología funcional", abre: ["Patología especial"] },
          { nombre: "Inspección y control de alimentos" },
          { nombre: "Epidemiología", abre: ["Salud pública"] },
          { nombre: "Desarrollo sostenible" },
          { nombre: "Práctica IV", abre: ["Práctica V"] }
        ]
      },
      {
        nombre: "6° semestre",
        ramos: [
          { nombre: "Farmacología y terapéutica", abre: ["Cirugía General"] },
          { nombre: "Semiología", abre: ["Ginecología y obstetricia"] },
          { nombre: "Hematología y laboratorio clínico" },
          { nombre: "Patología especial", abre: ["Enfermedades infecciosas y parasitarias"] },
          { nombre: "Inglés técnico" },
          { nombre: "Práctica V", abre: ["Práctica VI"] }
        ]
      }
    ]
  },
  {
    año: "Cuarto Año",
    semestres: [
      {
        nombre: "7° semestre",
        ramos: [
          { nombre: "Producción animal I", abre: ["Producción animal II", "Módulo integrador ciclo intermedio"] },
          { nombre: "Enfermedades infecciosas y parasitarias", abre: ["Medicina interna"] },
          { nombre: "Ginecología y obstetricia" },
          { nombre: "Metodología de la investigación" },
          { nombre: "Responsabilidad social y emprendimiento" },
          { nombre: "Práctica VI", abre: ["Módulo integrador ciclo intermedio"] }
        ]
      },
      {
        nombre: "8° semestre",
        ramos: [
          { nombre: "Producción animal II" },
          { nombre: "Medicina interna", abre: ["Clínica de animal mayores", "Clínica de animales menores", "Imagenologia"] },
          { nombre: "Cirugía General", abre: ["Técnicas quirúrgicas"] },
          { nombre: "Salud pública" },
          { nombre: "Módulo integrador ciclo intermedio" },
          { nombre: "Preparación para la vida laboral" }
        ]
      }
    ]
  },
  {
    año: "Quinto Año",
    semestres: [
      {
        nombre: "9° semestre",
        ramos: [
          { nombre: "Técnicas quirúrgicas" },
          { nombre: "Imagenologia" },
          { nombre: "Clínica de animal mayores", abre: ["Módulo integrador profesional"] },
          { nombre: "Economía y administración de empresas veterinarias", abre: ["Evaluación de proyectos"] },
          { nombre: "Clínica de animales menores", abre: ["Módulo integrador profesional"] },
          { nombre: "Electivo de especialidad I" }
        ]
      },
      {
        nombre: "10° semestre",
        ramos: [
          { nombre: "Módulo integrador profesional" },
          { nombre: "Evaluación de proyectos" },
          { nombre: "Salud laboral y legislación veterinaria" },
          { nombre: "Electivo de especialidad II" }
        ]
      }
    ]
  }
];

// Estado global
const estado = {};

const container = document.getElementById("malla-container");

function crearMalla() {
  malla.forEach((añoObj) => {
    const divAño = document.createElement("div");
    divAño.className = "año";

    const titulo = document.createElement("div");
    titulo.className = "titulo-año";
    titulo.textContent = añoObj.año;
    divAño.appendChild(titulo);

    const fila = document.createElement("div");
    fila.className = "semestres";

    añoObj.semestres.forEach((semestre) => {
      const columna = document.createElement("div");
      columna.className = "semestre";

      const tituloSem = document.createElement("h3");
      tituloSem.textContent = semestre.nombre;
      columna.appendChild(tituloSem);

      const contenedor = document.createElement("div");
      contenedor.className = "asignaturas";

      semestre.ramos.forEach((ramo) => {
        const divRamo = document.createElement("div");
        divRamo.className = "asignatura bloqueada";
        divRamo.textContent = ramo.nombre;
        divRamo.dataset.nombre = ramo.nombre;

        if (!ramo.abre || ramo.abre.length === 0) {
          divRamo.classList.remove("bloqueada");
        }

        divRamo.addEventListener("click", () => {
          if (!divRamo.classList.contains("bloqueada")) {
            divRamo.classList.toggle("aprobada");
            estado[ramo.nombre] = divRamo.classList.contains("aprobada");
            desbloquear();
          }
        });

        contenedor.appendChild(divRamo);
      });

      columna.appendChild(contenedor);
      fila.appendChild(columna);
    });

    divAño.appendChild(fila);
    container.appendChild(divAño);
  });
}

function desbloquear() {
  document.querySelectorAll(".asignatura").forEach((nodo) => {
    const nombre = nodo.dataset.nombre;
    const ramo = buscarRamo(nombre);

    if (ramo.abre) {
      ramo.abre.forEach((hijo) => {
        const hijoNodo = document.querySelector(`.asignatura[data-nombre="${hijo}"]`);
        if (hijoNodo && estado[nombre]) {
          hijoNodo.classList.remove("bloqueada");
        }
      });
    }
  });
}

function buscarRamo(nombre) {
  for (let año of malla) {
    for (let sem of año.semestres) {
      for (let ramo of sem.ramos) {
        if (ramo.nombre === nombre) {
          return ramo;
        }
      }
    }
  }
  return null;
}

crearMalla();
