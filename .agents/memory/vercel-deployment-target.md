---
name: Vercel deployment target
description: The user's standing target and config location for this site's Vercel deployments.
---

For this project, the user selects the `chat-gain` artifact for Vercel deployments, and its `vercel.json` belongs inside that artifact.

**Why:** the user asked that Vercel deployments target the `chat-gain` artifact and that deployment configuration be created there.

**How to apply:** When preparing or updating Vercel deployment settings, work inside `artifacts/chat-gain` and tell the user to select `chat-gain` when starting a deployment.
