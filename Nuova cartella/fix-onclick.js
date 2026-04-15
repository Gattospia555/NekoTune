import { readFileSync, writeFileSync } from 'fs';
let c = readFileSync('index.html', 'utf8');

// Remove the onclick that references auth-modal (which no longer exists)
c = c.replace(
  / onclick="document\.getElementById\('profile-dropdown'\)\.style\.display='none'; document\.getElementById\('auth-modal'\)\.style\.display='flex'"/g,
  ''
);

writeFileSync('index.html', c);
console.log('Fixed: removed old onclick from btn-dropdown-login');
