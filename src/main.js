window.addEventListener("load", () => {
  todos = JSON.parse(localStorage.getItem("todos")) || [];
  const nomeInput = document.querySelector("#nome");
  const novoFormTodo = document.querySelector("#novo-form-todo");

  const usuario = localStorage.getItem("usuario") || "";

  nomeInput.value = usuario;

  nomeInput.addEventListener("change", e => {
    localStorage.setItem("usuario", e.target.value);
  })

  novoFormTodo.addEventListener("submit", e => {
    e.preventDefault();

    const todo = {
      conteudo: e.target.elements.conteudo.value,
      categoria: e.target.elements.categoria.value,
      completo: false,
      criadoEm: new Date().getDate(),
    }

    todos.push(todo);

    localStorage.setItem("todos", JSON.stringify(todos));

    e.target.reset();

    DisplayTodos();
  })
  DisplayTodos();
})

function DisplayTodos() {
  const todoLista = document.querySelector("#todo-lista");
  todoLista.innerHTML = "";

  todos.forEach(todo => {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");

    const label = document.createElement("label");
    const input = document.createElement("input");
    const span = document.createElement("span");
    const conteudo = document.createElement("div");
    const acao = document.createElement("div");
    const editarBtn = document.createElement("button");
    const deletarBtn = document.createElement("button");

    input.type = "checkbox";
    input.checked = todo.completo;
    span.classList.add("bubble");

    if (todo.categoria == "pessoal") {
      span.classList.add("pessoal");
    } else {
      span.classList.add("negocios");
    }

    conteudo.classList.add("todo-conteudo");
    acao.classList.add("acao");
    editarBtn.classList.add("editar");
    deletarBtn.classList.add("deletar");

    conteudo.innerHTML = `<input type="text" value="${todo.conteudo}" readonly/>`;
    editarBtn.innerHTML = "Editar";
    deletarBtn.innerHTML = "Deletar";

    label.appendChild(input);
    label.appendChild(span);
    acao.appendChild(editarBtn);
    acao.appendChild(deletarBtn);
    todoItem.appendChild(label);
    todoItem.appendChild(conteudo);
    todoItem.appendChild(acao);

    todoLista.appendChild(todoItem);

    if (todo.completo) {
      todoItem.classList.add(completo);
    }

    input.addEventListener("click", e => {
      todo.completo = e.target.checked;
      localStorage.setItem("todos", JSON.stringify(todos));

      if (todo.completo) {
        todoItem.classList.add("completo");
      } else {
        todoItem.classList.remove("completo");
      }

      DisplayTodos();
    })

    editarBtn.addEventListener("click", e => {
      const input = conteudo.querySelector("input");
      input.removeAttribute("readonly");
      input.focus();
      input.addEventListener("blur", e => {
        input.setAttribute("readonly", true);
        todo.conteudo = e.target.value;
        localStorage.setItem("todos", JSON.stringify(todos));
        DisplayTodos();
      })
    })

    deletarBtn.addEventListener("click", e => {
      todos = todos.filter(t => t != todo);
      localStorage.setItem("todos", JSON.stringify(todos));
      DisplayTodos();
    })
  })
}