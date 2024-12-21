import express from 'express';
import { corsMiddleware } from './middlewares/cors';
import { jsonMiddleware } from './middlewares/json';
import { productRoutes } from './routes/product.routes';

const app = express();

// Middlewares - apenas uma vez cada
app.use(corsMiddleware);
app.use(jsonMiddleware);

// Rotas
app.use('/api', productRoutes);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});