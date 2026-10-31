// Марки и модели. pt – силовые установки модели: bev (электро), erev (электро + бензиновый генератор),
// phev (подключаемый гибрид), ice (бензин). air: 'yes' – пневмоподвеска во всех версиях, 'part' – в части версий,
// 'no' – нет. gearbox – многоступенчатая коробка (робот или гибридная трансмиссия).
// note – только то, что знаем уверенно; что нужно подтвердить – check: true (в прототипе станет меткой «запросить»).

export const CITY = { name: 'Москва', in: 'в Москве', gen: 'Москвы' }; // меняется одной строкой – город не подтверждён владельцем

export const BRANDS = [
  {
    slug: 'lixiang', name: 'Lixiang', ru: 'Лисян', alt: ['Li Auto', 'Ли Авто', 'Лисянг', 'Ли Сян'],
    site: 'LIXIANG SERVICE', competitor: 'lixiangminsk.by',
    about: 'Li Auto (Lixiang) – китайская марка семейных кроссоверов. Основа линейки – серия L с последовательным гибридом: машину везут электродвигатели, а бензиновый двигатель 1.5T только заряжает батарею. Новые модели i и MEGA – чистые электромобили.',
    models: [
      { slug: 'l6', name: 'L6', body: 'кроссовер, 5 мест', pt: ['erev'], air: 'part', note: 'Младшая модель серии L. Электропривод на двух осях и бензиновый генератор 1.5T.' },
      { slug: 'l7', name: 'L7', body: 'кроссовер, 5 мест', pt: ['erev'], air: 'part', note: 'Пятиместный кроссовер серии L с генератором 1.5T. В старших версиях – пневмоподвеска.' },
      { slug: 'l8', name: 'L8', body: 'кроссовер, 6 мест', pt: ['erev'], air: 'part', note: 'Шестиместный кроссовер серии L с генератором 1.5T. В старших версиях – пневмоподвеска.' },
      { slug: 'l9', name: 'L9', body: 'полноразмерный кроссовер, 6 мест', pt: ['erev'], air: 'yes', note: 'Флагман серии L: генератор 1.5T, два электродвигателя, пневмоподвеска с изменением высоты.' },
      { slug: 'i6', name: 'i6', body: 'кроссовер, 5 мест', pt: ['bev'], air: 'part', check: true, note: 'Новый электрический кроссовер Li Auto без бензинового двигателя.' },
      { slug: 'i8', name: 'i8', body: 'кроссовер, 6 мест', pt: ['bev'], air: 'part', check: true, note: 'Электрический шестиместный кроссовер Li Auto без бензинового двигателя.' },
      { slug: 'mega', name: 'MEGA', body: 'минивэн', pt: ['bev'], air: 'yes', check: true, note: 'Электрический минивэн Li Auto на высоковольтной платформе.' },
    ],
  },
  {
    slug: 'zeekr', name: 'Zeekr', ru: 'Зикр', alt: ['Зекр', 'ZEEKR'],
    site: 'ZEEKR SERVICE', competitor: 'zeekrminsk.by',
    about: 'Zeekr – премиальная марка концерна Geely. Почти вся линейка – электромобили на платформе SEA. Исключение – большой кроссовер 9X: у него есть бензиновый двигатель.',
    models: [
      { slug: '001', name: '001', body: 'лифтбек-универсал', pt: ['bev'], air: 'part', note: 'Первая модель марки, электромобиль с одним или двумя двигателями.' },
      { slug: '007', name: '007', body: 'седан', pt: ['bev'], air: 'part', check: true, note: 'Электрический седан на платформе SEA.' },
      { slug: '007-gt', name: '007 GT', body: 'универсал', pt: ['bev'], air: 'part', check: true, note: 'Универсал на базе седана 007.' },
      { slug: '009', name: '009', body: 'минивэн', pt: ['bev'], air: 'part', note: 'Электрический минивэн бизнес-класса.' },
      { slug: '7x', name: '7X', body: 'кроссовер', pt: ['bev'], air: 'part', check: true, note: 'Электрический кроссовер среднего размера.' },
      { slug: 'x', name: 'X', body: 'компактный кроссовер', pt: ['bev'], air: 'no', note: 'Компактный электрический кроссовер.' },
      { slug: '8x', name: '8X', body: 'кроссовер', pt: ['phev'], air: 'part', check: true, note: 'Кроссовер с бензиновым двигателем и электроприводом – как и 9X, требует работ по ДВС.' },
      { slug: '9x', name: '9X', body: 'полноразмерный кроссовер', pt: ['phev'], air: 'yes', check: true, note: 'Флагманский кроссовер с бензиновым двигателем и электроприводом – единственная модель марки, которой нужны работы по ДВС.' },
    ],
  },
  {
    slug: 'voyah', name: 'Voyah', ru: 'Воя', alt: ['Вояж', 'VOYAH'],
    site: 'VOYAH SERVICE', competitor: 'voyahminsk.by',
    about: 'Voyah – премиальная марка Dongfeng. Модели выпускают в двух вариантах: электромобиль и версия с бензиновым двигателем-генератором или подключаемый гибрид.',
    models: [
      { slug: 'free', name: 'Free', body: 'кроссовер', pt: ['erev', 'bev'], air: 'part', note: 'Кроссовер в версиях с генератором и чисто электрической.' },
      { slug: 'dreamer', name: 'Dreamer', body: 'минивэн', pt: ['phev', 'bev'], air: 'part', note: 'Минивэн в версиях подключаемый гибрид и электромобиль.' },
      { slug: 'passion', name: 'Passion', body: 'седан', pt: ['bev', 'erev'], air: 'part', check: true, note: 'Седан, известен также как Zhuiguang.' },
      { slug: 'courage', name: 'Courage', body: 'кроссовер', pt: ['bev', 'erev'], air: 'part', check: true, note: 'Кроссовер, известен также как Zhiyin.' },
    ],
  },
  {
    slug: 'lynk-co', name: 'Lynk & Co', ru: 'Линк энд Ко', alt: ['Линк Ко', 'Lynk Co', 'Линкко'],
    site: 'LYNK & CO SERVICE', competitor: 'нет монобренда в Минске',
    about: 'Lynk & Co – марка Geely на платформах Volvo. В отличие от остальных марок здесь много машин с бензиновым двигателем и роботизированной коробкой, а также подключаемые гибриды EM-P. Электромобили – Z10 и Z20.',
    models: [
      { slug: '01', name: '01', body: 'кроссовер', pt: ['ice', 'phev'], air: 'no', gearbox: true, note: 'Кроссовер с бензиновым 2.0T и роботизированной коробкой или подключаемый гибрид.' },
      { slug: '03', name: '03', body: 'седан', pt: ['ice'], air: 'no', gearbox: true, note: 'Седан с бензиновым двигателем и роботизированной коробкой.' },
      { slug: '05', name: '05', body: 'купе-кроссовер', pt: ['ice', 'phev'], air: 'no', gearbox: true, note: 'Купе-кроссовер на базе 01.' },
      { slug: '06', name: '06', body: 'компактный кроссовер', pt: ['ice', 'phev'], air: 'no', gearbox: true, note: 'Компактный кроссовер с бензиновым двигателем или гибридом.' },
      { slug: '07', name: '07', body: 'седан', pt: ['phev'], air: 'no', gearbox: true, check: true, note: 'Седан с гибридной установкой EM-P.' },
      { slug: '08', name: '08', body: 'кроссовер', pt: ['phev'], air: 'part', gearbox: true, check: true, note: 'Кроссовер с гибридной установкой EM-P и большим запасом хода на электричестве.' },
      { slug: '09', name: '09', body: 'большой кроссовер, 7 мест', pt: ['ice', 'phev'], air: 'part', gearbox: true, check: true, note: 'Семиместный флагман на платформе SPA, как у Volvo XC90.' },
      { slug: '900', name: '900', body: 'большой кроссовер, 6 мест', pt: ['phev'], air: 'yes', gearbox: true, check: true, note: 'Флагманский гибридный кроссовер.' },
      { slug: 'z10', name: 'Z10', body: 'седан', pt: ['bev'], air: 'part', check: true, note: 'Электрический седан на платформе SEA, как у Zeekr.' },
    ],
  },
  // Geely и Changan – только электромобили и гибриды (решение владельца 01.11.2026: машины только с ДВС не берём).
  {
    slug: 'geely', evOnly: true, name: 'Geely', ru: 'Джили', alt: ['Geely Galaxy', 'Джили Галакси', 'Джилли'],
    site: 'GEELY EV SERVICE', competitor: 'geely-master.by, tochka-geely.by, galaxy-service.by',
    about: 'Geely – крупнейшая частная автогруппа Китая. Электромобили и гибриды марки выходят в линейке Galaxy: подключаемые гибриды на установках Thor и EM-i и электромобили на платформе GEA. Машины только с бензиновым двигателем (Monjaro, Atlas, Coolray и другие) этот сервис не обслуживает.',
    models: [
      { slug: 'galaxy-e5', name: 'Galaxy E5', body: 'кроссовер', pt: ['bev'], air: 'no', note: 'Электрический кроссовер на платформе GEA. В России – Geely EX5 (электрическая версия).' },
      { slug: 'galaxy-e8', name: 'Galaxy E8', body: 'седан', pt: ['bev'], air: 'no', check: true, note: 'Электрический седан бизнес-класса.' },
      { slug: 'galaxy-l6', name: 'Galaxy L6', body: 'седан', pt: ['phev'], air: 'no', gearbox: true, check: true, note: 'Седан с подключаемой гибридной установкой и гибридной коробкой DHT.' },
      { slug: 'galaxy-l7', name: 'Galaxy L7', body: 'кроссовер', pt: ['phev'], air: 'no', gearbox: true, check: true, note: 'Кроссовер с подключаемой гибридной установкой и гибридной коробкой DHT.' },
      { slug: 'starship-7', name: 'Galaxy Starship 7', body: 'кроссовер', pt: ['phev'], air: 'no', check: true, note: 'Кроссовер с гибридной установкой EM-i. В России продаётся как Geely EX5 EM-i – один из самых продаваемых подключаемых гибридов 2026 года.' },
      { slug: 'starshine-6', name: 'Galaxy Starshine 6', body: 'седан', pt: ['phev'], air: 'no', check: true, note: 'Седан с гибридной установкой EM-i.' },
      { slug: 'galaxy-m9', name: 'Galaxy M9', body: 'большой кроссовер', pt: ['phev'], air: 'part', check: true, note: 'Флагманский гибридный кроссовер линейки Galaxy.' },
      { slug: 'ex2', name: 'EX2', body: 'компактный кроссовер', pt: ['bev'], air: 'no', check: true, note: 'Компактный электромобиль, в Китае – Xingyuan.' },
    ],
  },
  {
    slug: 'changan', evOnly: true, name: 'Changan', ru: 'Чанган', alt: ['Чанган Циюань', 'Changan Qiyuan', 'Deepal', 'Дипал'],
    site: 'CHANGAN EV SERVICE', competitor: 'монобренда в Минске нет, в топе официальный changan.by и мультибренды',
    about: 'Changan – государственный автоконцерн Китая. Гибриды и электромобили выходят под марками Changan (версии iDD), Qiyuan и Deepal: электромобили, последовательные гибриды с бензиновым генератором и подключаемые гибриды. Машины только с бензиновым двигателем (CS35, CS55, UNI-V без iDD и другие) этот сервис не обслуживает.',
    models: [
      { slug: 'uni-k-idd', name: 'UNI-K iDD', body: 'кроссовер', pt: ['phev'], air: 'no', gearbox: true, check: true, note: 'Подключаемый гибрид с гибридной коробкой.' },
      { slug: 'qiyuan-a05', name: 'Qiyuan A05', body: 'седан', pt: ['phev'], air: 'no', check: true, note: 'Седан с подключаемой гибридной установкой.' },
      { slug: 'qiyuan-a06', name: 'Qiyuan A06', body: 'седан', pt: ['bev', 'erev'], air: 'no', check: true, note: 'Седан в версиях электромобиль и с бензиновым генератором.' },
      { slug: 'qiyuan-a07', name: 'Qiyuan A07', body: 'седан', pt: ['bev', 'erev'], air: 'no', check: true, note: 'Седан в версиях электромобиль и с бензиновым генератором.' },
      { slug: 'qiyuan-q05', name: 'Qiyuan Q05', body: 'компактный кроссовер', pt: ['phev', 'bev'], air: 'no', check: true, note: 'Компактный кроссовер – подключаемый гибрид или электромобиль.' },
      { slug: 'qiyuan-q07', name: 'Qiyuan Q07', body: 'кроссовер', pt: ['erev', 'bev'], air: 'no', check: true, note: 'Кроссовер с бензиновым генератором или электромобиль.' },
      { slug: 'deepal-s7', name: 'Deepal S7', body: 'кроссовер', pt: ['bev', 'erev'], air: 'no', check: true, note: 'Кроссовер Deepal в версиях электромобиль и с генератором. В России продаётся как Deepal S07.' },
      { slug: 'deepal-sl03', name: 'Deepal SL03', body: 'седан', pt: ['bev', 'erev'], air: 'no', check: true, note: 'Седан Deepal в версиях электромобиль и с генератором. В России продаётся как Deepal L07.' },
      { slug: 'deepal-g318', name: 'Deepal G318', body: 'внедорожник', pt: ['erev'], air: 'no', check: true, note: 'Рамный внедорожник с бензиновым генератором.' },
    ],
  },
];

// Признаки модели для фильтра услуг.
export function features(m) {
  const f = new Set(['all']);
  for (const p of m.pt) {
    if (p !== 'bev') f.add('engine');
    if (p !== 'ice') { f.add('hv'); f.add('plug'); }
    if (p === 'erev') f.add('erev');
  }
  if (m.air !== 'no') f.add('air');
  if (m.gearbox) f.add('gearbox');
  return f;
}

export const PT_NAME = { bev: 'электромобиль', erev: 'электромобиль с бензиновым генератором', phev: 'подключаемый гибрид', ice: 'бензиновый двигатель' };
