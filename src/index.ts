import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { DateTime } from 'luxon';
import agendaRoutes from 'routes/AgendaRoutes';
import despesaRoutes from 'routes/DespesaRoutes';
import eventoRoutes from 'routes/EventoRoutes';
import oficinaRoutes from 'routes/OficinaRoutes';
import pessoaRoutes from 'routes/PessoaRoutes';
import tipooficinaRoutes from 'routes/tipooficinaRoutes';
import usuarioRoutes from 'routes/usuario-routes';
DateTime.local().setZone('America/Sao_Paulo');

const app = express();
app.use(cors());

app.use(express.json());
app.get('/', (req, res) => {
  return res.send('Hello World');
});
//app.use("/users", authentication, usersRoutes);
//app.use("/users", usersRoutes);
app.use('/tipo-oficina', tipooficinaRoutes);
app.use('/despesa', despesaRoutes);
app.use('/user', usuarioRoutes);
app.use('/pessoa', pessoaRoutes);
app.use('/agenda', agendaRoutes);
app.use('/oficina', oficinaRoutes);
app.use('/evento', eventoRoutes);

app.listen(process.env.PORT || 3344);
