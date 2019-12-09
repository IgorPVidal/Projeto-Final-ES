<?php
	include_once '..\Persistence\Connection.php';
	include_once '..\Persistence\CartaDAO.php';
	
	$idCarta = $_POST['deleteCardIdCarta'];
	
	$conexao = new Connection();
	$conexao = $conexao->getConnection();
	
	$cartaDAO = new CartaDAO();
    
    
    $resultado = $cartaDAO->consultarPorId($idCarta, $conexao);

	
	
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