<?php
    
	require_once('Prototipo com php\Model\Carta.php');
	require_once('Prototipo com php\Persistence\Connection.php');


	class TestCarta extends PHPUnit\Framework\TestCase{
		
		//testa o construtor da classe Carta
		public function testConstrutorCarta(){
			$carta = new Carta("Carta TesteConstrutor", "Carta utilizada para teste de construtor", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAgAElEQVR4nO3dd3xN9/", 2);
			$this->assertEquals("Carta TesteConstrutor", $carta->getNome(), "Nome errado");
			$this->assertEquals("Carta utilizada para teste de construtor", $carta->getDescricao(), "Descricao errada");
			$this->assertEquals("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAgAElEQVR4nO3dd3xN9/", $carta->getImagem(), "Imagem errada");
			$this->assertEquals(2, $carta->getIdAutor(), "IdAutor errado");
		}
		
	}

?>