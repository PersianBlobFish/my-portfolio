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
        <footer className="border-b bg-white py-12 dark:bg-transparent">
            <div className="mx-auto max-w-5xl px-6">
                <div className="flex flex-wrap justify-between gap-6">
                    <span className="text-muted-foreground order-last block text-center text-sm md:order-first">© {2026} Jesus, All rights reserved</span>
                    <div className="order-first flex flex-wrap justify-center gap-6 text-sm md:order-last">
                        {links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.href}
                                className="text-muted-foreground hover:text-primary block duration-150">
                                <span>{link.title}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}