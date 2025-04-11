# Tech Context

**Core Technologies:**

- **JavaScript (ES Modules):** Primary language for the application.
- **Three.js:** Library for 3D rendering.
- **HTML/CSS:** For the UI layer.
- **Node.js `events` Module:** Used for implementing the `EventEmitter` pattern for decoupled communication.

**Build Tool:**

- **Vite:** Used for development server (`npm run dev`) and bundling (`npm run build`). Configuration in `vite.config.js`. Includes `vite-plugin-glsl` for shader support.

**Development Setup:**

- Standard Node.js environment (`npm install`).
- Run development server with `npm run dev`. This uses HTTPS with self-signed certificates (`key.pem`, `certificate.pem`).
- Build for production with `npm run build`.

**Key Dependencies:**

- `three` (from `package.json`)
- `vite` (dev dependency)
- `vite-plugin-glsl` (dev dependency)
- Node.js built-in `events` module (no separate install needed).

**Tool Usage Patterns:**

- **Managers:** `UIManager`, `ServicesManager`, `ThreeManager`, `AIHandler` encapsulate specific domains.
- **Orchestrator:** `AppBrain` coordinates interactions between managers.
- **Event Emitters:** The following classes extend `EventEmitter` to signal events:
  - `AIHandler` (e.g., `changeColor` - simulated service event)
  - `ServicesManager` (e.g., `servicesChange` - aggregates service events for `AppBrain`)
  - `UIManager` (e.g., `uiAction` - signals meaningful UI events like button clicks)
  - `ThreeManager` (e.g., `objectSelected` - signals 3D interaction events)
  - `ToggleButton` (e.g., `clicked` - low-level component event, handled by `UIManager`)
- **Communication Flow:** Events signal changes _upwards_ towards `AppBrain`, which then makes direct method calls _downwards_ to the relevant managers.

**Constraints:**

- Browser environment limitations.
- Requires careful management of Three.js resource disposal if objects are frequently added/removed in a more complex application.

---

## Coding Style Preferences

### Variables and Declarations

- Use `const` by default; use `let` only when reassignment is necessary. Never use `var`.
- Prefer `'single'` quotes for strings.
- Prefer no semicolons. Let Prettier handle statement endings automatically.
- Prettier handles formatting with custom config (`singleQuote: true`, `semi: false`, `trailingComma: 'es5'`, etc.).

### Functions

- Prefer arrow functions (`const myFunc = () => {}`).
- Always use braces `{}` for control structures, even for single-line blocks.
- Prefer using `else` even after a `return`, for clarity and explicit branching.

### Naming

- Use `camelCase` for variables and functions.
- Use `PascalCase` for class names.
- No prefix (`_`, `#`) for private members; rely on context and clarity.

### Style and Syntax

- Prefer breaking method chains into intermediate steps, especially in Three.js.
- Prefer passing direct values to methods like `.set()` when the meaning is clear.
- Use destructuring when it improves clarity, but prefer explicit access when more readable.
- Prefer `value || defaultValue` or `condition ? a : b` for fallback logic; rarely use `??`.
- **Avoid template literals (backticks ``) for simple string concatenation.** Prefer `'single'` quotes and `+` instead (e.g., `'String part 1 ' + variable + ' string part 2'`).

### Comments and Clarity

- Minimize comments; prefer self-explanatory code.
- Use comments mainly to separate logical blocks within classes or large functions.
- Keep classes and methods short. Encapsulate and abstract logic progressively.
- Favor explicit code over hidden "magic", unless relying on trusted libs like Three.js.
