
async function CadastrarTipoDespesa ()
{
	let URL = "http://localhost:3344/despesa/cadastrar-tipo";
  	let nome = document.getElementById("nome").value;
	

    if(nome.length === 0){
        alert("Preencha todos os campos.");
        return;
    }

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

		alert('Tipo de Despesa criado.')
		RecuperaTipoDespesa();
	}
    else {
        alert("Tipo de Despesa já cadastrado.");
    console.log(response + '\n' + JSON.stringify(response));
    }
}


async function RecuperaTipoDespesa() {
    let URL = "http://localhost:3344/despesa/listar-todos-tipos";
    let response = await fetch(URL, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        const data = await response.json();
        GetAllTipoDespesa(data); // Chama a função para preencher a tabela com os dados recebidos
    } else {
        console.log(response.status + '\n' + JSON.stringify(response));
    }
}

function GetAllTipoDespesa(data) {
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
                <a href="#editEmployeeModal" onclick="CarregaIdParaDelete(this)" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                <a href="#deleteEmployeeModal" onclick="CarregaIdParaDelete(this)" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function CarregaIdParaDelete (event)
{
	let id = event.parentNode.parentNode.firstElementChild.firstElementChild.id;
	//console.log(id);
	document.getElementById("MODAL_DELETE_Id").dataset.userId = id;
	console.log(document.getElementById("MODAL_DELETE_Id").dataset.userId);
}

async function DeletarTipoDespesa (event)
{

	let id = event.dataset.userId;
	console.log(id);
    let URL = "http://localhost:3344/despesa/excluir-tipo/"+id;
    let response = await fetch(URL,{
        method : "DELETE"
    })

    if (response.ok){
        alert("Tipo de despesa excluído.");
        RecuperaTipoDespesa();
    }
   else{
        const data = await response.json();
        alert(data)
   }
}

async function AlterarTipoDespesa (event)
{
	console.log(event.dataset.userId);
    let id = event.dataset.userId;
	let novoNome = document.getElementById("novo_nome").value;

    if(novoNome.length === 0){
        alert("Preencha todos os campos.");
        return;
    }

	let URL = "http://localhost:3344/despesa/alterar-tipo/"+id;
	let json = {
		nome : novoNome
	}

	let response = await fetch(URL,{ 
		method : "PUT",
		headers: {'Content-Type': 'application/json'},
		body : JSON.stringify(json)
	});

	if (response.ok)
	{
		alert("Nome alterado.");
		RecuperaUsuario();
	}
	else
	{
		console.log(response + '\n' + JSON.stringify(response))
	}

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


window.addEventListener('load', function () {
	RecuperaTipoDespesa();
});
