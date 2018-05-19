// Initialize app
var myApp = new Framework7();
var ip = '192.168.1.94';

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




$$('#salvarCli').on('click', function(e){
    alert('clicou botao salvar');

        var cpf = $$('#cpfcli').val();
        var nome = $$('#nomecli').val();
        var mail = $$('#emailcli').val();
        var fone = $$('#fonecli').val();

        var strurl = 'http://'+ip+':8080/AulaDaw/ws/cliente/novo';
        var dados = {"cpfcnpjcliente":cpf,"emailcliente":mail,"fonecliente":fone,"nomecliente":nome};

        $$.ajax({
            type       : 'POST',
            url        : strurl,
            crossDomain: true,
            data       : JSON.stringify(dados),
            contentType: 'application/json',
            success    : function(response) {
                alert('Salvou');
                mainView.router.loadPage('pagina1.html');
            },
            error      : function() {
                alert('Não Salvou');                  
            }
        });
  });


$$('#editarCli').on('click', function(e){
    alert('clicou botao editar');


        var strurl = 'http://'+ip+':8080/AulaDaw/ws/cliente/editar';
        var dados = {"cpfcnpjcliente":"2zzq","emailcliente":"2zzq","fonecliente":"1522222zzq","idcliente":2,"nomecliente":"Cliente2zzq"};

        $$.ajax({
            type       : 'POST',
            url        : strurl,
            crossDomain: true,
            data       : JSON.stringify(dados),
            contentType: 'application/json',
            success    : function(response) {
                alert('Editou');
                mainView.router.loadPage('pagina1.html');
            },
            error      : function() {
                alert('Não Editou');                  
            }
        });

 });


$$('#excluirCli').on('click', function(e){
    alert('clicou botao excluir');
        var idexcluir = 7;
        var strurl = 'http://'+ip+':8080/AulaDaw/ws/cliente/apagar/'+idexcluir;

        $$.ajax({
            type       : 'DELETE',
            url        : strurl,
            crossDomain: true,
            contentType: 'application/json',
            success    : function(response) {
                alert('Excluiu');
                mainView.router.loadPage('pagina1.html');

            },
            error      : function() {
                alert('Não Excluiu');                  
            }
        });

 });




var idcli;
function buscarCli(id){
  idcli = id;
  mainView.router.loadPage('pagina2.html');

}



// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;

    if (page.name === 'about') {
        // Following code will be executed for page with data-page attribute equal to "about"
        myApp.alert('Here comes About page');
    }

     if (page.name === 'about2') {
        // Following code will be executed for page with data-page attribute equal to "about"
        myApp.alert('About2');
    }


    if (page.name==='pagina1'){        

        
        $$.getJSON("http://"+ip+":8080/AulaDaw/ws/cliente/listar", function(data){
            $$.each(data, function(index, value){

              var str2 = '<li>'+
             '<a href="javascript: buscarCli('+value.idcliente+')" class="item-link item-content" >'+
               '<div class="item-inner">'+
                       '<i class="f7-icons">list</i>'+
                        '<div class="item-title">'+value.nomecliente+'</div>'+
                       '<div class="item-after">'+value.idcliente+'</div>'+
                   '</div>'+
                 '</a>'+
              '</li>';
              $$('#listcli').append(str2);   
            });
        })       
        
    }


    if (page.name==='pagina2'){        

           $$.getJSON("http://"+ip+":8080/AulaDaw/ws/cliente/buscar/"+idcli, function(value){
              var str1 = '<div class="card">'+
                            '<div class="card-header">'+value.nomecliente+'</div>'+
                            '<div class="card-content card-content-padding" style="padding: 1em;"><br>'+
                            value.emailcliente+'<br>'+
                            value.cpfcnpjcliente+'<br>'+
                            value.fonecliente+'<br>'+
                            '</div>'+
                            '<div class="card-footer">Card Footer</div>'+
                            '</div>';
              $$('#detcli').append(str1);   
     

        })


        
    }

})

// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
    myApp.alert('Here comes About page');
})