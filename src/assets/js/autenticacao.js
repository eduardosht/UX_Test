var authEmailPassButton = $('.authEmailPassButton');
var createUserButton = $('.createUserButton');
var logOutButton = $('.logOutButton');

var nomeInput= $('.nomeInput');
var emailInput= $('.emailInput');
var passwordInput = $('.passwordInput');
var senhoridadeInput= $('.senhoridadeInput');

var displayName = $('.displayName');


createUserButton.addEventListener('click',function(){
firebase
	.auth()
	.createUserWithEmailAndPassword(emailnput.value,passwordInpu.value)
	.then(function (){
    alert('Bem vindo '+emailInput.value);
    cadastraBD(nomeInput,emailInput,senhoridadeInput)
	})
	.catch(function(error){
	console.error(error.code);
	console.error(error.message);
	alert('Falha ao cadastrar, verifique o erro no console.');
	});
});

authEmailPassButton.addEventListener('click',function(){
firebase
	.auth()
	.signInWithEmailAndPassword(emailInput.value,passwordInput.value)
	.then(function(result){
		console.log(result);
		displayName.innerText = 'Bem vindo,'+emailInput.value;
		alert('Autenticado '+emailinput.value);
		
	})
	.catch(function(error){
	console.error(error.code);
	console.error(error.message);
	alert('Falha ao autenticar, verifique o erro no console.');
	});
});


logOutButton.addEventListener('click',function(){
firebase
	.auth()
	.signOut()
	.then(function(result){
		displayName.innerText = 'Você não está autenticado';
		alert('Autenticado '+emailinput.value);
	},function (error){
	console.error(error);
	});
});

async function cadastraBD(nomeInput,emailInput,senhoridadeInput){
    usuario={
        nome:nomeInput,
        email:emailInput,
        senhoridade:senhoridadeInput
    } 
    await firebase.database().ref().child("casdatra").push(usuario);
  }


