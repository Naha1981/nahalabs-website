import React from 'react';
import { FAQ_ITEMS, faqJsonLd } from '../data/faq';

/**
 * Answer-first FAQ. Native <details> keeps every answer in the DOM for crawlers
 * and assistive tech, needs no JavaScript, and pairs with the FAQPage JSON-LD.
 */
export const HomeFaqSection: React.FC = () => {
  // "<" is escaped so the payload can never terminate the script element.
  const jsonLd = JSON.stringify(faqJsonLd()).replace(/</g, '\\u003c');

  return (
    <section id="faq" data-tone="light" className="section bg-canvas text-fg">
      <div className="wrap grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-10">
        <h2 className="lg:col-span-4 font-serif text-h1 font-medium">Common questions.</h2>

        <div className="lg:col-span-8 border-t border-line-strong">
          {FAQ_ITEMS.map((item) => (
            <details key={item.question} className="faq-item border-b border-line group">
              <summary className="flex cursor-pointer items-start justify-between gap-6 py-6 list-none [&::-webkit-details-marker]:hidden">
                <h3 className="font-serif text-h3 font-medium">{item.question}</h3>
                <span className="faq-mark mt-1 shrink-0 text-fg-3" aria-hidden="true" />
              </summary>
              <p className="pb-7 pr-10 text-body text-fg-2 measure">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
    </section>
  );
};
