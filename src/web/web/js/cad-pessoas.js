async function buscaCep()
{
  cep = document.getElementById("cep").value
  
  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
  const Dados = await response.json();
  if (Dados.error)
  {
    //document.getElementById("CEP").value = "Algo Deu Errado no Processo";
    alert("Algo deu Errado no Processo");
  }
  else
  {
    //console.log(Dados.logradouro);
    //document.getElementById("CIDADE").value = Dados.localidade
    document.getElementById("RUA").value = Dados.logradouro
    //console.log(document.getElementById("RUA").value);
  }
}

async function buscaCep2()
{
  cep = document.getElementById("cep2").value
  
  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
  const Dados = await response.json();
  if (Dados.error)
  {
    //document.getElementById("CEP").value = "Algo Deu Errado no Processo";
    alert("Algo deu Errado no Processo");
  }
  else
  {
    //console.log(Dados.logradouro);
    //document.getElementById("CIDADE").value = Dados.localidade
    document.getElementById("RUA2").value = Dados.logradouro
    //console.log(document.getElementById("RUA").value);
  }
}


// API PARA BUSCAR CIDADE DADO UM ESTADO

async function buscarCidadesDadoEstado() {
  try {
 
      const uf = document.getElementById("estado").value;

    
    console.log(uf);

    const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`);
    const dados = await response.json();

    // Verifica se a resposta contém um array de dados
    if (Array.isArray(dados)) {
      // Limpa as opções anteriores
      const selectCidade = document.getElementById("CIDADE");
      selectCidade.innerHTML = "";

      // Adiciona uma opção padrão
      const optionPadrao = document.createElement("option");
      optionPadrao.value = "";
      optionPadrao.textContent = "Selecione sua cidade";
      selectCidade.appendChild(optionPadrao);

      // Itera sobre o array de dados e cria uma opção para cada cidade
      dados.forEach(cidade => {
        const optionCidade = document.createElement("option");
        optionCidade.value = cidade.nome;
        optionCidade.textContent = cidade.nome;
        selectCidade.appendChild(optionCidade);
      });
    } else {
      // Se a resposta não contiver um array de dados, exibe uma mensagem de erro
      throw new Error('Erro ao buscar cidades');
    }
  } catch (error) {
    console.error('Erro:', error);
    alert("Algo deu Errado no Processo");
  }
}

async function buscarCidadesDadoEstado2() {
   try {
  
       const uf = document.getElementById("estado2").value;
 
     
     console.log(uf);
 
     const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`);
     const dados = await response.json();
 
     // Verifica se a resposta contém um array de dados
     if (Array.isArray(dados)) {
       // Limpa as opções anteriores
       const selectCidade = document.getElementById("CIDADE2");
       selectCidade.innerHTML = "";
 
       // Adiciona uma opção padrão
       const optionPadrao = document.createElement("option");
       optionPadrao.value = "";
       optionPadrao.textContent = "Selecione sua cidade";
       selectCidade.appendChild(optionPadrao);
 
       // Itera sobre o array de dados e cria uma opção para cada cidade
       dados.forEach(cidade => {
         const optionCidade = document.createElement("option");
         optionCidade.value = cidade.nome;
         optionCidade.textContent = cidade.nome;
         selectCidade.appendChild(optionCidade);
       });
     } else {
       // Se a resposta não contiver um array de dados, exibe uma mensagem de erro
       throw new Error('Erro ao buscar cidades');
     }
   } catch (error) {
     console.error('Erro:', error);
     alert("Algo deu Errado no Processo");
   }
 }


//VALIDAÇOES


  
  
  function mCpf() {
    var cpf = event.target.value;
    cpf = cpf.replace(/\D/g, "")
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    event.target.value = cpf;
  }
  

         
  
  function mCEP () {
    var cep = event.target.value;
    cep = cep.replace(/\D/g, "")
    cep = cep.replace(/^(\d{2})(\d)/, "$1.$2")
    cep = cep.replace(/.(\d{3})(\d)/, ".$1-$2")
    event.target.value = cep;
  }
  
  // Validar CPF - Andressa
  
  function validarCPF() {
    var cpf = event.target.value;
    var ok = 1;
    var add;
    if (cpf != "") {
       cpf = cpf.replace(/[^\d]+/g, '');
       if (cpf.length != 11 ||
          cpf == "00000000000" ||
          cpf == "11111111111" ||
          cpf == "22222222222" ||
          cpf == "33333333333" ||
          cpf == "44444444444" ||
          cpf == "55555555555" ||
          cpf == "66666666666" ||
          cpf == "77777777777" ||
          cpf == "88888888888" ||
          cpf == "99999999999")
              ok = 0;
       if (ok == 1) {
          add = 0;
          for (i = 0; i < 9; i++)
             add += parseInt(cpf.charAt(i)) * (10 - i);
             rev = 11 - (add % 11);
             if (rev == 10 || rev == 11)
                rev = 0;
             if (rev != parseInt(cpf.charAt(9)))
                ok = 0;
             if (ok == 1) {
                add = 0;
                for (i = 0; i < 10; i++)
                   add += parseInt(cpf.charAt(i)) * (11 - i);
                rev = 11 - (add % 11);
                if (rev == 10 || rev == 11)
                   rev = 0;
                if (rev != parseInt(cpf.charAt(10)))
                   ok = 0;
             }
         }
         if (ok == 0) {
            alert("Ops... Ocorreu um problema... CPF inválido!");
            //event.target.focus();
         }
     }
  }
  
  function mascara(m,t,e){
   var cursor = t.selectionStart;
   var texto = t.value;
   texto = texto.replace(/\D/g,'');
   var l = texto.length;
   var lm = m.length;
   if(window.event) {                  
      id = e.keyCode;
   } else if(e.which){                 
      id = e.which;
   }
   cursorfixo=false;
   if(cursor < l)cursorfixo=true;
   var livre = false;
   if(id == 16 || id == 19 || (id >= 33 && id <= 40))livre = true;
   ii=0;
   mm=0;
   if(!livre){
      if(id!=8){
         t.value="";
         j=0;
         for(i=0;i<lm;i++){
            if(m.substr(i,1)=="#"){
               t.value+=texto.substr(j,1);
               j++;
            }else if(m.substr(i,1)!="#"){
                     t.value+=m.substr(i,1);
                   }
                   if(id!=8 && !cursorfixo)cursor++;
                   if((j)==l+1)break;
                       
         } 	
      }
   }
   if(cursorfixo && !livre)cursor--;
     t.setSelectionRange(cursor, cursor);
  }

  function validarEmail(email) {
   const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   return re.test(String(email).toLowerCase());
}


  //-----------------------REQUISIÇÕES--------------------------------
  window.addEventListener('load', function () {
	recuperaDados();
});


  async function recuperaDados() {
   let URL = "http://localhost:3344/pessoa/";
   let response = await fetch(URL, {
       method: "GET",
       headers: { 'Content-Type': 'application/json' },
   });

   if (response.ok) {
       const data = await response.json();
       console.log(data);
       GETALL(data); 
   } else {
       console.log(response.status + '\n' + JSON.stringify(response));
   }
}

function GETALL(data) {
   let tbody = document.getElementById('tbfisica');
   
  
   tbody.innerHTML = '';

   
   data.forEach(item => {
       let row = document.createElement('tr');
       row.innerHTML = `
       <td>${item.nome}</td>
           <td>${item.tel}</td>
           <td>${item.email}</td>
           <td>${item.cidade}</td>
           <td>${item.bairro}</td>
           <td>${item.cep}</td>
           <td>${item.numero}</td>
           <td>${item.complemento}</td>
           <td>${item.rua}</td>
           <td>${item.fisica.cpf}</td>
           <td>${item.uf}</td>
           <td>${item.fisica.dt_nasc}</td>
           <td>${item.fisica.sexo}</td>
           <td>${item.fisica.rg}</td>
           <td class="alinha-edit-del">
           <a href="#editEmployeeModal-fisica" onclick='CarregaIdParaUpdate(this, "${item.id}", "${item.tel}" ,"${item.nome}", "${item.email}", "${item.cidade}", "${item.bairro}", "${item.cep}", "${item.numero}", "${item.complemento}", "${item.rua}", "${item.fisica.cpf}", "${item.uf}", "${item.fisica.dt_nasc}", "${item.fisica.sexo}", "${item.fisica.rg}")' class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
               <a href="#deleteEmployeeModal-fisica" onclick="CarregaIdParaDelete(${item.id})" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
           </td>
       `
       tbody.appendChild(row);
   });
}

function CarregaIdParaUpdate(event,id,tel, nome, email, cidade, bairro, cep, numero, complemento, rua, cpf, uf, dt_nasc, sexo, rg) {
   console.log(nome);
   console.log("entrei");

   const partesNome = nome.split(" "); 
   const primeiroNome = partesNome[0]; 
   const sobrenome = partesNome.slice(1).join(" "); 

   $('#editEmployeeModal-fisica').find('#nome').val(primeiroNome);
   $('#editEmployeeModal-fisica').find('#sobrenome').val(sobrenome);
    $('#editEmployeeModal-fisica').find('#cel').val(tel);
    $('#editEmployeeModal-fisica').find('#email').val(email);
    $('#editEmployeeModal-fisica').find('#cpf').val(cpf);
    $('#editEmployeeModal-fisica').find('#RUA2').val(rua);
    $('#editEmployeeModal-fisica').find('#NUMERO').val(numero);
    $('#editEmployeeModal-fisica').find('#estado2').val(uf);
    buscarCidadesDadoEstado2();
    $('#editEmployeeModal-fisica').find('#cep2').val(cep);
    
    $('#editEmployeeModal-fisica').find('#complemento').val(complemento);
   $('#editEmployeeModal-fisica').find('#DATA').val(dt_nasc);
   $('#editEmployeeModal-fisica').find('#sexo').val(sexo);
    $('#editEmployeeModal-fisica').find('#rg').val(rg);
    $('#editEmployeeModal-fisica').find('#bairro').val(bairro);
    $('#editEmployeeModal-fisica').find('#CIDADE2').val(cidade);
  
  
   
   
   
}



  async function enviarFormulario() {
   // Coletar os dados do formulário
   const nome = document.getElementById('nome').value;
   const sobrenome = document.getElementById('sobrenome').value;
   const tel = document.getElementById('cel').value.replace(/\D/g, ''); // Remove caracteres não numéricos
   const email = document.getElementById('email').value;
   const cpf = document.getElementById('cpf').value.replace(/\D/g, ''); // Remove pontos e traços
   const cep = document.getElementById('cep').value.replace(/\D/g, ''); // Remove caracteres não numéricos;
   const rua = document.getElementById('RUA').value;
   const numero = document.getElementById('NUMERO').value;
   const complemento = document.getElementById('complemento').value;
   const uf = document.getElementById('estado').value;
   const cidade = document.getElementById('CIDADE').value;
   const dt_nasc = document.getElementById('DATA').value;
   const rg = document.getElementById('rg').value;
   const sexo = document.getElementById('sexo').value;
   const bairro = document.getElementById('bairro').value;


   if (!validarEmail(email)) {
      alert('Por favor, insira um e-mail válido.');
      return;
  }
  if (!nome || !tel || !email || !cpf || !cep || !uf || !cidade || !dt_nasc || !sexo || !rg) {
   alert('Por favor, preencha todos os campos obrigatórios.');
   return;
   }
   // Criar o objeto JSON
   const dados = {
       nome: nome + ' ' + sobrenome,
       tel: tel,
       email: email,
       cidade: cidade,
       bairro: bairro, 
       cep: cep,
       numero: numero,
       complemento: complemento,
       rua: rua,
       cpf: cpf,
       uf: uf,
       pessoaFisica: {
           dt_nasc: dt_nasc,
           sexo: sexo, 
           rg: rg   
       }
   };
   console.log(JSON.stringify(dados));
   

   // Enviar os dados usando fetch
   try {
       const response = await fetch('http://localhost:3344/pessoa/cadastrar', {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify(dados)
       });

       if (!response.ok) {
           throw new Error('Erro na requisição');
       }

       const respostaJson = await response.json();
       console.log('Resposta do servidor:', respostaJson);
       alert('Dados enviados com sucesso!');
       location.reload();
   } catch (error) {
       console.error('Erro:', error);
       alert('Erro ao enviar os dados.');
   }
}


async function alterarFormulario() {
   // Coletar os dados do formulário
   const nome = $('#editEmployeeModal-fisica').find('#nome').val();
   const sobrenome = $('#editEmployeeModal-fisica').find('#sobrenome').val();
   const tel = $('#editEmployeeModal-fisica').find('#cel').val().replace(/\D/g, '');
   const email = $('#editEmployeeModal-fisica').find('#email').val();
   const cpf = $('#editEmployeeModal-fisica').find('#cpf').val().replace(/\D/g, '');
   const cep = $('#editEmployeeModal-fisica').find('#cep2').val().replace(/[^\d]/g, '');
   const rua = $('#editEmployeeModal-fisica').find('#RUA2').val();
   const numero = $('#editEmployeeModal-fisica').find('#NUMERO').val();
   const complemento = $('#editEmployeeModal-fisica').find('#complemento').val();
   const uf = $('#editEmployeeModal-fisica').find('#estado2').val();
   const cidade = $('#editEmployeeModal-fisica').find('#CIDADE2').val();
   const dt_nasc = $('#editEmployeeModal-fisica').find('#DATA').val();
   const rg = $('#editEmployeeModal-fisica').find('#rg').val();
   const sexo = $('#editEmployeeModal-fisica').find('#sexo').val();
   const bairro = $('#editEmployeeModal-fisica').find('#bairro').val();
   console.log("etrenidasdjas");


   if (!validarEmail(email)) {
      alert('Por favor, insira um e-mail válido.');
      return;
  }
  if (!nome || !tel || !email || !cpf || !cep || !uf || !cidade || !dt_nasc || !sexo || !rg) {
   alert('Por favor, preencha todos os campos obrigatórios.');
   return;
   }
   // Criar o objeto JSON
   const dados = {
       nome: nome + ' ' + sobrenome,
       tel: tel,
       email: email,
       cidade: cidade,
       bairro: bairro, 
       cep: cep,
       numero: numero,
       complemento: complemento,
       rua: rua,
       cpf: cpf,
       uf: uf,
       pessoaFisica: {
           dt_nasc: dt_nasc,
           sexo: sexo, 
           rg: rg   
       }
   };
   console.log(JSON.stringify(dados));
   

   // Enviar os dados usando fetch
   try {
       const response = await fetch('http://localhost:3344/pessoa/update', {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify(dados)
       });

       if (!response.ok) {
           throw new Error('Erro na requisição');
       }

       const respostaJson = await response.json();
       console.log('Resposta do servidor:', respostaJson);
       alert('Dados enviados com sucesso!');
       location.reload();
   } catch (error) {
       console.error('Erro:', error);
       alert('Erro ao enviar os dados.');
   }
}
 
 
        

 

  

  

  