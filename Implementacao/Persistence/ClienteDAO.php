<?php
	
	class ClienteDAO{
		
		function __construct(){}
		
		function salvar($cliente, $conn){
			$sql = "INSERT INTO cliente(Nome, Email, Senha) VALUES ('".
				$cliente->getNome() . "','" .
				$cliente->getEmail() . "','" .
				$cliente->getSenha() . "');";
			
			if($conn->query($sql) == TRUE){
				return "Conta criada com sucesso!\nVoltando à tela de Login";
			}else{
				return "Erro de cadastramento:".$conn->error;
			}
		}
		
		function consultarPorEmailSenha($email, $senha, $conn){
			$sql = "SELECT * FROM cliente WHERE Email='" . $email . "' AND Senha='".$senha."'";
			$resultado = $conn->query($sql);
			return $resultado;
		}

		function consultarPorId($idCliente, $conn){
			$sql = "SELECT * FROM cliente WHERE IdCliente = " . $idCliente;
			$resultado = $conn->query($sql);
			return $resultado;
		}

		function consultarPorNome($nome, $conn){
			$sql = "SELECT * FROM cliente WHERE Nome = '" . $nome . "'";
			$resultado = $conn->query($sql);
			return $resultado;
		}
		
	}
	
?>