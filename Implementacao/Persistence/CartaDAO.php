<?php

    class CartaDAO{

        function __construct(){}

        //salva uma carta no banco de dados
        function salvar($carta, $conn){
            $sql = "INSERT INTO carta(Nome, Descricao, Imagem, IdAutor) VALUES ('".
                $carta->getNome() . "','" .
                $carta->getDescricao() . "','" .
                $carta->getImagem() . "'," .
                $carta->getIdAutor() . ")";

            if($conn->query($sql) == TRUE){
                return "Carta criada com sucesso!\nVoltando ao menu";
            } else {
                return "Erro de cadastramento:".$conn->error;
            }
        }

        //consulta as cartas cujo nome contém o nome fornecido
        function consultarPorSubstringNome($nome, $conn){
            $sql = "SELECT IdCarta, Nome, Descricao, Imagem, IdAutor FROM carta WHERE Nome LIKE '%" . $nome . "%'";
			$resultado = $conn->query($sql);
            return $resultado;
        }

        //consulta as cartas que possuem o nome fornecido
        function consultarPorNome($nome, $conn){
            $sql = "SELECT IdCarta, Nome, Descricao, Imagem, IdAutor FROM carta WHERE Nome = '" . $nome . "'";
			$resultado = $conn->query($sql);
            return $resultado;
        }

        //consulta a carta que possui o id fornecido
        function consultarPorId($idCarta, $conn){
            $sql = "SELECT IdCarta, Nome, Descricao, Imagem, IdAutor FROM carta WHERE IdCarta=".$idCarta;
			$resultado = $conn->query($sql);
			return $resultado;
        }

        //consulta as cartas cujo nome contém o nome fornecido e foram criadas por um cliente específico
        function consultarCartasDeUmAutor($nomeCarta, $idAutor, $conn){
            $sql = "SELECT IdCarta, Nome, Descricao, Imagem, IdAutor FROM carta WHERE Nome LIKE '%" . $nomeCarta . "%' AND idAutor = ".$idAutor;
            $resultado = $conn->query($sql);
            return $resultado;
        }
        
        //altera a carta correspondente ao id fornecido com os valores da carta fornecida
        function alterarCarta($carta, $idCarta, $conn){
            if($carta->getImagem() == ''){
                $sql = "UPDATE carta SET Nome='" . $carta->getNome() . "',Descricao='" . $carta->getDescricao() . "' WHERE IdCarta =" . $idCarta;
            }else{
                $sql = "UPDATE carta SET Nome='" . $carta->getNome() . "',Descricao='" . $carta->getDescricao() . "',Imagem='" . $carta->getImagem() . "' WHERE IdCarta =" . $idCarta;
            }
            if($conn->query($sql) == TRUE){
                return "Carta atualizada com sucesso!\nVoltando para o menu";
            } else {
                return "Erro de alteração:".$conn->error;
            }
        }

        //exclui a carta correspondente ao id fornecido
        function excluirPorId($idCarta, $conn){
            $sql = "DELETE FROM carta WHERE IdCarta=" . $idCarta;
            $resultado = $conn->query($sql);
            return $resultado;
        }
        
    }

?>