<?php
    include_once '..\Persistence\Connection.php';
    include_once '..\Persistence\CartaDAO.php';
    
    $nome = $_POST['updateCardReadNome'];
    $idAutor = $_POST['idAutor'];

    $conexao = new Connection();
    $conexao = $conexao->getConnection();
    
    $cartaDAO = new CartaDAO();
    $resultado = $cartaDAO->consultarCartasDeUmAutor($nome, $idAutor, $conexao);

    if($resultado->num_rows > 0){
        echo "<div class='item first-item'><h1>Resultados da Consulta</h1></div>";
        while($linha = $resultado->fetch_assoc()){
            echo "<div class='item'>
                    <button onclick='showUpdateCard(" . '"' 
                                                . $linha['Nome'] . '","'
                                                . $linha['Imagem'] . '","'
                                                . $linha['Descricao'] . '",'
                                                . $linha['IdCarta'] . ")'
                    >".$linha['Nome']."</button>
                </div>";
		}
    }else{
        echo  FALSE;
    }
?>