const optional = (value, label, max) => {
  const text = String(value ?? '').trim();
  if (text.length > max) throw new Error(label + ' is too long.');
  return text || null;
};

export function buildClassroomRecord(input, facultyUserId) {
  const faculty = String(facultyUserId ?? '').trim();
  if (!/^[0-9a-f]{8}-[0-9a-f-]{27,36}$/i.test(faculty)) {
    throw new Error('A signed-in BUKLOD faculty identity is required.');
  }
  const name = String(input?.name ?? '').trim();
  if (name.length < 2 || name.length > 120) {
    throw new Error('Class name must be 2 to 120 characters.');
  }
  return {
    faculty_user_id: faculty,
    name,
    subject_code: optional(input?.subject_code, 'Subject code', 40),
    section_name: optional(input?.section_name, 'Section', 80),
    school_year: optional(input?.school_year, 'School year', 40),
    term: optional(input?.term, 'Term', 50),
    description: optional(input?.description, 'Description', 1000)
  };
}
