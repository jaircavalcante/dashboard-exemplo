/**
 * @author: Jair Cavalcante
 * Arquivo de Configuração das Rotas
 */

app.config(function($stateProvider, $urlRouterProvider, $httpProvider,$locationProvider) {
    

   /* Remove o # das urls da aplicação */ 
   $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

    const LOGIN = {
        name: 'login',
        cache: false,
        url: '/',
        templateUrl: 'app/views/login/login.html',
        controller: 'LoginController as vm'
    };

    const ADMIN = {
        name: 'admin',
        url:'/admin',
        templateUrl: '/app/views/menu/menu.html',
        controller: 'MenuController as vm'
    };

    const PRODUTOS = {
        parent: ADMIN,
        name: 'produtos',
        url: '/produtos',
        templateUrl: '/app/views/produtos/produtos.html',
        controller: 'ProdutoController as vm'
    };

    /* Rotas */
    $stateProvider.state(LOGIN);
    $stateProvider.state(ADMIN);
    $stateProvider.state(PRODUTOS);

    $urlRouterProvider.otherwise('/');

});
