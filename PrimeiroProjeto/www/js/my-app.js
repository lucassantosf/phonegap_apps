// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});


// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
    // Do something here for "about" page

})

var idcli;
function buscarSta(id){
  idcli = id;
  mainView.router.loadPage('pagina2.html');
}

function excluirSta(id){
  
    var idexcluir = idcli;
    var delet = 'http://localhost:8080/NovoMeioAmbiente/ws/stakeholder/apagar/'+idexcluir;
    alert(delet);
    $$.ajax({
        type       : 'DELETE',
        url        : delet,
        crossDomain: true,
        contentType: 'application/json',
        success    : function(response) {
          alert('Stakeholder Excluido com sucesso');    
          mainView.router.loadPage('pagina2.html');  
      },
      error      : function() {
           alert('Não foi possível excluir');                  
      }
  });  
}

$$('#logarbtn').on('click', function(e){
  
    var email = $$('#email').val();
    var senha = $$('#senha').val();
    if(email == '' || senha == ''){
      alert('Dados imcompletos');
    }else{
      $$.getJSON("http://192.168.0.104:8080/NovoMeioAmbiente/ws/usuario/listar/", function(data){
        $$.each(data, function(index, value){
          if(email == value.email && senha == value.senha){
            alert("Login feito com sucesso");
            mainView.router.loadPage('principal.html'); 
          }else{
            
          } 
        });            
      })
    }   
});

$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;    

    if (page.name === 'listaIdeias') {        
        mainView.router.loadPage('listar_ideia.html'); 
        $$.getJSON("http://192.168.0.104:8080/NovoMeioAmbiente/ws/ideia/listar", function(data){
            $$.each(data, function(index, value){
              var str2 = '<li>'+
             '<a href="javascript: buscarSta('+value.idideia+')" class="item-link item-content" >'+
               '<div class="item-inner">'+
                       '<i class="f7-icons">list</i>'+
                       '<div class="item-title">Titulo:'+value.titulo+'</div>'+                       
                   '</div>'+
                 '</a>'+
              '</li>';
              $$('#listIdeia').append(str2);   
            });
        })
             
    }

    if (page.name === 'formIdeia') {        
        mainView.router.loadPage('formIdeia.html');  
                
        $$('#cadastrarIdeiabtn').on('click', function(e){
          var autor = $$('#autor').val();
          var titulo = $$('#titulo').val();
          var descricao = $$('#descricao').val();
          if(autor == '' || titulo == '' || descricao == ''){
            alert('Preencha todas as informações!');
            
          }else{
            var strurl = "http://192.168.0.104:8080/NovoMeioAmbiente/ws/ideia/novo";
            var dados = {"autor":autor,"descri":descricao,"titulo":titulo}; 
            $$.ajax({
                    type       : 'POST',
                    url        : strurl,
                    crossDomain: true,
                    data       : JSON.stringify(dados),
                    contentType: 'application/json',
                    success    : function(response) {       
                        alert('Compartilhado com sucesso!');               
                        mainView.router.loadPage('principal.html');
                    },
                    error      : function() {
                        alert('Não Salvou');                  
                    }
            });  
          }

        });
        
    }

    if (page.name === 'recuperar') {

        $$('#recuperarbtn').on('click', function(e){
          var email = $$('#email2').val();
          var senha = $$('#senha2').val();
          
          if(email == '' || senha == ''){
            alert('Dados incompletos');
          }else{
            var strurl = "http://192.168.0.104:8080/NovoMeioAmbiente/ws/usuario/novo";
            var dados = {"email":email,"senha":senha};     
            $$.ajax({
                    type       : 'POST',
                    url        : strurl,
                    crossDomain: true,
                    data       : JSON.stringify(dados),
                    contentType: 'application/json',
                    success    : function(response) {       
                        alert('Cadastro realizado com sucesso');               
                        mainView.router.loadPage('index.html');
                    },
                    error      : function() {
                        alert('Não Salvou');                  
                    }
            });
          }         
        
        }); 

    }

    if (page.name === 'index') {        
        
        $$('#logarbtn').on('click', function(e){

            var email = $$('#email').val();
            var senha = $$('#senha').val();
            if(email == '' || senha == ''){
              alert('Dados imcompletos');
            }else{
              $$.getJSON("http://192.168.0.104:8080/NovoMeioAmbiente/ws/usuario/listar/", function(data){
                $$.each(data, function(index, value){
                    if(email == value.email && senha == value.senha){
                      alert("Login feito com sucesso");
                      mainView.router.loadPage('principal.html'); 
                    }else{

                    } 
                });            
              })
            }
                 
        });

    }

    if (page.name==='pagina1'){     

        $$.getJSON("http://192.168.0.104:8080/NovoMeioAmbiente/ws/stakeholder/listar", function(data){
            $$.each(data, function(index, value){
              var str2 = '<li>'+
             '<a href="javascript: buscarSta('+value.idstakeholder+')" class="item-link item-content" >'+
               '<div class="item-inner">'+
                       '<i class="f7-icons">list</i>'+
                       '<div class="item-title">'+value.idstakeholder+'</div>'+
                       '<div class="item-after">'+value.nome+'</div>'+
                   '</div>'+
                 '</a>'+
              '</li>';
              $$('#listStake').append(str2);   
            });
        })     
        
    }

    if (page.name==='pagina2'){        

        $$.getJSON("http://192.168.0.104:8080/NovoMeioAmbiente/ws/stakeholder/buscar/"+idcli, function(value){
              var str1 = '<div class="card">'+
                            '<div class="card-header">Nome:'+value.nome+'</div>'+
                            '<div class="card-content card-content-padding">Cpf/Cnpj:'+value.cpfcnpj+'<br>Email:'+
                            value.email+'<br>'+
                            '</div>'+
                            '<div class="card-footer"><a href="javascript: excluirSta('+value.idstakeholder+')">Excluir</a></div>'+
                            '</div>';
              $$('#detcli').append(str1);       
        })
        
    }

    if (page.name==='pagina3'){

      $$('#salvarSta').on('click', function(e){
        
        var nome = $$('#nomesta').val();
        var cpf = $$('#cpfsta').val();
        var email = $$('#emailsta').val();      
        
        if(nome == '' || cpf == '' || email == ''){
          alert('Preencher Informações Obrigatórias!');
        }else{
          var address = 'http://192.168.0.104:8080/NovoMeioAmbiente/ws/stakeholder/novo';
          var dados = {"cpfcnpj":cpf,"email":email,"nome":nome};
          $$.ajax({
              type       : 'POST',
              url        : address,
              crossDomain: true,
              data       : JSON.stringify(dados),
              contentType: 'application/json',
              success    : function(response) {
                  alert('Stakeholder cadastrado com sucesso!');
                  mainView.router.loadPage('principal.html');
              },
              error      : function() {
                  alert('Não Salvou');                  
              }
          });
        }

        

      });

    }

})

// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
    myApp.alert('Here comes About page');
})