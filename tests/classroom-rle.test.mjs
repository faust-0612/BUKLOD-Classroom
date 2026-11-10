import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const live=readFileSync(new URL('../src/gemini-live.js',import.meta.url),'utf8');

test('RLE rotations and hour entries use the isolated Classroom records',()=>{
  assert.match(live,/buklod_education_rle_rotations/);
  assert.match(live,/buklod_education_rle_hours/);
  assert.match(live,/verification_status:'PENDING'/);
  assert.match(live,/Entries stay PENDING until verified/);
  assert.match(live,/filter\(m=>m\.roster_status==='ACTIVE'&&isoId\(m\.student_user_id\)\)/);
});
