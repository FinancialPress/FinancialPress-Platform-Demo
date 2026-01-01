# Thrive Launch Grant: Technical Execution Scope (Tranche 1)

**Status:** Planned Execution (Pending Grant Approval)
**Grant Allocation:** 280,000 HBAR (~$30,000 USD est.)
**Scope Focus:** Hedera-Native Infrastructure & Genesis Activation
**Scope Note:** This tranche is intentionally limited to a minimal, production-grade Hedera deployment and does not represent the full FinancialPress MVP.

---

## 1. Executive Summary: The "Catalyst" Strategy
The full FinancialPress platform is a larger undertaking. This Thrive Grant (Tranche 1) is strictly scoped to fund the **Hedera-Native Core**—the necessary blockchain infrastructure required to activate the network and demonstrate verifiable on-chain usage.

**Strategic Capital Approach:**
Successful execution of this grant serves as technical validation. We have structured this build so that the grant delivers a functional "Genesis" environment, providing the de-risked validation required to secure broader capitalization for full Web2 feature scaling.

## 2. Tranche 1 Scope: What This Grant Builds
We are prioritizing essential on-chain modules over passive Web2 features. The grant funding is allocated strictly to the following **Hedera Services**:

### A. The Trust Engine (HCS Integration)
*Objective: Immutable Proof of Authorship*
**Budget Allocation:** ~40%
**Implementation:**
* **HCS Logger Module:** Implementation of `@hashgraph/sdk` to anchor content hashes.
* **R3L Verification Integration:** Integration of basic hashing logic to generate verifiable signals.
* **Target Metric:** Each qualifying content publish action generates a single HCS anchoring event, with schema designed to support future expansion.

### B. The Economy Engine (HTS Integration)
*Objective: Verified Genesis Incentives*
**Budget Allocation:** ~40%
**Implementation:**
* **FPT Token Service:** Deployment of the FinancialPress Token (FPT) on Hedera Token Service.
* **Incentive Logic:** Backend listeners that trigger automated micro-transfers for specific Genesis actions (e.g., content publishing or onboarding).
* **Target Metric:** Verification of core HTS distribution logic through a capped "Genesis" incentive program.

### C. "Genesis" User Activation
*Objective: Initial Genesis Cohort Activation*
**Budget Allocation:** ~20%
**Implementation:**
* **Genesis Worker:** A lightweight, standalone Node.js worker to track pre-TGE engagement for the initial cohort.
* **Ambassador Tooling:** Basic attribution scripts to empower launch ambassadors to onboard the initial verified user set sufficient to demonstrate repeatable on-chain activity.

---

## 3. Implementation Roadmap vs. Full MVP
To ensure we stay within the grant budget while delivering a working product, we are phasing the build as follows:

| Feature Module | **Tranche 1 (Thrive Grant)** | **Post-Grant Scaling** |
| :--- | :--- | :--- |
| **Blockchain** | **Core HCS & HTS Integration** | Advanced Governance / Staking |
| **Backend** | Core Node.js / PostgreSQL / API | Advanced Analytics / Optimization |
| **Verification** | Basic Content Hashing | AI Fact-Checking / Deepfake Detection |
| **Payments** | **Dropp Basic Integration** | Advanced Subscriptions / Fiat Ramps |
| **Security** | Basic Auth (Reown) | SOC 2 Logs / Enterprise Compliance |
| **Frontend** | Functional "Genesis" UI | Mobile App / Polish / Animations |

## 4. Repository Structure & Stubs
Reviewers will note that the `/src/services/hedera` and `/src/services/r3l` directories are currently stubbed. These are the specific active development zones for this Grant Tranche.

* `/src/services/hedera/hcs-logger.js` -> To be built in Sprint 1
* `/src/services/hedera/hts-token.js` -> To be built in Sprint 2
* `/src/workers/genesis-worker.js` -> To be built in Sprint 2

## 5. Conclusion
This grant buys **velocity**. By isolating the Hedera infrastructure into this first tranche, we ensure that FinancialPress is "chain-alive" immediately. This generates the on-chain metrics Thrive requires and provides the concrete validation needed to validate our broader deployment strategy.