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


//VALIDAÇOES
function getMoney(){
    var vStr = event.target.value;
    event.target.value =  parseInt( vStr.replace(/[\D]+/g,'') );
  }
  
  /* OU para receber uma string formatada e converter pra inteiro e usar em cálculos, ou para gravar no banco de dados,... 
  function getMoney( str ){
       return parseInt( str.replace(/[\D]+/g,'') );
  }
  */
  
  function mMoeda () {
   // Para pegar o objeto que chamou o evento 
   var v = (event.target.value).substring(3); //extrai os 3 primeiros caracteres relativos ao 'R$ '
   //var v = event.target.value;
            
   //Faz uma série de substituições nas Expressões Regulares que podem gerar valores monetários
   v = v.replace(/\D/g, "");
   v = v.replace(/^0+/g, "");
   v = v.replace(/(\d{1})(\d{13})$/, "$1.$2");
   v = v.replace(/(\d{1})(\d{10})$/, "$1.$2");
   v = v.replace(/(\d{1})(\d{7})$/, "$1.$2");
   v = v.replace(/(\d{1})(\d{4})$/, "$1.$2");
   v = v.replace(/(\d{1})(\d{1,1})$/, "$1,$2");
   // Para retornar os valores que estão sendo digitados com a formatação ao elemento que chamou a função
   event.target.value = "R$ " + v;
   //event.target.value = v;
  }
  
  function formatReal(){
    var tmp = event.target.value+'';
    tmp = tmp.replace(/([0-9]{2})$/g, ",$1");
    if( tmp.length > 6 )
       tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
  
    event.target.value = tmp;
  }
  
  function mCpf() {
    var cpf = event.target.value;
    cpf = cpf.replace(/\D/g, "")
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    event.target.value = cpf;
  }
  
  function mTel () { //telefone fixo
    var tel = event.target.value;
    tel = tel.replace(/\D/g, "")
    tel = tel.replace(/^(\d)/, "($1")
    tel = tel.replace(/(.{3})(\d)/, "$1)$2")
    if (tel.length == 9) {
       tel = tel.replace(/(.{1})$/, "-$1")
    } else if (tel.length == 10) {
       tel = tel.replace(/(.{2})$/, "-$1")
    } else if (tel.length == 11) {
       tel = tel.replace(/(.{3})$/, "-$1")
    } else if (tel.length == 12) {
       tel = tel.replace(/(.{4})$/, "-$1")
    } else if (tel.length > 12) {
       tel = tel.replace(/(.{4})$/, "-$1")
    }
    event.target.value = tel;
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
       GETALL(data); // Chama a função para preencher a tabela com os dados recebidos
   } else {
       console.log(response.status + '\n' + JSON.stringify(response));
   }
}

function GETALL(data) {
   let tbody = document.getElementById('tbfisica');
   
   // Limpa qualquer conteúdo pré-existente na tabela
   tbody.innerHTML = '';

   // Itera sobre os dados e adiciona linhas à tabela
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
               <a href="#editEmployeeModal" onclick="CarregaIdParaUpdate(${item.id})" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
               <a href="#deleteEmployeeModal" onclick="CarregaIdParaDelete(${item.id})" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
           </td>
       `;
       tbody.appendChild(row);
   });
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
       bairro: '', // Se houver campo de bairro, substitua
       cep: cep,
       numero: numero,
       complemento: complemento,
       rua: rua,
       cpf: cpf,
       uf: uf,
       pessoaFisica: {
           dt_nasc: dt_nasc,
           sexo: sexo, // Adicione o campo de sexo se houver
           rg: rg    // Adicione o campo de rg se houver
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
   } catch (error) {
       console.error('Erro:', error);
       alert('Erro ao enviar os dados.');
   }
}
 
        

 

  

  

  