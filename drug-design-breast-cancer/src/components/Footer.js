const Footer = () => {
  return (
    <footer className="c-space pt-7 pb-3 border-t border-black-300 flex justify-between items-center flex-wrap gap-5">
      <div className="text-white-500 flex gap-2">
        <a href="/terms" className="hover:underline">Terms & Conditions</a>
        <span>|</span>
        <a href="/privacy" className="hover:underline">Privacy Policy</a>
      </div>


      <p className="text-white-500">© 2025 ENSI. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
