import { Agendain, Agendaout } from 'dtos/AgendarDoacaoDTO';
import { Request, Response } from 'express';
import AgendarDoacaoModel from 'models/AgendarDoacaoModel';

const twilio = require('twilio');
const accountSid = 'AC7e1cc70e075f7aeca11eaa8c43141ae5';
const authToken = '9879f274d99128ad9a37cc3bd354e505';
const client = new twilio(accountSid, authToken);
const agendarModel = new AgendarDoacaoModel();

export default class AgendarDoacaoController {
  create = async (req: Request, res: Response) => {
    try {
      const Agenda: Agendain = req.body;
      Agenda.cpf = Agenda.cpf.replace(/[^\d]/g, '');
      Agenda.data = new Date(Agenda.data);
      const newagenda: Agendaout = await agendarModel.create(Agenda);

      res.status(201).json(newagenda);
    } catch (e) {
      console.log('Failed to create', e);
      res.status(500).send({
        error: 'USR-01',
        message: 'Failed to create',
      });
    }
  };

  getAll = async (req: Request, res: Response) => {
    try {
      const Agenda = await agendarModel.getAll();
      res.status(200).json(Agenda);
    } catch (e) {
      console.log('Failed to get all users', e);
      res.status(500).send({
        error: 'USR-03',
        message: 'Failed to get all users',
      });
    }
  };

  getAllaceita = async (req: Request, res: Response) => {
    try {
      const Agenda = await agendarModel.getAllaceita();
      res.status(200).json(Agenda);
    } catch (e) {
      console.log('Failed to get all users', e);
      res.status(500).send({
        error: 'USR-03',
        message: 'Failed to get all users',
      });
    }
  };

  aprovar = async (req: Request, res: Response) => {
    try {
      const id: number = parseInt(req.params.id);

      const vamo = await agendarModel.aceitar(id);

      res.status(200).json({ message: 'ok' });
    } catch (e) {
      console.log('Falha ao atualizar', e);
      res.status(500).send({
        error: 'USR-04',
        message: 'Falha ao atualizar',
      });
    }
  };

  recusar = async (req: Request, res: Response) => {
    try {
      const id: number = parseInt(req.params.id);

      const vamo = await agendarModel.reprovar(id);

      res.status(200).json({ message: 'ok' });
    } catch (e) {
      console.log('Falha ao atualizar', e);
      res.status(500).send({
        error: 'USR-04',
        message: 'Falha ao atualizar',
      });
    }
  };

  enviarsms = async (req: Request, res: Response) => {
    const { to, message } = req.body;

    client.messages
      .create({
        body: message,
        to: to,
        from: '+12182204634',
      })
      .then((message) => res.json({ success: true, sid: message.sid }))
      .catch((error) => res.status(500).json({ success: false, error: error.message }));
  };
}
