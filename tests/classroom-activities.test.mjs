import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const live=readFileSync(new URL('../src/gemini-live.js',import.meta.url),'utf8');

test('faculty assignments write through the classroom table policy and official category',()=>{
  assert.match(live,/window\.openAssignmentDrawer=/);
  assert.match(live,/grade_category_id:String\(f\.get\('category'\)\)/);
  assert.match(live,/submission_types:\['TEXT','LINK'\]/);
  assert.match(live,/auto_grade_requires_review:true/);
  assert.match(live,/status:f\.get\('publish'\)==='on'\?'PUBLISHED':'DRAFT'/);
  assert.match(live,/buklod_education_classroom_submissions/);
});
