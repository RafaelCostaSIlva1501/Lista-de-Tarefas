const openFormBtn = document.getElementById("openFormBtn"); // Botão para abrir o formulário
const closeFormBtn = document.getElementById("closeFormBtn"); //Botão para fechar o formulário
const form = document.getElementById("form"); // Formulário

const title = document.getElementById("input"); // Input que recebe título da tarefa
const term = document.getElementById("term"); // Input que recebe a data de entrega da tarefa

const addTask = document.getElementById("addTaskBtn"); // Botão para adicionar a terefa na tabela

const modalDeleteTask = document.getElementById("modalDeleteTask"); // Confirmação para apagar tarefa
const cancelDelete = document.getElementById("cancelDelete");

// Adiciona a função de abrir no botão de abrir o formulário
openFormBtn.addEventListener("click", () => {
    form.style.display = "flex";
});

// Função que fecha o formulário
const closeForm = () => {
    form.style.display = "none";
};

//Botão que fecha o formulário
closeFormBtn.addEventListener("click", () => {
    closeForm();
});

// Array que recebe as tarefas
let saveTasks = [];

// Captura o título colocado no input dentro do formulário
const createTitle = () => {
    return title.value;
};

// Captura e formata a data colocado no input dentro do formulário
const createData = () => {
    const dateValue = term.value;

    const selectedDate = new Date(dateValue);
    const day = String(selectedDate.getDate()).padStart(2, "0");
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const year = selectedDate.getFullYear();

    return `${day}/${month}/${year}`;
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

    title.value = "";
    term.value = "";

    createElement(); // Chamar a função para atualizar a tabela após adicionar a nova tarefa

    closeForm();
});

const createElement = () => {
    const taskJSON = localStorage.getItem("task");
    const saveTasks = taskJSON ? JSON.parse(taskJSON) : [];
    const tbody = document.querySelector("tbody");

    tbody.innerHTML = ""; // Limpar o conteúdo existente do tbody

    saveTasks.forEach((info) => {
        //Adiciona uma nova linha a tabela
        const tr = document.createElement("tr");

        //Célula com o título da tarefa
        const tdTitle = document.createElement("td");
        tdTitle.textContent = info.title;
        tr.appendChild(tdTitle);

        //Célula com a data da tarefa
        const tdData = document.createElement("td");
        tdData.textContent = info.data;
        tr.appendChild(tdData);

        //Célula com botão de deletar
        const tdButtons = document.createElement("td");
        const deleteButton = document.createElement("button");
        const span = document.createElement("span");
        deleteButton.classList.add("action-btn");
        span.classList.add("material-symbols-outlined");
        span.textContent = "delete";
        deleteButton.appendChild(span);

        deleteButton.addEventListener("click", () => {
            modalDeleteTask.style.display = "flex";

            const deleteConfirmButton = document.getElementById(
                "deleteConfirmButton"
            );

            const buttonDelete = document.createElement("button");
            buttonDelete.innerText = "Sim, apagar!";

            buttonDelete.addEventListener("click", () => {
                const index = saveTasks.indexOf(info);
                if (index > -1) {
                    saveTasks.splice(index, 1);
                    localStorage.setItem("task", JSON.stringify(saveTasks));
                    createElement(); // Atualizar a tabela

                    modalDeleteTask.style.display = "none";
                    buttonDelete.remove();
                }
            });

            cancelDelete.addEventListener("click", () => {
                modalDeleteTask.style.display = "none";
                buttonDelete.remove();
            });

            deleteConfirmButton.appendChild(buttonDelete);
        });

        tdButtons.appendChild(deleteButton);

        tr.appendChild(tdButtons);
        tbody.appendChild(tr); // Adicionar a nova linha à tabela
    });
};

// Chamar createElement ao carregar a página para exibir as tarefas existentes
window.addEventListener("load", () => {
    createElement(); // Chamar a função ao carregar a página
});
