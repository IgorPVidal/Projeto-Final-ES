<?php

    class Carta{
        private $nome;
        private $descricao;
        private $imagem;
        private $idAutor;

        function __construct($nome, $descricao, $imagem, $idAutor){
            $this->nome = $nome;
            $this->descricao = $descricao;
            $this->imagem = $imagem;
            $this->idAutor = $idAutor;
        }

        function getNome(){
            return $this->nome;
        }

        function getDescricao(){
            return $this->descricao;
        }

        function getImagem(){
            return $this->imagem;
        }

        function getIdAutor(){
            return $this->idAutor;
        }
    }

?>