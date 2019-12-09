

function login(){

	var email = document.getElementById("loginEmail").value;
	var senha = document.getElementById("loginSenha").value;
	
	$.post("Controller/Login.php",
		{
			loginEmail: email,
			loginSenha: senha
		},
		function(resposta){
            if(resposta == true){
				//busca o id e guarda no localStorage para utilizar nas outras operações
				$.post("Controller/ConsultarIdClientePorEmail.php",
					{
						loginEmail: email,
						loginSenha: senha
					},
					function(idCliente){
						localStorage["idClienteLogado"] = idCliente;
						window.location.href='View/menu.html';
					}
				);
				
				
            }else{
                alert("Usuário ou senha incorretos");
            }
		}
    );	 
}


/*------------------------CARTA------------------------*/

function goCreateCard(){
	window.location.href='createCard.html';
}

function createCard(){
	var inputValido = true;
	var nome = document.getElementById("createCardNome").value;
	var descricao = document.getElementById("createCardDescricao").value;
	var img = document.getElementById("createCardImagem").value;
	var idAutor = localStorage["idClienteLogado"];


	if(nome.length > 50){
		alert("O nome não deve ultrapassar 50 caracteres!\nTente novamente");
		inputValido = false;
	}
	if(descricao.length > 500){
		alert("A descrição não deve ultrapassar 500 caracteres!\nTente novamente");
		inputValido = false;
	}

	var extensaoImagem = img.split('.').pop().toLowerCase();
	//Se fornecer uma imagem, ela deve ser válida.
	//também aceita '', pois é permitido criar uma carta sem fornecer uma imagem.
	//o método inArray() retorna -1 se a string informada não estiver na lista
	if(jQuery.inArray(extensaoImagem, ['gif', 'png', 'jpg', 'jpeg', '']) == -1){
		alert("Arquivo de imagem inválido.");
		inputValido = false;
	}

	if(inputValido){
		if(img == ""){
			//apenas realiza o cadastro
			$.post("../Controller/CadastrarCarta.php",
				{
					createCardNome: nome,
					createCardDescricao: descricao,
					createCardImagem: img,
					createCardIdAutor: idAutor
				},
				function(resposta){
					alert(resposta);
					window.location.href='menu.html';
				}
			);
		} else {
			img = new Image();
			//cria um canvas
			var canvas = document.createElement("canvas");
			var ctx = canvas.getContext("2d");

			//converte o arquivo em objeto url para ser usado como src pela imagem
			img.src = window.URL.createObjectURL(document.getElementById("createCardImagem").files[0]);
			//define função a ser executada quando a imagem for carregada
			img.onload = function(){
				//desenha a imagem no canvas adaptando a mesma para o tamanho do canvas
				ctx.drawImage(img, 0, 0, img.width,    img.height,     // source rectangle
								0, 0, canvas.width, canvas.height   // destination rectangle
				); 
				//converte o canvas em dado url
				img = canvas.toDataURL("image/png");

				//precisa executar aqui dentro para que dê tempo do canvas ser desenhado
				//a função do onload é executada em paralelo com o que viria nas próximas linhas
				//o que será armazenado é o dado url convertido do canvas
				$.post("../Controller/CadastrarCarta.php",
					{
						createCardNome: nome,
						createCardDescricao: descricao,
						createCardImagem: img,
						createCardIdAutor: idAutor
					},
					function(resposta){
						alert(resposta);
						window.location.href='menu.html';
					}
				);
			}
		}
	}
}

function goReadCard(){
	window.location.href='readCard.html';
}

function readCard(nome){

	$.post("../Controller/ConsultarCartas.php",
		{
			readCardNome: nome
		},
		function(resposta){
			if(resposta == false){
				alert("Não encontrada nenhuma carta com esse nome!");
			}else{
				document.getElementById("divConsultaCarta").hidden = true;
				var div = document.getElementById("divListaCarta");
				div.hidden = false;
				div.innerHTML = resposta;
			}
		}
	);
}

function showCard(nome, imagem, descricao, idAutor){
	//o que vem do banco de dados é o dado url convertido do canvas
	var dataURL = imagem;

	//pega o canvas da página
	var canvas = document.getElementById("viewCartaImagem");
	var ctx = canvas.getContext("2d");
	//cria uma imagem
	var img = new Image();
	
	//define função a ser executada quando a imagem for carregada
	img.onload = function(){
		//desenha a imagem no canvas adaptando a mesma para o tamanho do canvas
		ctx.drawImage(img, 0, 0, img.width,    img.height,     // source rectangle
						0, 0, canvas.width, canvas.height   // destination rectangle
		); 
	}
	//o src da imagem passa a ser o dado url. A função do onload será chamada
	img.src = dataURL;

	document.getElementById("viewCartaNome").innerHTML = nome;
	document.getElementById("viewCartaDescricao").innerHTML = descricao;

	$.post("../Controller/ConsultarNomeClientePorId.php",
		{
			showCardIdAutor: idAutor
		},
		function(nomeAutor){
			
			document.getElementById("viewCartaAutor").innerHTML += nomeAutor;
			

		}
	);


	document.getElementById("divListaCarta").hidden = true;
	document.getElementById("divShowCarta").hidden = false;
}




function goUpdateCardRead(){
	window.location.href='updateCardRead.html';
}

function updateCardRead(nome){
	$.post("../Controller/ConsultarCartasDoCliente.php",
		{
			updateCardReadNome: nome,
			idAutor: localStorage["idClienteLogado"]
		},
		function(resposta){
			if(resposta == false){
				alert("Não encontrada nenhuma carta com esse nome!");
			} else {
				document.getElementById("divBuscaCarta").hidden = true;
				var div = document.getElementById("divListaCartaAlterar");
				div.hidden = false;
				div.innerHTML = resposta;
			}
		}
	);
}

function updateCard(){
	var inputValido = true;
	var idCarta = document.getElementById("viewCartaUpdateId").value;
	var nome = document.getElementById("viewCartaUpdateNome").value;
	var descricao = document.getElementById("viewCartaUpdateDescricao").value;
	var img = document.getElementById("updateCardImagem").value;
	var idAutor = localStorage["idClienteLogado"];

	if(nome.length > 50){
		alert("O nome não deve ultrapassar 50 caracteres!\nTente novamente");
		inputValido = false;
	}
	if(descricao.length > 500){
		alert("A descrição não deve ultrapassar 500 caracteres!\nTente novamente");
		inputValido = false;
	}

	if(inputValido){
		if(img == ''){
			$.post("../Controller/AlterarCarta.php",
				{	
					updateCardIdCarta: idCarta,
					updateCardNome: nome,
					updateCardDescricao: descricao,
					updateCardIdAutor: idAutor
				},
				function(resposta){
					alert(resposta);
					window.location.href = "menu.html";
				}
			);
		}else{
			img = new Image();
			//cria um canvas
			var canvas = document.getElementById("viewCartaUpdateImagem");
			var ctx = canvas.getContext("2d");
			//define função a ser executada quando a imagem for carregada
			img.onload = function(){
				//desenha a imagem no canvas adaptando a mesma para o tamanho do canvas
				ctx.drawImage(img, 0, 0, img.width,    img.height,     // source rectangle
								0, 0, canvas.width, canvas.height   // destination rectangle
				); 
			}
			//converte o arquivo em objeto url para ser usado como src pela imagem
			img.src = window.URL.createObjectURL(document.getElementById("updateCardImagem").files[0]);
			//converte o canvas em dado url
			img = canvas.toDataURL("image/png");

			//o que será armazenado é o dado url convertido do canvas
			$.post("../Controller/AlterarCarta.php",
				{
					updateCardIdCarta: idCarta,
					updateCardNome: nome,
					updateCardDescricao: descricao,
					updateCardIdAutor: idAutor,
					updateCardImagem: img
				},
				function(resposta){
					alert(resposta);
					window.location.href = "menu.html";
				}
			);
		}
		
	}
}

function showUpdateCard(nome, imagem, descricao, idCarta){
	//o que vem do banco de dados é o dado url convertido do canvas
	var dataURL = imagem;

	//pega o canvas da página
	var canvas = document.getElementById("viewCartaUpdateImagem");
	var ctx = canvas.getContext("2d");
	//cria uma imagem
	var img = new Image();
	
	//define função a ser executada quando a imagem for carregada
	img.onload = function(){
		//desenha a imagem no canvas adaptando a mesma para o tamanho do canvas
		ctx.drawImage(img, 0, 0, img.width,    img.height,     // source rectangle
						0, 0, canvas.width, canvas.height   // destination rectangle
		); 
	}
	//o src da imagem passa a ser o dado url. A função do onload será chamada
	img.src = dataURL;

	document.getElementById("viewCartaUpdateId").value = idCarta;
	document.getElementById("viewCartaUpdateNome").value = nome;
	document.getElementById("viewCartaUpdateDescricao").value = descricao;

	document.getElementById("divListaCartaAlterar").hidden = true;
	document.getElementById("divAlterarDeletarCarta").hidden = false;
}

function alterarImagemUpdateInput(){
	var imagemValida = true;
	var img = document.getElementById("updateCardImagem").value;

	var extensaoImagem = img.split('.').pop().toLowerCase();
	//Se fornecer uma imagem, ela deve ser válida.
	//também aceita '', pois é permitido criar uma carta sem fornecer uma imagem.
	//o método inArray() retorna -1 se a string informada não estiver na lista
	if(jQuery.inArray(extensaoImagem, ['gif', 'png', 'jpg', 'jpeg', '']) == -1){
		alert("Arquivo de imagem inválido.");
		document.getElementById("updateCardImagem").value = '';
		imagemValida = false;
	}

	if(imagemValida){
		if(img != ''){
			img = new Image();
			//cria um canvas
			var canvas = document.getElementById("viewCartaUpdateImagem");
			var ctx = canvas.getContext("2d");
			//define função a ser executada quando a imagem for carregada
			img.onload = function(){
				//desenha a imagem no canvas adaptando a mesma para o tamanho do canvas
				ctx.drawImage(img, 0, 0, img.width,    img.height,     // source rectangle
								0, 0, canvas.width, canvas.height   // destination rectangle
				); 
			}
			//converte o arquivo em objeto url para ser usado como src pela imagem
			img.src = window.URL.createObjectURL(document.getElementById("updateCardImagem").files[0]);
		}
	}	
}

function deleteCard(){
	if(prompt("Você tem certeza que deseja deletar?\nDigite 'sim' para confirmar") == 'sim'){
		var idCarta = document.getElementById("viewCartaUpdateId").value;
		$.post("../Controller/ExcluirCarta.php",
			{
				deleteCardIdCarta: idCarta,
			},
			function(resposta){
				alert(resposta);
				window.location.href = "menu.html";
			}
		);
	}
}

/*------------------------COMPRA------------------------*/
function goCreatePurchase(){
	window.location.href='createPurchase.html';
}

function createPurchase(){
	var inputValido = true;
	var nomeCarta = document.getElementById("createPurchaseNomeCarta").value;
	var quantidade = document.getElementById("createPurchaseQuantidade").value;
	var nomeDestinatario = document.getElementById("createPurchaseNomeDestinatario").value;
	var endereco = document.getElementById("createPurchaseEndereco").value;
	var telefone = document.getElementById("createPurchaseContato").value;
	var idComprador = localStorage["idClienteLogado"];



	if(quantidade <= 0 || quantidade > 100){
		alert("Quantidade deve ser um número entre 1 e 100");
		inputValido = false;
	}

	if(endereco.length > 100){
		alert("Endereço de entrega deve possuir no máximo 100 caracteres");
		inputValido = false;
	}
	
	if(inputValido){
		$.post("../Controller/CadastrarCompra.php",
			{
				createPurchaseNomeCarta: nomeCarta,
				createPurchaseQuantidade: quantidade,
				createPurchaseNomeDestinatario: nomeDestinatario,
				createPurchaseEndereco: endereco,
				createPurchaseTelefone: telefone,
				createPurchaseIdComprador: idComprador
			},
			function(resposta){
				if(resposta == true){
					alert("Compra realizada com sucesso!\nVoltando ao menu");
					window.location.href = "menu.html";
				} else {
					alert(resposta);
				}
			}
		);
	}
}

function readPurchase(){
	window.location.href='readPurchase.html';
}
function updatePurchase(){
	window.location.href='updatePurchase.html';
}
function deletePurchase(){
	window.location.href='deletePurchase.html';
}
//-----------------------------------------------

function signUp(){
	var inputValido = true;

	var nome = document.getElementById("signUpNome").value;
	var email = document.getElementById("signUpEmail").value;
	var senha = document.getElementById("signUpSenha").value;
	var senhaConfirm = document.getElementById("signUpSenhaConfirm").value
	
	if(nome.length > 100){
		alert("O campo 'Nome' deve possuir no máximo 100 caracteres!\nTente novamente!");
		inputValido = false;
	}
	if(senha != senhaConfirm){
		alert("Confirmação de senha não corresponde à senha informada.\nTente novamente!")
		inputValido = false;
	}
	if(inputValido){
		$.post("../Controller/CadastrarCliente.php",
			{
				signUpNome: nome,
				signUpEmail: email,
				signUpSenha: senha
			},
			function(resposta){
                alert(resposta);
                window.location.href='../index.html';
			}
		);
	} 
}
//-----------------------------------------------
function returnHome(){
	window.location.href='menu.html';
}
function readUser(){
	window.location.href='readUser.html';
}
//-----------------------------------------------
function createCardSuccess(){
	alert("Carta criada com sucesso!\nVoltando ao menu");
	window.location.href='menu.html';
}
function createCardFail(){
	alert("Dados inválidos!\nTente novamente");
}
//-----------------------------------------------

//-----------------------------------------------
function updateCardSuccess(){
	alert("Carta atualizada com sucesso!\nVoltando para o menu");
	window.location.href='menu.html';
}
function updateCardFail(){
	alert("Dados inválidos\nTente novamente");
}

//-----------------------------------------------
function createPurchaseSuccess(){
	alert("Compra realizada com sucesso!\nO ID da compra é: {id_compra}\nVoltando ao menu");
	window.location.href='menu.html';
}
function createPurchaseFail(){
	alert("Dados inválidos!\nTente novamente");
}
//-----------------------------------------------
function readPurchaseSuccess(){
	alert("atualiza a página com uma lista contendo as compras que condizem com a busca, e ao clicar em uma, leva para a página seguinte");
	window.location.href='purchaseExample.html';
}
function readPurchaseFail(){
	alert("Não encontrada nenhuma compra com esse nome!");
}
function readPurchaseAll(){
	alert("lista todas as compras cadastradas aqui na página, e caso clique em alguma, leva para a seguinte tela");
	window.location.href='purchaseExample.html';
}
//-----------------------------------------------
function updatePurchaseAllowed(){
	window.location.href='updatePurchase.html';
}
function updatePurchaseDenied(){
	alert("Processo de realização/entrega em andamento, não é possivel alterar a compra!");
}
//-----------------------------------------------
function updatePurchaseSuccess(){
	alert("Dados da compra atualizados com sucesso!\nVoltando para o menu");
	window.location.href='menu.html';
}
function updatePurchaseFail(){
	alert("Dados inválidos\nTente novamente!");
}
function deletePurchase(){
	alert("Você tem certeza que deseja deletar?\n(caso a pessoa digite que sim, a compra é cancelada, e volta para o menu)");
	window.location.href='menu.html';
}
//-----------------------------------------------
function updateCardReadSuccess(){
	alert("atualiza a página com uma lista contendo as cartas que condizem com a busca (apenas as criadas por você), e ao clicar em uma, leva para a página seguinte");
	window.location.href='updateCard.html';
}
function updateCardReadFail(){
	alert("Não encontrada nenhuma carta com esse nome!");
}
function updateCardReadAll(){
	alert("lista todas as cartas cadastradas aqui na página (criadas por você), e caso clique em alguma, leva para a seguinte tela");
	window.location.href='updateCard.html';
}
//-----------------------------------------------
function updateUser(){
	window.location.href='updateUser.html';
}
//-----------------------------------------------
function updateUserSuccess(){
	alert("Dados atualizados com sucesso!\nVoltando ao perfil.");
	window.location.href='readUser.html';
}
function updateUserFail(){
	alert("Dados inválidos, tente novamente!");
}
function deleteUser(){
	alert("Tem certeza que deseja deletar sua conta? Todas as cartas criadas serão deletadas junto da conta.");
	window.location.href='index.html';
}