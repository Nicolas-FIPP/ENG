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

function validarCPF2(cpf) {
  cpf = cpf.replace(/[^\d]+/g, '');

  if (cpf.length !== 11) {
    return false;
  }

  // Elimina CPFs conhecidos que são inválidos
  if (/^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  // Valida DVs
  let soma = 0;
  let resto;

  for (let i = 1; i <= 9; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }
  resto = (soma * 10) % 11;

  if (resto === 10 || resto === 11) {
    resto = 0;
  }
  if (resto !== parseInt(cpf.substring(9, 10))) {
    return false;
  }

  soma = 0;
  for (let i = 1; i <= 10; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }
  resto = (soma * 10) % 11;

  if (resto === 10 || resto === 11) {
    resto = 0;
  }
  if (resto !== parseInt(cpf.substring(10, 11))) {
    return false;
  }

  return true;
}


function validarCNPJ(campo) {
  var cnpj = campo.value.replace(/\D/g, '');
  var cnpjMsg = document.getElementById('cnpj-msg');

  if (cnpj.length !== 14) {
      cnpjMsg.textContent = 'CNPJ inválido';
      cnpjMsg.className = 'error';
      return false;
  }

  var tamanho = cnpj.length - 2;
  var numeros = cnpj.substring(0, tamanho);
  var digitos = cnpj.substring(tamanho);
  var soma = 0;
  var pos = tamanho - 7;

  for (var i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
  }

  var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado !== parseInt(digitos.charAt(0))) {
      cnpjMsg.textContent = 'CNPJ inválido';
      cnpjMsg.className = 'error';
      return false;
  }

  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;

  for (var i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
  }

  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado !== parseInt(digitos.charAt(1))) {
      cnpjMsg.textContent = 'CNPJ inválido';
      cnpjMsg.className = 'error';
      return false;
  }

  cnpjMsg.textContent = 'CNPJ válido';
  cnpjMsg.className = 'valid';
  return true;
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

async function buscaCep3()
{
  cep = document.getElementById("cep3").value
  
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
    document.getElementById("RUA3").value = Dados.logradouro
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

 async function buscarCidadesDadoEstado3() {
  try {
 
      const uf = document.getElementById("estado3").value;

    
    console.log(uf);

    const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`);
    const dados = await response.json();

    // Verifica se a resposta contém um array de dados
    if (Array.isArray(dados)) {
      // Limpa as opções anteriores
      const selectCidade = document.getElementById("CIDADE3");
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
async function buscarCidadesDadoEstado4() {
  try {
 
      const uf = document.getElementById("estado4").value;

    
    console.log(uf);

    const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`);
    const dados = await response.json();

    // Verifica se a resposta contém um array de dados
    if (Array.isArray(dados)) {
      // Limpa as opções anteriores
      const selectCidade = document.getElementById("CIDADE4");
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
  function validarCNPJ2(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, '');
  
    if (cnpj.length !== 14) {
      return false;
    }
  
    // Elimina CNPJs conhecidos que são inválidos
    if (/^(\d)\1{13}$/.test(cnpj)) {
      return false;
    }
  
    // Valida DVs
    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    
    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0)) {
      return false;
    }
  
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1)) {
      return false;
    }
  
    return true;
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
            alert(" CPF inválido!");
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
   let URL = "http://localhost:3344/pessoa/allpessoas";
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
   let tbody2 = document.getElementById('tabela-juridica');
   
  
   tbody.innerHTML = '';

   
   data.forEach(item => {
    if (item.fisica) {


      let data = new Date(item.fisica.dt_nasc);

      let dia = String(data.getDate()).padStart(2, '0');
      let mes = String(data.getMonth() + 1).padStart(2, '0');
      let ano = data.getFullYear();

      //let dataFormatada = ano + '-' + mes + '-' + dia;
      let dataFormatada = dia + '/' + mes + '/' + ano;
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
            <td>${dataFormatada}</td>
            <td>${item.fisica.sexo}</td>
            <td>${item.fisica.rg}</td>
            <td class="alinha-edit-del">
            <a href="#editEmployeeModal-fisica" onclick='CarregaIdParaUpdate(this, "${item.id}", "${item.tel}" ,"${item.nome}", "${item.email}", "${item.cidade}", "${item.bairro}", "${item.cep}", "${item.numero}", "${item.complemento}", "${item.rua}", "${item.fisica.cpf}", "${item.uf}", "${item.fisica.dt_nasc}", "${item.fisica.sexo}", "${item.fisica.rg}")' class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                <a href="#deleteEmployeeModal-fisica" onclick="CarregaIdParaDelete(${item.id})" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
            </td>
        `
        tbody.appendChild(row);
    }
    else{
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
        <td>${item.juridica.cnpj}</td>
        <td>${item.uf}</td>
        <td>${item.juridica.site}</td>
        <td>${item.juridica.insc_estadual}</td>
        <td>${item.juridica.razao_social}</td>
        <td class="alinha-edit-del">
            <a href="#editEmployeeModal-juridica" onclick='CarregaIdParaUpdateJuridica(this, "${item.id}", "${item.tel}", "${item.nome}", "${item.email}", "${item.cidade}", "${item.bairro}", "${item.cep}", "${item.numero}", "${item.complemento}", "${item.rua}", "${item.juridica.cnpj}", "${item.uf}", "${item.juridica.site}", "${item.juridica.insc_estadual}", "${item.juridica.razao_social}")' class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
            <a href="#deleteEmployeeModal-juridica" onclick="CarregaIdParaDeletejuridica(${item.id})" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
        </td>
    `
          tbody2.appendChild(row);

    }
   });
}

async function CarregaIdParaUpdateJuridica(event, id, tel, nome, email, cidade, bairro, cep, numero, complemento, rua, cnpj, uf, site, inscEstadual, razaoSocial) {
  const partesNome = nome.split(" "); 
  const primeiroNome = partesNome[0]; 
  const sobrenome = partesNome.slice(1).join(" "); 

  // Preenchendo os campos do modal com os dados fornecidos
  $('#editEmployeeModal-juridica').find('#ideditarjuridica').val(id);
  $('#editEmployeeModal-juridica').find('#nome').val(primeiroNome);
  $('#editEmployeeModal-juridica').find('#sobrenome').val(sobrenome);
  $('#editEmployeeModal-juridica').find('#cel').val(tel);
  $('#editEmployeeModal-juridica').find('#email').val(email);
  $('#editEmployeeModal-juridica').find('#cnpj').val(cnpj);
  $('#editEmployeeModal-juridica').find('#RUA4').val(rua);
  $('#editEmployeeModal-juridica').find('#NUMERO').val(numero);
  $('#editEmployeeModal-juridica').find('#estado4').val(uf);
  $('#editEmployeeModal-juridica').find('#cep4').val(cep);

  await buscarCidadesDadoEstado4();

  $('#editEmployeeModal-juridica').find('#complemento').val(complemento);
  $('#editEmployeeModal-juridica').find('#site').val(site);
  $('#editEmployeeModal-juridica').find('#insc').val(inscEstadual);
  $('#editEmployeeModal-juridica').find('#bairro').val(bairro);
  $('#editEmployeeModal-juridica').find('#CIDADE4').val(cidade);
  $('#editEmployeeModal-juridica').find('#razao').val(razaoSocial);
  
  console.log(cidade);
}

async function CarregaIdParaDelete(id){
  $('#deleteEmployeeModal-fisica').find('#fisica-delete').val(id);

}

async function CarregaIdParaDeletejuridica(id){
  $('#deleteEmployeeModal-juridica').find('#juridica-delete').val(id);

}

async function DeletaPessoaJuridica(event){
  id=$('#deleteEmployeeModal-juridica').find('#juridica-delete').val();
   // Criar o objeto JSON
   const dados = {
       id:parseInt(id)

   };
   console.log(JSON.stringify(dados));
   

   // Enviar os dados usando fetch
   try {
       const response = await fetch('http://localhost:3344/pessoa/delete', {
           method: 'PUT',
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
       alert('Dados excluidos sucesso!');
       location.reload();
   } catch (error) {
       console.error('Erro:', error);
       alert('Erro ao enviar os dados.');
   }

}

async function DeletaPessoaFisica(event){
  id=$('#deleteEmployeeModal-fisica').find('#fisica-delete').val();



   // Criar o objeto JSON
   const dados = {
       id:parseInt(id)

   };
   console.log(JSON.stringify(dados));
   

   // Enviar os dados usando fetch
   try {
       const response = await fetch('http://localhost:3344/pessoa/delete', {
           method: 'PUT',
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
       alert('Dados excluidos sucesso!');
       location.reload();
   } catch (error) {
       console.error('Erro:', error);
       alert('Erro ao enviar os dados.');
   }

}

async function CarregaIdParaUpdate(event,id,tel, nome, email, cidade, bairro, cep, numero, complemento, rua, cpf, uf, dt_nasc, sexo, rg) {


   const partesNome = nome.split(" "); 
   const primeiroNome = partesNome[0]; 
   const sobrenome = partesNome.slice(1).join(" "); 

   let data = new Date(dt_nasc);

   let dia = String(data.getDate()).padStart(2, '0');
   let mes = String(data.getMonth() + 1).padStart(2, '0');
   let ano = data.getFullYear();

   let dataFormatada = ano + '-' + mes + '-' + dia;

   $('#editEmployeeModal-fisica').find('#ideditar').val(id);
   $('#editEmployeeModal-fisica').find('#nome').val(primeiroNome);
   $('#editEmployeeModal-fisica').find('#sobrenome').val(sobrenome);
    $('#editEmployeeModal-fisica').find('#cel').val(tel);
    $('#editEmployeeModal-fisica').find('#email').val(email);
    $('#editEmployeeModal-fisica').find('#cpf').val(cpf);
    $('#editEmployeeModal-fisica').find('#RUA2').val(rua);
    $('#editEmployeeModal-fisica').find('#NUMERO').val(numero);
    $('#editEmployeeModal-fisica').find('#estado2').val(uf);
    
    $('#editEmployeeModal-fisica').find('#cep2').val(cep);
    await buscarCidadesDadoEstado2();
    
    $('#editEmployeeModal-fisica').find('#complemento').val(complemento);
   $('#editEmployeeModal-fisica').find('#DATA').val(dataFormatada);
   $('#editEmployeeModal-fisica').find('#sexo').val(sexo);
    $('#editEmployeeModal-fisica').find('#rg').val(rg);
    $('#editEmployeeModal-fisica').find('#bairro').val(bairro);
    $('#editEmployeeModal-fisica').find('#CIDADE2').val(cidade);
    console.log(cidade);
   
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
  if (!validarCPF2(cpf)) {
    alert('Por favor, insira um cpf válido.');
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

async function enviarFormularioJuridca () {
  // Coletar os dados do formulário usando jQuery
  const modal = $('#addEmployeeModal-juridica');
  const nome = modal.find('#nome').val();
  const sobrenome = modal.find('#sobrenome').val();
  const tel = modal.find('#cel').val().replace(/\D/g, ''); // Remove caracteres não numéricos
  const email = modal.find('#email').val();
  const cnpj = modal.find('#cnpj').val().replace(/\D/g, ''); // Remove pontos e traços
  const cep = modal.find('#cep3').val().replace(/\D/g, ''); // Remove caracteres não numéricos
  const rua = modal.find('#RUA3').val();
  const numero = modal.find('#NUMERO').val();
  const complemento = modal.find('#complemento').val();
  const uf = modal.find('#estado3').val();
  const cidade = modal.find('#CIDADE3').val();
  const site = modal.find('#site').val();
  const inscEstadual = modal.find('#insc').val();
  const bairro = modal.find('#bairro').val();
  const razaoSocial = modal.find('#razao').val();

  // Validação dos campos
  if (!validarEmail(email)) {
      alert('Por favor, insira um e-mail válido.');
      return;
  }
  if(!validarCNPJ2(cnpj)){
    alert('Por favor, insira um cnpj válido.');
    return;

  }
  if (!nome || !tel || !email || !cnpj || !cep || !uf || !cidade || !razaoSocial) {
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
      cnpj: cnpj,
      uf: uf,
        pessoaJuridica: {
          insc_estadual: inscEstadual,
          site: site,
          razao_social: razaoSocial 
        }
    }


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

// Exemplo de função para validar email
function validarEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}


async function alterarFormularioJuridca () {
  // Coletar os dados do formulário usando jQuery

  const modal = $('#editEmployeeModal-juridica');
  const id =  modal.find('#ideditarjuridica').val();
  const nome = modal.find('#nome').val();
  const sobrenome = modal.find('#sobrenome').val();
  const tel = modal.find('#cel').val().replace(/\D/g, ''); // Remove caracteres não numéricos
  const email = modal.find('#email').val();
  const cnpj = modal.find('#cnpj').val().replace(/\D/g, ''); // Remove pontos e traços
  const cep = modal.find('#cep4').val().replace(/\D/g, ''); // Remove caracteres não numéricos
  const rua = modal.find('#RUA4').val();
  const numero = modal.find('#NUMERO').val();
  const complemento = modal.find('#complemento').val();
  const uf = modal.find('#estado4').val();
  const cidade = modal.find('#CIDADE4').val();
  const site = modal.find('#site').val();
  const inscEstadual = modal.find('#insc').val();
  const bairro = modal.find('#bairro').val();
  const razaoSocial = modal.find('#razao').val();

  // Validação dos campos
  if (!validarEmail(email)) {
      alert('Por favor, insira um e-mail válido.');
      return;
  }
  if(!validarCNPJ2(cnpj)){
    alert('Por favor, insira um cnpj válido.');
    return;

  }
  if (!nome || !tel || !email || !cnpj || !cep || !uf || !cidade || !razaoSocial) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
  }

  // Criar o objeto JSON
  const dados = {
      id:parseInt(id),
      nome: nome + ' ' + sobrenome,
      tel: tel,
      email: email,
      cidade: cidade,
      bairro: bairro,
      cep: cep,
      numero: numero,
      complemento: complemento,
      rua: rua,
      cnpj: cnpj,
      uf: uf,
        pessoaJuridica: {
          insc_estadual: inscEstadual,
          site: site,
          razao_social: razaoSocial 
        }
    }


  console.log(JSON.stringify(dados));

  // Enviar os dados usando fetch
  try {
      const response = await fetch('http://localhost:3344/pessoa/update', {
          method: 'PUT',
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
   const id = $('#editEmployeeModal-fisica').find('#ideditar').val();
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
  if (!validarCPF2(cpf)) {
      alert('Por favor, insira um cpf válido.');
      return;
  }
  
  if (!nome || !tel || !email || !cpf || !cep || !uf || !cidade || !dt_nasc || !sexo || !rg) {
   alert('Por favor, preencha todos os campos obrigatórios.');
   return;
   }
   // Criar o objeto JSON
   const dados = {
      id:parseInt(id),
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
           method: 'PUT',
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
 
 
        

 

  

  

  