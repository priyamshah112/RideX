# Architecture

RideX uses a server-rendered Express application for ride workflows and keeps the contract concept separate from the application shell.

## Component View

```mermaid
flowchart LR
  Actor["Rider or driver"] --> Entry["Express views"]
  Entry --> Service["Ride workflow controllers"]
  Service --> Data["Application state"]
  Service --> External["Solidity contract concept"]
```

## Key Components

- EJS views for rider and driver surfaces
- Express controllers for trip workflows
- Static demo assets
- Solidity contract artifact

## Main Workflow

```mermaid
sequenceDiagram
  participant User
  participant Client
  participant App
  participant Store
  User->>Client: Starts or accepts a ride request
  Client->>App: Submits trip action
  App->>Store: Validate and persist state
  Store-->>App: Trip state updated
  App-->>Client: Returns updated ride view
  Client-->>User: Present updated result
```

## Design Considerations

- Separate rider and driver responsibilities clearly
- Model trip state as a lifecycle
- Treat location, pricing, and safety as first-class future concerns


