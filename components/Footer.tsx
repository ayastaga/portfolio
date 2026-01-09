import Link from "next/link";

export default function Footer() {
  return (
    <div className="justify-around no-underline text-sm uppercase tracking-wider transition-opacity duration-300 hover:opacity-70 border-t w-full p-5 flex mt-auto">
      <Link href="https://vsco.co/ayastaga/gallery">Photography</Link>
      <Link href="/work">View my work</Link>
      <Link href="https://soundcloud.com/aeiwon">Music I make</Link>
    </div>
  );
}
