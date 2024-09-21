import { HttpStatusCode } from 'axios';
import { EventoIn, EventoOut } from 'dtos/EventoDTO';
import { CreateEventoResponseDto } from 'dtos/pessoa-interessada/response';
import { Request, Response } from 'express';
import EventoModel from 'models/EventoModel';

const eventoModel = new EventoModel();
export default class EventoControl {
  public create = async (req: Request, res: Response) => {
    try {
      const evento: EventoIn = req.body;

      evento.dt_ini = new Date(evento.dt_ini);
      evento.dt_fim = new Date(evento.dt_fim);

      if (eventoModel.validaDatas(evento.dt_ini, evento.dt_fim)) {
        const newEvento: CreateEventoResponseDto = await eventoModel.criarEvento(evento);
        res.status(HttpStatusCode.Created).json(newEvento);
      } else {
        res.status(HttpStatusCode.BadRequest).send();
      }
    } catch (e) {
      return res.status(HttpStatusCode.InternalServerError).json(e);
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
