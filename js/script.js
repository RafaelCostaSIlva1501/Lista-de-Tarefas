const tbody = document.querySelector('tbody')

let saveTasks = []

function criarElemento(tag, innerText = '', innerHTML = '') {
    const elemento = document.createElement(tag);

    if (innerText) {
        elemento.innerText = innerText;
    }

    if (innerHTML) {
        elemento.innerHTML = innerHTML;
    }

    return elemento
}

function criarSelect() {
    const options = `
    <option value="pendente">pendente</option>
    <option value="andamento">em andamento</option>
    <option value="concluida">concluída</option>`

    const select = criarElemento('select', '', options);

    return select;
}

function criarData(info) {
    const dataAtual = new Date();
    const dia = dataAtual.getDate();
    const mes = dataAtual.getMonth();
    const ano = dataAtual.getFullYear();
    const horas = dataAtual.getHours();
    const minutos = dataAtual.getMinutes();

    const meses = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    const mesFormatado = meses[mes];

    const dataFormatada = `${dia} de ${mesFormatado} de ${ano}`;
    const horarioFormatado = `${horas}:${minutos}`;

    const dataAtualFormatada = `${dataFormatada} ${horarioFormatado}`

    info.data = dataAtualFormatada
}

function criarTitulo(info) {
    const titulo = document.querySelector('.add-input').value;

    info.titulo = titulo
}

function criarLinha(info) {

    const { titulo, data } = info

    const tr = criarElemento('tr');
    const tdTitulo = criarElemento('td', titulo);
    const tdData = criarElemento('td', data);
    const tdSelect = criarElemento('td');
    const tdButtons = criarElemento('td');

    const select = criarSelect();
    tdSelect.appendChild(select);

    const deleteButton = criarElemento('button', '', '<span class="material-symbols-outlined">delete</span>');

    deleteButton.classList.add('action-btn');

    deleteButton.addEventListener('click', function () {
        tbody.removeChild(tr)
    })

    tdButtons.appendChild(deleteButton);
    
    tr.appendChild(tdTitulo);
    tr.appendChild(tdData);
    tr.appendChild(tdSelect);
    tr.appendChild(tdButtons);

    tbody.appendChild(tr);
}

const info = {
    titulo: '',
    data: '',
}

const addBtn = document.querySelector('.add-btn');
addBtn.addEventListener('click', function() {
    const input = document.querySelector('.add-input');

    if (input.value === '') {
        input.style.borderColor = 'red'
        setTimeout( function () {
            input.style.borderColor = 'var(--corBaseClara)'
        }, 50);
    } else {
        criarTitulo(info)
        criarData(info)
        criarLinha(info)

        input.value = ''
    }
    
})

