# Thrive Launch Grant: Technical Execution Scope (Tranche 1)

**Status:** Planned Execution (Pending Grant Approval)
**Grant Allocation:** 280,000 HBAR (~$30,000 - $35,000 USD est.)
**Scope Focus:** Hedera-Native Infrastructure & "Genesis" User Activation
**Reference:** Backend Build Plan v2.0 (Roberto Capodieci)

---

## 1. Executive Summary: The "Catalyst" Strategy
The full FinancialPress MVP is a $95,000 / 104-day build. This Thrive Grant (Tranche 1) is not intended to fund the entire platform. Instead, it is scoped to fund the **Hedera-Native Core**—the strictly necessary blockchain infrastructure required to activate the network and achieve the Launch Track metrics (400 MAUs / 50k Transactions).

**Strategic Capital Approach:**
Successful execution of this grant serves as the technical validation required to unlock our **Institutional Capital Tranche**. We have structured this build so that the grant delivers a functional, metrics-generating "Genesis" environment, which provides the de-risked validation our internal investors require to fund the remaining Web2 polish, security compliance, and frontend scaling.

## 2. Tranche 1 Scope: What This Grant Builds
We are prioritizing high-frequency on-chain modules over passive Web2 features. The grant funding is allocated strictly to the following **Hedera Services**:

### A. The Trust Engine (HCS Integration)
*Objective: Immutable Proof of Authorship*
**Budget Allocation:** ~40%
**Implementation:**
* **HCS Logger Module:** Implementation of `@hashgraph/sdk` to anchor content hashes.
* **R3L Verification Pipeline:** Integration of the basic R3L hashing logic to generate "Trust Signals" from user content.
* **Target Metric:** Every user post generates 2-3 HCS transactions (Hash -> Verify -> Anchor).

### B. The Economy Engine (HTS Integration)
*Objective: Real-Time Incentives & "Share-to-Earn"*
**Budget Allocation:** ~40%
**Implementation:**
* **FPT Token Service:** Deployment of the FinancialPress Token (FPT) on Hedera Token Service.
* **Reward Logic:** Backend listeners that trigger automated micro-transfers for high-frequency actions (Likes, Shares, Invites).
* **Target Metric:** "Share-to-Earn" loop drives high-velocity token distribution to hit 50k monthly transactions.

### C. "Genesis" User Activation
*Objective: 400 Active "Genesis" Users*
**Budget Allocation:** ~20%
**Implementation:**
* **Genesis Worker:** A lightweight, standalone Node.js worker to track pre-TGE points for the waitlist cohort.
* **Ambassador Tooling:** Simple referral attribution scripts to empower our launch ambassadors to onboard the first 400 verified users.

---

## 3. Implementation Roadmap vs. Full MVP
To ensure we stay within the grant budget while delivering a working product, we are phasing the build as follows:

| Feature Module | **Tranche 1 (Thrive Grant)** | **Tranche 2 (Institutional Capital)** |
| :--- | :--- | :--- |
| **Blockchain** | **Full HCS & HTS Integration** | Advanced Governance / Staking |
| **Backend** | Core Node.js / PostgreSQL / API | Advanced Analytics / Optimization |
| **Verification** | Basic R3L Content Hashing | AI Fact-Checking / Deepfake Detection |
| **Payments** | **Dropp Basic Tipping** | Advanced Subscriptions / Fiat Ramps |
| **Security** | Basic Auth (Reown) | SOC 2 Logs / Enterprise Compliance |
| **Frontend** | Functional "Genesis" UI | Mobile App / Polish / Animations |

## 4. Repository Structure & Stubs
Reviewers will note that the `/src/services/hedera` and `/src/services/r3l` directories are currently stubbed. These are the specific active development zones for this Grant Tranche.

* `/src/services/hedera/hcs-logger.js` -> To be built in Sprint 1
* `/src/services/hedera/hts-token.js` -> To be built in Sprint 2
* `/src/workers/genesis-worker.js` -> To be built in Sprint 2

## 5. Conclusion
This grant buys **velocity**. By isolating the Hedera infrastructure into this first tranche, we ensure that FinancialPress is "chain-alive" immediately. This generates the on-chain metrics Thrive requires and provides the concrete validation needed to close our broader capitalization rounds for mass-market scaling.