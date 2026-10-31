// Сборка прототипов четырёх моносайтов: node build.mjs [base]  →  dist/<марка>/…/index.html + dist/index.html
// base – префикс адресов на Pages (по умолчанию /monobrend-servis).
import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { BRANDS, CITY, features } from './data/brands.mjs';
import { GROUPS, SERVICES } from './data/services.mjs';
import { page, intro, block, hero, faq, form, cta, steps, signs, why, reviews, priceTable, askPrice, askTime, ask, ptLine, esc, DATE } from './src/render.mjs';

const BASE = process.argv[2] ?? '/monobrend-servis';
const OUT = 'dist';
rmSync(OUT, { recursive: true, force: true });
const write = (p, html) => { const f = join(OUT, p, 'index.html'); mkdirSync(dirname(f), { recursive: true }); writeFileSync(f, html); };
const svcPath = (s) => `/services/${s.group}/${s.slug}/`;
const fill = (t, M) => t.replaceAll('{M}', M);
const cap = (s) => s[0].toUpperCase() + s.slice(1);
const stats = [];

for (const brand of BRANDS) {
  const L = (p) => `${BASE}/${brand.slug}${p}`;
  const ctx = { brand, L, root: `${BASE}/` };
  const B = brand.name;
  const applicable = (s) => brand.models.filter((m) => features(m).has(s.req));
  const svcs = SERVICES.filter((s) => applicable(s).length);
  const msPages = []; // [model, service]
  for (const m of brand.models) for (const s of svcs) if (s.model && features(m).has(s.req)) msPages.push([m, s]);
  const hasMS = (m, s) => msPages.some(([a, b]) => a === m && b === s);
  const tree = [];
  const add = (path, type, html) => { write(`${brand.slug}${path}`, html); tree.push([path, type]); };
  const modelsFor = (s) => applicable(s).map((m) => m.name).join(', ');

  // ── Главная
  add('/', 'Главная', page(ctx, {
    pageName: 'Главная', title: `Сервис ${B} ${CITY.in} – ремонт и ТО`, description: `Ремонт и обслуживание ${B} (${brand.ru}) ${CITY.in}: ТО, диагностика, пневмоподвеска, русификация. Модели ${brand.models.map((m) => m.name).join(', ')}. Цена до начала работ.`,
    h1: `Ремонт и обслуживание ${B} ${CITY.in}`, zapros: `сервис ${B.toLowerCase()} ${CITY.name.toLowerCase()}; ремонт ${brand.ru.toLowerCase()}`, schema: 'AutoRepair (адрес, телефон, часы, рейтинг), WebSite, BreadcrumbList',
    links: brand.models.map((m) => `/models/${m.slug}/ – хаб ${m.name}`).concat(['/services/ – все услуги', '/prices/ – цены']),
    blocks: [
      hero(1, { h1: `Ремонт и обслуживание ${B} ${CITY.in}`, sub: `Независимый сервис только для ${B} (${brand.ru}): ТО, диагностика, ремонт ходовой и пневмоподвески, русификация и обновления.`,
        bullets: [`<b>Все модели</b> – ${esc(brand.models.map((m) => m.name).join(', '))}`, '<b>Цена до начала работ</b> – согласуем список и стоимость заранее', `<b>Гарантия</b> – ${ask('срок гарантии на работы')}`],
        photo: `${B} на подъёмнике в боксе сервиса, мастер с ноутбуком диагностики – доказывает, что работаем с этой маркой`, alt: `Сервис ${B} ${CITY.in}` }),
      block(2, 'Модели', 'Обслуживаете мою модель?', 'список моделей с типом привода',
        `<h2>Выберите свою модель ${esc(B)}</h2><div class="w-grid" style="--cols:4;--cols-m:2">${brand.models.map((m) => `<article class="w-card"><div class="w-media small" data-alt="${esc(B + ' ' + m.name)}">Фото ${esc(B + ' ' + m.name)} сбоку, светлый фон</div><h3><a href="${L(`/models/${m.slug}/`)}">${esc(B + ' ' + m.name)}</a></h3><p>${esc(cap(m.body))}, ${esc(ptLine(m))}</p></article>`).join('')}</div>`),
      block(3, 'Частые работы', 'С чем сюда обычно едут?', 'популярные услуги со ссылками',
        `<h2>С чем чаще всего приезжают</h2><div class="w-grid" style="--cols:3;--cols-m:2">${svcs.filter((s) => s.model).slice(0, 6).map((s) => `<article class="w-card"><h3><a href="${L(svcPath(s))}">${esc(s.name)}</a></h3><p>${esc(fill(s.lead, B).split('. ')[0])}.</p><span class="w-price">${askPrice()}</span></article>`).join('')}</div><p><a href="${L('/services/')}">Все услуги →</a></p>`),
      why(4, brand),
      cta('4а', 'Не знаете, что с машиной? Начните с диагностики – по её итогам назовём цену ремонта.', 'Записаться на диагностику'),
      block(5, 'Все услуги', 'А это вы тоже делаете?', 'полный перечень по группам',
        `<h2>Все работы по ${esc(B)}</h2><div class="w-grid" style="--cols:3;--cols-m:2">${GROUPS.filter((g) => svcs.some((s) => s.group === g.slug)).map((g) => `<article class="w-card"><h3><a href="${L(`/services/${g.slug}/`)}">${esc(g.name)}</a></h3><p>${svcs.filter((s) => s.group === g.slug).map((s) => `<a href="${L(svcPath(s))}">${esc(s.name)}</a>`).join(', ')}</p></article>`).join('')}</div>`),
      steps(6, ['заявка или звонок – уточняем модель, пробег и симптомы', 'называем цену и время', 'диагностика и согласование работ', 'ремонт с фото и отчётом', 'выдача машины и гарантия'], 'Как проходит визит'),
      reviews(7, brand),
      cta('7а', 'Посмотрели работы – запишитесь, назовём цену по вашей машине до приезда.'),
      faq(8, [['Вы официальный дилер {M}?', 'Нет, мы независимый сервис, который работает только с этой маркой. Для привозных машин это часто единственный вариант: дилер берёт не все машины.'], ['Берёте машины, привезённые из Китая?', 'Да, и с китайской прошивкой тоже: русифицируем и обновляем.'], ['Можно привезти свои запчасти?', '[запросить: правило сервиса по запчастям клиента]'], ['Есть эвакуатор?', '[запросить: эвакуатор или партнёр]']], B),
      form(9, { title: `Запишитесь – перезвоним и назовём цену`, what: `${B} ${brand.models[0].name}, 2024` }),
      `<p class="w-wrap w-note">Виджеты страницы: боковая панель мессенджеров, окно «перезвоним за N минут» по клику, на телефоне – нижняя панель «Позвонить / Записаться». Почему так: сервисный спрос срочный, человек звонит, а не читает.</p>`,
    ],
  }));

  // ── Модели: хаб и страница модели
  add('/models/', 'Хаб', page(ctx, {
    pageName: 'Модели', title: `Модели ${B}: обслуживание и ремонт ${CITY.in}`, description: `Сервис всех моделей ${B} ${CITY.in}: ${brand.models.map((m) => m.name).join(', ')}. Что обслуживаем у каждой модели и сколько стоит.`,
    h1: `Обслуживаем все модели ${B}`, zapros: `обслуживание ${B.toLowerCase()}`, schema: 'ItemList, BreadcrumbList', crumbs: [['Модели', '/models/']],
    blocks: [block(1, 'Список моделей', 'Где моя модель?', 'модели с типом привода', `${intro(`Обслуживаем все модели ${B}`, brand.about)}<div class="w-grid" style="--cols:3;--cols-m:2">${brand.models.map((m) => `<article class="w-card"><div class="w-media small" data-alt="${esc(B + ' ' + m.name)}">Фото ${esc(B + ' ' + m.name)}</div><h3><a href="${L(`/models/${m.slug}/`)}">${esc(B + ' ' + m.name)}</a></h3><p>${esc(cap(m.body))}. ${esc(cap(ptLine(m)))}.</p></article>`).join('')}</div>`), form(2, { title: 'Не нашли модель? Напишите – скажем, берём ли', what: `${B}, модель и год` })],
  }));

  for (const m of brand.models) {
    const M = `${B} ${m.name}`;
    const f = features(m);
    const ms = svcs.filter((s) => f.has(s.req));
    const mixed = m.pt.length > 1 && m.pt.includes('bev');
    add(`/models/${m.slug}/`, 'Хаб', page(ctx, {
      pageName: M, title: `Ремонт и обслуживание ${M} ${CITY.in}`, description: `Сервис ${M} ${CITY.in}: ТО, диагностика, ${f.has('air') ? 'пневмоподвеска, ' : ''}русификация. ${cap(ptLine(m))}. Цена до начала работ.`,
      h1: `Ремонт и обслуживание ${M} ${CITY.in}`, zapros: `ремонт ${M.toLowerCase()}; то ${M.toLowerCase()}`, schema: 'Service (serviceType, areaServed), BreadcrumbList, FAQPage',
      links: msPages.filter(([a]) => a === m).map(([, s]) => `/models/${m.slug}/${s.slug}/ – ${s.name}`), crumbs: [['Модели', '/models/'], [M, `/models/${m.slug}/`]],
      blocks: [
        hero(1, { h1: `Ремонт и обслуживание ${M} ${CITY.in}`, sub: `${m.note} Обслуживаем по регламенту производителя.`,
          bullets: [`<b>Тип</b> – ${esc(cap(m.body))}, ${esc(ptLine(m))}`, `<b>Пневмоподвеска</b> – ${{ yes: 'есть во всех версиях', part: 'есть в части версий', no: 'нет' }[m.air]}`, m.check ? ask(`подтвердить версии и силовые установки ${M}`) : '<b>Цена до начала работ</b> – согласуем заранее'],
          photo: `${M} в боксе сервиса – доказывает опыт с этой моделью`, alt: `Сервис ${M}` }),
        block(2, 'Регламент ТО', `Когда мне на ТО и что будут менять?`, 'регламент производителя',
          `<h2>ТО ${esc(M)}: что и когда</h2>${priceTable(ms.filter((s) => s.group === 'maintenance').map((s) => [`<a href="${L(hasMS(m, s) ? `/models/${m.slug}/${s.slug}/` : svcPath(s))}">${esc(s.name)}</a>`, ask('интервал по регламенту'), askPrice()]), ['Работа', 'Интервал', 'Цена'])}${mixed && f.has('engine') ? `<p>Работы по двигателю – только для версий ${esc(M)} с бензиновым двигателем.</p>` : ''}`),
        block(3, 'Все работы по модели', `Что вы делаете на ${M}?`, 'полный список услуг для модели',
          `<h2>Все работы по ${esc(M)}</h2><div class="w-grid" style="--cols:3;--cols-m:2">${GROUPS.filter((g) => ms.some((s) => s.group === g.slug && g.slug !== 'maintenance')).map((g) => `<article class="w-card"><h3>${esc(g.name)}</h3><p>${ms.filter((s) => s.group === g.slug).map((s) => `<a href="${L(hasMS(m, s) ? `/models/${m.slug}/${s.slug}/` : svcPath(s))}">${esc(s.name)}</a>`).join(', ')}</p></article>`).join('')}</div>`),
        cta('3а', `Записаться на диагностику ${M} – после неё назовём точную цену ремонта.`),
        reviews(4, brand, ` ${m.name}`),
        faq(5, [[`Обслуживаете ${M}, привезённый из Китая?`, 'Да. Русифицируем, обновляем и обслуживаем по регламенту производителя.'], [`Где найти регламент ТО ${M}?`, 'В сервисной книжке или в меню машины. Если книжки нет, составим список работ по пробегу.']], M),
        form(6, { title: `Записаться на сервис ${M}`, what: `${M}, год, пробег` }),
      ],
    }));
  }

  // ── Модель × услуга
  for (const [m, s] of msPages) {
    const M = `${B} ${m.name}`;
    const others = msPages.filter(([a, b]) => b === s && a !== m).map(([a]) => a);
    const sib = msPages.filter(([a, b]) => a === m && b !== s).map(([, b]) => b);
    add(`/models/${m.slug}/${s.slug}/`, 'Страница', page(ctx, {
      pageName: `${s.name} ${M}`, title: `${s.name} ${M} ${CITY.in}`, description: `${fill(s.lead, M)} Цена и срок – до начала работ.`,
      h1: `${s.name} ${M}`, zapros: `${s.name.toLowerCase()} ${M.toLowerCase()}`, schema: 'Service (name, brand, areaServed, offers – когда будет цена), FAQPage, BreadcrumbList',
      links: [`/models/${m.slug}/ – хаб ${M}`, `${svcPath(s)} – ${s.name} ${B} (все модели)`, ...sib.slice(0, 4).map((b) => `/models/${m.slug}/${b.slug}/ – ${b.name}`)],
      crumbs: [['Модели', '/models/'], [M, `/models/${m.slug}/`], [s.name, `/models/${m.slug}/${s.slug}/`]],
      blocks: [
        hero(1, { h1: `${s.name} ${M}`, sub: fill(s.lead, M), bullets: [`<b>Цена</b> – ${askPrice()}`, `<b>Срок</b> – ${askTime()}`, `<b>Гарантия</b> – ${ask('срок гарантии')}`], photo: `${s.name} на ${M}: процесс работы в боксе`, alt: `${s.name} ${M}` }),
        block(2, `Особенности ${m.name}`, `Чем эта работа на ${M} отличается от других машин?`, 'тип привода и устройство модели',
          `<h2>Что важно знать про ${esc(M)}</h2><p>${esc(m.note)} ${esc(cap(ptLine(m)))}.</p><p>${esc(modelNote(m, s, M))}</p>${m.check ? `<p>${ask(`подтвердить данные по ${M}: версии, объёмы, регламент`)}</p>` : ''}
<p class="w-note">Этот блок отличает страницу от соседних моделей. После «да» владельца сюда идут факты по модели: объёмы, регламент, типовые неисправности из практики сервиса.</p>`),
        signs(3, s.signs, `Когда пора: признаки`),
        steps(4, s.steps, `Как делаем: ${s.name.toLowerCase()} ${M}`),
        cta('4а', `${s.name} ${M}: запишитесь – назовём цену до приезда.`),
        faq(5, s.faq, M),
        block(6, 'Перелинковка', 'Что ещё может понадобиться?', 'соседние работы по модели и та же работа на других моделях',
          `<h2>Ещё по ${esc(M)}</h2><p>${sib.map((b) => `<a href="${L(`/models/${m.slug}/${b.slug}/`)}">${esc(b.name)}</a>`).join(' · ')}</p>${others.length ? `<h3>${esc(s.name)} на других моделях</h3><p>${others.map((a) => `<a href="${L(`/models/${a.slug}/${s.slug}/`)}">${esc(B + ' ' + a.name)}</a>`).join(' · ')}</p>` : ''}`),
        form(7, { title: `Записаться: ${s.name.toLowerCase()} ${M}`, what: `${M}, год, пробег` }),
      ],
    }));
  }

  // ── Услуги: хаб, группы, услуга марки
  add('/services/', 'Хаб', page(ctx, {
    pageName: 'Услуги', title: `Услуги сервиса ${B} ${CITY.in}`, description: `Все работы по ${B} ${CITY.in}: техобслуживание, диагностика, тормоза, пневмоподвеска, рулевое, электрика, климат, русификация.`,
    h1: `Услуги сервиса ${B}`, zapros: `услуги сервиса ${B.toLowerCase()}`, schema: 'ItemList, BreadcrumbList', crumbs: [['Услуги', '/services/']],
    blocks: [block(1, 'Группы услуг', 'Что вы умеете?', 'полный перечень по группам', `${intro(`Услуги сервиса ${B}`)}<div class="w-grid" style="--cols:3;--cols-m:2">${GROUPS.filter((g) => svcs.some((s) => s.group === g.slug)).map((g) => `<article class="w-card"><h3><a href="${L(`/services/${g.slug}/`)}">${esc(g.name)}</a></h3><p>${esc(g.lead)}</p><p>${svcs.filter((s) => s.group === g.slug).map((s) => `<a href="${L(svcPath(s))}">${esc(s.name)}</a>`).join(', ')}</p></article>`).join('')}</div>`), form(2, { title: 'Не нашли работу? Опишите – скажем, делаем ли', what: `${B}, модель` })],
  }));

  for (const g of GROUPS) {
    const gs = svcs.filter((s) => s.group === g.slug);
    if (!gs.length) continue;
    add(`/services/${g.slug}/`, 'Хаб', page(ctx, {
      pageName: g.name, title: `${g.name} ${B} ${CITY.in}`, description: `${g.name} ${B} ${CITY.in}: ${gs.map((s) => s.name.toLowerCase()).join(', ')}.`,
      h1: `${g.name} ${B}`, zapros: `${g.name.toLowerCase()} ${B.toLowerCase()}`, schema: 'ItemList, BreadcrumbList', crumbs: [['Услуги', '/services/'], [g.name, `/services/${g.slug}/`]],
      blocks: [
        block(1, 'Работы группы', 'Какая работа мне нужна?', 'описание каждой работы', `${intro(`${g.name} ${B}`, g.lead)}<div class="w-grid" style="--cols:3;--cols-m:2">${gs.map((s) => `<article class="w-card"><h3><a href="${L(svcPath(s))}">${esc(s.name)}</a></h3><p>${esc(fill(s.lead, B))}</p><span class="w-price">${askPrice()}</span></article>`).join('')}</div>`),
        cta(2, 'Не уверены, что именно сломалось? Начните с диагностики.'),
        form(3, { title: `Записаться: ${g.name.toLowerCase()}`, what: `${B}, модель` }),
      ],
    }));
  }

  for (const s of svcs) {
    const ms = applicable(s);
    add(svcPath(s), 'Страница', page(ctx, {
      pageName: s.name, title: `${s.name} ${B} ${CITY.in}`, description: `${fill(s.lead, B)} Модели: ${ms.map((m) => m.name).join(', ')}.`,
      h1: `${s.name} ${B} ${CITY.in}`, zapros: `${s.name.toLowerCase()} ${B.toLowerCase()}; ${s.name.toLowerCase()} ${brand.ru.toLowerCase()}`, schema: 'Service, FAQPage, BreadcrumbList',
      links: ms.map((m) => (hasMS(m, s) ? `/models/${m.slug}/${s.slug}/` : `/models/${m.slug}/`) + ` – ${B} ${m.name}`), crumbs: [['Услуги', '/services/'], [GROUPS.find((g) => g.slug === s.group).name, `/services/${s.group}/`], [s.name, svcPath(s)]],
      blocks: [
        hero(1, { h1: `${s.name} ${B} ${CITY.in}`, sub: fill(s.lead, B), bullets: [`<b>Модели</b> – ${esc(modelsFor(s))}`, `<b>Цена</b> – ${askPrice()}`, `<b>Срок</b> – ${askTime()}`], photo: `${s.name} на ${B}: мастер за работой, видна марка`, alt: `${s.name} ${B}` }),
        signs(2, s.signs, 'Когда нужна эта работа'),
        block(3, 'Цены по моделям', 'Сколько это стоит на моей модели?', 'цена по каждой модели',
          `<h2>${esc(s.name)}: цены по моделям ${esc(B)}</h2>${priceTable(ms.map((m) => [`<a href="${L(hasMS(m, s) ? `/models/${m.slug}/${s.slug}/` : `/models/${m.slug}/`)}">${esc(B + ' ' + m.name)}</a>`, askPrice(), askTime()]), ['Модель', 'Цена', 'Срок'])}<p>Цена без запчастей. Точную стоимость назовём после осмотра – до начала работ.</p>`),
        steps(4, s.steps, 'Как делаем'),
        cta('4а', `${s.name} ${B} – запишитесь, назовём цену по вашей модели.`),
        faq(5, s.faq, B),
        form(6, { title: `Записаться: ${s.name.toLowerCase()}`, what: `${B}, модель, год` }),
      ],
    }));
  }

  // ── Служебные и прочие страницы
  const simple = (path, type, pageName, h1, title, description, inner, q, withForm = true) => add(path, type, page(ctx, {
    pageName, title, description, h1, zapros: title.toLowerCase(), schema: 'BreadcrumbList', crumbs: [[pageName, path]],
    blocks: [block(1, pageName, q, 'факты сервиса', `${intro(h1)}${inner}`), ...(withForm ? [form(2, { title: 'Записаться или задать вопрос', what: `${B}, модель` })] : [])],
  }));
  simple('/prices/', 'Страница', 'Цены', `Цены на ремонт и обслуживание ${B}`, `Цены на сервис ${B} ${CITY.in}`, `Прайс на ремонт и обслуживание ${B} ${CITY.in}: ТО, диагностика, тормоза, подвеска, русификация. Цены без запчастей.`,
    GROUPS.filter((g) => svcs.some((s) => s.group === g.slug)).map((g) => `<details><summary><b>${esc(g.name)}</b></summary>${priceTable(svcs.filter((s) => s.group === g.slug).map((s) => [`<a href="${L(svcPath(s))}">${esc(s.name)}</a>`, askPrice(), askTime()]))}</details>`).join('') + '<p>Цены без запчастей. Итог зависит от модели и состояния машины – называем до начала работ.</p>', 'Сколько стоит?');
  simple('/parts/', 'Страница', 'Запчасти', `Запчасти для ${B}`, `Запчасти ${B} ${CITY.in} – подбор и установка`, `Подбор и заказ запчастей ${B} по VIN: оригинал и аналоги, установка в сервисе.`,
    `<p>Подбираем запчасти ${esc(B)} по VIN: оригинал и проверенные аналоги. ${ask('склад: что в наличии, сроки привоза из Китая')}</p><div class="w-media" data-alt="Склад запчастей ${esc(B)}">Фото склада с коробками запчастей – доказывает наличие</div>`, 'Есть ли запчасти и сколько ждать?');
  simple('/reviews/', 'Страница', 'Работы и отзывы', `Работы и отзывы о сервисе ${B}`, `Отзывы о сервисе ${B} ${CITY.in}`, `Выполненные работы по ${B} с фото и отзывы клиентов сервиса ${CITY.in}.`,
    `<p>${ask('кейсы: модель, задача, что сделали, срок, фото до и после')}</p><p>${ask('отзывы с Яндекс Карт и 2ГИС со ссылками')}</p><p class="w-note">Номера машин на всех фото размыты строго по рамке.</p>`, 'Здесь чинили такие машины, как моя?');
  simple('/about/', 'Страница', 'О сервисе', `О сервисе ${B}`, `О сервисе ${B} ${CITY.in}`, `Независимый сервис ${B} ${CITY.in}: мастера, оборудование, гарантия.`,
    `<p>${ask('история сервиса, сколько лет, сколько машин обслужили – только проверяемые цифры')}</p><p>${ask('мастера: имена, опыт, допуски')}</p><div class="w-media" data-alt="Мастера сервиса ${esc(B)}">Фото команды в боксе</div>`, 'Кто эти люди и можно ли им доверять?');
  simple('/contacts/', 'Страница', 'Контакты', `Контакты сервиса ${B}`, `Контакты сервиса ${B} ${CITY.in}`, `Адрес, телефон и часы работы сервиса ${B} ${CITY.in}. Как проехать.`,
    `<p>${ask('адрес, телефон, мессенджеры, часы работы')}</p><div class="w-media" data-alt="Карта проезда">Карта Яндекса (загружается после согласия на cookie) и фото въезда</div>`, 'Где вы и как доехать?');
  simple('/privacy-policy/', 'Юридическая', 'Политика ПДн', 'Политика обработки персональных данных', `Политика обработки персональных данных`, `Политика обработки персональных данных сервиса ${B}.`, `<p>${ask('текст политики от юриста владельца')}</p>`, 'Как обрабатываются мои данные?', false);
  simple('/personal-data-consent/', 'Юридическая', 'Согласие на обработку ПДн', 'Согласие на обработку персональных данных', 'Согласие на обработку персональных данных', `Согласие на обработку персональных данных для сервиса ${B}.`, `<p>${ask('текст согласия')}</p>`, 'На что я соглашаюсь?', false);

  // ── Карта сайта (страница) – деревом
  tree.push(['/sitemap/', 'Техническая']);
  const counts = tree.reduce((a, [, t]) => ((a[t] = (a[t] || 0) + 1), a), {});
  const li = (p, t) => `<li><a href="${L(p)}">${esc(p)}</a> <span class="w-muted">· ${t}</span></li>`;
  write(`${brand.slug}/sitemap/`, page(ctx, {
    pageName: 'Карта сайта', title: `Карта сайта – ${brand.site}`, description: `Все страницы сайта сервиса ${B}.`, h1: `Карта сайта ${brand.site}`, zapros: '–', schema: 'BreadcrumbList', crumbs: [['Карта сайта', '/sitemap/']],
    blocks: [block(1, 'Карта сайта', 'Где нужная страница?', 'все страницы деревом', `${intro(`Карта сайта ${brand.site}`)}<p>Всего страниц: <b>${tree.length}</b> · ${Object.entries(counts).map(([k, v]) => `${k}: ${v}`).join(' · ')}</p>
<ul>${li('/', 'Главная')}<li><a href="${L('/models/')}">/models/</a><ul>${brand.models.map((m) => `${li(`/models/${m.slug}/`, 'Хаб')}<ul>${msPages.filter(([a]) => a === m).map(([, s]) => li(`/models/${m.slug}/${s.slug}/`, 'Страница')).join('')}</ul>`).join('')}</ul></li>
<li><a href="${L('/services/')}">/services/</a><ul>${GROUPS.filter((g) => svcs.some((s) => s.group === g.slug)).map((g) => `${li(`/services/${g.slug}/`, 'Хаб')}<ul>${svcs.filter((s) => s.group === g.slug).map((s) => li(svcPath(s), 'Страница')).join('')}</ul>`).join('')}</ul></li>
${['/prices/', '/parts/', '/reviews/', '/about/', '/contacts/', '/privacy-policy/', '/personal-data-consent/'].map((p) => li(p, tree.find(([x]) => x === p)[1])).join('')}</ul>`)],
  }));
  stats.push({ brand, total: tree.length, counts, ms: msPages.length, svcs: svcs.length, models: brand.models.length });
}

// ── Общая страница для владельца
writeFileSync(join(OUT, 'index.html'), `<!doctype html><html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Прототипы моносайтов сервиса</title>
<style>body{font:16px/1.6 -apple-system,Segoe UI,Roboto,sans-serif;max-width:980px;margin:0 auto;padding:24px 16px 80px;color:#141414}h1{font-size:30px;line-height:1.2}table{border-collapse:collapse;width:100%;font-size:15px}td,th{border-bottom:1px solid #ddd;padding:8px;text-align:left;vertical-align:top}code{background:#f2f2f2;padding:1px 5px;border-radius:4px}.box{border:1px solid #ccc;border-radius:8px;padding:16px 18px;margin:20px 0}a{color:#141414}</style></head><body>
<p>Прототипы · ${DATE} · чёрно-белые, без дизайна · закрыты от поиска</p>
<h1>Четыре моносайта сервиса: Lixiang, Zeekr, Voyah, Lynk &amp; Co</h1>
<p>Устроены по образцу минской сети (lixiangminsk.by и соседей), но сделаны честнее. Страница «модель × услуга» создаётся только там, где работа подходит этой силовой установке: у электрических Zeekr нет замены масла в двигателе, у Lixiang нет коробки передач. Город сейчас «${CITY.name}» – меняется одной строкой. Цены, сроки, гарантии и реквизиты не придуманы, вместо них стоят метки «запросить». Включите «Логика блоков» в верхней панели, чтобы увидеть, зачем нужен каждый блок.</p>
<table><thead><tr><th>Сайт</th><th>Моделей</th><th>Услуг марки</th><th>Модель × услуга</th><th>Всего страниц</th><th>Ссылки</th></tr></thead><tbody>
${stats.map((s) => `<tr><td><b>${esc(s.brand.site)}</b><br><small>образец: ${esc(s.brand.competitor)}</small></td><td>${s.models}</td><td>${s.svcs}</td><td>${s.ms}</td><td>${s.total}</td><td><a href="${BASE}/${s.brand.slug}/">главная</a> · <a href="${BASE}/${s.brand.slug}/sitemap/">карта сайта</a></td></tr>`).join('')}
<tr><td><b>Итого</b></td><td>${stats.reduce((a, s) => a + s.models, 0)}</td><td></td><td>${stats.reduce((a, s) => a + s.ms, 0)}</td><td>${stats.reduce((a, s) => a + s.total, 0)}</td><td></td></tr></tbody></table>
<div class="box"><b>Адреса (ЧПУ) одинаковые на всех сайтах</b>
<pre>/                                   Главная
/models/                            Хаб: все модели
/models/&lt;модель&gt;/                   Хаб модели: регламент ТО, все работы
/models/&lt;модель&gt;/&lt;услуга&gt;/          Страница: услуга на модели (12 частых работ)
/services/                          Хаб: все услуги
/services/&lt;группа&gt;/                 Хаб группы (9 групп)
/services/&lt;группа&gt;/&lt;услуга&gt;/        Страница: услуга марки, цены по моделям
/prices/ /parts/ /reviews/ /about/ /contacts/ /sitemap/
/privacy-policy/ /personal-data-consent/</pre></div>
<div class="box"><b>Что решить до вёрстки</b><ol>
<li>Город главного сайта: ${CITY.name}, Новосибирск или другой? Где есть реальные точки или партнёры – только туда города.</li>
<li>Название сервиса и домены (сейчас рабочие «${stats.map((s) => esc(s.brand.site)).join('», «')}»).</li>
<li>Цены, сроки, гарантия, оборудование, допуск к высокому напряжению, реквизиты – метки «запросить» на страницах.</li>
<li>Страницы «модель × услуга» – кандидаты. Оставляем те, у которых есть спрос по Wordstat, остальные идут строкой на странице модели. Нужен съём Wordstat (платно, смету назову).</li>
<li>Модели с пометкой «подтвердить» (новые i6, i8, MEGA, Zeekr 9X, Lynk 07–900, Z10): версии, привод и пневмоподвеску сверить по документам.</li>
</ol></div>
</body></html>`);
console.log(JSON.stringify(stats.map((s) => ({ site: s.brand.slug, total: s.total, ...s.counts, ms: s.ms }))));

// Особенность модели для страницы «модель × услуга» – только из данных модели, без выдуманных цифр.
function modelNote(m, s, M) {
  const f = features(m);
  const heavy = /6 мест|7 мест|минивэн|полноразмерный|большой/.test(m.body);
  switch (s.slug) {
    case 'engine-oil-change': return m.pt.includes('erev') ? `У ${M} двигатель не крутит колёса, а заряжает батарею. Он запускается реже, чем в обычной машине, но масло стареет по времени, поэтому интервал считаем и по пробегу, и по сроку.` : m.pt.includes('phev') ? `У ${M} двигатель работает вместе с электромотором и включается не всегда. Масло стареет по времени, поэтому интервал считаем и по пробегу, и по сроку.` : `Двигатель ${M} – основной, масло меняем по пробегу и сроку из регламента.`;
    case 'coolant-replacement': return f.has('engine') && f.has('hv') ? `У ${M} несколько контуров охлаждения: батарея и силовая электроника, а также двигатель. Каждый прокачиваем отдельно.` : f.has('hv') ? `У ${M} нет двигателя, но есть контур охлаждения батареи и электроники – он важнее, чем в бензиновой машине.` : `Меняем антифриз в системе охлаждения двигателя ${M}.`;
    case 'reducer-oil-change': return `Электропривод ${M} передаёт момент через редуктор. Число редукторов зависит от привода версии – проверим по VIN.`;
    case 'air-suspension-repair': return m.air === 'yes' ? `Пневмоподвеска стоит на всех ${M}. Она держит высоту кузова и меняет её по режимам, поэтому утечка сразу видна по просадке.` : `Пневмоподвеска есть не во всех версиях ${M} – проверим по VIN, какая у вас.`;
    case 'brake-pad-replacement': case 'brake-disc-replacement': return heavy ? `${M} – тяжёлая машина (${m.body}), нагрузка на тормоза выше. При этом рекуперация бережёт колодки, а диски ржавеют от простоя – поэтому смотрим и износ, и состояние поверхности.` : `Рекуперация бережёт колодки ${M}, а диски ржавеют от простоя – поэтому смотрим и износ, и состояние поверхности.`;
    case 'hv-battery-diagnostics': return m.pt.includes('erev') || m.pt.includes('phev') ? `Батарея ${M} меньше, чем у чистого электромобиля, и работает в режиме частых зарядов от двигателя – это стоит учитывать при оценке износа.` : `У ${M} батарея – единственный источник энергии, от её состояния зависит запас хода и цена машины при продаже.`;
    case 'russification': case 'firmware-update': return `Список экранов и приложений ${M} зависит от версии прошивки. Перед работой смотрим версию и говорим, что получится.`;
    case 'ac-service': return f.has('hv') ? `У ${M} компрессор кондиционера электрический, часто с тепловым насосом для обогрева. Нужны масло и хладагент по норме для модели.` : `Заправляем кондиционер ${M} по норме хладагента для модели.`;
    case 'computer-diagnostics': return `У ${M} много блоков управления. Универсальный сканер видит не все, поэтому используем оборудование под марку.`;
    case 'scheduled-maintenance': return f.has('engine') && f.has('hv') ? `У ${M} есть и двигатель, и тяговая батарея, поэтому ТО включает работы по обоим.` : f.has('hv') ? `У ${M} нет двигателя: ТО короче, но включает проверку батареи, охлаждения и редуктора.` : `ТО ${M} – как у бензиновой машины: масло, фильтры, свечи и коробка по регламенту.`;
    default: return `Работа выполняется по регламенту производителя для ${M}.`;
  }
}
