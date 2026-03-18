export interface MetaData {
  code: number;
  status: 'success' | 'error';
  message: string;
}

export interface ApiResponse<T = any> {
  metadata: MetaData;
  data?: T;
}

export interface Kategori {
  id: string;
  nama_kategori: string;
  created_at: string;
}

export interface Menu {
  id: string;
  kategori_id: string;
  nama_menu: string;
  harga: number;
  stok: number;
  created_at: string;
  kategori?: Partial<Kategori>;
}
