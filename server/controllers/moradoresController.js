import { query as _query } from '../config/db';

export function criarMorador(req, res) {
    const { idApartamento, nome, telefone, email, status, criadoEm } = req.body;
    const query = 'INSERT INTO Moradores (id_apartamento, nome, telefone, email, status, criado_em) VALUES (?, ?, ?, ?, ?, ?)';
    const params = [idApartamento, nome, telefone, email, status, criadoEm];

    _query(query, params, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao cadastrar morador.'});
        }
        res.json({ success: true, message: 'Morador cadastrado com sucesso!'});
    });
}

export function listarMoradores(req, res) {
    const query = 'SELECT * FROM Moradores M JOIN Apartamentos A ON M.id_apartamento = A.id_apartamento';
    _query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao selecionar os moradores.'});
        }
        res.json({ success: true, message: 'Moradores selecionados com sucesso!', data: results});
    });
}

export function selecionarMoradorPorId(req, res) {
    const query = 'SELECT * FROM Moradores M JOIN Apartamentos A ON M.id_apartamento = A.id_apartamento WHERE id_morador = ?';
    const params = [req.params.idMorador];
    connection.query(query, params, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao selecionar morador.' });
        }
        res.json({ success: true, data: results });
    });
}

export function listarMoradoresPorApartamento(req, res) {
    const query = 'SELECT * FROM Moradores M JOIN Apartamentos A ON M.id_apartamento = A.id_apartamento WHERE id_apartamento = ?';
    const params = [req.params.idApartamento];
    connection.query(query, params, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao selecionar moradores.' });
        }
        res.json({ success: true, data: results });
    });
}

export function atualizarMorador(req, res) {
    const { idApartamento, nome, telefone, email, status, criadoEm } = req.body;
    const { idMorador } = req.params;
    const query = 'UPDATE Moradores SET id_apartamento = ? WHERE id_morador = ?';
    const params = [idApartamento, nome, telefone, email, status, criadoEm, idMorador];

    _query(query, params, (err, results) => {
        if (err || results.length == 0) {
            return res.status(500).json({ success: false, message: 'Erro ao atualizar o morador.'});
        }
        res.json({ success: true, message: 'Morador atualizado com sucesso!'});
    });
}

export function deletarMorador(req, res) {
    const query = 'DELETE FROM Moradores WHERE id_morador = ?';
    const params = [req.params.idMorador];

    _query(query, params, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao deletar o morador.'});
        }
        res.json({ success: true, message: 'Morador deletado com sucesso!'});
    });
}