const addTask = document.getElementById("addTaskBtn");
const title = document.getElementById("input");

let saveTasks = [];

const createTitle = () => {
    return title.value;
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

    return dataAtualFormatada;
};

addTask.addEventListener("click", () => {
    const info = {
        title: createTitle(),
        data: createData(),
    };

    let saveTasks = JSON.parse(localStorage.getItem("task")) || [];
    saveTasks.push(info);

    const taskJSON = JSON.stringify(saveTasks);
    localStorage.setItem("task", taskJSON);

    document.getElementById("title").value = "";

    createElement(); // Chamar a função para atualizar a tabela após adicionar a nova tarefa
});

const createElement = () => {
    const taskJSON = localStorage.getItem("task");
    const saveTasks = taskJSON ? JSON.parse(taskJSON) : [];
    const tbody = document.querySelector("tbody");

    tbody.innerHTML = ""; // Limpar o conteúdo existente do tbody

    saveTasks.forEach((info) => {
        const tr = document.createElement("tr");
        const tdTitle = document.createElement("td");
        tdTitle.textContent = info.title;

        const tdData = document.createElement("td");
        tdData.textContent = info.data;

        const tdButtons = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("action-btn");

        const span = document.createElement("span");
        span.classList.add("material-symbols-outlined");
        span.textContent = "delete";

        deleteButton.appendChild(span);
        deleteButton.addEventListener("click", () => {
            const index = saveTasks.indexOf(info);
            if (index > -1) {
                saveTasks.splice(index, 1);
                localStorage.setItem("task", JSON.stringify(saveTasks));
                createElement(); // Atualizar a tabela
            }
        });

        tdButtons.appendChild(deleteButton);
        tr.appendChild(tdTitle);
        tr.appendChild(tdData);
        tr.appendChild(tdButtons);
        tbody.appendChild(tr); // Adicionar a nova linha à tabela
    });
};

// Chamar createElement ao carregar a página para exibir as tarefas existentes
window.addEventListener("load", () => {
    createElement(); // Chamar a função ao carregar a página
});
