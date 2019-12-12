<?php
	include_once '..\Persistence\Connection.php';
	include_once '..\Model\Carta.php';
	include_once '..\Persistence\CartaDAO.php';
	
	
	$idCarta = $_POST['updateCardIdCarta'];
    $nome = $_POST['updateCardNome']; 
    $descricao = $_POST['updateCardDescricao'];
    $idAutor = $_POST['updateCardIdAutor'];

    $conexao = new Connection();
	$conexao = $conexao->getConnection();
    
    
    if(empty($_POST['updateCardImagem'])){
        $carta = new Carta($nome, $descricao, '', $idAutor);
    }else{
        $img = $_POST['updateCardImagem'];
        $carta = new Carta($nome, $descricao, $img, $idAutor);
    }

    $cartaDAO = new CartaDAO();
	echo $cartaDAO->alterarCarta($carta, $idCarta, $conexao);

?>