
async function CadastrarUsuario ()
{
	let URL = "http://localhost:3344/usuario/cadastrar";
  	let cpf = document.getElementById("cpf").value;
	let senha = document.getElementById("senha").value;
	json = {
		cpf: cpf,
		senha: senha,
		nivel_acesso: 1
	}
	console.log(JSON.stringify(json));
	let response = await fetch(URL,{
		method: "POST",
		headers: {'Content-Type': 'application/json'},
		body : JSON.stringify(json)
	});

	if (response.ok){

		alert('Usuário criado')
		RecuperaUsuario();
	}
	else
	{
		console.log(response + '\n' + JSON.stringify(response))
	}
}

async function RecuperaUsuario() {
    let URL = "http://localhost:3344/usuario/get-todos-usuarios";
    let response = await fetch(URL, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        const data = await response.json();
        GetAllUsuarios(data); // Chama a função para preencher a tabela com os dados recebidos
    } else {
        console.log(response.status + '\n' + JSON.stringify(response));
    }
}


function GetAllUsuarios(data) {
    let tbody = document.querySelector('.table tbody');
    
    // Limpa qualquer conteúdo pré-existente na tabela
    tbody.innerHTML = '';

    // Itera sobre os dados e adiciona linhas à tabela
    data.forEach(item => {
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <span id=${item.nivel_acesso}>
                </span>
            </td>
            <td>${item.cpf}</td>
            <td class="alinha-edit-del">
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


async function DeletarUsuario (event)
{
    console.log("aaaaaaaaaaaaaaaaaaaaaaaa");

	let id = event.dataset.userId;
	console.log(id);
	let URL = "http://localhost:3344/usuario/inativar-usuario/"+id;
	let response = await fetch(URL,{
		method : "DELETE"
	})
	if (response.ok)
		console.log("Deu Algo Errado");
	RecuperaTipoOficina();
}

document.addEventListener('DOMContentLoaded', function () {
    var cpfInput = document.getElementById('cpf');

    cpfInput.addEventListener('input', function (event) {
        var value = cpfInput.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
        var formattedValue = '';

        if (value.length > 0) {
            formattedValue = value.substring(0, 3);
        }
        if (value.length > 3) {
            formattedValue += '.' + value.substring(3, 6);
        }
        if (value.length > 6) {
            formattedValue += '.' + value.substring(6, 9);
        }
        if (value.length > 9) {
            formattedValue += '-' + value.substring(9, 11);
        }

        cpfInput.value = formattedValue;
    });
});



window.addEventListener('load', function () {
	RecuperaUsuario();
});
