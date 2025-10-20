import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = async ({ children }: LayoutProps) => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session?.user) redirect("/");

  const dummyStars = Array.from({ length: 5 }, (_, i) => i < 4);
  return (
    <main className="auth-layout">
      <section className="auth-left-section scrollbar-hide-default">
        <Link className="auth-logo" href="/" aria-label="Go to homepage">
          <Image
            src={"/assets/images/logo.png"}
            alt="Signalist Logo"
            width={140}
            height={32}
            className="h-8 w-auto"
          />
        </Link>
        <div className="pb-6 lg:pb-8 flex-1">{children}</div>
      </section>
      <section className="auth-right-section">
        <div className="z-10 relative lg:mt-4  lg:mb-16">
          <blockquote className="auth-quote">
            Signalist turned my watchlist into a winning list. The alerts are
            spot-on, and I feel more confident making moves in the market
          </blockquote>
          <div className="flex items-center justify-between">
            <div>
              <cite className="auth-testimonial-author">John D.</cite>
              <p className="max-md:text-xs text-gray-500">Retail investor</p>
            </div>

            <div
              role="img"
              aria-label="Rated 4 of 5"
              className="flex items-center gap-0.5"
            >
              {dummyStars.map((filled, index) => (
                <Image
                  src={"/assets/icons/star.svg"}
                  alt=""
                  aria-hidden="true"
                  width={20}
                  height={20}
                  className="w-5 h-5"
                  key={index}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex-1 relative">
          <Image
            src={"/assets/images/dashboard.png"}
            width={1440}
            height={1150}
            className="auth-dashboard-preview absolute inset-0"
            alt="Dashboard preview"
          />
        </div>
      </section>
    </main>
  );
};

export default Layout;
