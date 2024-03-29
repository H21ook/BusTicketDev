import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  sourceStops: any = [
    {
      "ss_A_id": 1,
      "ss_A_name": "Архангай",
      "ss_id": 12,
      "ss_name": "Ар.Эрдэнэбулган"
    }, {
      "ss_A_id": 1,
      "ss_A_name": "Архангай",
      "ss_id": 14,
      "ss_name": "Ар.Цэцэрлэг сум"
    }, {
      "ss_A_id": 1,
      "ss_A_name": "Архангай",
      "ss_id": 15,
      "ss_name": "Ар.Эрдэнэмандал"
    }, {
      "ss_A_id": 1,
      "ss_A_name": "Архангай",
      "ss_id": 16,
      "ss_name": "Ар.Жаргалант"
    }, {
      "ss_A_id": 1,
      "ss_A_name": "Архангай",
      "ss_id": 137,
      "ss_name": "Ар.Хотонт"
    }, {
      "ss_A_id": 1,
      "ss_A_name": "Архангай",
      "ss_id": 138,
      "ss_name": "Ар.Цэнхэр"
    }, {
      "ss_A_id": 1,
      "ss_A_name": "Архангай",
      "ss_id": 141,
      "ss_name": "Ар.Өлзийт"
    }, {
      "ss_A_id": 1,
      "ss_A_name": "Архангай",
      "ss_id": 142,
      "ss_name": "Ар.Хайрхан"
    }, {
      "ss_A_id": 1,
      "ss_A_name": "Архангай",
      "ss_id": 172,
      "ss_name": "Ар.Ихтамир"
    }, {
      "ss_A_id": 1,
      "ss_A_name": "Архангай",
      "ss_id": 218,
      "ss_name": "Ар.Тариат"
    }, {
      "ss_A_id": 1,
      "ss_A_name": "Архангай",
      "ss_id": 219,
      "ss_name": "Ар.Цахир"
    }, {
      "ss_A_id": 1,
      "ss_A_name": "Архангай",
      "ss_id": 275,
      "ss_name": "Ар.Чулуут"
    }, {
      "ss_A_id": 1,
      "ss_A_name": "Архангай",
      "ss_id": 290,
      "ss_name": "Ар.Чулуутын гүүр"
    }, {
      "ss_A_id": 1,
      "ss_A_name": "Архангай",
      "ss_id": 353,
      "ss_name": "Ар.Өндөр-Улаан"
    }, {
      "ss_A_id": 2,
      "ss_A_name": "Баян-Өлгий",
      "ss_id": 17,
      "ss_name": "Бө.Өлгий"
    }, {
      "ss_A_id": 3,
      "ss_A_name": "Баянхонгор",
      "ss_id": 18,
      "ss_name": "Бн.Баянхонгор"
    }, {
      "ss_A_id": 3,
      "ss_A_name": "Баянхонгор",
      "ss_id": 154,
      "ss_name": "Бн.Өлзийт"
    }, {
      "ss_A_id": 4,
      "ss_A_name": "Булган",
      "ss_id": 19,
      "ss_name": "Бу.Булган"
    }, {
      "ss_A_id": 4,
      "ss_A_name": "Булган",
      "ss_id": 20,
      "ss_name": "Бу.Гурванбулаг"
    }, {
      "ss_A_id": 4,
      "ss_A_name": "Булган",
      "ss_id": 21,
      "ss_name": "Бу.Рашаант"
    }, {
      "ss_A_id": 4,
      "ss_A_name": "Булган",
      "ss_id": 144,
      "ss_name": "Бу.Баяннуур"
    }, {
      "ss_A_id": 4,
      "ss_A_name": "Булган",
      "ss_id": 145,
      "ss_name": "Бу.Дашинчилэн"
    }, {
      "ss_A_id": 4,
      "ss_A_name": "Булган",
      "ss_id": 205,
      "ss_name": "Бу.Хутаг-Өндөр"
    }, {
      "ss_A_id": 5,
      "ss_A_name": "Говь-Алтай",
      "ss_id": 22,
      "ss_name": "Го.Есөнбулаг"
    }, {
      "ss_A_id": 5,
      "ss_A_name": "Говь-Алтай",
      "ss_id": 157,
      "ss_name": "Го.Дэлгэр"
    }, {
      "ss_A_id": 5,
      "ss_A_name": "Говь-Алтай",
      "ss_id": 197,
      "ss_name": "Го.Тонхил"
    }, {
      "ss_A_id": 5,
      "ss_A_name": "Говь-Алтай",
      "ss_id": 262,
      "ss_name": "Го.Шарга"
    }, {
      "ss_A_id": 6,
      "ss_A_name": "Дорноговь",
      "ss_id": 2,
      "ss_name": "Дг. Замын-Үүд"
    }, {
      "ss_A_id": 6,
      "ss_A_name": "Дорноговь",
      "ss_id": 320,
      "ss_name": "Дг.Сайншанд"
    }, {
      "ss_A_id": 6,
      "ss_A_name": "Дорноговь",
      "ss_id": 321,
      "ss_name": "Дг.Айраг"
    }, {
      "ss_A_id": 6,
      "ss_A_name": "Дорноговь",
      "ss_id": 325,
      "ss_name": "Дг.Даланжаргалан"
    }, {
      "ss_A_id": 7,
      "ss_A_name": "Дорнод",
      "ss_id": 26,
      "ss_name": "До.Хэрлэн"
    }, {
      "ss_A_id": 7,
      "ss_A_name": "Дорнод",
      "ss_id": 27,
      "ss_name": "До.Дашбалбар"
    }, {
      "ss_A_id": 7,
      "ss_A_name": "Дорнод",
      "ss_id": 169,
      "ss_name": "До.Баян-Уул"
    }, {
      "ss_A_id": 7,
      "ss_A_name": "Дорнод",
      "ss_id": 170,
      "ss_name": "До.Баяндун"
    }, {
      "ss_A_id": 8,
      "ss_A_name": "Дундговь",
      "ss_id": 28,
      "ss_name": "Ду.Сайнцагаан"
    }, {
      "ss_A_id": 8,
      "ss_A_name": "Дундговь",
      "ss_id": 31,
      "ss_name": "Ду.Дэлгэрхангай"
    }, {
      "ss_A_id": 8,
      "ss_A_name": "Дундговь",
      "ss_id": 32,
      "ss_name": "Ду.Эрдэнэдалай"
    }, {
      "ss_A_id": 8,
      "ss_A_name": "Дундговь",
      "ss_id": 187,
      "ss_name": "Ду.Дэлгэрцогт"
    }, {
      "ss_A_id": 8,
      "ss_A_name": "Дундговь",
      "ss_id": 238,
      "ss_name": "Ду.Луус"
    }, {
      "ss_A_id": 8,
      "ss_A_name": "Дундговь",
      "ss_id": 296,
      "ss_name": "Ду.Хулт"
    }, {
      "ss_A_id": 8,
      "ss_A_name": "Дундговь",
      "ss_id": 338,
      "ss_name": "Ду.Сайхан-Овоо"
    }, {
      "ss_A_id": 9,
      "ss_A_name": "Завхан",
      "ss_id": 33,
      "ss_name": "За.Улиастай"
    }, {
      "ss_A_id": 9,
      "ss_A_name": "Завхан",
      "ss_id": 173,
      "ss_name": "За.Их-Уул"
    }, {
      "ss_A_id": 9,
      "ss_A_name": "Завхан",
      "ss_id": 174,
      "ss_name": "За.Тосонцэнгэл"
    }, {
      "ss_A_id": 9,
      "ss_A_name": "Завхан",
      "ss_id": 175,
      "ss_name": "За.Тэлмэн"
    }, {
      "ss_A_id": 9,
      "ss_A_name": "Завхан",
      "ss_id": 193,
      "ss_name": "За.Нөмрөг"
    }, {
      "ss_A_id": 9,
      "ss_A_name": "Завхан",
      "ss_id": 194,
      "ss_name": "За.Сонгино"
    }, {
      "ss_A_id": 9,
      "ss_A_name": "Завхан",
      "ss_id": 254,
      "ss_name": "За.Тэс"
    }, {
      "ss_A_id": 9,
      "ss_A_name": "Завхан",
      "ss_id": 256,
      "ss_name": "За.Түдэвтэй"
    }, {
      "ss_A_id": 9,
      "ss_A_name": "Завхан",
      "ss_id": 350,
      "ss_name": "За.Асгат"
    }, {
      "ss_A_id": 9,
      "ss_A_name": "Завхан",
      "ss_id": 351,
      "ss_name": "За.Баянтэс"
    }, {
      "ss_A_id": 10,
      "ss_A_name": "Өвөрхангай",
      "ss_id": 35,
      "ss_name": "Өв.АРВАЙХЭЭР"
    }, {
      "ss_A_id": 10,
      "ss_A_name": "Өвөрхангай",
      "ss_id": 36,
      "ss_name": "Өв.ХУЖИРТ"
    }, {
      "ss_A_id": 10,
      "ss_A_name": "Өвөрхангай",
      "ss_id": 37,
      "ss_name": "Өв.САНТ"
    }, {
      "ss_A_id": 10,
      "ss_A_name": "Өвөрхангай",
      "ss_id": 38,
      "ss_name": "Өв.ЕСӨНЗҮЙЛ"
    }, {
      "ss_A_id": 10,
      "ss_A_name": "Өвөрхангай",
      "ss_id": 39,
      "ss_name": "Өв.ХАРХОРИН"
    }, {
      "ss_A_id": 10,
      "ss_A_name": "Өвөрхангай",
      "ss_id": 155,
      "ss_name": "Өв.НАРИЙН ТЭЭЛ"
    }, {
      "ss_A_id": 10,
      "ss_A_name": "Өвөрхангай",
      "ss_id": 181,
      "ss_name": "Өв.БҮРД"
    }, {
      "ss_A_id": 10,
      "ss_A_name": "Өвөрхангай",
      "ss_id": 182,
      "ss_name": "Өв.БАЯН-ӨНДӨР"
    }, {
      "ss_A_id": 10,
      "ss_A_name": "Өвөрхангай",
      "ss_id": 268,
      "ss_name": "Өв. БОГД"
    }, {
      "ss_A_id": 10,
      "ss_A_name": "Өвөрхангай",
      "ss_id": 269,
      "ss_name": "Өв. ГУЧИН УС"
    }, {
      "ss_A_id": 10,
      "ss_A_name": "Өвөрхангай",
      "ss_id": 274,
      "ss_name": "Өв.Бат-Өлзий"
    }, {
      "ss_A_id": 10,
      "ss_A_name": "Өвөрхангай",
      "ss_id": 291,
      "ss_name": "Өв.ӨЛЗИЙТ"
    }, {
      "ss_A_id": 11,
      "ss_A_name": "Өмнөговь",
      "ss_id": 40,
      "ss_name": "Өм.Даланзадгад"
    }, {
      "ss_A_id": 11,
      "ss_A_name": "Өмнөговь",
      "ss_id": 41,
      "ss_name": "Өм.Ханбогд"
    }, {
      "ss_A_id": 11,
      "ss_A_name": "Өмнөговь",
      "ss_id": 42,
      "ss_name": "Өм.Цогтцэций"
    }, {
      "ss_A_id": 11,
      "ss_A_name": "Өмнөговь",
      "ss_id": 183,
      "ss_name": "Өм.Цогт-Овоо"
    }, {
      "ss_A_id": 11,
      "ss_A_name": "Өмнөговь",
      "ss_id": 185,
      "ss_name": "Өм.Манлай"
    }, {
      "ss_A_id": 11,
      "ss_A_name": "Өмнөговь",
      "ss_id": 258,
      "ss_name": "Өм.Цагаанхад"
    }, {
      "ss_A_id": 11,
      "ss_A_name": "Өмнөговь",
      "ss_id": 266,
      "ss_name": "Өм.Гурвантэс"
    }, {
      "ss_A_id": 11,
      "ss_A_name": "Өмнөговь",
      "ss_id": 282,
      "ss_name": "Өм.Баяндалай"
    }, {
      "ss_A_id": 11,
      "ss_A_name": "Өмнөговь",
      "ss_id": 337,
      "ss_name": "Өм.Шивээхүрэн"
    }, {
      "ss_A_id": 11,
      "ss_A_name": "Өмнөговь",
      "ss_id": 368,
      "ss_name": "Өм.Гашуунсухайт боомт"
    }, {
      "ss_A_id": 12,
      "ss_A_name": "Сүхбаатар",
      "ss_id": 43,
      "ss_name": "Сү.Баруун-Урт"
    }, {
      "ss_A_id": 12,
      "ss_A_name": "Сүхбаатар",
      "ss_id": 190,
      "ss_name": "Сү.Мөнххаан"
    }, {
      "ss_A_id": 12,
      "ss_A_name": "Сүхбаатар",
      "ss_id": 234,
      "ss_name": "Сү.Асгат"
    }, {
      "ss_A_id": 12,
      "ss_A_name": "Сүхбаатар",
      "ss_id": 235,
      "ss_name": "Сү.Эрдэнэцагаан"
    }, {
      "ss_A_id": 12,
      "ss_A_name": "Сүхбаатар",
      "ss_id": 240,
      "ss_name": "Сү.Түвшинширээ"
    }, {
      "ss_A_id": 12,
      "ss_A_name": "Сүхбаатар",
      "ss_id": 241,
      "ss_name": "Сү.Баяндэлгэр"
    }, {
      "ss_A_id": 12,
      "ss_A_name": "Сүхбаатар",
      "ss_id": 244,
      "ss_name": "Сү.Онгон"
    }, {
      "ss_A_id": 12,
      "ss_A_name": "Сүхбаатар",
      "ss_id": 245,
      "ss_name": "Сү.Дарьганга"
    }, {
      "ss_A_id": 12,
      "ss_A_name": "Сүхбаатар",
      "ss_id": 271,
      "ss_name": "Сү.Түмэнцогт"
    }, {
      "ss_A_id": 13,
      "ss_A_name": "Сэлэнгэ",
      "ss_id": 4,
      "ss_name": "Сэ.Алтанбулаг"
    }, {
      "ss_A_id": 13,
      "ss_A_name": "Сэлэнгэ",
      "ss_id": 9,
      "ss_name": "Сэ.Сүхбаатар"
    }, {
      "ss_A_id": 13,
      "ss_A_name": "Сэлэнгэ",
      "ss_id": 163,
      "ss_name": "Сэ.Баянгол"
    }, {
      "ss_A_id": 13,
      "ss_A_name": "Сэлэнгэ",
      "ss_id": 177,
      "ss_name": "Сэ.Сайхан"
    }, {
      "ss_A_id": 13,
      "ss_A_name": "Сэлэнгэ",
      "ss_id": 179,
      "ss_name": "Сэ.Баруунбүрэн"
    }, {
      "ss_A_id": 13,
      "ss_A_name": "Сэлэнгэ",
      "ss_id": 239,
      "ss_name": "Сэ.Мандал"
    }, {
      "ss_A_id": 14,
      "ss_A_name": "Төв",
      "ss_id": 44,
      "ss_name": "Тө.Зуунмод"
    }, {
      "ss_A_id": 14,
      "ss_A_name": "Төв",
      "ss_id": 46,
      "ss_name": "Тө.Баянжаргалан"
    }, {
      "ss_A_id": 14,
      "ss_A_name": "Төв",
      "ss_id": 48,
      "ss_name": "Тө.Жаргалант"
    }, {
      "ss_A_id": 14,
      "ss_A_name": "Төв",
      "ss_id": 49,
      "ss_name": "Тө.Заамар"
    }, {
      "ss_A_id": 14,
      "ss_A_name": "Төв",
      "ss_id": 50,
      "ss_name": "Тө.Заа-Шижир Алт"
    }, {
      "ss_A_id": 14,
      "ss_A_name": "Төв",
      "ss_id": 51,
      "ss_name": "Тө.Өндөрширээт"
    }, {
      "ss_A_id": 14,
      "ss_A_name": "Төв",
      "ss_id": 54,
      "ss_name": "Тө.Угтаалцайдам"
    }, {
      "ss_A_id": 14,
      "ss_A_name": "Төв",
      "ss_id": 55,
      "ss_name": "Тө.Цээл"
    }, {
      "ss_A_id": 14,
      "ss_A_name": "Төв",
      "ss_id": 139,
      "ss_name": "Тө.Эрдэнэсант"
    }, {
      "ss_A_id": 14,
      "ss_A_name": "Төв",
      "ss_id": 140,
      "ss_name": "Тө.Лүн"
    }, {
      "ss_A_id": 14,
      "ss_A_name": "Төв",
      "ss_id": 147,
      "ss_name": "Тө.Эрдэнэ"
    }, {
      "ss_A_id": 14,
      "ss_A_name": "Төв",
      "ss_id": 158,
      "ss_name": "Тө.Баян"
    }, {
      "ss_A_id": 14,
      "ss_A_name": "Төв",
      "ss_id": 162,
      "ss_name": "Тө.Баянчандмань"
    }, {
      "ss_A_id": 14,
      "ss_A_name": "Төв",
      "ss_id": 191,
      "ss_name": "Тө.Баянхангай \/атар\/"
    }, {
      "ss_A_id": 14,
      "ss_A_name": "Төв",
      "ss_id": 221,
      "ss_name": "Тө.Баян-Өнжүүл"
    }, {
      "ss_A_id": 14,
      "ss_A_name": "Төв",
      "ss_id": 294,
      "ss_name": "Тө.Архуст"
    }, {
      "ss_A_id": 14,
      "ss_A_name": "Төв",
      "ss_id": 329,
      "ss_name": "Тө.Батсүмбэр"
    }, {
      "ss_A_id": 14,
      "ss_A_name": "Төв",
      "ss_id": 364,
      "ss_name": "Тө.Борнуур"
    }, {
      "ss_A_id": 14,
      "ss_A_name": "Төв",
      "ss_id": 372,
      "ss_name": "Тө.Бүрэн сум Булангаа баг"
    }, {
      "ss_A_id": 15,
      "ss_A_name": "Увс",
      "ss_id": 56,
      "ss_name": "Ув.Улаангом"
    }, {
      "ss_A_id": 15,
      "ss_A_name": "Увс",
      "ss_id": 195,
      "ss_name": "Ув.Наранбулаг"
    }, {
      "ss_A_id": 15,
      "ss_A_name": "Увс",
      "ss_id": 250,
      "ss_name": "Ув.Өндөрхангай"
    }, {
      "ss_A_id": 15,
      "ss_A_name": "Увс",
      "ss_id": 252,
      "ss_name": "Ув.Баруунтуруун"
    }, {
      "ss_A_id": 15,
      "ss_A_name": "Увс",
      "ss_id": 253,
      "ss_name": "Ув.Зүүнговь"
    }, {
      "ss_A_id": 15,
      "ss_A_name": "Увс",
      "ss_id": 259,
      "ss_name": "Увс.Ховд сум"
    }, {
      "ss_A_id": 15,
      "ss_A_name": "Увс",
      "ss_id": 260,
      "ss_name": "Ув.Өлгий"
    }, {
      "ss_A_id": 15,
      "ss_A_name": "Увс",
      "ss_id": 261,
      "ss_name": "Ув.Өмнөговь"
    }, {
      "ss_A_id": 15,
      "ss_A_name": "Увс",
      "ss_id": 322,
      "ss_name": "Ув.Зүүнхангай"
    }, {
      "ss_A_id": 16,
      "ss_A_name": "Ховд",
      "ss_id": 62,
      "ss_name": "Хо.Булган"
    }, {
      "ss_A_id": 16,
      "ss_A_name": "Ховд",
      "ss_id": 152,
      "ss_name": "Хо.Ховд"
    }, {
      "ss_A_id": 16,
      "ss_A_name": "Ховд",
      "ss_id": 153,
      "ss_name": "Хо.Дарви"
    }, {
      "ss_A_id": 16,
      "ss_A_name": "Ховд",
      "ss_id": 198,
      "ss_name": "Хо.Алтай"
    }, {
      "ss_A_id": 16,
      "ss_A_name": "Ховд",
      "ss_id": 199,
      "ss_name": "Хо.Үенч"
    }, {
      "ss_A_id": 17,
      "ss_A_name": "Хөвсгөл",
      "ss_id": 58,
      "ss_name": "Хө.Мөрөн"
    }, {
      "ss_A_id": 17,
      "ss_A_name": "Хөвсгөл",
      "ss_id": 59,
      "ss_name": "Хө.Тариалан"
    }, {
      "ss_A_id": 17,
      "ss_A_name": "Хөвсгөл",
      "ss_id": 200,
      "ss_name": "Хө.Рашаант"
    }, {
      "ss_A_id": 17,
      "ss_A_name": "Хөвсгөл",
      "ss_id": 201,
      "ss_name": "Хө.Тосонцэнгэл"
    }, {
      "ss_A_id": 17,
      "ss_A_name": "Хөвсгөл",
      "ss_id": 206,
      "ss_name": "Хө.Их-Уул"
    }, {
      "ss_A_id": 17,
      "ss_A_name": "Хөвсгөл",
      "ss_id": 333,
      "ss_name": "Хө.Хатгал"
    }, {
      "ss_A_id": 17,
      "ss_A_name": "Хөвсгөл",
      "ss_id": 334,
      "ss_name": "Хө.Галт"
    }, {
      "ss_A_id": 17,
      "ss_A_name": "Хөвсгөл",
      "ss_id": 335,
      "ss_name": "Хө.Жаргалант"
    }, {
      "ss_A_id": 18,
      "ss_A_name": "Хэнтий",
      "ss_id": 60,
      "ss_name": "Хэ.Хэрлэн"
    }, {
      "ss_A_id": 18,
      "ss_A_name": "Хэнтий",
      "ss_id": 61,
      "ss_name": "Хэ.Бор-Өндөр"
    }, {
      "ss_A_id": 18,
      "ss_A_name": "Хэнтий",
      "ss_id": 164,
      "ss_name": "Хэ.Цэнхэрмандал"
    }, {
      "ss_A_id": 18,
      "ss_A_name": "Хэнтий",
      "ss_id": 167,
      "ss_name": "Хэ.Батноров"
    }, {
      "ss_A_id": 18,
      "ss_A_name": "Хэнтий",
      "ss_id": 168,
      "ss_name": "Хэ.Норовлин"
    }, {
      "ss_A_id": 18,
      "ss_A_name": "Хэнтий",
      "ss_id": 207,
      "ss_name": "Хэ.Жаргалтхаан"
    }, {
      "ss_A_id": 18,
      "ss_A_name": "Хэнтий",
      "ss_id": 273,
      "ss_name": "Хэ.Бэрх"
    }, {
      "ss_A_id": 19,
      "ss_A_name": "Дархан-Уул",
      "ss_id": 10,
      "ss_name": "Да.Дархан"
    }, {
      "ss_A_id": 19,
      "ss_A_name": "Дархан-Уул",
      "ss_id": 25,
      "ss_name": "Да.Шарын гол"
    }, {
      "ss_A_id": 20,
      "ss_A_name": "Орхон",
      "ss_id": 34,
      "ss_name": "Ор.Баян-Өндөр"
    }, {
      "ss_A_id": 21,
      "ss_A_name": "Говьсүмбэр",
      "ss_id": 23,
      "ss_name": "Гс.Сүмбэр"
    }, {
      "ss_A_id": 21,
      "ss_A_name": "Говьсүмбэр",
      "ss_id": 159,
      "ss_name": "Гс.Баянтал"
    }, {
      "ss_A_id": 21,
      "ss_A_name": "Говьсүмбэр",
      "ss_id": 209,
      "ss_name": "Гс.12-р зөрлөг"
    }, {
      "ss_A_id": 21,
      "ss_A_name": "Говьсүмбэр",
      "ss_id": 236,
      "ss_name": "Гс.16-р Зөрлөг"
    }, {
      "ss_A_id": 21,
      "ss_A_name": "Говьсүмбэр",
      "ss_id": 355,
      "ss_name": "Гс.Шивээговь"
    }, {
      "ss_A_id": 22,
      "ss_A_name": "Улаанбаатар",
      "ss_id": 1,
      "ss_name": "УБ.Сонгинохайрхан"
    }, {
      "ss_A_id": 22,
      "ss_A_name": "Улаанбаатар",
      "ss_id": 210,
      "ss_name": "УБ.Баянзүрх"
    }, {
      "ss_A_id": 22,
      "ss_A_name": "Улаанбаатар",
      "ss_id": 211,
      "ss_name": "УБ.Нарантуул"
    }, {
      "ss_A_id": 22,
      "ss_A_name": "Улаанбаатар",
      "ss_id": 215,
      "ss_name": "УБ.Мишээл экспо"
    }, {
      "ss_A_id": 23,
      "ss_A_name": "Багануур",
      "ss_id": 65,
      "ss_name": "УБ.Багануур"
    }, {
      "ss_A_id": 24,
      "ss_A_name": "Багахангай",
      "ss_id": 66,
      "ss_name": "УБ.Багахангай"
    }, {
      "ss_A_id": 25,
      "ss_A_name": "ОХУ",
      "ss_id": 5,
      "ss_name": "ОХУ. Улаан-Үд"
    }, {
      "ss_A_id": 25,
      "ss_A_name": "ОХУ",
      "ss_id": 7,
      "ss_name": "ОХУ. Кяхта"
    }, {
      "ss_A_id": 26,
      "ss_A_name": "БНХАУ",
      "ss_id": 302,
      "ss_name": "БНХАУ.Мүшүюань"
    }, {
      "ss_A_id": 26,
      "ss_A_name": "БНХАУ",
      "ss_id": 359,
      "ss_name": "Хо.Булган сум"
    }, {
      "ss_A_id": 26,
      "ss_A_name": "БНХАУ",
      "ss_id": 360,
      "ss_name": "Булган боомт"
    }, {
      "ss_A_id": 30,
      "ss_A_name": "БНКазУ",
      "ss_id": 308,
      "ss_name": "Баян-Өлгий"
    }, {
      "ss_A_id": 30,
      "ss_A_name": "БНКазУ",
      "ss_id": 309,
      "ss_name": "БНКазУ.Павлодар"
    }, {
      "ss_A_id": 30,
      "ss_A_name": "БНКазУ",
      "ss_id": 310,
      "ss_name": "БНКазУ.Астана"
    }, {
      "ss_A_id": 30,
      "ss_A_name": "БНКазУ",
      "ss_id": 311,
      "ss_name": "БНКазУ.Караганда"
    }
  ];

  emptySeats: any = [
    {
      "seat_no": 1
    }, {
      "seat_no": 2
    }, {
      "seat_no": 3
    }, {
      "seat_no": 4
    }, {
      "seat_no": 5
    }, {
      "seat_no": 6
    }, {
      "seat_no": 7
    }, {
      "seat_no": 8
    }, {
      "seat_no": 9
    }, {
      "seat_no": 10
    }, {
      "seat_no": 11
    }, {
      "seat_no": 12
    }, {
      "seat_no": 13
    }, {
      "seat_no": 14
    }, {
      "seat_no": 15
    }, {
      "seat_no": 16
    }, {
      "seat_no": 17
    }, {
      "seat_no": 18
    }, {
      "seat_no": 19
    }, {
      "seat_no": 20
    }, {
      "seat_no": 21
    }, {
      "seat_no": 22
    }, {
      "seat_no": 23
    }, {
      "seat_no": 24
    }, {
      "seat_no": 25
    }, {
      "seat_no": 26
    }, {
      "seat_no": 27
    }, {
      "seat_no": 28
    }, {
      "seat_no": 29
    }, {
      "seat_no": 30
    }, {
      "seat_no": 31
    }, {
      "seat_no": 32
    }, {
      "seat_no": 33
    }, {
      "seat_no": 34
    }, {
      "seat_no": 35
    }, {
      "seat_no": 36
    }, {
      "seat_no": 37
    }, {
      "seat_no": 38
    }, {
      "seat_no": 39
    }, {
      "seat_no": 40
    }, {
      "seat_no": 41
    }, {
      "seat_no": 42
    }, {
      "seat_no": 43
    }, {
      "seat_no": 44
    }, {
      "seat_no": 45
    }
  ]


}
