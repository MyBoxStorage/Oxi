# AUDITORIA — ÔXI COZINHA NORDESTINA

**Data:** 27/02/2025  
**Projeto:** C:\Users\pc\Desktop\Projetos\oxi-restaurante

---

## 1. BUGS ENCONTRADOS (arquivo e linha / descrição)

### CSS / Variáveis
| Arquivo | Problema |
|---------|----------|
| `variables.css` | Faltavam aliases `--cor-*` (--cor-areia, --cor-verde-musgo, etc.) e `--space-md`, `--space-lg`, `--space-xl`, `--space-sm`, `--space-2xl`, `--text-md` usados em style.css, home.css, typography.css, transitions.css. |
| `style.css` | Referências a variáveis inexistentes causavam cores/espaçamentos quebrados. |
| `navbar.css` | Classe `.navbar__nav` não existia (apenas `.navbar__links`); HTML do index usa `.navbar__nav`. |
| `navbar.css` | Estrutura `.navbar__fullmenu` (fullmenu) não tinha estilos; apenas `.mobile-menu` existia. |
| `footer.css` | HTML do index usa `.footer__top`, `.footer__nav-col`, `.footer__address-cards`, `.footer__bottom`; CSS usava `.footer__body`, `.footer__grid`, `.footer__nav-title`, `.footer__nav-list`. |
| `home.css` | `.hero__bg` sem `overflow: hidden`; risco de imagem estourando. |
| `home.css` | `.hero__bg-img` sem `display: block`. |
| `home.css` | `.galeria__grid` sem `grid-auto-rows`; `.galeria__item--tall` com `aspect-ratio: auto` sem altura definida. |
| `home.css` | `.nossa-terra-preview__bg` sem `overflow: hidden`. |
| `home.css` | `.chef-preview__img img` sem altura definida no container (só aspect-ratio na img). |
| `home.css` | `.carousel__track` com `min-height: 220px`; slides com `position: absolute` incompatível com transição por `translateX`. |
| `home.css` | Falta fallback `.no-js` para hero (título, subtítulo, botões, scroll com `opacity: 0` se GSAP falhar). |
| `style.css` | `body { cursor: none }` forçava cursor nenhum mesmo sem cursor customizado ativo. |

### HTML
| Arquivo | Problema |
|---------|----------|
| `index.html` | `#preloader` sem `class="preloader"`; preloader.js usa `document.querySelector('.preloader')` e não encontrava o elemento. |
| `index.html` | Barra do preloader era `.preloader__bar`; CSS usa `.preloader__progress` e `.preloader__progress-bar`. |
| `index.html` | Navbar sem classe `navbar--hero` para fundo transparente no topo. |

### JavaScript
| Arquivo | Problema |
|---------|----------|
| `preloader.js` | Nunca chamava `initHeroAnimations` após esconder o preloader; hero ficava com letras invisíveis. |
| `navbar.js` | Procurava `.mobile-menu` e `.mobile-menu__link`; index usa `.navbar__fullmenu` e `.fullmenu__link`. |
| `navbar.js` | Não tratava `.fullmenu__link` para active/close. |
| `marquee.js` | Procurava `.marquee__track` e `.marquee__content`; index usa `.marquee` e `.marquee__inner`. |
| `carousel.js` | Procurava `.testimonials__carousel`, `.testimonials__track`, `.testimonials__dot`, `.testimonial-slide`; index usa `.carousel`, `.carousel__track`, `.carousel__dot`, `.carousel__slide`. |
| `carousel.js` | Botões `.carousel__prev` e `.carousel__next` não tinham listeners. |
| `main.js` | Lenis criado mas não exposto em `window.lenis`; animations.js criava segundo Lenis. |
| `animations.js` | Criava Lenis de novo no `load`; duplicava smooth scroll. |
| `animations.js` | Hero letters animados no `load` e de novo por initHeroAnimations; possível conflito. |

### Scripts
| Arquivo | Problema |
|---------|----------|
| `index.html` | Ordem dos scripts incorreta: main.js e Alpine no meio; spec pede preloader → navbar → transitions → animations → marquee → carousel → main → Alpine por último. |

### Layout
| Arquivo | Problema |
|---------|----------|
| `style.css` | Falta `main#main-content { padding-top: 72px }` para compensar navbar fixa. |
| `home.css` | Hero precisa de margem negativa para continuar fullscreen com o main tendo padding-top. |

---

## 2. CORREÇÕES APLICADAS

- **variables.css:** Adicionados aliases `--cor-*`, `--space-sm/md/lg/xl/2xl`, `--text-md` e `--z-menu`.
- **index.html:** Classe `preloader` no `#preloader`; estrutura da barra alterada para `.preloader__progress` > `.preloader__progress-bar`; classe `navbar--hero` no header; ordem dos scripts corrigida.
- **navbar.css:** Estilos para `.navbar__nav` (alias de links); estilos completos para `.navbar__fullmenu`, `.fullmenu__nav`, `.fullmenu__link`, `.fullmenu__footer`, `.fullmenu__bg-text`; `max-width` e padding em `.navbar__inner`.
- **navbar.js:** Suporte a `.navbar__fullmenu` e `.fullmenu__link`; fallback quando não existe `.mobile-menu`.
- **footer.css:** Estilos para `.footer__top`, `.footer__nav-col`, `.footer__address-cards`, `.footer__address-card`, `.footer__bottom`; responsivo para address-cards.
- **home.css:** `overflow: hidden` e `display: block` em hero__bg e hero__bg-img; `overflow: hidden` em nossa-terra-preview__bg; chef-preview__img com aspect-ratio no container e img com width/height 100% e object-fit cover; galeria com `grid-auto-rows: 260px` e imagens contidas; carousel com flex e `min-height: 300px`; hero com `margin-top: -72px` e `padding-top: 72px`; fallback `.no-js` para hero; animação do marquee com `.marquee__track` e keyframes.
- **style.css:** `main#main-content { padding-top: 72px }`; cursor apenas com `body.custom-cursor-active`.
- **marquee.js:** Suporte a `.marquee` + `.marquee__inner`; criação de `.marquee__track` e clone para loop infinito.
- **carousel.js:** Suporte a `.carousel` quando não existe `.testimonials__carousel`; uso de `.carousel__track`, `.carousel__slide`, `.carousel__dot`, `.carousel__prev`, `.carousel__next`.
- **preloader.js:** Chamada a `initHeroAnimations` ao esconder preloader; adição de `preloader-done` no body.
- **main.js:** `window.lenis = lenis` para uso em animations.js.
- **animations.js:** Criação de Lenis apenas se `!window.lenis`; animação do hero apenas se não houver `preloader-done` (evita duplicar com initHeroAnimations).

---

## 3. VERIFICAÇÃO VISUAL RECOMENDADA

Abra `http://localhost:8080` e confira:

- [ ] Preloader aparece e some; barra enche; hero anima após sair o preloader.
- [ ] Hero em 100vh; imagem contida; navbar transparente no topo e fundo ao rolar.
- [ ] Marquee rola em loop contínuo.
- [ ] Manifesto em 2 colunas; destaques com 3 cards e imagens contidas.
- [ ] Pratos em grid 4 colunas; imagens com overlay e contidas.
- [ ] Chef preview: imagem 4:5 contida; texto ao lado.
- [ ] Galeria: grid com item tall em 2 linhas; imagens contidas.
- [ ] Nossa Terra: parallax/overlay; imagem contida.
- [ ] Eventos: 3 cards; depoimentos: carousel com setas e dots.
- [ ] Blog: 3 cards; formulário de reserva; envio mostra mensagem de sucesso.
- [ ] Footer: logo, nav, address cards, “ÔXI” gigante, bottom.
- [ ] Mobile: menu hamburger abre fullmenu; links fecham menu.

Console (F12): verificar ausência de erros JavaScript.

---

## 4. PÁGINAS A CRIAR (Fase 5)

Ainda não implementadas; devem reutilizar navbar e footer do index, mesmos CSS/JS, sem preloader:

- `cardapio.html`
- `chef.html`
- `nossa-terra.html`
- `eventos.html`
- `contato.html`
- `blog/post-1.html`
- `blog/post-2.html`
- `blog/post-3.html`
- `style-guide.html`

Cada uma com `padding-top` adequado (ex.: 72px no main ou na primeira seção).

---

## 5. PRÓXIMOS PASSOS PARA DEPLOY

1. **Vercel:** Conectar repositório; build command vazio (site estático); output directory: raiz do projeto; publicar.
2. **Netlify:** Conectar repositório; build: nenhum; publish directory: `.` ou raiz.
3. Garantir que links internos (cardapio, chef, etc.) apontem para os arquivos corretos após criação das páginas.
4. Favicon: `assets/svg/favicon.svg` já referenciado; conferir se o arquivo existe.
5. Opcional: minificar CSS/JS e otimizar imagens para produção.

---

## 6. ARQUIVOS NÃO USADOS NO INDEX

- `home2.css`, `home3.css`, `utilities.css`, `pages.css` **não** estão linkados no `index.html`. Podem ser removidos ou mantidos para páginas internas (chef, nossa-terra, eventos, contato, blog). Se não forem usados nas páginas a criar, podem ser deletados ou consolidados em `home.css` no futuro.
- `cursor.js` e `forms.js` não estão no index; o formulário é tratado por `main.js` (`.form-oxi`). Se quiser cursor customizado, incluir `cursor.js` e ativar `body.custom-cursor-active` via JS.
