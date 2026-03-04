# FuelMap (Django + Admin + Supabase PostgreSQL)

Проект: сайт с красивым интерфейсом, картой заправок, карточкой информации при клике и функцией поиска ближайшей заправки с построением маршрута.

## Что уже реализовано

- Главная страница с hero-блоком и современным стилем.
- Карта (Leaflet + OpenStreetMap), которая показывается на странице ниже по скроллу.
- Маркеры заправок на карте.
- Popup по клику на заправку:
  - рейтинг,
  - время работы,
  - цена,
  - описание.
- Кнопка «Найти ближайшую заправку»:
  - запрашивает геолокацию,
  - находит ближайшую заправку,
  - строит маршрут по дорогам (OSRM API).
- Админ-панель Django для управления заправками.
- Подключение БД через `DATABASE_URL` (подходит для Supabase PostgreSQL).

## Технологии

- Python 3.11+
- Django 5
- PostgreSQL (Supabase)
- Leaflet (карта)
- OpenStreetMap tiles
- OSRM (маршрутизация)

---

## Структура проекта

```bash
fuelmap/
  config/
  stations/
  manage.py
  requirements.txt
  .env.example
```

---

## Как запустить проект на своём ПК

### 1) Клонировать репозиторий

```bash
git clone <your-repo-url>
cd Marco-developer-cyber/fuelmap
```

### 2) Создать виртуальное окружение

```bash
python -m venv .venv
source .venv/bin/activate        # Linux / macOS
# .venv\Scripts\activate         # Windows PowerShell
```

### 3) Установить зависимости

```bash
pip install -r requirements.txt
```

### 4) Создать `.env`

Скопируй пример:

```bash
cp .env.example .env
```

Заполни значения в `.env` (подробно ниже).

### 5) Применить миграции

```bash
python manage.py migrate
```

### 6) Создать суперпользователя

```bash
python manage.py createsuperuser
```

### 7) Запустить сервер

```bash
python manage.py runserver
```

Открыть:
- Сайт: `http://127.0.0.1:8000/`
- Админка: `http://127.0.0.1:8000/admin/`

---

## Что должно быть в файле `.env`

Пример:

```env
SECRET_KEY=django-super-secret-key
DEBUG=True
ALLOWED_HOSTS=127.0.0.1,localhost
CSRF_TRUSTED_ORIGINS=http://127.0.0.1:8000,http://localhost:8000
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@YOUR_PROJECT_REF.supabase.co:5432/postgres
```

### Пояснение по переменным

- `SECRET_KEY` — секретный ключ Django (обязательно уникальный).
- `DEBUG` — `True` только для локальной разработки.
- `ALLOWED_HOSTS` — домены/IP через запятую.
- `CSRF_TRUSTED_ORIGINS` — URL, с которых разрешены POST-запросы к Django.
- `DATABASE_URL` — строка подключения к PostgreSQL (из Supabase Project Settings → Database).

---

## Как добавлять заправки через админку

1. Открой `/admin/`.
2. Зайди в раздел **Fuel Stations**.
3. Нажми **Add Fuel Station**.
4. Заполни поля:
   - `name`
   - `latitude` (Y)
   - `longitude` (X)
   - `rating`
   - `opening_hours`
   - `fuel_price`
   - `description`
5. Сохрани.
6. Обнови главную страницу — маркер появится на карте.

---

## Идеи для улучшения (добавил от себя)

- Фильтры по типу топлива (АИ-92, АИ-95, дизель, газ).
- Отдельные цены по каждому виду топлива.
- Фото заправки и список услуг (мойка, магазин, зарядка EV).
- Поиск по названию/району.
- Кластеризация маркеров при большом количестве точек.
- Авторизация и роли менеджеров сети АЗС.
- Кэширование API списка заправок.
- Docker + docker-compose для быстрого деплоя.

Если хочешь, следующим шагом могу добавить:
1) фильтр по видам топлива,
2) красивую карточку справа от карты,
3) мультиязычность RU/UZ/EN.
