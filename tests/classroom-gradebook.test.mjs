import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const live=readFileSync(new URL('../src/gemini-live.js',import.meta.url),'utf8');

test('faculty gradebook uses roster and category scoped performance grading',()=>{
  assert.match(live,/buklod_classroom_gradebook_roster_v1/);
  assert.match(live,/buklod_classroom_record_roster_performance_v1/);
  assert.match(live,/p_classroom_id:app\.activeClassId,p_roster_member_id:String\(f\.get\('roster_member_id'\)\)/);
  assert.match(live,/p_grade_category_id:String\(f\.get\('category'\)\)/);
  assert.match(live,/if\(!isoId\(id\)\)throw Error\('The server did not confirm the official score\.'\)/);
  assert.match(live,/Release this item to the student/);
});
