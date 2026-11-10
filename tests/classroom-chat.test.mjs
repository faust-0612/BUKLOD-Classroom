import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const live=readFileSync(new URL('../src/gemini-live.js',import.meta.url),'utf8');

test('class messaging uses the seeded general thread and authenticated sender identity',()=>{
  assert.match(live,/buklod_education_classroom_threads/);
  assert.match(live,/eq\('thread_type','GENERAL'\)/);
  assert.match(live,/buklod_education_classroom_messages/);
  assert.match(live,/sender_user_id:activeUser\.id/);
  assert.match(live,/current\(\)\.context\?\.allow_student_chat===true/);
  assert.match(live,/deleted_at/);
  assert.match(live,/await fetchCurrent\(id,tab\);originalOpen\(id,group,tab\);\s*window\.bindClassMessageForm\(\)/);
  assert.match(live,/await fetchCurrent\(app\.activeClassId,key\);originalGroup\(group,key\);\s*window\.bindClassMessageForm\(\)/);
  assert.match(live,/await fetchCurrent\(app\.activeClassId,key\);originalSubtab\(key\);\s*window\.bindClassMessageForm\(\)/);
});
