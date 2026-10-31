// Шаблоны страниц прототипа. Комплект: ~/.claude/skills/marketolog/prototip/ (kit.css, разметка w-*).
import { readFileSync } from 'node:fs';
import { CITY, PT_NAME } from '../data/brands.mjs';

const KIT = readFileSync(new URL('./kit.css', import.meta.url), 'utf8');
const SCRIPT = readFileSync(new URL('./page.js', import.meta.url), 'utf8');
export const DATE = '01.11.2026';
const ASK = (t) => `<span class="w-ask">[запросить: ${esc(t)}]</span>`;
export const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const cut = (s, n) => (s.length <= n ? s : s.slice(0, s.lastIndexOf(' ', n - 1)).replace(/[,.:;–\s]+$/, '') + '.');

// ── каркас
export function page(ctx, { title, description, h1, zapros, schema, links = [], crumbs = [], blocks, pageName }) {
  const { brand, L } = ctx;
  const seo = { title: cut(title, 65), description: cut(description, 160), h1: esc(h1), zapros, schema, links };
  const bc = crumbs.length ? `<nav class="w-wrap w-muted" style="font-size:14px;padding-top:12px">${[['Главная', '/'], ...crumbs].map(([t, p], i, a) => i < a.length - 1 ? `<a href="${L(p)}">${esc(t)}</a>` : esc(t)).join(' › ')}</nav>` : '';
  return `<!doctype html>
<html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="robots" content="noindex,nofollow"><title>${esc(seo.title)}</title><style>${KIT}</style></head><body>
<div class="w-bar"><div class="w-wrap"><b>Прототип · ${esc(brand.site)} · ${esc(pageName)} · ${DATE}</b>
<a href="${ctx.root}">Все сайты</a> <a href="${L('/sitemap/')}">Карта сайта</a>
<label><input type="checkbox" id="t-logic"> Логика блоков</label><label><input type="checkbox" id="t-notes"> Комментарии дизайнеру</label>
<label><input type="checkbox" id="t-seo"> SEO страницы</label><label><input type="checkbox" id="t-success"> После отправки</label>
<span>Меток «запросить»: <b id="ask-count">0</b></span></div></div>
<script type="application/json" id="w-seo">${JSON.stringify(seo).replace(/</g, '\\u003c')}</script><div class="w-seo" id="w-seo-box"></div>
${header(ctx)}${bc}
<main>
${blocks.join('\n')}
</main>
${footer(ctx)}
<div class="w-sticky"><a class="w-btn" href="tel:+70000000000">Позвонить</a><a class="w-btn ghost" href="#zayavka">Записаться</a></div>
<script>${SCRIPT}</script></body></html>`;
}

function header({ brand, L }) {
  return `<header class="w-header w-block" data-n="0" data-name="Шапка" data-question="Это сервис именно для моей марки? Как связаться?" data-proof="марка в логотипе, адрес, телефон, часы">
<div class="w-wrap"><a class="w-logo" href="${L('/')}">${esc(brand.site)}</a>
<span class="w-descr">Ремонт и обслуживание ${esc(brand.name)} ${CITY.in}</span>
<span class="w-contacts-top"><a href="tel:+70000000000">${ASK('телефон')}</a><span class="w-muted">${ASK('адрес и часы работы')}</span></span>
<a class="w-btn ghost" href="#zayavka">Записаться</a></div>
<nav class="w-wrap w-nav"><a href="${L('/models/')}">Модели</a><a href="${L('/services/')}">Услуги</a><a href="${L('/prices/')}">Цены</a><a href="${L('/parts/')}">Запчасти</a><a href="${L('/reviews/')}">Работы и отзывы</a><a href="${L('/about/')}">О сервисе</a><a href="${L('/contacts/')}">Контакты</a></nav>
</header>`;
}

function footer({ brand, L }) {
  return `<footer class="w-footer"><div class="w-wrap w-stack">
<b>${esc(brand.site)} – независимый сервис ${esc(brand.name)} ${CITY.in}</b>
<span>${ASK('юрлицо, ИНН/ОГРН, адрес, телефон, почта')}</span>
<span><a href="${L('/models/')}">Модели</a> · <a href="${L('/services/')}">Услуги</a> · <a href="${L('/prices/')}">Цены</a> · <a href="${L('/contacts/')}">Контакты</a> · <a href="${L('/sitemap/')}">Карта сайта</a></span>
<span><a href="${L('/privacy-policy/')}">Политика обработки персональных данных</a> · <a href="${L('/personal-data-consent/')}">Согласие на обработку</a> · Cookie – окно по центру при первом заходе</span>
<span class="w-muted">Не является официальным дилером ${esc(brand.name)}. Товарные знаки принадлежат владельцам.</span>
</div></footer>`;
}

// ── общие блоки
export function block(n, name, question, proof, inner, extra = '') {
  return `<section class="w-block${extra}" data-n="${n}" data-name="${esc(name)}" data-question="${esc(question)}" data-proof="${esc(proof)}"><div class="w-wrap w-stack">${inner}</div></section>`;
}

export function hero(n, { h1, sub, bullets, photo, alt, btn = 'Записаться на сервис' }) {
  return block(n, 'Первый экран', 'Куда я попал и решат ли здесь мою задачу?', 'марка и модель в заголовке, город, цена и запись',
    `<div class="w-hero"><div class="w-stack"><h1>${esc(h1)}</h1><p>${esc(sub)}</p>
<ul>${bullets.map((b) => `<li>${b}</li>`).join('')}</ul>
<div class="w-actions"><a class="w-btn" href="#zayavka">${esc(btn)}</a><a class="w-btn ghost" href="tel:+70000000000">Позвонить</a></div>
<p class="w-hint">Мастер перезвонит, уточнит модель и пробег и назовёт цену до записи.</p></div>
<div class="w-media" data-alt="${esc(alt)}">${esc(photo)}</div></div>`);
}

export function faq(n, items, M) {
  return block(n, 'Вопросы', 'Что меня ещё останавливает?', 'ответы на частые вопросы владельцев',
    `<div class="w-faq w-stack"><h2>Что спрашивают владельцы ${esc(M)} перед записью</h2>${items.map(([q, a]) => `<details><summary>${esc(q.replaceAll('{M}', M))}</summary><p>${a.includes('[запросить:') ? a.replace(/\[запросить: ([^\]]+)\]/g, (_, t) => ASK(t)) : esc(a.replaceAll('{M}', M))}</p></details>`).join('')}</div>`);
}

export function form(n, { title, what }) {
  return `<section class="w-block" id="zayavka" data-n="${n}" data-name="Заявка" data-question="Как записаться и сколько это будет стоить?" data-proof="перезвон с ценой до записи">
<div class="w-wrap"><form class="w-form" onsubmit="event.preventDefault()">
<h2>${esc(title)}</h2>
<label class="w-field">Имя<input autocomplete="name"></label>
<label class="w-field">Телефон<input inputmode="tel" placeholder="+7 (___) ___-__-__"></label>
<label class="w-field">Модель и год<input placeholder="${esc(what)}"></label>
<label class="w-field">Что нужно сделать<input placeholder="Например: ТО, стук спереди, русификация"></label>
<label class="w-check"><input type="checkbox" data-agree> <span>Согласен на <a href="#">обработку персональных данных</a></span></label>
<button class="w-btn" type="submit" disabled>Записаться</button>
<p class="w-hint">Мастер перезвонит, уточнит пробег и симптомы и назовёт цену и свободное время.</p>
<div class="w-success"><p><b>Заявка принята.</b></p><p>Перезвоним ${ASK('срок ответа, часы работы')}</p>
<p>Срочно – <a href="tel:+70000000000">позвонить</a> или написать в мессенджер</p><p>Подготовьте: пробег, VIN или фото СТС, фото ошибки на экране, если есть.</p></div>
</form></div></section>`;
}

// Первый экран служебной страницы: H1, текст и главная кнопка.
export const intro = (h1, text = '') => `<h1>${esc(h1)}</h1>${text ? `<p>${esc(text)}</p>` : ''}<div class="w-actions"><a class="w-btn" href="#zayavka">Записаться</a><a class="w-btn ghost" href="tel:+70000000000">Позвонить</a></div>`;

export function cta(n, text, btn = 'Записаться') {
  return block(n, 'Плашка призыва', 'Мне хватает – что сделать сейчас?', 'предложение по блоку выше',
    `<div class="w-cta"><p>${esc(text)}</p><a class="w-btn" href="#zayavka">${esc(btn)}</a></div>`, ' w-cta-strip');
}

export function steps(n, list, title) {
  return block(n, 'Этапы', 'Что будет и в каком порядке?', 'регламент работы',
    `<h2>${esc(title)}</h2><ol class="w-steps" style="--cols:${Math.min(list.length, 5)}">${list.map((s, i) => `<li><b>Шаг ${i + 1}</b><span>${esc(s[0].toUpperCase() + s.slice(1))}</span></li>`).join('')}</ol>`);
}

export function signs(n, list, title) {
  return block(n, 'Когда нужно', 'Это моя ситуация?', 'признаки, по которым владелец узнаёт проблему',
    `<h2>${esc(title)}</h2><ul>${list.map((s) => `<li>${esc(s[0].toUpperCase() + s.slice(1))}</li>`).join('')}</ul>`);
}

export function why(n, brand) {
  const items = [
    ['Только ' + brand.name, 'Работаем с моделями одной марки и знаем их типовые неисправности.'],
    ['Дилерский сканер', ASK('какое диагностическое оборудование есть для марки')],
    ['Допуск к высокому напряжению', ASK('есть ли у мастеров допуск к высоковольтным работам')],
    ['Цена до начала работ', 'Согласуем список работ и цену заранее. Без согласования ничего не меняем.'],
    ['Гарантия', ASK('гарантия на работы и запчасти, срок')],
    ['Запчасти в наличии', ASK('склад запчастей: что в наличии, сроки привоза')],
  ];
  return block(n, 'Почему мы', 'Почему сюда, а не к дилеру или в обычный сервис?', 'специализация, оборудование, допуск, гарантия',
    `<h2>Почему владельцы ${esc(brand.name)} едут к нам</h2><div class="w-grid" style="--cols:3;--cols-m:2">${items.map(([h, t]) => `<article class="w-card"><h3>${esc(h)}</h3><p>${t.startsWith('<') ? t : esc(t)}</p></article>`).join('')}</div>
<p class="w-note">Каждую карточку подкрепить фото: сканер на экране, мастер в средствах защиты, склад. Без подтверждения от владельца карточку убрать.</p>`);
}

export function reviews(n, brand, about = '') {
  return block(n, 'Работы и отзывы', 'Здесь уже чинили такие машины, как моя?', 'фото работ с моделью и отзывы с карт',
    `<h2>Работы по ${esc(brand.name)}${esc(about)}</h2><div class="w-grid" style="--cols:3;--cols-m:2">${[1, 2, 3].map(() => `<article class="w-card"><div class="w-media small" data-alt="Ремонт ${esc(brand.name)} в сервисе">Фото работы: машина на подъёмнике, модель видна, госномер размыт по рамке</div><h3>${ASK('модель, что сделали')}</h3><p>${ASK('задача клиента, срок, цена')}</p></article>`).join('')}</div>
<p>${ASK('рейтинг и число отзывов на Яндекс Картах и 2ГИС')}</p>`);
}

export function priceTable(rows, head = ['Работа', 'Цена', 'Срок']) {
  return `<div class="w-table-wrap"><table class="w-table"><thead><tr>${head.map((h) => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}

export const askPrice = () => ASK('цена');
export const askTime = () => ASK('срок');
export const ask = ASK;

export function ptLine(m) {
  return m.pt.map((p) => PT_NAME[p]).join(' или ');
}
