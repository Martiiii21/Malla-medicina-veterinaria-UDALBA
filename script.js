const cursos = [
  // Primer año
  { nombre: "Química general", requisitos: [] },
  { nombre: "Biología", requisitos: [] },
  { nombre: "Zoología", requisitos: [] },
  { nombre: "Introducción a la medicina veterinaria", requisitos: [] },
  { nombre: "Tecnología e innovación", requisitos: [] },
  { nombre: "Práctica I", requisitos: [] },
  { nombre: "Química orgánica y bioquímica", requisitos: ["Química general"] },
  { nombre: "Histología y embriología", requisitos: ["Biología"] },
  { nombre: "Estadística", requisitos: [] },
  { nombre: "Ecología", requisitos: ["Zoología"] },
  { nombre: "Inglés básico", requisitos: [] },
  { nombre: "Práctica II", requisitos: ["Práctica I"] },

  // Segundo año
  { nombre: "Anatomía I", requisitos: ["Histología y embriología"] },
  { nombre: "Fisiología veterinaria", requisitos: ["Histología y embriología"] },
  { nombre: "Etología y bienestar animal", requisitos: [] },
  { nombre: "Gestión ambiental y conservación", requisitos: ["Ecología"] },
  { nombre: "Práctica III", requisitos: ["Práctica II"] },
  { nombre: "Anatomía II", requisitos: ["Anatomía I"] },
  { nombre: "Fisiología especial", requisitos: ["Fisiología veterinaria"] },
  { nombre: "Interacción hospedero patógeno", requisitos: ["Fisiología veterinaria"] },
  { nombre: "Módulo integrador ciclo inicial", requisitos: ["Etología y bienestar animal", "Gestión ambiental y conservación", "Práctica III"] },
  { nombre: "Principios éticos veterinarios", requisitos: [] },
  { nombre: "Genética pecuaria", requisitos: [] },

  // Tercer año
  { nombre: "Alimentación y nutrición animal", requisitos: ["Fisiología especial"] },
  { nombre: "Patología funcional", requisitos: ["Fisiología especial"] },
  { nombre: "Inspección y control de alimentos", requisitos: ["Interacción hospedero patógeno"] },
  { nombre: "Epidemiología", requisitos: ["Interacción hospedero patógeno"] },
  { nombre: "Desarrollo sostenible", requisitos: [] },
  { nombre: "Práctica IV", requisitos: ["Módulo integrador ciclo inicial"] },
  { nombre: "Farmacología y terapéutica", requisitos: [] },
  { nombre: "Semiología", requisitos: [] },
  { nombre: "Hematología y laboratorio clínico", requisitos: ["Fisiología especial"] },
  { nombre: "Patología especial", requisitos: ["Patología funcional"] },
  { nombre: "Inglés técnico", requisitos: [] },
  { nombre: "Práctica V", requisitos: ["Práctica IV"] },

  // Cuarto año
  { nombre: "Producción animal I", requisitos: ["Alimentación y nutrición animal"] },
  { nombre: "Enfermedades infecciosas y parasitarias", requisitos: ["Patología especial"] },
  { nombre: "Ginecología y obstetricia", requisitos: ["Semiología"] },
  { nombre: "Metodología de la investigación", requisitos: [] },
  { nombre: "Responsabilidad social y emprendimiento", requisitos: [] },
  { nombre: "Práctica VI", requisitos: ["Práctica V"] },
  { nombre: "Producción animal II", requisitos: ["Producción animal I"] },
  { nombre: "Medicina interna", requisitos: ["Enfermedades infecciosas y parasitarias"] },
  { nombre: "Cirugía General", requisitos: ["Farmacología y terapéutica"] },
  { nombre: "Salud pública", requisitos: ["Epidemiología"] },
  { nombre: "Módulo integrador ciclo intermedio", requisitos: ["Producción animal I", "Práctica VI"] },
  { nombre: "Preparación para la vida laboral", requisitos: [] },

  // Quinto año
  { nombre: "Técnicas quirúrgicas", requisitos: ["Cirugía General"] },
  { nombre: "Imagenologia", requisitos: ["Medicina interna"] },
  { nombre: "Clínica de animal mayores", requisitos: ["Medicina interna"] },
  { nombre: "Economía y administración de empresas veterinarias", requisitos: [] },
  { nombre: "Clínica de animales menores", requisitos: ["Medicina interna"] },
  { nombre: "Electivo de especialidad I", requisitos: [] },
  { nombre: "Módulo integrador profesional", requisitos: ["Clínica de animal mayores", "Clínica de animales menores"] },
  { nombre: "Evaluación de proyectos", requisitos: ["Economía y administración de empresas veterinarias"] },
  { nombre: "Salud laboral y legislación veterinaria", requisitos: [] },
  { nombre: "Electivo de especialidad II", requisitos: [] }
];

function crearMalla() {
  const malla = document.getElementById("malla");
  malla.innerHTML = "";
  cursos.forEach(curso => {
    const div = document.createElement("div");
    div.classList.add("curso");
    div.innerText = curso.nombre;
    div.onclick = () => aprobarCurso(curso.nombre);
    if (!curso.requisitos.every(r => localStorage.getItem(r) === "aprobado")) {
      div.classList.add("bloqueado");
    }
    if (localStorage.getItem(curso.nombre) === "aprobado") {
      div.classList.remove("bloqueado");
      div.classList.add("aprobado");
    }
    malla.appendChild(div);
  });
}

function aprobarCurso(nombre) {
  const curso = cursos.find(c => c.nombre === nombre);
  if (!curso.requisitos.every(r => localStorage.getItem(r) === "aprobado")) return;
  localStorage.setItem(nombre, "aprobado");
  crearMalla();
}

function resetearMalla() {
  localStorage.clear();
  crearMalla();
}

crearMalla();
