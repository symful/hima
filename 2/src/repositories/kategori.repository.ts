import { Kategori } from '../types';
import { nanoid } from 'nanoid';
import type { D1Database } from "@cloudflare/workers-types";

export class KategoriRepository {
  constructor(private db: D1Database) {}

  async create(nama_kategori: string): Promise<Kategori> {
    const id = nanoid();
    const query = 'INSERT INTO kategori (id, nama_kategori) VALUES (?, ?) RETURNING *';
    const result = await this.db.prepare(query).bind(id, nama_kategori).first<Kategori>();
    
    if (!result) {
      throw new Error('Gagal menambahkan kategori');
    }
    return result;
  }

  async getAll(): Promise<Kategori[]> {
    const query = 'SELECT * FROM kategori ORDER BY created_at DESC';
    const { results } = await this.db.prepare(query).all<Kategori>();
    return results || [];
  }

  async getById(id: string): Promise<Kategori | null> {
    const query = 'SELECT * FROM kategori WHERE id = ?';
    return await this.db.prepare(query).bind(id).first<Kategori>();
  }

  async update(id: string, nama_kategori: string): Promise<Kategori | null> {
    const query = 'UPDATE kategori SET nama_kategori = ? WHERE id = ? RETURNING *';
    return await this.db.prepare(query).bind(nama_kategori, id).first<Kategori>();
  }

  async delete(id: string): Promise<boolean> {
    const query = 'DELETE FROM kategori WHERE id = ?';
    const { success } = await this.db.prepare(query).bind(id).run();
    return success;
  }
}
