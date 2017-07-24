(function() {
	'use strict';
	
	app.factory('MenuServices', MenuServices);
    
    MenuServices.$inject=['$http'];

    function MenuServices($http)  {
        
        return {
            
            /**
             * FUNÇÃO RESPONSAVEL POR DESCONECTAR O USUARIO LOGADO
             */
    		desconectarUsuario : function desconectarUsuario(){
                return firebase.auth().signOut();
            }
    	};
	};		
})();