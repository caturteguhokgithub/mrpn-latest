export interface Root {
  code: number;
  message: string;
  result: ResultCategory[];
}

export interface ResultCategory {
  id: number;
  uraian_penetapan_object_id: number;
  value: string;
  prioritas: string;
  desc: string;
  sub_kategori_risiko: SubKategoriRisiko[];
}

export interface SubKategoriRisiko {
  id: number;
  penetapan_kategori_risiko_id: number;
  value: string;
  desc: string;
}
