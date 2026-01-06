> [!IMPORTANT]
> **Grant Reviewer Note:** This repository contains the **v2.0 MVP Core (Web2 Foundation)** currently under active development.
>
> The **"Core Systems"** described below represent the **Target Architecture**. The specific Hedera-native services (HCS Logging, R3L Verification, and HTS Rewards) are currently stubbed in the `/src/services` directory and are scheduled for implementation during the **Grant Execution Phase**.
>
> **First Hedera Activation:** Upon grant execution, the initial on-chain action will be the anchoring of content hashes to **Hedera Consensus Service (HCS)** for provenance verification, followed by deployment of the FinancialPress Token (FPT) on **Hedera Token Service (HTS)**.
>
> Please refer to `docs/first-tranche-scope.md` for the detailed implementation plan linked to the funding milestones.

This repository contains an early-stage platform demo and architectural foundation for FinancialPress, a credibility-first financial media platform.

FinancialPress explores how blockchain-based verification, reputation systems, and aligned incentives can reduce misinformation, restore accountability, and help investors identify signal in an increasingly noisy information environment.

This repository represents an active development demo and forward-looking architecture. Open-source components will be released incrementally as they are production-hardened.

---

## Core Systems

### Verified Content Feed
A curated financial news and analysis feed designed to prioritize verified authorship and reduce untrusted or automated content.

**Proof of Provenance**  
All articles are hashed and anchored to the Hedera Consensus Service (HCS) via the R3L Protocol, creating an immutable audit trail for content origin and integrity.

**Identity Verification**  
Contributors undergo tiered identity verification (from Basic to SEC-compliant KYC) to prevent impersonation, bot activity, and fraudulent attribution.

---

### Reputation Engine (RP)
A non-transferable credibility score designed to quantify author trustworthiness over time.

**Scoring Logic**  
Reputation Points (RP) are calculated based on historical accuracy, account longevity, and community validation.

**Privileges**  
Higher RP tiers unlock enhanced visibility, governance participation, and eligibility for $FPT-based rewards.

---

### Incentive & Monetization Layer

**Share-to-Earn**  
A proprietary attribution engine rewards users with $FPT for distributing verified content that generates genuine engagement.

**Micropayments**  
Integrated Dropp support enables instant fiat (USD) and cryptocurrency (HBAR / USDC) tipping and pay-per-view access.

---

## Technology Stack

FinancialPress leverages a serverless, event-driven architecture to ensure scalability while relying on Hedera for immutable trust guarantees.

### Core Platform
- Web3 & Trust Infrastructure  
- DevOps & Analytics  

### Infrastructure
- AWS Serverless (Lambda, Fargate, API Gateway)

### Analytics
- Matomo (privacy-first user analytics)  
- AWS CloudWatch (system health and observability)

### CI/CD
- GitHub Actions for automated testing and deployment

---

## Open Source & Grant Context

FinancialPress follows an open-core strategy.

While the full application is under active development, we plan to open-source key components related to:
- Content and authorship verification  
- Reputation and credibility scoring models  
- Public APIs and SDKs for third-party integrations  
- Auditability and provenance infrastructure  

Grant funding would support the development and release of these shared infrastructure components for the broader ecosystem, particularly in areas related to trustworthy financial media and verifiable information systems.

---

## Development Roadmap

Development is structured into four phases, progressing from core infrastructure to public scale.

### Phase 1: Foundation (Current)
- [x] UI/UX Architecture & Prototype (Next.js)  
- [x] Identity Infrastructure (Reown AppKit integration)  
- [x] Database Schema Design (PostgreSQL)  

### Phase 2: Intelligence & Integration (In Progress)
- [ ] Hedera HCS integration for immutable content provenance  
- [ ] R3L pipeline for proof-of-authorship verification  
- [ ] Reputation Engine (RP) scoring logic deployment  

### Phase 3: “Genesis” Ambassador Beta
- [ ] Controlled launch of the Verified Feed to an initial Genesis cohort  
- [ ] Ambassador onboarding for verified contributors  
- [ ] Activation of Dropp-based fiat micropayments  

### Phase 4: Public Launch & Scale
- [ ] Token Generation Event (TGE) for $FPT  
- [ ] Enterprise APIs and Credibility-as-a-Service data streams  
- [ ] Expanded ecosystem integrations  

---

## Explicit Scope Boundaries (Grant Tranche 1)

To ensure disciplined execution and efficient use of grant funding, the following are **explicitly out of scope** for Tranche 1:
- AI-based moderation or fact-checking  
- Advertising systems or monetization optimization  
- Advanced governance, staking, or DAO mechanisms  
- Subscription billing infrastructure  

These capabilities are intentionally deferred to post-grant phases.

---

## Getting Started

Follow the steps below to run the FinancialPress development environment locally.

### Prerequisites
- Node.js (v18+)  
- npm or yarn  
- Hedera Testnet account (when HCS features are enabled)

### Installation
1. Clone the repository  
2. Install dependencies  
3. Configure environment variables by creating a `.env.local` file in the root directory  
4. Run the development server  
5. Open the application in your browser  

> Note: This repository is under active development. Local setup instructions may change as infrastructure components are finalized.

---

## The Team

FinancialPress is led by veterans in financial media, blockchain architecture, and enterprise technology.

- **Mark Chadwick (CEO)** — 25+ years in financial media and capital markets (VantageWire, Equities.com)  
- **David A. Cohen (CTO)** — Founding advisor of Hedera Hashgraph; AI and decentralized systems expert  
- **Simon Jewell (CSO)** — Web3 strategist specializing in creator economies and fan engagement  
- **Craig Brewster (CXO)** — 30+ years in UX/UI and service design  
- **Roberto Capodieci (Advisor)** — Blockchain architect and innovation lead  
- **Justyn Spooner (Advisor)** — Core Hedera contributor and full-stack developer  

---

## Contributing

At this stage, FinancialPress is not accepting external code contributions.

This repository exists to document architectural direction and prepare for future open-source releases. Planned open-source components will be clearly identified as they are released.

Please see `CONTRIBUTING.md` for additional details.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
