# Project Brief: Three.js App Template

**Goal:** Provide a reusable template demonstrating a robust architecture for building interactive Three.js applications integrated with external services and user interfaces.

**Core Requirements:**

- **Modular Architecture:** Utilize a central `AppBrain` (`src/AppBrain.js`) to orchestrate communication between distinct modules:
  - `ui`: Managed by `src/ui/UIManager.js`. Handles DOM interactions and UI updates.
  - `services`: Managed by `src/services/ServicesManager.js`. Handles external communication (simulated via `src/services/AIHandler.js`).
  - `three`: Managed by `src/three/ThreeManager.js`. Handles all Three.js scene setup, rendering, and object interactions.
- **Decoupled Communication:** Implement an event-driven pattern using Node.js's `EventEmitter`.
  - Managers responsible for external input or user interaction (`AIHandler`, `UIManager`, `ThreeManager` for object selection) emit events.
  - `ServicesManager` aggregates events from its handlers (like `AIHandler`).
  - `AppBrain` listens for events from `ServicesManager`, `UIManager`, and `ThreeManager`.
  - `AppBrain` calls specific methods on other managers to trigger actions (e.g., `ui.changeInfoText()`, `three.changeColor()`).
- **Clear Data Flow:** Ensure modules do not communicate directly; all interaction flows through `AppBrain`.
- **Template Focus:** The codebase should serve as a clear example and starting point for similar applications.
