import { Hono } from 'hono';
import { KategoriRepository } from '../repositories/kategori.repository';
import { KategoriService } from '../services/kategori.service';
import { successResponse, errorResponse } from '../utils/response';

const kategori = new Hono<{ Bindings: Bindings }>();

kategori.post('/', async (c) => {
  try {
    const { nama_kategori } = await c.req.json();
    const repo = new KategoriRepository(c.env.DB);
    const service = new KategoriService(repo);
    const result = await service.create(nama_kategori);
    return c.json(successResponse('Kategori berhasil ditambahkan', result, 201), 201);
  } catch (err: any) {
    return c.json(errorResponse(err.message), 400);
  }
});

kategori.get('/', async (c) => {
  try {
    const repo = new KategoriRepository(c.env.DB);
    const service = new KategoriService(repo);
    const result = await service.getAll();
    return c.json(successResponse('Berhasil mengambil daftar kategori', result));
  } catch (err: any) {
    return c.json(errorResponse(err.message), 500);
  }
});

kategori.get('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const repo = new KategoriRepository(c.env.DB);
    const service = new KategoriService(repo);
    const result = await service.getById(id);
    return c.json(successResponse('Berhasil mengambil detail kategori', result));
  } catch (err: any) {
    return c.json(errorResponse(err.message, 404), 404);
  }
});

kategori.patch('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const { nama_kategori } = await c.req.json();
    const repo = new KategoriRepository(c.env.DB);
    const service = new KategoriService(repo);
    const result = await service.update(id, nama_kategori);
    return c.json(successResponse('Kategori berhasil diperbarui', result));
  } catch (err: any) {
    return c.json(errorResponse(err.message), 400);
  }
});

kategori.delete('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const repo = new KategoriRepository(c.env.DB);
    const service = new KategoriService(repo);
    await service.delete(id);
    return c.json(successResponse('Kategori berhasil dihapus'));
  } catch (err: any) {
    return c.json(errorResponse(err.message, 404), 404);
  }
});

export default kategori;
