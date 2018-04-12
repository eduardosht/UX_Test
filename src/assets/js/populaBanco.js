var usuarios;

testa();
createUsuario();

async function testa(){
usuario1={
nome:"Joelzinho",
email:"andreytsuzuki@gmail.com",
senhoridade:"junior"
}
usuario2={
    nome:"Lizinha",
    email:"zinho@gmail.com",
    senhoridade:"senior"
}
usuario3={
    nome:"Divinha",
    email:"gadual@gmail.com",
    senhoridade:"pleno"
}
usuarios={
    usuario1,usuario2,usuario3

}

}

async function createUsuario(){
  console.log("Oiee");
  $.each(usuarios, function(index, value) {
    firebase.database().ref().child("cadastro").push(value);
}); 

}
