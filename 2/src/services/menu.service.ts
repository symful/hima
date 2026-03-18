import { MenuRepository } from '../repositories/menu.repository';
import { KategoriRepository } from '../repositories/kategori.repository';
import { Menu } from '../types';

export class MenuService {
  constructor(
    private menuRepo: MenuRepository,
    private kategoriRepo: KategoriRepository
  ) {}

  async create(data: { kategori_id: string; nama_menu: string; harga: number; stok: number }): Promise<Menu> {
    if (!data.nama_menu || data.nama_menu.trim() === '') {
      throw new Error('Nama menu tidak boleh kosong');
    }
    if (data.harga < 0) {
      throw new Error('Harga tidak boleh negatif');
    }
    if (data.stok < 0) {
      throw new Error('Stok tidak boleh negatif');
    }

    const kategori = await this.kategoriRepo.getById(data.kategori_id);
    if (!kategori) {
      throw new Error('Kategori tidak valid');
    }

    return await this.menuRepo.create(data);
  }

  async getAll(): Promise<Menu[]> {
    return await this.menuRepo.getAll();
  }

  async getById(id: string): Promise<Menu> {
    const menu = await this.menuRepo.getById(id);
    if (!menu) {
      throw new Error('Menu tidak ditemukan');
    }
    return menu;
  }

  async update(id: string, data: Partial<{ nama_menu: string; harga: number; stok: number; kategori_id: string }>): Promise<Menu> {
    if (data.nama_menu !== undefined && data.nama_menu.trim() === '') {
      throw new Error('Nama menu tidak boleh kosong');
    }
    if (data.harga !== undefined && data.harga < 0) {
      throw new Error('Harga tidak boleh negatif');
    }
    if (data.stok !== undefined && data.stok < 0) {
      throw new Error('Stok tidak boleh negatif');
    }
    if (data.kategori_id !== undefined) {
      const kategori = await this.kategoriRepo.getById(data.kategori_id);
      if (!kategori) {
        throw new Error('Kategori tidak valid');
      }
    }

    const result = await this.menuRepo.update(id, data);
    if (!result) {
      throw new Error('Menu tidak ditemukan');
    }
    return result;
  }

  async delete(id: string): Promise<void> {
    const exists = await this.menuRepo.getById(id);
    if (!exists) {
      throw new Error('Menu tidak ditemukan');
    }
    const success = await this.menuRepo.delete(id);
    if (!success) {
      throw new Error('Gagal menghapus menu');
    }
  }
}
