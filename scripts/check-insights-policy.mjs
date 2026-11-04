import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
const paths=['after-hours-enquiries-who-replies-first','hidden-cost-fragmented-operational-information'];
for (const slug of paths) {
 const html=readFileSync(`dist/insights/${slug}/index.html`,'utf8');
 assert(!/RevenueDesk|Revenue Desk|wa\.me\/27612980377|061[\s-]*298[\s-]*0377/.test(html),`${slug}: retired brand or personal contact`);
 assert(html.includes(slug),`${slug}: missing canonical identity`);
 console.log(`PASS ${slug}: retired brand/personal contact absent`);
}
const article=JSON.parse(readFileSync('public/content/generated/after-hours-enquiries-who-replies-first.json','utf8'));
assert.equal(article.datePublished,'2026-10-15');assert.equal(article.product,'RevUp');
const historic=readFileSync('src/components/InsightArticlePage.tsx','utf8');assert(historic.includes('21 September 2026'));
console.log('PASS original publication dates preserved and current product name retained');
