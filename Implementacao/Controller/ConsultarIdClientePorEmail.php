<?php

    include_once '..\Persistence\Connection.php';
	include_once '..\Persistence\ClienteDAO.php';
    
    $email = $_POST['loginEmail'];
    $senha = $_POST['loginSenha'];

    $conexao = new Connection();
    $conexao = $conexao->getConnection();
    
    $clienteDAO = new ClienteDAO();
    $resultado = $clienteDAO->consultarPorEmailSenha($email, $senha, $conexao);

    if($resultado->num_rows > 0){
        $linha = $resultado->fetch_assoc();
        echo $linha['IdCliente'];
    }

?>