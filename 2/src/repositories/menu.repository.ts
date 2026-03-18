import { Menu } from '../types';
import { nanoid } from 'nanoid';
import type { D1Database } from "@cloudflare/workers-types";

export class MenuRepository {
  constructor(private db: D1Database) {}

  async create(data: { kategori_id: string; nama_menu: string; harga: number; stok: number }): Promise<Menu> {
    const id = nanoid();
    const query = 'INSERT INTO menu (id, kategori_id, nama_menu, harga, stok) VALUES (?, ?, ?, ?, ?) RETURNING *';
    const result = await this.db.prepare(query).bind(id, data.kategori_id, data.nama_menu, data.harga, data.stok).first<Menu>();
    
    if (!result) {
      throw new Error('Gagal menambahkan menu');
    }
    return result;
  }

  async getAll(): Promise<Menu[]> {
    const query = `
      SELECT m.*, k.nama_kategori 
      FROM menu m 
      LEFT JOIN kategori k ON m.kategori_id = k.id 
      ORDER BY m.created_at DESC
    `;
    const { results } = await this.db.prepare(query).all();
    
    return (results || []).map((row: any) => ({
      id: row.id,
      kategori_id: row.kategori_id,
      nama_menu: row.nama_menu,
      harga: row.harga,
      stok: row.stok,
      created_at: row.created_at,
      kategori: {
        id: row.kategori_id,
        nama_kategori: row.nama_kategori
      }
    })) as Menu[];
  }

  async getById(id: string): Promise<Menu | null> {
    const query = `
      SELECT m.*, k.nama_kategori 
      FROM menu m 
      LEFT JOIN kategori k ON m.kategori_id = k.id 
      WHERE m.id = ?
    `;
    const row: any = await this.db.prepare(query).bind(id).first();
    
    if (!row) return null;

    return {
      id: row.id,
      kategori_id: row.kategori_id,
      nama_menu: row.nama_menu,
      harga: row.harga,
      stok: row.stok,
      created_at: row.created_at,
      kategori: {
        id: row.kategori_id,
        nama_kategori: row.nama_kategori
      }
    } as Menu;
  }

  async update(id: string, data: Partial<{ nama_menu: string; harga: number; stok: number; kategori_id: string }>): Promise<Menu | null> {
    const sets: string[] = [];
    const values: any[] = [];

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        sets.push(`${key} = ?`);
        values.push(value);
      }
    });

    if (sets.length === 0) return this.getById(id);

    values.push(id);
    const query = `UPDATE menu SET ${sets.join(', ')} WHERE id = ? RETURNING *`;
    const result = await this.db.prepare(query).bind(...values).first<Menu>();
    
    if (!result) return null;
    return this.getById(id); // Return with populated category
  }

  async delete(id: string): Promise<boolean> {
    const query = 'DELETE FROM menu WHERE id = ?';
    const { success } = await this.db.prepare(query).bind(id).run();
    return success;
  }
}
