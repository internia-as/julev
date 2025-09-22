const Footer = () => {
  return (
    <footer className="relative -bottom-16 px-4 w-full h-16 border-t flex items-center justify-between mt-auto">
      <p className="text-sm text-gray-500">
        Utviklet av{" "}
        <a href="https://internia.no/" target="_blank" className="underline">
          Internia AS
        </a>
      </p>
      <p className="text-sm text-gray-500">
        I samarbeid med{" "}
        <a href="https://divvun.no/" target="_blank" className="underline">
          Divvun - Sámi giellateknologiija
        </a>
      </p>
      <p className="text-sm text-gray-500">
        Med støtte fra{" "}
        <a href="https://sametinget.no/" target="_blank" className="underline">
          Sametinget
        </a>
      </p>
    </footer>
  );
};

export default Footer;
