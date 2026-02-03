# Web приклад 01 — Screenshot testing на реальному сайті: важливий нюанс

> Сайт: https://demoqa.com/

Screenshot testing на **реальному сайті** часто є нестабільним через:
- різні шрифти та рендеринг на різних OS/CI
- динамічний контент (реклама, банери, час/дата)
- анімації

## Рекомендація для навчання

1) Починай з `page.setContent(...)` (як у нашому `examples/test-frameworks/playwright/tests/03-screenshot-testing.spec.ts`) — це дає стабільний baseline.
2) Лише потім переходь до реальних сайтів, але:
   - маскуй динамічні області (`mask`)
   - фіксуй viewport
   - запускай в однаковому браузері/OS у CI

## Official docs

- https://playwright.dev/docs/api/class-pageassertions#page-assertions-to-have-screenshot-1
