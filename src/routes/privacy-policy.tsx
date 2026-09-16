import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/privacy-policy")({
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
  return (
    <div className="bg-white min-h-screen pt-16 pb-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mt-8 mb-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#5B6470] hover:text-[#14171A] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>

        <h1 className="text-3xl md:text-4xl font-display font-semibold text-[#14171A] mb-2">
          E-Redeem Privacy Policy
        </h1>
        <p className="text-sm text-[#5B6470] mb-12">Last Updated: September 13, 2026</p>

        <div className="space-y-10 text-[#5B6470] leading-relaxed text-sm sm:text-base">
          {/* Section 1 */}
          <section>
            <h2 className="text-xl font-bold text-[#14171A] mb-3">1. Introduction</h2>
            <p className="mb-3">
              This Privacy Policy is issued by Excite Panacea ("Excite Panacea," "E-Redeem," "we,"
              "us," or "our") in accordance with the Nigeria Data Protection Act, 2023 ("NDPA") and
              the General Application and Implementation Directive ("GAID") issued by the Nigeria Data
              Protection Commission ("NDPC").
            </p>
            <p className="mb-3">
              This Policy explains how we collect, process, share, and protect the personal data of
              individuals ("Data Subjects," "Participants," "you") who interact with the E-Redeem
              platform — a Gen-AI powered consumer engagement, loyalty, and promotions platform that
              enables consumer brands ("Sponsoring Brands" or "Clients," e.g., Ribena, Guinness) to
              run interactive, multi-channel marketing campaigns, including Short Code to Win, Polls,
              Votes, Surveys, Quizzes, and Raffle Draws, across Web, SMS, USSD, and Interactive Screen
              Display channels.
            </p>
            <p>
              This Policy applies to all Data Subjects located in Nigeria, regardless of the channel
              used to participate in a campaign.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-xl font-bold text-[#14171A] mb-3">
              2. Our Role as Data Controller / Data Processor
            </h2>
            <p className="mb-3">
              Under the NDPA, every organisation processing personal data acts either as a Data
              Controller (determines the purpose and means of processing) or a Data Processor
              (processes data on behalf of, and under the instruction of, a Controller).
            </p>
            <p className="mb-3">E-Redeem's role varies by activity:</p>
            <ul className="list-disc pl-5 space-y-2 mb-3">
              <li>
                <strong>As a Data Processor:</strong> When you enter a specific campaign, we
                typically process your Campaign Engagement Data, Contact Information, and related
                data on behalf of, and under the instructions of, the Sponsoring Brand running that
                campaign. In this role, the Sponsoring Brand is the Data Controller, and we act
                under a written Data Processing Agreement with that brand, as required under the
                NDPA.
              </li>
              <li>
                <strong>As a Data Controller:</strong> We act as the Data Controller for data
                processed for our own purposes — operating and securing the E-Redeem platform,
                running our Gen-AI Winning Code Iteration (WCI) fraud-prevention engine, and
                maintaining our own compliance records.
              </li>
            </ul>
            <p className="mb-3">
              Where E-Redeem is a Data Processor for a specific campaign, we remain bound by written
              agreements with each Sponsoring Brand requiring us to: process data only on documented
              instructions; implement appropriate technical and organisational security measures;
              assist the Controller in responding to Data Subject requests; notify the Controller
              promptly of any personal data breach; and not engage a sub-processor without the
              Controller's authorisation — consistent with NDPA requirements for Data Processing
              Agreements.
            </p>
            <div className="bg-[#F7F8F5] p-4 rounded-md border border-[#E4E7E9] text-xs mt-4">
              <strong>Note:</strong> This Controller/Processor allocation should be confirmed with
              legal counsel and reflected consistently in Data Processing Agreements with each
              Sponsoring Brand and fulfilment/telecom partner.
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-xl font-bold text-[#14171A] mb-3">3. Personal Data We Collect</h2>
            <p className="mb-4">
              Consistent with the NDPA's definition of personal data — any information relating to an
              identified or identifiable individual — we collect:
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-[#14171A]">3.1 Contact & Identity Information</h3>
                <ul className="list-disc pl-5">
                  <li>
                    Phone numbers (for SMS/USSD entries, identity verification, and airtime/data
                    reward fulfillment)
                  </li>
                  <li>Name and other identifying details you provide</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-[#14171A]">3.2 Demographic & Profile Data</h3>
                <p>
                  Age, gender, and stated preferences, where captured through Surveys, Polls, or KYC
                  forms.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-[#14171A]">3.3 Location Data</h3>
                <p>
                  Geographic location, where collected for Location-Based campaigns (e.g., live
                  events, on-ground activations).
                </p>
              </div>

              <div>
                <h3 className="font-bold text-[#14171A]">3.4 Transaction & Behavioural Data</h3>
                <p>
                  Purchase history, past transactions, and receipt data, where collected for
                  Transaction-Based campaigns.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-[#14171A]">3.5 Campaign Engagement Data</h3>
                <ul className="list-disc pl-5">
                  <li>Unique codes entered, texted, or scanned</li>
                  <li>Quiz answers, poll votes, match predictions</li>
                  <li>Entry timestamps and participation records</li>
                  <li>Reward fulfilment details (e.g., bank account details for cash rewards)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-[#14171A]">3.6 Sensitive Personal Data</h3>
                <p>
                  Where any of the above data reveals or constitutes sensitive personal data under the
                  NDPA, we process it only where we have your explicit consent or another lawful
                  ground recognised under the Act, and with additional safeguards appropriate to its
                  sensitivity.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-xl font-bold text-[#14171A] mb-3">4. How We Collect Your Data</h2>
            <p className="mb-3">We collect personal data through four channels:</p>
            <div className="overflow-x-auto border border-[#E4E7E9] rounded-md">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-[#F7F8F5] border-b border-[#E4E7E9]">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-[#14171A]">Channel</th>
                    <th className="px-4 py-3 font-semibold text-[#14171A]">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E4E7E9]">
                  <tr>
                    <td className="px-4 py-3 font-medium text-[#14171A]">Web</td>
                    <td className="px-4 py-3">
                      Browser-based entry, including QR code scans leading to a web form
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-[#14171A]">SMS</td>
                    <td className="px-4 py-3">Texting a short code to enter a campaign</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-[#14171A]">USSD</td>
                    <td className="px-4 py-3">Direct mobile dialing (e.g., *654*CODE#)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-[#14171A]">
                      Interactive Screen Displays
                    </td>
                    <td className="px-4 py-3">In-store or live-event activations</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-xl font-bold text-[#14171A] mb-3">5. Lawful Basis for Processing</h2>
            <p className="mb-3">
              In accordance with Section 27 of the NDPA, we process your personal data only where at
              least one lawful basis applies:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-3">
              <li>
                <strong>Consent</strong> — you have given clear, specific, informed, and freely
                given consent (e.g., for marketing/segmentation use, or where sensitive personal data
                is involved).
              </li>
              <li>
                <strong>Contractual necessity</strong> — processing is necessary to fulfil your entry
                into a campaign and deliver your reward.
              </li>
              <li>
                <strong>Legal obligation</strong> — processing is necessary to comply with a legal
                obligation we are subject to.
              </li>
              <li>
                <strong>Legitimate interest</strong> — processing is necessary for our (or a
                Sponsoring Brand's) legitimate interests, such as fraud prevention through our WCI
                engine, provided this does not override your fundamental rights and freedoms.
              </li>
            </ul>
            <p>
              Where consent is our lawful basis, you have the right to withdraw it at any time, as
              described in Section 9.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-xl font-bold text-[#14171A] mb-3">6. How We Use Your Personal Data</h2>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>
                <strong>Reward Fulfilment</strong> — validating your entry and dispatching airtime,
                mobile data, digital gift cards, cash, or physical gifts.
              </li>
              <li>
                <strong>Fraud Prevention & Validation</strong> — our Gen-AI WCI engine validates
                entries in real time to prevent stolen-code or duplicate-entry fraud.
              </li>
              <li>
                <strong>Analytics & Client Reporting</strong> — tracking entries, participants, and
                conversions to provide Sponsoring Brands with dashboards and demographic/geographic
                breakdowns.
              </li>
              <li>
                <strong>Marketing & Segmentation</strong> — building customer profiles for tailored
                future promotions, only with your consent.
              </li>
              <li>
                <strong>Platform Operation & Security</strong> — operating, maintaining, and securing
                the E-Redeem platform.
              </li>
            </ul>
            <h3 className="font-bold text-[#14171A] mb-2 mt-4">Automated Decision-Making</h3>
            <p>
              Under Section 37 of the NDPA, you have the right not to be subject to a decision based
              solely on automated processing (including our WCI winner-allocation logic) where that
              decision produces legal or similarly significant effects on you, except where necessary
              for entering or performing a contract with you, authorised by law, or based on your
              explicit consent. Where WCI winner allocation qualifies as such a decision, you may
              request human review, express your point of view, and contest the outcome by contacting
              us using the details in Section 12.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-xl font-bold text-[#14171A] mb-3">7. Data Sharing and Disclosure</h2>
            <p className="mb-3">
              We share personal data only as necessary, and — where required under the NDPA — under
              written agreements imposing data protection obligations on the recipient:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>
                <strong>Sponsoring Brands / Clients</strong> — campaign data is shared with the
                Sponsoring Brand running that campaign, for their marketing and analytics.
              </li>
              <li>
                <strong>Telecom Providers</strong> — phone numbers and related data are shared to
                route SMS/USSD entries and distribute airtime/data rewards.
              </li>
              <li>
                <strong>Fulfilment Partners</strong> — for processing cash rewards, scholarships, or
                physical gifts.
              </li>
              <li>
                <strong>Service Providers</strong> — vendors supporting our infrastructure, bound by
                data processing agreements.
              </li>
              <li>
                <strong>Regulatory & Legal Authorities</strong> — including the NDPC, where required
                by law or valid legal process.
              </li>
            </ul>
            <p className="mb-4">
              We do not sell your personal data to third parties for their own independent marketing
              purposes.
            </p>

            <h3 className="font-bold text-[#14171A] mb-2">Cross-Border Data Transfers</h3>
            <p>
              Where personal data is transferred outside Nigeria (for example, to a cloud hosting
              provider or an international fulfilment partner), we ensure — in accordance with Section
              50 of the NDPA — that the transfer is made only where: the destination country has been
              assessed by the NDPC as providing an adequate level of protection; appropriate safeguards
              are in place (such as NDPC-approved standard contractual clauses or binding corporate
              rules); or you have given explicit consent to the transfer after being informed of the
              possible risks.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-xl font-bold text-[#14171A] mb-3">8. Data Retention</h2>
            <p className="mb-3">
              We retain personal data only for as long as necessary to fulfil the purpose(s) for which
              it was collected, comply with our legal and regulatory obligations, and resolve disputes.
            </p>
            <div className="bg-[#F7F8F5] p-4 rounded-md border border-[#E4E7E9] text-xs">
              <strong>Note:</strong> Specific retention periods per data category — e.g., KYC
              records, financial/reward fulfilment records, campaign entry logs — should be defined
              here in line with NDPA recordkeeping obligations and any Sponsoring Brand agreements.
            </div>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-xl font-bold text-[#14171A] mb-3">
              9. Your Rights as a Data Subject
            </h2>
            <p className="mb-3">Under the NDPA, you have the right to:</p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>
                Be informed of how your personal data is collected, used, and shared (as set out in
                this Policy);
              </li>
              <li>Access the personal data we hold about you;</li>
              <li>Correction of inaccurate or incomplete data;</li>
              <li>Erasure/Deletion of your data, subject to legal and contractual limitations;</li>
              <li>
                Data portability — receive your data in a structured, commonly used, machine-readable
                format, and have it transmitted to another Data Controller where technically feasible;
              </li>
              <li>Object to or restrict certain processing, including for direct marketing;</li>
              <li>
                Withdraw consent at any time, without affecting the lawfulness of processing carried
                out before withdrawal;
              </li>
              <li>
                Not be subject to a decision based solely on automated processing that produces legal
                or similarly significant effects, as described in Section 6;
              </li>
              <li>
                Lodge a complaint with the Nigeria Data Protection Commission (NDPC) if you believe
                your rights under the NDPA have been violated.
              </li>
            </ul>
            <p>
              We will respond to verified requests without undue delay, and in any event within the
              timeframe required under the NDPA. To exercise these rights, contact us using the details
              in Section 12. Where your request concerns a Sponsoring Brand's use of your data (as
              Controller), we may direct you to that brand.
            </p>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-xl font-bold text-[#14171A] mb-3">10. Data Security</h2>
            <p>
              We implement technical and organisational measures appropriate to the risk, including the
              fraud-prevention safeguards built into our WCI engine, to protect personal data against
              unauthorised access, loss, misuse, alteration, or destruction, consistent with our
              obligations under the NDPA.
            </p>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className="text-xl font-bold text-[#14171A] mb-3">
              11. Data Breach Notification
            </h2>
            <p className="mb-3">In the event of a personal data breach, we will:</p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>
                Where we act as Data Processor, notify the affected Sponsoring Brand (as Controller)
                without undue delay upon becoming aware of the breach;
              </li>
              <li>
                Where we act as Data Controller, notify the NDPC without undue delay, and in any
                event within 72 hours of becoming aware of a breach likely to result in a risk to
                the rights and freedoms of Data Subjects, in accordance with Section 40 of the NDPA;
              </li>
              <li>
                Notify affected Data Subjects without undue delay where the breach is likely to result
                in a high risk to their rights and freedoms, including the nature of the breach, its
                likely consequences, and the measures taken or proposed to address it.
              </li>
            </ul>
            <p>
              We maintain an internal breach register recording all incidents, including those falling
              below the notification threshold.
            </p>
          </section>

          {/* Section 12 */}
          <section>
            <h2 className="text-xl font-bold text-[#14171A] mb-3">12. Contact Us</h2>
            <p className="mb-3">
              For questions, concerns, or to exercise your rights under this Policy or the NDPA,
              contact:
            </p>
            <ul className="space-y-1 mb-4 text-[#14171A] font-medium">
              <li>Email: abamgbala@excitepanacea.com</li>
              <li>Phone: +234 705 659 2645</li>
              <li>
                Website: <a href="https://www.e-redeem.com/" className="text-blue-600 hover:underline">www.e-redeem.com</a>
              </li>
            </ul>
            <div className="bg-[#F7F8F5] p-4 rounded-md border border-[#E4E7E9] text-xs mb-3">
              <strong>Note:</strong> If a Data Protection Officer (DPO) or Data Protection Compliance
              Officer (DPCO) has been appointed, in accordance with NDPA requirements for
              controllers/processors of major importance, their name and direct contact details
              should be added here.
            </div>
            <p>
              You also have the right to lodge a complaint directly with the Nigeria Data Protection
              Commission (NDPC).
            </p>
          </section>

          {/* Section 13 */}
          <section>
            <h2 className="text-xl font-bold text-[#14171A] mb-3">13. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy to reflect changes in our practices, technology, or
              legal requirements, including future guidance issued by the NDPC. We will post the
              updated Policy on our website with a revised "Last Updated" date.
            </p>
          </section>

          {/* Disclaimer */}
          <div className="mt-16 pt-8 border-t border-[#E4E7E9] text-xs text-[#8A94A6]">
            <strong>Legal Disclaimer:</strong> This document is a draft prepared for review based on
            the platform information provided and the Nigeria Data Protection Act, 2023. It has not
            been reviewed by a licensed attorney or a registered Data Protection Compliance
            Organisation (DPCO), and should not be relied upon as legal advice or as confirmation of
            NDPA compliance until reviewed by qualified legal counsel. In particular, the following
            should be confirmed with counsel before publication: (1) the Controller/Processor
            designation in Section 2 and corresponding Data Processing Agreements; (2) whether
            E-Redeem or Excite Panacea qualifies as a "data controller or processor of major
            importance" under NDPA thresholds, which would trigger mandatory DPO/DPCO appointment and
            annual compliance audit obligations; (3) exact data retention periods in Section 8; and (4)
            whether WCI-based winner allocation constitutes automated decision-making under Section 37
            requiring the safeguards described in Section 6.
          </div>
        </div>
      </div>
    </div>
  );
}
