const Footer = () => {
  return (
    <footer className="relative -bottom-16 w-full h-16 border-t flex items-center justify-center mt-auto">
      <p className="text-sm text-gray-500">
        © {new Date().getFullYear()} Julev. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
