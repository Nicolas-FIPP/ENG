import { EventoIn, EventoOut } from 'dtos/EventoDTO';
import { Request, Response } from 'express';
import EventoModel from 'models/EventoModel';
import PessoaInteressadaModel from 'models/pessoa-interessada-model';

const eventoModel = new EventoModel();
const pessoaInteressadaModel = new PessoaInteressadaModel();
export default class EventoControl {
  create = async (req: Request, res: Response) => {
    try {
      const Evento: EventoIn = req.body;

      Evento.dt_ini = new Date(Evento.dt_ini);
      Evento.dt_fim = new Date(Evento.dt_fim);

      if (eventoModel.validaDatas(Evento.dt_ini, Evento.dt_fim)) {
        const newEvento: EventoOut = await eventoModel.create(Evento);

        // chamar notificar

        res.status(201).json(newEvento);
      } else {
        res.status(400).send({
          error: 'USR-01',
          message: 'Failed to create Evento: invalid date',
        });
      }
    } catch (e) {
      console.log('Failed to create Evento', e);
      res.status(500).send({
        error: 'USR-01',
        message: 'Failed to create Evento',
      });
    }
  };

  get = async (req: Request, res: Response) => {
    try {
      const id: number = parseInt(req.params.id);
      console.log(id);
      let newEvento: EventoOut | null = await eventoModel.get(id);

      if (newEvento) {
        res.status(200).json(newEvento);
      } else {
        res.status(404).json({
          error: 'USR-06',
          message: 'Evento not found.',
        });
      }
    } catch (e) {
      console.log('Failed to get Evento', e);
      res.status(500).send({
        error: 'USR-02',
        message: 'Failed to get Evento',
      });
    }
  };

  getAll = async (req: Request, res: Response) => {
    try {
      const Evento_s: EventoOut[] | null = await eventoModel.getAll();
      res.status(200).json(Evento_s);
    } catch (e) {
      console.log('Failed to get all Evento_s', e);
      res.status(500).send({
        error: 'USR-03',
        message: 'Failed to get all Evento_s',
      });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const id: number = parseInt(req.params.id);
      console.log('O ID AI = ', id);
      console.log('O QUE VEIO DO BODY UPDATE = ', req.body);
      const updateEvento: EventoIn = req.body;

      updateEvento.dt_ini = new Date(updateEvento.dt_ini);
      updateEvento.dt_fim = new Date(updateEvento.dt_fim);
      console.log('OBJETO CONVERTIDO UPDATE = ', updateEvento);

      const EventoUpdated: EventoOut | null = await eventoModel.update(id, updateEvento);

      if (EventoUpdated) {
        res.status(200).json(EventoUpdated);
      } else {
        res.status(404).json({
          error: 'USR-06',
          message: 'Evento not found.',
        });
      }
    } catch (e) {
      console.log('Failed to update Evento', e);
      res.status(500).send({
        error: 'USR-04',
        message: 'Failed to update Evento',
      });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const id: number = parseInt(req.params.id);
      const EventoDeleted = await eventoModel.delete(id);
      res.status(204).json(EventoDeleted);
    } catch (e) {
      console.log('Failed to delete Evento', e);
      res.status(500).send({
        error: 'USR-05',
        message: 'Failed to delete Evento',
      });
    }
  };
}
