import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export class ProductController {
  async create(req: Request, res: Response) {
    try {
      const { name, quantity, price } = req.body;
      
      const product = await prisma.product.create({
        data: {
          name,
          quantity,
          price,
        },
      });

      return res.status(201).json(product);
    } catch (error) {
      return res.status(400).json({ error: 'Erro criando o produto' });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const products = await prisma.product.findMany();
      return res.json(products);
    } catch (error) {
      return res.status(400).json({ error: 'Error buscando os produtos' });
    }
  }
}