const connection = require('../config/db');

exports.criarMorador = (req, res) => {
    const { idApartamento, nome, telefone, email, status, criadoEm } = req.body;
    const query = 'INSERT INTO Moradores (id_apartamento, nome, telefone, email, status, criado_em) VALUES (?, ?, ?, ?, ?, ?)';
    const params = [idApartamento, nome, telefone, email, status, criadoEm];

    connection.query(query, params, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao cadastrar morador.'});
        }
        res.json({ success: true, message: 'Morador cadastrado com sucesso!', data: results.insertId});
    });
}

exports.listarMoradores = (req, res) => {
    const query = 'SELECT * FROM Moradores M LEFT JOIN Apartamentos A ON M.id_apartamento = A.id_apartamento';
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao selecionar os moradores.'});
        }
        res.json({ success: true, message: 'Moradores selecionados com sucesso!', data: results});
    });
}

exports.selecionarMoradorPorId = (req, res) => {
    const query = 'SELECT * FROM Moradores M LEFT JOIN Apartamentos A ON M.id_apartamento = A.id_apartamento WHERE M.id_morador = ?';
    const params = [req.params.idMorador];
    connection.query(query, params, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao selecionar morador.' });
        }
        res.json({ success: true, data: results[0] });
    });
}

exports.listarMoradoresPorApartamento = (req, res) => {
    const query = 'SELECT * FROM Moradores M LEFT JOIN Apartamentos A ON M.id_apartamento = A.id_apartamento WHERE A.id_apartamento = ?';
    const params = [req.params.idApartamento];
    connection.query(query, params, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao selecionar moradores.' });
        }
        res.json({ success: true, data: results });
    });
}

exports.listarMoradoresPorNome = (req, res) => {
    const query = 'SELECT * FROM Moradores M LEFT JOIN Apartamentos A ON M.id_apartamento = A.id_apartamento WHERE M.nome = ?';
    const params = [req.params.nome];
    connection.query(query, params, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao selecionar moradores.' });
        }
        res.json({ success: true, data: results });
    });
}

exports.listarMoradoresPorTelefone = (req, res) => {
    const query = 'SELECT * FROM Moradores M LEFT JOIN Apartamentos A ON M.id_apartamento = A.id_apartamento WHERE M.telefone = ?';
    const params = [req.params.telefone];
    connection.query(query, params, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao selecionar moradores.' });
        }
        res.json({ success: true, data: results });
    });
}

exports.listarMoradoresPorEmail = (req, res) => {
    const query = 'SELECT * FROM Moradores M LEFT JOIN Apartamentos A ON M.id_apartamento = A.id_apartamento WHERE M.email = ?';
    const params = [req.params.email];
    connection.query(query, params, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao selecionar moradores.' });
        }
        res.json({ success: true, data: results });
    });
}

exports.listarMoradoresPorStatus = (req, res) => {
    const query = 'SELECT * FROM Moradores M LEFT JOIN Apartamentos A ON M.id_apartamento = A.id_apartamento WHERE M.status = ?';
    const params = [req.params.status];
    connection.query(query, params, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao selecionar moradores.' });
        }
        res.json({ success: true, data: results });
    });
}

exports.pesquisarMoradores = (req, res) => {
    const { pesquisa } = req.body;
    const query = `SELECT * FROM Moradores M LEFT JOIN Apartamentos A ON M.id_apartamento = A.id_apartamento
        OR M.id_morador = ?
        OR M.id_apartamento = ?
        OR M.nome LIKE '%?%'
        OR M.telefone LIKE '%?%'
        OR M.email LIKE '%?%'
        OR M.status LIKE '%?%'
        OR M.criado_em LIKE '%?%'
        OR A.bloco = ?
        OR A.numeracao LIKE '%?%'`;
    const params = [pesquisa, pesquisa, pesquisa, pesquisa, pesquisa, pesquisa, pesquisa, pesquisa, pesquisa];

    connection.query(query, params, (err, results) => {
        if (err || results.length == 0) {
            return res.status(500).json({ success: false, message: 'Erro ao pesquisar os moradores.'});
        }
        res.json({ success: true, message: 'Moradores pesquisados com sucesso!'});
    });
}

exports.atualizarMorador = (req, res) => {
    const { idApartamento, nome, telefone, email, status, criadoEm } = req.body;
    const { idMorador } = req.params;
    const query = 'UPDATE Moradores SET id_apartamento = ? WHERE id_morador = ?';
    const params = [idApartamento, nome, telefone, email, status, criadoEm, idMorador];

    connection.query(query, params, (err, results) => {
        if (err || results.length == 0) {
            return res.status(500).json({ success: false, message: 'Erro ao atualizar o morador.'});
        }
        res.json({ success: true, message: 'Morador atualizado com sucesso!'});
    });
}

exports.setIdApartamentoMorador = (req, res) => {
    const idApartamento = req.body.idApartamento;
    const idMorador = req.params.idMorador;
    const query = 'UPDATE Moradores SET idApartamento = ? WHERE id_morador = ?';
    const params = [idApartamento, idMorador];

    connection.query(query, params, (err, results) => {
        if (err || results.length == 0) {
            return res.status(500).json({ success: false, message: 'Erro ao atualizar o id do apartamento do morador.'});
        }
        res.json({ success: true, message: 'Id do apartamento do morador atualizado com sucesso!'});
    });
}

exports.setNomeMorador = (req, res) => {
    const nome = req.body.nome;
    const idMorador = req.params.idMorador;
    const query = 'UPDATE Moradores SET nome = ? WHERE id_morador = ?';
    const params = [nome, idMorador];

    connection.query(query, params, (err, results) => {
        if (err || results.length == 0) {
            return res.status(500).json({ success: false, message: 'Erro ao atualizar o nome do morador.'});
        }
        res.json({ success: true, message: 'Nome do morador atualizado com sucesso!'});
    });
}

exports.setTelefoneMorador = (req, res) => {
    const telefone = req.body.telefone;
    const idMorador = req.params.idMorador;
    const query = 'UPDATE Moradores SET telefone = ? WHERE id_morador = ?';
    const params = [telefone, idMorador];

    connection.query(query, params, (err, results) => {
        if (err || results.length == 0) {
            return res.status(500).json({ success: false, message: 'Erro ao atualizar o telefone do morador.'});
        }
        res.json({ success: true, message: 'Telefone do morador atualizado com sucesso!'});
    });
}

exports.setEmailMorador = (req, res) => {
    const email = req.body.email;
    const idMorador = req.params.idMorador;
    const query = 'UPDATE Moradores SET email = ? WHERE id_morador = ?';
    const params = [email, idMorador];

    connection.query(query, params, (err, results) => {
        if (err || results.length == 0) {
            return res.status(500).json({ success: false, message: 'Erro ao atualizar o e-mail do morador.'});
        }
        res.json({ success: true, message: 'E-mail do morador atualizado com sucesso!'});
    });
}

exports.setStatusMorador = (req, res) => {
    const status = req.body.status;
    const idMorador = req.params.idMorador;
    const query = 'UPDATE Moradores SET status = ? WHERE id_morador = ?';
    const params = [status, idMorador];

    connection.query(query, params, (err, results) => {
        if (err || results.length == 0) {
            return res.status(500).json({ success: false, message: 'Erro ao atualizar o status do morador.'});
        }
        res.json({ success: true, message: 'Status do morador atualizado com sucesso!'});
    });
}

exports.setCriadoEmMorador = (req, res) => {
    const criadoEm = req.body.status;
    const idMorador = req.params.idMorador;
    const query = 'UPDATE Moradores SET criado_em = ? WHERE id_morador = ?';
    const params = [criadoEm, idMorador];

    connection.query(query, params, (err, results) => {
        if (err || results.length == 0) {
            return res.status(500).json({ success: false, message: 'Erro ao atualizar a data de criação do morador.'});
        }
        res.json({ success: true, message: 'Data de criação do morador atualizada com sucesso!'});
    });
}

exports.deletarMorador = (req, res) => {
    const query = 'DELETE FROM Moradores WHERE id_morador = ?';
    const params = [req.params.idMorador];

    connection.query(query, params, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao deletar o morador.'});
        }
        res.json({ success: true, message: 'Morador deletado com sucesso!'});
    });
}