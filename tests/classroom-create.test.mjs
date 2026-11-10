import test from 'node:test';
import assert from 'node:assert/strict';
import { buildClassroomRecord } from '../src/classroom-create.js';

const faculty = '14100ed1-7f25-4551-9627-09d280498241';

test('classroom creation payload is bound to the signed-in faculty and trims optional fields', () => {
  assert.deepEqual(buildClassroomRecord({
    name: '  General Biology  ', subject_code: ' BIO 101 ', section_name: ' 1A ',
    school_year: '2026–2027', term: 'First Semester', description: ' Intro course '
  }, faculty), {
    faculty_user_id: faculty, name: 'General Biology', subject_code: 'BIO 101',
    section_name: '1A', school_year: '2026–2027', term: 'First Semester',
    description: 'Intro course'
  });
});

test('classroom creation rejects a missing faculty identity and invalid names', () => {
  assert.throws(() => buildClassroomRecord({ name: 'Valid Class' }, null), /signed-in BUKLOD faculty/);
  assert.throws(() => buildClassroomRecord({ name: ' ' }, faculty), /Class name/);
});

test('classroom creation bounds every optional field before sending it to Supabase', () => {
  assert.throws(() => buildClassroomRecord({ name: 'Valid Class', description: 'x'.repeat(1001) }, faculty), /Description is too long/);
});
