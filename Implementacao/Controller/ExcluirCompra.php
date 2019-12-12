<?php
	include_once '..\Persistence\Connection.php';
	include_once '..\Persistence\CompraDAO.php';
	
	$idCompra = $_POST['deletePurchaseIdCompra'];
	
	$conexao = new Connection();
	$conexao = $conexao->getConnection();
	
	$compraDAO = new CompraDAO();
    
    //consulta o id da compra para conferir se existe
    $resultado = $compraDAO->consultarPorId($idCompra, $conexao);
	
	//testa se a consulta retornou alguma coisa
	if($resultado->num_rows > 0){
		$resultado = $compraDAO->excluirPorId($idCompra, $conexao);
		if($resultado === TRUE){
			echo "Compra excluída com sucesso!\nVoltando para o menu";
		} else {
			echo "Erro ao excluir: " . $conexao->error;
		}
	} else {
		echo "Id não encontrado.";
	}
	
?>