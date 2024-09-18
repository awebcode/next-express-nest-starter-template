import Link from 'next/link'
import React from 'react'

const Footer = () => {
    const links = [
        { name: 'Home', link: '/' },
        { name: 'About', link: '/about' },
        { name: 'Contact', link: '/contact' },
        { name: 'Privacy', link: '/privacy' },
        { name: 'Terms', link: '/terms' },
        { name: 'Sitemap', link: '/sitemap' },
        { name: 'Home', link: '/' },
        { name: 'About', link: '/about' },
        { name: 'Contact', link: '/contact' },
        { name: 'Privacy', link: '/privacy' },
        { name: 'Terms', link: '/terms' },
        { name: 'Sitemap', link: '/sitemap' },
    ]
    return (
        <div className='sticky bottom-0 py-10 md:py-12 px-8 border-t border-primary backdrop-blur-lg rounded-t-lg'>

            <div className="container p-2">
                <div className="flex flex-col md:flex-row justify-around items-center gap-4">
                    <div>
                        <h1 className='text-2xl md:text-5xl font-bold text-gray-900'>Starter</h1>
                    </div>
                   


                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-20 gap-y-6">
                        {links.map((link, i) => (
                            <div key={i}>
                                <Link href={link.link}>
                                    <span className='transition-all hover:text-primary'>{link.name}</span>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
                <p className='text-center pt-6 text-lg text-muted-foreground'>&copy; 2024 Starter</p>
            </div>
        </div>
    )
}

export default Footer
