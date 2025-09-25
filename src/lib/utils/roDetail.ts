import { RoDetailDto } from "@/app/misc/rkp/rkpServiceModel";
import { FormatIDR } from "@/lib/utils/currency";

export const getDetailRO = (key: string, year: number, data: RoDetailDto[] | undefined) => {
  if (data == undefined) return "-";

  const d: RoDetailDto | undefined = data.find(x => x.tahun == year)
  if (d == undefined) {
    return "-";
  }

  if (key == "target") {
    return d.target
  }
  if (key == "anggaran") {
    const intVal: number = parseInt((d.anggaran / 1000).toFixed(2));
    return FormatIDR(intVal)
  }
  if (key == "satuan") {
    return d.satuan
  }
  if (key == "sumber_anggaran") {
    return d.sumber_anggaran
  }

  return "-";
};