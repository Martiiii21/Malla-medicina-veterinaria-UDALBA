
const cursos = [...]; // Aquí iría el contenido completo de cursos, omitido por longitud

function estadoCurso(curso, aprobados) {
  if (aprobados.includes(curso.id)) return "aprobada";
  if (curso.requisitos.every(r => aprobados.includes(r))) return "desbloqueada";
  return "bloqueada";
}

let aprobados = JSON.parse(localStorage.getItem("aprobados_vet")) || [];

function guardarProgreso() {
  localStorage.setItem("aprobados_vet", JSON.stringify(aprobados));
}

function resetearProgreso() {
  if (confirm("¿Estás seguro que deseas reiniciar el progreso?")) {
    aprobados = [];
    guardarProgreso();
    render();
  }
}

function render() {
  const contenedor = document.getElementById("malla");
  contenedor.innerHTML = "";
  cursos.forEach(curso => {
    const estado = estadoCurso(curso, aprobados);
    const div = document.createElement("div");
    div.className = `curso ${estado}`;
    div.innerText = curso.nombre;
    if (estado === "desbloqueada") {
      div.onclick = () => {
        aprobados.push(curso.id);
        guardarProgreso();
        render();
      };
    }
    contenedor.appendChild(div);
  });
}

render();
