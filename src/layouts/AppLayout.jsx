import { Link, Outlet, useLocation } from "react-router-dom";

const links = [
  {
    href: "/",
    text: "Clientes",
  },
  {
    href: "/clients/create",
    text: "Nuevos clientes",
  },
];

export const AppLayout = () => {
  const pathName = useLocation().pathname;

  return (
    <div>
      <div className="md:flex md:min-h-screen">
        <div className="md:w-1/4 bg-blue-900 px-5 py-10">
          <h2 className="text-4xl font-black text-center text-white">CRM - Clientes</h2>

          <nav className="mt-10 text-white">
            {links.map((link) => (
              <Link
                key={link.href}
                className={`text-2xl block mt-2 hover:text-blue-300 ${
                  link.href === pathName ? "text-blue-400" : ""
                }`}
                to={link.href}
              >
                {link.text}
              </Link>
            ))}
          </nav>
        </div>

        <main className="md:w-3/4 p-10 md:h-screen overflow-scroll">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
