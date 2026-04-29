# Product Notes

The product framing is a two-sided mobility workflow where trust and timing matter more than decorative UI.

## User Journeys

- Rider requests a ride and waits for acceptance
- Driver reviews and accepts a ride opportunity
- Trip state moves from request to completion

## Functional Requirements

- Represent rider and driver roles
- Track request, acceptance, and completion state
- Surface clear trip status in the interface

## Constraints

- Real deployment requires maps, pricing, payments, identity, and safety infrastructure
- Blockchain settlement should not slow down core trip UX
- Operational support must handle cancellations and disputes

## Roadmap Ideas

- Add trip state machine documentation
- Introduce map and route abstraction
- Add local contract tests and non-contract payment alternative notes


