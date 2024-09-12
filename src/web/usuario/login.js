////////////////////////////////////////////////////////////////

// TELA DE LOGIN
/*
function AutenticarUsuario ()
{
  const URL_TO_LOGIN = "http://localhost:8080/apis/security/logar";
  var formulariodados = document.getElementById("FormularioDados");
  fetch(URL_TO_LOGIN, {
      method: 'POST', body: new FormData(formulariodados)
  })
      .then(resp=> {
          console.log(resp.text);
          formulariodados.reset();
          return resp.text();
      })
      .then(text=> {
          console.log("deu certo")
      }).catch(error=> {
          console.error(error);
      });
}*/

async function logar(){
    let cpf = document.getElementById("cpf").value;
    let senha = document.getElementById("senha").value;
    let URL = "http://localhost:3344/usuario/login";
    json = {
      cpf: cpf,
      senha: senha,
    }
    console.log(json)
    let response = await fetch(URL,{
      method : "POST",
      headers: {'Content-Type': 'application/json'},
      body : JSON.stringify(json)
    })

    const data = await response.json();
    console.log(data)

}


async function AutenticarUsuario() {
    let URL_TO_LOGIN = "http://localhost:8080/apis/security/logar";
    let formulariodados = document.getElementById("FormularioDados");
    let formData = new FormData(formulariodados);
    let jsonData = {};
    formData.forEach((value, key) => {
      jsonData[key] = value;
    });
    try {
      let response = await fetch(URL_TO_LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData) 
      });
      if (!response.ok) {
        throw new Error('Erro ao fazer login');
      } else {
        console.log("chegou ate aqui");
        let data = await response.text();
        console.log("Resposta do servidor:", data);
        formulariodados.reset();
        console.log(response);
        // GUARDA O TOKEN NO LOCALSTORAGE
        localStorage.setItem('token', data);

        let token = localStorage.getItem('token');
        if (token)
        {
          let headers = {
              'Authorization': 'Bearer ' + token,
              'Content-Type': 'application/json'
          }; 
        }
        console.log(localStorage.getItem('token'));
        console.log("Login bem-sucedido");
      }
    } catch (error) {
      console.log(error.message);
    }
}


function CadastrarUsuario() {
    const URL = "http://localhost:8080/apis/security/add-usuario";
    var fdados = document.getElementById("FormularioDadosCad");
    var jsontext = JSON.stringify(Object.fromEntries(
      new FormData(fdados)));
      try
      {
        fetch(URL, {
          headers: {'Accept': 'application/json',
            'Content-Type': 'application/json'},
                 method: 'POST',body: jsontext })
          .then(response=> {return response.text();})
          .then(json=> {fdados.reset(); console.log(json);})
          .catch(error=> {console.error(error);});
      }
      catch(error) 
      {
        console.log(error.message);
      };
  }

/*
async function CadastrarUsuario() {
  let URL_TO_LOGIN = "http://localhost:8080/apis/security/add-usuario";
  let formulariodados = document.getElementById("FormularioDadosCad");
  let formData = new FormData(formulariodados);
  let jsonData = {};
  formData.forEach((value, key) => {
    jsonData[key] = value;
  });
  try {
    let response = await fetch(URL_TO_LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(jsonData) 
    });
    if (!response.ok) {
      throw new Error('Erro ao fazer login');
    } else {
      console.log("chegou ate aqui cad");
      let data = await response.text();
      console.log("Resposta do servidor:", data);
      formulariodados.reset();
    }
  } catch (error) {
    console.log(error.message);
  }
}*/




function AcessoComToken() 
{
  const URL_TO_FETCH = 'http://localhost:8080/apis/security/testar-acesso';
  
  fetch(URL_TO_FETCH, {method: 'POST',
   headers:{'Authorization':`${localStorage.getItem('token')}`,}})
  .then(response => {return response.text()})
  .then(result=>{ alert(result); console.log(result);})
  .catch(err=> console.error(err));
}




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
      else
      {

        if (ValidarCPFnoBanco())
        {
          console.log("CPF VALIDADO NO BANCO");
        }
        else
        {
          // EXIBIR NÃO VÁLIDO E RESETAR O CAMPO DO CPF
        }
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



async function ValidarCPFnoBanco ()
{
  let cpf = document.getElementById("cpf").value;
  console.log(cpf);

  
}