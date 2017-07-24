(function() {
	'use strict';
	
	app.factory('LoginServices', LoginServices);
    
    LoginServices.$inject=['$http'];

    function LoginServices($http)  {
        
        return {
    		
    		autenticarUsuario : function autenticarUsuario( usuario){
                return firebase.auth().signInWithEmailAndPassword(usuario.email, usuario.senha);
            },

            cadastrarUsuario : function cadastrarUsuario( usuario ){
                return firebase.database().ref('usuarios').push(usuario);
            },

            liberarAutenticacaoUsuario: function liberarAutenticacaoUsuario( usuario){
                return firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha);
            }

    	};
	};		
})();