import { FileTextIcon } from 'lucide-react';
import Link from 'next/link';
const footerLinks = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#' },
      { label: 'Roadmap', href: '#' },
      { label: 'Changelog', href: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '#' },
      { label: 'Guides', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'API', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Contact', href: '#' },
      { label: 'Privacy', href: '#' },
      { label: 'Terms', href: '#' },
    ],
  },
];

export default function HomePageFooter() {
  return (
    <footer className='border-t border-border/50 px-6 py-20'>
      <div className='mb-16 grid gap-12 md:grid-cols-12'>
        <div className='md:col-span-5'>
          <div className='mb-6 flex items-center gap-3'>
            <FileTextIcon className='size-7 text-foreground' />
            <span className='text-3xl font-bold text-foreground'>NotesApp</span>
          </div>
          <p className='mb-8 max-w-sm text-lg leading-relaxed text-muted-foreground'>
            Your personal workspace for capturing ideas and staying organized.
            Simple, fast, and beautiful.
          </p>
        </div>

        <div className='grid grid-cols-2 gap-8 md:col-span-7 md:grid-cols-3'>
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className='mb-5 text-sm font-semibold text-foreground uppercase'>
                {group.title}
              </h3>
              <ul className='space-y-3'>
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className='text-base text-muted-foreground transition-colors hover:text-foreground'
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className='border-t border-border/50 pt-8'>
        <div className='flex flex-col items-center justify-between gap-6 md:flex-row'>
          <p className='text-base text-muted-foreground'>
            © 2026 NotesApp. Crafted with care for productivity.
          </p>
        </div>
      </div>
    </footer>
  );
}
