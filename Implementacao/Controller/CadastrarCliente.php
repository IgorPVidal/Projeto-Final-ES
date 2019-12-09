<?php

	include_once '..\Persistence\Connection.php';
	include_once '..\Persistence\ClienteDAO.php';
	include_once '..\Model\Cliente.php';
	
	
	$nome = $_POST['signUpNome'];	
	$email = $_POST['signUpEmail'];
	$senha = $_POST['signUpSenha'];
	
	$conexao = new Connection();
	$conexao = $conexao->getConnection();
	
	$cliente = new Cliente($nome, $email, $senha);
	
	$clienteDAO = new ClienteDAO();
	echo $clienteDAO->salvar($cliente, $conexao);
	
	
?>