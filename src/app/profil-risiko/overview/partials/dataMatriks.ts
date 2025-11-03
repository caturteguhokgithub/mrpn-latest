export const dataMatriks = [
  {
    id: 1,
    level: "konservatif",
    header: {
      title: "Matriks Analisis Risiko 5 X 5",
      levels: ["1", "2", "3", "4", "5"],
      descriptions: [
        "Tidak Signifikan",
        "Kurang Signifikan",
        "Cukup Signifikan",
        "Signifikan",
        "Sangat Signifikan",
      ],
    },
    rows: [
      {
        frequency: "Hampir Pasti Terjadi",
        values: [7, 12, 17, 22, 25],
        colors: ["green", "yellow", "orange", "red", "red"],
      },
      {
        frequency: "Sering Terjadi",
        values: [4, 9, 14, 19, 24],
        colors: ["blue", "green", "yellow", "orange", "red"],
      },
      {
        frequency: "Kadang Terjadi",
        values: [3, 8, 13, 18, 23],
        colors: ["blue", "green", "yellow", "orange", "red"],
      },
      {
        frequency: "Jarang Terjadi",
        values: [2, 6, 11, 16, 21],
        colors: ["blue", "green", "yellow", "orange", "red"],
      },
      {
        frequency: "Hampir Tidak Terjadi",
        values: [1, 5, 10, 15, 20],
        colors: ["blue", "blue", "green", "yellow", "orange"],
      },
    ],
  },
];
