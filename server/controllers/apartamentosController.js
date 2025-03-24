import { query as _query } from '../config/db';

export function criarApartamento(req, res) {
    const { bloco, numeracao } = req.body;
    const query = 'INSERT INTO Apartamentos (bloco, numeracao) VALUES (?, ?)';
    const params = [bloco, numeracao];

    _query(query, params, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao cadastrar apartamento.'});
        }
        res.json({ success: true, message: 'Apartamento cadastrado com sucesso!'});
    });
}

export function listarApartamentos(req, res) {
    const query = 'SELECT * FROM Apartamentos';
    _query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao selecionar os apartamentos.'});
        }
        res.json({ success: true, message: 'Apartamentos selecionados com sucesso!', data: results});
    });
}

export function selecionarApartamentoPorId(req, res) {
    const query = 'SELECT * FROM Apartamentos WHERE id_apartamento = ?';
    const params = [req.params.idApartamento];

    _query(query, params, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao selecionar os apartamentos.'});
        }
        res.json({ success: true, message: 'Apartamentos selecionados com sucesso!', data: results});
    });
}

export function atualizarApartamento(req, res) {
    const { bloco, numeracao } = req.body;
    const { idApartamento } = req.params;
    const query = 'UPDATE Apartamentos SET bloco = ?, numeracao = ? WHERE id_apartamento = ?';
    const params = [bloco, numeracao, idApartamento];

    _query(query, params, (err, results) => {
        if (err || results.length == 0) {
            return res.status(500).json({ success: false, message: 'Erro ao atualizar o apartamento.'});
        }
        res.json({ success: true, message: 'Apartamento atualizado com sucesso!'});
    });
}

export function deletarApartamento(req, res) {
    const query = 'DELETE FROM Apartamentos WHERE id_apartamento = ?';
    const params = [req.params.idApartamento];

    _query(query, params, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao deletar o apartamento.'});
        }
        res.json({ success: true, message: 'Apartamento deletado com sucesso!'});
    });
}