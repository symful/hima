import { KategoriRepository } from '../repositories/kategori.repository';
import { Kategori } from '../types';

export class KategoriService {
  constructor(private kategoriRepo: KategoriRepository) {}

  async create(nama_kategori: string): Promise<Kategori> {
    if (!nama_kategori || nama_kategori.trim() === '') {
      throw new Error('Nama kategori tidak boleh kosong');
    }
    return await this.kategoriRepo.create(nama_kategori);
  }

  async getAll(): Promise<Kategori[]> {
    return await this.kategoriRepo.getAll();
  }

  async getById(id: string): Promise<Kategori> {
    const kategori = await this.kategoriRepo.getById(id);
    if (!kategori) {
      throw new Error('Kategori tidak ditemukan');
    }
    return kategori;
  }

  async update(id: string, nama_kategori: string): Promise<Kategori> {
    if (!nama_kategori || nama_kategori.trim() === '') {
      throw new Error('Nama kategori tidak boleh kosong');
    }
    const result = await this.kategoriRepo.update(id, nama_kategori);
    if (!result) {
      throw new Error('Kategori tidak ditemukan');
    }
    return result;
  }

  async delete(id: string): Promise<void> {
    const exists = await this.kategoriRepo.getById(id);
    if (!exists) {
      throw new Error('Kategori tidak ditemukan');
    }
    const success = await this.kategoriRepo.delete(id);
    if (!success) {
      throw new Error('Gagal menghapus kategori');
    }
  }
}
