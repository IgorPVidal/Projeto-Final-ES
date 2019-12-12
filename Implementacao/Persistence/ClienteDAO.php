<?php
	
	class ClienteDAO{
		
		function __construct(){}
		
		//salva um cliente no banco de dados
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
		
		//consulta um cliente que possua o email e senha fornecidos
		function consultarPorEmailSenha($email, $senha, $conn){
			$sql = "SELECT * FROM cliente WHERE Email='" . $email . "' AND Senha='".$senha."'";
			$resultado = $conn->query($sql);
			return $resultado;
		}

		//consulta um cliente correspondente ao id fornecido
		function consultarPorId($idCliente, $conn){
			$sql = "SELECT * FROM cliente WHERE IdCliente = " . $idCliente;
			$resultado = $conn->query($sql);
			return $resultado;
		}

		//consulta um cliente correspondente ao nome fornecido
		function consultarPorNome($nome, $conn){
			$sql = "SELECT * FROM cliente WHERE Nome = '" . $nome . "'";
			$resultado = $conn->query($sql);
			return $resultado;
		}
		
	}
	
?>