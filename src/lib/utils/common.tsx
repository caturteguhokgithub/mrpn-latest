import {IndikatorDto, RODataTable, RoDetailDto, RoDto} from "@/app/misc/rkp/rkpServiceModel";
import {MiscMasterRPJMNRes} from "@/app/misc/master/masterServiceModel";

export const GenerateProjectData = (data: RoDto[], year:number, rpjmn:MiscMasterRPJMNRes|undefined) => {

  interface DetailInterface {
    [key: string]: string | number;
  }

  let multiyear:number[] = [year]
  if (year == 0){
    multiyear = GenerateRpjmnYear(rpjmn)
  }

  let result:RODataTable[] = []
  data.map(x => {
    let rowData:RODataTable = JSON.parse(JSON.stringify(x))
    const interfaceDetail:DetailInterface = {}
    multiyear.map((y,i) => {
      const detail:RoDetailDto = generateTargetROFromDetail(y,x.detail)
      interfaceDetail["target_"+i] = detail.target
      interfaceDetail["satuan_"+i] = detail.satuan
      interfaceDetail["anggaran_"+i] = detail.anggaran
      interfaceDetail["sumber_anggaran_"+i] = detail.sumber_anggaran
    })

    const rowDataFinal = Object.assign(rowData, interfaceDetail)
    result.push(rowDataFinal)
  })

  return result

}

export const generateTargetROFromDetail = (year:number, roDetail:RoDetailDto[]) => {
  let result:RoDetailDto = {
    tahun: 0,
    target: "",
    satuan: "",
    anggaran: 0,
    sumber_anggaran: ""
  }
  const index = roDetail.findIndex(x => x.tahun == year)
  if (index > -1){
    result = roDetail[index]
  }
  return result
}

export const GenerateRpjmnYear = (rpjmn: MiscMasterRPJMNRes|undefined) => {
  let result:number[] = []
  if (rpjmn){
    for (let i = rpjmn.start; i <= rpjmn.end; i++) {
        result.push(i)
    }
  }
  return result
}

export const GetTarget = (rpjmn: MiscMasterRPJMNRes|undefined, year: number, indikator: IndikatorDto) => {
  let index = 0;

  if (rpjmn != undefined) {
    for (let i = rpjmn.start; i <= rpjmn.end; i++) {
      if (i !== year && i <= year) {
        index++;
      }
    }
  }
  let satuan = indikator.satuan.trim() == 'tanpa satuan' ? '' : indikator.satuan
  let target = "";
  switch (index) {
    case 0:
      target = (indikator.target_0 == "" ? "tbd" : indikator.target_0) + " " + satuan;
      break;
    case 1:
      target = (indikator.target_1 == "" ? "tbd" : indikator.target_1) + " " + satuan;
      break;
    case 2:
      target = (indikator.target_2 == "" ? "tbd" : indikator.target_2) + " " + satuan;
      break;
    case 3:
      target = (indikator.target_3 == "" ? "tbd" : indikator.target_3) + " " + satuan;
      break;
    case 4:
      target = (indikator.target_4 == "" ? "tbd" : indikator.target_4) + " " + satuan;
      break;
    default:
      target = (indikator.target_0 == "" ? "tbd" : indikator.target_0) + " " + (indikator.satuan == 'tanpa satuan' ? '' : indikator.satuan);
      break;
  }

  return target;
};

export const GenerateMonthFromInteger = (int:number) => {
  const monthList = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  if (int < 1 || int > 12){
    return "";
  }

  return monthList[(int-1)];
}