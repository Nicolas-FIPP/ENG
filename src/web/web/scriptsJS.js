
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
		console.log("Cadastrou");
		document.getElementById("NOME").value = "";
		RecuperaTipoOficina();
	}
	else
	{
		console.log(response + '\n' + JSON.stringify(response))
	}
}

async function CadastraOficina ()
{
	console.log('aaaaaaaaaaaaaaaaaaaaaaaa')
	let URL = "http://localhost:3344/oficina/cadastrar-oficina";

	  const oficinaData = {
		
		limite: parseInt(document.getElementById('limite').value),
		disciplina: document.getElementById('disciplina').value,
		sala: parseInt(document.getElementById('sala').value),
		dt_ini: new Date (document.getElementById('dt_ini').value),
		dt_fim: new Date (document.getElementById('dt_fim').value),
		dias_funcionamento: document.getElementById('dias_funcionamento').value,
		pes_id: parseInt(document.getElementById('pessoa').value),
		tof_id: parseInt(document.getElementById('tipo_oficina').value)
	};
	console.log(JSON.stringify(oficinaData));
	let response = await fetch(URL,{
		method: "POST",
		headers: {'Content-Type': 'application/json'},
		body : JSON.stringify(oficinaData)
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

async function RecuperaOficina() {
	let URL = ""

	if (document.getElementById("CadOficina") == undefined) URL = "http://localhost:3344/tipo-oficina/todos-tipos-oficinas"
	else URL = "http://localhost:3344/oficina/listar-todos-oficina"; // essa linha no html só existe no html de Oficina, ISSO sim é feature <td id="CadOficina">Aula</td> linha 63 

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




async function RecuperaTipoOficina() {
	let URL = ""

	if (document.getElementById("CadOficina") == undefined) URL = "http://localhost:3344/tipo-oficina/todos-tipos-oficinas"
	else URL = "http://localhost:3344/oficina/listar-todos-oficina"; // essa linha no html só existe no html de Oficina, ISSO sim é feature <td id="CadOficina">Aula</td> linha 63 

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
	console.log(data)
    let tbody = document.querySelector('.table tbody');
    
    // Limpa qualquer conteúdo pré-existente na tabela
    tbody.innerHTML = '';

    // Itera sobre os dados e adiciona linhas à tabela
	if (document.getElementById("CadOficina")){

		data.forEach(item => {
			
			let row = document.createElement('tr');
			row.innerHTML = `
				<td>
					<span id=${item.id}>
					</span>
				</td>
				<td>${item.nome}</td>
				<td class="alinha-edit-del">
					<a href="#editEmployeeModal" onclick="CarregaIdParaUpdateOficina(this)" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
					<a href="#deleteEmployeeModal" onclick="CarregaIdParaDelete(this)" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
				</td>
			`;
			tbody.appendChild(row);
		});
	}
	else{


		data.forEach(item => {
			
			let row = document.createElement('tr');
			row.innerHTML = `
				<td>
					<span id=${item.id}>
					</span>
				</td>
				<td>${item.disciplina}</td>
				<td class="alinha-edit-del">
					<a href="#editEmployeeModal" onclick="CarregaIdParaUpdateOficina(this)" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
					<a href="#deleteEmployeeModal" onclick="CarregaIdParaDelete(this)" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
				</td>
			`;
			tbody.appendChild(row);
		});

	}
}


function CarregaIdParaDelete (event)
{
	let id = event.parentNode.parentNode.firstElementChild.firstElementChild.id;

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


async function CarregaIdParaUpdateOficina(event) {
    let colunas = event.parentNode.parentNode.children;
    let id = colunas[0].firstElementChild.id;
    let URL = `http://localhost:3344/oficina/${id}`;
    let response = await fetch(URL, { method: "GET" });

    if (response.ok) {
        let infos = await response.json();
        document.getElementById("limiteEDIT").value = infos.limite;
        document.getElementById("disciplinaEDIT").value = infos.disciplina;
        document.getElementById("salaEDIT").value = infos.sala;
        document.getElementById("dt_iniEDIT").value = formatDate(infos.dt_ini);
        document.getElementById("dt_fimEDIT").value = formatDate(infos.dt_fim);
        document.getElementById("dias_funcionamentoEDIT").value = infos.dias_funcionamento;
        document.getElementById("MODAL_EDIT_Id").dataset.userId = id;

        // Populando os selects
        await populateSelect("tipo_oficinaEDIT", "http://localhost:3344/tipo-oficina/todos-tipos-oficinas");
        await populateSelect("pessoaEDIT", "http://localhost:3344/pessoa/mostrar-todas-pessoas");

        // Seleciona o valor correto
        document.getElementById("tipo_oficinaEDIT").value = infos.tof_id;
        document.getElementById("pessoaEDIT").value = infos.pes_id;
    }
}
function formatDate(dateString) {
	console.log(dateString)
    const [datePart] = dateString.split('T');
    return datePart;
}



async function populateSelect(selectId, apiURL) {
    let select = document.getElementById(selectId);
    let response = await fetch(apiURL, { method: "GET" });
    if (response.ok) {
        let options = await response.json();
        select.innerHTML = '<option value="">Selecione uma opção</option>';
        options.forEach(option => {
            let opt = document.createElement('option');
            opt.value = option.id;
            opt.innerHTML = option.nome; 
            select.appendChild(opt);
        });
    }
}

//"id": 1,
//"limite": 30,
//"disciplina": "trds",
//"sala": 1,
//"dt_ini": "2024-05-15T00:00:00.000Z",
//"dt_fim": "2024-05-15T00:00:00.000Z",
//"dias_funcionamento": "1",
//"criado_em": "2024-05-24T03:12:29.259Z",
//"pes_id": 1,
//"tof_id": 1

async function DeletaOficina (event)
{
	let id =document.getElementById("MODAL_DELETE_Id").dataset.userId;
	
	let URL = "http://localhost:3344/oficina/excluir-oficina/"+id;
	let response = await fetch(URL,{
		method : "DELETE"
	})
	if (response.ok)
		console.log("Deu certo")
	RecuperaTipoOficina();
}


async function AlterarOficina (event)
{

	let id = event.dataset.userId;
	/*
	id: number                   
	limite: number               
	disciplina: string           
	sala  : number               
	dt_ini : Date                
	dt_fim : Date               
	dias_funcionamento: string  
	criado_em: Date            
	pes_id:number                
	tof_id :number
	*/
	let limite = document.getElementById("limiteEDIT").value 
	let disciplina = document.getElementById("disciplinaEDIT").value 
	let sala = document.getElementById("salaEDIT").value 
	let dt_ini = document.getElementById("dt_iniEDIT").value 
	let dt_fim =document.getElementById("dt_fimEDIT").value 
	let dias_funcionamento = document.getElementById("dias_funcionamentoEDIT").value 
	let criado_em = document.getElementById("MODAL_EDIT_Id").dataset.userId 
	let pes_id = document.getElementById("tipo_oficinaEDIT").value 
	let tof_id = document.getElementById("pessoaEDIT").value 
	
	console.log(limite)
	
	let URL = "http://localhost:3344/oficina/alterar-oficina/"+id;
	let json = {
		limite: parseInt(limite),
		disciplina,
		sala: parseInt(sala),
		dt_ini: new Date(dt_ini),
		dt_fim: new Date(dt_fim),
		dias_funcionamento,
		pes_id: parseInt (pes_id),
		tof_id: parseInt (tof_id)
	}
	console.log(json)
	
	let response = await fetch(URL,{
		method : "PUT",
		headers: {'Content-Type': 'application/json'},
		body : JSON.stringify(json)
	});

	if (response.ok)
	{
		//alert('Tipo de oficina Alterada')
		console.log("DEU CERTO");
		//RecuperaTipoOficina();
	}
	else
	{
		console.log(response + '\n' + JSON.stringify(response))
	}

}










document.addEventListener('DOMContentLoaded', function() {

    function preencherOrgaosCompetentes() {
        fetch('http://localhost:3344/tipo-oficina/todos-tipos-oficinas')
            .then(response => response.json())
            .then(data => {
               
                var selectOrgao = document.getElementById('tipo_oficina');
                selectOrgao.innerHTML = '<option value="">Selecione um tipo de oficina</option>';
                data.forEach(orgao => {
                    var option = document.createElement('option');
                    option.value = orgao.id;
                    option.text = orgao.nome;
                    selectOrgao.appendChild(option);
                });
            })
            .catch(error => console.log('Erro ao buscar órgãos competentes:', error));
    }

    function preencherTiposProblemas() {
        
        fetch('http://localhost:3344/pessoa/mostrar-todas-pessoas')
            .then(response => response.json())
            .then(data => {
             var selectTipoProblema = document.getElementById('pessoa');
            selectTipoProblema.innerHTML = '<option value="">Selecione um Funcionário</option>';
            data.forEach(tipo => {
				console.log(tipo)
                   var option = document.createElement('option');
                 	option.value = tipo.id;
                    option.text = tipo.nome;
                   selectTipoProblema.appendChild(option);
                });
            })
            .catch(error => console.log('Erro ao buscar tipos de problemas:', error));
   }

    preencherOrgaosCompetentes();
    preencherTiposProblemas();
});


window.addEventListener('load', function () {
	RecuperaTipoOficina();
});
