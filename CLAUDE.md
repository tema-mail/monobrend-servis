# Моносайты сервиса: Lixiang, Zeekr, Voyah, Lynk & Co, Geely, Changan

Ч/б прототипы шести сайтов ремонта и ТО по образцу минской сети lixiangminsk.by (разбор: ~/Sites/seo-razbory/monobrend-minsk-0173a99d).
Стратегия владельца 01.11.2026: моносайт на марку + города (поддомены), отдельно агрегатор всех марок от другой компании.

- Данные: `data/services.mjs` (услуги, к чему применимы), `data/brands.mjs` (модели, силовые установки, город `CITY`).
- Сборка: `node build.mjs [/base]` → `dist/`; шаблоны `src/render.mjs`, комплект прототипа `src/kit.css`, `src/page.js`.
- Проверка образцов: `node ~/.claude/skills/marketolog/prototip/proverka.mjs dist/<путь>/index.html <папка снимков>` – PASS.
- Pages: https://tema-mail.github.io/monobrend-servis/ (noindex, robots Disallow), деплой workflow из main.

Правила: цены, сроки, гарантии и реквизиты не выдумывать – метка «запросить». Страница «модель × услуга» только если услуга
подходит силовой установке модели (`features()`); финальный список – по спросу Wordstat. Тире только «–».
Geely и Changan – только гибриды и электромобили (`evOnly`), бензиновые модели не берём (владелец 01.11.2026).
