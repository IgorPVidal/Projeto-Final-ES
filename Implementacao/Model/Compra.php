<?php

    class Compra{
        private $idCarta;
        private $quantidade;
        private $endereco;
        private $telefone;
        private $idComprador;
        private $idDestinatario;

        function __construct($idCarta, $quantidade, $endereco, $telefone, $idComprador, $idDestinatario){
            $this->idCarta = $idCarta;
            $this->quantidade = $quantidade;
            $this->endereco = $endereco;
            $this->telefone = $telefone;
            $this->idComprador = $idComprador;
            $this->idDestinatario = $idDestinatario;
        }

        function getIdCarta(){
            return $this->idCarta;
        }

        function getQuantidade(){
            return $this->quantidade;
        }

        function getEndereco(){
            return $this->endereco;
        }

        function getTelefone(){
            return $this->telefone;
        }

        function getIdComprador(){
            return $this->idComprador;
        }

        function getIdDestinatario(){
            return $this->idDestinatario;
        }
    }

?>