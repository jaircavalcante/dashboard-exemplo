/**
 * Controller Principal da Tela Administrador da Aplicação
 */

app.controller('MenuController', function ($scope, $state, MenuServices) {

    var vm = this;
    
    // FUNÇÕES
    vm.alterarRota  = alterarRota;
    vm.logoff       = logoff;
    vm.rotaAlterada = true;
    
    vm.quantidadeProdutos    = 0;
    vm.quantidadeForncedores = 0;
    vm.quantidadeClientes    = 0;

    init();
    function init(){
        carregarInformacoesProduto();
    }

    function carregarInformacoesProduto(){
        firebase.database().ref('produtos').on('value', function (dados) {
            if (dados) {
                var produtos = dados.val();
                vm.produtos  = Object.keys(produtos).map(x => produtos[x])
                vm.quantidadeProdutos = vm.produtos.length;
                
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            }
        });
    }


    /**
     * FUNÇÃO RESPONSAVEL POR ALTERAR A ROTA A PARTIR DA OPÇÃO SELECIONADA DO MENU.
     */
    function alterarRota( rota ){
        vm.rotaAlterada =  (rota == 'admin') ? true: false;

        if(rota != 'login'){
            $state.go(rota);
        }else{
            logoff();
        }
    }
    
    /**
     * FUNÇÃO RESPONSÁVEL POR DESCONECTAR O USUÁRIO LOGADO
     */
    function logoff(){
        AdminServices.desconectarUsuario().then(function(response){
            if(!response){
                $state.go('login');
            }
        });
    }

    /*
     * MENU DA APLICAÇÃO
     */

    vm.menu = [{
        rota: 'admin',
        icone:'glyphicon glyphicon-home',
        descricao: 'Home'

    },{
        rota: 'produtos',
        icone: 'fa fa-cubes',
        descricao: 'Produtos'
    },{
        rota: 'fornecedores',
        icone: 'fa fa-truck',
        descricao: 'Fornecedores'
    },{
        rota: 'clientes',
        icone:'fa fa-user',
        descricao: 'Clientes'
    },{
        rota: 'login',
        icone: 'glyphicon glyphicon-log-out',
        descricao: 'Sair'
    }];


});