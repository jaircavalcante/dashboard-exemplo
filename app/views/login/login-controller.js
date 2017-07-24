/**
 * Controlador da Tela de Login
 */
app.controller('LoginController', function ($scope, $state, LoginServices, $rootScope) {

    var vm = this;

    //FUNÇÕES
    vm.acessarLogin     = acessarLogin;
    vm.alterarTela      = alterarTela;
    vm.cadastarUsuario  = cadastarUsuario;

    $rootScope.exibirSpinner = false;

    //VARIAVEIS
    vm.telaLogin           = true;
    vm.telaCadastroUsuario = false;

    vm.usuario = {
        nome : '',
        email: '',
        senha: ''
    };

    /**
     * FUNÇÃO RESPONSAVEL EM LIBERAR O ACESSO A TELA ADMINISTRATIVA
     */
    function acessarLogin() {
        if(validarUsuario()){
            $rootScope.exibirSpinner = true;
            LoginServices.autenticarUsuario(vm.usuario).then(function(response){
                if(response){
                    $state.go('admin');
                    $rootScope.exibirSpinner = false;
                }
            }).catch(function(erro){
                $rootScope.exibirSpinner = false;
                swal("","Email/Senha inválidos", "warning");
                if(!$scope.$$phase){
                    $scope.$apply();
                } 
            });
        }       
    }

    /**
     * FUNÇÃO RESPONSÁVEL POR VALIDAR O EMAIL/SENHA PRA REALIZAR O LOGIN
     */
    function validarUsuario(){
        var usuarioValido = false;
        
        if(vm.usuario.email != '' && vm.usuario.senha != '' ){
            usuarioValido = true;
        }
        return usuarioValido;
    }

    /**
     * FUNÇÃO RESPONSAVEL POR ALTERNAR ENTRA A TELA DE LOGIN E CADASTRO USUARIO
     */
    function alterarTela(nomeDaTela){
        limpar();
        if(nomeDaTela == 'LOGIN'){
            vm.telaLogin           = true;
            vm.telaCadastroUsuario = false;
        }else{
            vm.telaLogin           = false;
            vm.telaCadastroUsuario = true;
        }
    }

    /**
     * FUNÇÃO RESPONSAVEL POR CADASTRAR O NOVO USUARIO DO SISTEMA
     */
    function cadastarUsuario(){
        if(validarNovoUsuario()){
            LoginServices.liberarAutenticacaoUsuario(vm.usuario).then(function(response){
                LoginServices.cadastrarUsuario(vm.usuario).then(function(response){
                    swal("Cadastro Realizado", "", "success");
                
                    limpar();
                    alterarTela('LOGIN');
                    $scope.$apply();
                });
            }).catch(function(erro){
                swal("ERRO", "Não foi possível realizar o cadastro", "error");
            })
        }else{
            swal("","Obrigatório preencher todos os dados", "warning");
        }
    }

    /**
     * FUNÇÃO REPSONSAVEL POR VALIDAR OS DADOS DO NOVO USUARIO
     */
    function validarNovoUsuario(){
        var usuarioValido = false;

        if(vm.usuario.nome != '' && vm.usuario.email != '' && vm.usuario.senha != ''){
            usuarioValido = true;
        }

        return usuarioValido;
    }

    /**
     * FUNÇÃO REPSONSAVEL POR LIMPAR OS DADOS DA TELA
     */
    function limpar(){
        vm.usuario.nome     = '';
        vm.usuario.email    = '';
        vm.usuario.senha    = '';
    }
});