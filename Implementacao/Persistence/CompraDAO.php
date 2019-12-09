<?php

    class CompraDAO{

        function __construct(){}

        function salvar($compra, $conn){
            $sql = "INSERT INTO compra(IdCarta, Quantidade, Endereco, Telefone, IdComprador, IdDestinatario) VALUES (".
				$compra->getIdCarta() . "," .
				$compra->getQuantidade() . ",'" .
                $compra->getEndereco() . "','" .
                $compra->getTelefone() . "'," .
                $compra->getIdComprador() . "," .
                $compra->getIdDestinatario() . ")";
			
			if($conn->query($sql) == TRUE){
				return TRUE;
			}else{
				return "Erro de cadastramento:".$conn->error;
			}
        }

        function consultarIdCompra($conn){
            
        }
        
        
    }

?>