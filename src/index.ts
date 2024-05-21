import "dotenv/config";
import express from "express";
import { authentication } from "middlewares/auth";
import { DateTime } from "luxon";
import tipooficinaRoutes from "routes/tipooficinaRoutes";
import despesaRoutes from "routes/DespesaRoutes"
import usuarioRoutes from "routes/UsuarioRoutes"
import pessoaRoutes from "routes/PessoaRoutes"
import oficinaRoutes from "routes/OficinaRoutes"
DateTime.local().setZone("America/Sao_Paulo");

const app = express();
import cors from 'cors';
app.use(cors())


app.use(express.json());
app.get("/", (req, res) => {
  return res.send("Hello World");
});
//app.use("/users", authentication, usersRoutes);
//app.use("/users", usersRoutes);
app.use("/tipo-oficina", tipooficinaRoutes);
app.use("/despesa", despesaRoutes)
app.use("/usuario", usuarioRoutes);
app.use("/pessoa", pessoaRoutes);
app.use("/oficina", oficinaRoutes);




app.listen(process.env.PORT || 3344);
