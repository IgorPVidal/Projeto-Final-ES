<?php
	
	class Connection{
		private $servername = "localhost";
		private $username = "root";
		private $password = "";
		private $bd = "cardbuildmtg";
		private $conn = null;
		
		function __construct(){}
		
		//estabelece conexão com o banco de dados
		function getConnection(){
			//testa se uma conexão ainda não foi estabelecida
			if($this->conn == null){
				//cria uma conexão com o banco de dados
				$this->conn = mysqli_connect($this->servername, $this->username, $this->password, $this->bd);
			}
			
			//testa se a conexão ainda não foi estabelecida mesmo após a tentativa de conexão
			if($this->conn == null){
				die("conexão falhou:".$this->conn->connect_error);
			}
			return $this->conn;
		}
		
	}
	
?>