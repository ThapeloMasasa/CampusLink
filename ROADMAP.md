# CampusLink — Development Roadmap

CampusLink is a university-focused social platform designed to bring campus communities together through social feeds, short videos, discussions, messaging, student groups, events, and a peer-to-peer marketplace.

## Project Vision

Build a polished, secure, and scalable mobile application that serves as a central hub for university life.

The long-term goal is to provide students with a trusted digital community where they can connect, share experiences, discover opportunities, organize activities, and exchange goods and services.

**Current status:** Prototype / Active Development

This roadmap outlines the planned improvements toward a complete, production-ready version of CampusLink. Priorities may evolve as development progresses.

---

## Phase 1 — Core Stability and Security

**Goal:** Establish a reliable technical foundation before expanding the application.

- [ ] Move sensitive API operations and secrets out of the mobile client.
- [ ] Implement secure authentication, session restoration, and proper logout.
- [ ] Complete account recovery and password-reset functionality.
- [ ] Make account creation and profile initialization reliable.
- [ ] Fix marketplace listing updates to target individual listing IDs.
- [ ] Replace name-based messaging lookups with immutable user IDs.
- [ ] Implement and document Supabase Row Level Security policies.
- [ ] Restore missing assets and ensure the application builds from a fresh clone.
- [ ] Fix feed refresh, persistence, and content-creation state issues.
- [ ] Improve error handling and prevent duplicate submissions.
- [ ] Establish database migrations and reproducible environment setup.

**Completion criteria:** Core workflows operate reliably, user data is protected, and the application can be built and tested from a clean checkout.

## Phase 2 — Complete the Social Experience

**Goal:** Turn existing social features into fully functional, persistent experiences.

### Feeds and discussions
- [ ] Implement reliable feed refresh and pagination.
- [ ] Replace simulated likes, votes, comments, and engagement counts with persisted data.
- [ ] Support editing and deleting user-owned content.
- [ ] Improve media uploads, validation, and failure recovery.
- [ ] Complete discussion creation, voting, and reaction flows.

### Messaging and notifications
- [ ] Implement real-time incoming-message subscriptions.
- [ ] Ensure conversations appear for both senders and recipients.
- [ ] Add reliable unread-message counts.
- [ ] Implement persistent in-app notifications.
- [ ] Add message delivery, loading, and failure states.

### Short-form video
- [ ] Complete persistent engagement for Scenes.
- [ ] Improve playback performance and resource management.
- [ ] Support reliable video uploads and media processing.

### Trust and safety
- [ ] Implement content reporting, blocking, and muting.
- [ ] Complete moderation workflows and enforce moderation decisions.
- [ ] Add appropriate content and account privacy controls.

**Completion criteria:** Students can create content, interact, communicate, and receive updates reliably across sessions.

## Phase 3 — Modern UI/UX and Accessibility

**Goal:** Deliver a consistent, intuitive, and polished mobile experience.

- [ ] Establish a shared design system for colors, typography, spacing, icons, and components.
- [ ] Evaluate simplified navigation for Home, Discover, Create, Communities, and Market.
- [ ] Make content creation accessible from a consistent entry point.
- [ ] Improve authentication and onboarding screens.
- [ ] Add meaningful empty, loading, success, and error states.
- [ ] Preserve unfinished drafts when submissions fail.
- [ ] Improve keyboard handling, safe-area support, and responsive layouts.
- [ ] Add accessibility labels and support larger text.
- [ ] Improve profile editing, bios, interests, and privacy settings.
- [ ] Validate major navigation and design decisions through usability testing.

**Completion criteria:** Users can navigate and complete common tasks without confusion, including on smaller devices and with accessibility features enabled.

## Phase 4 — Campus Communities and Marketplace

**Goal:** Differentiate CampusLink from general social networks through university-specific functionality.

### Campus identity
- [ ] Implement server-verified university membership.
- [ ] Support institution-specific email domains and international universities.
- [ ] Enforce campus boundaries through database permissions.
- [ ] Add personalized onboarding based on campus and interests.

### Communities
- [ ] Complete group membership requests and approvals.
- [ ] Support invitations, roles, and group administration.
- [ ] Improve group discussions and messaging.
- [ ] Support university clubs and student organizations.

### Campus discovery
- [ ] Introduce campus events and RSVP functionality.
- [ ] Add unified search across students, groups, discussions, events, and listings.
- [ ] Explore lost-and-found, study partners, and textbook exchange features.

### FlipSpace marketplace
- [ ] Add listing categories, item conditions, and improved filtering.
- [ ] Implement saved listings and seller contact flows.
- [ ] Support available, reserved, and sold listing statuses.
- [ ] Replace hardcoded business offers with managed records.
- [ ] Add offer expiry dates and redemption instructions.
- [ ] Distinguish seller reputation from general community participation.

**Completion criteria:** CampusLink offers a cohesive experience tailored to the needs of a real university community.

## Phase 5 — Performance, Testing, and Release Readiness

**Goal:** Demonstrate production-quality engineering and deliver a complete application experience.

### Architecture and performance
- [ ] Separate database operations from presentation components.
- [ ] Introduce consistent server-state caching and invalidation.
- [ ] Normalize database identifiers and relationships.
- [ ] Generate and adopt typed Supabase database models.
- [ ] Consolidate media-upload utilities.
- [ ] Implement pagination and efficient list rendering.
- [ ] Standardize navigation architecture.

### Quality assurance
- [ ] Add automated tests for authentication and session restoration.
- [ ] Test listing ownership and update isolation.
- [ ] Test message routing and group membership permissions.
- [ ] Test failed submissions and recovery behavior.
- [ ] Add integration tests for critical Supabase workflows.
- [ ] Introduce automated build and test checks in CI.
- [ ] Test performance and accessibility on supported devices.

### Documentation and demonstration
- [ ] Update the README to reflect the actual architecture.
- [ ] Provide environment-variable examples and setup instructions.
- [ ] Document database schema and security policies.
- [ ] Add screenshots and a product demonstration video.
- [ ] Prepare a representative single-campus demo.
- [ ] Document technical decisions and known limitations.
- [ ] Track onboarding, engagement, messaging, and marketplace success metrics.

**Completion criteria:** The application is reproducible, tested, documented, and ready for a polished portfolio demonstration or controlled campus pilot.

---

## Definition of Done

A feature is considered complete when:

- It performs its intended function using persistent data.
- Appropriate authentication and authorization checks are enforced.
- Loading, error, and empty states are handled.
- Relevant tests pass.
- The interface is usable and accessible.
- Documentation reflects the implementation.

## Development Philosophy

CampusLink will prioritize **reliability over feature count**, **campus-specific value over generic social features**, and **complete user experiences over isolated prototypes**.

The intended final product is a cohesive university community platform—not simply a collection of social media features.

---

*This roadmap is a living document and will be updated as development progresses.*
