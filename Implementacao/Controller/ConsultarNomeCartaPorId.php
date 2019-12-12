<?php

    include_once '..\Persistence\Connection.php';
	include_once '..\Persistence\CartaDAO.php';
    
    $idCarta = $_POST['IdCarta'];

    $conexao = new Connection();
    $conexao = $conexao->getConnection();
    
    $cartaDAO = new CartaDAO();
    $resultado = $cartaDAO->consultarPorId($idCarta, $conexao);

    if($resultado->num_rows > 0){
        $linha = $resultado->fetch_assoc();
        echo $linha['Nome'];
    }

?>