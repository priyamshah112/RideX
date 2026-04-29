# RideX

RideX is a ride-hailing prototype with an Express application, EJS views, controller-based rider and driver flows, and a Solidity contract artifact.

## Repository Status

- Current role: Ride-hailing prototype exploring rider, driver, trip, and contract-backed settlement concepts
- Documentation status: refreshed for public review
- Primary audience: engineers, product reviewers, and collaborators evaluating the project context

## What This Project Does

- Express application with server-rendered views
- Rider and driver workflow controllers
- Trip-oriented views and route handling
- Solidity contract artifact for decentralized settlement exploration

## Technology Stack

- Node.js and Express
- EJS templates
- Solidity contract under Contract/
- Static assets and view-driven application structure

## Repository Map

- express_app/ contains the web application
- Contract/ contains the smart contract artifact
- RideX.gif provides a visual demo asset
- README.md captures original project context

## Getting Started

- Install Node.js and npm in the Express app directory
- Run npm install where package metadata is present
- Configure local values with safe placeholders
- Start the Express app for local review
- Use contract tooling only in a local development network

## Documentation

- docs/overview.md - product context, users, scope, and outcomes
- docs/architecture.md - components, data flow, and sequence diagrams
- docs/product.md - user journeys, requirements, constraints, and roadmap ideas
- docs/operations.md - setup, validation, maintenance, and known risks

## Known Limitations

- Prototype does not represent production routing, payments, identity verification, or safety workflows
- Contract-backed settlement needs rigorous threat modeling
- Real ride-hailing requires geospatial accuracy and operational support design

## Notes For Future Maintainers

This repository documents the original project intent and the implementation shape visible in the codebase. Before production use, review dependencies, environment configuration, data handling, and deployment assumptions against current standards.


