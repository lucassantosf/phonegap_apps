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
function buscarCli(id){
  idcli = id;
  mainView.router.loadPage('pagina2.html');
}

$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;

    if (page.name === 'about') {        
        myApp.alert('Here comes About page');
    }

    if (page.name === 'about2') {        
        myApp.alert('About2');
    }

    if (page.name === 'empresa') {        
        mainView.router.loadPage('empresa.html');        
    }

    if (page.name==='pagina1'){     

        
        $$.getJSON("http://192.168.0.104:8080/NewAuladaw/ws/cliente/listar/", function(data){
            $$.each(data, function(index, value){
              var str2 = '<li>'+
             '<a href="javascript: buscarCli('+value.idcliente+')" class="item-link item-content" >'+
               '<div class="item-inner">'+
                       '<i class="f7-icons">list</i>'+
                       '<div class="item-title">'+value.idcliente+'</div>'+
                       '<div class="item-after">'+value.nomecliente+'</div>'+
                   '</div>'+
                 '</a>'+
              '</li>';
              $$('#listcli').append(str2);   
            });
        })     
        
    }

    if (page.name==='pagina2'){        

        $$.getJSON("http://192.168.0.104:8080/NewAuladaw/ws/cliente/buscar/"+idcli, function(value){
              var str1 = '<div class="card">'+
                            '<div class="card-header">'+value.nomecliente+'</div>'+
                            '<div class="card-content card-content-padding">'+value.cpfcnpjcliente+'<br>'+
                            value.emailcliente+'<br>'+
                            value.fonecliente+'</div>'+
                            '<div class="card-footer"><a href="pagina4.html">Excluir</a></div>'+
                            '</div>';
              $$('#detcli').append(str1);       
        })
        
    }

    if (page.name==='pagina3'){
        

        $$.postJSON('http://192.168.0.104:8080/NewAuladaw/ws/cliente/novo',{
                cpfcnpjcliente: '54321',
                emailcliente: 'cs@gmail.com',
                fonecliente: '33333',
                nomecliente: 'nnnTeste',
                vendas: ['']
              },function(value){
                  alert('Sucesso');
              })

    }

})

// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
    myApp.alert('Here comes About page');
})