import {
  QUESTION_PAPERS,
  type PaperQuestion,
  type QuestionPaper,
} from './questionPapers';

export interface CuratedPaperSection {
  id: string;
  title: string;
  subtitle?: string;
  rawPaperId: string;
  rawSectionId?: string;
  questions: PaperQuestion[];
}

export interface CuratedPaper {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  sections: CuratedPaperSection[];
  questions: PaperQuestion[];
}

interface CuratedPaperDescriptor {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
}

const CURATED_PAPER_ORDER: CuratedPaperDescriptor[] = [
  { id: 'paper-dec-2025', title: 'Dec 2025', subtitle: 'HU1504-1 · 7th Sem B.Tech', description: 'December 2025 SEE paper — MCQ (Part A) and Unit I–III descriptive (Part B).' },
  { id: 'paper-may-2026', title: 'May 2026', subtitle: '16 May 2026 · HU1504-1 Open Elective', description: 'Latest open-elective paper. MCQ plus Unit I, II, III descriptive sections (book-confirmed).' },
  { id: 'paper-may-2025', title: 'May 2025', subtitle: 'HU1504-1 Open Elective · 6th Sem', description: 'May 2025 open-elective paper — MCQ and Unit I–III descriptive.' },
  { id: 'paper-jan-2023', title: 'Jan 2023', subtitle: '19HU8X72 · VTU', description: 'January 2023 VTU previous paper — Unit I–III descriptive (no MCQ section).' },
  { id: 'paper-jan-2026', title: 'Jan 2026', subtitle: 'Paper C · Japanese Test 1', description: 'January 2026 Japanese Test 1 — 30 minutes · 20 marks.' },
  { id: 'paper-feb-2026', title: 'Feb 2026', subtitle: 'Paper E · Pre-test Unit 2', description: 'February 2026 pre-test on Unit 2 — 60 minutes · 20 marks.' },
  { id: 'paper-a-pretest-2025', title: 'Paper A', subtitle: 'Pre-test Unit 3, 2025', description: '2025 pre-test on Unit 3 — 1 hour · 20 marks.' },
  { id: 'paper-b-midsem-2026', title: 'Paper B', subtitle: 'VI Sem Mid Semester Exam II · 2026', description: 'VI Sem B.E. Mid Semester Exam II, 2026 — 1 hour · 20 marks.' },
  { id: 'paper-d-midsem-2026', title: 'Paper D', subtitle: 'VII Sem Mid Semester Exam I · 2026', description: 'VII Sem B.E. Mid Semester Exam I, 2026 — 1 hour · 20 marks.' },
  { id: 'paper-pattern-bank', title: 'Pattern Bank', subtitle: 'Cross-paper repeats & study notes', description: 'Sub-questions repeated across multiple papers and pattern-summary notes. Use this to drill the recurring shapes.' },
];

const PATTERN_BANK_ID = 'paper-pattern-bank';

interface CuratedTarget {
  curatedId: string;
  title: string;
  subtitle?: string;
}

interface RawSectionRule {
  rawSectionId?: string;
  targets: CuratedTarget[];
}

interface RawPaperRule {
  rawPaperId: string;
  sections: RawSectionRule[];
}

const sharedSuffix = (others: string[]): string =>
  others.length === 0 ? 'Shared content' : `Shared with ${others.join(' · ')}`;

const RAW_PAPER_RULES: RawPaperRule[] = [
  { rawPaperId: 'december-2025', sections: [{ targets: [{ curatedId: 'paper-dec-2025', title: 'MCQ · Q1 – Q20', subtitle: 'Part A · 7th Sem B.Tech' }] }] },
  { rawPaperId: 'dec-2025-unit-i-questions', sections: [{ targets: [{ curatedId: 'paper-dec-2025', title: 'Unit I · Q1, Q2, Q3', subtitle: 'Part B descriptive' }] }] },
  { rawPaperId: 'may-2025', sections: [{ targets: [{ curatedId: 'paper-may-2025', title: 'MCQ · Q1 – Q20', subtitle: 'Part A · 6th Sem Open Elective' }] }] },
  { rawPaperId: 'may-2025-unit-i-questions', sections: [{ targets: [{ curatedId: 'paper-may-2025', title: 'Unit I · Q1, Q2, Q3', subtitle: 'Open Elective descriptive' }] }] },
  { rawPaperId: 'may-2026-16-may-2026-hu1504-1-introduction-to-japanese-language-open-elective', sections: [{ targets: [{ curatedId: 'paper-may-2026', title: 'MCQ · Q1 – Q20', subtitle: 'Part A · book-confirmed' }] }] },
  { rawPaperId: 'may-2026-16-may-2026-unit-i-questions', sections: [{ targets: [{ curatedId: 'paper-may-2026', title: 'Unit I · Q1, Q2, Q3', subtitle: 'Open Elective · book-confirmed' }] }] },
  { rawPaperId: 'may-2026-16-may-2026-unit-ii-questions', sections: [{ targets: [{ curatedId: 'paper-may-2026', title: 'Unit II · Q4, Q5, Q6', subtitle: 'Open Elective · book-confirmed' }] }] },
  { rawPaperId: 'may-2026-16-may-2026-unit-iii-questions', sections: [{ targets: [{ curatedId: 'paper-may-2026', title: 'Unit III · Q7, Q8', subtitle: 'Open Elective · book-confirmed' }] }] },
  { rawPaperId: 'jan-2023-unit-i-questions', sections: [{ targets: [{ curatedId: 'paper-jan-2023', title: 'Unit I · descriptive', subtitle: '19HU8X72 · VTU' }] }] },
  { rawPaperId: 'paper-a-pre-test-unit-3-2025-duration-1-hour-max-marks-20', sections: [{ targets: [{ curatedId: 'paper-a-pretest-2025', title: 'Paper A · full paper', subtitle: '1 Hour · 20 marks' }] }] },
  { rawPaperId: 'paper-b-vi-sem-b-e-mid-semester-exam-ii-2026-duration-1-hour-max-marks-20', sections: [{ targets: [{ curatedId: 'paper-b-midsem-2026', title: 'Paper B · full paper', subtitle: '1 Hour · 20 marks' }] }] },
  { rawPaperId: 'paper-c-japanese-test-1-january-2026-duration-30-mins-max-marks-20', sections: [{ targets: [{ curatedId: 'paper-jan-2026', title: 'Paper C · full paper', subtitle: '30 mins · 20 marks' }] }] },
  { rawPaperId: 'paper-d-vii-sem-b-e-mid-semester-exam-i-2026-duration-1-hour-max-marks-20', sections: [{ targets: [{ curatedId: 'paper-d-midsem-2026', title: 'Paper D · full paper', subtitle: '1 Hour · 20 marks' }] }] },
  { rawPaperId: 'paper-e-japanese-pre-test-unit-2-february-2026-duration-60-mins-max-marks-20', sections: [{ targets: [{ curatedId: 'paper-feb-2026', title: 'Paper E · full paper', subtitle: '60 mins · 20 marks' }] }] },
  {
    rawPaperId: 'all-papers-unit-ii',
    sections: [
      { rawSectionId: 'u2-all-papers-unit-ii-q4-sub-parts-b-c-identical-in-dec-2025-and-jan-2023', targets: [
        { curatedId: 'paper-dec-2025', title: 'Unit II · Q4 (shared pattern)', subtitle: sharedSuffix(['Jan 2023','May 2025']) },
        { curatedId: 'paper-jan-2023', title: 'Unit II · Q4 (shared pattern)', subtitle: sharedSuffix(['Dec 2025','May 2025']) },
        { curatedId: 'paper-may-2025', title: 'Unit II · Q4 (shared pattern)', subtitle: sharedSuffix(['Dec 2025','Jan 2023']) },
        { curatedId: PATTERN_BANK_ID, title: 'Unit II · Q4 (Dec 2025 ⇄ Jan 2023)', subtitle: 'Sub-parts b & c identical across papers' },
      ] },
      { rawSectionId: 'u2-all-papers-unit-ii-q5', targets: [
        { curatedId: 'paper-dec-2025', title: 'Unit II · Q5 (shared pattern)', subtitle: sharedSuffix(['Jan 2023','May 2025']) },
        { curatedId: 'paper-jan-2023', title: 'Unit II · Q5 (shared pattern)', subtitle: sharedSuffix(['Dec 2025','May 2025']) },
        { curatedId: 'paper-may-2025', title: 'Unit II · Q5 (shared pattern)', subtitle: sharedSuffix(['Dec 2025','Jan 2023']) },
        { curatedId: PATTERN_BANK_ID, title: 'Unit II · Q5 patterns', subtitle: 'Recurring shape across SEE papers' },
      ] },
      { rawSectionId: 'u2-all-papers-unit-ii-q6', targets: [
        { curatedId: 'paper-dec-2025', title: 'Unit II · Q6 (shared pattern)', subtitle: sharedSuffix(['Jan 2023','May 2025']) },
        { curatedId: 'paper-jan-2023', title: 'Unit II · Q6 (shared pattern)', subtitle: sharedSuffix(['Dec 2025','May 2025']) },
        { curatedId: 'paper-may-2025', title: 'Unit II · Q6 (shared pattern)', subtitle: sharedSuffix(['Dec 2025','Jan 2023']) },
        { curatedId: PATTERN_BANK_ID, title: 'Unit II · Q6 patterns', subtitle: 'Recurring shape across SEE papers' },
      ] },
    ],
  },
  { rawPaperId: 'all-papers-unit-iii-daily-routine-q8a', sections: [{ targets: [
    { curatedId: 'paper-dec-2025', title: 'Unit III · Daily Routine', subtitle: sharedSuffix(['Jan 2023','May 2025']) },
    { curatedId: 'paper-jan-2023', title: 'Unit III · Daily Routine', subtitle: sharedSuffix(['Dec 2025','May 2025']) },
    { curatedId: 'paper-may-2025', title: 'Unit III · Daily Routine', subtitle: sharedSuffix(['Dec 2025','Jan 2023']) },
    { curatedId: PATTERN_BANK_ID, title: 'Unit III · Daily Routine (Q8a / Q7c)', subtitle: 'Repeats in every paper' },
  ] }] },
  { rawPaperId: 'all-papers-unit-iii-directions-q8c', sections: [{ targets: [
    { curatedId: 'paper-dec-2025', title: 'Unit III · Directions', subtitle: sharedSuffix(['Jan 2023','May 2025']) },
    { curatedId: 'paper-jan-2023', title: 'Unit III · Directions', subtitle: sharedSuffix(['Dec 2025','May 2025']) },
    { curatedId: 'paper-may-2025', title: 'Unit III · Directions', subtitle: sharedSuffix(['Dec 2025','Jan 2023']) },
    { curatedId: PATTERN_BANK_ID, title: 'Unit III · Directions (Q8c)', subtitle: 'Repeats in every paper' },
  ] }] },
  { rawPaperId: 'all-papers-unit-iii-kanji-matching-q8e', sections: [{ targets: [
    { curatedId: 'paper-dec-2025', title: 'Unit III · Kanji matching', subtitle: sharedSuffix(['Jan 2023','May 2025']) },
    { curatedId: 'paper-jan-2023', title: 'Unit III · Kanji matching', subtitle: sharedSuffix(['Dec 2025','May 2025']) },
    { curatedId: 'paper-may-2025', title: 'Unit III · Kanji matching', subtitle: sharedSuffix(['Dec 2025','Jan 2023']) },
    { curatedId: PATTERN_BANK_ID, title: 'Unit III · Kanji Matching (Q8e / Q7c)', subtitle: 'Repeats in every paper' },
  ] }] },
  { rawPaperId: 'jan-2023-may-2025-unit-iii', sections: [{ targets: [
    { curatedId: 'paper-jan-2023', title: 'Unit III · Translate (Q7b / Q8b)', subtitle: sharedSuffix(['May 2025']) },
    { curatedId: 'paper-may-2025', title: 'Unit III · Translate (Q7b / Q8b)', subtitle: sharedSuffix(['Jan 2023']) },
    { curatedId: PATTERN_BANK_ID, title: 'Unit III · Translate Q7b / Q8b', subtitle: 'Identical in Jan 2023 & May 2025' },
  ] }] },
  { rawPaperId: 'jan-2023-may-2025-akira-tokyo-story-q8d-identical', sections: [{ targets: [
    { curatedId: 'paper-jan-2023', title: 'Unit III · Akira Tokyo story (Q8d)', subtitle: sharedSuffix(['May 2025']) },
    { curatedId: 'paper-may-2025', title: 'Unit III · Akira Tokyo story (Q8d)', subtitle: sharedSuffix(['Jan 2023']) },
    { curatedId: PATTERN_BANK_ID, title: 'Unit III · Akira Tokyo story (Q8d)', subtitle: 'Identical in Jan 2023 & May 2025' },
  ] }] },
  { rawPaperId: 'jan-2023-dec-2025-word-rearrangement-q7a', sections: [{ targets: [
    { curatedId: 'paper-dec-2025', title: 'Unit III · Word rearrangement (Q7a)', subtitle: sharedSuffix(['Jan 2023']) },
    { curatedId: 'paper-jan-2023', title: 'Unit III · Word rearrangement (Q7a)', subtitle: sharedSuffix(['Dec 2025']) },
    { curatedId: PATTERN_BANK_ID, title: 'Unit III · Word rearrangement (Q7a)', subtitle: 'Repeats in Jan 2023 & Dec 2025' },
  ] }] },
  { rawPaperId: 'new-patterns-confirmed-by-current-semester-papers-questions', sections: [{ targets: [
    { curatedId: PATTERN_BANK_ID, title: 'Pattern summary · study notes', subtitle: 'Confirmed by current-semester papers' },
  ] }] },
];

function slugifyForId(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function makeSectionId(curatedId: string, ruleIndex: number, suffix: string): string {
  return `${curatedId}::sec-${ruleIndex}-${suffix}`;
}

function questionsForRawSection(paper: QuestionPaper, rawSectionId: string | undefined): PaperQuestion[] {
  if (!rawSectionId) return paper.questions;
  const section = paper.sections.find((c) => c.id === rawSectionId);
  if (!section) return paper.questions.filter((q) => q.sectionId === rawSectionId);
  return paper.questions.filter((q) => q.sectionId === section.id || q.sectionTitle === section.title);
}

function buildCuratedPapers(rawPapers: QuestionPaper[]): CuratedPaper[] {
  const curated = new Map<string, CuratedPaper>();
  for (const d of CURATED_PAPER_ORDER) {
    curated.set(d.id, { ...d, sections: [], questions: [] });
  }
  const rawById = new Map(rawPapers.map((p) => [p.id, p]));
  const handled = new Set<string>();

  let ruleIndex = 0;
  for (const rule of RAW_PAPER_RULES) {
    const paper = rawById.get(rule.rawPaperId);
    if (!paper) continue;
    handled.add(rule.rawPaperId);

    for (const sectionRule of rule.sections) {
      const questions = questionsForRawSection(paper, sectionRule.rawSectionId);
      if (questions.length === 0) continue;
      const suffix = sectionRule.rawSectionId
        ? slugifyForId(sectionRule.rawSectionId).slice(-32)
        : slugifyForId(paper.id).slice(-32);

      for (const target of sectionRule.targets) {
        const cp = curated.get(target.curatedId) ?? curated.get(PATTERN_BANK_ID);
        if (!cp) continue;
        cp.sections.push({
          id: makeSectionId(cp.id, ruleIndex, suffix),
          title: target.title,
          subtitle: target.subtitle,
          rawPaperId: paper.id,
          rawSectionId: sectionRule.rawSectionId,
          questions,
        });
        for (const q of questions) cp.questions.push(q);
      }
      ruleIndex += 1;
    }
  }

  const pb = curated.get(PATTERN_BANK_ID);
  if (pb) {
    for (const paper of rawPapers) {
      if (handled.has(paper.id)) continue;
      const rawSecs = paper.sections.length > 0 ? paper.sections : [{ id: paper.id, pane: '', title: paper.title }];
      for (const sec of rawSecs) {
        const questions = questionsForRawSection(paper, sec.id);
        if (questions.length === 0) continue;
        pb.sections.push({
          id: makeSectionId(pb.id, ruleIndex, slugifyForId(sec.id || paper.id).slice(-32)),
          title: sec.title.replace(/^[^\p{L}\p{N}]+/u, '').trim() || paper.title,
          subtitle: 'Unmapped raw section',
          rawPaperId: paper.id,
          rawSectionId: sec.id,
          questions,
        });
        for (const q of questions) pb.questions.push(q);
      }
      ruleIndex += 1;
    }
  }

  for (const p of curated.values()) {
    const seen = new Set<string>();
    p.questions = p.questions.filter((q) => (seen.has(q.id) ? false : (seen.add(q.id), true)));
  }

  return [...curated.values()].filter((p) => p.questions.length > 0);
}

export const CURATED_PAPERS: CuratedPaper[] = buildCuratedPapers(QUESTION_PAPERS);
export const CURATED_PAPER_TOTAL = CURATED_PAPERS.reduce((t, p) => t + p.questions.length, 0);
export function getCuratedPaper(paperId: string): CuratedPaper | undefined {
  return CURATED_PAPERS.find((p) => p.id === paperId);
}
export function getCuratedSection(paperId: string, sectionId: string): CuratedPaperSection | undefined {
  return getCuratedPaper(paperId)?.sections.find((s) => s.id === sectionId);
}
export function getCuratedPaperForRaw(rawPaperId: string): CuratedPaper | undefined {
  for (const p of CURATED_PAPERS) {
    if (p.sections.some((s) => s.rawPaperId === rawPaperId)) return p;
  }
  return undefined;
}
