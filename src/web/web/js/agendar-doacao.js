document.getElementById('deliveryOption').addEventListener('change', function() {
    const addressFields = document.getElementById('addressFields');
    if (this.value === 'coleta') {
        addressFields.style.display = 'block';
    } else {
        addressFields.style.display = 'none';
    }
});

document.getElementById('donationForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const dateTimeInput = document.getElementById('dateTime');
    const dateError = document.getElementById('dateError');
    const dateTimeValue = new Date(dateTimeInput.value);
    const now = new Date();

    if (dateTimeValue <= now) {
        alert('Data Inválida');
        return;
    } 

    const name = document.getElementById('name').value;
    const cpf = document.getElementById('cpf').value.replace(/\D/g, '');
    const dateTime = document.getElementById('dateTime').value;
    const deliveryOption = document.getElementById('deliveryOption').value;
    const uf = document.getElementById('uf').value;
    const cel = document.getElementById('tel').value.replace(/\D/g, '');
    const cidade = document.getElementById('cidade').value;
    const rua = document.getElementById('rua').value;
    const bairro = document.getElementById('bairro').value;
    const complemento = document.getElementById('complemento').value;
    const cep = document.getElementById('cep').value.replace(/\D/g, '');
    const numero = document.getElementById('numero').value;

    if (name === '' || cpf === '' || dateTime === '' || deliveryOption === '') {
        alert('Todos os campos obrigatórios devem ser preenchidos.');
        return;
    }

    if (deliveryOption === 'coleta' && (uf === '' || cidade === '' || rua === '' || cep === '')) {
        alert('Todos os campos de endereço são obrigatórios para a opção de coleta.');
        return;
    }
    if (!validarCPF2(cpf)) {
        alert('Por favor, insira um cpf válido.');
        return;
    }

    let message = `Obrigado, ${name}! Sua doação foi agendada para ${dateTime}.`;

    if (deliveryOption === 'coleta') {
        message += ` A ONG irá coletar a doação no endereço: ${rua}, ${numero}, ${bairro}, ${cidade} - ${uf}, ${cep}.`;
    } else {
        message += ' Você entregará a doação diretamente na ONG.';
    }

    const dados = {
        name: name,
        cpf: cpf,
        data: dateTime,
        delivery: deliveryOption,
        uf: uf,
        tel: cel,
        cidade: cidade,
        rua: rua,
        bairro: bairro,
        complemento: complemento,
        cep: cep,
        numero: numero
    };


    try {
        const response = await fetch('http://localhost:3344/agenda/cadastrar', {
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
        alert(message);
        location.reload();
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao enviar os dados.');
    }
    // Aqui você pode adicionar o código para enviar os dados para o servidor, se necessário.
});

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
    document.getElementById("rua").value = Dados.logradouro
    //console.log(document.getElementById("RUA").value);
  }
}

async function buscarCidadesDadoEstado() {
    try {
   
        const uf = document.getElementById("uf").value;
  
      
      console.log(uf);
  
      const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`);
      const dados = await response.json();
  
      // Verifica se a resposta contém um array de dados
      if (Array.isArray(dados)) {
        // Limpa as opções anteriores
        const selectCidade = document.getElementById("cidade");
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
