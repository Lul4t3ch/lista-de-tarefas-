const input = document.querySelector(".input-tarefa");
const botao = document.querySelector(".btn-tarefa");
const listaTarefas = document.querySelector(".tarefas");

input.addEventListener("keypress", (e) => {
    if(e.keyCode === 13) {
        if(!input.value) return;
        criaTarefa(input.value);
    }
}) 

botao.addEventListener("click", (e) => {
    if(!input.value) return;
    criaTarefa(input.value);
})

function criaTarefa(input) {
    const li = criaLi();
    li.innerText += input;
    listaTarefas.appendChild(li);
    limpaInput();
    criaBotaoApagar(li);
    salvaTarefas();
}

function criaLi() {
    return document.createElement('li');
}

function limpaInput() {
    input.value = '';
    input.focus();
}

document.addEventListener("click", (e) => {
    const el = e.target;
    if (el.classList.contains("apagar")) {
        el.parentElement.remove();
        salvaTarefas();
    }
})

function criaBotaoApagar(li) {
    li.innerText += ' ';
    const botao = document.createElement("button");
    botao.innerText = "Apagar";
    botao.setAttribute('class', 'apagar');
    li.appendChild(botao);
}

function salvaTarefas() {
    const liTarefas = listaTarefas.querySelectorAll('li');
    const listaDeTarefas = [];

    for (let tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
        listaDeTarefas.push(tarefaTexto);
    }

    const tarefasJson = JSON.stringify(listaDeTarefas);
    localStorage.setItem("tarefas", tarefasJson);
}

function addTarefasSalvas() {
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);

    for(let tarefa of listaDeTarefas) {
        criaTarefa(tarefa);
    }
}

addTarefasSalvas();