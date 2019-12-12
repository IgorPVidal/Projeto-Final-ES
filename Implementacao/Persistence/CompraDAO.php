<?php

    class CompraDAO{

        function __construct(){}

        //salva uma compra no banco de dados
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

        //consulta as compras correspondentes ao id fornecido
        function consultarPorId($idCompra, $conn){
            $sql = "SELECT * FROM `compra` WHERE IdCompra=".$idCompra;
            $resultado = $conn->query($sql);
            return $resultado;
        }

        //consulta as compras de um cliente cujo id contém o id fornecido
        function consultarPorSubstringId($idCompra, $idComprador, $conn){
            $sql = "SELECT * FROM compra WHERE IdComprador=" . $idComprador . " AND IdCompra LIKE '%" . $idCompra . "%'";
            $resultado = $conn->query($sql);
            return $resultado;
        }
        
        //altera a compra correspondente ao id fornecido com os valores da compra fornecida
        function alterarCompra($compra, $idCompra, $conn){
            $sql = "UPDATE compra SET IdCarta=".$compra->getIdCarta().
                                    ",Quantidade=".$compra->getQuantidade().
                                    ",Endereco='".$compra->getEndereco().
                                    "',Telefone='".$compra->getTelefone().
                                    "',IdComprador=".$compra->getIdComprador().
                                    ",IdDestinatario=".$compra->getIdDestinatario().
                                    " WHERE IdCompra=".$idCompra;
            if($conn->query($sql) == TRUE){
                return TRUE;
            } else {
                return "Erro de alteração:".$conn->error;
            }
        }

        //exclui a compra correspondente ao id fornecido
        function excluirPorId($idCompra, $conn){
            $sql = "DELETE FROM compra WHERE IdCompra=" . $idCompra;
            $resultado = $conn->query($sql);
            return $resultado;
        }
        
    }

?>