import { Hono } from 'hono';
import { MenuRepository } from '../repositories/menu.repository';
import { KategoriRepository } from '../repositories/kategori.repository';
import { MenuService } from '../services/menu.service';
import { successResponse, errorResponse } from '../utils/response';

const menu = new Hono<{ Bindings: Bindings }>();

menu.post('/', async (c) => {
  try {
    const data = await c.req.json();
    const menuRepo = new MenuRepository(c.env.DB);
    const kategoriRepo = new KategoriRepository(c.env.DB);
    const service = new MenuService(menuRepo, kategoriRepo);
    const result = await service.create(data);
    return c.json(successResponse('Menu berhasil ditambahkan', result, 201), 201);
  } catch (err: any) {
    return c.json(errorResponse(err.message), 400);
  }
});

menu.get('/', async (c) => {
  try {
    const menuRepo = new MenuRepository(c.env.DB);
    const kategoriRepo = new KategoriRepository(c.env.DB);
    const service = new MenuService(menuRepo, kategoriRepo);
    const result = await service.getAll();
    return c.json(successResponse('Berhasil mengambil daftar menu', result));
  } catch (err: any) {
    return c.json(errorResponse(err.message), 500);
  }
});

menu.get('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const menuRepo = new MenuRepository(c.env.DB);
    const kategoriRepo = new KategoriRepository(c.env.DB);
    const service = new MenuService(menuRepo, kategoriRepo);
    const result = await service.getById(id);
    return c.json(successResponse('Berhasil mengambil detail menu', result));
  } catch (err: any) {
    return c.json(errorResponse(err.message, 404), 404);
  }
});

menu.patch('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const data = await c.req.json();
    const menuRepo = new MenuRepository(c.env.DB);
    const kategoriRepo = new KategoriRepository(c.env.DB);
    const service = new MenuService(menuRepo, kategoriRepo);
    const result = await service.update(id, data);
    return c.json(successResponse('Menu berhasil diperbarui', result));
  } catch (err: any) {
    return c.json(errorResponse(err.message), 400);
  }
});

menu.delete('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const menuRepo = new MenuRepository(c.env.DB);
    const kategoriRepo = new KategoriRepository(c.env.DB);
    const service = new MenuService(menuRepo, kategoriRepo);
    await service.delete(id);
    return c.json(successResponse('Menu berhasil dihapus'));
  } catch (err: any) {
    return c.json(errorResponse(err.message, 404), 404);
  }
});

export default menu;
