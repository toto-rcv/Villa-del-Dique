import { parse } from '@babel/parser';
import fs from 'fs';
import path from 'path';

const files = [
  'src/App.jsx',
  'src/main.jsx',
  'src/pages/Home.jsx',
  'src/pages/NoticiasPage.jsx',
  'src/pages/NewsPage.jsx',
  'src/pages/TeamsPage.jsx',
  'src/pages/AboutPage.jsx',
  'src/pages/CalendarPage.jsx',
  'src/components/Navbar.jsx',
  'src/components/Footer.jsx',
  'src/components/Hero.jsx',
  'src/components/NewsSection.jsx',
  'src/components/NewsCard.jsx',
  'src/components/PlayerDrawer.jsx',
  'src/components/FootballField.jsx',
  'src/components/SubstitutesBench.jsx',
  'src/components/BochasTeam.jsx',
  'src/components/BochasSection.jsx',
  'src/components/FixturesSection.jsx',
  'src/components/FixtureCard.jsx',
  'src/components/SponsorsSection.jsx',
  'src/data/teamData.js',
  'src/data/newsData.js',
  'src/styles/GlobalStyle.js',
];

let hadErrors = 0;
for (const f of files) {
  const full = path.resolve(f);
  if (!fs.existsSync(full)) { console.log('MISSING  ', f); continue; }
  const code = fs.readFileSync(full, 'utf8');
  try {
    parse(code, {
      sourceType: 'module',
      plugins: ['jsx'],
    });
    console.log('OK       ', f);
  } catch (e) {
    hadErrors++;
    console.log('FAIL     ', f, '—', e.message);
  }
}
process.exit(hadErrors === 0 ? 0 : 1);
