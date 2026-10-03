// Downloads assignment markdown files (starting from Arrays) from
// kunal-kushwaha/DSA-Bootcamp-Java and converts them into data.js
// Only topics and questions (easy, medium, hard, patterns) - NO videos or YouTube links.
const fs = require('fs');
const path = require('path');

const REPO = 'https://github.com/kunal-kushwaha/DSA-Bootcamp-Java/blob/main/assignments/';
const BASE = 'https://raw.githubusercontent.com/kunal-kushwaha/DSA-Bootcamp-Java/main/assignments/';
const FILES = [
  ['05-arrays.md', 'Arrays', 'arrays'],
  ['06-searching.md', 'Searching', 'searching'],
  ['07-sorting.md', 'Sorting', 'sorting'],
  ['08-strings.md', 'Strings', 'strings'],
  ['09-patterns.md', 'Patterns', 'patterns'],
  ['10-recursion.md', 'Recursion', 'recursion'],
  ['11-bitwise.md', 'Bitwise', 'bitwise'],
  ['12-math.md', 'Maths', 'maths'],
  ['13-complexities.md', 'Complexities', 'complexities'],
  ['14-oop.md', 'OOP', 'oop'],
  ['15-linkedlist.md', 'Linked List', 'linked-list'],
  ['16-stack-queue.md', 'Stacks & Queues', 'stacks-queues'],
  ['17-trees.md', 'Trees', 'trees'],
  ['18-heaps.md', 'Heaps', 'heaps'],
];

const DIFFS = ['easy', 'medium', 'hard'];
const RESOURCE_SECTIONS = /important topics/i;
const TIP_SECTIONS = /additionally/i;
const MAIN_SECTIONS = /^(problems|questions)$/i;

const rawDir = path.join(__dirname, 'raw');
fs.mkdirSync(rawDir, { recursive: true });

function platformOf(url) {
  if (!url) return 'Custom';
  const host = new URL(url).hostname.replace(/^www\./, '');
  const map = {
    'leetcode.com': 'LeetCode',
    'geeksforgeeks.org': 'GFG',
    'practice.geeksforgeeks.org': 'GFG',
    'codechef.com': 'CodeChef',
    'hackerrank.com': 'HackerRank',
    'spoj.com': 'SPOJ',
    'javatpoint.com': 'Javatpoint',
    'tutorialspoint.com': 'Tutorialspoint',
  };
  return map[host] || 'Other';
}

const PLATFORM_TAGS = /^(leetcode|gfg|codechef|hackerrank|javatpoint|tutorialspoint|spoj)$/i;
const clean = (s) => s.replace(/<sup>(.*?)<\/sup>/g, '$1').replace(/<[^>]+>/g, '').replace(/\*/g, '').replace(/\s+/g, ' ').trim();

function parsePatterns(md) {
  const block = md.split('```')[1] || '';
  const lines = block.split(/\r?\n/);
  const patterns = [];
  let cur = null;
  for (const line of lines) {
    const m = line.match(/^(\d+)\.(.*)$/);
    if (m) {
      cur = { n: +m[1], lines: [m[2]] };
      patterns.push(cur);
    } else if (cur) cur.lines.push(line);
  }
  return patterns.map((p) => {
    const prefix = String(p.n).length + 1;
    const ls = p.lines.map((l, i) => (i === 0 ? ' '.repeat(prefix) + l : l));
    while (ls.length && !ls[ls.length - 1].trim()) ls.pop();
    while (ls.length && !ls[0].trim()) ls.shift();
    const indent = Math.min(...ls.filter((l) => l.trim()).map((l) => l.match(/^ */)[0].length));
    return { n: p.n, art: ls.map((l) => l.slice(indent).replace(/\s+$/, '')).join('\n') };
  });
}

function parse(md, file, title, id) {
  const topic = {
    id,
    title,
    file,
    source: REPO + file,
    questions: [],
    resources: [],
    tips: [],
    patterns: [],
    images: [],
  };

  if (id === 'patterns') {
    topic.patterns = parsePatterns(md);
    topic.tips.push({ text: 'Print these patterns using loops.' });
    return topic;
  }

  // HTML based files (complexities)
  for (const h of md.matchAll(/<h1>(.*?)<\/h1>([\s\S]*?)(?=<h1>|$)/g)) {
    const imgs = [...h[2].matchAll(/<img src="(.*?)"/g)].map((m) => m[1].replace('/blob/', '/raw/'));
    topic.images.push({ title: clean(h[1]).replace(/:$/, ''), srcs: imgs });
  }

  const lines = md.split(/\r?\n/);
  let difficulty = null;
  let section = null;
  let inCode = false;
  let code = [];
  const seen = new Set();

  for (const line of lines) {
    if (/^\s*```/.test(line)) {
      if (inCode) {
        const last = topic.questions[topic.questions.length - 1];
        if (last) last.code = code.join('\n').replace(/^\s+|\s+$/g, '');
        code = [];
      }
      inCode = !inCode;
      continue;
    }
    if (inCode) { code.push(line); continue; }

    // Completely ignore any video line, video header or youtube url
    if (/video/i.test(line) || /youtu\.?be/i.test(line)) {
      continue;
    }

    const h = line.match(/^#{1,6}\s+(.*)$/);
    if (h) {
      const text = clean(h[1]).replace(/:$/, '');
      if (/^videos?$/i.test(text)) {
        section = 'skip_videos';
        difficulty = null;
        continue;
      }
      const d = DIFFS.find((x) => text.toLowerCase() === x);
      if (d) difficulty = d;
      else if (/submit the following/i.test(text)) { /* ignore */ }
      else { section = MAIN_SECTIONS.test(text) ? null : text; difficulty = null; }
      continue;
    }

    if (section === 'skip_videos') continue;

    const item = line.match(/^\s*(?:\d+\.|[-*])\s+(.*)$/);
    if (!item) continue;
    const body = item[1].trim();
    const link = body.match(/\[(.+?)\]\((.+?)\)/);
    const tags = [...body.matchAll(/`([^`]+)`/g)].map((m) => m[1].trim());

    if (link && /youtu\.?be/i.test(link[2])) continue;

    if (section && TIP_SECTIONS.test(section) || (!difficulty && !section && link && /show problem tags/i.test(body))) {
      topic.tips.push({ text: clean(body.replace(/\[(.+?)\]\((.+?)\)/, '$1').replace(/`[^`]+`/g, '')), url: link && link[2] });
      continue;
    }
    if (section && RESOURCE_SECTIONS.test(section)) {
      if (link) topic.resources.push({ name: clean(link[1]), url: link[2], platform: platformOf(link[2]) });
      continue;
    }

    const name = clean((link ? link[1] : body.replace(/`[^`]+`/g, '')).replace(/\.$/, '').replace(/:$/, ''));
    const url = link ? link[2].trim() : null;
    const key = (difficulty || section) + '|' + (url || name);
    if (seen.has(key)) continue;
    seen.add(key);

    topic.questions.push({
      name,
      url,
      difficulty: difficulty || 'other',
      section: difficulty ? null : section,
      platform: platformOf(url),
      companies: tags.filter((t) => !PLATFORM_TAGS.test(t)),
    });
  }

  topic.questions.forEach((q, i) => { q.id = `${id}-${i + 1}`; });
  return topic;
}

(async () => {
  const topics = [];
  for (const [file, title, id] of FILES) {
    const res = await fetch(BASE + file);
    const md = await res.text();
    fs.writeFileSync(path.join(rawDir, file), md);
    const t = parse(md, file, title, id);
    const c = (d) => t.questions.filter((q) => q.difficulty === d).length;
    console.log(`${title.padEnd(16)} easy:${c('easy')} medium:${c('medium')} hard:${c('hard')} other:${c('other')} patterns:${t.patterns.length}`);
    topics.push(t);
  }
  const out = path.join(__dirname, '..', 'data.js');
  fs.writeFileSync(out, '// Auto-generated by scripts/extract.js from kunal-kushwaha/DSA-Bootcamp-Java/assignments\n// Strictly topics & questions (no videos)\nwindow.TOPICS = ' + JSON.stringify(topics, null, 2) + ';\n');
  console.log('Wrote', out);
})();
