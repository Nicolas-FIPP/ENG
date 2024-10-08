
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
	if (nome != "")
	{
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
			console.log("Cadastrou");
			document.getElementById("NOME").value = "";
			RecuperaTipoOficina();
		}
		else
		{
			console.log(response + '\n' + JSON.stringify(response))
		}
	}
	else
	{
		alert("Algum Campo Importante está vazio, Preencha ele por favor.")
	}
}

async function RecuperaTipoOficina() {
    let URL = "http://localhost:3344/tipo-oficina/todos-tipos-oficinas";
    let response = await fetch(URL, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        const data = await response.json();
        GETALL(data); // Chama a função para preencher a tabela com os dados recebidos
    } else {
        console.log(response.status + '\n' + JSON.stringify(response));
    }
}

function GETALL(data) {
    let tbody = document.querySelector('.table tbody');
    
    // Limpa qualquer conteúdo pré-existente na tabela
    tbody.innerHTML = '';

    // Itera sobre os dados e adiciona linhas à tabela
    data.forEach(item => {
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <span id=${item.id}>
                </span>
            </td>
            <td>${item.nome}</td>
            <td class="alinha-edit-del">
                <a href="#editEmployeeModal" onclick="CarregaIdParaUpdate(this)" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                <a href="#deleteEmployeeModal" onclick="CarregaIdParaDelete(this)" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
            </td>
        `;
        tbody.appendChild(row);
    });
}


function CarregaTabelaFiltrada (StringDoFiltro)
{
	let tabela = document.getElementById("tabela-tbody");
	console.log(tabela);

	if (tabela)
		for (let i = 0; i < tabela.children.length; i++) 
				if (tabela.children[i].children[1].innerHTML.toLowerCase().includes(StringDoFiltro.toLowerCase()))
					tabela.children[i].style.display = "table-row";
				else
					tabela.children[i].style.display = "none";
}


function CarregaIdParaDelete (event)
{
	let id = event.parentNode.parentNode.firstElementChild.firstElementChild.id;
	//console.log(id);
	document.getElementById("MODAL_DELETE_Id").dataset.userId = id;
	console.log(document.getElementById("MODAL_DELETE_Id").dataset.userId);
}

function CarregaIdParaUpdate (event)
{
	let colunas = event.parentNode.parentNode.children;
	let nome = colunas[1].innerHTML;
	let id = colunas[0].firstElementChild.id;
	document.getElementById("MODAL_EDIT_Nome").value = nome;
	document.getElementById("MODAL_EDIT_Id").dataset.userId = id;
	//console.log(document.getElementById("MODAL_EDIT_Nome").value);
	//console.log(document.getElementById("MODAL_EDIT_Id").dataset.userId);
}


async function DeletaTipoOficina (event)
{
	let id = event.dataset.userId;
	console.log(id);
	let URL = "http://localhost:3344/tipo-oficina/deletar-tipo-oficina/"+id;
	let response = await fetch(URL,{
		method : "DELETE"
	})
	if (response.ok)
		console.log("Deu Algo Errado");
	RecuperaTipoOficina();
}


async function AlterarTipoOficina (event)
{
	let id = event.dataset.userId;
	let nome = document.getElementById("MODAL_EDIT_Nome").value;
	if (nome != "")
	{
		let URL = "http://localhost:3344/tipo-oficina/altera-tipo-oficina/"+id;
		let json = {
			nome : nome
		}

		let response = await fetch(URL,{
			method : "PUT",
			headers: {'Content-Type': 'application/json'},
			body : JSON.stringify(json)
		});

		if (response.ok)
		{
			//alert('Tipo de oficina Alterada')
			console.log("DEU CERTO");
			RecuperaTipoOficina();
		}
		else
		{
			console.log(response + '\n' + JSON.stringify(response))
		}
	}
	else
	{
		alert("Algum Campo Importante está vazio, Preencha ele por favor.");
	}
}


window.addEventListener('load', function () {
	RecuperaTipoOficina();
});
