import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {buildFacultyGradebookCsv,csvTextCell,facultyGradebookFilename} from '../src/gradebook-export.js';

const live=readFileSync(new URL('../src/gemini-live.js',import.meta.url),'utf8');

test('CSV contains only approved faculty gradebook columns, retains zero and escapes CSV controls',()=>{
  const csv=buildFacultyGradebookCsv([{
    official_name:'Santos, "Ana"\n2026',official_student_no:'00034',final_status:'DRAFT',
    transmuted_grade:0,grade_remarks:'INC'
  }]);
  assert.ok(csv.startsWith('\uFEFF'));
  assert.ok(csv.includes('"Santos, ""Ana""\n2026"'));
  assert.ok(csv.includes('"00034","DRAFT","0","INC"'));
  assert.equal(csv.split('\r\n').length,3);
  assert.ok(!csv.includes('password'));
});
test('CSV formula injection is neutralized for student-controlled fields',()=>{
  for(const value of ['=2+2','+cmd','-HYPERLINK("https://invalid")','@SUM(A1)','  \t=1+1']){
    assert.ok(csvTextCell(value).startsWith("\"'"),value);
  }
  assert.equal(csvTextCell('Score + 10'),'"Score + 10"');
});
test('Only official fields are exported; malformed and overly large result sets fail closed',()=>{
  assert.ok(!buildFacultyGradebookCsv([{official_name:'Test',private_email:'secret@example.invalid'}])
    .includes('secret@example.invalid'));
  assert.throws(()=>buildFacultyGradebookCsv({}),/rows are required/);
  assert.throws(()=>buildFacultyGradebookCsv([null]),/Invalid official/);
  assert.throws(()=>buildFacultyGradebookCsv(Array.from({length:5001},()=>({}))),/Too many/);
});
test('Export filename is bounded and contains no path traversal',()=>{
  const file=facultyGradebookFilename('../Nursing - 3B/First Semester','14100ed1-7f25-4551-9627-09d280498241');
  assert.equal(file,'BUKLOD-Gradebook-Nursing-3B-First-Semester-14100ed1.csv');
  assert.ok(!file.includes('../'));
});
test('Faculty UI checks authorized gradebook context and keeps export out of disabled actions',()=>{
  assert.match(live,/window\.exportGradebookCSV=\(\)=>\{/);
  assert.match(live,/!isFaculty\(\) \|\| app\.activeSubtab!=='grades' \|\| current\(\)\.loadedTab!=='grades'/);
  const disabled=live.slice(live.indexOf('const unsupported='),live.indexOf('for(const name of unsupported)'));
  assert.ok(!disabled.includes('exportGradebookCSV'));
});
test('Role switcher cannot enumerate another role classes and RLE student reads are scoped server-side',()=>{
  assert.match(live,/window\.openClassSwitcherDrawer=\(\)=>\{\s*const items=visibleClasses\(\);/);
  assert.match(live,/if\(!isFaculty\(\)\)hoursQuery=hoursQuery\.eq\('student_user_id',activeUser\.id\)/);
});
test('Delayed writes do not refresh the wrong class or role',()=>{
  assert.match(live,/const sameContext=\(\)=>activeUser\?\.id===initialUser/);
  assert.match(live,/if\(!sameContext\(\) \|\| app\.activeSubtab!==initialTab\)return/);
  assert.match(live,/if\(writeBusy\)return show\('An official save is already in progress/);
});
