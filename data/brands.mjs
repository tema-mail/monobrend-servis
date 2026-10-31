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
      { slug: 'l6', name: 'L6', d: 9279, body: 'кроссовер, 5 мест', pt: ['erev'], air: 'part', note: 'Младшая модель серии L. Электропривод на двух осях и бензиновый генератор 1.5T.' },
      { slug: 'l7', name: 'L7', d: 16385, body: 'кроссовер, 5 мест', pt: ['erev'], air: 'part', note: 'Пятиместный кроссовер серии L с генератором 1.5T. В старших версиях – пневмоподвеска.' },
      { slug: 'l8', name: 'L8', d: 2004, body: 'кроссовер, 6 мест', pt: ['erev'], air: 'part', note: 'Шестиместный кроссовер серии L с генератором 1.5T. В старших версиях – пневмоподвеска.' },
      { slug: 'l9', name: 'L9', d: 15963, body: 'полноразмерный кроссовер, 6 мест', pt: ['erev'], air: 'yes', note: 'Флагман серии L: генератор 1.5T, два электродвигателя, пневмоподвеска с изменением высоты.' },
      { slug: 'i6', name: 'i6', d: 283, body: 'кроссовер, 5 мест', pt: ['bev'], air: 'part', check: true, note: 'Новый электрический кроссовер Li Auto без бензинового двигателя.' },
      { slug: 'i8', name: 'i8', d: 136, body: 'кроссовер, 6 мест', pt: ['bev'], air: 'part', check: true, note: 'Электрический шестиместный кроссовер Li Auto без бензинового двигателя.' },
      { slug: 'mega', name: 'MEGA', d: 415, body: 'минивэн', pt: ['bev'], air: 'yes', check: true, note: 'Электрический минивэн Li Auto на высоковольтной платформе.' },
    ],
  },
  {
    slug: 'zeekr', name: 'Zeekr', ru: 'Зикр', alt: ['Зекр', 'ZEEKR'],
    site: 'ZEEKR SERVICE', competitor: 'zeekrminsk.by',
    about: 'Zeekr – премиальная марка концерна Geely. Почти вся линейка – электромобили на платформе SEA. Исключение – большой кроссовер 9X: у него есть бензиновый двигатель.',
    models: [
      { slug: '001', name: '001', d: 40497, body: 'лифтбек-универсал', pt: ['bev'], air: 'part', note: 'Первая модель марки, электромобиль с одним или двумя двигателями.' },
      { slug: '007', name: '007', d: 6207, body: 'седан', pt: ['bev'], air: 'part', check: true, note: 'Электрический седан на платформе SEA.' },
      { slug: '007-gt', name: '007 GT', body: 'универсал', pt: ['bev'], air: 'part', check: true, note: 'Универсал на базе седана 007.' },
      { slug: '009', name: '009', d: 12617, body: 'минивэн', pt: ['bev'], air: 'part', note: 'Электрический минивэн бизнес-класса.' },
      { slug: '7x', name: '7X', d: 7969, body: 'кроссовер', pt: ['bev'], air: 'part', check: true, note: 'Электрический кроссовер среднего размера.' },
      { slug: 'x', name: 'X', d: 11955, body: 'компактный кроссовер', pt: ['bev'], air: 'no', note: 'Компактный электрический кроссовер.' },
      { slug: '8x', name: '8X', d: 42965, body: 'кроссовер', pt: ['phev'], air: 'part', check: true, note: 'Кроссовер с бензиновым двигателем и электроприводом – как и 9X, требует работ по ДВС.' },
      { slug: '9x', name: '9X', d: 49192, body: 'полноразмерный кроссовер', pt: ['phev'], air: 'yes', check: true, note: 'Флагманский кроссовер с бензиновым двигателем и электроприводом – единственная модель марки, которой нужны работы по ДВС.' },
    ],
  },
  {
    slug: 'voyah', name: 'Voyah', ru: 'Воя', alt: ['Вояж', 'VOYAH'],
    site: 'VOYAH SERVICE', competitor: 'voyahminsk.by',
    about: 'Voyah – премиальная марка Dongfeng. Модели выпускают в двух вариантах: электромобиль и версия с бензиновым двигателем-генератором или подключаемый гибрид.',
    models: [
      { slug: 'free', name: 'Free', d: 116640, body: 'кроссовер', pt: ['erev', 'bev'], air: 'part', note: 'Кроссовер в версиях с генератором и чисто электрической.' },
      { slug: 'dreamer', name: 'Dreamer', d: 19322, body: 'минивэн', pt: ['phev', 'bev'], air: 'part', note: 'Минивэн в версиях подключаемый гибрид и электромобиль.' },
      { slug: 'passion', name: 'Passion', d: 16256, body: 'седан', pt: ['bev', 'erev'], air: 'part', check: true, note: 'Седан, известен также как Zhuiguang.' },
      { slug: 'courage', name: 'Courage', d: 1162, body: 'кроссовер', pt: ['bev', 'erev'], air: 'part', check: true, note: 'Кроссовер, известен также как Zhiyin.' },
    ],
  },
  {
    slug: 'lynk-co', name: 'Lynk & Co', ru: 'Линк энд Ко', alt: ['Линк Ко', 'Lynk Co', 'Линкко'],
    site: 'LYNK & CO SERVICE', competitor: 'нет монобренда в Минске',
    about: 'Lynk & Co – марка Geely на платформах Volvo. В отличие от остальных марок здесь много машин с бензиновым двигателем и роботизированной коробкой, а также подключаемые гибриды EM-P. Электромобили – Z10 и Z20.',
    models: [
      { slug: '01', name: '01', d: 738, body: 'кроссовер', pt: ['ice', 'phev'], air: 'no', gearbox: true, note: 'Кроссовер с бензиновым 2.0T и роботизированной коробкой или подключаемый гибрид.' },
      { slug: '03', name: '03', d: 858, body: 'седан', pt: ['ice'], air: 'no', gearbox: true, note: 'Седан с бензиновым двигателем и роботизированной коробкой.' },
      { slug: '05', name: '05', d: 1152, body: 'купе-кроссовер', pt: ['ice', 'phev'], air: 'no', gearbox: true, note: 'Купе-кроссовер на базе 01.' },
      { slug: '06', name: '06', d: 5101, body: 'компактный кроссовер', pt: ['ice', 'phev'], air: 'no', gearbox: true, note: 'Компактный кроссовер с бензиновым двигателем или гибридом.' },
      { slug: '07', name: '07', d: 3060, body: 'седан', pt: ['phev'], air: 'no', gearbox: true, check: true, note: 'Седан с гибридной установкой EM-P.' },
      { slug: '08', name: '08', d: 1892, body: 'кроссовер', pt: ['phev'], air: 'part', gearbox: true, check: true, note: 'Кроссовер с гибридной установкой EM-P и большим запасом хода на электричестве.' },
      { slug: '09', name: '09', d: 3505, body: 'большой кроссовер, 7 мест', pt: ['ice', 'phev'], air: 'part', gearbox: true, check: true, note: 'Семиместный флагман на платформе SPA, как у Volvo XC90.' },
      { slug: '900', name: '900', d: 23410, body: 'большой кроссовер, 6 мест', pt: ['phev'], air: 'yes', gearbox: true, check: true, note: 'Флагманский гибридный кроссовер.' },
      { slug: 'z10', name: 'Z10', d: 210, body: 'седан', pt: ['bev'], air: 'part', check: true, note: 'Электрический седан на платформе SEA, как у Zeekr.' },
    ],
  },
  // Geely и Changan – только электромобили и гибриды (решение владельца 01.11.2026: машины только с ДВС не берём).
  {
    slug: 'geely', evOnly: true, name: 'Geely', ru: 'Джили', alt: ['Geely Galaxy', 'Джили Галакси', 'Джилли'],
    site: 'GEELY EV SERVICE', competitor: 'geely-master.by, tochka-geely.by, galaxy-service.by',
    about: 'Geely – крупнейшая частная автогруппа Китая. Электромобили и гибриды марки выходят в линейке Galaxy: подключаемые гибриды на установках Thor и EM-i и электромобили на платформе GEA. Машины только с бензиновым двигателем (Monjaro, Atlas, Coolray и другие) этот сервис не обслуживает.',
    models: [
      { slug: 'galaxy-e5', name: 'Galaxy E5', d: 1255, body: 'кроссовер', pt: ['bev'], air: 'no', note: 'Электрический кроссовер на платформе GEA. В России – Geely EX5 (электрическая версия).' },
      { slug: 'galaxy-e8', name: 'Galaxy E8', d: 412, body: 'седан', pt: ['bev'], air: 'no', check: true, note: 'Электрический седан бизнес-класса.' },
      { slug: 'galaxy-l6', name: 'Galaxy L6', d: 228, body: 'седан', pt: ['phev'], air: 'no', gearbox: true, check: true, note: 'Седан с подключаемой гибридной установкой и гибридной коробкой DHT.' },
      { slug: 'galaxy-l7', name: 'Galaxy L7', d: 1932, body: 'кроссовер', pt: ['phev'], air: 'no', gearbox: true, check: true, note: 'Кроссовер с подключаемой гибридной установкой и гибридной коробкой DHT.' },
      { slug: 'starship-7', name: 'Galaxy Starship 7', d: 22530, body: 'кроссовер', pt: ['phev'], air: 'no', check: true, note: 'Кроссовер с гибридной установкой EM-i. В России продаётся как Geely EX5 EM-i – один из самых продаваемых подключаемых гибридов 2026 года.' },
      { slug: 'starshine-6', name: 'Galaxy Starshine 6', d: 1908, body: 'седан', pt: ['phev'], air: 'no', check: true, note: 'Седан с гибридной установкой EM-i.' },
      { slug: 'galaxy-m9', name: 'Galaxy M9', d: 5634, body: 'большой кроссовер', pt: ['phev'], air: 'part', check: true, note: 'Флагманский гибридный кроссовер линейки Galaxy.' },
      { slug: 'ex2', name: 'EX2', d: 6719, body: 'компактный кроссовер', pt: ['bev'], air: 'no', check: true, note: 'Компактный электромобиль, в Китае – Xingyuan.' },
    ],
  },
  {
    slug: 'changan', evOnly: true, name: 'Changan', ru: 'Чанган', alt: ['Чанган Циюань', 'Changan Qiyuan', 'Чанган гибрид'],
    site: 'CHANGAN EV SERVICE', competitor: 'монобренда в Минске нет, в топе официальный changan.by и мультибренды',
    about: 'Changan – государственный автоконцерн Китая. Гибриды и электромобили выходят под марками Changan (версии iDD) и Qiyuan: электромобили, последовательные гибриды с бензиновым генератором и подключаемые гибриды. Машины только с бензиновым двигателем (CS35, CS55, UNI-V без iDD и другие) этот сервис не обслуживает.',
    models: [
      { slug: 'uni-k-idd', name: 'UNI-K iDD', d: 1420, body: 'кроссовер', pt: ['phev'], air: 'no', gearbox: true, check: true, note: 'Подключаемый гибрид с гибридной коробкой.' },
      { slug: 'qiyuan-a05', name: 'Qiyuan A05', d: 689, body: 'седан', pt: ['phev'], air: 'no', check: true, note: 'Седан с подключаемой гибридной установкой.' },
      { slug: 'qiyuan-a06', name: 'Qiyuan A06', d: 19058, body: 'седан', pt: ['bev', 'erev'], air: 'no', check: true, note: 'Седан в версиях электромобиль и с бензиновым генератором.' },
      { slug: 'qiyuan-a07', name: 'Qiyuan A07', d: 669, body: 'седан', pt: ['bev', 'erev'], air: 'no', check: true, note: 'Седан в версиях электромобиль и с бензиновым генератором.' },
      { slug: 'qiyuan-q05', name: 'Qiyuan Q05', d: 33638, body: 'компактный кроссовер', pt: ['phev', 'bev'], air: 'no', check: true, note: 'Компактный кроссовер – подключаемый гибрид или электромобиль.' },
      { slug: 'qiyuan-q07', name: 'Qiyuan Q07', d: 3593, body: 'кроссовер', pt: ['erev', 'bev'], air: 'no', check: true, note: 'Кроссовер с бензиновым генератором или электромобиль.' },
    ],
  },
  // Новые марки 01.11.2026 по спросу Wordstat РФ (d – интерес к модели в месяц, июль–сентябрь 2026; нет d – не собрано).
  {
    slug: 'deepal', name: 'Deepal', ru: 'Дипал', alt: ['Changan Deepal', 'Чанган Дипал'],
    site: 'DEEPAL SERVICE', competitor: 'в Минске – страницы Deepal у мультибрендов (chinacarservice, eastservice)',
    about: 'Deepal – марка Changan для электромобилей и последовательных гибридов с бензиновым генератором. В России продаётся официально как отдельная марка, а машины из Китая ввозят под китайскими названиями: S7 – это S07, SL03 – это L07.',
    models: [
      { slug: 's07', name: 'S07', d: 18080, body: 'кроссовер', pt: ['bev', 'erev'], air: 'no', check: true, note: 'Кроссовер в версиях электромобиль и с генератором, в Китае – Deepal S7.' },
      { slug: 'l07', name: 'L07', d: 215, body: 'седан', pt: ['bev', 'erev'], air: 'no', check: true, note: 'Седан в версиях электромобиль и с генератором, в Китае – Deepal SL03.' },
      { slug: 's05', name: 'S05', d: 5810, body: 'компактный кроссовер', pt: ['bev', 'erev'], air: 'no', check: true, note: 'Компактный кроссовер в версиях электромобиль и с генератором.' },
      { slug: 'g318', name: 'G318', d: 32209, body: 'внедорожник', pt: ['erev'], air: 'no', check: true, note: 'Внедорожник с бензиновым генератором и электроприводом.' },
    ],
  },
  {
    slug: 'avatr', name: 'Avatr', ru: 'Аватр', alt: ['Аватар', 'AVATR'],
    site: 'AVATR SERVICE', competitor: 'grafit-service.ru (Москва) ведёт Avatr',
    about: 'Avatr – марка Changan, Huawei и CATL. Электромобили и версии с бензиновым генератором, мультимедиа и помощь водителю от Huawei. Одна из самых продаваемых марок электромобилей в России в 2026 году.',
    models: [
      { slug: '06', name: '06', d: 374, body: 'седан', pt: ['bev', 'erev'], air: 'part', check: true, note: 'Седан в версиях электромобиль и с генератором.' },
      { slug: '07', name: '07', d: 3703, body: 'кроссовер', pt: ['bev', 'erev'], air: 'part', check: true, note: 'Кроссовер в версиях электромобиль и с генератором.' },
      { slug: '11', name: '11', d: 10656, body: 'кроссовер', pt: ['bev', 'erev'], air: 'part', check: true, note: 'Первая модель марки, кроссовер. Есть версии с генератором.' },
      { slug: '12', name: '12', d: 7756, body: 'лифтбек', pt: ['bev', 'erev'], air: 'part', check: true, note: 'Лифтбек в версиях электромобиль и с генератором.' },
    ],
  },
  {
    slug: 'byd', name: 'BYD', ru: 'БИД', alt: ['Бид', 'Бюд', 'Би Уай Ди'],
    site: 'BYD SERVICE', competitor: 'монобренда не найдено, в Минске – мультибренды',
    about: 'BYD – крупнейший в мире производитель электромобилей и подключаемых гибридов. Машин только с бензиновым двигателем марка не выпускает: электромобили и гибриды DM-i. В Россию ввозится в основном параллельным импортом, поэтому сервис ищут у независимых мастерских.',
    models: [
      { slug: 'seagull', name: 'Seagull', d: 16172, body: 'компактный хэтчбек', pt: ['bev'], air: 'no', note: 'Компактный городской электромобиль.' },
      { slug: 'han', name: 'Han', d: 13299, body: 'седан', pt: ['bev', 'phev'], air: 'no', check: true, note: 'Седан бизнес-класса – электромобиль или подключаемый гибрид.' },
      { slug: 'song-plus', name: 'Song Plus', d: 13083, body: 'кроссовер', pt: ['phev', 'bev'], air: 'no', note: 'Кроссовер – подключаемый гибрид DM-i или электромобиль.' },
      { slug: 'yuan-up', name: 'Yuan Up', d: 11568, body: 'компактный кроссовер', pt: ['bev'], air: 'no', check: true, note: 'Компактный электрический кроссовер.' },
      { slug: 'tang', name: 'Tang', d: 8896, body: 'большой кроссовер, 7 мест', pt: ['phev', 'bev'], air: 'no', check: true, note: 'Семиместный кроссовер – подключаемый гибрид или электромобиль.' },
      { slug: 'seal', name: 'Seal', d: 7785, body: 'седан', pt: ['bev'], air: 'no', note: 'Электрический седан на платформе e-Platform 3.0.' },
      { slug: 'qin-plus', name: 'Qin Plus', d: 4185, body: 'седан', pt: ['phev', 'bev'], air: 'no', note: 'Седан – подключаемый гибрид DM-i или электромобиль.' },
      { slug: 'song-l', name: 'Song L', d: 2107, body: 'кроссовер', pt: ['bev', 'phev'], air: 'no', check: true, note: 'Кроссовер – электромобиль или подключаемый гибрид.' },
      { slug: 'song-pro', name: 'Song Pro', d: 1380, body: 'кроссовер', pt: ['phev'], air: 'no', check: true, note: 'Компактный кроссовер с гибридной установкой DM-i.' },
      { slug: 'qin-l', name: 'Qin L', d: 1370, body: 'седан', pt: ['phev'], air: 'no', check: true, note: 'Седан с гибридной установкой DM-i.' },
      { slug: 'atto-3', name: 'Atto 3', d: 713, body: 'компактный кроссовер', pt: ['bev'], air: 'no', note: 'Компактный электрический кроссовер, в Китае – Yuan Plus.' },
    ],
  },
  {
    slug: 'xiaomi', name: 'Xiaomi', ru: 'Сяоми', alt: ['Ксиоми', 'Xiaomi SU7', 'Xiaomi YU7'],
    site: 'XIAOMI EV SERVICE', competitor: 'монобренда не найдено',
    about: 'Xiaomi выпускает электромобили с 2024 года: седан SU7 и кроссовер YU7. Официально в России не продаются, машины ввозят параллельным импортом – дилерского сервиса нет.',
    models: [
      { slug: 'su7', name: 'SU7', d: 20164, body: 'седан', pt: ['bev'], air: 'part', check: true, note: 'Электрический седан, первая машина Xiaomi.' },
      { slug: 'su7-ultra', name: 'SU7 Ultra', body: 'седан', pt: ['bev'], air: 'part', check: true, note: 'Спортивная версия SU7 с тремя электродвигателями.' },
      { slug: 'yu7', name: 'YU7', d: 14054, body: 'кроссовер', pt: ['bev'], air: 'part', check: true, note: 'Электрический кроссовер Xiaomi.' },
    ],
  },
  {
    slug: 'aito', name: 'AITO', ru: 'Аито', alt: ['Seres', 'Серес', 'Huawei AITO'],
    site: 'AITO SERVICE', competitor: 'монобренда не найдено',
    about: 'AITO – марка Seres и Huawei. Кроссоверы M5, M7, M8 и M9 в версиях с бензиновым генератором и электромобили, мультимедиа HarmonyOS и помощь водителю от Huawei.',
    models: [
      { slug: 'm5', name: 'M5', d: 7762, body: 'кроссовер', pt: ['erev', 'bev'], air: 'no', check: true, note: 'Кроссовер с генератором или электромобиль.' },
      { slug: 'm7', name: 'M7', d: 5873, body: 'кроссовер, 5–6 мест', pt: ['erev', 'bev'], air: 'part', check: true, note: 'Кроссовер с генератором или электромобиль.' },
      { slug: 'm8', name: 'M8', d: 1284, body: 'кроссовер', pt: ['erev', 'bev'], air: 'part', check: true, note: 'Кроссовер между M7 и M9.' },
      { slug: 'm9', name: 'M9', d: 8664, body: 'полноразмерный кроссовер, 6 мест', pt: ['erev', 'bev'], air: 'yes', check: true, note: 'Флагманский кроссовер марки.' },
    ],
  },
  {
    slug: 'exlantix', name: 'Exlantix', ru: 'Экслантикс', alt: ['Exeed Exlantix', 'Exeed Sterra', 'Эксид Экслантикс'],
    site: 'EXLANTIX SERVICE', competitor: 'официальные дилеры Exeed',
    about: 'Exlantix – электрическая марка Chery, в Китае известна как Exeed Sterra. Седан ET и кроссовер ES в версиях электромобиль и с бензиновым генератором.',
    models: [
      { slug: 'et', name: 'ET', d: 41487, body: 'кроссовер', pt: ['bev', 'erev'], air: 'part', check: true, note: 'Кроссовер в версиях электромобиль и с генератором.' },
      { slug: 'es', name: 'ES', d: 5046, body: 'седан', pt: ['bev', 'erev'], air: 'part', check: true, note: 'Седан в версиях электромобиль и с генератором.' },
    ],
  },
  {
    slug: 'gac', evOnly: true, name: 'GAC', ru: 'Гак', alt: ['GAC Aion', 'Аион', 'Trumpchi'],
    site: 'GAC EV SERVICE', competitor: 'официальные дилеры GAC',
    about: 'GAC – автоконцерн из Гуанчжоу. Сервис берёт только гибриды и электромобили: подключаемый гибрид S7 и электромобили Aion. Машины только с бензиновым двигателем (GS8, GS3 и другие) не обслуживаем.',
    models: [
      { slug: 's7', name: 'S7', d: 51273, body: 'кроссовер', pt: ['phev'], air: 'no', check: true, note: 'Кроссовер с подключаемой гибридной установкой.' },
      { slug: 'aion-v', name: 'Aion V', body: 'кроссовер', pt: ['bev'], air: 'no', check: true, note: 'Электрический кроссовер Aion.' },
      { slug: 'aion-y', name: 'Aion Y', body: 'компактный кроссовер', pt: ['bev'], air: 'no', check: true, note: 'Компактный электромобиль Aion.' },
    ],
  },
  {
    slug: 'denza', name: 'Denza', ru: 'Денза', alt: ['BYD Denza', 'Дэнза'],
    site: 'DENZA SERVICE', competitor: 'монобренда не найдено',
    about: 'Denza – премиальная марка BYD: минивэн D9, кроссоверы N7, N8, N9 и универсал Z9 GT. Электромобили и подключаемые гибриды.',
    models: [
      { slug: 'd9', name: 'D9', d: 1733, body: 'минивэн', pt: ['phev', 'bev'], air: 'part', check: true, note: 'Минивэн – подключаемый гибрид или электромобиль.' },
      { slug: 'n7', name: 'N7', d: 521, body: 'кроссовер', pt: ['bev'], air: 'part', check: true, note: 'Электрический кроссовер.' },
      { slug: 'n8', name: 'N8', d: 409, body: 'кроссовер', pt: ['phev'], air: 'part', check: true, note: 'Кроссовер с подключаемой гибридной установкой.' },
      { slug: 'n9', name: 'N9', d: 4746, body: 'большой кроссовер', pt: ['phev'], air: 'yes', check: true, note: 'Флагманский кроссовер с подключаемой гибридной установкой.' },
      { slug: 'z9-gt', name: 'Z9 GT', d: 495, body: 'универсал', pt: ['phev', 'bev'], air: 'yes', check: true, note: 'Универсал-фастбэк – подключаемый гибрид или электромобиль.' },
    ],
  },
  {
    slug: 'fangchengbao', name: 'Fangchengbao', ru: 'Фанчэнбао', alt: ['Leopard', 'Леопард', 'BYD Leopard'],
    site: 'LEOPARD SERVICE', competitor: 'монобренда не найдено',
    about: 'Fangchengbao (Leopard) – внедорожная марка BYD. Внедорожники Leopard 5 и Leopard 8 с подключаемой гибридной установкой DMO, кроссоверы Tai 3 и Tai 7.',
    models: [
      { slug: 'leopard-5', name: 'Leopard 5', d: 654, body: 'внедорожник', pt: ['phev'], air: 'no', check: true, note: 'Внедорожник с гибридной установкой DMO.' },
      { slug: 'leopard-8', name: 'Leopard 8', d: 282, body: 'большой внедорожник', pt: ['phev'], air: 'part', check: true, note: 'Большой внедорожник с гибридной установкой DMO.' },
      { slug: 'tai-3', name: 'Tai 3', d: 9, body: 'компактный кроссовер', pt: ['bev'], air: 'no', check: true, note: 'Компактный электрический кроссовер.' },
      { slug: 'tai-7', name: 'Tai 7', d: 8, body: 'кроссовер', pt: ['phev', 'bev'], air: 'no', check: true, note: 'Кроссовер – подключаемый гибрид или электромобиль.' },
    ],
  },
];

// Порог страницы «модель × услуга»: интерес к модели по Wordstat РФ от 1 000 в месяц (июль–сентябрь 2026).
// Ниже порога или не собрано – работы модели остаются списком на её странице (правило «не дорвеи»).
export const DEMAND_MIN = 1000;

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
