import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/terms-of-service")({
  component: TermsOfService,
});

function TermsOfService() {
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
          E-Redeem Terms of Service
        </h1>
        <p className="text-sm text-[#5B6470] mb-12">Last Updated: September 13, 2026</p>

        <div className="space-y-10 text-[#5B6470] leading-relaxed text-sm sm:text-base">
          {/* Section 1 */}
          <section>
            <h2 className="text-xl font-bold text-[#14171A] mb-3">1. Acceptance of Terms</h2>
            <p className="mb-3">
              By accessing or using the E-Redeem platform via Web, SMS, USSD, or Interactive Screen
              Displays, you agree to be bound by these Terms of Service ("Terms"). These Terms
              constitute a legally binding agreement between you ("Participant," "you") and Excite
              Panacea ("Excite Panacea," "we," "us," or "our"), the operator of the E-Redeem platform.
            </p>
            <p>
              If you do not agree to these Terms, please do not participate in any campaigns or use
              the platform. We reserve the right to update these Terms at any time without prior
              notice, and your continued use of the platform constitutes your acceptance of the
              revised Terms.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-xl font-bold text-[#14171A] mb-3">2. Description of the Platform</h2>
            <p className="mb-3">
              E-Redeem is a Gen-AI powered consumer engagement and loyalty platform. We provide the
              technology infrastructure that enables third-party consumer brands ("Sponsoring Brands")
              to host marketing campaigns, including Short Code to Win, Polls, Votes, Surveys,
              Quizzes, and Raffle Draws.
            </p>
            <p>
              <strong>Important:</strong> E-Redeem acts as a technology intermediary. While we process
              entries and fulfill certain digital rewards (like airtime or data), the specific
              promotions, products, and physical prizes are offered by the Sponsoring Brands, not by
              Excite Panacea.
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-xl font-bold text-[#14171A] mb-3">3. Campaign Participation</h2>
            <ul className="list-disc pl-5 space-y-2 mb-3">
              <li>
                <strong>Eligibility:</strong> To participate in any campaign hosted on E-Redeem, you
                must meet the eligibility criteria set by the Sponsoring Brand (e.g., age restrictions,
                residency requirements).
              </li>
              <li>
                <strong>Specific Campaign Rules:</strong> Every campaign is governed by its own specific
                Terms & Conditions set by the Sponsoring Brand. In the event of a conflict between
                these general Platform Terms and a campaign's specific rules, the campaign's rules
                shall prevail regarding the mechanics and prizes of that specific promotion.
              </li>
              <li>
                <strong>Accurate Information:</strong> You agree to provide accurate and current
                information (e.g., phone numbers, bank details for cash rewards) when participating.
                We are not responsible for rewards lost due to incorrect details provided by you.
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-xl font-bold text-[#14171A] mb-3">4. Anti-Fraud & Winning Code Iteration (WCI)</h2>
            <p className="mb-3">
              E-Redeem uses a proprietary Gen-AI Winning Code Iteration (WCI) engine to dynamically
              validate entries and assign winners based on entry intervals. No physical code is
              pre-marked as a winning code.
            </p>
            <p className="mb-3">By using the platform, you agree that:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>You will not use bots, scripts, or automated systems to submit entries.</li>
              <li>You will not attempt to guess, brute-force, or forge entry codes.</li>
              <li>
                We reserve the right to instantly disqualify any participant, withhold rewards, and
                block phone numbers if our system detects fraudulent behavior, suspicious patterns, or
                violations of these Terms.
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-xl font-bold text-[#14171A] mb-3">5. Rewards and Fulfilment</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Digital Rewards:</strong> Airtime and mobile data rewards are subject to the
                availability and stability of third-party telecommunication networks. We are not
                liable for delays in crediting digital rewards caused by network downtime.
              </li>
              <li>
                <strong>Physical & Cash Prizes:</strong> For high-value rewards, you may be required
                to complete a KYC (Know Your Customer) verification process. The Sponsoring Brand is
                ultimately responsible for the provision of grand prizes, physical goods, and
                scholarships, unless explicitly stated otherwise.
              </li>
              <li>
                <strong>Non-Transferable:</strong> Rewards are non-transferable, non-exchangeable, and
                cannot be redeemed for alternative compensation unless expressly permitted by the
                campaign rules.
              </li>
            </ul>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-xl font-bold text-[#14171A] mb-3">6. Intellectual Property</h2>
            <p className="mb-3">
              All intellectual property rights in the E-Redeem platform, including the WCI engine,
              software, design, text, and graphics, are owned by Excite Panacea. You are granted a
              limited, non-exclusive, non-transferable license strictly to participate in the
              campaigns.
            </p>
            <p>
              Trademarks, logos, and brand names of Sponsoring Brands (e.g., Ribena, Guinness) are
              the property of their respective owners.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-xl font-bold text-[#14171A] mb-3">7. Limitation of Liability</h2>
            <p className="mb-3">
              To the maximum extent permitted by applicable law, Excite Panacea shall not be liable
              for any indirect, incidental, special, or consequential damages arising out of your use
              of the E-Redeem platform.
            </p>
            <p>We do not guarantee that the platform will be error-free, uninterrupted, or perfectly secure. Specifically, we are not liable for:</p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>Network, server, or telecommunication failures that prevent entry submission.</li>
              <li>The failure of a Sponsoring Brand to deliver a promised grand prize or physical reward.</li>
              <li>Loss of data or rewards due to user error.</li>
            </ul>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-xl font-bold text-[#14171A] mb-3">8. Privacy and Data Protection</h2>
            <p>
              Your privacy is important to us. Our collection, use, and sharing of your personal data
              are governed by the Nigeria Data Protection Act (NDPA) and outlined in our{" "}
              <Link to="/privacy-policy" className="text-blue-600 hover:underline">
                Privacy Policy
              </Link>. By using the platform, you consent to the data practices described therein.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-xl font-bold text-[#14171A] mb-3">9. Governing Law and Dispute Resolution</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the Federal
              Republic of Nigeria. Any disputes arising out of or in connection with these Terms shall
              be subject to the exclusive jurisdiction of the courts of Nigeria.
            </p>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-xl font-bold text-[#14171A] mb-3">10. Contact Information</h2>
            <p className="mb-3">
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <ul className="space-y-1 mb-4 text-[#14171A] font-medium">
              <li>Email: abamgbala@excitepanacea.com</li>
              <li>Phone: +234 705 659 2645</li>
              <li>
                Website: <a href="https://www.e-redeem.com/" className="text-blue-600 hover:underline">www.e-redeem.com</a>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
