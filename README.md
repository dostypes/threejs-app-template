# Three.js Application Template with AppBrain Architecture

## Overview

This project provides a reusable template demonstrating a robust and scalable architecture for building interactive Three.js applications that integrate with user interfaces (HTML/CSS/JS) and external services (simulated). It addresses the common challenge of managing communication and state between these distinct parts of an application.

**Goal:** To offer a clear, understandable, and extensible starting point for developers building complex 3D web experiences.

## Core Problem Solved

Integrating a 3D scene (Three.js), a user interface (DOM), and external data sources (APIs, WebSockets) can lead to tightly coupled and hard-to-maintain code. This template implements the **AppBrain** pattern to manage this complexity effectively.

## Benefits of this Template

- **Separation of Concerns:** Isolates UI logic (`UIManager`), 3D rendering/interaction (`ThreeManager`), and external service communication (`ServicesManager`) into distinct, manageable modules.
- **Centralized Orchestration:** The `AppBrain` class acts as the central coordinator, directing data flow and preventing direct dependencies between modules. This makes the application logic easier to follow and debug.
- **Clear Communication:** Uses an event-driven approach (Node.js `EventEmitter`) for modules to signal changes or actions upwards towards `AppBrain`, and direct method calls for `AppBrain` to command modules downwards.
- **Extensibility:** The modular design makes it straightforward to:
  - Replace the simulated service (`AIHandler`) with real API integrations or WebSocket connections.
  - Add new UI components or change the UI framework.
  - Introduce more complex 3D objects and interactions.
  - Scale the application with new features.

## Architecture: The AppBrain Pattern

The core of this template is the `AppBrain`, which orchestrates interactions between three main managers:

- **`UIManager` (`src/ui/UIManager.js`):** Manages all interactions with the HTML/CSS user interface. Listens for DOM events and emits meaningful `uiAction` events to `AppBrain`. Receives commands from `AppBrain` to update the UI (e.g., display text).
- **`ServicesManager` (`src/services/ServicesManager.js`):** Manages communication with external services. It aggregates events from specific service handlers (like the included `AIHandler`) and emits a standardized `servicesChange` event to `AppBrain`.
- **`ThreeManager` (`src/three/ThreeManager.js`):** Manages the Three.js scene, rendering loop, and 3D object interactions. Listens for user input within the 3D scene (e.g., object clicks via `InputHandler`) and emits events like `objectSelected` to `AppBrain`. Receives commands from `AppBrain` to modify the scene (e.g., change object colors, toggle visibility).

**Communication Flow:**

1.  **Events In:** Managers (`UIManager`, `ServicesManager`, `ThreeManager`) emit events when something happens in their domain (UI click, service message, 3D object selected).
2.  **Brain Listens:** `AppBrain` listens for these specific events.
3.  **Methods Out:** Based on the received event, `AppBrain` calls specific, public methods on the appropriate manager(s) to trigger updates or actions in other parts of the application.

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd threejs-app-template
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the development server:**

    ```bash
    npm run dev
    ```

    This will start a Vite development server, typically accessible at `https://localhost:8080/`. Note that it uses self-signed SSL certificates (`key.pem`, `certificate.pem`) for HTTPS, so your browser might show a security warning which you can usually bypass for local development.

4.  **Build for production:**
    ```bash
    npm run build
    ```
    This creates an optimized build in the `dist/` folder.

## Key Files

- `index.html`: Main HTML entry point.
- `src/main.js`: Application entry point, initializes `AppBrain`.
- `src/AppBrain.js`: The central orchestrator.
- `src/ui/UIManager.js`: Manages the DOM UI.
- `src/services/ServicesManager.js`: Manages external service interactions.
- `src/services/AIHandler.js`: _Example_ service handler (replace with real integration).
- `src/three/ThreeManager.js`: Manages the Three.js scene and rendering.
- `vite.config.js`: Build tool configuration.

## Customizing the Template

- **Integrate Real Services:** Replace or augment `src/services/AIHandler.js` with code to connect to your actual backend APIs, WebSockets, or other data sources. Update `ServicesManager` accordingly.
- **Expand the UI:** Add more components and logic within `src/ui/` and update `UIManager` to manage them.
- **Enhance the 3D Scene:** Add more objects, lighting, controls, and interactions within `src/three/` and update `ThreeManager`.

## License

This project is licensed under the MIT License.
