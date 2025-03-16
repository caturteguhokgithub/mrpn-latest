export interface Root {
  code: number;
  message: string;
  result: ResultPossibility[];
}

export interface ResultPossibility {
  id: number;
  uraian_penetapan_objek_id: number;
  level_kemungkinan: string;
  probabilitas: string;
  jumlah_frekuensi: string;
  low_frekuensi: string;
}
