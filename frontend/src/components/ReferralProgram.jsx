import { Users, Gift, Share2, TrendingUp } from "lucide-react";
import { useState } from "react";

export default function ReferralProgram() {
  const [referralCode] = useState("BOLSATHI2025");
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="w-full py-20 lg:py-28 px-4 sm:px-6 lg:px-16 relative z-10 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-6">
            <Gift className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              💰 Invite Friends & Earn Rewards
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Referral{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Program
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Invite friends to learn with BolSaathi and both of you get rewards!
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-pink-500/10 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-8 lg:p-12 shadow-2xl">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start md:items-center">
            {/* Left Side - Benefits */}
            <div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                How It Works
              </h3>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                      Share Your Code
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Send your unique referral code to friends
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                      They Sign Up
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Your friends join using your referral code
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                      Both Get Rewards
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      You both receive 1 month free subscription!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Referral Code */}
            <div className="bg-white/90 dark:bg-[#0C0F1D]/90 backdrop-blur-xl border border-gray-200 dark:border-white/5 rounded-2xl p-8 shadow-xl">
              <div className="text-center mb-6">
                <Gift className="w-16 h-16 text-purple-500 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Your Referral Code
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Share this code with your friends
                </p>
              </div>

              {/* Code Display */}
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-4 sm:p-6 mb-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span className="text-lg sm:text-2xl font-bold text-white font-mono break-all text-center sm:text-left">
                    {referralCode}
                  </span>
                  <button
                    onClick={copyToClipboard}
                    className="bg-white text-purple-600 px-4 py-2.5 rounded-lg font-semibold hover:scale-105 active:scale-95 transition-transform min-w-[80px] touch-manipulation"
                  >
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>

              {/* Share Buttons */}
              <div className="space-y-3">
                <button className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
                  <Share2 className="w-5 h-5" />
                  Share on WhatsApp
                </button>
                <button className="w-full bg-gray-200 dark:bg-white/10 text-gray-900 dark:text-white py-3 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-white/20 transition-colors">
                  Copy Link
                </button>
              </div>

              {/* Stats */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-white/10 grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Users className="w-5 h-5 text-purple-500" />
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">0</span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Friends Referred</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Gift className="w-5 h-5 text-green-500" />
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">0</span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Free Months</p>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-12 pt-12 border-t border-purple-500/20">
            <div className="text-center p-6 bg-white/50 dark:bg-white/5 rounded-xl">
              <TrendingUp className="w-10 h-10 text-green-500 mx-auto mb-3" />
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                Unlimited Referrals
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Refer as many friends as you want
              </p>
            </div>
            <div className="text-center p-6 bg-white/50 dark:bg-white/5 rounded-xl">
              <Gift className="w-10 h-10 text-purple-500 mx-auto mb-3" />
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                Instant Rewards
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Get rewards immediately after signup
              </p>
            </div>
            <div className="text-center p-6 bg-white/50 dark:bg-white/5 rounded-xl">
              <Users className="w-10 h-10 text-blue-500 mx-auto mb-3" />
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                Help Friends Learn
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Share the gift of language learning
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

