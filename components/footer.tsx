import Link from 'next/link'
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

const links = [
    {
        title: <FaLinkedin className="w-5 h-5" />,
        href: 'https://www.linkedin.com/in/nguyen-pham-tran-10a653386/',
    },
    {
        title: <FaGithub className="w-5 h-5" />,
        href: 'https://github.com/PersianBlobFish',
    }
]

export default function Footer() {
    return (
        <footer className="border-t border-border py-10">
            <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-6 px-4 sm:px-6">
                <div className="flex gap-5">
                    {links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.href}
                            className="text-muted-foreground transition-colors duration-150 hover:text-foreground">
                            <span>{link.title}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </footer>
    )
}
