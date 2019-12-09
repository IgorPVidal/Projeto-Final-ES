<?php
    include_once '..\Persistence\Connection.php';
	include_once '..\Persistence\CartaDAO.php';
	include_once '..\Model\Carta.php';

	$nome = $_POST['createCardNome'];
	$descricao = $_POST['createCardDescricao'];
	$img = $_POST['createCardImagem'];
	$idAutor = $_POST['createCardIdAutor'];



	

	$conexao = new Connection();
	$conexao = $conexao->getConnection();

	$carta = new Carta($nome, $descricao, $img, $idAutor);

	$cartaDAO = new CartaDAO();
	echo $cartaDAO->salvar($carta, $conexao);

?>