
/*
$(document).ready(function(){
	// Activate tooltip
	$('[data-toggle="tooltip"]').tooltip();
	
	// Select/Deselect checkboxes
	var checkbox = $('table tbody input[type="checkbox"]');
	$("#selectAll").click(function(){
		if(this.checked){
			checkbox.each(function(){
				this.checked = true;                        
			});
		} else{
			checkbox.each(function(){
				this.checked = false;                        
			});
		} 
	});
	checkbox.click(function(){
		if(!this.checked){
			$("#selectAll").prop("checked", false);
		}
	});
});

*/

////////////////////////////////////////////////////////////////


async function CadastraNovoTipodeOficina ()
{
	let URL = "http://localhost:3344/tipo-oficina/cadastrar-tipo-oficina";
  let nome = document.getElementById("NOME").value;
	json = {
		nome: nome
	}
	console.log(JSON.stringify(json));
	let response = await fetch(URL,{
		method: "POST",
		headers: {'Content-Type': 'application/json'},
		body : JSON.stringify(json)
	});

	if (response.ok){

		alert('Tipo de oficina criada')
		GetAll();
	}
		//console.log('criado')
	else
	{
		console.log(response + '\n' + JSON.stringify(response))

	}
}

async function GetAll() {
    let URL = "http://localhost:3344/tipo-oficina/todos-tipos-oficinas";
    let response = await fetch(URL, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        const data = await response.json();
        populateTable(data); // Chama a função para preencher a tabela com os dados recebidos
    } else {
        console.log(response.status + '\n' + JSON.stringify(response));
    }
}

function populateTable(data) {
    let tbody = document.querySelector('.table tbody');
    
    // Limpa qualquer conteúdo pré-existente na tabela
    tbody.innerHTML = '';

    // Itera sobre os dados e adiciona linhas à tabela
    data.forEach(item => {
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <span class="custom-checkbox">
                    <input type="checkbox" id="checkbox${item.id}" name="options[]" value="${item.id}">
                    <label for="checkbox${item.id}"></label>
                </span>
            </td>
            <td>${item.nome}</td>
            <td class="alinha-edit-del">
                <a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                <a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
            </td>
        `;
        tbody.appendChild(row);
    });
}

window.addEventListener('load', function () {
    GetAll();
});
