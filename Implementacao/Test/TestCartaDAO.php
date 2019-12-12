<?php
    
	require_once('Implementacao\Persistence\CartaDAO.php');
	require_once('Implementacao\Persistence\Connection.php');


	class TestCartaDAO extends PHPUnit\Framework\TestCase{
		
		//testa o método salvar() da classe CartaDAO
		public function testSalvar(){
			$conexao = new Connection();
			$conexao = $conexao->getConnection();

			$carta = new Carta("Carta TesteCadastrar", "Carta utilizada para teste de cadastro", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAgAElEQVR4nO3dd3xN9/", 2);
			$cartaDAO = new CartaDAO();
			$cartaDAO->salvar($carta, $conexao);

			$resposta = $conexao->query("SELECT * FROM carta WHERE Nome = 'Carta TesteCadastrar'");
			$linha = $resultado->fetch_assoc();

			$this->assertEquals("Carta TesteCadastrar", $carta->getNome(), "Nome errado");
			$this->assertEquals("Carta utilizada para teste de cadastro", $carta->getDescricao(), "Descricao errada");
			$this->assertEquals("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAgAElEQVR4nO3dd3xN9/", $carta->getImagem(), "Imagem errada");
			$this->assertEquals(2, $carta->getIdAutor(), "IdAutor errado");
		}

	
		
		//testa o método alterarCarta() da classe CartaDAO
		public function testAlterarCarta(){
			$conexao = new Connection();
			$conexao = $conexao->getConnection();

			$carta = new Carta("Carta TesteAlterar", "Carta utilizada para teste de alteração", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAgAElEQVR4nO3dd3xN9/", 2);
			$cartaDAO = new CartaDAO();
			$cartaDAO->salvar($carta, $conexao);

			$resultado = $conexao->query("SELECT * FROM carta WHERE Nome = 'Carta TesteAlterar'");
			$linhaAntesDeAlterar = $resultado->fetch_assoc();
			$idCarta = $linhaAntesDeAlterar['IdCarta'];

			$carta = new Carta("Carta alterada", "Carta que foi alterada", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAgAElEQVR4nO3dd3xN9//", 2);
			$cartaDAO->alterarCarta($carta, $idCarta, $conexao);

			$resultado = $conexao->query("SELECT * FROM carta WHERE Nome = 'Carta alterada'");
			$linhaAposAlterar = $resultado->fetch_assoc();

			$this->assertEquals($linhaAntesDeAlterar['IdCarta'], $linhaAposAlterar['IdCarta'], "Não é a mesma carta");
			$this->assertEquals("Carta alterada", $linhaAposAlterar['Nome'], "Nome errado");
			$this->assertEquals("Carta que foi alterada", $linhaAposAlterar['Descricao'], "Descricao errada");
			$this->assertEquals("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAgAElEQVR4nO3dd3xN9//", $linhaAposAlterar['Imagem'], "Imagem errada");
			$this->assertEquals(2, $linhaAposAlterar['IdAutor'], "IdAutor errado");

		}
		
	}

?>
