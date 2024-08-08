const recoverStorage = localStorage.getItem("tasks");

let taskRecovered = undefined;

const day = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
];

const storage = () => {
    if (recoverStorage) {
        taskRecovered = JSON.parse(recoverStorage);
        console.log("Tasks encontradas!");
    } else {
        const tasks = {
            sunday: [],
            monday: [],
            tuesday: [],
            wednesday: [],
            thursday: [],
            friday: [],
            saturday: [],
        };

        localStorage.setItem("tasks", JSON.stringify(tasks));
        taskRecovered = tasks; // Corrigido aqui
        console.log("Storage criado");
    }
};

storage();

// Seleciona todos os botões que trocam as seções (dias da semana)
const btnSection = document.querySelectorAll(".btn-section");

// Seleciona todas as seções correspondentes aos dias da semana
const sectionWeek = document.querySelectorAll(".container-weekday");

let setDay = "";

// Função para ativar a seção correspondente ao botão clicado
const activeSection = (index) => {
    // Reseta a aparência de todos os botões e esconde todas as seções
    btnSection.forEach((e) => {
        e.style.background = "none";
        e.style.color = "#d4d4d4";
    });

    sectionWeek.forEach((e) => {
        e.style.display = "none";
    });

    // Destaca o botão clicado e mostra a seção correspondente
    btnSection[index].style.backgroundColor = "#d4d4d4";
    btnSection[index].style.color = "#212529";
    sectionWeek[index].style.display = "flex";

    setDay = day[index];

    console.log(setDay);
};

// Adiciona um evento de clique a cada botão para ativar a seção correspondente
btnSection.forEach((e, i) => {
    e.addEventListener("click", () => activeSection(i));
});

// Quando a página for carregada, ativa a seção correspondente ao dia atual da semana
document.addEventListener("DOMContentLoaded", () => {
    const newDay = new Date();
    const dayWeek = newDay.getDay();

    // Ativa a seção e destaca o botão correspondente ao dia da semana atual
    sectionWeek[dayWeek].style.display = "flex";
    btnSection[dayWeek].style.backgroundColor = "#d4d4d4";
    btnSection[dayWeek].style.color = "#212529";

    setDay = day[dayWeek];

    console.log(setDay);
});

/*--------------------------------------------------------------------------*/

// Obtém o elemento modal pelo ID "modalCreateTask" do HTML
const modal = document.getElementById("modalCreateTask");

// Função para abrir o modal
const openModal = () => {
    modal.style.display = "flex"; // Define o estilo display como "flex" para mostrar o modal
};

// Função para fechar o modal
const closeModal = () => {
    modal.style.display = "none"; // Define o estilo display como "none" para ocultar o modal
};

const btnCreateTask = document.querySelectorAll(".btn-create-task");
btnCreateTask.forEach((e, i) => {
    e.addEventListener("click", () => openModal());
});

/*--------------------------------------------------------------------------*/

const btnSetDay = document.querySelectorAll(".btn-set-day");

btnSetDay.forEach((e, i) => {
    e.addEventListener("click", () => {});
});

/*--------------------------------------------------------------------------*/

// Seleciona todos os botões com a classe "btn-add-subtask"
const btnAddSubtask = document.querySelectorAll(".btn-add-subtask");

// Adiciona um evento de clique a cada botão para criar uma nova subtarefa
btnAddSubtask.forEach((e) => {
    e.addEventListener("click", () => createSubTask());
});

// Função para criar um novo campo de input para subtarefa
const createSubTask = () => {
    // Seleciona o contêiner onde os inputs de subtarefa serão adicionados
    const containerSubtask = document.getElementById("containerSubtask");

    // Cria um novo elemento de input
    const input = document.createElement("input");

    // Define o tipo e o placeholder do input
    input.type = "text";
    input.placeholder = "Subtarefa";
    input.classList.add("input-subtask");

    // Adiciona o novo input ao contêiner de subtarefas
    containerSubtask.appendChild(input);
};

/*--------------------------------------------------------------------------*/

document
    .getElementById("btnAddTask")
    .addEventListener("click", () => addTask());

// Função para adicionar uma tarefa ao índice especificado
const addTask = () => {
    const task = {
        title: "",
        subTask: [],
    };

    // Obtém o valor do título da tarefa a partir do input com o ID "titleTask"
    const titleTask = document.getElementById("titleTask");

    // Define o título da tarefa correspondente ao índice especificado
    task.title = titleTask.value.trim(); // Remove espaços em branco no início e fim

    // Seleciona todos os inputs de subtarefa com a classe "input-subtask"
    const subtasks = document.querySelectorAll(".input-subtask");

    // Adiciona os valores das subtarefas ao array 'task' da tarefa correspondente
    subtasks.forEach((e) => {
        const subtaskValue = e.value.trim(); // Remove espaços em branco no início e fim
        if (subtaskValue) {
            task.subTask.push(subtaskValue);
        }
    });

    // Verifica se a tarefa tem um título e pelo menos uma subtarefa
    if (task.title && task.subTask.length > 0) {
        taskRecovered[setDay].push(task);
        updateStorage();
        console.log("Tarefa adicionada com sucesso!");
    } else {
        console.log(
            "Tarefa não adicionada. Verifique se há título e subtarefas."
        );
    }

    // Limpa os inputs
    titleTask.value = "";
    subtasks.forEach((e) => (e.value = ""));

    const containerSubtask = document.getElementById("containerSubtask");
    containerSubtask.innerHTML = "";
    createSubTask();

    reloadTasks();
    closeModal();
};

/*--------------------------------------------------------------------------*/

const updateStorage = () => {
    localStorage.setItem("tasks", JSON.stringify(taskRecovered));
};

/*--------------------------------------------------------------------------*/

// Seleciona todos os elementos com a classe "container-tasks"
const container = document.querySelectorAll(".container-tasks");

// Função para mostrar as tarefas
const showTasks = (index) => {
    // Limpa o conteúdo do container correspondente
    container[index].innerHTML = "";

    // Adiciona as tarefas ao container
    taskRecovered[day[index]].forEach((element, i) => { // 'i' é o índice da tarefa
        const details = document.createElement("details");
        container[index].appendChild(details);

        const summary = document.createElement("summary");
        summary.textContent = element.title;
        details.appendChild(summary);

        // Cria os spans para cada subtask
        element.subTask.forEach((e) => {
            const span = document.createElement("span");
            span.textContent = e;
            details.appendChild(span);
        });

        // Cria o botão de deletar
        const button = document.createElement("button");
        button.textContent = "Deletar tarefa";
        button.classList.add("btn-delete-task");

        // Define o taskIndex correto no clique do botão
        button.addEventListener("click", () => {
            taskIndex = i; // Define taskIndex como o índice da tarefa clicada
            deleteTask();  // Chama a função de deletar
        });

        // Adiciona o botão ao details
        details.appendChild(button);
    });
};

// Função para recarregar todas as tarefas
const reloadTasks = () => {
    container.forEach((e, i) => {
        showTasks(i);
    });
};

// Função para deletar uma tarefa
const deleteTask = () => {
    taskRecovered[setDay].splice(taskIndex, 1); // Remove a tarefa do array

    updateStorage(); // Atualiza o localStorage
    reloadTasks(); // Recarrega as tarefas na interface

    console.log("Task apagada!");
};

// Inicializa a exibição das tarefas 
reloadTasks();
