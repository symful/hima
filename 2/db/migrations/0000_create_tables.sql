-- Migration: Create categories and menus tables
CREATE TABLE IF NOT EXISTS kategori (
    id TEXT PRIMARY KEY,
    nama_kategori TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS menu (
    id TEXT PRIMARY KEY,
    kategori_id TEXT NOT NULL,
    nama_menu TEXT NOT NULL,
    harga INTEGER NOT NULL,
    stok INTEGER NOT NULL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (kategori_id) REFERENCES kategori(id) ON DELETE CASCADE
);
