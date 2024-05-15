const tbody = document.querySelector("tbody");
const addTask = document.getElementById("addTaskBtn");

let saveTasks = [];

let info = {
    title: "",
    data: "",
    status: "",
};

const createTitle = () => {
    const titleInput = document.getElementById("titleInput");
    info.title = titleInput.value;
};

const createData = () => {
    const dataAtual = new Date();
    const dia = dataAtual.getDate();
    const mes = dataAtual.getMonth();
    const ano = dataAtual.getFullYear();
    const horas = dataAtual.getHours();
    const minutos = dataAtual.getMinutes();

    const meses = [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
    ];

    const mesFormatado = meses[mes];

    const dataFormatada = `${dia} de ${mesFormatado} de ${ano}`;

    const horarioFormatado = `${horas}:${minutos}`;

    const dataAtualFormatada = `${dataFormatada} ${horarioFormatado}`;

    info.data = dataAtualFormatada;
};

const createElements = () => {
    const tr = document.createElement("tr");
    const tdTitle = document.createElement("td");
    const tdData = document.createElement("td");
    const tdSelect = document.createElement("td");
    const select = document.createElement("select");
    const tdButtons = document.createElement("td");
    const deleteButton = document.createElement("button");
    const span = document.createElement("span");

    tr.appendChild(tdTitle);
    tdTitle.innerHTML = info.title;

    tr.appendChild(tdData);
    tdData.innerHTML = info.data;

    tr.appendChild(tdSelect);
    tdSelect.appendChild(select);
    const options = `
        <option value="pendente">pendente</option>
        <option value="andamento">em andamento</option>
        <option value="concluida">concluída</option>
        `;

    select.innerHTML = options;

    info.status = "pendente";

    select.addEventListener("change", (event) => {
        info.status = event.target.value;
        saveTasks.push(info);
    });

    tr.appendChild(tdButtons);
    tdButtons.appendChild(deleteButton);
    deleteButton.classList.add('action-btn');

    span.classList.add("material-symbols-outlined");
    span.textContent = "delete";

    deleteButton.appendChild(span);

    deleteButton.addEventListener("click", function() {
        tbody.removeChild(tr);
    });

    tbody.appendChild(tr);
};

addTask.addEventListener("click", () => {
    createTitle();
    createData();

    createElements();

    saveTasks.push(info);

    saveTasksLS();

    const titleInput = document.getElementById("titleInput").value = ""
});

const saveTasksLS = () => {
    const saveTasksJSON = JSON.stringify(saveTasks);

    localStorage.setItem("saveTasks", saveTasksJSON);
};