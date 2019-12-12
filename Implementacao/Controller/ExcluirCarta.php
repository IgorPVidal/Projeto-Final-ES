<?php
	include_once '..\Persistence\Connection.php';
	include_once '..\Persistence\CartaDAO.php';
	
	$idCarta = $_POST['deleteCardIdCarta'];
	
	$conexao = new Connection();
	$conexao = $conexao->getConnection();
	
	$cartaDAO = new CartaDAO();
    
    //consulta o id da carta para conferir se existe
    $resultado = $cartaDAO->consultarPorId($idCarta, $conexao);

	//testa se a consulta resultou em alguma coisa
	if($resultado->num_rows > 0){
		$resultado = $cartaDAO->excluirPorId($idCarta, $conexao);
		if($resultado === TRUE){
			echo "Carta excluída com sucesso!\nVoltando para o menu";
		} else {
			echo "Erro ao excluir: " . $conexao->error;
		}
	} else {
		echo "Id não encontrado.";
	}
	
?>