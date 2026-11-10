import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const live=readFileSync(new URL('../src/gemini-live.js',import.meta.url),'utf8');

test('attendance loads only the faculty-scoped roster and session-scoped log',()=>{
  assert.match(live,/buklod_classroom_roster_members_v2/);
  assert.match(live,/\.eq\('session_id',open\.id\)/);
  assert.match(live,/buklod_classroom_record_roster_attendance_v1/);
  assert.match(live,/p_roster_member_id:member\.roster_member_id/);
  assert.doesNotMatch(live,/from\('buklod_education_attendance_log'\)\.insert/);
});

test('attendance session close uses the guarded gradebook sync RPC',()=>{
  assert.match(live,/buklod_education_close_attendance_session_v2/);
  assert.match(live,/result\?\.closed!==true/);
  assert.match(live,/window\.confirm\('Close this attendance session/);
  assert.match(live,/\['PRESENT','LATE','ABSENT','EXCUSED'\]/);
});
