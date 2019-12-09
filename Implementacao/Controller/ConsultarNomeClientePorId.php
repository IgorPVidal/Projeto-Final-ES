<?php

    include_once '..\Persistence\Connection.php';
	include_once '..\Persistence\ClienteDAO.php';
    
    $idCliente = $_POST['showCardIdAutor'];

    $conexao = new Connection();
    $conexao = $conexao->getConnection();
    
    $clienteDAO = new ClienteDAO();
    $resultado = $clienteDAO->consultarPorId($idCliente, $conexao);

    if($resultado->num_rows > 0){
        $linha = $resultado->fetch_assoc();
        echo $linha['Nome'];
    }

?>