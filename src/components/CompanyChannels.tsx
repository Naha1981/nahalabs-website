import React from 'react';
export const COMPANY_CHANNELS = [
 {name:'YouTube',url:'https://www.youtube.com/@Nahalabs'},
 {name:'LinkedIn',url:'https://www.linkedin.com/company/nahalabs/?viewAsMember=true'},
 {name:'Google Business Profile',url:'https://www.google.com/maps/place/NahaLabs/data=!4m2!3m1!1s0x0:0xfaa414c96c0a30fd?sa=X&ved=1t:2428&hl=en-GB&ictx=111'}
];
export function CompanyChannels(){return <nav aria-label="NahaLabs channels" className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-[#315e57]">{COMPANY_CHANNELS.slice(0,2).map(c=><a key={c.name} href={c.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center underline underline-offset-4">{c.name} ↗</a>)}<span className="inline-flex min-h-11 items-center text-[#686868]">Facebook · pending</span><a href={COMPANY_CHANNELS[2].url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center underline underline-offset-4">Google Business Profile ↗</a></nav>}
