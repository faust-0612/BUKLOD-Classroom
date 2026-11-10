// Authorized faculty gradebook export. This module has no database or browser side effects.
export const GRADEBOOK_EXPORT_COLUMNS=Object.freeze([
  'Official student','Official student ID','Final status','Transmuted grade','Remarks'
]);
const MAX_EXPORT_ROWS=5000;

// A quoted CSV field can still be interpreted as a spreadsheet formula. Force
// dangerous prefixes to plain text before doubling embedded quotes.
export function csvTextCell(value){
  const raw=String(value??'').replace(/\u0000/g,'');
  const safe=/^[\s\u0000-\u001f]*[=+\-@]/u.test(raw) ? "'"+raw : raw;
  return '"'+safe.replace(/"/g,'""')+'"';
}
export function buildFacultyGradebookCsv(rows){
  if(!Array.isArray(rows))throw Error('Official gradebook rows are required.');
  if(rows.length>MAX_EXPORT_ROWS)throw Error('Too many gradebook rows. Narrow the export to one classroom.');
  const result=[GRADEBOOK_EXPORT_COLUMNS.map(csvTextCell).join(',')];
  for(const row of rows){
    if(!row || typeof row!=='object' || Array.isArray(row))
      throw Error('Invalid official gradebook row.');
    result.push([
      row.official_name,row.official_student_no,row.final_status,
      row.transmuted_grade,row.grade_remarks
    ].map(csvTextCell).join(','));
  }
  return '\uFEFF'+result.join('\r\n')+'\r\n';
}
export function facultyGradebookFilename(name,classroomId){
  const slug=String(name||'classroom').normalize('NFKD').replace(/[\u0300-\u036f]/g,'')
    .replace(/[^a-zA-Z0-9]+/g,'-').replace(/^-+|-+$/g,'').slice(0,45)||'classroom';
  const safeId=String(classroomId||'').replace(/[^a-f0-9]/gi,'').slice(0,8).toLowerCase()||'unknown';
  return 'BUKLOD-Gradebook-'+slug+'-'+safeId+'.csv';
}
