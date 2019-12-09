<?php
    include_once '..\Persistence\Connection.php';
    include_once '..\Persistence\CartaDAO.php';
    
    $nome = $_POST['readCardNome'];

    $conexao = new Connection();
    $conexao = $conexao->getConnection();
    
    $cartaDAO = new CartaDAO();
    $resultado = $cartaDAO->consultarPorSubstringNome($nome, $conexao);

    if($resultado->num_rows > 0){
        echo "<div class='item first-item'><h1>Resultados da Consulta</h1></div>";
        while($linha = $resultado->fetch_assoc()){
            echo "<div class='item'>
                    <button onclick='showCard(" . '"' 
                                                . $linha['Nome'] . '","'
                                                . $linha['Imagem'] . '","'
                                                . $linha['Descricao'] . '",'
                                                . $linha['IdAutor'] . ")'
                    >".$linha['Nome']."</button>
                </div>";
		}
    }else{
        echo FALSE;
    }
?>