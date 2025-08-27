const Footer = () => {
  return (
    <div className="bg-slate-800 text-white">
      {/* Footer Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 p-10 mb-6">
        {/* Categories */}
        <div>
          <ul className="space-y-2">
            <li className="text-lg font-bold">Categories</li>
            <li>Consultant</li>
            <li>Doctor</li>
            <li>Astrology</li>
            <li>Lawyer</li>
            <li>Psychologist</li>
            <li>Study Abroad</li>
            <li>Tech</li>
            <li>Mental Health</li>
            <li>Career Guidance</li>
          </ul>
        </div>

        {/* About */}
        <div>
          <ul className="space-y-2">
            <li className="text-lg font-bold">About</li>
            <li>Press & News</li>
            <li>Partnerships</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Intellectual Property Rights</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <ul className="space-y-2">
            <li className="text-lg font-bold">Support</li>
            <li>Help & Support</li>
            <li>Trust & Safety</li>
            <li>Selling on ExpertConnect</li>
            <li>Buying on ExpertConnect</li>
          </ul>
        </div>

        {/* Community */}
        <div>
          <ul className="space-y-2">
            <li className="text-lg font-bold">Community</li>
            <li>Customer</li>
            <li>Success Story</li>
            <li>Community Hub</li>
            <li>Forums</li>
            <li>Events</li>
            <li>Blog</li>
            <li>Become a Seller</li>
            <li>Invite a Friend</li>
            <li>Community Standard</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-600 text-center py-4 text-sm">
        <h1>© ExpertConnect</h1>
        <h1>Developed By Lakshya</h1>
      </div>
    </div>
  );
};

export default Footer;
