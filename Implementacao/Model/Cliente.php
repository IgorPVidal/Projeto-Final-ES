<?php
	
	class Cliente{
		private $nome;
		private $email;
		private $senha;
		
		function __construct($vnome, $vemail, $vsenha){
			$this->nome = $vnome;
			$this->email = $vemail;
			$this->senha = $vsenha;
		}
		
		function getNome(){
			return $this->nome;
		}
		
		function getEmail(){
			return $this->email;
		}
		
		function getSenha(){
			return $this->senha;
		}
	}
	
?>