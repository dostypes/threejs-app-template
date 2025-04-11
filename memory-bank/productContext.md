# Product Context: Three.js App Template

**Problem Solved:** Building interactive 3D applications often requires integrating the visual layer (Three.js) with user interfaces (HTML/CSS/JS) and external data sources (APIs, WebSockets). Managing the communication and state between these disparate parts can become complex and lead to tightly coupled, hard-to-maintain code.

**How it Should Work (Template Benefits):** This template provides a clear, scalable architecture (`AppBrain` pattern) to address this complexity:

- **Separation of Concerns:** Isolates UI logic (`UIManager`), 3D rendering (`ThreeManager`), and external service interactions (`ServicesManager`, `AIHandler`) into distinct modules.
- **Centralized Orchestration:** `AppBrain` acts as the central coordinator, directing data flow and preventing direct dependencies between modules.
- **Clear Communication:** Uses an event-driven approach (`EventEmitter`) for modules to signal changes or actions (e.g., service updates, UI interactions) and direct method calls for `AppBrain` to command modules.
- **Extensibility:** The modular design makes it easier to add new features, replace components (e.g., swap the UI framework, connect to real services), or scale the application.

**User Experience Goals (of the Template):**

- Demonstrate a functional example of UI-3D interaction (button toggles cube visibility, clicking cube updates UI).
- Demonstrate a functional example of Service-UI/3D interaction (simulated service changes cube color and updates UI text).
- Provide a clean, understandable codebase that developers can easily adapt for their own projects.
