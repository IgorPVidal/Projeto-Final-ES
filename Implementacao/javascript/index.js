/*------------------------LOGIN------------------------*/
//Consulta um cliente com base no email e senha fornecidos.
//Se for encontrado um cliente correspondente, armazena o id do cliente no localStorage e
//leva o usuário para o menu.
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

/*------------------------SIGN UP------------------------*/
//Cadastra um cliente com base no nome, email e senha informados e retorna para o login.
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

/*------------------------CARTA------------------------*/

//leva o usuário para a interface de cadastro de carta
function goCreateCard(){
	window.location.href='createCard.html';
}

//cadastra uma carta com base no nome, descrição e imagem fornecidos.
//Associa o id do cliente logado à carta cadastrada.
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

//leva o usuário para a interface de consulta de carta
function goReadCard(){
	window.location.href='readCard.html';
}

//consulta cartas cujo nome contenha a substring fornecida.
//se readAll = true, significa que o método foi chamado pela opção "listar todas".
//se readAll = false, significa que o método foi chamado pela consulta por substring.
//Torna o formulário de consulta oculto e revela a div que irá conter o resultado da consulta
function readCard(nome, readAll){

	$.post("../Controller/ConsultarCartas.php",
		{
			readCardNome: nome
		},
		function(resposta){
			if(resposta == false){
				if(readAll == true){
					alert("Não encontrada nenhuma carta!");
				} else {
					alert("Não encontrada nenhuma carta com esse nome!");
				}
			}else{
				document.getElementById("divConsultaCarta").hidden = true;
				var div = document.getElementById("divListaCarta");
				div.hidden = false;
				div.innerHTML = resposta;
			}
		}
	);
}

//Disponibiliza os dados de uma carta.
//Torna a div com o resultado da consulta anterior oculta e revela a div que
//disponibiliza os dados.
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
			IdCliente: idAutor
		},
		function(nomeAutor){
			
			document.getElementById("viewCartaAutor").innerHTML += nomeAutor;
			

		}
	);


	document.getElementById("divListaCarta").hidden = true;
	document.getElementById("divShowCarta").hidden = false;
}



//leva o usuário para a interface de consulta para alteração de carta
function goUpdateCardRead(){
	window.location.href='updateCardRead.html';
}

//consulta cartas cujo nome contenha a substring fornecida e foram criadas pelo cliente logado.
//se readAll = true, significa que o método foi chamado pela opção "listar todas".
//se readAll = false, significa que o método foi chamado pela consulta por substring.
//Torna o formulário de consulta para alteração oculto e revela a div que irá conter o resultado da consulta
function updateCardRead(nome, readAll){
	$.post("../Controller/ConsultarCartasDoCliente.php",
		{
			updateCardReadNome: nome,
			idAutor: localStorage["idClienteLogado"]
		},
		function(resposta){
			if(resposta == false){
				if(readAll == true){
					alert("Não encontrada nenhuma carta!");
				} else {
					alert("Não encontrada nenhuma carta com esse nome!");
				}
			} else {
				document.getElementById("divBuscaCarta").hidden = true;
				var div = document.getElementById("divListaCartaAlterar");
				div.hidden = false;
				div.innerHTML = resposta;
			}
		}
	);
}

//atualiza a carta com os dados informados e retorna para o menu
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

//torna visível a div com o formulário de alteração com os dados atuais da carta
//esconde a div com o resultado da consulta feita anteriormente
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

//atualiza a imagem mostrada no formulário de alteração de carta com base no
//arquivo fornecido pelo cliente
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

//Após receber a confirmação do cliente, deleta a carta mostrada no formulário de alteração de carta.
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
//leva o usuário para a interface de cadastro de compra
function goCreatePurchase(){
	window.location.href='createPurchase.html';
}

//cadastra uma compra com base no nome da carta, quantidade, nome do destinatário,
//endereço de entrega, telefone de contato fornecidos pelo cliente comprador.
//Busca o id da carta para associar à compra.
//Busca o id do destinatário para associar à compra.
//Associa o id do cliente logado à compra cadastrada.
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

//leva o usuário para a interface de consulta de compra
function goReadPurchase(){
	window.location.href='updatePurchaseRead.html';
}


//consulta compras cujo id contenha a substring fornecida e foram criadas pelo cliente logado.
//se readAll = true, significa que o método foi chamado pela opção "listar todas".
//se readAll = false, significa que o método foi chamado pela consulta por substring.
//Torna o formulário de consulta para alteração oculto e revela a div que irá conter o resultado da consulta
function readPurchase(idCompra, readAll){
	$.post("../Controller/ConsultarComprasDoCliente.php",
		{
			readPurchaseId: idCompra,
			readPurchaseIdCliente: localStorage["idClienteLogado"]
		},
		function(resposta){
			if(resposta == false){
				if(readAll == true){
					alert("Não encontrada nenhuma compra!");
				} else {
					alert("Não encontrada nenhuma compra com esse ID!");
				}
			} else {
				document.getElementById("divBuscaCompra").hidden = true;
				var div = document.getElementById("divListaCompra");
				div.hidden = false;
				div.innerHTML = resposta;
			}
		}
	);
}

//torna visível a div com o os dados atuais da compra.
//esconde a div com o resultado da consulta, feita anteriormente.
//armazena os dados atuais da compra nos inputs da div com formulário de alteração, ainda escondida.
function showPurchase(idCompra, idCarta, quantidade, endereco, telefone, idDestinatario){

	$.post("../Controller/ConsultarNomeClientePorId.php",
		{
			IdCliente: idDestinatario
		},
		function(nomeDestinatario){
			document.getElementById("viewCompraNomeDestinatario").innerHTML += nomeDestinatario;
			document.getElementById("updateCompraNomeDestinatario").value = nomeDestinatario;
		}
	);
	$.post("../Controller/ConsultarNomeCartaPorId.php",
		{
			IdCarta: idCarta
		},
		function(nomeCarta){
			document.getElementById("viewCompraNomeCarta").innerHTML += nomeCarta;
			document.getElementById("updateCompraNomeCarta").value = nomeCarta;
		}
	);
	//disponibiliza os dados para vizualização
	document.getElementById("viewCompraId").innerHTML += idCompra;
	document.getElementById("viewCompraQuantidade").innerHTML += quantidade;
	document.getElementById("viewCompraPreco").innerHTML += (quantidade * 1.50).toFixed(2);
	document.getElementById("viewCompraEndereco").innerHTML += endereco;
	document.getElementById("viewCompraTelefone").innerHTML += telefone;

	//coloca os dados como input da alteração. Que ainda permanecerá oculta até o usuário selecionar a opção "alterar".
	document.getElementById("updateCompraId").value = idCompra;
	document.getElementById("updateCompraQuantidade").value = quantidade;
	document.getElementById("updateCompraEndereco").value = endereco;
	document.getElementById("updateCompraTelefone").value = telefone;

	//esconde a lista de compras
	document.getElementById("divListaCompra").hidden = true;
	//torna a vizualização da compra visível
	document.getElementById("divShowCompra").hidden = false;
}

//esconde a div com os dados atuais da compra e torna visível a div com o formulário de alteração
function showUpdatePurchase(){
	document.getElementById("divShowCompra").hidden = true;
	document.getElementById("divUpdateDeleteCompra").hidden = false;
}


//atualiza a compra com os dados informados e retorna para o menu 
function updatePurchase(){
	var inputValido = true;
	var idCompra = document.getElementById("updateCompraId").value;
	var nomeCarta = document.getElementById("updateCompraNomeCarta").value;
	var quantidade = document.getElementById("updateCompraQuantidade").value;
	var nomeDestinatario = document.getElementById("updateCompraNomeDestinatario").value;
	var endereco = document.getElementById("updateCompraEndereco").value;
	var telefone = document.getElementById("updateCompraTelefone").value;
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
		$.post("../Controller/AlterarCompra.php",
			{	
				updatePurchaseIdCompra: idCompra,
				updatePurchaseNomeCarta: nomeCarta,
				updatePurchaseQuantidade: quantidade,
				updatePurchaseNomeDestinatario: nomeDestinatario,
				updatePurchaseEndereco: endereco,
				updatePurchaseTelefone: telefone,
				updatePurchaseIdComprador: idComprador
			},
			function(resposta){
				if(resposta == true){
					alert("Dados da compra atualizados com sucesso!\nVoltando para o menu");
					window.location.href = "menu.html";
				} else {
					alert(resposta);
				}
			}
		);
	}
}


//Após receber a confirmação do cliente, deleta a compra mostrada no formulário de alteração de compra.
function deletePurchase(){
	if(prompt("Você tem certeza que deseja deletar?\nDigite 'sim' para confirmar") == 'sim'){
		var idCompra = document.getElementById("updateCompraId").value;
		$.post("../Controller/ExcluirCompra.php",
			{
				deletePurchaseIdCompra: idCompra,
			},
			function(resposta){
				alert(resposta);
				window.location.href = "menu.html";
			}
		);
	}
}

/*------------------------  ------------------------*/
//retorna para o menu
function returnHome(){
	window.location.href='menu.html';
}

//leva o usuário para a visualização de seu perfil
function readUser(){
	window.location.href='readUser.html';
}
