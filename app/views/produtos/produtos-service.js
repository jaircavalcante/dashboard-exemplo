(function() {
	'use strict';
	
	app.factory('ProdutoService', ProdutoService);
    
    ProdutoService.$inject=['$http'];

    function ProdutoService($http)  {
        
        const TABELA = 'produtos';

        return {
            
            cadastrarProduto : function cadastrarProduto( produto ){
                return firebase.database().ref('produtos').push(produto);
            },

            remover : function remover( id ){
                return firebase.database().ref(TABELA).child(id).remove();
            },

            editarProduto : function editarProduto(produto){
                return firebase.database().ref().update(produto);
            }
    	};
	};		
})();