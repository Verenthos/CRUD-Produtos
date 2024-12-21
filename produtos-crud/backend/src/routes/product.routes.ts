import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Listar todos os produtos
router.get('/products', async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    return res.json(products);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return res.status(500).json({ error: "Erro ao buscar produtos" });
  }
});

// Buscar um produto específico
router.get('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id: Number(id) }
    });
    return res.json(product);
  } catch (error) {
    console.error('Erro ao buscar produto específico:', error);
    return res.status(500).json({ error: "Erro ao buscar produto" });
  }
});

// Criar produto
router.post('/products', async (req, res) => {
  try {
    console.log('Body recebido:', req.body);
    const { name, quantity, price } = req.body;
    
    console.log('Dados extraídos:', { name, quantity, price });
    
    // Validações
    if (!name || !quantity || !price) {
      console.log('Dados faltando:', { name, quantity, price });
      return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    const product = await prisma.product.create({
      data: {
        name,
        quantity: Number(quantity),
        price: Number(price)
      }
    });

    console.log('Produto criado:', product);
    return res.status(201).json(product);
  } catch (error) {
    console.error('Erro detalhado ao criar produto:', error);
    return res.status(500).json({ error: "Erro ao criar produto" });
  }
});

// Atualizar produto
router.put('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity, price } = req.body;
    const product = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        name,
        quantity: Number(quantity),
        price: Number(price)
      }
    });
    return res.json(product);
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    return res.status(500).json({ error: "Erro ao atualizar produto" });
  }
});

// Deletar produto
router.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.product.delete({
      where: { id: Number(id) }
    });
    return res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar produto:', error);
    return res.status(500).json({ error: "Erro ao deletar produto" });
  }
});

export { router as productRoutes };