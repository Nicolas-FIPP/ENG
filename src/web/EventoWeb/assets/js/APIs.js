async function AgendarEvento() {
  let formulario = document.getElementById('FORMULARIO');
  console.log(formulario);

  let nome = document.getElementById('NOME').value;
  let rua = document.getElementById('RUA').value;
  let bairro = document.getElementById('BAIRRO').value;
  let complemento = document.getElementById('COMPLEMENTO').value;
  let uf = document.getElementById('ESTADO').value;
  let cidade = document.getElementById('CIDADE').value;
  let numero = document.getElementById('NUMERO').value;
  let custo = document.getElementById('CUSTO').value;
  let DataIni = document.getElementById('DATAINI').value;
  let DataFim = document.getElementById('DATAFIM').value;
  let cep = document.getElementById('CEP').value;
  let idPessoa = document.getElementById('PESSOA').value;

  console.log('DATA INI ' + DataIni + ' E DATA FIM ' + DataFim);

  let json = {
    nome: nome,
    pes_id_responsavel: parseInt(idPessoa, 10),
    dt_ini: DataIni,
    dt_fim: DataFim,
    cep: cep.replace('-', ''),
    uf: uf,
    cidade: cidade,
    bairro: bairro,
    rua: rua,
    complemento: complemento,
    numero: numero,
    custo: parseFloat(custo.replace(/[\D]+/g, '')),
  };
  console.log(json);

  //formulario.reset();

  try {
    let response = await fetch('http://localhost:3344/evento/cadastrar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(json),
    });

    if (response.ok) {
      let responseData = await response.json();
      console.log('Evento agendado com sucesso:', responseData);
      // Limpar o formulário se necessário
      formulario.reset();
      RecuperaEvento();
      EnviarEmails(responseData);
    } else {
      console.error('Erro ao agendar evento:', response.statusText);
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
  }
}

function EnviarEmails(data) {
  document.getElementById('DivTabelaEmailsEnviados').classList.remove('d-none');
  const tbody = document.getElementById('TBODY_TABELA_EMAILS');
  tbody.innerHTML = '';

  data.emailEnviado.forEach((pessoa) => {
    const row = document.createElement('tr');
    row.classList.add('table-success');
    const nomeCell = document.createElement('td');
    nomeCell.textContent = pessoa.nome;
    const emailCell = document.createElement('td');
    emailCell.textContent = pessoa.email;

    row.appendChild(nomeCell);
    row.appendChild(emailCell);

    tbody.appendChild(row);
  });
}

function ValidarCampos() {
  let DataIni = document.getElementById('DATAINI').value;
  let DataFim = document.getElementById('DATAFIM').value;
  let Agora = new Date();
  Agora.setSeconds(0, 0);

  console.log('ENTROU NA FUNÇÃO DE VALIDAR');
  console.log(DataIni + ' ' + DataFim);
  if (DataIni != '' && DataFim != '') {
    let dataIniDate = new Date(DataIni);
    let dataFimDate = new Date(DataFim);

    if (dataIniDate >= Agora) {
      if (dataFimDate > dataIniDate) AgendarEvento();
      else {
        alert('DATA INVÁLIDA - TÉRMINO ANTES DO INÍCIO - Cadastro');
        console.log('DATA INVÁLIDA - TÉRMINO ANTES DO INÍCIO');
      }
    } else {
      console.log('DataIni = ' + dataIniDate + '\nAGORA = ' + Agora);
      alert('DATA INVÁLIDA - INÍCIO DO EVENTO ANTERIOR A DATA DE AGORA - Cadastro');
      console.log('DATA INVÁLIDA - INÍCIO DO EVENTO ANTERIOR A DATA DE AGORA - Cadastro');
    }
  } else {
    alert('CAMPO(s) VAZIO(s) - Cadastro');
    console.log('ALGUM CAMPO INVÁLIDO');
  }
}

function ValidarCamposEdit(tag, event) {
  event.preventDefault();
  let DataIni = document.getElementById('MODAL_EDIT_DataIni').value;
  let DataFim = document.getElementById('MODAL_EDIT_DataFim').value;
  let Agora = new Date();
  Agora.setSeconds(0, 0);

  console.log('ENTROU NA FUNÇÃO DE VALIDAR');
  console.log(DataIni + ' ' + DataFim);
  if (DataIni != '' && DataFim != '') {
    let dataIniDate = new Date(DataIni);
    let dataFimDate = new Date(DataFim);

    if (dataFimDate > dataIniDate) AlterarEvento(tag);
    else {
      alert('DATA INVÁLIDA - TÉRMINO ANTES DO INÍCIO - Cadastro');
      console.log('DATA INVÁLIDA - TÉRMINO ANTES DO INÍCIO');
    }
  } else {
    alert('CAMPO(s) VAZIO(s) - Cadastro');
    console.log('ALGUM CAMPO INVÁLIDO');
  }
}

async function buscaCep() {
  cep = document.getElementById('CEP').value;

  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  const Dados = await response.json();
  if (Dados.error) {
    //document.getElementById("CEP").value = "Algo Deu Errado no Processo";
    alert('Algo deu Errado no Processo');
  } else {
    console.log(Dados);
    //document.getElementById("CIDADE").value = Dados.localidade
    document.getElementById('RUA').value = Dados.logradouro;
    document.getElementById('BAIRRO').value = Dados.bairro;
    document.getElementById('COMPLEMENTO').value = Dados.complemento;

    // SELECIONAR A UF DO CAMPO DO ESTADO
    // E CHAMAR A API DE COMPLETAR AS CIDADES

    let options = document.getElementById('ESTADO');
    //console.log(options);
    for (let i = 0; i < options.length; i++) if (options[i].value == Dados.uf) options[i].selected = true;

    buscarCidadesDadoEstado(Dados);
  }
}

// API PARA BUSCAR CIDADE DADO UM ESTADO

async function buscarCidadesDadoEstado(Dados) {
  try {
    const uf = document.getElementById('ESTADO').value;
    console.log(uf);

    const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`);
    const dados = await response.json();

    if (Array.isArray(dados)) {
      // Limpa as opções anteriores
      const selectCidade = document.getElementById('CIDADE');
      selectCidade.innerHTML = '';

      // Adiciona uma opção padrão
      const optionPadrao = document.createElement('option');
      optionPadrao.value = '';
      optionPadrao.textContent = 'Selecione sua cidade';
      selectCidade.appendChild(optionPadrao);

      dados.forEach((cidade) => {
        const optionCidade = document.createElement('option');
        optionCidade.value = cidade.nome;
        optionCidade.textContent = cidade.nome;
        selectCidade.appendChild(optionCidade);
      });

      // SELECIONAR A CIDADE SE CEP EXISTIR

      let Cep = document.getElementById('CEP');
      //console.log(Dados);
      if (Cep.value != '' && Dados != null) {
        let options = selectCidade.options;
        for (let i = 0; i < options.length; i++) if (options[i].value == Dados.localidade) options[i].selected = true;
      }
    } else {
      throw new Error('Erro ao buscar cidades');
    }
  } catch (error) {
    console.error('Erro:', error);
    alert('Algo deu Errado no Processo');
  }
}

// API PARA BUSCAR PESSOAS

async function BuscarPessoas() {
  try {
    const response = await fetch(`http://localhost:3344/pessoa/allpessoas/`, {
      method: 'GET',
    });
    const dados = await response.json();

    if (Array.isArray(dados)) {
      // Limpa as opções anteriores
      const selectPessoa = document.getElementById('PESSOA');
      selectPessoa.innerHTML = '';

      // Adiciona uma opção padrão
      const optionPadrao = document.createElement('option');
      optionPadrao.value = '';
      optionPadrao.textContent = 'Selecione uma Pessoa';
      selectPessoa.appendChild(optionPadrao);

      dados.forEach((pessoa) => {
        const optionPessoa = document.createElement('option');
        optionPessoa.value = pessoa.id;
        optionPessoa.textContent = pessoa.nome;
        selectPessoa.appendChild(optionPessoa);
      });
    }
    /*else {
      throw new Error('Erro ao buscar Pessoas');
    }*/
  } catch (error) {
    console.error('Erro:', error);
    //alert("Algo deu Errado no Processo");
  }
}

////////////////////////////////////////////////////////////////

// PARTE DA TABELA (PARTE DE BAIXO)

async function RecuperaEvento() {
  let URL = 'http://localhost:3344/evento/';
  let response = await fetch(URL, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    const data = await response.json();
    console.log('O JSON DO PAI COM OS EVENTOS: ', data);
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
  data.forEach((item) => {
    let row = document.createElement('tr');
    DataIni = new Date(item.dt_ini);
    DataFim = new Date(item.dt_fim);

    DataIni.setMonth(DataIni.getUTCMonth() + 1);
    DataFim.setMonth(DataFim.getUTCMonth() + 1);

    let DiaIni = DataIni.getUTCDate();
    let MesIni = DataIni.getUTCMonth();
    let AnoIni = DataIni.getUTCFullYear();
    let HorasIni = DataIni.getUTCHours();
    let MinutosIni = DataIni.getUTCMinutes();

    let DiaFim = DataFim.getUTCDate();
    let MesFim = DataFim.getUTCMonth();
    let AnoFim = DataFim.getUTCFullYear();
    let HorasFim = DataFim.getUTCHours();
    let MinutosFim = DataFim.getUTCMinutes();

    // FORMATAR O CUSTO
    item.custo = 'R$ ' + item.custo;
    let v = item.custo.substring(3);
    v = v.replace(/\D/g, '');
    v = v.replace(/^0+/g, '');
    v = v.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    item.custo = 'R$ ' + v;

    // FORMATAR O CEP
    item.cep = item.cep.slice(0, 5) + '-' + item.cep.slice(5);

    row.innerHTML = `
          <td><span id=${item.id}></span></td>
          <td>${item.nome}</td>
          <td>${item.custo}</td>
          <td data-date="${item.dt_ini}">${
      DiaIni +
      '/' +
      MesIni +
      '/' +
      AnoIni +
      '\n' +
      (HorasIni < 10 ? '0' + HorasIni : HorasIni) +
      ':' +
      (MinutosIni < 10 ? '0' + MinutosIni : MinutosIni)
    }</td>
          <td data-date="${item.dt_fim}">${
      DiaFim +
      '/' +
      MesFim +
      '/' +
      AnoFim +
      '\n' +
      (HorasFim < 10 ? '0' + HorasFim : HorasFim) +
      ':' +
      (MinutosFim < 10 ? '0' + MinutosFim : MinutosFim)
    }</td>
          <td>${item.cep}</td>
          <td>${item.uf}</td>
          <td>${item.cidade}</td>
          <td>${item.bairro}</td>
          <td>${item.rua}</td>
          <td>${item.complemento}</td>
          <td>${item.numero}</td>
          <td>${item['pessoa'].nome}</td>

          <td class="alinha-edit-del">
              <a href="#editEmployeeModal" onclick="CarregaIdParaUpdate(this)" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
              <a href="#deleteEmployeeModal" onclick="CarregaIdParaDelete(this)" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
          </td>    
      `;

    tbody.appendChild(row);
  });
}

function CarregaIdParaDelete(event) {
  let id = event.parentNode.parentNode.firstElementChild.firstElementChild.id;
  //console.log(id);
  document.getElementById('MODAL_DELETE_Id').dataset.userId = id;
  console.log(document.getElementById('MODAL_DELETE_Id').dataset.userId);
}

async function CarregaIdParaUpdate(event) {
  let colunas = event.parentNode.parentNode.children;
  let id = colunas[0].firstElementChild.id;
  let nome = colunas[1].innerHTML;
  let custo = colunas[2].innerHTML;
  let dt_ini = colunas[3].dataset.date;
  let dt_fim = colunas[4].dataset.date;
  let cep = colunas[5].innerHTML;
  let uf = colunas[6].innerHTML;
  let cidade = colunas[7].innerHTML;
  let bairro = colunas[8].innerHTML;
  let rua = colunas[9].innerHTML;
  let complemento = colunas[10].innerHTML;
  let numero = colunas[11].innerHTML;
  let responsavel = colunas[12].innerHTML;

  console.log('ID:', id);
  /*console.log("Nome:", nome);
  console.log("Custo:", custo);
  console.log("Data Início:", dt_ini);
  console.log("Data Fim:", dt_fim);
  console.log("CEP:", cep);
  console.log("UF:", uf);
  console.log("Cidade:", cidade);
  console.log("Bairro:", bairro);
  console.log("Rua:", rua);
  console.log("Complemento:", complemento);
  console.log("Número:", numero);
  console.log("Responsável:", responsavel);*/

  // Converter datas para o formato aceitável por datetime-local
  dt_ini = convertToLocalDateTime(dt_ini);
  dt_fim = convertToLocalDateTime(dt_fim);

  document.getElementById('MODAL_EDIT_Id').dataset.userId = id;
  document.getElementById('MODAL_EDIT_Nome').value = nome;
  document.getElementById('MODAL_EDIT_Custo').value = custo;
  document.getElementById('MODAL_EDIT_DataIni').value = dt_ini;
  document.getElementById('MODAL_EDIT_DataFim').value = dt_fim;
  document.getElementById('MODAL_EDIT_Cep').value = cep;
  document.getElementById('MODAL_EDIT_Numero').value = numero;

  buscaCepEdit(document.getElementById('MODAL_EDIT_Cep'));
  await BuscarPessoasEdit();

  // SELECIONAR O RESPONSÁVEL DESSE EVENTO
  let selectResponsavel = document.getElementById('MODAL_EDIT_Responsavel');
  let option = selectResponsavel.children;

  for (let i = 0; i < option.length; i++) if (option[i].innerText == responsavel) option[i].selected = true;
}

async function DeletaEvento(event) {
  event.preventDefault();
  let id = document.getElementById('MODAL_DELETE_Id').dataset.userId;
  console.log('ID DO DELETE EVENTO = ', id);

  let URL = `http://localhost:3344/evento/delete/${id}`;

  try {
    let response = await fetch(URL, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      RecuperaEvento();
      console.log('DELETOU COM SUCESSO');
    }
  } catch (error) {
    console.log('DEU ALGO DE ERRADO NO PROCESSO');
  }
  $('#deleteEmployeeModal').modal('hide');
}

async function AlterarEvento(event) {
  let id = document.getElementById('MODAL_EDIT_Id').dataset.userId;
  console.log('ID DO DELETE EVENTO = ', id);

  let nome = document.getElementById('MODAL_EDIT_Nome').value;
  let rua = document.getElementById('MODAL_EDIT_Rua').value;
  let bairro = document.getElementById('MODAL_EDIT_Bairro').value;
  let complemento = document.getElementById('MODAL_EDIT_Complemento').value;
  let uf = document.getElementById('MODAL_EDIT_Estado').value;
  let cidade = document.getElementById('MODAL_EDIT_Cidade').value;
  let numero = document.getElementById('MODAL_EDIT_Numero').value;
  let custo = document.getElementById('MODAL_EDIT_Custo').value;
  let DataIni = document.getElementById('MODAL_EDIT_DataIni').value;
  let DataFim = document.getElementById('MODAL_EDIT_DataFim').value;
  let cep = document.getElementById('MODAL_EDIT_Cep').value;
  let idPessoa = document.getElementById('MODAL_EDIT_Responsavel').value;

  console.log('DATA INI ' + DataIni + ' E DATA FIM ' + DataFim);

  let json = {
    nome: nome,
    pes_id_responsavel: parseInt(idPessoa, 10),
    dt_ini: DataIni,
    dt_fim: DataFim,
    cep: cep.replace('-', ''),
    uf: uf,
    cidade: cidade,
    bairro: bairro,
    rua: rua,
    complemento: complemento,
    numero: numero,
    custo: parseFloat(custo.replace(/[\D]+/g, '')),
  };
  console.log(json);

  let URL = `http://localhost:3344/evento/update/${id}`;
  try {
    let response = await fetch(URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(json),
    });

    if (response.ok) {
      RecuperaEvento();
      console.log('ALTEROU COM SUCESSO');
    }
  } catch (error) {
    console.log('DEU ALGO DE ERRADO NO PROCESSO');
  }
  $('#editEmployeeModal').modal('hide');
}

async function buscaCepEdit(event) {
  let cep = event.value;
  console.log('CEPPPP = ', cep);

  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  const Dados = await response.json();
  if (Dados.error) {
    alert('Algo deu Errado no Processo');
  } else {
    console.log(Dados);
    document.getElementById('MODAL_EDIT_Rua').value = Dados.logradouro;
    document.getElementById('MODAL_EDIT_Bairro').value = Dados.bairro;
    document.getElementById('MODAL_EDIT_Complemento').value = Dados.complemento;

    let options = document.getElementById('MODAL_EDIT_Estado');
    //console.log(options);
    for (let i = 0; i < options.length; i++) if (options[i].value == Dados.uf) options[i].selected = true;

    buscarCidadesDadoEstadoEdit(Dados);
  }
}

async function BuscarPessoasEdit() {
  try {
    const response = await fetch(`http://localhost:3344/pessoa/allpessoas/`, {
      method: 'GET',
    });
    const dados = await response.json();

    if (Array.isArray(dados)) {
      // Limpa as opções anteriores
      const selectPessoa = document.getElementById('MODAL_EDIT_Responsavel');
      selectPessoa.innerHTML = '';

      // Adiciona uma opção padrão
      const optionPadrao = document.createElement('option');
      optionPadrao.value = '';
      optionPadrao.textContent = 'Selecione uma Pessoa';
      selectPessoa.appendChild(optionPadrao);

      dados.forEach((pessoa) => {
        const optionPessoa = document.createElement('option');
        optionPessoa.value = pessoa.id;
        optionPessoa.textContent = pessoa.nome;
        selectPessoa.appendChild(optionPessoa);
      });
    }
    /*else {
      throw new Error('Erro ao buscar Pessoas');
    }*/
  } catch (error) {
    console.error('Erro:', error);
    //alert("Algo deu Errado no Processo");
  }
}

async function buscarCidadesDadoEstadoEdit(Dados) {
  try {
    const uf = document.getElementById('MODAL_EDIT_Estado').value;
    console.log(uf);

    const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`);
    const dados = await response.json();

    if (Array.isArray(dados)) {
      // Limpa as opções anteriores
      const selectCidade = document.getElementById('MODAL_EDIT_Cidade');
      selectCidade.innerHTML = '';

      // Adiciona uma opção padrão
      const optionPadrao = document.createElement('option');
      optionPadrao.value = '';
      optionPadrao.textContent = 'Selecione sua cidade';
      selectCidade.appendChild(optionPadrao);

      dados.forEach((cidade) => {
        const optionCidade = document.createElement('option');
        optionCidade.value = cidade.nome;
        optionCidade.textContent = cidade.nome;
        selectCidade.appendChild(optionCidade);
      });

      // SELECIONAR A CIDADE SE CEP EXISTIR

      let Cep = document.getElementById('MODAL_EDIT_Cep');
      //console.log(Dados);
      if (Cep.value != '' && Dados != null) {
        let options = selectCidade.options;
        for (let i = 0; i < options.length; i++) if (options[i].value == Dados.localidade) options[i].selected = true;
      }
    } else {
      throw new Error('Erro ao buscar cidades');
    }
  } catch (error) {
    console.error('Erro:', error);
    alert('Algo deu Errado no Processo');
  }
}

// Função para converter data ISO 8601 para o formato datetime-local
function convertToLocalDateTime(isoDate) {
  let date = new Date(isoDate);
  // Extrair a parte da data e hora no formato adequado
  let localISOTime = date.toISOString().substring(0, 16);
  return localISOTime;
}

window.addEventListener('load', function () {
  BuscarPessoas();
  RecuperaEvento();
});
