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

        
        $$.getJSON("http://192.168.1.94:8080/AulaJSF/cliente/buscar/30", function(data){

            var str1 = '<li>'+
             '<a href="#" class="item-link item-content" >'+
               '<div class="item-inner">'+
                       '<i class="f7-icons">list</i>'+
                       '<div class="item-title">'+data.nomecliente+'</div>'+
                       '<div class="item-after">'+data.emailcliente+'</div>'+
                   '</div>'+
                 '</a>'+
              '</li>';

        })


        $$('#listcli').append(str1);
        
    }

})

// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
    myApp.alert('Here comes About page');
})