/**
 * Controller responsável por gerenciar a tela de Produtos
 */

app.controller('ProdutoController', function ($scope, $state, ProdutoService) {

    var vm = this;

    //FUNÇÕES
    vm.abrirTelaAdicionarProduto = abrirTelaAdicionarProduto;
    vm.alterarProduto = alterarProduto;
    vm.detalharProduto = detalharProduto;
    vm.removerProduto = removerProduto;
    vm.salvarProduto = salvarProduto;
    vm.salvarEdicaoProduto = salvarEdicaoProduto;

    vm.produtos = [];
    vm.listaProdutos = [];
    vm.informacoesProduto = [];
    vm.loader = false;
    vm.indexProduto = 0;

    vm.cadastrarProduto = {
        descricao: '',
        quantidade: '',
        preco: '',
        fornecedor: ''
    }

    vm.cadastrarProduto.fornecedor = 'Selecione ...';

    init();
    function init() {
        vm.produtos = [];
         vm.listaProdutos = [];

        vm.loader = true;
        firebase.database().ref('produtos').on('value', function (dados) {
            if (dados) {
                var obj = dados.val();
                vm.produtos = dados.val();
                vm.listaProdutos =  Object.keys(obj).map(function (key) { return obj[key]; });
               
                vm.loader = false;
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            }else{
                 vm.loader = false;
            }
        });
    }

    function salvarProduto() {
        if (validarDadosProduto()) {

            vm.cadastrarProduto.dataDeCadastro = dataAtualDoSistema();

            ProdutoService.cadastrarProduto(vm.cadastrarProduto).then(function (response) {
                $('#adicionarProduto').modal('hide');
                swal("Produto Cadastrado", "", "success");
            }).catch(function (erro) {
                swal("ERRO", "Não foi possível realizar o cadastro", "error");
            })
        }
    }

    function dataAtualDoSistema() {
        return new Date().toLocaleDateString();
    }

    function validarDadosProduto() {
        var produtoValido = false;

        if (vm.cadastrarProduto.fornecedor != 'Selecione ...') {
            if (vm.cadastrarProduto.descricao != '' && vm.cadastrarProduto.quantidade != '' && vm.cadastrarProduto.preco != '' && vm.cadastrarProduto.fornecedor != '') {
                produtoValido = true;
            }
        }

        return produtoValido;
    }

    function alterarProduto(data, index) {
        vm.editarProduto = data;
        vm.indexProduto = index;
        abrirTelaEditarProduto();
    }

    
    function salvarEdicaoProduto() {
        if (validarDadosEditadoProduto()) {

            var updates = {};
            var key = Object.keys(vm.produtos)[vm.indexProduto];

            updates['/produtos/' + key] = vm.editarProduto;

            ProdutoService.editarProduto(updates).then(function (response) {
                if (!response) {
                    $('#editarProduto').modal('hide');
                    swal("Produto Alterado", "", "success");
                }
            }).catch(function (erro) {
                swal("ERRO", "Não foi possível realizar a alteração", "error");
            });

        }
    }

    function validarDadosEditadoProduto() {
        var produtoEditadoValido = false;

        if (vm.editarProduto.fornecedor != 'Selecione ...') {
            if (vm.editarProduto.descricao != '' && vm.editarProduto.quantidade != '' && vm.editarProduto.preco != '' && vm.editarProduto.fornecedor != '') {
                produtoEditadoValido = true;
            }
        }

        return produtoEditadoValido;
    }

    function detalharProduto(data) {
        vm.informacoesProduto = data;
        abrirTelaInformacoesProduto();
    }

    function removerProduto(data, index) {
        swal({
            title: "",
            text: "Realmente deseja remover este Produto?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, Remover Produto!",
            closeOnConfirm: false
        }, function () {
            swal("Produto Excluido!", "", "success");
            remover(data, index);
        });
    }

    function remover(data, index) {
        var key = Object.keys(vm.produtos)[index];

        ProdutoService.remover(key).then(function (response) { }).catch(function (erro) {
            swal("ERRO", "Não foi possível realizar a exclusão", "error");
        });
    }

    function abrirTelaAdicionarProduto() {
        vm.cadastrarProduto = {};
        $('#adicionarProduto').modal('show');
    }

    function abrirTelaInformacoesProduto() {
        $('#informacoesProduto').modal('show');
    }

    function abrirTelaEditarProduto() {
        $('#editarProduto').modal('show');
    }

    vm.fornecedores = [{
        nome: 'Selecione ...',
        cidade: '',
        estado: ''
    }, {
        nome: 'Fornecedor CG',
        cidade: 'Campina Grande',
        estado: 'PB'
    }]

});