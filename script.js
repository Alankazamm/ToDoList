
//Model
	let todos = []; //variável que armazenará as tarefas, 'To Dos'
	const savedTodos = JSON.parse(localStorage.getItem('items'));
	if(Array.isArray(savedTodos))
	{
		 todos = savedTodos;
	}
	
	//Adciona os dados pegos ao clicar em 'add-button' no vetor 'todos'
	function addTodo(title, dueDate)
	{
		//cria uma id para cada objeto 'todo' que será armazenado no vetor
		//obs.: o '' é necessário para converter o id em string, pois nos outros casos o valor id por padrão
		//da linguagem, estarao em string, e ao fazer comparacao ocorre erro todo.id === todoId...
		id = '' + new Date().getTime() 
		//o id é o valor da data em milisegundos do momento que se clica no 'add-button'
		//metodo push para levar ao vetor, em objeto os valores: id, titulo e data
		todos.push
		({
			title: title,
			date: dueDate,
			id:id
		})
		saveTodos();
	
	}
	
	function deleteTodo(todoId)
	{
		//como o metodo filter faz copia e nao modifica o vetor em si, copiamos a copia para o vetor original
		//e fazemos a filtragem, pra remover do vetor, o item que possui o id do botao deletar, seu referente
		todos = todos.filter(function(todo)
		{
			//se o id for igual o id do botao deletar
			if(todo.id === todoId)
			{
				//remove
				return false;
			}
			else
			{
				//senao repasse para o vetor filtrado o elemento integro
				return true
			}
		});	
		saveTodos();
	}
	//funçao que lembrará se tal item está checado e habilitar essa mudança dinamica junto a renderização
	function checkTodo(todoId, checked)
	{
		//localizar o 'todo' correspondente
		todos.forEach(function(todo)
		{
			if(todo.id === todoId)
			{
				//se for o mesmo item, armazena o valor de estado da checkbox em uma variavel
				todo.isChecked = checked;
			}
		});
		saveTodos();
	}
	
	function editTodo(todoId){
		
		todos.forEach(function(todo)
		
		{
			if(todo.id === todoId)
			{
				todo.isEditing = true;
			}
		});
		
		saveTodos();
		
	}
	
	function updateTodo(newTitle,newDate,todoId)
	{
		todos.forEach(function(todo)
		{
			if(todo.id === todoId)
			{
				todo.title = newTitle;
				todo.date = newDate;
				todo.isEditing = false;
			}
		});
		saveTodos();
		
	}
	
	function saveTodos(){
		localStorage.setItem('items',JSON.stringify(todos));
	}


//View
	
	//Elementos HTML a serem criados em 'index.html'
		//Div principal do App
		const mainDiv = document.createElement('div');
		mainDiv.classList.add('main-div');
		document.body.appendChild(mainDiv);
		
		const header= document.createElement('h1');
		header.innerText = 'À fazeres:';
		mainDiv.appendChild(header);
		
		const mainItems = document.createElement('div');
		mainItems.classList.add('main-items-div');
		mainDiv.appendChild(mainItems);
		//Caixa de texto principal
		const mainTextbox = document.createElement('input');
		mainTextbox.type = 'text';
		mainTextbox.id = 'main-textbox';
		mainTextbox.classList.add('textbox');
		mainItems.appendChild(mainTextbox);
		
		//Calendário
		const mainDatePicker = document.createElement('input');
		mainDatePicker.classList.add('date-picker');
		mainDatePicker.type = 'date';
		mainDatePicker.id = 'main-date-picker';
		mainItems.appendChild(mainDatePicker);
		
		//Botao de adcionar
		const addButton = document.createElement('button');
		
		addButton.id = 'add-button';
		addButton.innerText = 'Adcionar';
		addButton.onclick = onAdd;
		mainItems.appendChild(addButton);
		
		//filtrar
		
		const filterDiv = document.createElement('div');
		filterDiv.classList.add('filter-div');
		mainItems.appendChild(filterDiv);
		const filterLabel = document.createElement('label');
		filterLabel.htmlFor = 'filter-select';
		filterLabel.innerText = 'Filtrar:';
		filterLabel.classList.add('filter-label');
		
		
		
		filterDiv.appendChild(filterLabel);
		const filter = document.createElement('select');
		filter.id = 'filter-select';
		
		
		const feitosEnFeitos = document.createElement('option');
		feitosEnFeitos.value = 0;
		feitosEnFeitos.text = 'Todos';
		filter.options.add(feitosEnFeitos,0);
		filterDiv.appendChild(filter);
		const nFeitos = document.createElement('option');
		nFeitos.value =1;
		nFeitos.text = 'Não feitos';
		filter.options.add(nFeitos,1);
		const feitos = document.createElement('option');
		feitos.value = 2;
		feitos.text = 'Feitos';
		filter.options.add(feitos,2);
		
		//Cria a div da lista onde seus itens serao alocados e gerados dinamicamente
		const todoList = document.createElement('div');
		todoList.classList.add('todo-list');
		mainDiv.appendChild(todoList);
		filter.onchange = onFilter;
		
		render();
		
	//Renderização dos conteúdos dinamicos
	function render()
	{
		
		//limpa a lista antes de renderizar novamente para evitar duplicatas por resquicio
		todoList.innerHTML = '';
		
		//estrutura de repetição, para cada objeto 'todo' do vetor, será renderizado seus dados
		todos.forEach
		(function(todo)
			{
				//cria item em elemento 'li'
				const todoItem = document.createElement('div');
				todoItem.classList.add('todo-item');
				todoItem.id = todo.id;
				
				
				if(todo.isEditing === true){
					const editTextDiv = document.createElement('div');
					editTextDiv.classList.add('edit-text-div');
					todoItem.appendChild(editTextDiv);
					const editBox = document.createElement('input');
					editBox.type = 'text';
					editBox.classList.add('textbox');
					editBox.id = 'edit-box-' + todo.id;
					editTextDiv.appendChild(editBox);
					
					const editOthersDiv = document.createElement('div');
					editOthersDiv.classList.add('edit-others-div');
					todoItem.appendChild(editOthersDiv);
					const editDate = document.createElement('input');
					editDate.type = 'date';
					editDate.classList.add('date-picker');
					editDate.id = 'edit-dat-' + todo.id;
					editOthersDiv.appendChild(editDate);
					
					const updateButton = document.createElement('button');
					updateButton.innerText = 'Atualizar';
					updateButton.classList.add('btn');
					updateButton.dataset.todoId = todo.id;
					updateButton.classList.add('btn','update-btn');
					updateButton.onclick = onUpdate;
					editOthersDiv.appendChild(updateButton);
					
				}
				else
				{
					//mostrar conteudo do Item
					const todoText = document.createElement('div');
					todoText.innerText = todo.title +  ' ' + todo.date;
					todoText.classList.add('todo-text');
					todoItem.appendChild(todoText);
					//cria botao de deletar
					const btnsDiv = document.createElement('div');
					btnsDiv.classList.add('btns-div');
					todoItem.appendChild(btnsDiv);
					const deleteButton = document.createElement('button');
					deleteButton.innerText = 'Deletar';
					deleteButton.classList.add('btn','delete-btn');
					//parea o id do botao com o item com que ele é renderizado junto
					deleteButton.dataset.todoId = todo.id;
					//funcao para deletar o item ao clicar no botao
					deleteButton.onclick = onDelete;
					btnsDiv.appendChild(deleteButton);
					
					//criar botao editar item
					
					const editButton = document.createElement('button');
					editButton.innerText = 'Editar';
					editButton.classList.add('btn','edit-btn');
					editButton.dataset.todoId = todo.id;
					editButton.onclick = onEdit;
					btnsDiv.appendChild(editButton);
					
					//criar Checkbox
					const checkDiv = document.createElement('div');
					checkDiv.classList.add('check-div');
					todoText.prepend(checkDiv);
					const checkBox = document.createElement('input');
					checkBox.type = 'checkbox';
					checkBox.dataset.todoId = todo.id;
					checkBox.classList.add('checkbox');
					//precisamos dessa funçao para que sempre quando renderizada a lista, 
					//o valor da checkbox seja 'lembrado'
					checkBox.onchange = onCheck;
					//se esse item ja foi checado, manter checado quando atualizar lista
					//simetricamente igual, seu oposto
					if(todo.isChecked === true)
					{
						checkBox.checked = true;
					}
					else{
						checkBox.checked = false;
					}
					//anexar antes do titulo do item
					checkDiv.appendChild(checkBox);
				}
				//exibir na lista
				if(filter.value === '1')
				{
					if(todo.isChecked !== true)
					{
						todoList.appendChild(todoItem);
					}
				}
				else if (filter.value === '2')
				{
					if(todo.isChecked === true)
					{
						todoList.appendChild(todoItem);
					}
				}
				else{
					todoList.appendChild(todoItem);
				}
				
			
			}
		);
		
	}


//Controllers
	//adciona dados da 'main-textbox' e 'main-date-picker' ao clicar no botao 'add-button' à matriz 'todos'
	function onAdd()
	{
		//pega os valores da 'main-textbox' e transforma em variavel
		const textbox = document.getElementById('main-textbox');
		const title = textbox.value;
		
		//pega os valores do 'main-date-picker' e transforma em variavel]
		const datePicker = document.getElementById('main-date-picker');
		let dueDate = datePicker.value;
		if(dueDate !=='')
		{
			dueDate = dayjs(dueDate).format('DD/MM/YYYY');
		}
		//leva os valores para a função modelo
		addTodo(title,dueDate);
		//renderiza a página através da função view
		render();				
	}
	
	//funcao de quando clica-se no 'deleteButton'
	function onDelete(event)
	{
		//o alvo do que desencadeou a funcao, o botao clicado, dentre varios, pega-se o valor do especifico
		const deleteButton = event.target
		//pegamos o id relativo ao botao pareado ao id do Item a ser deletado
		const todoId = deleteButton.dataset.todoId;
		//chamamos a funçao para remover do vetor 
		deleteTodo(todoId);
		//renderizamos o estado atualizado do vetor/lista
		render();
	}
	
	//Funcao de quando clica-se na checkbox
	function onCheck(event)
	{
		const checkBox = event.target;
		const todoId = checkBox.dataset.todoId;
		const checked = checkBox.checked;
		
		//chamar a funçao que modificara nossos dados
		checkTodo(todoId, checked);
		
		//renderizar
		render();
		
	}
	
	function onEdit(event)
	{
		const editButton = event.target;
		const todoId = editButton.dataset.todoId;
		
		editTodo(todoId);
		render();
		
	}
	function onUpdate(event)
	{
		const updateButton = event.target;
		const todoId = updateButton.dataset.todoId;
		const textbox = document.getElementById('edit-box-'+todoId);
		const newTitle = textbox.value;
		const datePicker = document.getElementById('edit-dat-'+todoId);
		let newDate = datePicker.value;
		if(newDate !=='')
		{
			newDate = dayjs(newDate).format('DD/MM/YYYY');
		}
		
		
		updateTodo(newTitle,newDate,todoId);
		render();
		
	}
	
	function onFilter(){
		render();	
	
	}