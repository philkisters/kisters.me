---
title: PktMoney
description: A small web app that allows parents to keep track of the pocket money of their kids. This came in handy for us when kids started to sell old toys on yard sales or ebay.
image: /images/pkt-money.png
stack:
  - Nuxt
  - Family
  - Supabase
status: Adding Features
---

**PktMoney** is a lightweight web application that helps parents track their children's pocket money in a digital world.

As cash becomes less common and children increasingly interact with digital payments from an early age, PktMoney provides a simple way to manage virtual savings. Parents can easily add or subtract money from a child's digital piggy bank while always having an up-to-date overview of the current balance.

Every transaction is stored in a history, allowing both parents and children to see how the money was earned, saved, or spent. This creates transparency and encourages conversations about responsible money management.

## Tech Stack

- **Frontend:** Nuxt
- **Database & Backend:** Supabase
- **Architecture:** Single Page Application (SPA)

The application follows a database-centric architecture: all business logic is implemented as PostgreSQL RPC functions inside Supabase. The frontend acts as a thin client, ensuring that every state change is validated and executed atomically by the database. This approach minimizes client-side complexity and prevents inconsistent application state.
