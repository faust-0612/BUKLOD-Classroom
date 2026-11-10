import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const live=readFileSync(new URL('../src/gemini-live.js',import.meta.url),'utf8');

test('Supabase client uses deployment configuration and fails closed when absent',()=>{
  assert.match(live,/import\.meta\.env\.VITE_SUPABASE_URL/);
  assert.match(live,/import\.meta\.env\.VITE_SUPABASE_PUBLISHABLE_KEY/);
  assert.match(live,/if\(!db\)displayAuth\(\)/);
  assert.doesNotMatch(live,/sb_publishable_[A-Za-z0-9_-]{20,}/);
  assert.doesNotMatch(live,/https:\/\/[a-z0-9]+\.supabase\.co/);
});
