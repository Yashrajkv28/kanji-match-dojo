export interface PaperOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface PaperQuestion {
  id: string;
  paperId: string;
  paperTitle: string;
  sectionId: string;
  sectionTitle: string;
  number: string;
  prompt: string;
  options: PaperOption[];
  correctAnswer?: string;
  explanation: string[];
  prediction?: {
    score?: number;
    label?: string;
  };
  source: {
    file: string;
    pane: string;
    paneTitle: string;
    meta?: string;
  };
}

export interface QuestionPaper {
  id: string;
  title: string;
  source: string;
  sections: Array<{
    id: string;
    pane: string;
    title: string;
  }>;
  questions: PaperQuestion[];
}

export const QUESTION_PAPERS: QuestionPaper[] = [
  {
    "id": "december-2025",
    "title": "December 2025 —",
    "source": "Japanese_Practice_QBank.html",
    "sections": [
      {
        "id": "mcq-december-2025-q1-to-q20-hu1504-1-7th-sem-b-tech",
        "pane": "mcq",
        "title": "📄 December 2025 — Q1 to Q20 HU1504-1 · 7th Sem B.Tech"
      }
    ],
    "questions": [
      {
        "id": "mcq-december-2025-q1-1",
        "paperId": "december-2025",
        "paperTitle": "December 2025 —",
        "sectionId": "mcq",
        "sectionTitle": "📄 December 2025 — Q1 to Q20 HU1504-1 · 7th Sem B.Tech",
        "number": "Q1.",
        "prompt": "Which Hiragana means \"hand\"?ALL 3",
        "options": [
          {
            "id": "A",
            "text": "え",
            "isCorrect": false
          },
          {
            "id": "B",
            "text": "め",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "て",
            "isCorrect": true
          },
          {
            "id": "D",
            "text": "ぬ",
            "isCorrect": false
          }
        ],
        "correctAnswer": "C) て",
        "explanation": [
          "て=te=hand · え=e · め=me · ぬ=nu"
        ],
        "prediction": {
          "score": 87,
          "label": "Very Likely — Hiragana identification repeated both MCQ papers"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "mcq",
          "paneTitle": "MCQ - All Papers",
          "meta": "Part A — MCQ (20 marks per paper, 1 mark each, OMR sheet)Dec 2025 + May 2025 had MCQs. Jan 2023 had no MCQ section."
        }
      },
      {
        "id": "mcq-december-2025-q2-2",
        "paperId": "december-2025",
        "paperTitle": "December 2025 —",
        "sectionId": "mcq",
        "sectionTitle": "📄 December 2025 — Q1 to Q20 HU1504-1 · 7th Sem B.Tech",
        "number": "Q2.",
        "prompt": "Which word means \"to suit\"?Unique",
        "options": [
          {
            "id": "A",
            "text": "miau",
            "isCorrect": false
          },
          {
            "id": "B",
            "text": "lau",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "niau",
            "isCorrect": true
          },
          {
            "id": "D",
            "text": "piau",
            "isCorrect": false
          }
        ],
        "correctAnswer": "C) niau",
        "explanation": [],
        "prediction": {
          "score": 22,
          "label": "Possible — appeared once only"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "mcq",
          "paneTitle": "MCQ - All Papers",
          "meta": "Part A — MCQ (20 marks per paper, 1 mark each, OMR sheet)Dec 2025 + May 2025 had MCQs. Jan 2023 had no MCQ section."
        }
      },
      {
        "id": "mcq-december-2025-q3-3",
        "paperId": "december-2025",
        "paperTitle": "December 2025 —",
        "sectionId": "mcq",
        "sectionTitle": "📄 December 2025 — Q1 to Q20 HU1504-1 · 7th Sem B.Tech",
        "number": "Q3.",
        "prompt": "Watashi niwa oji to oba ga imasu. Oba wa kodomo ga hitori imasu.\nQ: Watashi niwa itoko wa nan-nin imasuka?2 Papers",
        "options": [
          {
            "id": "A",
            "text": "yorin",
            "isCorrect": false
          },
          {
            "id": "B",
            "text": "sannin",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "hitori",
            "isCorrect": true
          },
          {
            "id": "D",
            "text": "futari",
            "isCorrect": false
          }
        ],
        "correctAnswer": "C) hitori",
        "explanation": [
          "Only oba's 1 child mentioned → itoko = hitori (1). May 2025 version adds oji's 2 children → sannin (3)."
        ],
        "prediction": {
          "score": 82,
          "label": "Very Likely — itoko counting appears in both MCQ papers"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "mcq",
          "paneTitle": "MCQ - All Papers",
          "meta": "Part A — MCQ (20 marks per paper, 1 mark each, OMR sheet)Dec 2025 + May 2025 had MCQs. Jan 2023 had no MCQ section."
        }
      },
      {
        "id": "mcq-december-2025-q4-4",
        "paperId": "december-2025",
        "paperTitle": "December 2025 —",
        "sectionId": "mcq",
        "sectionTitle": "📄 December 2025 — Q1 to Q20 HU1504-1 · 7th Sem B.Tech",
        "number": "Q4.",
        "prompt": "Koko ni ringo ga kokonotsu arimashita. Watashi wa sore o mittsu tabemashita.\nQ: Ima ringo wa ikutsu arimaska?2 Papers",
        "options": [
          {
            "id": "A",
            "text": "yottsu",
            "isCorrect": false
          },
          {
            "id": "B",
            "text": "muttsu",
            "isCorrect": true
          },
          {
            "id": "C",
            "text": "mittsu",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "nanatsu",
            "isCorrect": false
          }
        ],
        "correctAnswer": "B) muttsu",
        "explanation": [
          "kokonotsu(9) − mittsu(3) = muttsu(6) | Same subtraction format in May 2025 (10−3=7=nanatsu)"
        ],
        "prediction": {
          "score": 91,
          "label": "Near Certain — counting/subtraction format in both MCQ papers"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "mcq",
          "paneTitle": "MCQ - All Papers",
          "meta": "Part A — MCQ (20 marks per paper, 1 mark each, OMR sheet)Dec 2025 + May 2025 had MCQs. Jan 2023 had no MCQ section."
        }
      },
      {
        "id": "mcq-december-2025-q5-5",
        "paperId": "december-2025",
        "paperTitle": "December 2025 —",
        "sectionId": "mcq",
        "sectionTitle": "📄 December 2025 — Q1 to Q20 HU1504-1 · 7th Sem B.Tech",
        "number": "Q5.",
        "prompt": "Which word means \"to play musical instruments\"?2 Papers",
        "options": [
          {
            "id": "A",
            "text": "kiku",
            "isCorrect": false
          },
          {
            "id": "B",
            "text": "hiku",
            "isCorrect": true
          },
          {
            "id": "C",
            "text": "shiku",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "niku",
            "isCorrect": false
          }
        ],
        "correctAnswer": "B) hiku",
        "explanation": [
          "kiku=listen · hiku=play strings/piano · niku=meat · all similar sound — easy to confuse!"
        ],
        "prediction": {
          "score": 62,
          "label": "Likely — sound-alike verbs are a common trap category"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "mcq",
          "paneTitle": "MCQ - All Papers",
          "meta": "Part A — MCQ (20 marks per paper, 1 mark each, OMR sheet)Dec 2025 + May 2025 had MCQs. Jan 2023 had no MCQ section."
        }
      },
      {
        "id": "mcq-december-2025-q6-6",
        "paperId": "december-2025",
        "paperTitle": "December 2025 —",
        "sectionId": "mcq",
        "sectionTitle": "📄 December 2025 — Q1 to Q20 HU1504-1 · 7th Sem B.Tech",
        "number": "Q6.",
        "prompt": "Which one means \"had better\"?ALL 3",
        "options": [
          {
            "id": "A",
            "text": "beki",
            "isCorrect": false
          },
          {
            "id": "B",
            "text": "-ta hou ga ii",
            "isCorrect": true
          },
          {
            "id": "C",
            "text": "koto ga arimasu",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "suru deshou",
            "isCorrect": false
          }
        ],
        "correctAnswer": "B) -ta hou ga ii",
        "explanation": [
          "-ta hou ga ii = had better (advice) · beki = should/ought to (obligation)"
        ],
        "prediction": {
          "score": 97,
          "label": "Near Certain — identical question in BOTH MCQ papers"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "mcq",
          "paneTitle": "MCQ - All Papers",
          "meta": "Part A — MCQ (20 marks per paper, 1 mark each, OMR sheet)Dec 2025 + May 2025 had MCQs. Jan 2023 had no MCQ section."
        }
      },
      {
        "id": "mcq-december-2025-q7-7",
        "paperId": "december-2025",
        "paperTitle": "December 2025 —",
        "sectionId": "mcq",
        "sectionTitle": "📄 December 2025 — Q1 to Q20 HU1504-1 · 7th Sem B.Tech",
        "number": "Q7.",
        "prompt": "Kyou wa kin-youbi deshita. Dewa asatte wa nan-youbi desuka?Pattern",
        "options": [
          {
            "id": "A",
            "text": "do-youbi",
            "isCorrect": false
          },
          {
            "id": "B",
            "text": "nichi-youbi",
            "isCorrect": true
          },
          {
            "id": "C",
            "text": "getsu-youbi",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "ka-youbi",
            "isCorrect": false
          }
        ],
        "correctAnswer": "B) nichi-youbi",
        "explanation": [
          "kin-youbi=Friday · asatte=day after tomorrow · Friday+2=Sunday=nichi-youbi"
        ],
        "prediction": {
          "score": 79,
          "label": "Very Likely — day calculation is a recurring pattern"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "mcq",
          "paneTitle": "MCQ - All Papers",
          "meta": "Part A — MCQ (20 marks per paper, 1 mark each, OMR sheet)Dec 2025 + May 2025 had MCQs. Jan 2023 had no MCQ section."
        }
      },
      {
        "id": "mcq-december-2025-q8-8",
        "paperId": "december-2025",
        "paperTitle": "December 2025 —",
        "sectionId": "mcq",
        "sectionTitle": "📄 December 2025 — Q1 to Q20 HU1504-1 · 7th Sem B.Tech",
        "number": "Q8.",
        "prompt": "Which vehicle can fly in the sky?ALL 3",
        "options": [
          {
            "id": "A",
            "text": "ressha",
            "isCorrect": false
          },
          {
            "id": "B",
            "text": "jitensha",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "fune",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "hikouki",
            "isCorrect": true
          }
        ],
        "correctAnswer": "D) hikouki",
        "explanation": [
          "ressha=train · jitensha=bicycle · fune=ship · hikouki=airplane"
        ],
        "prediction": {
          "score": 97,
          "label": "Near Certain — word-for-word identical in BOTH MCQ papers"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "mcq",
          "paneTitle": "MCQ - All Papers",
          "meta": "Part A — MCQ (20 marks per paper, 1 mark each, OMR sheet)Dec 2025 + May 2025 had MCQs. Jan 2023 had no MCQ section."
        }
      },
      {
        "id": "mcq-december-2025-q9-9",
        "paperId": "december-2025",
        "paperTitle": "December 2025 —",
        "sectionId": "mcq",
        "sectionTitle": "📄 December 2025 — Q1 to Q20 HU1504-1 · 7th Sem B.Tech",
        "number": "Q9.",
        "prompt": "Which word means \"to smell\"?Unique",
        "options": [
          {
            "id": "A",
            "text": "kagu",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "nugu",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "kiku",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "hiku",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A) kagu",
        "explanation": [],
        "prediction": {
          "score": 24,
          "label": "Possible — unique question, appeared once"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "mcq",
          "paneTitle": "MCQ - All Papers",
          "meta": "Part A — MCQ (20 marks per paper, 1 mark each, OMR sheet)Dec 2025 + May 2025 had MCQs. Jan 2023 had no MCQ section."
        }
      },
      {
        "id": "mcq-december-2025-q10-10",
        "paperId": "december-2025",
        "paperTitle": "December 2025 —",
        "sectionId": "mcq",
        "sectionTitle": "📄 December 2025 — Q1 to Q20 HU1504-1 · 7th Sem B.Tech",
        "number": "Q10.",
        "prompt": "Which word means \"to take off\" (clothes, shoes)?Unique",
        "options": [
          {
            "id": "A",
            "text": "hagu",
            "isCorrect": false
          },
          {
            "id": "B",
            "text": "fugu",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "tsugu",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "nugu",
            "isCorrect": true
          }
        ],
        "correctAnswer": "D) nugu",
        "explanation": [],
        "prediction": {
          "score": 24,
          "label": "Possible — unique question, appeared once"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "mcq",
          "paneTitle": "MCQ - All Papers",
          "meta": "Part A — MCQ (20 marks per paper, 1 mark each, OMR sheet)Dec 2025 + May 2025 had MCQs. Jan 2023 had no MCQ section."
        }
      },
      {
        "id": "mcq-december-2025-q11-11",
        "paperId": "december-2025",
        "paperTitle": "December 2025 —",
        "sectionId": "mcq",
        "sectionTitle": "📄 December 2025 — Q1 to Q20 HU1504-1 · 7th Sem B.Tech",
        "number": "Q11.",
        "prompt": "When translating \"Where is the station?\", which word fills the ★ position?\nEki wa ★ desuka?2 Papers",
        "options": [
          {
            "id": "A",
            "text": "wa",
            "isCorrect": false
          },
          {
            "id": "B",
            "text": "desuka",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "eki",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "doko",
            "isCorrect": true
          }
        ],
        "correctAnswer": "D) doko",
        "explanation": [
          "Eki wa doko desuka? = Where is the station? · Same ★-word format in May 2025"
        ],
        "prediction": {
          "score": 83,
          "label": "Very Likely — ★ word-order format in both MCQ papers"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "mcq",
          "paneTitle": "MCQ - All Papers",
          "meta": "Part A — MCQ (20 marks per paper, 1 mark each, OMR sheet)Dec 2025 + May 2025 had MCQs. Jan 2023 had no MCQ section."
        }
      },
      {
        "id": "mcq-december-2025-q12-12",
        "paperId": "december-2025",
        "paperTitle": "December 2025 —",
        "sectionId": "mcq",
        "sectionTitle": "📄 December 2025 — Q1 to Q20 HU1504-1 · 7th Sem B.Tech",
        "number": "Q12.",
        "prompt": "Which word means \"should\"?ALL 3",
        "options": [
          {
            "id": "A",
            "text": "hou ga ii",
            "isCorrect": false
          },
          {
            "id": "B",
            "text": "deshou",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "kamo",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "beki",
            "isCorrect": true
          }
        ],
        "correctAnswer": "D) beki",
        "explanation": [
          "beki=should/ought to · deshou=probably · hou ga ii=had better · kamo=maybe"
        ],
        "prediction": {
          "score": 97,
          "label": "Near Certain — word-for-word identical in BOTH MCQ papers"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "mcq",
          "paneTitle": "MCQ - All Papers",
          "meta": "Part A — MCQ (20 marks per paper, 1 mark each, OMR sheet)Dec 2025 + May 2025 had MCQs. Jan 2023 had no MCQ section."
        }
      },
      {
        "id": "mcq-december-2025-q13-13",
        "paperId": "december-2025",
        "paperTitle": "December 2025 —",
        "sectionId": "mcq",
        "sectionTitle": "📄 December 2025 — Q1 to Q20 HU1504-1 · 7th Sem B.Tech",
        "number": "Q13.",
        "prompt": "Which word means North Korea?2 Papers",
        "options": [
          {
            "id": "A",
            "text": "Chuugoku",
            "isCorrect": false
          },
          {
            "id": "B",
            "text": "Kitachousen",
            "isCorrect": true
          },
          {
            "id": "C",
            "text": "Kankoku",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "Taiwan",
            "isCorrect": false
          }
        ],
        "correctAnswer": "B) Kitachousen",
        "explanation": [
          "Chuugoku=China · Kitachousen=North Korea · Kankoku=South Korea · Taiwan=Taiwan"
        ],
        "prediction": {
          "score": 55,
          "label": "Likely — country names are commonly tested vocabulary"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "mcq",
          "paneTitle": "MCQ - All Papers",
          "meta": "Part A — MCQ (20 marks per paper, 1 mark each, OMR sheet)Dec 2025 + May 2025 had MCQs. Jan 2023 had no MCQ section."
        }
      },
      {
        "id": "mcq-december-2025-q14-14",
        "paperId": "december-2025",
        "paperTitle": "December 2025 —",
        "sectionId": "mcq",
        "sectionTitle": "📄 December 2025 — Q1 to Q20 HU1504-1 · 7th Sem B.Tech",
        "number": "Q14.",
        "prompt": "Which word means \"to measure\"?Unique",
        "options": [
          {
            "id": "A",
            "text": "hakaru",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "hikaru (shine)",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "shikaru (scold)",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "okoru (get angry)",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A) hakaru",
        "explanation": [],
        "prediction": {
          "score": 26,
          "label": "Possible — appeared once; verb sound-alikes are a common format though"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "mcq",
          "paneTitle": "MCQ - All Papers",
          "meta": "Part A — MCQ (20 marks per paper, 1 mark each, OMR sheet)Dec 2025 + May 2025 had MCQs. Jan 2023 had no MCQ section."
        }
      },
      {
        "id": "mcq-december-2025-q15-15",
        "paperId": "december-2025",
        "paperTitle": "December 2025 —",
        "sectionId": "mcq",
        "sectionTitle": "📄 December 2025 — Q1 to Q20 HU1504-1 · 7th Sem B.Tech",
        "number": "Q15.",
        "prompt": "How do you express 100,000 in Japanese?ALL 3",
        "options": [
          {
            "id": "A",
            "text": "hyakusen",
            "isCorrect": false
          },
          {
            "id": "B",
            "text": "ichilakh",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "issenhyaku",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "juuman",
            "isCorrect": true
          }
        ],
        "correctAnswer": "D) juuman",
        "explanation": [
          "issen=1,000 · ichiman=10,000 · juuman=100,000 · hyakuman=1,000,000"
        ],
        "prediction": {
          "score": 97,
          "label": "Near Certain — identical in BOTH MCQ papers, must know"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "mcq",
          "paneTitle": "MCQ - All Papers",
          "meta": "Part A — MCQ (20 marks per paper, 1 mark each, OMR sheet)Dec 2025 + May 2025 had MCQs. Jan 2023 had no MCQ section."
        }
      },
      {
        "id": "mcq-december-2025-q16-16",
        "paperId": "december-2025",
        "paperTitle": "December 2025 —",
        "sectionId": "mcq",
        "sectionTitle": "📄 December 2025 — Q1 to Q20 HU1504-1 · 7th Sem B.Tech",
        "number": "Q16.",
        "prompt": "Which one is NOT a medical-related word?ALL 3",
        "options": [
          {
            "id": "A",
            "text": "kusuri (medicine)",
            "isCorrect": false
          },
          {
            "id": "B",
            "text": "isha (doctor)",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "benkyou  (study)",
            "isCorrect": true
          },
          {
            "id": "D",
            "text": "nyuuin (hospitalization)",
            "isCorrect": false
          }
        ],
        "correctAnswer": "C) benkyou  (study)",
        "explanation": [],
        "prediction": {
          "score": 97,
          "label": "Near Certain — word-for-word identical in BOTH MCQ papers"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "mcq",
          "paneTitle": "MCQ - All Papers",
          "meta": "Part A — MCQ (20 marks per paper, 1 mark each, OMR sheet)Dec 2025 + May 2025 had MCQs. Jan 2023 had no MCQ section."
        }
      },
      {
        "id": "mcq-december-2025-q17-17",
        "paperId": "december-2025",
        "paperTitle": "December 2025 —",
        "sectionId": "mcq",
        "sectionTitle": "📄 December 2025 — Q1 to Q20 HU1504-1 · 7th Sem B.Tech",
        "number": "Q17.",
        "prompt": "Kyou wa ichi-gatsu mikka desu. Dewa ototo (day before yesterday) wa nan-nichi deshitaka?Pattern",
        "options": [
          {
            "id": "A",
            "text": "tsuitachi",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "futsuka",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "yokka",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "muika",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A) tsuitachi",
        "explanation": [
          "mikka(3rd) · ototo = −2 days → 3−2 = 1st = tsuitachi | May 2025 uses asatte (+2) format"
        ],
        "prediction": {
          "score": 85,
          "label": "Very Likely — date +/− calculation appears in both MCQ papers"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "mcq",
          "paneTitle": "MCQ - All Papers",
          "meta": "Part A — MCQ (20 marks per paper, 1 mark each, OMR sheet)Dec 2025 + May 2025 had MCQs. Jan 2023 had no MCQ section."
        }
      },
      {
        "id": "mcq-december-2025-q18-18",
        "paperId": "december-2025",
        "paperTitle": "December 2025 —",
        "sectionId": "mcq",
        "sectionTitle": "📄 December 2025 — Q1 to Q20 HU1504-1 · 7th Sem B.Tech",
        "number": "Q18.",
        "prompt": "Which word means \"success\"?Unique",
        "options": [
          {
            "id": "A",
            "text": "heikou",
            "isCorrect": false
          },
          {
            "id": "B",
            "text": "taikou",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "seikou",
            "isCorrect": true
          },
          {
            "id": "D",
            "text": "eikou",
            "isCorrect": false
          }
        ],
        "correctAnswer": "C) seikou",
        "explanation": [],
        "prediction": {
          "score": 23,
          "label": "Possible — appeared once only"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "mcq",
          "paneTitle": "MCQ - All Papers",
          "meta": "Part A — MCQ (20 marks per paper, 1 mark each, OMR sheet)Dec 2025 + May 2025 had MCQs. Jan 2023 had no MCQ section."
        }
      },
      {
        "id": "mcq-december-2025-q19-19",
        "paperId": "december-2025",
        "paperTitle": "December 2025 —",
        "sectionId": "mcq",
        "sectionTitle": "📄 December 2025 — Q1 to Q20 HU1504-1 · 7th Sem B.Tech",
        "number": "Q19.",
        "prompt": "Abe san wa Chen san yori wakai desu. Chen san wa Ben san yori wakai desu. Yamada san wa Chen san yori wakai desu.\nQ: Dare ga ichiban toshi-ue (oldest)?ALL 3",
        "options": [
          {
            "id": "A",
            "text": "Ben",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "Chen",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "Abe",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "Yamada",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A) Ben",
        "explanation": [
          "\"A yori wakai\" = A is younger than the subject → chain: Abe < Chen < Ben = Ben is oldest"
        ],
        "prediction": {
          "score": 94,
          "label": "Near Certain — same age-comparison chain format in both MCQ papers"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "mcq",
          "paneTitle": "MCQ - All Papers",
          "meta": "Part A — MCQ (20 marks per paper, 1 mark each, OMR sheet)Dec 2025 + May 2025 had MCQs. Jan 2023 had no MCQ section."
        }
      },
      {
        "id": "mcq-december-2025-q20-20",
        "paperId": "december-2025",
        "paperTitle": "December 2025 —",
        "sectionId": "mcq",
        "sectionTitle": "📄 December 2025 — Q1 to Q20 HU1504-1 · 7th Sem B.Tech",
        "number": "Q20.",
        "prompt": "Kono doubutsu-en niwa shimauma to kujaku to zou to shika ga imasu. Saru ya tora ya uma wa imasen.\nQ: Nani ga imasuka?ALL 3",
        "options": [
          {
            "id": "A",
            "text": "peacock & monkey",
            "isCorrect": false
          },
          {
            "id": "B",
            "text": "horse & zebra",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "elephant & monkey",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "peacock & deer",
            "isCorrect": true
          }
        ],
        "correctAnswer": "D) peacock & deer",
        "explanation": [
          "shimauma=zebra · kujaku=peacock · zou=elephant · shika=deer | saru/tora/uma = NOT present"
        ],
        "prediction": {
          "score": 95,
          "label": "Near Certain — word-for-word identical in BOTH MCQ papers"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "mcq",
          "paneTitle": "MCQ - All Papers",
          "meta": "Part A — MCQ (20 marks per paper, 1 mark each, OMR sheet)Dec 2025 + May 2025 had MCQs. Jan 2023 had no MCQ section."
        }
      }
    ]
  },
  {
    "id": "may-2025",
    "title": "May 2025 —",
    "source": "Japanese_Practice_QBank.html",
    "sections": [
      {
        "id": "mcq-may-2025-q1-to-q20-hu1504-1-open-elective-6th-sem-b-tech",
        "pane": "mcq",
        "title": "📄 May 2025 — Q1 to Q20 HU1504-1 Open Elective · 6th Sem B.Tech"
      }
    ],
    "questions": [
      {
        "id": "mcq-may-2025-q1-21",
        "paperId": "may-2025",
        "paperTitle": "May 2025 —",
        "sectionId": "mcq",
        "sectionTitle": "📄 May 2025 — Q1 to Q20 HU1504-1 Open Elective · 6th Sem B.Tech",
        "number": "Q1.",
        "prompt": "How do you express 100,000 in Japanese?ALL 3",
        "options": [
          {
            "id": "A",
            "text": "hyakusen",
            "isCorrect": false
          },
          {
            "id": "B",
            "text": "ichilakh",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "issenhyaku",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "juuman",
            "isCorrect": true
          }
        ],
        "correctAnswer": "D) juuman",
        "explanation": [],
        "prediction": {
          "score": 97,
          "label": "Near Certain — same as Dec 2025 Q15, both papers identical"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "mcq",
          "paneTitle": "MCQ - All Papers",
          "meta": "Part A — MCQ (20 marks per paper, 1 mark each, OMR sheet)Dec 2025 + May 2025 had MCQs. Jan 2023 had no MCQ section."
        }
      },
      {
        "id": "mcq-may-2025-q2-22",
        "paperId": "may-2025",
        "paperTitle": "May 2025 —",
        "sectionId": "mcq",
        "sectionTitle": "📄 May 2025 — Q1 to Q20 HU1504-1 Open Elective · 6th Sem B.Tech",
        "number": "Q2.",
        "prompt": "When you need help, you say:Unique",
        "options": [
          {
            "id": "A",
            "text": "Ima ikimasu",
            "isCorrect": false
          },
          {
            "id": "B",
            "text": "Waratte kudasai",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "Tasukete kudasai",
            "isCorrect": true
          },
          {
            "id": "D",
            "text": "Shite kudasai",
            "isCorrect": false
          }
        ],
        "correctAnswer": "C) Tasukete kudasai",
        "explanation": [
          "Tasukete kudasai = Please help me!"
        ],
        "prediction": {
          "score": 32,
          "label": "Possible — appeared once; helpful phrases are common category"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "mcq",
          "paneTitle": "MCQ - All Papers",
          "meta": "Part A — MCQ (20 marks per paper, 1 mark each, OMR sheet)Dec 2025 + May 2025 had MCQs. Jan 2023 had no MCQ section."
        }
      },
      {
        "id": "mcq-may-2025-q3-23",
        "paperId": "may-2025",
        "paperTitle": "May 2025 —",
        "sectionId": "mcq",
        "sectionTitle": "📄 May 2025 — Q1 to Q20 HU1504-1 Open Elective · 6th Sem B.Tech",
        "number": "Q3.",
        "prompt": "Which is the most famous tourist spot in China?Unique",
        "options": [
          {
            "id": "A",
            "text": "Kinkakuji",
            "isCorrect": false
          },
          {
            "id": "B",
            "text": "Kitachousen",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "Kinkaku",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "Yuienchi",
            "isCorrect": true
          }
        ],
        "correctAnswer": "D) Yuienchi",
        "explanation": [
          "Kinkakuji=Golden Pavilion, Kyoto JAPAN. Yuienchi/Great Wall = China."
        ],
        "prediction": {
          "score": 22,
          "label": "Possible — unique, appeared once"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "mcq",
          "paneTitle": "MCQ - All Papers",
          "meta": "Part A — MCQ (20 marks per paper, 1 mark each, OMR sheet)Dec 2025 + May 2025 had MCQs. Jan 2023 had no MCQ section."
        }
      },
      {
        "id": "mcq-may-2025-q4-24",
        "paperId": "may-2025",
        "paperTitle": "May 2025 —",
        "sectionId": "mcq",
        "sectionTitle": "📄 May 2025 — Q1 to Q20 HU1504-1 Open Elective · 6th Sem B.Tech",
        "number": "Q4.",
        "prompt": "Koko ni pan ga jukko arimashita. Watashi wa sore o mittsu tabemashita.\nQ: Ima pan wa ikutsu arimasuka?2 Papers",
        "options": [
          {
            "id": "A",
            "text": "mittsu",
            "isCorrect": false
          },
          {
            "id": "B",
            "text": "nanatsu",
            "isCorrect": true
          },
          {
            "id": "C",
            "text": "yattsu",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "yottsu",
            "isCorrect": false
          }
        ],
        "correctAnswer": "B) nanatsu",
        "explanation": [
          "jukko(10) − mittsu(3) = nanatsu(7) | Same format as Dec 2025 Q4 (ringo)"
        ],
        "prediction": {
          "score": 91,
          "label": "Near Certain — food-subtraction counting in both MCQ papers"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "mcq",
          "paneTitle": "MCQ - All Papers",
          "meta": "Part A — MCQ (20 marks per paper, 1 mark each, OMR sheet)Dec 2025 + May 2025 had MCQs. Jan 2023 had no MCQ section."
        }
      },
      {
        "id": "mcq-may-2025-q5-25",
        "paperId": "may-2025",
        "paperTitle": "May 2025 —",
        "sectionId": "mcq",
        "sectionTitle": "📄 May 2025 — Q1 to Q20 HU1504-1 Open Elective · 6th Sem B.Tech",
        "number": "Q5.",
        "prompt": "Which one is eatable?Unique",
        "options": [
          {
            "id": "A",
            "text": "soba",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "zubon (trousers)",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "kuruma (car)",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "shingouki (traffic light)",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A) soba",
        "explanation": [],
        "prediction": {
          "score": 36,
          "label": "Possible — category identification questions are a common format"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "mcq",
          "paneTitle": "MCQ - All Papers",
          "meta": "Part A — MCQ (20 marks per paper, 1 mark each, OMR sheet)Dec 2025 + May 2025 had MCQs. Jan 2023 had no MCQ section."
        }
      },
      {
        "id": "mcq-may-2025-q6-26",
        "paperId": "may-2025",
        "paperTitle": "May 2025 —",
        "sectionId": "mcq",
        "sectionTitle": "📄 May 2025 — Q1 to Q20 HU1504-1 Open Elective · 6th Sem B.Tech",
        "number": "Q6.",
        "prompt": "Which one means \"had better\"?ALL 3",
        "options": [
          {
            "id": "A",
            "text": "beki",
            "isCorrect": false
          },
          {
            "id": "B",
            "text": "-ta hou ga ii",
            "isCorrect": true
          },
          {
            "id": "C",
            "text": "koto ga arimasu",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "suru deshou",
            "isCorrect": false
          }
        ],
        "correctAnswer": "B) -ta hou ga ii",
        "explanation": [],
        "prediction": {
          "score": 97,
          "label": "Near Certain — identical in BOTH MCQ papers, must memorize"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "mcq",
          "paneTitle": "MCQ - All Papers",
          "meta": "Part A — MCQ (20 marks per paper, 1 mark each, OMR sheet)Dec 2025 + May 2025 had MCQs. Jan 2023 had no MCQ section."
        }
      },
      {
        "id": "mcq-may-2025-q7-27",
        "paperId": "may-2025",
        "paperTitle": "May 2025 —",
        "sectionId": "mcq",
        "sectionTitle": "📄 May 2025 — Q1 to Q20 HU1504-1 Open Elective · 6th Sem B.Tech",
        "number": "Q7.",
        "prompt": "Ototoi wa san-gatsu mikka desu. Dewa asatte wa nan-nichi desuka?Pattern",
        "options": [
          {
            "id": "A",
            "text": "nanoka",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "yokka",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "itsuka",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "muika",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A) nanoka",
        "explanation": [
          "ototoi(−2)=3rd → today=5th → asatte(+2)=7th=nanoka"
        ],
        "prediction": {
          "score": 85,
          "label": "Very Likely — date calculation pattern in both MCQ papers"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "mcq",
          "paneTitle": "MCQ - All Papers",
          "meta": "Part A — MCQ (20 marks per paper, 1 mark each, OMR sheet)Dec 2025 + May 2025 had MCQs. Jan 2023 had no MCQ section."
        }
      },
      {
        "id": "mcq-may-2025-q8-28",
        "paperId": "may-2025",
        "paperTitle": "May 2025 —",
        "sectionId": "mcq",
        "sectionTitle": "📄 May 2025 — Q1 to Q20 HU1504-1 Open Elective · 6th Sem B.Tech",
        "number": "Q8.",
        "prompt": "Which vehicle can fly in the sky?ALL 3",
        "options": [
          {
            "id": "A",
            "text": "ressha",
            "isCorrect": false
          },
          {
            "id": "B",
            "text": "jitensha",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "fune",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "hikouki",
            "isCorrect": true
          }
        ],
        "correctAnswer": "D) hikouki",
        "explanation": [],
        "prediction": {
          "score": 97,
          "label": "Near Certain — word-for-word identical in both MCQ papers"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "mcq",
          "paneTitle": "MCQ - All Papers",
          "meta": "Part A — MCQ (20 marks per paper, 1 mark each, OMR sheet)Dec 2025 + May 2025 had MCQs. Jan 2023 had no MCQ section."
        }
      },
      {
        "id": "mcq-may-2025-q9-29",
        "paperId": "may-2025",
        "paperTitle": "May 2025 —",
        "sectionId": "mcq",
        "sectionTitle": "📄 May 2025 — Q1 to Q20 HU1504-1 Open Elective · 6th Sem B.Tech",
        "number": "Q9.",
        "prompt": "Which verb is suitable to watch TV?Unique",
        "options": [
          {
            "id": "A",
            "text": "miru",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "kiku",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "taberu",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "suru",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A) miru",
        "explanation": [],
        "prediction": {
          "score": 38,
          "label": "Possible — verb-usage matching is common format"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "mcq",
          "paneTitle": "MCQ - All Papers",
          "meta": "Part A — MCQ (20 marks per paper, 1 mark each, OMR sheet)Dec 2025 + May 2025 had MCQs. Jan 2023 had no MCQ section."
        }
      },
      {
        "id": "mcq-may-2025-q10-30",
        "paperId": "may-2025",
        "paperTitle": "May 2025 —",
        "sectionId": "mcq",
        "sectionTitle": "📄 May 2025 — Q1 to Q20 HU1504-1 Open Elective · 6th Sem B.Tech",
        "number": "Q10.",
        "prompt": "\"It will rain tomorrow\" → Asu wa ame ga furu ___?Unique",
        "options": [
          {
            "id": "A",
            "text": "kotodesu",
            "isCorrect": false
          },
          {
            "id": "B",
            "text": "bekidesu",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "ni naidesu",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "deshou",
            "isCorrect": true
          }
        ],
        "correctAnswer": "D) deshou",
        "explanation": [
          "\"furu deshou\" = will probably rain (prediction/conjecture)"
        ],
        "prediction": {
          "score": 44,
          "label": "Possible — grammar suffix fill-in is tested every paper"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "mcq",
          "paneTitle": "MCQ - All Papers",
          "meta": "Part A — MCQ (20 marks per paper, 1 mark each, OMR sheet)Dec 2025 + May 2025 had MCQs. Jan 2023 had no MCQ section."
        }
      },
      {
        "id": "mcq-may-2025-q11-31",
        "paperId": "may-2025",
        "paperTitle": "May 2025 —",
        "sectionId": "mcq",
        "sectionTitle": "📄 May 2025 — Q1 to Q20 HU1504-1 Open Elective · 6th Sem B.Tech",
        "number": "Q11.",
        "prompt": "\"Can you show me the way?\" → Michi wo ★ kuremasuka?2 Papers",
        "options": [
          {
            "id": "A",
            "text": "kuremasuka",
            "isCorrect": false
          },
          {
            "id": "B",
            "text": "michi",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "ni",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "oshiete",
            "isCorrect": true
          }
        ],
        "correctAnswer": "D) oshiete",
        "explanation": [
          "Michi wo oshiete kuremasuka? = Can you show me the way? · Same ★ format as Dec 2025 Q11"
        ],
        "prediction": {
          "score": 83,
          "label": "Very Likely — ★-position word order format in both MCQ papers"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "mcq",
          "paneTitle": "MCQ - All Papers",
          "meta": "Part A — MCQ (20 marks per paper, 1 mark each, OMR sheet)Dec 2025 + May 2025 had MCQs. Jan 2023 had no MCQ section."
        }
      },
      {
        "id": "mcq-may-2025-q12-32",
        "paperId": "may-2025",
        "paperTitle": "May 2025 —",
        "sectionId": "mcq",
        "sectionTitle": "📄 May 2025 — Q1 to Q20 HU1504-1 Open Elective · 6th Sem B.Tech",
        "number": "Q12.",
        "prompt": "Which word means \"should\"?ALL 3",
        "options": [
          {
            "id": "A",
            "text": "hou ga ii",
            "isCorrect": false
          },
          {
            "id": "B",
            "text": "deshou",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "kamo",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "beki",
            "isCorrect": true
          }
        ],
        "correctAnswer": "D) beki",
        "explanation": [],
        "prediction": {
          "score": 97,
          "label": "Near Certain — identical in both MCQ papers"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "mcq",
          "paneTitle": "MCQ - All Papers",
          "meta": "Part A — MCQ (20 marks per paper, 1 mark each, OMR sheet)Dec 2025 + May 2025 had MCQs. Jan 2023 had no MCQ section."
        }
      },
      {
        "id": "mcq-may-2025-q13-33",
        "paperId": "may-2025",
        "paperTitle": "May 2025 —",
        "sectionId": "mcq",
        "sectionTitle": "📄 May 2025 — Q1 to Q20 HU1504-1 Open Elective · 6th Sem B.Tech",
        "number": "Q13.",
        "prompt": "Watashi niwa oji to oba ga imasu. Oba wa kodomo ga hitori ite, oji wa kodomo ga futari imasu.\nQ: Itoko wa nan-nin imasuka?ALL 3",
        "options": [
          {
            "id": "A",
            "text": "yorin",
            "isCorrect": false
          },
          {
            "id": "B",
            "text": "sannin",
            "isCorrect": true
          },
          {
            "id": "C",
            "text": "hitori",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "futari",
            "isCorrect": false
          }
        ],
        "correctAnswer": "B) sannin",
        "explanation": [
          "oba(1) + oji(2) = sannin(3). Full version of Dec 2025 Q3."
        ],
        "prediction": {
          "score": 91,
          "label": "Near Certain — extended version of Dec 2025 Q3, same family"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "mcq",
          "paneTitle": "MCQ - All Papers",
          "meta": "Part A — MCQ (20 marks per paper, 1 mark each, OMR sheet)Dec 2025 + May 2025 had MCQs. Jan 2023 had no MCQ section."
        }
      },
      {
        "id": "mcq-may-2025-q14-34",
        "paperId": "may-2025",
        "paperTitle": "May 2025 —",
        "sectionId": "mcq",
        "sectionTitle": "📄 May 2025 — Q1 to Q20 HU1504-1 Open Elective · 6th Sem B.Tech",
        "number": "Q14.",
        "prompt": "Which Japanese southern island is famous for tourism?Unique",
        "options": [
          {
            "id": "A",
            "text": "Okinawa",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "Satsuma",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "Oshiro",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "Akihabara",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A) Okinawa",
        "explanation": [],
        "prediction": {
          "score": 38,
          "label": "Possible — geography knowledge appeared once"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "mcq",
          "paneTitle": "MCQ - All Papers",
          "meta": "Part A — MCQ (20 marks per paper, 1 mark each, OMR sheet)Dec 2025 + May 2025 had MCQs. Jan 2023 had no MCQ section."
        }
      },
      {
        "id": "mcq-may-2025-q15-35",
        "paperId": "may-2025",
        "paperTitle": "May 2025 —",
        "sectionId": "mcq",
        "sectionTitle": "📄 May 2025 — Q1 to Q20 HU1504-1 Open Elective · 6th Sem B.Tech",
        "number": "Q15.",
        "prompt": "Which Hiragana means \"mosquito\"?Pattern",
        "options": [
          {
            "id": "A",
            "text": "え",
            "isCorrect": false
          },
          {
            "id": "B",
            "text": "め",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "て",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "か",
            "isCorrect": true
          }
        ],
        "correctAnswer": "D) か",
        "explanation": [
          "か=ka=mosquito(蚊) · て=te=hand · Dec 2025 asked \"hand\" = て. Same Hiragana quiz format."
        ],
        "prediction": {
          "score": 87,
          "label": "Very Likely — Hiragana identification format in both MCQ papers"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "mcq",
          "paneTitle": "MCQ - All Papers",
          "meta": "Part A — MCQ (20 marks per paper, 1 mark each, OMR sheet)Dec 2025 + May 2025 had MCQs. Jan 2023 had no MCQ section."
        }
      },
      {
        "id": "mcq-may-2025-q16-36",
        "paperId": "may-2025",
        "paperTitle": "May 2025 —",
        "sectionId": "mcq",
        "sectionTitle": "📄 May 2025 — Q1 to Q20 HU1504-1 Open Elective · 6th Sem B.Tech",
        "number": "Q16.",
        "prompt": "Which one is NOT a medical-related word?ALL 3",
        "options": [
          {
            "id": "A",
            "text": "kusuri",
            "isCorrect": false
          },
          {
            "id": "B",
            "text": "isha",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "benkyou",
            "isCorrect": true
          },
          {
            "id": "D",
            "text": "nyuuin",
            "isCorrect": false
          }
        ],
        "correctAnswer": "C) benkyou",
        "explanation": [],
        "prediction": {
          "score": 97,
          "label": "Near Certain — identical in both MCQ papers"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "mcq",
          "paneTitle": "MCQ - All Papers",
          "meta": "Part A — MCQ (20 marks per paper, 1 mark each, OMR sheet)Dec 2025 + May 2025 had MCQs. Jan 2023 had no MCQ section."
        }
      },
      {
        "id": "mcq-may-2025-q17-37",
        "paperId": "may-2025",
        "paperTitle": "May 2025 —",
        "sectionId": "mcq",
        "sectionTitle": "📄 May 2025 — Q1 to Q20 HU1504-1 Open Elective · 6th Sem B.Tech",
        "number": "Q17.",
        "prompt": "Ototoi wa san-gatsu mikka desu. Dewa asatte wa nan-nichi desuka?Pattern",
        "options": [
          {
            "id": "A",
            "text": "nanoka",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "yokka",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "muika",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "youka",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A) nanoka",
        "explanation": [
          "ototoi(3rd) → today=5th → asatte=7th=nanoka · Same as Q7 in this paper"
        ],
        "prediction": {
          "score": 85,
          "label": "Very Likely — date calculation repeated even within same paper"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "mcq",
          "paneTitle": "MCQ - All Papers",
          "meta": "Part A — MCQ (20 marks per paper, 1 mark each, OMR sheet)Dec 2025 + May 2025 had MCQs. Jan 2023 had no MCQ section."
        }
      },
      {
        "id": "mcq-may-2025-q18-38",
        "paperId": "may-2025",
        "paperTitle": "May 2025 —",
        "sectionId": "mcq",
        "sectionTitle": "📄 May 2025 — Q1 to Q20 HU1504-1 Open Elective · 6th Sem B.Tech",
        "number": "Q18.",
        "prompt": "Which ceremony is NOT auspicious?Unique",
        "options": [
          {
            "id": "A",
            "text": "oou-shiki",
            "isCorrect": false
          },
          {
            "id": "B",
            "text": "kekkon-shiki (wedding)",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "nyuugaku-shiki (school entry)",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "sotsugyo-shiki  (graduation=farewell)",
            "isCorrect": true
          }
        ],
        "correctAnswer": "D) sotsugyo-shiki  (graduation=farewell)",
        "explanation": [],
        "prediction": {
          "score": 28,
          "label": "Possible — cultural knowledge, appeared once"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "mcq",
          "paneTitle": "MCQ - All Papers",
          "meta": "Part A — MCQ (20 marks per paper, 1 mark each, OMR sheet)Dec 2025 + May 2025 had MCQs. Jan 2023 had no MCQ section."
        }
      },
      {
        "id": "mcq-may-2025-q19-39",
        "paperId": "may-2025",
        "paperTitle": "May 2025 —",
        "sectionId": "mcq",
        "sectionTitle": "📄 May 2025 — Q1 to Q20 HU1504-1 Open Elective · 6th Sem B.Tech",
        "number": "Q19.",
        "prompt": "Suzuki san wa Tanaka san yori wakai. Tanaka san wa Sato san yori wakai. Yamada san wa Tanaka san yori wakai.\nQ: Dare ga ichiban toshi-ue?ALL 3",
        "options": [
          {
            "id": "A",
            "text": "Suzuki",
            "isCorrect": false
          },
          {
            "id": "B",
            "text": "Sato",
            "isCorrect": true
          },
          {
            "id": "C",
            "text": "Tanaka",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "Yamada",
            "isCorrect": false
          }
        ],
        "correctAnswer": "B) Sato",
        "explanation": [
          "Suzuki < Tanaka < Sato (oldest) · Yamada also < Tanaka"
        ],
        "prediction": {
          "score": 94,
          "label": "Near Certain — age-chain comparison in both MCQ papers"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "mcq",
          "paneTitle": "MCQ - All Papers",
          "meta": "Part A — MCQ (20 marks per paper, 1 mark each, OMR sheet)Dec 2025 + May 2025 had MCQs. Jan 2023 had no MCQ section."
        }
      },
      {
        "id": "mcq-may-2025-q20-40",
        "paperId": "may-2025",
        "paperTitle": "May 2025 —",
        "sectionId": "mcq",
        "sectionTitle": "📄 May 2025 — Q1 to Q20 HU1504-1 Open Elective · 6th Sem B.Tech",
        "number": "Q20.",
        "prompt": "Doubutsu-en niwa shimauma to kujaku to zou to shika ga imasu. Saru ya tora ya uma wa imasen. Q: Nani ga imasuka?ALL 3",
        "options": [
          {
            "id": "A",
            "text": "monkey & tiger",
            "isCorrect": false
          },
          {
            "id": "B",
            "text": "horse & zebra",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "elephant & monkey",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "peacock & deer",
            "isCorrect": true
          }
        ],
        "correctAnswer": "D) peacock & deer",
        "explanation": [],
        "prediction": {
          "score": 95,
          "label": "Near Certain — identical in both MCQ papers"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "mcq",
          "paneTitle": "MCQ - All Papers",
          "meta": "Part A — MCQ (20 marks per paper, 1 mark each, OMR sheet)Dec 2025 + May 2025 had MCQs. Jan 2023 had no MCQ section."
        }
      }
    ]
  },
  {
    "id": "may-2026-16-may-2026-hu1504-1-introduction-to-japanese-language-open-elective",
    "title": "May 2026 / 16 May 2026 — HU1504-1 Introduction to Japanese Language (Open Elective)",
    "source": "Japanese_Practice_QBank.html",
    "sections": [
      {
        "id": "mcq-may-2026-16-may-2026-hu1504-1-introduction-to-japanese-language-open-elective-q1",
        "pane": "mcq",
        "title": "📄 May 2026 / 16 May 2026 — HU1504-1 Introduction to Japanese Language (Open Elective) Q1 to Q20 · Book-confirmed"
      }
    ],
    "questions": [
      {
        "id": "mcq-may-2026-16-may-2026-hu1504-1-introduction-to-japanese-language-open-elective-q1-41",
        "paperId": "may-2026-16-may-2026-hu1504-1-introduction-to-japanese-language-open-elective",
        "paperTitle": "May 2026 / 16 May 2026 — HU1504-1 Introduction to Japanese Language (Open Elective)",
        "sectionId": "mcq",
        "sectionTitle": "📄 May 2026 / 16 May 2026 — HU1504-1 Introduction to Japanese Language (Open Elective) Q1 to Q20 · Book-confirmed",
        "number": "Q1.",
        "prompt": "Which Kanji means \"water\"?May 2026",
        "options": [
          {
            "id": "A",
            "text": "泳",
            "isCorrect": false
          },
          {
            "id": "B",
            "text": "木",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "氷",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "水",
            "isCorrect": true
          }
        ],
        "correctAnswer": "D) 水",
        "explanation": [
          "水 = mizu = water.",
          "Book source: Appendix Kanji, PDF pp.66-80 / book pp.62-76."
        ],
        "prediction": {
          "score": 85,
          "label": "Very Likely — basic Kanji identification format"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "mcq",
          "paneTitle": "MCQ - All Papers",
          "meta": "Part A — MCQ (20 marks per paper, 1 mark each, OMR sheet)Dec 2025 + May 2025 had MCQs. Jan 2023 had no MCQ section."
        }
      },
      {
        "id": "mcq-may-2026-16-may-2026-hu1504-1-introduction-to-japanese-language-open-elective-q2-42",
        "paperId": "may-2026-16-may-2026-hu1504-1-introduction-to-japanese-language-open-elective",
        "paperTitle": "May 2026 / 16 May 2026 — HU1504-1 Introduction to Japanese Language (Open Elective)",
        "sectionId": "mcq",
        "sectionTitle": "📄 May 2026 / 16 May 2026 — HU1504-1 Introduction to Japanese Language (Open Elective) Q1 to Q20 · Book-confirmed",
        "number": "Q2.",
        "prompt": "Which word means \"to suit\"?May 2026",
        "options": [
          {
            "id": "A",
            "text": "miau",
            "isCorrect": false
          },
          {
            "id": "B",
            "text": "iau",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "niau",
            "isCorrect": true
          },
          {
            "id": "D",
            "text": "piau",
            "isCorrect": false
          }
        ],
        "correctAnswer": "C) niau",
        "explanation": [
          "niau = to suit.",
          "Book source: Lesson 8 Adjectives, PDF pp.23-26 / book pp.19-22."
        ],
        "prediction": {
          "score": 87,
          "label": "Very Likely — repeats earlier SEE paper format"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "mcq",
          "paneTitle": "MCQ - All Papers",
          "meta": "Part A — MCQ (20 marks per paper, 1 mark each, OMR sheet)Dec 2025 + May 2025 had MCQs. Jan 2023 had no MCQ section."
        }
      },
      {
        "id": "mcq-may-2026-16-may-2026-hu1504-1-introduction-to-japanese-language-open-elective-q3-43",
        "paperId": "may-2026-16-may-2026-hu1504-1-introduction-to-japanese-language-open-elective",
        "paperTitle": "May 2026 / 16 May 2026 — HU1504-1 Introduction to Japanese Language (Open Elective)",
        "sectionId": "mcq",
        "sectionTitle": "📄 May 2026 / 16 May 2026 — HU1504-1 Introduction to Japanese Language (Open Elective) Q1 to Q20 · Book-confirmed",
        "number": "Q3.",
        "prompt": "Watashi niwa ani ga hitori to, imouto ga futari imasu.\nQ: Watashi wa nan-nin kyoudai desuka?May 2026 ⭐",
        "options": [
          {
            "id": "A",
            "text": "yonin",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "sannin",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "gonin",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "futari",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A) yonin",
        "explanation": [
          "ani hitori + imouto futari + watashi = 4 children/siblings total.",
          "Answer: yonin.",
          "Fix note: Count the speaker too for nan-nin kyoudai. Book defines kyoudai as total number of children in the family.",
          "Book source: Lessons 3, 7, 19 (Family)."
        ],
        "prediction": {
          "score": 93,
          "label": "Near Certain — kyoudai count includes the speaker"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "mcq",
          "paneTitle": "MCQ - All Papers",
          "meta": "Part A — MCQ (20 marks per paper, 1 mark each, OMR sheet)Dec 2025 + May 2025 had MCQs. Jan 2023 had no MCQ section."
        }
      },
      {
        "id": "mcq-may-2026-16-may-2026-hu1504-1-introduction-to-japanese-language-open-elective-q4-44",
        "paperId": "may-2026-16-may-2026-hu1504-1-introduction-to-japanese-language-open-elective",
        "paperTitle": "May 2026 / 16 May 2026 — HU1504-1 Introduction to Japanese Language (Open Elective)",
        "sectionId": "mcq",
        "sectionTitle": "📄 May 2026 / 16 May 2026 — HU1504-1 Introduction to Japanese Language (Open Elective) Q1 to Q20 · Book-confirmed",
        "number": "Q4.",
        "prompt": "Koko ni ringo ga kokonotsu arimashita. Watashi wa sore o mittsu tabemashita.\nQ: Ima ringo wa ikutsu arimasuka?May 2026",
        "options": [
          {
            "id": "A",
            "text": "yottsu",
            "isCorrect": false
          },
          {
            "id": "B",
            "text": "muttsu",
            "isCorrect": true
          },
          {
            "id": "C",
            "text": "mittsu",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "nanatsu",
            "isCorrect": false
          }
        ],
        "correctAnswer": "B) muttsu",
        "explanation": [
          "kokonotsu(9) − mittsu(3) = muttsu(6).",
          "Book source: Lessons 2, 3, 7 + Appendix Numbers."
        ],
        "prediction": {
          "score": 94,
          "label": "Near Certain — subtraction-counting pattern repeats"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "mcq",
          "paneTitle": "MCQ - All Papers",
          "meta": "Part A — MCQ (20 marks per paper, 1 mark each, OMR sheet)Dec 2025 + May 2025 had MCQs. Jan 2023 had no MCQ section."
        }
      },
      {
        "id": "mcq-may-2026-16-may-2026-hu1504-1-introduction-to-japanese-language-open-elective-q5-45",
        "paperId": "may-2026-16-may-2026-hu1504-1-introduction-to-japanese-language-open-elective",
        "paperTitle": "May 2026 / 16 May 2026 — HU1504-1 Introduction to Japanese Language (Open Elective)",
        "sectionId": "mcq",
        "sectionTitle": "📄 May 2026 / 16 May 2026 — HU1504-1 Introduction to Japanese Language (Open Elective) Q1 to Q20 · Book-confirmed",
        "number": "Q5.",
        "prompt": "Which word means \"to play musical instruments\"?May 2026",
        "options": [
          {
            "id": "A",
            "text": "kiku",
            "isCorrect": false
          },
          {
            "id": "B",
            "text": "hiku",
            "isCorrect": true
          },
          {
            "id": "C",
            "text": "shiku",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "niku",
            "isCorrect": false
          }
        ],
        "correctAnswer": "B) hiku",
        "explanation": [
          "hiku = to play musical instruments.",
          "Book source: Lessons 10, 11, 12 (Hobby / dekiru / -tai)."
        ],
        "prediction": {
          "score": 85,
          "label": "Very Likely — sound-alike verb category"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "mcq",
          "paneTitle": "MCQ - All Papers",
          "meta": "Part A — MCQ (20 marks per paper, 1 mark each, OMR sheet)Dec 2025 + May 2025 had MCQs. Jan 2023 had no MCQ section."
        }
      },
      {
        "id": "mcq-may-2026-16-may-2026-hu1504-1-introduction-to-japanese-language-open-elective-q6-46",
        "paperId": "may-2026-16-may-2026-hu1504-1-introduction-to-japanese-language-open-elective",
        "paperTitle": "May 2026 / 16 May 2026 — HU1504-1 Introduction to Japanese Language (Open Elective)",
        "sectionId": "mcq",
        "sectionTitle": "📄 May 2026 / 16 May 2026 — HU1504-1 Introduction to Japanese Language (Open Elective) Q1 to Q20 · Book-confirmed",
        "number": "Q6.",
        "prompt": "Which one means \"had better\"?May 2026",
        "options": [
          {
            "id": "A",
            "text": "beki",
            "isCorrect": false
          },
          {
            "id": "B",
            "text": "-ta hou ga ii",
            "isCorrect": true
          },
          {
            "id": "C",
            "text": "koto ga arimasu",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "suru deshou",
            "isCorrect": false
          }
        ],
        "correctAnswer": "B) -ta hou ga ii",
        "explanation": [
          "-ta hou ga ii = had better.",
          "Book source: Lessons 15-20."
        ],
        "prediction": {
          "score": 95,
          "label": "Near Certain — same item in 3+ SEE papers"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "mcq",
          "paneTitle": "MCQ - All Papers",
          "meta": "Part A — MCQ (20 marks per paper, 1 mark each, OMR sheet)Dec 2025 + May 2025 had MCQs. Jan 2023 had no MCQ section."
        }
      },
      {
        "id": "mcq-may-2026-16-may-2026-hu1504-1-introduction-to-japanese-language-open-elective-q7-47",
        "paperId": "may-2026-16-may-2026-hu1504-1-introduction-to-japanese-language-open-elective",
        "paperTitle": "May 2026 / 16 May 2026 — HU1504-1 Introduction to Japanese Language (Open Elective)",
        "sectionId": "mcq",
        "sectionTitle": "📄 May 2026 / 16 May 2026 — HU1504-1 Introduction to Japanese Language (Open Elective) Q1 to Q20 · Book-confirmed",
        "number": "Q7.",
        "prompt": "Kinou wa kin-youbi deshita. Dewa asatte wa nan-youbi desuka?May 2026 ⭐",
        "options": [
          {
            "id": "A",
            "text": "do-youbi",
            "isCorrect": false
          },
          {
            "id": "B",
            "text": "nichi-youbi",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "getsu-youbi",
            "isCorrect": true
          },
          {
            "id": "D",
            "text": "ka-youbi",
            "isCorrect": false
          }
        ],
        "correctAnswer": "C) getsu-youbi",
        "explanation": [
          "kinou = yesterday; kin-youbi = Friday.",
          "If yesterday was Friday → today = Saturday → asatte = Monday.",
          "Answer: getsu-youbi.",
          "Fix note: Do not reuse nichi-youbi from a different pattern; this version says \"Kinou wa kin-youbi\".",
          "Book source: Lessons 2, 3, 7 + Appendix Numbers."
        ],
        "prediction": {
          "score": 91,
          "label": "Near Certain — day-of-week calculation"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "mcq",
          "paneTitle": "MCQ - All Papers",
          "meta": "Part A — MCQ (20 marks per paper, 1 mark each, OMR sheet)Dec 2025 + May 2025 had MCQs. Jan 2023 had no MCQ section."
        }
      },
      {
        "id": "mcq-may-2026-16-may-2026-hu1504-1-introduction-to-japanese-language-open-elective-q8-48",
        "paperId": "may-2026-16-may-2026-hu1504-1-introduction-to-japanese-language-open-elective",
        "paperTitle": "May 2026 / 16 May 2026 — HU1504-1 Introduction to Japanese Language (Open Elective)",
        "sectionId": "mcq",
        "sectionTitle": "📄 May 2026 / 16 May 2026 — HU1504-1 Introduction to Japanese Language (Open Elective) Q1 to Q20 · Book-confirmed",
        "number": "Q8.",
        "prompt": "Which vehicle can fly in the sky?May 2026",
        "options": [
          {
            "id": "A",
            "text": "ressha",
            "isCorrect": false
          },
          {
            "id": "B",
            "text": "jitensha",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "fune",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "hikouki",
            "isCorrect": true
          }
        ],
        "correctAnswer": "D) hikouki",
        "explanation": [
          "hikouki = airplane.",
          "Book source: Lessons 2, 3, 7 + Appendix Numbers."
        ],
        "prediction": {
          "score": 95,
          "label": "Near Certain — repeats across all SEE papers"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "mcq",
          "paneTitle": "MCQ - All Papers",
          "meta": "Part A — MCQ (20 marks per paper, 1 mark each, OMR sheet)Dec 2025 + May 2025 had MCQs. Jan 2023 had no MCQ section."
        }
      },
      {
        "id": "mcq-may-2026-16-may-2026-hu1504-1-introduction-to-japanese-language-open-elective-q9-49",
        "paperId": "may-2026-16-may-2026-hu1504-1-introduction-to-japanese-language-open-elective",
        "paperTitle": "May 2026 / 16 May 2026 — HU1504-1 Introduction to Japanese Language (Open Elective)",
        "sectionId": "mcq",
        "sectionTitle": "📄 May 2026 / 16 May 2026 — HU1504-1 Introduction to Japanese Language (Open Elective) Q1 to Q20 · Book-confirmed",
        "number": "Q9.",
        "prompt": "Which word means \"to smell\"?May 2026",
        "options": [
          {
            "id": "A",
            "text": "kagu",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "nugu",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "kiku",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "hiku",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A) kagu",
        "explanation": [
          "kagu = to smell.",
          "Book source: Lesson 13 Body/Color/Features."
        ],
        "prediction": {
          "score": 80,
          "label": "Very Likely — same item in Dec 2025"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "mcq",
          "paneTitle": "MCQ - All Papers",
          "meta": "Part A — MCQ (20 marks per paper, 1 mark each, OMR sheet)Dec 2025 + May 2025 had MCQs. Jan 2023 had no MCQ section."
        }
      },
      {
        "id": "mcq-may-2026-16-may-2026-hu1504-1-introduction-to-japanese-language-open-elective-q10-50",
        "paperId": "may-2026-16-may-2026-hu1504-1-introduction-to-japanese-language-open-elective",
        "paperTitle": "May 2026 / 16 May 2026 — HU1504-1 Introduction to Japanese Language (Open Elective)",
        "sectionId": "mcq",
        "sectionTitle": "📄 May 2026 / 16 May 2026 — HU1504-1 Introduction to Japanese Language (Open Elective) Q1 to Q20 · Book-confirmed",
        "number": "Q10.",
        "prompt": "Which word means \"to take off\" (clothes, shoes)?May 2026",
        "options": [
          {
            "id": "A",
            "text": "hagu",
            "isCorrect": false
          },
          {
            "id": "B",
            "text": "fugu",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "tsugu",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "nugu",
            "isCorrect": true
          }
        ],
        "correctAnswer": "D) nugu",
        "explanation": [
          "nugu = to take off clothes/shoes.",
          "Book source: Lessons 15-20."
        ],
        "prediction": {
          "score": 80,
          "label": "Very Likely — repeats Dec 2025 format"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "mcq",
          "paneTitle": "MCQ - All Papers",
          "meta": "Part A — MCQ (20 marks per paper, 1 mark each, OMR sheet)Dec 2025 + May 2025 had MCQs. Jan 2023 had no MCQ section."
        }
      },
      {
        "id": "mcq-may-2026-16-may-2026-hu1504-1-introduction-to-japanese-language-open-elective-q11-51",
        "paperId": "may-2026-16-may-2026-hu1504-1-introduction-to-japanese-language-open-elective",
        "paperTitle": "May 2026 / 16 May 2026 — HU1504-1 Introduction to Japanese Language (Open Elective)",
        "sectionId": "mcq",
        "sectionTitle": "📄 May 2026 / 16 May 2026 — HU1504-1 Introduction to Japanese Language (Open Elective) Q1 to Q20 · Book-confirmed",
        "number": "Q11.",
        "prompt": "When translating \"Where is the station?\", which word fills the ★ position?\nEki wa ★ desuka?May 2026",
        "options": [
          {
            "id": "A",
            "text": "wa",
            "isCorrect": false
          },
          {
            "id": "B",
            "text": "desuka",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "eki",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "doko",
            "isCorrect": true
          }
        ],
        "correctAnswer": "D) doko",
        "explanation": [
          "Eki wa doko desuka? = Where is the station?",
          "Book source: Lesson 4 + Lesson 16."
        ],
        "prediction": {
          "score": 90,
          "label": "Near Certain — ★ word-order format in 3+ papers"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "mcq",
          "paneTitle": "MCQ - All Papers",
          "meta": "Part A — MCQ (20 marks per paper, 1 mark each, OMR sheet)Dec 2025 + May 2025 had MCQs. Jan 2023 had no MCQ section."
        }
      },
      {
        "id": "mcq-may-2026-16-may-2026-hu1504-1-introduction-to-japanese-language-open-elective-q12-52",
        "paperId": "may-2026-16-may-2026-hu1504-1-introduction-to-japanese-language-open-elective",
        "paperTitle": "May 2026 / 16 May 2026 — HU1504-1 Introduction to Japanese Language (Open Elective)",
        "sectionId": "mcq",
        "sectionTitle": "📄 May 2026 / 16 May 2026 — HU1504-1 Introduction to Japanese Language (Open Elective) Q1 to Q20 · Book-confirmed",
        "number": "Q12.",
        "prompt": "Which word means \"should\"?May 2026",
        "options": [
          {
            "id": "A",
            "text": "hou ga ii",
            "isCorrect": false
          },
          {
            "id": "B",
            "text": "deshou",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "kamo",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "beki",
            "isCorrect": true
          }
        ],
        "correctAnswer": "D) beki",
        "explanation": [
          "beki = should/ought to.",
          "Book source: Lessons 15-20."
        ],
        "prediction": {
          "score": 95,
          "label": "Near Certain — same item every paper"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "mcq",
          "paneTitle": "MCQ - All Papers",
          "meta": "Part A — MCQ (20 marks per paper, 1 mark each, OMR sheet)Dec 2025 + May 2025 had MCQs. Jan 2023 had no MCQ section."
        }
      },
      {
        "id": "mcq-may-2026-16-may-2026-hu1504-1-introduction-to-japanese-language-open-elective-q13-53",
        "paperId": "may-2026-16-may-2026-hu1504-1-introduction-to-japanese-language-open-elective",
        "paperTitle": "May 2026 / 16 May 2026 — HU1504-1 Introduction to Japanese Language (Open Elective)",
        "sectionId": "mcq",
        "sectionTitle": "📄 May 2026 / 16 May 2026 — HU1504-1 Introduction to Japanese Language (Open Elective) Q1 to Q20 · Book-confirmed",
        "number": "Q13.",
        "prompt": "Which word means South Korea?May 2026 ⭐",
        "options": [
          {
            "id": "A",
            "text": "Chuugoku",
            "isCorrect": false
          },
          {
            "id": "B",
            "text": "Kitachousen",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "Kankoku",
            "isCorrect": true
          },
          {
            "id": "D",
            "text": "Taiwan",
            "isCorrect": false
          }
        ],
        "correctAnswer": "C) Kankoku",
        "explanation": [
          "Kankoku = South Korea.",
          "Kitachousen = North Korea; Chuugoku = China; Taiwan = Taiwan.",
          "Fix note: This May 2026 question asks South Korea — answer is Kankoku, not Kitachousen.",
          "Book source: Lesson 11 Countries."
        ],
        "prediction": {
          "score": 90,
          "label": "Near Certain — country names tested every paper"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "mcq",
          "paneTitle": "MCQ - All Papers",
          "meta": "Part A — MCQ (20 marks per paper, 1 mark each, OMR sheet)Dec 2025 + May 2025 had MCQs. Jan 2023 had no MCQ section."
        }
      },
      {
        "id": "mcq-may-2026-16-may-2026-hu1504-1-introduction-to-japanese-language-open-elective-q14-54",
        "paperId": "may-2026-16-may-2026-hu1504-1-introduction-to-japanese-language-open-elective",
        "paperTitle": "May 2026 / 16 May 2026 — HU1504-1 Introduction to Japanese Language (Open Elective)",
        "sectionId": "mcq",
        "sectionTitle": "📄 May 2026 / 16 May 2026 — HU1504-1 Introduction to Japanese Language (Open Elective) Q1 to Q20 · Book-confirmed",
        "number": "Q14.",
        "prompt": "Which word means \"to measure\"?May 2026",
        "options": [
          {
            "id": "A",
            "text": "hakaru",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "hikaru",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "shikaru",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "okoru",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A) hakaru",
        "explanation": [
          "hakaru = to measure.",
          "Book source: Lessons 15-20."
        ],
        "prediction": {
          "score": 78,
          "label": "Very Likely — same item in Dec 2025"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "mcq",
          "paneTitle": "MCQ - All Papers",
          "meta": "Part A — MCQ (20 marks per paper, 1 mark each, OMR sheet)Dec 2025 + May 2025 had MCQs. Jan 2023 had no MCQ section."
        }
      },
      {
        "id": "mcq-may-2026-16-may-2026-hu1504-1-introduction-to-japanese-language-open-elective-q15-55",
        "paperId": "may-2026-16-may-2026-hu1504-1-introduction-to-japanese-language-open-elective",
        "paperTitle": "May 2026 / 16 May 2026 — HU1504-1 Introduction to Japanese Language (Open Elective)",
        "sectionId": "mcq",
        "sectionTitle": "📄 May 2026 / 16 May 2026 — HU1504-1 Introduction to Japanese Language (Open Elective) Q1 to Q20 · Book-confirmed",
        "number": "Q15.",
        "prompt": "How do you express 100,000 in Japanese?May 2026",
        "options": [
          {
            "id": "A",
            "text": "hyakusen",
            "isCorrect": false
          },
          {
            "id": "B",
            "text": "ichilakh",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "issenhyaku",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "juuman",
            "isCorrect": true
          }
        ],
        "correctAnswer": "D) juuman",
        "explanation": [
          "100,000 = juuman.",
          "Book source: Lessons 2, 3, 7 + Appendix Numbers."
        ],
        "prediction": {
          "score": 95,
          "label": "Near Certain — identical across SEE papers"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "mcq",
          "paneTitle": "MCQ - All Papers",
          "meta": "Part A — MCQ (20 marks per paper, 1 mark each, OMR sheet)Dec 2025 + May 2025 had MCQs. Jan 2023 had no MCQ section."
        }
      },
      {
        "id": "mcq-may-2026-16-may-2026-hu1504-1-introduction-to-japanese-language-open-elective-q16-56",
        "paperId": "may-2026-16-may-2026-hu1504-1-introduction-to-japanese-language-open-elective",
        "paperTitle": "May 2026 / 16 May 2026 — HU1504-1 Introduction to Japanese Language (Open Elective)",
        "sectionId": "mcq",
        "sectionTitle": "📄 May 2026 / 16 May 2026 — HU1504-1 Introduction to Japanese Language (Open Elective) Q1 to Q20 · Book-confirmed",
        "number": "Q16.",
        "prompt": "Which one is NOT a medical-related word?May 2026",
        "options": [
          {
            "id": "A",
            "text": "kusuri",
            "isCorrect": false
          },
          {
            "id": "B",
            "text": "isha",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "benkyou",
            "isCorrect": true
          },
          {
            "id": "D",
            "text": "nyuuin",
            "isCorrect": false
          }
        ],
        "correctAnswer": "C) benkyou",
        "explanation": [
          "benkyou = study, so it is not medical-related.",
          "kusuri = medicine; isha = doctor; nyuuin = hospitalization.",
          "Book source: Lessons 15-20 + Verb lessons."
        ],
        "prediction": {
          "score": 95,
          "label": "Near Certain — identical across SEE papers"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "mcq",
          "paneTitle": "MCQ - All Papers",
          "meta": "Part A — MCQ (20 marks per paper, 1 mark each, OMR sheet)Dec 2025 + May 2025 had MCQs. Jan 2023 had no MCQ section."
        }
      },
      {
        "id": "mcq-may-2026-16-may-2026-hu1504-1-introduction-to-japanese-language-open-elective-q17-57",
        "paperId": "may-2026-16-may-2026-hu1504-1-introduction-to-japanese-language-open-elective",
        "paperTitle": "May 2026 / 16 May 2026 — HU1504-1 Introduction to Japanese Language (Open Elective)",
        "sectionId": "mcq",
        "sectionTitle": "📄 May 2026 / 16 May 2026 — HU1504-1 Introduction to Japanese Language (Open Elective) Q1 to Q20 · Book-confirmed",
        "number": "Q17.",
        "prompt": "Kyou wa ichi-gatsu mikka desu. Dewa ototoi wa ichi-gatsu nan-nichi deshitaka?May 2026",
        "options": [
          {
            "id": "A",
            "text": "tsuitachi",
            "isCorrect": true
          },
          {
            "id": "B",
            "text": "futsuka",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "yokka",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "itsuka",
            "isCorrect": false
          }
        ],
        "correctAnswer": "A) tsuitachi",
        "explanation": [
          "mikka = 3rd.",
          "ototoi = day before yesterday → 3rd − 2 days = 1st.",
          "1st = tsuitachi.",
          "Book source: Lessons 2, 3, 7 + Appendix Numbers."
        ],
        "prediction": {
          "score": 88,
          "label": "Near Certain — date calculation repeats"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "mcq",
          "paneTitle": "MCQ - All Papers",
          "meta": "Part A — MCQ (20 marks per paper, 1 mark each, OMR sheet)Dec 2025 + May 2025 had MCQs. Jan 2023 had no MCQ section."
        }
      },
      {
        "id": "mcq-may-2026-16-may-2026-hu1504-1-introduction-to-japanese-language-open-elective-q18-58",
        "paperId": "may-2026-16-may-2026-hu1504-1-introduction-to-japanese-language-open-elective",
        "paperTitle": "May 2026 / 16 May 2026 — HU1504-1 Introduction to Japanese Language (Open Elective)",
        "sectionId": "mcq",
        "sectionTitle": "📄 May 2026 / 16 May 2026 — HU1504-1 Introduction to Japanese Language (Open Elective) Q1 to Q20 · Book-confirmed",
        "number": "Q18.",
        "prompt": "Which word means \"success\"?May 2026",
        "options": [
          {
            "id": "A",
            "text": "heikou",
            "isCorrect": false
          },
          {
            "id": "B",
            "text": "keikou",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "seikou",
            "isCorrect": true
          },
          {
            "id": "D",
            "text": "eikou",
            "isCorrect": false
          }
        ],
        "correctAnswer": "C) seikou",
        "explanation": [
          "seikou = success.",
          "Book source: Lessons 15-20 (Success/Doctor)."
        ],
        "prediction": {
          "score": 82,
          "label": "Very Likely — repeated from Dec 2025"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "mcq",
          "paneTitle": "MCQ - All Papers",
          "meta": "Part A — MCQ (20 marks per paper, 1 mark each, OMR sheet)Dec 2025 + May 2025 had MCQs. Jan 2023 had no MCQ section."
        }
      },
      {
        "id": "mcq-may-2026-16-may-2026-hu1504-1-introduction-to-japanese-language-open-elective-q19-59",
        "paperId": "may-2026-16-may-2026-hu1504-1-introduction-to-japanese-language-open-elective",
        "paperTitle": "May 2026 / 16 May 2026 — HU1504-1 Introduction to Japanese Language (Open Elective)",
        "sectionId": "mcq",
        "sectionTitle": "📄 May 2026 / 16 May 2026 — HU1504-1 Introduction to Japanese Language (Open Elective) Q1 to Q20 · Book-confirmed",
        "number": "Q19.",
        "prompt": "Abe san wa Chen san yori wakai desu. Chen san wa Ben san yori wakai desu. Yamada san wa Chen san yori wakai desu.\nQ: Dare ga ichiban toshi-ue desuka?May 2026",
        "options": [
          {
            "id": "A",
            "text": "Abe",
            "isCorrect": false
          },
          {
            "id": "B",
            "text": "Ben",
            "isCorrect": true
          },
          {
            "id": "C",
            "text": "Chen",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "Yamada",
            "isCorrect": false
          }
        ],
        "correctAnswer": "B) Ben",
        "explanation": [
          "Abe is younger than Chen.",
          "Chen is younger than Ben.",
          "Yamada is younger than Chen.",
          "Therefore Ben is the oldest.",
          "Book source: Lesson 10 Comparison."
        ],
        "prediction": {
          "score": 94,
          "label": "Near Certain — age-chain repeats across SEE papers"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "mcq",
          "paneTitle": "MCQ - All Papers",
          "meta": "Part A — MCQ (20 marks per paper, 1 mark each, OMR sheet)Dec 2025 + May 2025 had MCQs. Jan 2023 had no MCQ section."
        }
      },
      {
        "id": "mcq-may-2026-16-may-2026-hu1504-1-introduction-to-japanese-language-open-elective-q20-60",
        "paperId": "may-2026-16-may-2026-hu1504-1-introduction-to-japanese-language-open-elective",
        "paperTitle": "May 2026 / 16 May 2026 — HU1504-1 Introduction to Japanese Language (Open Elective)",
        "sectionId": "mcq",
        "sectionTitle": "📄 May 2026 / 16 May 2026 — HU1504-1 Introduction to Japanese Language (Open Elective) Q1 to Q20 · Book-confirmed",
        "number": "Q20.",
        "prompt": "Rei san wa megane o kakete-ite, se ga takakute, kami ga akakute mijikai desu.\nQ: Which feature matches Rei?May 2026 ⭐",
        "options": [
          {
            "id": "A",
            "text": "Rei has long hair",
            "isCorrect": false
          },
          {
            "id": "B",
            "text": "Rei is short",
            "isCorrect": false
          },
          {
            "id": "C",
            "text": "Rei has blond hair",
            "isCorrect": false
          },
          {
            "id": "D",
            "text": "Rei is nearsighted",
            "isCorrect": true
          }
        ],
        "correctAnswer": "D) Rei is nearsighted",
        "explanation": [
          "megane o kakete imasu = wears specs.",
          "The body-feature lesson connects wearing specs with nearsightedness (me ga warui).",
          "The other options conflict with the sentence: Rei is tall and has short red hair — not short, not blond, not long-haired.",
          "Fix note: Use the feature that matches megane.",
          "Book source: Lesson 13 Body/Color/Features."
        ],
        "prediction": {
          "score": 85,
          "label": "Very Likely — body-feature inference unique to May 2026"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "mcq",
          "paneTitle": "MCQ - All Papers",
          "meta": "Part A — MCQ (20 marks per paper, 1 mark each, OMR sheet)Dec 2025 + May 2025 had MCQs. Jan 2023 had no MCQ section."
        }
      }
    ]
  },
  {
    "id": "dec-2025-unit-i-questions",
    "title": "Dec 2025 — Unit I Questions",
    "source": "Japanese_Practice_QBank.html",
    "sections": [
      {
        "id": "u1-dec-2025-unit-i-questions-q1-q2-q3",
        "pane": "u1",
        "title": "📄 Dec 2025 — Unit I Questions Q1, Q2, Q3"
      }
    ],
    "questions": [
      {
        "id": "u1-dec-2025-unit-i-questions-q1a-61",
        "paperId": "dec-2025-unit-i-questions",
        "paperTitle": "Dec 2025 — Unit I Questions",
        "sectionId": "u1",
        "sectionTitle": "📄 Dec 2025 — Unit I Questions Q1, Q2, Q3",
        "number": "Q1a.",
        "prompt": "Express these times/numbers in Japanese: (5 marks)Pattern ALL",
        "options": [],
        "explanation": [
          "i. 1:29 a.m. → gozen ichi-ji nijuukyuu-fun",
          "ii. 4:30 p.m. → gogo yo-ji han",
          "iii. 11,111 → ichiman-issen-hyaku-juuichi",
          "iv. 6,374 → rokusen-sanbyaku-nanajuu-yon",
          "v. 1956 → sennkyuuhyakugojuuroku"
        ],
        "prediction": {
          "score": 72,
          "label": "Likely — number expression tested frequently"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "u1",
          "paneTitle": "Unit I",
          "meta": "Part B — Unit I · 3 Full Questions per paper × 3 papers = 9 full questionsDec 2025 · Jan 2023 · May 2025 — Sub-parts: 32+32+29 = 93 total across all units"
        }
      },
      {
        "id": "u1-dec-2025-unit-i-questions-q1b-62",
        "paperId": "dec-2025-unit-i-questions",
        "paperTitle": "Dec 2025 — Unit I Questions",
        "sectionId": "u1",
        "sectionTitle": "📄 Dec 2025 — Unit I Questions Q1, Q2, Q3",
        "number": "Q1b.",
        "prompt": "Introduce yourself in 5 sentences. Include hobby and what you are good at. (5 marks)ALL 3 papers",
        "options": [],
        "explanation": [
          "Watashi wa [name] desu. (I am [name].)",
          "Watashi wa [age]-sai desu. (I am [age] years old.)",
          "[City] ni sunde imasu. (I live in [city].)",
          "Suki na koto wa [hobby] desu. (I like [hobby].)",
          "[Skill] ga tokui desu. (I am good at [skill].)"
        ],
        "prediction": {
          "score": 97,
          "label": "Near Certain — self-intro appears in ALL 3 papers, every Unit I"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "u1",
          "paneTitle": "Unit I",
          "meta": "Part B — Unit I · 3 Full Questions per paper × 3 papers = 9 full questionsDec 2025 · Jan 2023 · May 2025 — Sub-parts: 32+32+29 = 93 total across all units"
        }
      },
      {
        "id": "u1-dec-2025-unit-i-questions-q1c-63",
        "paperId": "dec-2025-unit-i-questions",
        "paperTitle": "Dec 2025 — Unit I Questions",
        "sectionId": "u1",
        "sectionTitle": "📄 Dec 2025 — Unit I Questions Q1, Q2, Q3",
        "number": "Q1c.",
        "prompt": "Translate into Japanese/English: (6 marks)",
        "options": [],
        "explanation": [
          "1. I am engineering student. → Watashi wa enjiniaringu no gakusei desu.",
          "2. I went to the sea. → Watashi wa umi ni ikimashita.",
          "3. What time will you come? → Nanji ni kimasu ka?",
          "4. Watashi no nyuushin wa onaji toshi dewa arimasen. → My admission is not the same year.",
          "5. Otera de matsuri wa nigiyaka deshita. → The festival at the temple was lively.",
          "6. Kono kubi-kazari wa watashi no desu. → This necklace is mine."
        ],
        "prediction": {
          "score": 65,
          "label": "Likely — translation sections in every paper"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "u1",
          "paneTitle": "Unit I",
          "meta": "Part B — Unit I · 3 Full Questions per paper × 3 papers = 9 full questionsDec 2025 · Jan 2023 · May 2025 — Sub-parts: 32+32+29 = 93 total across all units"
        }
      },
      {
        "id": "u1-dec-2025-unit-i-questions-q2a-64",
        "paperId": "dec-2025-unit-i-questions",
        "paperTitle": "Dec 2025 — Unit I Questions",
        "sectionId": "u1",
        "sectionTitle": "📄 Dec 2025 — Unit I Questions Q1, Q2, Q3",
        "number": "Q2a.",
        "prompt": "Verb conjugation — \"iku\" (to go): Write 5 forms. (5 marks)ALL 3 papers",
        "options": [],
        "explanation": [
          "1. Eiga ni _______ (I go.) → ikimasu",
          "2. Eiga ni _______ ? (Will you go?) → ikimasu ka?",
          "3. Eiga ni _______ (I went.) *past → ikimashita",
          "4. Eiga ni _______ (I didn't go.) *past neg → ikimasen deshita",
          "5. Eiga ni _______ ? (Will you go?) → ikimasu ka?"
        ],
        "prediction": {
          "score": 95,
          "label": "Near Certain — verb conjugation in EVERY paper, every Unit I"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "u1",
          "paneTitle": "Unit I",
          "meta": "Part B — Unit I · 3 Full Questions per paper × 3 papers = 9 full questionsDec 2025 · Jan 2023 · May 2025 — Sub-parts: 32+32+29 = 93 total across all units"
        }
      },
      {
        "id": "u1-dec-2025-unit-i-questions-q2b-65",
        "paperId": "dec-2025-unit-i-questions",
        "paperTitle": "Dec 2025 — Unit I Questions",
        "sectionId": "u1",
        "sectionTitle": "📄 Dec 2025 — Unit I Questions Q1, Q2, Q3",
        "number": "Q2b.",
        "prompt": "Express today's date in Japanese. (3 marks)",
        "options": [],
        "explanation": [
          "Kyou wa 20XX-nen XX-gatsu XX-nichi (XX-youbi) desu.",
          "e.g. Kyou wa 2026-nen go-gatsu juugo-nichi (kin-youbi) desu."
        ],
        "prediction": {
          "score": 76,
          "label": "Very Likely — date expression appears in multiple papers"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "u1",
          "paneTitle": "Unit I",
          "meta": "Part B — Unit I · 3 Full Questions per paper × 3 papers = 9 full questionsDec 2025 · Jan 2023 · May 2025 — Sub-parts: 32+32+29 = 93 total across all units"
        }
      },
      {
        "id": "u1-dec-2025-unit-i-questions-q2d-66",
        "paperId": "dec-2025-unit-i-questions",
        "paperTitle": "Dec 2025 — Unit I Questions",
        "sectionId": "u1",
        "sectionTitle": "📄 Dec 2025 — Unit I Questions Q1, Q2, Q3",
        "number": "Q2d.",
        "prompt": "Put the correct particle in brackets: (4 marks)ALL 3 papers",
        "options": [],
        "explanation": [
          "1. Watashi ni ringo (to) banana (o) kudasai. (Please give me apple and banana.)",
          "2. Nichiyoubi (ni) Nitte (e/ni) ikimasu. (I go to Nitte on Sunday.)",
          "3. Anata (no) ie ni kuruma (ga) arimaska? (Is there a car in your house?)",
          "4. Udupi (de) kaimono (o) shimasu. (I do shopping in Udupi.)",
          "KEY: wa(topic)·ga(subj)·o(obj)·ni(time/dir)·de(place of action)·no(possessive)·to(and)·e(toward)"
        ],
        "prediction": {
          "score": 92,
          "label": "Near Certain — particle fill appears in every paper's Unit I"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "u1",
          "paneTitle": "Unit I",
          "meta": "Part B — Unit I · 3 Full Questions per paper × 3 papers = 9 full questionsDec 2025 · Jan 2023 · May 2025 — Sub-parts: 32+32+29 = 93 total across all units"
        }
      },
      {
        "id": "u1-dec-2025-unit-i-questions-q3a-67",
        "paperId": "dec-2025-unit-i-questions",
        "paperTitle": "Dec 2025 — Unit I Questions",
        "sectionId": "u1",
        "sectionTitle": "📄 Dec 2025 — Unit I Questions Q1, Q2, Q3",
        "number": "Q3a.",
        "prompt": "Verb conjugation — \"suru\" (to do): (4 marks)ALL 3 papers",
        "options": [],
        "explanation": [
          "1. Benkyou o _______ (I study.) → shimasu",
          "2. Benkyou o _______ (I don't study.) → shimasen",
          "3. Benkyou o _______ (I studied.) *past → shimashita",
          "4. Benkyou o _______ (I didn't study.) *past neg → shimasen deshita"
        ],
        "prediction": {
          "score": 95,
          "label": "Near Certain — suru conjugation tested every paper"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "u1",
          "paneTitle": "Unit I",
          "meta": "Part B — Unit I · 3 Full Questions per paper × 3 papers = 9 full questionsDec 2025 · Jan 2023 · May 2025 — Sub-parts: 32+32+29 = 93 total across all units"
        }
      },
      {
        "id": "u1-dec-2025-unit-i-questions-q3b-68",
        "paperId": "dec-2025-unit-i-questions",
        "paperTitle": "Dec 2025 — Unit I Questions",
        "sectionId": "u1",
        "sectionTitle": "📄 Dec 2025 — Unit I Questions Q1, Q2, Q3",
        "number": "Q3b.",
        "prompt": "Write 10 adjectives with English meaning. (5 marks)ALL 3 papers",
        "options": [],
        "explanation": [
          "takai(expensive/tall)·yasui(cheap)·ookii(big)·chiisai(small)·atarashii(new)·furui(old)",
          "omoshiroi(interesting)·tsumaranai(boring)·muzukashii(difficult)·yasashii(easy/kind)",
          "kawaii(cute)·kowai(scary)·atsui(hot)·samui(cold)·kirei(beautiful)·shizuka(quiet)"
        ],
        "prediction": {
          "score": 95,
          "label": "Near Certain — adjective list in every paper"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "u1",
          "paneTitle": "Unit I",
          "meta": "Part B — Unit I · 3 Full Questions per paper × 3 papers = 9 full questionsDec 2025 · Jan 2023 · May 2025 — Sub-parts: 32+32+29 = 93 total across all units"
        }
      }
    ]
  },
  {
    "id": "jan-2023-unit-i-questions",
    "title": "Jan 2023 — Unit I Questions",
    "source": "Japanese_Practice_QBank.html",
    "sections": [
      {
        "id": "u1-jan-2023-unit-i-questions-19hu8x72-vtu",
        "pane": "u1",
        "title": "📄 Jan 2023 — Unit I Questions 19HU8X72 · VTU"
      }
    ],
    "questions": [
      {
        "id": "u1-jan-2023-unit-i-questions-q1a-69",
        "paperId": "jan-2023-unit-i-questions",
        "paperTitle": "Jan 2023 — Unit I Questions",
        "sectionId": "u1",
        "sectionTitle": "📄 Jan 2023 — Unit I Questions 19HU8X72 · VTU",
        "number": "Q1a.",
        "prompt": "Verb conjugation — \"aru/iru\" (to exist): (5 marks)Pattern ALL",
        "options": [],
        "explanation": [
          "1. Koko ni ie ga _______ (Here is a house.) → arimasu",
          "2. Soko ni ie ga _______ ? (Is there house?) → arimasu ka?",
          "3. Ie _______ (No, there is not.) → arimasen",
          "4. Koko ni ie ga _______ (Here was a house.) → arimashita",
          "5. Koko ni ie wa _______ (There was no house.) → arimasen deshita"
        ],
        "prediction": {
          "score": 95,
          "label": "Near Certain — verb conjugation in every paper's Unit I"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "u1",
          "paneTitle": "Unit I",
          "meta": "Part B — Unit I · 3 Full Questions per paper × 3 papers = 9 full questionsDec 2025 · Jan 2023 · May 2025 — Sub-parts: 32+32+29 = 93 total across all units"
        }
      },
      {
        "id": "u1-jan-2023-unit-i-questions-q1b-70",
        "paperId": "jan-2023-unit-i-questions",
        "paperTitle": "Jan 2023 — Unit I Questions",
        "sectionId": "u1",
        "sectionTitle": "📄 Jan 2023 — Unit I Questions 19HU8X72 · VTU",
        "number": "Q1b.",
        "prompt": "Translate story into English — Keiko's trip: (5 marks)",
        "options": [],
        "explanation": [
          "Watashi wa Keiko desu. Nichiyou-bi ni kazoku to ryokou ni ikimashita. Kirei-na kouen ni ikimashita. Aisukurimu o tabemashita. Shashin mo takusan torimashita. Omiyage mo kaimashita.",
          "→ I am Keiko. On Sunday I went on a trip with my family. I went to a beautiful park. I ate ice cream. I took many photos. I also bought souvenirs."
        ],
        "prediction": {
          "score": 80,
          "label": "Very Likely — story translation in every paper's Unit I"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "u1",
          "paneTitle": "Unit I",
          "meta": "Part B — Unit I · 3 Full Questions per paper × 3 papers = 9 full questionsDec 2025 · Jan 2023 · May 2025 — Sub-parts: 32+32+29 = 93 total across all units"
        }
      },
      {
        "id": "u1-jan-2023-unit-i-questions-q3b-71",
        "paperId": "jan-2023-unit-i-questions",
        "paperTitle": "Jan 2023 — Unit I Questions",
        "sectionId": "u1",
        "sectionTitle": "📄 Jan 2023 — Unit I Questions 19HU8X72 · VTU",
        "number": "Q3b.",
        "prompt": "Re-arrange words to make correct sentences: (5 marks)ALL 3 papers",
        "options": [],
        "explanation": [
          "1. ga onaka, wa, watashi, suki → Watashi wa onaka ga suki desu. (I'm hungry.)",
          "2. kudisai, o, te, migi, ageite → Te o agete kudasai. (Please raise your hand.)",
          "3. mo, tabe, nani, masen, no, asa → Asa nani mo tabemasen. (I don't eat anything in the morning.)",
          "4. o, mise, wa, shimasu, de, kaimono, watashi → Watashi wa mise de kaimono o shimasu. (I shop at the store.)",
          "5. hito, ni, imasu, to, kuruma, asoko → Asoko ni hito to kuruma ga imasu. (There are people and a car over there.)"
        ],
        "prediction": {
          "score": 92,
          "label": "Near Certain — word rearrangement in ALL 3 papers"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "u1",
          "paneTitle": "Unit I",
          "meta": "Part B — Unit I · 3 Full Questions per paper × 3 papers = 9 full questionsDec 2025 · Jan 2023 · May 2025 — Sub-parts: 32+32+29 = 93 total across all units"
        }
      },
      {
        "id": "u1-jan-2023-unit-i-questions-q3c-72",
        "paperId": "jan-2023-unit-i-questions",
        "paperTitle": "Jan 2023 — Unit I Questions",
        "sectionId": "u1",
        "sectionTitle": "📄 Jan 2023 — Unit I Questions 19HU8X72 · VTU",
        "number": "Q3c.",
        "prompt": "Verb conjugation — \"nomu\" (to drink): (5 marks)2 Papers",
        "options": [],
        "explanation": [
          "1. Watashi wa mizu o _______ (I drink.) → nomimasu",
          "2. _______ ? (Will you drink?) → nomimasu ka?",
          "3. Ie _______ (No, I don't drink.) → nomimasen",
          "4. Watashi wa mizu o _______ (I drank.) *past → nomimashita",
          "5. _______ (I didn't drink.) → nomimasen deshita"
        ],
        "prediction": {
          "score": 78,
          "label": "Very Likely — same conjugation pattern, different verb"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "u1",
          "paneTitle": "Unit I",
          "meta": "Part B — Unit I · 3 Full Questions per paper × 3 papers = 9 full questionsDec 2025 · Jan 2023 · May 2025 — Sub-parts: 32+32+29 = 93 total across all units"
        }
      }
    ]
  },
  {
    "id": "may-2025-unit-i-questions",
    "title": "May 2025 — Unit I Questions",
    "source": "Japanese_Practice_QBank.html",
    "sections": [
      {
        "id": "u1-may-2025-unit-i-questions-open-elective",
        "pane": "u1",
        "title": "📄 May 2025 — Unit I Questions Open Elective"
      }
    ],
    "questions": [
      {
        "id": "u1-may-2025-unit-i-questions-q1a-73",
        "paperId": "may-2025-unit-i-questions",
        "paperTitle": "May 2025 — Unit I Questions",
        "sectionId": "u1",
        "sectionTitle": "📄 May 2025 — Unit I Questions Open Elective",
        "number": "Q1a.",
        "prompt": "Verb conjugation — \"kuru\" (to come): (4 marks)Pattern ALL",
        "options": [],
        "explanation": [
          "1. Kare ga _______ (He comes.) → kimasu",
          "2. Kare wa _______ (He doesn't come.) → kimasen",
          "3. Kare wa _______ (He came.) *past → kimashita",
          "4. Kare wa _______ (He didn't come.) *past neg → kimasen deshita"
        ],
        "prediction": {
          "score": 95,
          "label": "Near Certain — verb conjugation in every Unit I"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "u1",
          "paneTitle": "Unit I",
          "meta": "Part B — Unit I · 3 Full Questions per paper × 3 papers = 9 full questionsDec 2025 · Jan 2023 · May 2025 — Sub-parts: 32+32+29 = 93 total across all units"
        }
      },
      {
        "id": "u1-may-2025-unit-i-questions-q3c-74",
        "paperId": "may-2025-unit-i-questions",
        "paperTitle": "May 2025 — Unit I Questions",
        "sectionId": "u1",
        "sectionTitle": "📄 May 2025 — Unit I Questions Open Elective",
        "number": "Q3c.",
        "prompt": "Verb conjugation — \"desu\" (to be): (5 marks)Pattern ALL",
        "options": [],
        "explanation": [
          "1. Kore wa hon _______ (This is a book.) → desu",
          "2. Kore wa hon _______ ? (Is this a book?) → desu ka?",
          "3. Kore wa hon _______ (This is not a book.) → dewa arimasen / ja arimasen",
          "4. Kore wa hon _______ (It was a book.) *past → deshita",
          "5. *past negative → dewa arimasen deshita"
        ],
        "prediction": {
          "score": 95,
          "label": "Near Certain — desu conjugation tested, Unit I every paper"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "u1",
          "paneTitle": "Unit I",
          "meta": "Part B — Unit I · 3 Full Questions per paper × 3 papers = 9 full questionsDec 2025 · Jan 2023 · May 2025 — Sub-parts: 32+32+29 = 93 total across all units"
        }
      },
      {
        "id": "u1-may-2025-unit-i-questions-q3b-75",
        "paperId": "may-2025-unit-i-questions",
        "paperTitle": "May 2025 — Unit I Questions",
        "sectionId": "u1",
        "sectionTitle": "📄 May 2025 — Unit I Questions Open Elective",
        "number": "Q3b.",
        "prompt": "Re-arrange words (May 2025 version): (4 marks)ALL 3 papers",
        "options": [],
        "explanation": [
          "1. atama wa, kuruma, ni, koko, ga → Koko ni watashi no kuruma ga arimasu. (Here is my car.)",
          "2. wa, asa, masen, nani, mo, tabe → Asa nani mo tabemasen. (I don't eat anything in the morning.)",
          "3. imasen wa, dare, ni, koko → Koko ni wa dare mo imasen. (Nobody is here.)",
          "4. desuka, kakkoi, wa, hito, dare → Dare ga kakkoi hito desuka? (Who is that good-looking guy?)"
        ],
        "prediction": {
          "score": 92,
          "label": "Near Certain — word rearrangement in ALL 3 papers"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "u1",
          "paneTitle": "Unit I",
          "meta": "Part B — Unit I · 3 Full Questions per paper × 3 papers = 9 full questionsDec 2025 · Jan 2023 · May 2025 — Sub-parts: 32+32+29 = 93 total across all units"
        }
      }
    ]
  },
  {
    "id": "may-2026-16-may-2026-unit-i-questions",
    "title": "May 2026 / 16 May 2026 — Unit I Questions",
    "source": "Japanese_Practice_QBank.html",
    "sections": [
      {
        "id": "u1-may-2026-16-may-2026-unit-i-questions-hu1504-1-open-elective-q1-q2-q3-book-confi",
        "pane": "u1",
        "title": "📄 May 2026 / 16 May 2026 — Unit I Questions HU1504-1 Open Elective · Q1, Q2, Q3 · Book-confirmed"
      }
    ],
    "questions": [
      {
        "id": "u1-may-2026-16-may-2026-unit-i-questions-q1a-76",
        "paperId": "may-2026-16-may-2026-unit-i-questions",
        "paperTitle": "May 2026 / 16 May 2026 — Unit I Questions",
        "sectionId": "u1",
        "sectionTitle": "📄 May 2026 / 16 May 2026 — Unit I Questions HU1504-1 Open Elective · Q1, Q2, Q3 · Book-confirmed",
        "number": "Q1a.",
        "prompt": "Write correct conjugated form of \"suru\" (to do): (4 marks)May 2026",
        "options": [],
        "explanation": [
          "1) Benkyou o shimasu. = I study.",
          "2) Benkyou o shimasen. = I do not study.",
          "3) Benkyou o shimashita. = I studied.",
          "4) Benkyou o shimasen-deshita. = I did not study.",
          "Book source: Lessons 2, 5, 6 (Verb forms)."
        ],
        "prediction": {
          "score": 95,
          "label": "Near Certain — suru conjugation in every Unit I"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "u1",
          "paneTitle": "Unit I",
          "meta": "Part B — Unit I · 3 Full Questions per paper × 3 papers = 9 full questionsDec 2025 · Jan 2023 · May 2025 — Sub-parts: 32+32+29 = 93 total across all units"
        }
      },
      {
        "id": "u1-may-2026-16-may-2026-unit-i-questions-q1b-77",
        "paperId": "may-2026-16-may-2026-unit-i-questions",
        "paperTitle": "May 2026 / 16 May 2026 — Unit I Questions",
        "sectionId": "u1",
        "sectionTitle": "📄 May 2026 / 16 May 2026 — Unit I Questions HU1504-1 Open Elective · Q1, Q2, Q3 · Book-confirmed",
        "number": "Q1b.",
        "prompt": "Write 10 adjectives with English meaning. (5 marks)May 2026",
        "options": [],
        "explanation": [
          "ookii = big/large · chiisai = small · nagai = long · mijikai = short",
          "takai = expensive/high/tall · yasui = inexpensive/cheap",
          "atarashii = new · furui = old · omoshiroi = interesting/amusing · tsumaranai = uninteresting/boring",
          "kirei = beautiful/clean · shinsetsu = kind",
          "Book source: Lesson 8 Adjectives."
        ],
        "prediction": {
          "score": 95,
          "label": "Near Certain — 10-adjective list in every paper"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "u1",
          "paneTitle": "Unit I",
          "meta": "Part B — Unit I · 3 Full Questions per paper × 3 papers = 9 full questionsDec 2025 · Jan 2023 · May 2025 — Sub-parts: 32+32+29 = 93 total across all units"
        }
      },
      {
        "id": "u1-may-2026-16-may-2026-unit-i-questions-q1c-78",
        "paperId": "may-2026-16-may-2026-unit-i-questions",
        "paperTitle": "May 2026 / 16 May 2026 — Unit I Questions",
        "sectionId": "u1",
        "sectionTitle": "📄 May 2026 / 16 May 2026 — Unit I Questions HU1504-1 Open Elective · Q1, Q2, Q3 · Book-confirmed",
        "number": "Q1c.",
        "prompt": "Read the story and answer: Watashi wa Akira desu. Watashi wa ryoushin to ane ga futari to otouto to sunde imasu. Mondai: Akira san wa nan-nin kazoku desuka? (2 marks)May 2026",
        "options": [],
        "correctAnswer": "Akira san wa roku-nin kazoku desu.",
        "explanation": [
          "ryoushin = parents = 2 people.",
          "ane ga futari = two elder sisters.",
          "otouto = younger brother = 1 person.",
          "Akira = 1 person.",
          "Total: 2 + 2 + 1 + 1 = 6 = roku-nin.",
          "Answer: Akira san wa roku-nin kazoku desu.",
          "Book source: Lessons 3, 7, 19 (Family)."
        ],
        "prediction": {
          "score": 82,
          "label": "Very Likely — family-count story repeats"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "u1",
          "paneTitle": "Unit I",
          "meta": "Part B — Unit I · 3 Full Questions per paper × 3 papers = 9 full questionsDec 2025 · Jan 2023 · May 2025 — Sub-parts: 32+32+29 = 93 total across all units"
        }
      },
      {
        "id": "u1-may-2026-16-may-2026-unit-i-questions-q1d-79",
        "paperId": "may-2026-16-may-2026-unit-i-questions",
        "paperTitle": "May 2026 / 16 May 2026 — Unit I Questions",
        "sectionId": "u1",
        "sectionTitle": "📄 May 2026 / 16 May 2026 — Unit I Questions HU1504-1 Open Elective · Q1, Q2, Q3 · Book-confirmed",
        "number": "Q1d.",
        "prompt": "Translate the story into English: Kinou watashi wa kouen ni ikimashita. Bangalooru no yuumei-na kouen desu. Watashi wa tomodachi to issho ni ikimashita. Kouen ni wa takusan hana ga arimashita. Hana wa totemo kirei deshita. (5 marks)May 2026",
        "options": [],
        "explanation": [
          "Yesterday I went to a park.",
          "It is a famous park in Bangalore.",
          "I went together with my friend.",
          "There were many flowers in the park.",
          "The flowers were very beautiful.",
          "Book source: Lessons 4, 16, 8."
        ],
        "prediction": {
          "score": 80,
          "label": "Very Likely — short story translation in every paper"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "u1",
          "paneTitle": "Unit I",
          "meta": "Part B — Unit I · 3 Full Questions per paper × 3 papers = 9 full questionsDec 2025 · Jan 2023 · May 2025 — Sub-parts: 32+32+29 = 93 total across all units"
        }
      },
      {
        "id": "u1-may-2026-16-may-2026-unit-i-questions-q2a-80",
        "paperId": "may-2026-16-may-2026-unit-i-questions",
        "paperTitle": "May 2026 / 16 May 2026 — Unit I Questions",
        "sectionId": "u1",
        "sectionTitle": "📄 May 2026 / 16 May 2026 — Unit I Questions HU1504-1 Open Elective · Q1, Q2, Q3 · Book-confirmed",
        "number": "Q2a.",
        "prompt": "Write correct conjugated form of \"iku\" (to go): (5 marks)May 2026",
        "options": [],
        "explanation": [
          "1) Eiga ni ikimasu. = I go to a movie.",
          "2) Eiga ni ikimasen. = I do not go to a movie.",
          "3) Eiga ni ikimashita. = I went to a movie.",
          "4) Eiga ni ikimasen-deshita. = I did not go to a movie.",
          "5) Eiga ni ikimasuka? = Will you go to the movie?",
          "Book source: Lessons 2, 5, 6."
        ],
        "prediction": {
          "score": 95,
          "label": "Near Certain — verb conjugation in every Unit I"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "u1",
          "paneTitle": "Unit I",
          "meta": "Part B — Unit I · 3 Full Questions per paper × 3 papers = 9 full questionsDec 2025 · Jan 2023 · May 2025 — Sub-parts: 32+32+29 = 93 total across all units"
        }
      },
      {
        "id": "u1-may-2026-16-may-2026-unit-i-questions-q2b-81",
        "paperId": "may-2026-16-may-2026-unit-i-questions",
        "paperTitle": "May 2026 / 16 May 2026 — Unit I Questions",
        "sectionId": "u1",
        "sectionTitle": "📄 May 2026 / 16 May 2026 — Unit I Questions HU1504-1 Open Elective · Q1, Q2, Q3 · Book-confirmed",
        "number": "Q2b.",
        "prompt": "Express today's date in Japanese (today supplied: 16 May 2026): (3 marks)May 2026",
        "options": [],
        "explanation": [
          "nisen-nijuu-roku-nen = 2026.",
          "go-gatsu = May.",
          "juu-roku-nichi = 16th.",
          "Full answer: Kyou wa nisen-nijuu-roku-nen go-gatsu juu-roku-nichi desu.",
          "Book source: Lessons 2, 3, 7 + Appendix Numbers."
        ],
        "prediction": {
          "score": 93,
          "label": "Near Certain — date expression in every paper"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "u1",
          "paneTitle": "Unit I",
          "meta": "Part B — Unit I · 3 Full Questions per paper × 3 papers = 9 full questionsDec 2025 · Jan 2023 · May 2025 — Sub-parts: 32+32+29 = 93 total across all units"
        }
      },
      {
        "id": "u1-may-2026-16-may-2026-unit-i-questions-q2c-82",
        "paperId": "may-2026-16-may-2026-unit-i-questions",
        "paperTitle": "May 2026 / 16 May 2026 — Unit I Questions",
        "sectionId": "u1",
        "sectionTitle": "📄 May 2026 / 16 May 2026 — Unit I Questions HU1504-1 Open Elective · Q1, Q2, Q3 · Book-confirmed",
        "number": "Q2c.",
        "prompt": "Translate into Japanese / English: (4 marks)May 2026",
        "options": [],
        "explanation": [
          "1) There is a park near my house. → Watashi no ie no chikaku ni kouen ga arimasu.",
          "2) I am 20 years old student. → Watashi wa hatachi no gakusei desu.",
          "3) Kyou no eiga wa tsumarana-katta. → Today's movie was boring / uninteresting.",
          "4) Kanojo wa unten menkyoshou o motte-imasu. → She has a driving license.",
          "Book source: Lessons 3, 7, 19, 8, 15-20."
        ],
        "prediction": {
          "score": 85,
          "label": "Very Likely — translation in every paper"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "u1",
          "paneTitle": "Unit I",
          "meta": "Part B — Unit I · 3 Full Questions per paper × 3 papers = 9 full questionsDec 2025 · Jan 2023 · May 2025 — Sub-parts: 32+32+29 = 93 total across all units"
        }
      },
      {
        "id": "u1-may-2026-16-may-2026-unit-i-questions-q2d-83",
        "paperId": "may-2026-16-may-2026-unit-i-questions",
        "paperTitle": "May 2026 / 16 May 2026 — Unit I Questions",
        "sectionId": "u1",
        "sectionTitle": "📄 May 2026 / 16 May 2026 — Unit I Questions HU1504-1 Open Elective · Q1, Q2, Q3 · Book-confirmed",
        "number": "Q2d.",
        "prompt": "Put the correct particle in brackets: (4 marks)May 2026",
        "options": [],
        "explanation": [
          "1) Watashi ni ringo ( to ) banana ( o ) kudasai. = Please give me apple and banana.",
          "2) Nichiyoubi ( ni ), Nitte ( ni ) ikimasu. = I go to Nitte on Sunday.",
          "3) Watashi ( wa ) Raamen ( ga ) suki desu. = I like Ramen.",
          "4) Udupi ( de ) kaimono ( o ) shimasu. = I do shopping in Udupi.",
          "Book source: Lessons 1-5 (particles wa/no/ka/mo/ni/de/o/ga/to)."
        ],
        "prediction": {
          "score": 95,
          "label": "Near Certain — particle fill-in in every paper"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "u1",
          "paneTitle": "Unit I",
          "meta": "Part B — Unit I · 3 Full Questions per paper × 3 papers = 9 full questionsDec 2025 · Jan 2023 · May 2025 — Sub-parts: 32+32+29 = 93 total across all units"
        }
      },
      {
        "id": "u1-may-2026-16-may-2026-unit-i-questions-q3a-84",
        "paperId": "may-2026-16-may-2026-unit-i-questions",
        "paperTitle": "May 2026 / 16 May 2026 — Unit I Questions",
        "sectionId": "u1",
        "sectionTitle": "📄 May 2026 / 16 May 2026 — Unit I Questions HU1504-1 Open Elective · Q1, Q2, Q3 · Book-confirmed",
        "number": "Q3a.",
        "prompt": "Express these times / numbers in Japanese: 9:30 a.m., 4:49 p.m., 010, 8374, 1956. (5 marks)May 2026",
        "options": [],
        "explanation": [
          "1) 9:30 a.m. → gozen ku-ji sanjuppun.",
          "2) 4:49 p.m. → gogo yo-ji yonjuu-kyuu-fun.",
          "3) 010 → zero-ichi-zero (digit / phone-style as in book pattern).",
          "4) 8374 → hassen sanbyaku nanajuu-yon.",
          "5) 1956 → sen kyuuhyaku gojuu-roku.",
          "Book source: Lessons 2, 3, 7 + Appendix Numbers."
        ],
        "prediction": {
          "score": 95,
          "label": "Near Certain — number/time expression every paper"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "u1",
          "paneTitle": "Unit I",
          "meta": "Part B — Unit I · 3 Full Questions per paper × 3 papers = 9 full questionsDec 2025 · Jan 2023 · May 2025 — Sub-parts: 32+32+29 = 93 total across all units"
        }
      },
      {
        "id": "u1-may-2026-16-may-2026-unit-i-questions-q3b-85",
        "paperId": "may-2026-16-may-2026-unit-i-questions",
        "paperTitle": "May 2026 / 16 May 2026 — Unit I Questions",
        "sectionId": "u1",
        "sectionTitle": "📄 May 2026 / 16 May 2026 — Unit I Questions HU1504-1 Open Elective · Q1, Q2, Q3 · Book-confirmed",
        "number": "Q3b.",
        "prompt": "Introduce yourself in 5 sentences (include hobby and what you are good at). (5 marks)May 2026",
        "options": [],
        "explanation": [
          "Watashi no namae wa [name] desu.",
          "Watashi wa kougakubu no gakusei desu.",
          "Watashi wa [place] ni sunde imasu.",
          "Watashi no shumi wa hon o yomu-koto desu.",
          "Watashi wa supootsu o suru no ga tokui desu.",
          "Book source: Lessons 3, 7, 19, 10, 11, 12."
        ],
        "prediction": {
          "score": 97,
          "label": "Near Certain — self-introduction in every paper"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "u1",
          "paneTitle": "Unit I",
          "meta": "Part B — Unit I · 3 Full Questions per paper × 3 papers = 9 full questionsDec 2025 · Jan 2023 · May 2025 — Sub-parts: 32+32+29 = 93 total across all units"
        }
      },
      {
        "id": "u1-may-2026-16-may-2026-unit-i-questions-q3c-86",
        "paperId": "may-2026-16-may-2026-unit-i-questions",
        "paperTitle": "May 2026 / 16 May 2026 — Unit I Questions",
        "sectionId": "u1",
        "sectionTitle": "📄 May 2026 / 16 May 2026 — Unit I Questions HU1504-1 Open Elective · Q1, Q2, Q3 · Book-confirmed",
        "number": "Q3c.",
        "prompt": "Translate into Japanese / English: (6 marks)May 2026",
        "options": [],
        "explanation": [
          "1) I am an engineering student. → Watashi wa kougakubu no gakusei desu.",
          "2) Today the sky is very blue, isn't it? → Kyou wa sora ga totemo aoi desu ne.",
          "3) What time will the bus come? → Basu wa nan-ji ni kimasuka?",
          "4) Watashi no ryoushin wa onaji toshi dewa arimasen. → My parents are not the same age.",
          "5) Otera no matsuri wa nigiyaka deshita. → The temple festival was lively.",
          "6) Kono kubi-kazari wa watashi no desu. → This necklace is mine.",
          "Book source: Lessons 3, 7, 19, 2, 8, 13."
        ],
        "prediction": {
          "score": 88,
          "label": "Near Certain — 6-item translate set in every paper"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "u1",
          "paneTitle": "Unit I",
          "meta": "Part B — Unit I · 3 Full Questions per paper × 3 papers = 9 full questionsDec 2025 · Jan 2023 · May 2025 — Sub-parts: 32+32+29 = 93 total across all units"
        }
      }
    ]
  },
  {
    "id": "all-papers-unit-ii",
    "title": "All papers — Unit II",
    "source": "Japanese_Practice_QBank.html",
    "sections": [
      {
        "id": "u2-all-papers-unit-ii-q4-sub-parts-b-c-identical-in-dec-2025-and-jan-2023",
        "pane": "u2",
        "title": "📄 All papers — Unit II Q4 Sub-parts b & c IDENTICAL in Dec 2025 and Jan 2023"
      },
      {
        "id": "u2-all-papers-unit-ii-q5",
        "pane": "u2",
        "title": "📄 All papers — Unit II Q5"
      },
      {
        "id": "u2-all-papers-unit-ii-q6",
        "pane": "u2",
        "title": "📄 All papers — Unit II Q6"
      }
    ],
    "questions": [
      {
        "id": "u2-all-papers-unit-ii-q4a-87",
        "paperId": "all-papers-unit-ii",
        "paperTitle": "All papers — Unit II",
        "sectionId": "u2",
        "sectionTitle": "📄 All papers — Unit II Q4 Sub-parts b & c IDENTICAL in Dec 2025 and Jan 2023",
        "number": "Q4a.",
        "prompt": "Write 10 food items in Japanese with English meaning. (5 marks)ALL 3 papers",
        "options": [],
        "explanation": [
          "gohan(rice)·pan(bread)·niku(meat)·sakana(fish)·tamago(egg)·kudamono(fruit)",
          "yasai(vegetable)·ocha(green tea)·koohii(coffee)·mizu(water)·ramen·sushi·udon·miso shiru"
        ],
        "prediction": {
          "score": 95,
          "label": "Near Certain — food items in ALL 3 papers' Unit II"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "u2",
          "paneTitle": "Unit II",
          "meta": "Part B — Unit II · Most repeated section — some sub-questions are WORD-FOR-WORD IDENTICAL across 2 papers"
        }
      },
      {
        "id": "u2-all-papers-unit-ii-q4b-88",
        "paperId": "all-papers-unit-ii",
        "paperTitle": "All papers — Unit II",
        "sectionId": "u2",
        "sectionTitle": "📄 All papers — Unit II Q4 Sub-parts b & c IDENTICAL in Dec 2025 and Jan 2023",
        "number": "Q4b. ⭐",
        "prompt": "Translate into Japanese — IDENTICAL in Dec 2025 & Jan 2023: (5 marks)ALL 3 papers",
        "options": [],
        "explanation": [
          "1. Today's question was easy. → Kyou no mondai wa yasashikatta desu.",
          "2. This book is not interesting. → Kono hon wa omoshirokunai desu.",
          "3. This mobile was cheap. → Kono keitai wa yasukatta desu.",
          "4. Please be quiet. → Shizuka ni shite kudasai.",
          "5. It becomes cold. → Samuku narimasu."
        ],
        "prediction": {
          "score": 97,
          "label": "Near Certain — WORD-FOR-WORD IDENTICAL in 2 of 3 papers. Memorize these exact translations."
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "u2",
          "paneTitle": "Unit II",
          "meta": "Part B — Unit II · Most repeated section — some sub-questions are WORD-FOR-WORD IDENTICAL across 2 papers"
        }
      },
      {
        "id": "u2-all-papers-unit-ii-q4c-89",
        "paperId": "all-papers-unit-ii",
        "paperTitle": "All papers — Unit II",
        "sectionId": "u2",
        "sectionTitle": "📄 All papers — Unit II Q4 Sub-parts b & c IDENTICAL in Dec 2025 and Jan 2023",
        "number": "Q4c. ⭐",
        "prompt": "Counter suffix — IDENTICAL in Dec 2025 & Jan 2023: (4-5 marks)ALL 3 papers",
        "options": [],
        "explanation": [
          "1. 5( )no kodomo → go-nin (people)",
          "2. 1( )no kuruma → ichi-dai (machine)",
          "3. 1( )no saru → ichi-hiki (small animal)",
          "4. 3( )no mizu → san-bai (cup/glass)",
          "5. 2( )no kami → ni-mai (flat sheet)",
          "6. 3( )no kutsushita → san-zoku (pair of footwear)",
          "7. 2( )no zou → ni-tou (large animal)",
          "8. 2( )no ringo → ni-ko (small object)",
          "9. 1( )no hon → is-satsu (book)",
          "10. 2( )no fuku → ni-chaku (clothes)"
        ],
        "prediction": {
          "score": 95,
          "label": "Near Certain — SAME 10 items appeared in 2 of 3 papers"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "u2",
          "paneTitle": "Unit II",
          "meta": "Part B — Unit II · Most repeated section — some sub-questions are WORD-FOR-WORD IDENTICAL across 2 papers"
        }
      },
      {
        "id": "u2-all-papers-unit-ii-q5a-90",
        "paperId": "all-papers-unit-ii",
        "paperTitle": "All papers — Unit II",
        "sectionId": "u2",
        "sectionTitle": "📄 All papers — Unit II Q5",
        "number": "Q5a.",
        "prompt": "Write 10 adjectives with English meaning. (5 marks)ALL 3 papers",
        "options": [],
        "explanation": [
          "takai·yasui·ookii·chiisai·atarashii·furui·ii·warui·omoshiroi·tsumaranai·muzukashii·yasashii·kawaii·atsui·samui·kirei·shizuka·nigiyaka·kowai·oishii"
        ],
        "prediction": {
          "score": 97,
          "label": "Near Certain — adjective list in ALL 3 papers, Unit II"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "u2",
          "paneTitle": "Unit II",
          "meta": "Part B — Unit II · Most repeated section — some sub-questions are WORD-FOR-WORD IDENTICAL across 2 papers"
        }
      },
      {
        "id": "u2-all-papers-unit-ii-q5b-91",
        "paperId": "all-papers-unit-ii",
        "paperTitle": "All papers — Unit II",
        "sectionId": "u2",
        "sectionTitle": "📄 All papers — Unit II Q5",
        "number": "Q5b. ⭐",
        "prompt": "Translate into Japanese — IDENTICAL in Dec 2025 & Jan 2023: (5 marks)ALL 3 papers",
        "options": [],
        "explanation": [
          "1. I don't want worries of illness. → Byouki no nayami wa irimasen.",
          "2. I want post office job. → Yuubinkyoku no shigoto ga hoshii desu.",
          "3. I want to drive a car. → Kuruma o unten shitai desu.",
          "4. He can't swim. → Kare wa oyogu koto ga dekimasen.",
          "5. What does it mean? → Dou iu imi desuka?"
        ],
        "prediction": {
          "score": 95,
          "label": "Near Certain — WORD-FOR-WORD IDENTICAL in 2 of 3 papers"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "u2",
          "paneTitle": "Unit II",
          "meta": "Part B — Unit II · Most repeated section — some sub-questions are WORD-FOR-WORD IDENTICAL across 2 papers"
        }
      },
      {
        "id": "u2-all-papers-unit-ii-q5c-92",
        "paperId": "all-papers-unit-ii",
        "paperTitle": "All papers — Unit II",
        "sectionId": "u2",
        "sectionTitle": "📄 All papers — Unit II Q5",
        "number": "Q5c. ⭐",
        "prompt": "Read story → choose correct answer (3 stories) — IDENTICAL in Dec 2025 & Jan 2023:ALL 3 papers",
        "options": [],
        "explanation": [
          "Story 1: Zoo has zou/tora/raion/kujaku/shimauma. Saru/hato absent. Q: What animals are there? → zebra & peacock (shimauma to kujaku)",
          "Story 2: A wa B yori ookii. C yori D ga ookii. A wa D yori chiisai. Q: Which is biggest? → B",
          "Story 3: Watashi wa fuku to gakki o kaimashita. Q: What did I buy? → clothes and musical instruments"
        ],
        "prediction": {
          "score": 93,
          "label": "Near Certain — IDENTICAL 3 stories in 2 papers. Know these cold."
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "u2",
          "paneTitle": "Unit II",
          "meta": "Part B — Unit II · Most repeated section — some sub-questions are WORD-FOR-WORD IDENTICAL across 2 papers"
        }
      },
      {
        "id": "u2-all-papers-unit-ii-q5d-93",
        "paperId": "all-papers-unit-ii",
        "paperTitle": "All papers — Unit II",
        "sectionId": "u2",
        "sectionTitle": "📄 All papers — Unit II Q5",
        "number": "Q5d.",
        "prompt": "Describe about your family members in 4–6 sentences. (4-6 marks)ALL 3 papers",
        "options": [],
        "explanation": [
          "Watashi no kazoku wa [X]-nin desu. / Chichi wa [age]-sai de, [job] desu.",
          "Haha wa [age]-sai de, [description] desu. / Ani/Ane/Otouto/Imouto wa [age]-sai desu.",
          "Include: size of family, ages, jobs, hobbies or personality traits."
        ],
        "prediction": {
          "score": 88,
          "label": "Near Certain — family description in ALL 3 papers, Unit II"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "u2",
          "paneTitle": "Unit II",
          "meta": "Part B — Unit II · Most repeated section — some sub-questions are WORD-FOR-WORD IDENTICAL across 2 papers"
        }
      },
      {
        "id": "u2-all-papers-unit-ii-q6a-94",
        "paperId": "all-papers-unit-ii",
        "paperTitle": "All papers — Unit II",
        "sectionId": "u2",
        "sectionTitle": "📄 All papers — Unit II Q6",
        "number": "Q6a.",
        "prompt": "Write 10 food items in Japanese with English meaning. (5 marks)ALL 3 papers",
        "options": [],
        "explanation": [],
        "prediction": {
          "score": 95,
          "label": "Near Certain — food items in all 3 papers"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "u2",
          "paneTitle": "Unit II",
          "meta": "Part B — Unit II · Most repeated section — some sub-questions are WORD-FOR-WORD IDENTICAL across 2 papers"
        }
      },
      {
        "id": "u2-all-papers-unit-ii-q6b-95",
        "paperId": "all-papers-unit-ii",
        "paperTitle": "All papers — Unit II",
        "sectionId": "u2",
        "sectionTitle": "📄 All papers — Unit II Q6",
        "number": "Q6b. ⭐",
        "prompt": "Translate into Japanese — IDENTICAL in Dec 2025 & Jan 2023: (5 marks)ALL 3 papers",
        "options": [],
        "explanation": [
          "1. That house was new and beautiful. → Sono ie wa atarashikute kirei deshita.",
          "2. This coffee is not hot. → Kono koohii wa atsuku nai desu.",
          "3. How much is this rice for 1kg? → Kono okome wa ichi-kiro ikura desuka?",
          "4. I like that shop, because the food is tasty. → Sono mise ga suki desu. Tabemono ga oishii kara desu.",
          "5. He is reading a book. → Kare wa hon o yonde imasu."
        ],
        "prediction": {
          "score": 92,
          "label": "Near Certain — WORD-FOR-WORD IDENTICAL in 2 of 3 papers"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "u2",
          "paneTitle": "Unit II",
          "meta": "Part B — Unit II · Most repeated section — some sub-questions are WORD-FOR-WORD IDENTICAL across 2 papers"
        }
      },
      {
        "id": "u2-all-papers-unit-ii-q6c-96",
        "paperId": "all-papers-unit-ii",
        "paperTitle": "All papers — Unit II",
        "sectionId": "u2",
        "sectionTitle": "📄 All papers — Unit II Q6",
        "number": "Q6c. ⭐",
        "prompt": "Match expressions — IDENTICAL in Dec 2025 & Jan 2023 & May 2025: (3-4 marks)ALL 3 papers",
        "options": [],
        "explanation": [
          "Okuni wa dochira desuka → Where are you from?",
          "Tadaima → I'm home",
          "Okaeri nasai → Welcome home",
          "Nakanaide kudasai → Please don't cry",
          "Kore wa himitsu desu → This is a secret",
          "Odoroki mashita → I'm surprised",
          "Gakki o hikimasu → I play musical instrument",
          "Shitsurei shimasu → Excuse me / Sorry for disturbing",
          "Ganbari masu → I'll do my best",
          "Itte kimasu → I'm leaving (I'll go and come back)"
        ],
        "prediction": {
          "score": 97,
          "label": "Near Certain — match expressions in ALL 3 papers"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "u2",
          "paneTitle": "Unit II",
          "meta": "Part B — Unit II · Most repeated section — some sub-questions are WORD-FOR-WORD IDENTICAL across 2 papers"
        }
      },
      {
        "id": "u2-all-papers-unit-ii-q6d-97",
        "paperId": "all-papers-unit-ii",
        "paperTitle": "All papers — Unit II",
        "sectionId": "u2",
        "sectionTitle": "📄 All papers — Unit II Q6",
        "number": "Q6d.",
        "prompt": "Make 3 sentences using dekiru / hoshii / -tai. (3 marks)2 Papers",
        "options": [],
        "explanation": [
          "dekiru (can): Watashi wa Nihongo ga dekimasu. (I can speak Japanese.)",
          "hoshii (want thing): Atarashii kuruma ga hoshii desu. (I want a new car.)",
          "-tai (want to do): Eiga o mitai desu. (I want to watch a movie.)"
        ],
        "prediction": {
          "score": 85,
          "label": "Very Likely — appeared in 2 papers, commonly tested grammar"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "u2",
          "paneTitle": "Unit II",
          "meta": "Part B — Unit II · Most repeated section — some sub-questions are WORD-FOR-WORD IDENTICAL across 2 papers"
        }
      },
      {
        "id": "u2-all-papers-unit-ii-q6e-98",
        "paperId": "all-papers-unit-ii",
        "paperTitle": "All papers — Unit II",
        "sectionId": "u2",
        "sectionTitle": "📄 All papers — Unit II Q6",
        "number": "Q6e.",
        "prompt": "Make 4 sentences using 5W1H in Japanese. (4 marks)2 Papers",
        "options": [],
        "explanation": [
          "nani(what)·doko(where)·dare(who)·itsu(when)·naze/doushite(why)·dou/douyatte(how)",
          "e.g. Kore wa nani desuka? / Anata wa doko ni imasu ka? / Dare ga kimashita ka? / Itsu ikimasu ka?"
        ],
        "prediction": {
          "score": 83,
          "label": "Very Likely — 5W1H appeared in 2 papers"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "u2",
          "paneTitle": "Unit II",
          "meta": "Part B — Unit II · Most repeated section — some sub-questions are WORD-FOR-WORD IDENTICAL across 2 papers"
        }
      },
      {
        "id": "u2-all-papers-unit-ii-q4a-jan-2023-99",
        "paperId": "all-papers-unit-ii",
        "paperTitle": "All papers — Unit II",
        "sectionId": "u2",
        "sectionTitle": "📄 All papers — Unit II Q6",
        "number": "Q4a (Jan 2023).",
        "prompt": "Write 8–10 body parts with English meaning. (5 marks)2 Papers",
        "options": [],
        "explanation": [
          "atama(head)·me(eye)·mimi(ear)·hana(nose)·kuchi(mouth)·kubi(neck)·kata(shoulder)",
          "ude(arm)·te(hand)·yubi(finger)·mune(chest)·onaka(stomach)·ashi(leg)·hiza(knee)·senaka(back)"
        ],
        "prediction": {
          "score": 87,
          "label": "Very Likely — body parts in Jan 2023 and May 2025"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "u2",
          "paneTitle": "Unit II",
          "meta": "Part B — Unit II · Most repeated section — some sub-questions are WORD-FOR-WORD IDENTICAL across 2 papers"
        }
      }
    ]
  },
  {
    "id": "may-2026-16-may-2026-unit-ii-questions",
    "title": "May 2026 / 16 May 2026 — Unit II Questions",
    "source": "Japanese_Practice_QBank.html",
    "sections": [
      {
        "id": "u2-may-2026-16-may-2026-unit-ii-questions-hu1504-1-open-elective-q4-q5-q6-book-conf",
        "pane": "u2",
        "title": "📄 May 2026 / 16 May 2026 — Unit II Questions HU1504-1 Open Elective · Q4, Q5, Q6 · Book-confirmed"
      }
    ],
    "questions": [
      {
        "id": "u2-may-2026-16-may-2026-unit-ii-questions-q4a-100",
        "paperId": "may-2026-16-may-2026-unit-ii-questions",
        "paperTitle": "May 2026 / 16 May 2026 — Unit II Questions",
        "sectionId": "u2",
        "sectionTitle": "📄 May 2026 / 16 May 2026 — Unit II Questions HU1504-1 Open Elective · Q4, Q5, Q6 · Book-confirmed",
        "number": "Q4a.",
        "prompt": "Write 10 words related to animals or colors with English meaning. (5 marks)May 2026",
        "options": [],
        "explanation": [
          "Animals: inu = dog · neko = cat · tori = bird · sakana = fish · zou = elephant",
          "Colors: aka = red · shiro = white · kuro = black · ao = blue · midori = green · kiiro = yellow · murasaki = purple",
          "Book source: Lesson 13 Body/Color/Features."
        ],
        "prediction": {
          "score": 85,
          "label": "Very Likely — animals/colors list format"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "u2",
          "paneTitle": "Unit II",
          "meta": "Part B — Unit II · Most repeated section — some sub-questions are WORD-FOR-WORD IDENTICAL across 2 papers"
        }
      },
      {
        "id": "u2-may-2026-16-may-2026-unit-ii-questions-q4b-101",
        "paperId": "may-2026-16-may-2026-unit-ii-questions",
        "paperTitle": "May 2026 / 16 May 2026 — Unit II Questions",
        "sectionId": "u2",
        "sectionTitle": "📄 May 2026 / 16 May 2026 — Unit II Questions HU1504-1 Open Elective · Q4, Q5, Q6 · Book-confirmed",
        "number": "Q4b.",
        "prompt": "Translate into English / Japanese: (4 marks)May 2026",
        "options": [],
        "explanation": [
          "1) Watashi wa supootsu o suru no ga tokui desu. → I am good at doing/playing sports.",
          "2) Hachuu-rui wa konchuu yori tsuyoi desu. → Reptiles are stronger than insects.",
          "3) I can wear Japanese kimono. → Watashi wa kimono o kiru-koto ga dekimasu.",
          "4) Can I watch TV? → Terebi o mite mo ii desuka?",
          "Book source: Lessons 10, 11, 12 + Lesson 10 Comparison."
        ],
        "prediction": {
          "score": 82,
          "label": "Very Likely — overlaps Dec 2025 set"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "u2",
          "paneTitle": "Unit II",
          "meta": "Part B — Unit II · Most repeated section — some sub-questions are WORD-FOR-WORD IDENTICAL across 2 papers"
        }
      },
      {
        "id": "u2-may-2026-16-may-2026-unit-ii-questions-q4c-102",
        "paperId": "may-2026-16-may-2026-unit-ii-questions",
        "paperTitle": "May 2026 / 16 May 2026 — Unit II Questions",
        "sectionId": "u2",
        "sectionTitle": "📄 May 2026 / 16 May 2026 — Unit II Questions HU1504-1 Open Elective · Q4, Q5, Q6 · Book-confirmed",
        "number": "Q4c.",
        "prompt": "Match the following words: nyuugaku, kotoshi, shuushoku, rainen, sotsugyou, kyonen, made, kara. (4 marks)May 2026",
        "options": [],
        "explanation": [
          "1) nyuugaku → d) enter a school",
          "2) kotoshi → f) this year",
          "3) shuushoku → h) enter employment",
          "4) rainen → e) next year",
          "5) sotsugyou → c) graduation",
          "6) kyonen → b) last year",
          "7) made → g) till",
          "8) kara → a) from",
          "Book source: Lesson 9 Entering school/company."
        ],
        "prediction": {
          "score": 85,
          "label": "Very Likely — vocab matching format every paper"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "u2",
          "paneTitle": "Unit II",
          "meta": "Part B — Unit II · Most repeated section — some sub-questions are WORD-FOR-WORD IDENTICAL across 2 papers"
        }
      },
      {
        "id": "u2-may-2026-16-may-2026-unit-ii-questions-q4d-103",
        "paperId": "may-2026-16-may-2026-unit-ii-questions",
        "paperTitle": "May 2026 / 16 May 2026 — Unit II Questions",
        "sectionId": "u2",
        "sectionTitle": "📄 May 2026 / 16 May 2026 — Unit II Questions HU1504-1 Open Elective · Q4, Q5, Q6 · Book-confirmed",
        "number": "Q4d.",
        "prompt": "Make 3 sentences using dekiru (can), hoshii (want) and -tai (want to). (3 marks)May 2026",
        "options": [],
        "explanation": [
          "dekiru: Watashi wa baiku no unten ga dekimasu. = I can drive a motorcycle.",
          "hoshii: Atarashii keitai ga hoshii desu. = I want a new mobile.",
          "-tai: Kuruma o unten shitai desu. = I want to drive a car.",
          "Book source: Lessons 10, 11, 12."
        ],
        "prediction": {
          "score": 95,
          "label": "Near Certain — dekiru/hoshii/-tai triplet every paper"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "u2",
          "paneTitle": "Unit II",
          "meta": "Part B — Unit II · Most repeated section — some sub-questions are WORD-FOR-WORD IDENTICAL across 2 papers"
        }
      },
      {
        "id": "u2-may-2026-16-may-2026-unit-ii-questions-q5a-104",
        "paperId": "may-2026-16-may-2026-unit-ii-questions",
        "paperTitle": "May 2026 / 16 May 2026 — Unit II Questions",
        "sectionId": "u2",
        "sectionTitle": "📄 May 2026 / 16 May 2026 — Unit II Questions HU1504-1 Open Elective · Q4, Q5, Q6 · Book-confirmed",
        "number": "Q5a.",
        "prompt": "Write 8 body parts with English meaning. (4 marks)May 2026",
        "options": [],
        "explanation": [
          "atama = head · kao = face · me = eye · hana = nose · kuchi = mouth · mimi = ear",
          "kubi = neck · te = hand · ashi = leg · onaka = stomach",
          "Book source: Lesson 13 Body/Color/Features."
        ],
        "prediction": {
          "score": 93,
          "label": "Near Certain — body parts list every paper"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "u2",
          "paneTitle": "Unit II",
          "meta": "Part B — Unit II · Most repeated section — some sub-questions are WORD-FOR-WORD IDENTICAL across 2 papers"
        }
      },
      {
        "id": "u2-may-2026-16-may-2026-unit-ii-questions-q5b-105",
        "paperId": "may-2026-16-may-2026-unit-ii-questions",
        "paperTitle": "May 2026 / 16 May 2026 — Unit II Questions",
        "sectionId": "u2",
        "sectionTitle": "📄 May 2026 / 16 May 2026 — Unit II Questions HU1504-1 Open Elective · Q4, Q5, Q6 · Book-confirmed",
        "number": "Q5b.",
        "prompt": "Make 4 sentences using 5W1H (what, when, who, why, where, how) in Japanese. (4 marks)May 2026",
        "options": [],
        "explanation": [
          "what / nan: Anata no namae wa nan desu ka? = What is your name?",
          "when / itsu: Anata no tanjoubi wa itsu desu ka? = When is your birthday?",
          "who / dare: Ano hito wa dare desu ka? = Who is that person?",
          "where / doko: Anata wa doko ni sunde imasu ka? = Where are you living?",
          "how / douyatte: Douyatte daigaku ni ikimasu ka? = How do you go to university?",
          "Book source: Lessons 1, 3, 16."
        ],
        "prediction": {
          "score": 88,
          "label": "Near Certain — 5W1H sentences in every paper"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "u2",
          "paneTitle": "Unit II",
          "meta": "Part B — Unit II · Most repeated section — some sub-questions are WORD-FOR-WORD IDENTICAL across 2 papers"
        }
      },
      {
        "id": "u2-may-2026-16-may-2026-unit-ii-questions-q5c-106",
        "paperId": "may-2026-16-may-2026-unit-ii-questions",
        "paperTitle": "May 2026 / 16 May 2026 — Unit II Questions",
        "sectionId": "u2",
        "sectionTitle": "📄 May 2026 / 16 May 2026 — Unit II Questions HU1504-1 Open Elective · Q4, Q5, Q6 · Book-confirmed",
        "number": "Q5c.",
        "prompt": "Translate into English / Japanese: (4 marks)May 2026",
        "options": [],
        "explanation": [
          "1) Nihon-go kurasu wa shuu ni san-kai desu. → Japanese language class is three times a week.",
          "2) Hon o issatsu kaimashita. → I bought one book.",
          "3) Here are 10 houses. → Koko ni juu-ken no ie ga arimasu.",
          "4) I drink 3 cups of coffee every day. → Watashi wa mainichi koohii o san-bai nomimasu.",
          "Book source: Lessons 2, 3, 7, 14 + Appendix Numbers + Verb lessons."
        ],
        "prediction": {
          "score": 85,
          "label": "Very Likely — counter-translate set every paper"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "u2",
          "paneTitle": "Unit II",
          "meta": "Part B — Unit II · Most repeated section — some sub-questions are WORD-FOR-WORD IDENTICAL across 2 papers"
        }
      },
      {
        "id": "u2-may-2026-16-may-2026-unit-ii-questions-q5d-107",
        "paperId": "may-2026-16-may-2026-unit-ii-questions",
        "paperTitle": "May 2026 / 16 May 2026 — Unit II Questions",
        "sectionId": "u2",
        "sectionTitle": "📄 May 2026 / 16 May 2026 — Unit II Questions HU1504-1 Open Elective · Q4, Q5, Q6 · Book-confirmed",
        "number": "Q5d.",
        "prompt": "Match the counter suffix and suitable noun: nin, mai, hiki, tou, soku, chaku, hon, dai. (4 marks)May 2026",
        "options": [],
        "explanation": [
          "1) nin → c) hito / person",
          "2) mai → d) kami / paper",
          "3) hiki → g) inu / dog",
          "4) tou → a) ushi / cow",
          "5) soku → e) kutsu / shoes",
          "6) chaku → b) fuku / clothes",
          "7) hon → f) ki / tree",
          "8) dai → h) denwa / phone",
          "Book source: Lesson 14 Counter suffix/progressive form."
        ],
        "prediction": {
          "score": 95,
          "label": "Near Certain — counter-noun matching every paper"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "u2",
          "paneTitle": "Unit II",
          "meta": "Part B — Unit II · Most repeated section — some sub-questions are WORD-FOR-WORD IDENTICAL across 2 papers"
        }
      },
      {
        "id": "u2-may-2026-16-may-2026-unit-ii-questions-q6a-108",
        "paperId": "may-2026-16-may-2026-unit-ii-questions",
        "paperTitle": "May 2026 / 16 May 2026 — Unit II Questions",
        "sectionId": "u2",
        "sectionTitle": "📄 May 2026 / 16 May 2026 — Unit II Questions HU1504-1 Open Elective · Q4, Q5, Q6 · Book-confirmed",
        "number": "Q6a.",
        "prompt": "Write 10 food items with English meaning. (5 marks)May 2026",
        "options": [],
        "explanation": [
          "gohan = rice/meal · pan = bread · niku = meat · sakana = fish · tamago = egg",
          "yasai = vegetable · ringo = apple · banana = banana",
          "koohii = coffee · gyuunyuu = milk · ocha = green tea · mizu = water",
          "Book source: Lesson 2 food/drink + Lesson 17 Food/restaurant."
        ],
        "prediction": {
          "score": 95,
          "label": "Near Certain — food items in every paper"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "u2",
          "paneTitle": "Unit II",
          "meta": "Part B — Unit II · Most repeated section — some sub-questions are WORD-FOR-WORD IDENTICAL across 2 papers"
        }
      },
      {
        "id": "u2-may-2026-16-may-2026-unit-ii-questions-q6b-109",
        "paperId": "may-2026-16-may-2026-unit-ii-questions",
        "paperTitle": "May 2026 / 16 May 2026 — Unit II Questions",
        "sectionId": "u2",
        "sectionTitle": "📄 May 2026 / 16 May 2026 — Unit II Questions HU1504-1 Open Elective · Q4, Q5, Q6 · Book-confirmed",
        "number": "Q6b.",
        "prompt": "Translate into Japanese / English: (4 marks)May 2026",
        "options": [],
        "explanation": [
          "1) He is drinking milk. → Kare wa gyuunyuu o nonde imasu.",
          "2) I prefer apple than banana. → Banana yori ringo no hou ga suki desu.",
          "3) Watashi no shumi wa gakki o hiku-koto desu. → My hobby is playing musical instruments.",
          "4) Byouki no nayami wa irimasen. → I do not need worries of illness.",
          "Book source: Lessons 2, 17, 10 (Comparison), 10-12, 15-20."
        ],
        "prediction": {
          "score": 85,
          "label": "Very Likely — translate set every paper"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "u2",
          "paneTitle": "Unit II",
          "meta": "Part B — Unit II · Most repeated section — some sub-questions are WORD-FOR-WORD IDENTICAL across 2 papers"
        }
      },
      {
        "id": "u2-may-2026-16-may-2026-unit-ii-questions-q6c-110",
        "paperId": "may-2026-16-may-2026-unit-ii-questions",
        "paperTitle": "May 2026 / 16 May 2026 — Unit II Questions",
        "sectionId": "u2",
        "sectionTitle": "📄 May 2026 / 16 May 2026 — Unit II Questions HU1504-1 Open Elective · Q4, Q5, Q6 · Book-confirmed",
        "number": "Q6c.",
        "prompt": "Read the story and answer: A wa B yori ookii desu. C yori A no hou ga ookii desu. Mondai: Which is the biggest? (2 marks)May 2026",
        "options": [],
        "explanation": [
          "A wa B yori ookii desu = A is bigger than B.",
          "C yori A no hou ga ookii desu = A is bigger than C.",
          "Therefore A is biggest.",
          "Book source: Lesson 10 Comparison."
        ],
        "prediction": {
          "score": 80,
          "label": "Very Likely — comparison story every paper"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "u2",
          "paneTitle": "Unit II",
          "meta": "Part B — Unit II · Most repeated section — some sub-questions are WORD-FOR-WORD IDENTICAL across 2 papers"
        }
      },
      {
        "id": "u2-may-2026-16-may-2026-unit-ii-questions-q6d-111",
        "paperId": "may-2026-16-may-2026-unit-ii-questions",
        "paperTitle": "May 2026 / 16 May 2026 — Unit II Questions",
        "sectionId": "u2",
        "sectionTitle": "📄 May 2026 / 16 May 2026 — Unit II Questions HU1504-1 Open Elective · Q4, Q5, Q6 · Book-confirmed",
        "number": "Q6d.",
        "prompt": "Describe the features of body of yourself or your friends in 5 sentences. (5 marks)May 2026",
        "options": [],
        "explanation": [
          "Watashi wa se ga takai desu. = I am tall.",
          "Watashi wa kami ga kuroi desu. = I have black hair.",
          "Watashi wa megane o kakete imasu. = I wear specs.",
          "Watashi wa me ga ookii desu. = I have big eyes.",
          "Watashi wa yasete imasu. = I am slim.",
          "Book source: Lesson 13 Body/Color/Features."
        ],
        "prediction": {
          "score": 85,
          "label": "Very Likely — body features description every paper"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "u2",
          "paneTitle": "Unit II",
          "meta": "Part B — Unit II · Most repeated section — some sub-questions are WORD-FOR-WORD IDENTICAL across 2 papers"
        }
      }
    ]
  },
  {
    "id": "all-papers-unit-iii-daily-routine-q8a",
    "title": "All papers — Unit III: Daily Routine (Q8a /",
    "source": "Japanese_Practice_QBank.html",
    "sections": [
      {
        "id": "u3-all-papers-unit-iii-daily-routine-q8a-q7c",
        "pane": "u3",
        "title": "📄 All papers — Unit III: Daily Routine (Q8a / Q7c)"
      }
    ],
    "questions": [
      {
        "id": "u3-all-papers-unit-iii-daily-routine-q8a-q-daily-routine-112",
        "paperId": "all-papers-unit-iii-daily-routine-q8a",
        "paperTitle": "All papers — Unit III: Daily Routine (Q8a /",
        "sectionId": "u3",
        "sectionTitle": "📄 All papers — Unit III: Daily Routine (Q8a / Q7c)",
        "number": "Q★ DAILY ROUTINE",
        "prompt": "Express your daily routine in 6 sentences using: okiru/taberu/noru/iku/suru/kaeru/arau etc.ALL 3 papers",
        "options": [],
        "explanation": [
          "Gozen roku-ji ni okimasu. (I wake up at 6am.)",
          "Choushoku ni gohan to tamago o tabemasu. (I eat rice and egg for breakfast.)",
          "Basu ni notte gakkou ni ikimasu. (I go to school by bus.)",
          "Gakkou de benkyou o shimasu. (I study at school.)",
          "Gogo roku-ji ni ie ni kaerimasu. (I return home at 6pm.)",
          "Yoru te o araimasu. (I wash my hands at night.)"
        ],
        "prediction": {
          "score": 97,
          "label": "Near Certain — APPEARS IN ALL 3 PAPERS. This is your guaranteed Unit III answer."
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "u3",
          "paneTitle": "Unit III",
          "meta": "Part B — Unit III · 2 Full Questions per paper × 3 papers = 6 full questionsSeveral sub-questions are WORD-FOR-WORD IDENTICAL across Jan 2023 and May 2025"
        }
      }
    ]
  },
  {
    "id": "all-papers-unit-iii-directions-q8c",
    "title": "All papers — Unit III: Directions (Q8c)",
    "source": "Japanese_Practice_QBank.html",
    "sections": [
      {
        "id": "u3-all-papers-unit-iii-directions-q8c",
        "pane": "u3",
        "title": "📄 All papers — Unit III: Directions (Q8c)"
      }
    ],
    "questions": [
      {
        "id": "u3-all-papers-unit-iii-directions-q8c-q-directions-113",
        "paperId": "all-papers-unit-iii-directions-q8c",
        "paperTitle": "All papers — Unit III: Directions (Q8c)",
        "sectionId": "u3",
        "sectionTitle": "📄 All papers — Unit III: Directions (Q8c)",
        "number": "Q★ DIRECTIONS",
        "prompt": "Put correct word in brackets — giving directions: (4 marks)ALL 3 papers",
        "options": [],
        "explanation": [
          "1. Sore wa ( ) no ( ) o ( ) ni magatte arimasu. → Massugu/hidari(or migi)/saki",
          "2. ( ) ite ( ) o ( ) ni magatte kudasai. → Massugu / migi(right) or hidari(left) / saki(end of road) → Go straight and turn at the end of the street.",
          "3. Futatsu-me no ( ) ni ( ) ga arimasu. → kousaten(intersection) / shingou(traffic signal)",
          "4. Watashi wa ( ) ni ( ) mashita. → michi(road) / mayo (lost) → I have lost my way.",
          "KEY WORDS: massugu(straight)·migi(right)·hidari(left)·kousaten(intersection)·shingou(traffic light)·saki(ahead/end)"
        ],
        "prediction": {
          "score": 95,
          "label": "Near Certain — direction fill-in in ALL 3 papers' Unit III"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "u3",
          "paneTitle": "Unit III",
          "meta": "Part B — Unit III · 2 Full Questions per paper × 3 papers = 6 full questionsSeveral sub-questions are WORD-FOR-WORD IDENTICAL across Jan 2023 and May 2025"
        }
      }
    ]
  },
  {
    "id": "all-papers-unit-iii-kanji-matching-q8e",
    "title": "All papers — Unit III: Kanji Matching (Q8e /",
    "source": "Japanese_Practice_QBank.html",
    "sections": [
      {
        "id": "u3-all-papers-unit-iii-kanji-matching-q8e-q7c",
        "pane": "u3",
        "title": "📄 All papers — Unit III: Kanji Matching (Q8e / Q7c)"
      }
    ],
    "questions": [
      {
        "id": "u3-all-papers-unit-iii-kanji-matching-q8e-q-kanji-114",
        "paperId": "all-papers-unit-iii-kanji-matching-q8e",
        "paperTitle": "All papers — Unit III: Kanji Matching (Q8e /",
        "sectionId": "u3",
        "sectionTitle": "📄 All papers — Unit III: Kanji Matching (Q8e / Q7c)",
        "number": "Q★ KANJI",
        "prompt": "Match Japanese Kanji to English meaning: (3-5 marks)ALL 3 papers",
        "options": [],
        "explanation": [
          "一=one · 二=two · 三=three · 四=four · 五=five · 六=six · 七=seven · 八=eight · 九=nine · 十=ten",
          "日=sun/day · 月=moon/month · 山=mountain · 川=river · 木=tree · 火=fire · 水=water · 土=earth",
          "田=field · 口=mouth · 人=person · 雨=rain · 風=wind · 空=sky"
        ],
        "prediction": {
          "score": 93,
          "label": "Near Certain — Kanji matching in ALL 3 papers"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "u3",
          "paneTitle": "Unit III",
          "meta": "Part B — Unit III · 2 Full Questions per paper × 3 papers = 6 full questionsSeveral sub-questions are WORD-FOR-WORD IDENTICAL across Jan 2023 and May 2025"
        }
      }
    ]
  },
  {
    "id": "jan-2023-may-2025-unit-iii",
    "title": "Jan 2023 + May 2025 — Unit III",
    "source": "Japanese_Practice_QBank.html",
    "sections": [
      {
        "id": "u3-jan-2023-may-2025-unit-iii-q7b-q8b-identical",
        "pane": "u3",
        "title": "📄 Jan 2023 + May 2025 — Unit III Q7b & Q8b (IDENTICAL)"
      }
    ],
    "questions": [
      {
        "id": "u3-jan-2023-may-2025-unit-iii-q-translate-115",
        "paperId": "jan-2023-may-2025-unit-iii",
        "paperTitle": "Jan 2023 + May 2025 — Unit III",
        "sectionId": "u3",
        "sectionTitle": "📄 Jan 2023 + May 2025 — Unit III Q7b & Q8b (IDENTICAL)",
        "number": "Q★ TRANSLATE ⭐",
        "prompt": "Translate into Japanese — WORD-FOR-WORD IDENTICAL in Jan 2023 & May 2025: (5 marks)ALL 3 papers",
        "options": [],
        "explanation": [
          "1. I have eaten Sushi once. → Sushi o ichi-do tabeta koto ga arimasu.",
          "2. I should do exercise more. → Motto undou o suru beki desu.",
          "3. I passed the exam. → Shiken ni goukaku shimashita.",
          "4. Please remove your shoes. → Kutsu o nuide kudasai.",
          "5. From next week exam starts. → Raishuu kara shiken ga hajimarimasu."
        ],
        "prediction": {
          "score": 93,
          "label": "Near Certain — IDENTICAL in 2 of 3 papers. Learn these exact translations."
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "u3",
          "paneTitle": "Unit III",
          "meta": "Part B — Unit III · 2 Full Questions per paper × 3 papers = 6 full questionsSeveral sub-questions are WORD-FOR-WORD IDENTICAL across Jan 2023 and May 2025"
        }
      }
    ]
  },
  {
    "id": "jan-2023-may-2025-akira-tokyo-story-q8d-identical",
    "title": "Jan 2023 + May 2025 — Akira Tokyo story (Q8d) — IDENTICAL",
    "source": "Japanese_Practice_QBank.html",
    "sections": [
      {
        "id": "u3-jan-2023-may-2025-akira-tokyo-story-q8d-identical",
        "pane": "u3",
        "title": "📄 Jan 2023 + May 2025 — Akira Tokyo story (Q8d) — IDENTICAL"
      }
    ],
    "questions": [
      {
        "id": "u3-jan-2023-may-2025-akira-tokyo-story-q8d-identical-q-akira-story-116",
        "paperId": "jan-2023-may-2025-akira-tokyo-story-q8d-identical",
        "paperTitle": "Jan 2023 + May 2025 — Akira Tokyo story (Q8d) — IDENTICAL",
        "sectionId": "u3",
        "sectionTitle": "📄 Jan 2023 + May 2025 — Akira Tokyo story (Q8d) — IDENTICAL",
        "number": "Q★ AKIRA STORY ⭐",
        "prompt": "Translate story into English — SAME in Jan 2023 & May 2025: (5 marks)ALL 3 papers",
        "options": [],
        "explanation": [
          "\"Akira san wa ima Tokyo ni shuuchou shite imasu. Nihon to Indo wa san-ji-kan-han no jisa ga arimasu. Ima Akira san wa asa desu. Demo kochira wa hiru desu.\"",
          "→ Akira is currently on a business trip to Tokyo. Japan and India have a 3.5-hour time difference. It is morning for Akira now. But here it is noon/afternoon."
        ],
        "prediction": {
          "score": 88,
          "label": "Near Certain — IDENTICAL story in 2 of 3 papers"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "u3",
          "paneTitle": "Unit III",
          "meta": "Part B — Unit III · 2 Full Questions per paper × 3 papers = 6 full questionsSeveral sub-questions are WORD-FOR-WORD IDENTICAL across Jan 2023 and May 2025"
        }
      }
    ]
  },
  {
    "id": "jan-2023-dec-2025-word-rearrangement-q7a",
    "title": "Jan 2023 + Dec 2025 — Word Rearrangement (Q7a)",
    "source": "Japanese_Practice_QBank.html",
    "sections": [
      {
        "id": "u3-jan-2023-dec-2025-word-rearrangement-q7a",
        "pane": "u3",
        "title": "📄 Jan 2023 + Dec 2025 — Word Rearrangement (Q7a)"
      }
    ],
    "questions": [
      {
        "id": "u3-jan-2023-dec-2025-word-rearrangement-q7a-q7a-117",
        "paperId": "jan-2023-dec-2025-word-rearrangement-q7a",
        "paperTitle": "Jan 2023 + Dec 2025 — Word Rearrangement (Q7a)",
        "sectionId": "u3",
        "sectionTitle": "📄 Jan 2023 + Dec 2025 — Word Rearrangement (Q7a)",
        "number": "Q7a.",
        "prompt": "Re-arrange words — Unit III sentences: (5 marks)2 Papers",
        "options": [],
        "explanation": [
          "1. douyatte, ni, ikimisuka, wa, eki → Eki ni wa douyatte ikimisuka? (How can I go to the station?)",
          "2. nihon, wa, ni, watashi, ikitai → Watashi wa nihon ni ikitai desu. (I want to go to Japan.)",
          "3. 2000, ni, nen, watashi, mashita, wa, umare → Watashi wa 2000-nen ni umaremashita. (I was born in 2000.)",
          "4. no, futatsu-me, desu, pan, wa, kore → Kore wa pan no futatsu-me desu. (This is my 2nd helping of bread.)",
          "5. onegai-shimasu, de, oomori, o, gohan → Gohan no oomori o onegai-shimasu. (Please give me a large serving of rice.)"
        ],
        "prediction": {
          "score": 88,
          "label": "Very Likely — rearrangement in Jan 2023 and Dec 2025 Unit III"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "u3",
          "paneTitle": "Unit III",
          "meta": "Part B — Unit III · 2 Full Questions per paper × 3 papers = 6 full questionsSeveral sub-questions are WORD-FOR-WORD IDENTICAL across Jan 2023 and May 2025"
        }
      },
      {
        "id": "u3-jan-2023-dec-2025-word-rearrangement-q7a-q7b-jan-2023-118",
        "paperId": "jan-2023-dec-2025-word-rearrangement-q7a",
        "paperTitle": "Jan 2023 + Dec 2025 — Word Rearrangement (Q7a)",
        "sectionId": "u3",
        "sectionTitle": "📄 Jan 2023 + Dec 2025 — Word Rearrangement (Q7a)",
        "number": "Q7b (Jan 2023).",
        "prompt": "Translate into Japanese — life milestone sentences: (5 marks)2 Papers",
        "options": [],
        "explanation": [
          "1. I am the first daughter. → Watashi wa choujo desu.",
          "2. My cat died yesterday. → Watashi no neko ga kinou shinde shimaimashita.",
          "3. Happy birthday to you! → Otanjoubi omedetou gozaimasu!",
          "4. I must go to the bank. → Ginkou ni ikanakereba narimasen.",
          "5. It became hotter and hotter. → Dandan atsuku natte kimashita."
        ],
        "prediction": {
          "score": 80,
          "label": "Very Likely — milestone sentences in Jan 2023 and Dec 2025"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "u3",
          "paneTitle": "Unit III",
          "meta": "Part B — Unit III · 2 Full Questions per paper × 3 papers = 6 full questionsSeveral sub-questions are WORD-FOR-WORD IDENTICAL across Jan 2023 and May 2025"
        }
      }
    ]
  },
  {
    "id": "may-2026-16-may-2026-unit-iii-questions",
    "title": "May 2026 / 16 May 2026 — Unit III Questions",
    "source": "Japanese_Practice_QBank.html",
    "sections": [
      {
        "id": "u3-may-2026-16-may-2026-unit-iii-questions-hu1504-1-open-elective-q7-q8-book-confir",
        "pane": "u3",
        "title": "📄 May 2026 / 16 May 2026 — Unit III Questions HU1504-1 Open Elective · Q7, Q8 · Book-confirmed"
      }
    ],
    "questions": [
      {
        "id": "u3-may-2026-16-may-2026-unit-iii-questions-q7a-119",
        "paperId": "may-2026-16-may-2026-unit-iii-questions",
        "paperTitle": "May 2026 / 16 May 2026 — Unit III Questions",
        "sectionId": "u3",
        "sectionTitle": "📄 May 2026 / 16 May 2026 — Unit III Questions HU1504-1 Open Elective · Q7, Q8 · Book-confirmed",
        "number": "Q7a.",
        "prompt": "Match the expressions and meaning: Okotte imasu, Kowai desu, Odoroki mashita, Nemui desu, Oishii desu, Shiawase desu. (3 marks)May 2026",
        "options": [],
        "explanation": [
          "1) Okotte imasu → c) I am angry",
          "2) Kowai desu → e) I am scared",
          "3) Odoroki mashita → d) I am surprised",
          "4) Nemui desu → b) I am sleepy",
          "5) Oishii desu → f) It is tasty",
          "6) Shiawase desu → a) I am happy",
          "Book source: Lessons 15-20 + Lesson 2 + Lesson 17."
        ],
        "prediction": {
          "score": 85,
          "label": "Very Likely — expression matching every paper"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "u3",
          "paneTitle": "Unit III",
          "meta": "Part B — Unit III · 2 Full Questions per paper × 3 papers = 6 full questionsSeveral sub-questions are WORD-FOR-WORD IDENTICAL across Jan 2023 and May 2025"
        }
      },
      {
        "id": "u3-may-2026-16-may-2026-unit-iii-questions-q7b-120",
        "paperId": "may-2026-16-may-2026-unit-iii-questions",
        "paperTitle": "May 2026 / 16 May 2026 — Unit III Questions",
        "sectionId": "u3",
        "sectionTitle": "📄 May 2026 / 16 May 2026 — Unit III Questions HU1504-1 Open Elective · Q7, Q8 · Book-confirmed",
        "number": "Q7b.",
        "prompt": "Re-arrange the order of the words to make correct sentence: (4 marks)May 2026",
        "options": [],
        "explanation": [
          "1) Watashi wa kudamono no naka de ringo ga ichi-ban suki desu. = I like apple the best among fruits.",
          "2) Gohan no okawari o onegaishimasu. = Please give me another helping of rice.",
          "3) Kore wa futatsu-me no pan desu. = This is my second helping of bread.",
          "4) Nihon ni iku kamo shiremasen. = I may go to Japan.",
          "Book source: Lessons 2, 17, 15-20."
        ],
        "prediction": {
          "score": 85,
          "label": "Very Likely — rearrangement in every Unit III"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "u3",
          "paneTitle": "Unit III",
          "meta": "Part B — Unit III · 2 Full Questions per paper × 3 papers = 6 full questionsSeveral sub-questions are WORD-FOR-WORD IDENTICAL across Jan 2023 and May 2025"
        }
      },
      {
        "id": "u3-may-2026-16-may-2026-unit-iii-questions-q7c-121",
        "paperId": "may-2026-16-may-2026-unit-iii-questions",
        "paperTitle": "May 2026 / 16 May 2026 — Unit III Questions",
        "sectionId": "u3",
        "sectionTitle": "📄 May 2026 / 16 May 2026 — Unit III Questions HU1504-1 Open Elective · Q7, Q8 · Book-confirmed",
        "number": "Q7c.",
        "prompt": "Translate into English: (5 marks)May 2026",
        "options": [],
        "explanation": [
          "1) Dandan samuku natte kimasu. → It is getting colder day by day / gradually becoming cold.",
          "2) Toshokan ni iku chizu o kakimasu. → I will draw a map to go to the library.",
          "3) Fuyu ni yuki ga furimasu. → Snow falls in winter.",
          "4) Kutsu o nuide kudasai. → Please take off your shoes.",
          "5) Shiken ni goukaku shimashita. → I passed the examination.",
          "Book source: Lessons 15-20."
        ],
        "prediction": {
          "score": 85,
          "label": "Very Likely — Unit III translate-to-English set"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "u3",
          "paneTitle": "Unit III",
          "meta": "Part B — Unit III · 2 Full Questions per paper × 3 papers = 6 full questionsSeveral sub-questions are WORD-FOR-WORD IDENTICAL across Jan 2023 and May 2025"
        }
      },
      {
        "id": "u3-may-2026-16-may-2026-unit-iii-questions-q7d-122",
        "paperId": "may-2026-16-may-2026-unit-iii-questions",
        "paperTitle": "May 2026 / 16 May 2026 — Unit III Questions",
        "sectionId": "u3",
        "sectionTitle": "📄 May 2026 / 16 May 2026 — Unit III Questions HU1504-1 Open Elective · Q7, Q8 · Book-confirmed",
        "number": "Q7d.",
        "prompt": "Put the correct word into the brackets to match English meaning: (4 marks)May 2026 ⭐",
        "options": [],
        "explanation": [
          "1) Watashi wa ( choujo ) desu. = I am the first daughter.",
          "2) Nitte ni ( ika-na )-kutewa ( nari )-masen. = I must go to Nitte. Full book-style sentence: Nitte ni ika-nakutewa nari-masen.",
          "3) Watashi no neko ga ( kinou ) ( shini ) mashita. = My cat died yesterday.",
          "4) ( Massugu ) itte saisho no ( kado ) o ( hidari ) ni magatte kudasai. = Go straight and turn to the left at the first corner.",
          "Fix note: For \"I must go to Nitte,\" use the full book-style sentence Nitte ni ika-nakutewa nari-masen.",
          "Book source: Lessons 15-20."
        ],
        "prediction": {
          "score": 90,
          "label": "Near Certain — direction/must-do fill-in every paper"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "u3",
          "paneTitle": "Unit III",
          "meta": "Part B — Unit III · 2 Full Questions per paper × 3 papers = 6 full questionsSeveral sub-questions are WORD-FOR-WORD IDENTICAL across Jan 2023 and May 2025"
        }
      },
      {
        "id": "u3-may-2026-16-may-2026-unit-iii-questions-q8a-123",
        "paperId": "may-2026-16-may-2026-unit-iii-questions",
        "paperTitle": "May 2026 / 16 May 2026 — Unit III Questions",
        "sectionId": "u3",
        "sectionTitle": "📄 May 2026 / 16 May 2026 — Unit III Questions HU1504-1 Open Elective · Q7, Q8 · Book-confirmed",
        "number": "Q8a.",
        "prompt": "Express your daily routine in Japanese. Make 4 sentences using verbs like okiru, taberu, noru, iku, suru, kaeru, arau. (4 marks)May 2026",
        "options": [],
        "explanation": [
          "Gozen roku-ji ni okimasu. = I wake up at 6 a.m.",
          "Asa-gohan o tabemasu. = I eat breakfast.",
          "Basu ni notte daigaku ni ikimasu. = I take a bus and go to college.",
          "Daigaku de benkyou o shimasu. = I study at college.",
          "Gogo roku-ji ni ie ni kaerimasu. = I return home at 6 p.m.",
          "Book source: Lesson 19 My Day + Lesson 6 Verb 3."
        ],
        "prediction": {
          "score": 97,
          "label": "Near Certain — daily routine in every paper"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "u3",
          "paneTitle": "Unit III",
          "meta": "Part B — Unit III · 2 Full Questions per paper × 3 papers = 6 full questionsSeveral sub-questions are WORD-FOR-WORD IDENTICAL across Jan 2023 and May 2025"
        }
      },
      {
        "id": "u3-may-2026-16-may-2026-unit-iii-questions-q8b-124",
        "paperId": "may-2026-16-may-2026-unit-iii-questions",
        "paperTitle": "May 2026 / 16 May 2026 — Unit III Questions",
        "sectionId": "u3",
        "sectionTitle": "📄 May 2026 / 16 May 2026 — Unit III Questions HU1504-1 Open Elective · Q7, Q8 · Book-confirmed",
        "number": "Q8b.",
        "prompt": "Translate into Japanese / English: (4 marks)May 2026",
        "options": [],
        "explanation": [
          "1) You should go to hospital. → Anata wa byouin ni iku beki desu.",
          "2) Watashi wa yakusoku o mamorimasu. → I keep my promise.",
          "3) Watashi wa byouki de guai ga warui desu. → I am ill and not feeling well / my condition is bad.",
          "4) Watashi wa suekko desu. → I am the last child.",
          "Book source: Lessons 15-20."
        ],
        "prediction": {
          "score": 85,
          "label": "Very Likely — Unit III translate-pair set"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "u3",
          "paneTitle": "Unit III",
          "meta": "Part B — Unit III · 2 Full Questions per paper × 3 papers = 6 full questionsSeveral sub-questions are WORD-FOR-WORD IDENTICAL across Jan 2023 and May 2025"
        }
      },
      {
        "id": "u3-may-2026-16-may-2026-unit-iii-questions-q8c-1-125",
        "paperId": "may-2026-16-may-2026-unit-iii-questions",
        "paperTitle": "May 2026 / 16 May 2026 — Unit III Questions",
        "sectionId": "u3",
        "sectionTitle": "📄 May 2026 / 16 May 2026 — Unit III Questions HU1504-1 Open Elective · Q7, Q8 · Book-confirmed",
        "number": "Q8c (1).",
        "prompt": "Read the story and answer: Kyou wa nigatsu touka de getsu-youbi desu. Mondai: nigatsu youka wa nan-youbi deshita ka? (2 marks)May 2026",
        "options": [],
        "correctAnswer": "Do-youbi deshita.",
        "explanation": [
          "nigatsu touka = February 10 = Monday.",
          "February 8 is two days before Monday → it was Saturday.",
          "Saturday = do-youbi.",
          "Answer: Do-youbi deshita.",
          "Book source: Lessons 2, 3, 7 + Appendix Numbers."
        ],
        "prediction": {
          "score": 82,
          "label": "Very Likely — date-to-weekday inference"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "u3",
          "paneTitle": "Unit III",
          "meta": "Part B — Unit III · 2 Full Questions per paper × 3 papers = 6 full questionsSeveral sub-questions are WORD-FOR-WORD IDENTICAL across Jan 2023 and May 2025"
        }
      },
      {
        "id": "u3-may-2026-16-may-2026-unit-iii-questions-q8c-2-126",
        "paperId": "may-2026-16-may-2026-unit-iii-questions",
        "paperTitle": "May 2026 / 16 May 2026 — Unit III Questions",
        "sectionId": "u3",
        "sectionTitle": "📄 May 2026 / 16 May 2026 — Unit III Questions HU1504-1 Open Elective · Q7, Q8 · Book-confirmed",
        "number": "Q8c (2).",
        "prompt": "Read the story and answer: Watashi wa Rei desu. Watashi wa yo-nin kyoudai desu. Watashi ni wa ani to ane to otouto ga imasu. Watashi wa dansei desu. Mondai: What is Rei's status in family? (2 marks)May 2026",
        "options": [],
        "correctAnswer": "C) jinan.",
        "explanation": [
          "Rei is male (dansei).",
          "He has an elder brother (ani), an elder sister (ane), and a younger brother (otouto).",
          "Among sons: elder brother = chounan / first son. Rei = jinan / second son. Younger brother = sannan / third son.",
          "Answer: C) jinan.",
          "Book source: Lessons 3, 7, 19."
        ],
        "prediction": {
          "score": 88,
          "label": "Near Certain — family-position story every paper"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "u3",
          "paneTitle": "Unit III",
          "meta": "Part B — Unit III · 2 Full Questions per paper × 3 papers = 6 full questionsSeveral sub-questions are WORD-FOR-WORD IDENTICAL across Jan 2023 and May 2025"
        }
      },
      {
        "id": "u3-may-2026-16-may-2026-unit-iii-questions-q8d-127",
        "paperId": "may-2026-16-may-2026-unit-iii-questions",
        "paperTitle": "May 2026 / 16 May 2026 — Unit III Questions",
        "sectionId": "u3",
        "sectionTitle": "📄 May 2026 / 16 May 2026 — Unit III Questions HU1504-1 Open Elective · Q7, Q8 · Book-confirmed",
        "number": "Q8d.",
        "prompt": "Match Japanese letters / Kanji to English meaning: 三, 四, 山, 十, 川, 雨, 火, 木. (4 marks)May 2026",
        "options": [],
        "explanation": [
          "1) 三 → h) three",
          "2) 四 → f) four",
          "3) 山 → d) mountain",
          "4) 十 → b) ten",
          "5) 川 → g) river",
          "6) 雨 → e) rain",
          "7) 火 → a) fire",
          "8) 木 → c) tree",
          "Book source: Appendix Kanji."
        ],
        "prediction": {
          "score": 93,
          "label": "Near Certain — Kanji matching every paper"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "u3",
          "paneTitle": "Unit III",
          "meta": "Part B — Unit III · 2 Full Questions per paper × 3 papers = 6 full questionsSeveral sub-questions are WORD-FOR-WORD IDENTICAL across Jan 2023 and May 2025"
        }
      }
    ]
  },
  {
    "id": "paper-a-pre-test-unit-3-2025-duration-1-hour-max-marks-20",
    "title": "Paper A — Pre-test Unit 3, 2025 Duration: 1 Hour · Max Marks: 20",
    "source": "Japanese_Practice_QBank.html",
    "sections": [
      {
        "id": "new2026-paper-a-pre-test-unit-3-2025-duration-1-hour-max-marks-20",
        "pane": "new2026",
        "title": "📄 Paper A — Pre-test Unit 3, 2025 Duration: 1 Hour · Max Marks: 20"
      }
    ],
    "questions": [
      {
        "id": "new2026-paper-a-pre-test-unit-3-2025-duration-1-hour-max-marks-20-a-q1-128",
        "paperId": "paper-a-pre-test-unit-3-2025-duration-1-hour-max-marks-20",
        "paperTitle": "Paper A — Pre-test Unit 3, 2025 Duration: 1 Hour · Max Marks: 20",
        "sectionId": "new2026",
        "sectionTitle": "📄 Paper A — Pre-test Unit 3, 2025 Duration: 1 Hour · Max Marks: 20",
        "number": "A-Q1.",
        "prompt": "Match the same meaning words (10 items): (2 marks)ALL papers",
        "options": [],
        "explanation": [
          "1) umu → b. give birth",
          "2) keikaku → f. plan",
          "3) choujo → g. first daughter",
          "4) shinu → j. to die",
          "5) chounan → e. first son",
          "6) shippai → c. failure",
          "7) korosu → d. to kill",
          "8) jinan → i. second son",
          "9) umareru → h. be born",
          "10) jijo → a. second daughter"
        ],
        "prediction": {
          "score": 96,
          "label": "Near Certain — vocabulary matching appears in EVERY paper"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "new2026",
          "paneTitle": "New Papers 2026",
          "meta": "📋 New Papers — Current Semester (2025–2026) · 5 Papers · ~45 Questions\nPre-test Unit 3 (2025) · VI Sem Mid-Sem II (2026) · Japanese Test 1 (Jan 2026) · VII Sem Mid-Sem I (2026) · Pre-test Unit 2 (Feb 2026)"
        }
      },
      {
        "id": "new2026-paper-a-pre-test-unit-3-2025-duration-1-hour-max-marks-20-a-q2-129",
        "paperId": "paper-a-pre-test-unit-3-2025-duration-1-hour-max-marks-20",
        "paperTitle": "Paper A — Pre-test Unit 3, 2025 Duration: 1 Hour · Max Marks: 20",
        "sectionId": "new2026",
        "sectionTitle": "📄 Paper A — Pre-test Unit 3, 2025 Duration: 1 Hour · Max Marks: 20",
        "number": "A-Q2.",
        "prompt": "How to show the way: Put suitable words into brackets. (3 marks)ALL papers",
        "options": [],
        "explanation": [
          "1) ( eki ) ni wa ( douyatte ) ikimasuka. → How can I go to the station?",
          "2) ( kousaten ) o migi ni ( magatte ) kudasai. → Turn right at the crossroads.",
          "3) ( massugu ) iku to ( tsukitatari ) desu. → If you go straight, you will see the T-junction.",
          "KEY WORDS: massugu(straight) · migi(right) · hidari(left) · kousaten(intersection) · magatte(turn)"
        ],
        "prediction": {
          "score": 95,
          "label": "Near Certain — directions in SEE papers AND new current papers"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "new2026",
          "paneTitle": "New Papers 2026",
          "meta": "📋 New Papers — Current Semester (2025–2026) · 5 Papers · ~45 Questions\nPre-test Unit 3 (2025) · VI Sem Mid-Sem II (2026) · Japanese Test 1 (Jan 2026) · VII Sem Mid-Sem I (2026) · Pre-test Unit 2 (Feb 2026)"
        }
      },
      {
        "id": "new2026-paper-a-pre-test-unit-3-2025-duration-1-hour-max-marks-20-a-q3-130",
        "paperId": "paper-a-pre-test-unit-3-2025-duration-1-hour-max-marks-20",
        "paperTitle": "Paper A — Pre-test Unit 3, 2025 Duration: 1 Hour · Max Marks: 20",
        "sectionId": "new2026",
        "sectionTitle": "📄 Paper A — Pre-test Unit 3, 2025 Duration: 1 Hour · Max Marks: 20",
        "number": "A-Q3.",
        "prompt": "Match the expressions: (2 marks)ALL papers",
        "options": [],
        "explanation": [
          "1) Tasukete kudasai → e. Please help me",
          "2) Shiawase desu → c. I'm happy",
          "3) Tetsudai mashouka → a. Shall I help you?",
          "4) Yamete kudasai → b. Please stop it",
          "5) Hazukashii desu → d. I'm ashamed"
        ],
        "prediction": {
          "score": 93,
          "label": "Near Certain — expression matching in every paper"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "new2026",
          "paneTitle": "New Papers 2026",
          "meta": "📋 New Papers — Current Semester (2025–2026) · 5 Papers · ~45 Questions\nPre-test Unit 3 (2025) · VI Sem Mid-Sem II (2026) · Japanese Test 1 (Jan 2026) · VII Sem Mid-Sem I (2026) · Pre-test Unit 2 (Feb 2026)"
        }
      },
      {
        "id": "new2026-paper-a-pre-test-unit-3-2025-duration-1-hour-max-marks-20-a-q4-131",
        "paperId": "paper-a-pre-test-unit-3-2025-duration-1-hour-max-marks-20",
        "paperTitle": "Paper A — Pre-test Unit 3, 2025 Duration: 1 Hour · Max Marks: 20",
        "sectionId": "new2026",
        "sectionTitle": "📄 Paper A — Pre-test Unit 3, 2025 Duration: 1 Hour · Max Marks: 20",
        "number": "A-Q4.",
        "prompt": "Translate English into Japanese: (4 marks)ALL papers",
        "options": [],
        "explanation": [
          "1) Please give me cold coffee. → Tsumetai koohii o kudasai.",
          "2) I must eat vegetables. → Watashi wa yasai o tabenakereba ikemasen.",
          "3) I passed the exam. → Shiken ni goukaku shimashita. ⭐ (appears in SEE papers too)",
          "4) I may go to Japan. → Watashi wa nihon ni iku kamo shiremasen.",
          "5) You should apologize to her. → Anata wa kanojo ni ayamarasu beki desu."
        ],
        "prediction": {
          "score": 90,
          "label": "Near Certain — translation in every single paper analyzed"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "new2026",
          "paneTitle": "New Papers 2026",
          "meta": "📋 New Papers — Current Semester (2025–2026) · 5 Papers · ~45 Questions\nPre-test Unit 3 (2025) · VI Sem Mid-Sem II (2026) · Japanese Test 1 (Jan 2026) · VII Sem Mid-Sem I (2026) · Pre-test Unit 2 (Feb 2026)"
        }
      },
      {
        "id": "new2026-paper-a-pre-test-unit-3-2025-duration-1-hour-max-marks-20-a-q5-132",
        "paperId": "paper-a-pre-test-unit-3-2025-duration-1-hour-max-marks-20",
        "paperTitle": "Paper A — Pre-test Unit 3, 2025 Duration: 1 Hour · Max Marks: 20",
        "sectionId": "new2026",
        "sectionTitle": "📄 Paper A — Pre-test Unit 3, 2025 Duration: 1 Hour · Max Marks: 20",
        "number": "A-Q5.",
        "prompt": "Put suitable words into brackets: (2 marks)ALL papers",
        "options": [],
        "explanation": [
          "1) ( Dandan ) atsu-ku natte kimashita. → It's getting hotter day by day.",
          "2) Watashi wa Tofu o tabeta ( koto ga arimasu ). → I have eaten Tofu.",
          "3) Hisshi ni benkyou shina ( kereba ) ( narimasen / ikemasen ). → We have to study desperately.",
          "4) Kooto o ( nuide ) kudasai. → Please remove your coat.",
          "PATTERN: ~koto ga arimasu (have done before) · ~kereba narimasen (must do) · ~natte kimashita (becoming)"
        ],
        "prediction": {
          "score": 91,
          "label": "Near Certain — grammar fill-in in every paper"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "new2026",
          "paneTitle": "New Papers 2026",
          "meta": "📋 New Papers — Current Semester (2025–2026) · 5 Papers · ~45 Questions\nPre-test Unit 3 (2025) · VI Sem Mid-Sem II (2026) · Japanese Test 1 (Jan 2026) · VII Sem Mid-Sem I (2026) · Pre-test Unit 2 (Feb 2026)"
        }
      },
      {
        "id": "new2026-paper-a-pre-test-unit-3-2025-duration-1-hour-max-marks-20-a-q6-133",
        "paperId": "paper-a-pre-test-unit-3-2025-duration-1-hour-max-marks-20",
        "paperTitle": "Paper A — Pre-test Unit 3, 2025 Duration: 1 Hour · Max Marks: 20",
        "sectionId": "new2026",
        "sectionTitle": "📄 Paper A — Pre-test Unit 3, 2025 Duration: 1 Hour · Max Marks: 20",
        "number": "A-Q6.",
        "prompt": "Describe your daily routine in 5 sentences. (3 marks)ALL papers",
        "options": [],
        "explanation": [
          "Gozen roku-ji ni okimasu. / Choushoku ni gohan o tabemasu.",
          "Basu ni notte gakkou ni ikimasu. / Gakkou de benkyou o shimasu.",
          "Gogo roku-ji ni ie ni kaerimasu. / Yoru te o araimasu."
        ],
        "prediction": {
          "score": 97,
          "label": "Near Certain — daily routine in literally EVERY paper (8/8 papers)"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "new2026",
          "paneTitle": "New Papers 2026",
          "meta": "📋 New Papers — Current Semester (2025–2026) · 5 Papers · ~45 Questions\nPre-test Unit 3 (2025) · VI Sem Mid-Sem II (2026) · Japanese Test 1 (Jan 2026) · VII Sem Mid-Sem I (2026) · Pre-test Unit 2 (Feb 2026)"
        }
      },
      {
        "id": "new2026-paper-a-pre-test-unit-3-2025-duration-1-hour-max-marks-20-a-q7-134",
        "paperId": "paper-a-pre-test-unit-3-2025-duration-1-hour-max-marks-20",
        "paperTitle": "Paper A — Pre-test Unit 3, 2025 Duration: 1 Hour · Max Marks: 20",
        "sectionId": "new2026",
        "sectionTitle": "📄 Paper A — Pre-test Unit 3, 2025 Duration: 1 Hour · Max Marks: 20",
        "number": "A-Q7.",
        "prompt": "Match the Japanese letters/Kanji: (2 marks)ALL papers",
        "options": [],
        "explanation": [
          "1) 一 → c. one",
          "2) 口 → a. mouth",
          "3) 十 → b. ten",
          "4) 土 → d. above/earth",
          "5) め → e. eyes (め = me = eye)"
        ],
        "prediction": {
          "score": 93,
          "label": "Near Certain — Kanji/letter matching in all papers"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "new2026",
          "paneTitle": "New Papers 2026",
          "meta": "📋 New Papers — Current Semester (2025–2026) · 5 Papers · ~45 Questions\nPre-test Unit 3 (2025) · VI Sem Mid-Sem II (2026) · Japanese Test 1 (Jan 2026) · VII Sem Mid-Sem I (2026) · Pre-test Unit 2 (Feb 2026)"
        }
      },
      {
        "id": "new2026-paper-a-pre-test-unit-3-2025-duration-1-hour-max-marks-20-a-q8-135",
        "paperId": "paper-a-pre-test-unit-3-2025-duration-1-hour-max-marks-20",
        "paperTitle": "Paper A — Pre-test Unit 3, 2025 Duration: 1 Hour · Max Marks: 20",
        "sectionId": "new2026",
        "sectionTitle": "📄 Paper A — Pre-test Unit 3, 2025 Duration: 1 Hour · Max Marks: 20",
        "number": "A-Q8.",
        "prompt": "Re-arrange the sentence to match the English meaning: (2 marks)2 Papers",
        "options": [],
        "explanation": [
          "ex.) desu, Ken, wa, watashi → Watashi wa Ken desu. (I am Ken.)",
          "1) pan, wa, kore, no, futatsuume, desu → Kore wa pan no futatsuume desu. (This is my second helping of bread.)",
          "2) kega, desu, ga, itai, no, ashi → Ashi no kega ga itai desu. (My leg injury is painful.)",
          "3) dari, tenisu, shimasu, o, shitari, oyoi → Oyoidari tenisu o shitari shimasu. (I do things like swimming, playing tennis.)",
          "4) totemo, desu, samui, futte, ga, yuki → Yuki ga futte totemo samui desu. (It's snowing and very cold.)"
        ],
        "prediction": {
          "score": 90,
          "label": "Near Certain — word rearrangement in all SEE + new papers"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "new2026",
          "paneTitle": "New Papers 2026",
          "meta": "📋 New Papers — Current Semester (2025–2026) · 5 Papers · ~45 Questions\nPre-test Unit 3 (2025) · VI Sem Mid-Sem II (2026) · Japanese Test 1 (Jan 2026) · VII Sem Mid-Sem I (2026) · Pre-test Unit 2 (Feb 2026)"
        }
      }
    ]
  },
  {
    "id": "paper-b-vi-sem-b-e-mid-semester-exam-ii-2026-duration-1-hour-max-marks-20",
    "title": "Paper B — VI Sem B.E. Mid Semester Exam II, 2026 Duration: 1 Hour · Max Marks: 20",
    "source": "Japanese_Practice_QBank.html",
    "sections": [
      {
        "id": "new2026-paper-b-vi-sem-b-e-mid-semester-exam-ii-2026-duration-1-hour-max-marks-20",
        "pane": "new2026",
        "title": "📄 Paper B — VI Sem B.E. Mid Semester Exam II, 2026 Duration: 1 Hour · Max Marks: 20"
      }
    ],
    "questions": [
      {
        "id": "new2026-paper-b-vi-sem-b-e-mid-semester-exam-ii-2026-duration-1-hour-max-marks-20-b-q1-136",
        "paperId": "paper-b-vi-sem-b-e-mid-semester-exam-ii-2026-duration-1-hour-max-marks-20",
        "paperTitle": "Paper B — VI Sem B.E. Mid Semester Exam II, 2026 Duration: 1 Hour · Max Marks: 20",
        "sectionId": "new2026",
        "sectionTitle": "📄 Paper B — VI Sem B.E. Mid Semester Exam II, 2026 Duration: 1 Hour · Max Marks: 20",
        "number": "B-Q1.",
        "prompt": "Match the same meaning words (10 items): (2 marks)ALL papers",
        "options": [],
        "explanation": [
          "1) haba → name/width",
          "2) saru → i. monkey",
          "3) nansou → to learn",
          "4) hana → flower/nose",
          "5) kujaku → c. peacock",
          "6) hone → d. bone",
          "7) hanasu → b. to speak",
          "8) ushi → f. cow",
          "9) narau → h. to learn",
          "10) hi → j. blood / fire"
        ],
        "prediction": {
          "score": 96,
          "label": "Near Certain — vocab matching in every paper"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "new2026",
          "paneTitle": "New Papers 2026",
          "meta": "📋 New Papers — Current Semester (2025–2026) · 5 Papers · ~45 Questions\nPre-test Unit 3 (2025) · VI Sem Mid-Sem II (2026) · Japanese Test 1 (Jan 2026) · VII Sem Mid-Sem I (2026) · Pre-test Unit 2 (Feb 2026)"
        }
      },
      {
        "id": "new2026-paper-b-vi-sem-b-e-mid-semester-exam-ii-2026-duration-1-hour-max-marks-20-b-q2-137",
        "paperId": "paper-b-vi-sem-b-e-mid-semester-exam-ii-2026-duration-1-hour-max-marks-20",
        "paperTitle": "Paper B — VI Sem B.E. Mid Semester Exam II, 2026 Duration: 1 Hour · Max Marks: 20",
        "sectionId": "new2026",
        "sectionTitle": "📄 Paper B — VI Sem B.E. Mid Semester Exam II, 2026 Duration: 1 Hour · Max Marks: 20",
        "number": "B-Q2.",
        "prompt": "Put suitable words into brackets: (3 marks)ALL papers",
        "options": [],
        "explanation": [
          "1) Kono ( megane ) wa anata ni ( niai ) masu. → These specs suit you.",
          "2) Raigetsu kara ( hitori ) de ( seikatsu ) shimasu. → I live alone from next month.",
          "3) ( Byouki ) no ( nayami ) wa irimasen. → I don't want worries of illness. ⭐ (SEE paper identical)",
          "4) Watashi wa ( te ) ni pen o ( motte ) imasu. → I have a pen in my hand.",
          "5) Karnataka wa ( minami ) indo ni ( arimasu ). → Karnataka is located in South India."
        ],
        "prediction": {
          "score": 92,
          "label": "Near Certain — fill-in blanks in all papers; \"byouki no nayami\" exact match SEE"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "new2026",
          "paneTitle": "New Papers 2026",
          "meta": "📋 New Papers — Current Semester (2025–2026) · 5 Papers · ~45 Questions\nPre-test Unit 3 (2025) · VI Sem Mid-Sem II (2026) · Japanese Test 1 (Jan 2026) · VII Sem Mid-Sem I (2026) · Pre-test Unit 2 (Feb 2026)"
        }
      },
      {
        "id": "new2026-paper-b-vi-sem-b-e-mid-semester-exam-ii-2026-duration-1-hour-max-marks-20-b-q3-138",
        "paperId": "paper-b-vi-sem-b-e-mid-semester-exam-ii-2026-duration-1-hour-max-marks-20",
        "paperTitle": "Paper B — VI Sem B.E. Mid Semester Exam II, 2026 Duration: 1 Hour · Max Marks: 20",
        "sectionId": "new2026",
        "sectionTitle": "📄 Paper B — VI Sem B.E. Mid Semester Exam II, 2026 Duration: 1 Hour · Max Marks: 20",
        "number": "B-Q3.",
        "prompt": "1) Write about your hobby 2) Write what you are good at. (2 marks)2 Papers",
        "options": [],
        "explanation": [
          "1) Watashi no shumi wa [hobby] desu. → My hobby is [hobby].",
          "2) Watashi wa [skill] ga tokui desu. → I am good at [skill]."
        ],
        "prediction": {
          "score": 90,
          "label": "Near Certain — part of self-introduction, in all papers"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "new2026",
          "paneTitle": "New Papers 2026",
          "meta": "📋 New Papers — Current Semester (2025–2026) · 5 Papers · ~45 Questions\nPre-test Unit 3 (2025) · VI Sem Mid-Sem II (2026) · Japanese Test 1 (Jan 2026) · VII Sem Mid-Sem I (2026) · Pre-test Unit 2 (Feb 2026)"
        }
      },
      {
        "id": "new2026-paper-b-vi-sem-b-e-mid-semester-exam-ii-2026-duration-1-hour-max-marks-20-b-q4-139",
        "paperId": "paper-b-vi-sem-b-e-mid-semester-exam-ii-2026-duration-1-hour-max-marks-20",
        "paperTitle": "Paper B — VI Sem B.E. Mid Semester Exam II, 2026 Duration: 1 Hour · Max Marks: 20",
        "sectionId": "new2026",
        "sectionTitle": "📄 Paper B — VI Sem B.E. Mid Semester Exam II, 2026 Duration: 1 Hour · Max Marks: 20",
        "number": "B-Q4.",
        "prompt": "Translate Japanese into English / English into Japanese: (3 marks)ALL papers",
        "options": [],
        "explanation": [
          "1) Kono doubutsu-en niwa iroiro na doubutsu ga imasu. → The zoo has various kinds of animals.",
          "2) Jiko de kega o shimashita. → I injured myself in an accident.",
          "3) Mary has black and long hair. → Mearii wa kami ga kuro-kute nagai desu.",
          "4) I do exercise in gym every day. → Watashi wa mainichi jimu de undou shimasu.",
          "5) My mother is working at library. → Haha wa toshokan de hataraite imasu."
        ],
        "prediction": {
          "score": 88,
          "label": "Near Certain — translation in every paper"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "new2026",
          "paneTitle": "New Papers 2026",
          "meta": "📋 New Papers — Current Semester (2025–2026) · 5 Papers · ~45 Questions\nPre-test Unit 3 (2025) · VI Sem Mid-Sem II (2026) · Japanese Test 1 (Jan 2026) · VII Sem Mid-Sem I (2026) · Pre-test Unit 2 (Feb 2026)"
        }
      },
      {
        "id": "new2026-paper-b-vi-sem-b-e-mid-semester-exam-ii-2026-duration-1-hour-max-marks-20-b-q5-140",
        "paperId": "paper-b-vi-sem-b-e-mid-semester-exam-ii-2026-duration-1-hour-max-marks-20",
        "paperTitle": "Paper B — VI Sem B.E. Mid Semester Exam II, 2026 Duration: 1 Hour · Max Marks: 20",
        "sectionId": "new2026",
        "sectionTitle": "📄 Paper B — VI Sem B.E. Mid Semester Exam II, 2026 Duration: 1 Hour · Max Marks: 20",
        "number": "B-Q5.",
        "prompt": "Write 3 sentences using following words: (1.5 marks)ALL papers",
        "options": [],
        "explanation": [
          "1) hoshii (want): Watashi wa atarashii kuruma ga hoshii desu. (I want a new car.)",
          "2) -tai (want to do): Watashi wa Nihon ni ikitai desu. (I want to go to Japan.)",
          "3) dekiru (can): Watashi wa kuruma no unten ga dekimasu. (I can drive a car.)"
        ],
        "prediction": {
          "score": 95,
          "label": "Near Certain — hoshii/tai/dekiru in SEE papers AND new papers"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "new2026",
          "paneTitle": "New Papers 2026",
          "meta": "📋 New Papers — Current Semester (2025–2026) · 5 Papers · ~45 Questions\nPre-test Unit 3 (2025) · VI Sem Mid-Sem II (2026) · Japanese Test 1 (Jan 2026) · VII Sem Mid-Sem I (2026) · Pre-test Unit 2 (Feb 2026)"
        }
      },
      {
        "id": "new2026-paper-b-vi-sem-b-e-mid-semester-exam-ii-2026-duration-1-hour-max-marks-20-b-q6-141",
        "paperId": "paper-b-vi-sem-b-e-mid-semester-exam-ii-2026-duration-1-hour-max-marks-20",
        "paperTitle": "Paper B — VI Sem B.E. Mid Semester Exam II, 2026 Duration: 1 Hour · Max Marks: 20",
        "sectionId": "new2026",
        "sectionTitle": "📄 Paper B — VI Sem B.E. Mid Semester Exam II, 2026 Duration: 1 Hour · Max Marks: 20",
        "number": "B-Q6.",
        "prompt": "Match the expressions: (1 mark)2 Papers",
        "options": [],
        "explanation": [
          "1) Osore mashita → I was overwhelmed / You are amazing",
          "2) Bikkuri shimashita → I was surprised",
          "3) Shitsurei shimasu → Sorry for disturbing / Excuse me ⭐ (SEE papers too)",
          "4) Yoku ganbori mashita → You worked very hard",
          "5) Joudan deshou → It must be a joke",
          "6) Wasure mashita → I forgot"
        ],
        "prediction": {
          "score": 90,
          "label": "Near Certain — expression matching in all papers"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "new2026",
          "paneTitle": "New Papers 2026",
          "meta": "📋 New Papers — Current Semester (2025–2026) · 5 Papers · ~45 Questions\nPre-test Unit 3 (2025) · VI Sem Mid-Sem II (2026) · Japanese Test 1 (Jan 2026) · VII Sem Mid-Sem I (2026) · Pre-test Unit 2 (Feb 2026)"
        }
      },
      {
        "id": "new2026-paper-b-vi-sem-b-e-mid-semester-exam-ii-2026-duration-1-hour-max-marks-20-b-q7-142",
        "paperId": "paper-b-vi-sem-b-e-mid-semester-exam-ii-2026-duration-1-hour-max-marks-20",
        "paperTitle": "Paper B — VI Sem B.E. Mid Semester Exam II, 2026 Duration: 1 Hour · Max Marks: 20",
        "sectionId": "new2026",
        "sectionTitle": "📄 Paper B — VI Sem B.E. Mid Semester Exam II, 2026 Duration: 1 Hour · Max Marks: 20",
        "number": "B-Q7.",
        "prompt": "Write 5 sentences using 5W (what, when, where, who, why): (2.5 marks)ALL papers",
        "options": [],
        "explanation": [
          "what: Anata no namae wa nan desuka? (What is your name?)",
          "when: Anata wa itsu ikimasu ka? (When will you go?)",
          "where: Anata wa doko ni imasu ka? (Where are you?)",
          "who: Ano hito wa dare desuka? (Who is that person?)",
          "why: Anata wa naze ikimasuka? (Why do you go?)"
        ],
        "prediction": {
          "score": 88,
          "label": "Near Certain — 5W sentences in SEE papers + new papers"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "new2026",
          "paneTitle": "New Papers 2026",
          "meta": "📋 New Papers — Current Semester (2025–2026) · 5 Papers · ~45 Questions\nPre-test Unit 3 (2025) · VI Sem Mid-Sem II (2026) · Japanese Test 1 (Jan 2026) · VII Sem Mid-Sem I (2026) · Pre-test Unit 2 (Feb 2026)"
        }
      },
      {
        "id": "new2026-paper-b-vi-sem-b-e-mid-semester-exam-ii-2026-duration-1-hour-max-marks-20-b-q8-143",
        "paperId": "paper-b-vi-sem-b-e-mid-semester-exam-ii-2026-duration-1-hour-max-marks-20",
        "paperTitle": "Paper B — VI Sem B.E. Mid Semester Exam II, 2026 Duration: 1 Hour · Max Marks: 20",
        "sectionId": "new2026",
        "sectionTitle": "📄 Paper B — VI Sem B.E. Mid Semester Exam II, 2026 Duration: 1 Hour · Max Marks: 20",
        "number": "B-Q8.",
        "prompt": "Write 5 sentences about your family members. (3 marks)ALL papers",
        "options": [],
        "explanation": [
          "Watashi no kazoku wa [X]-nin desu.",
          "Chichi wa [age]-sai de [job] desu. / Haha wa [adj] desu.",
          "Ani/Ane/Otouto/Imouto wa [age]-sai desu."
        ],
        "prediction": {
          "score": 92,
          "label": "Near Certain — family description in ALL 8 papers"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "new2026",
          "paneTitle": "New Papers 2026",
          "meta": "📋 New Papers — Current Semester (2025–2026) · 5 Papers · ~45 Questions\nPre-test Unit 3 (2025) · VI Sem Mid-Sem II (2026) · Japanese Test 1 (Jan 2026) · VII Sem Mid-Sem I (2026) · Pre-test Unit 2 (Feb 2026)"
        }
      },
      {
        "id": "new2026-paper-b-vi-sem-b-e-mid-semester-exam-ii-2026-duration-1-hour-max-marks-20-b-q9-144",
        "paperId": "paper-b-vi-sem-b-e-mid-semester-exam-ii-2026-duration-1-hour-max-marks-20",
        "paperTitle": "Paper B — VI Sem B.E. Mid Semester Exam II, 2026 Duration: 1 Hour · Max Marks: 20",
        "sectionId": "new2026",
        "sectionTitle": "📄 Paper B — VI Sem B.E. Mid Semester Exam II, 2026 Duration: 1 Hour · Max Marks: 20",
        "number": "B-Q9.",
        "prompt": "Choose suitable counter suffix: (2 marks)ALL papers",
        "options": [],
        "explanation": [
          "1) 2( hon/ppon ) no ki → 2 trees",
          "2) 2( tou ) no zou → 2 elephants",
          "3) 1( ppai/hai ) no koohii → 1 cup of coffee",
          "4) 3( satsu ) no hon → 3 books",
          "5) 2( chaku ) no fuku → 2 dresses",
          "6) 1( dai ) no terebi → 1 TV",
          "7) 1( kai ) → 1 time/floor",
          "8) 5( nin ) no Indo jin → 5 Indians",
          "9) 3( soku ) no kutsu → 3 pairs of shoes",
          "10) 3( mai ) no kami → 3 papers/sheets"
        ],
        "prediction": {
          "score": 95,
          "label": "Near Certain — counter suffixes in ALL papers (SEE + new)"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "new2026",
          "paneTitle": "New Papers 2026",
          "meta": "📋 New Papers — Current Semester (2025–2026) · 5 Papers · ~45 Questions\nPre-test Unit 3 (2025) · VI Sem Mid-Sem II (2026) · Japanese Test 1 (Jan 2026) · VII Sem Mid-Sem I (2026) · Pre-test Unit 2 (Feb 2026)"
        }
      }
    ]
  },
  {
    "id": "paper-c-japanese-test-1-january-2026-duration-30-mins-max-marks-20",
    "title": "Paper C — Japanese Test 1, January 2026 Duration: 30 mins · Max Marks: 20",
    "source": "Japanese_Practice_QBank.html",
    "sections": [
      {
        "id": "new2026-paper-c-japanese-test-1-january-2026-duration-30-mins-max-marks-20",
        "pane": "new2026",
        "title": "📄 Paper C — Japanese Test 1, January 2026 Duration: 30 mins · Max Marks: 20"
      }
    ],
    "questions": [
      {
        "id": "new2026-paper-c-japanese-test-1-january-2026-duration-30-mins-max-marks-20-c-q1-145",
        "paperId": "paper-c-japanese-test-1-january-2026-duration-30-mins-max-marks-20",
        "paperTitle": "Paper C — Japanese Test 1, January 2026 Duration: 30 mins · Max Marks: 20",
        "sectionId": "new2026",
        "sectionTitle": "📄 Paper C — Japanese Test 1, January 2026 Duration: 30 mins · Max Marks: 20",
        "number": "C-Q1.",
        "prompt": "Put the correct particle into the brackets to match English sentence: (2 marks)ALL papers",
        "options": [],
        "explanation": [
          "1) Kore ( wa ) watashi ( no ) inu desu. → This is my dog.",
          "2) Watashi ( wa ) Nitte ( ni ) sunde imasu. → I'm living in Nitte.",
          "3) Mainichi koohii ( o ) nomi masu. → I drink coffee every day.",
          "KEY: wa(topic) · no(possessive) · ni(location/direction) · o(object) · ga(subject) · de(place of action)"
        ],
        "prediction": {
          "score": 97,
          "label": "Near Certain — particles in EVERY single paper analyzed (8/8)"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "new2026",
          "paneTitle": "New Papers 2026",
          "meta": "📋 New Papers — Current Semester (2025–2026) · 5 Papers · ~45 Questions\nPre-test Unit 3 (2025) · VI Sem Mid-Sem II (2026) · Japanese Test 1 (Jan 2026) · VII Sem Mid-Sem I (2026) · Pre-test Unit 2 (Feb 2026)"
        }
      },
      {
        "id": "new2026-paper-c-japanese-test-1-january-2026-duration-30-mins-max-marks-20-c-q2-146",
        "paperId": "paper-c-japanese-test-1-january-2026-duration-30-mins-max-marks-20",
        "paperTitle": "Paper C — Japanese Test 1, January 2026 Duration: 30 mins · Max Marks: 20",
        "sectionId": "new2026",
        "sectionTitle": "📄 Paper C — Japanese Test 1, January 2026 Duration: 30 mins · Max Marks: 20",
        "number": "C-Q2.",
        "prompt": "Express those times in Japanese: (2 marks)ALL papers",
        "options": [],
        "explanation": [
          "1) 4:19 a.m. → Gozen yo-ji juu-kyuu-fun desu.",
          "2) 12:31 p.m. → Gogo juu-ni-ji san-juu-ippun desu.",
          "FORMAT: gozen(AM)/gogo(PM) + [hour]-ji + [min]-fun/pun + desu",
          "Special minutes: 1-pun, 3-pun, 4-fun, 6-pun, 8-pun, 10-pun, 30=san-juu-pun or han"
        ],
        "prediction": {
          "score": 92,
          "label": "Near Certain — time expression in all papers"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "new2026",
          "paneTitle": "New Papers 2026",
          "meta": "📋 New Papers — Current Semester (2025–2026) · 5 Papers · ~45 Questions\nPre-test Unit 3 (2025) · VI Sem Mid-Sem II (2026) · Japanese Test 1 (Jan 2026) · VII Sem Mid-Sem I (2026) · Pre-test Unit 2 (Feb 2026)"
        }
      },
      {
        "id": "new2026-paper-c-japanese-test-1-january-2026-duration-30-mins-max-marks-20-c-q3-147",
        "paperId": "paper-c-japanese-test-1-january-2026-duration-30-mins-max-marks-20",
        "paperTitle": "Paper C — Japanese Test 1, January 2026 Duration: 30 mins · Max Marks: 20",
        "sectionId": "new2026",
        "sectionTitle": "📄 Paper C — Japanese Test 1, January 2026 Duration: 30 mins · Max Marks: 20",
        "number": "C-Q3.",
        "prompt": "Apply correct conjugated form of \"aru\", \"iru\" to the brackets: (2 marks)ALL papers",
        "options": [],
        "explanation": [
          "1) Asoko ni hito ga ( imasu ). → There is a person over there.",
          "2) Tsukue no ue ni hon ga ( arimasu ). → There is a book on the desk.",
          "3) Watashi ni kyoudai wa ( imasen ). → I have no siblings.",
          "4) Kyou wa class ga ( arimashita ). → Today we had class.",
          "RULE: iru/imasu = living things · aru/arimasu = non-living things · negative: imasen / arimasen"
        ],
        "prediction": {
          "score": 97,
          "label": "Near Certain — aru/iru conjugation in ALL 8 papers analyzed"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "new2026",
          "paneTitle": "New Papers 2026",
          "meta": "📋 New Papers — Current Semester (2025–2026) · 5 Papers · ~45 Questions\nPre-test Unit 3 (2025) · VI Sem Mid-Sem II (2026) · Japanese Test 1 (Jan 2026) · VII Sem Mid-Sem I (2026) · Pre-test Unit 2 (Feb 2026)"
        }
      },
      {
        "id": "new2026-paper-c-japanese-test-1-january-2026-duration-30-mins-max-marks-20-c-q4a-148",
        "paperId": "paper-c-japanese-test-1-january-2026-duration-30-mins-max-marks-20",
        "paperTitle": "Paper C — Japanese Test 1, January 2026 Duration: 30 mins · Max Marks: 20",
        "sectionId": "new2026",
        "sectionTitle": "📄 Paper C — Japanese Test 1, January 2026 Duration: 30 mins · Max Marks: 20",
        "number": "C-Q4a.",
        "prompt": "Write 2 Japanese greetings with English meaning: (1 mark)2 Papers",
        "options": [],
        "explanation": [
          "Ohayou gozaimasu (Good morning) · Konnichiwa (Good afternoon) · Konbanwa (Good evening)",
          "Oyasumi nasai (Good night) · Sayounara (Goodbye) · Ja mata (See you) · Sumimasen (Excuse me)",
          "Itadakimasu (Before eating) · Gochisousama deshita (After eating)"
        ],
        "prediction": {
          "score": 90,
          "label": "Near Certain — greetings in every paper"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "new2026",
          "paneTitle": "New Papers 2026",
          "meta": "📋 New Papers — Current Semester (2025–2026) · 5 Papers · ~45 Questions\nPre-test Unit 3 (2025) · VI Sem Mid-Sem II (2026) · Japanese Test 1 (Jan 2026) · VII Sem Mid-Sem I (2026) · Pre-test Unit 2 (Feb 2026)"
        }
      },
      {
        "id": "new2026-paper-c-japanese-test-1-january-2026-duration-30-mins-max-marks-20-c-q4b-149",
        "paperId": "paper-c-japanese-test-1-january-2026-duration-30-mins-max-marks-20",
        "paperTitle": "Paper C — Japanese Test 1, January 2026 Duration: 30 mins · Max Marks: 20",
        "sectionId": "new2026",
        "sectionTitle": "📄 Paper C — Japanese Test 1, January 2026 Duration: 30 mins · Max Marks: 20",
        "number": "C-Q4b.",
        "prompt": "Write 2 nouns related to family member with English meaning: (1 mark)2 Papers",
        "options": [],
        "explanation": [
          "chichi(father) · haha(mother) · ani(older bro) · ane(older sis) · otouto(younger bro) · imouto(younger sis)",
          "sofu(grandfather) · sobo(grandmother) · ojisan(uncle) · obasan(aunt) · musuko(son) · musume(daughter)"
        ],
        "prediction": {
          "score": 88,
          "label": "Very Likely — family vocab in all papers"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "new2026",
          "paneTitle": "New Papers 2026",
          "meta": "📋 New Papers — Current Semester (2025–2026) · 5 Papers · ~45 Questions\nPre-test Unit 3 (2025) · VI Sem Mid-Sem II (2026) · Japanese Test 1 (Jan 2026) · VII Sem Mid-Sem I (2026) · Pre-test Unit 2 (Feb 2026)"
        }
      },
      {
        "id": "new2026-paper-c-japanese-test-1-january-2026-duration-30-mins-max-marks-20-c-q4c-150",
        "paperId": "paper-c-japanese-test-1-january-2026-duration-30-mins-max-marks-20",
        "paperTitle": "Paper C — Japanese Test 1, January 2026 Duration: 30 mins · Max Marks: 20",
        "sectionId": "new2026",
        "sectionTitle": "📄 Paper C — Japanese Test 1, January 2026 Duration: 30 mins · Max Marks: 20",
        "number": "C-Q4c.",
        "prompt": "Write 2 adjectives with English meaning: (1 mark)2 Papers",
        "options": [],
        "explanation": [
          "kirei(beautiful) · shinsetsu(kind) · ookii(big) · chiisai(small) · takai(expensive/tall)",
          "yasui(cheap) · atarashii(new) · furui(old) · omoshiroi(interesting) · kawaii(cute)"
        ],
        "prediction": {
          "score": 85,
          "label": "Very Likely — adjectives in all papers"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "new2026",
          "paneTitle": "New Papers 2026",
          "meta": "📋 New Papers — Current Semester (2025–2026) · 5 Papers · ~45 Questions\nPre-test Unit 3 (2025) · VI Sem Mid-Sem II (2026) · Japanese Test 1 (Jan 2026) · VII Sem Mid-Sem I (2026) · Pre-test Unit 2 (Feb 2026)"
        }
      },
      {
        "id": "new2026-paper-c-japanese-test-1-january-2026-duration-30-mins-max-marks-20-c-q5-151",
        "paperId": "paper-c-japanese-test-1-january-2026-duration-30-mins-max-marks-20",
        "paperTitle": "Paper C — Japanese Test 1, January 2026 Duration: 30 mins · Max Marks: 20",
        "sectionId": "new2026",
        "sectionTitle": "📄 Paper C — Japanese Test 1, January 2026 Duration: 30 mins · Max Marks: 20",
        "number": "C-Q5.",
        "prompt": "Match the same meaning words: (2 marks)ALL papers",
        "options": [],
        "explanation": [
          "1) ue → b. above",
          "2) tanjoubi → c. birthday",
          "3) ie → a. house",
          "4) miru → e. to see",
          "5) shita → d. under"
        ],
        "prediction": {
          "score": 94,
          "label": "Near Certain — vocab matching in every paper"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "new2026",
          "paneTitle": "New Papers 2026",
          "meta": "📋 New Papers — Current Semester (2025–2026) · 5 Papers · ~45 Questions\nPre-test Unit 3 (2025) · VI Sem Mid-Sem II (2026) · Japanese Test 1 (Jan 2026) · VII Sem Mid-Sem I (2026) · Pre-test Unit 2 (Feb 2026)"
        }
      },
      {
        "id": "new2026-paper-c-japanese-test-1-january-2026-duration-30-mins-max-marks-20-c-q6-152",
        "paperId": "paper-c-japanese-test-1-january-2026-duration-30-mins-max-marks-20",
        "paperTitle": "Paper C — Japanese Test 1, January 2026 Duration: 30 mins · Max Marks: 20",
        "sectionId": "new2026",
        "sectionTitle": "📄 Paper C — Japanese Test 1, January 2026 Duration: 30 mins · Max Marks: 20",
        "number": "C-Q6.",
        "prompt": "Translate into Japanese: (2 marks)ALL papers",
        "options": [],
        "explanation": [
          "1) Today is cold. → Kyou wa samui desu.",
          "2) I'm not a student. → Watashi wa gakusei dewa arimasen.",
          "3) She ate bread. → Kanojo wa pan o tabemashita.",
          "4) This car was big and spacious. → Sono kuruma wa ookikute hiroi deshita."
        ],
        "prediction": {
          "score": 90,
          "label": "Near Certain — translation in every paper"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "new2026",
          "paneTitle": "New Papers 2026",
          "meta": "📋 New Papers — Current Semester (2025–2026) · 5 Papers · ~45 Questions\nPre-test Unit 3 (2025) · VI Sem Mid-Sem II (2026) · Japanese Test 1 (Jan 2026) · VII Sem Mid-Sem I (2026) · Pre-test Unit 2 (Feb 2026)"
        }
      },
      {
        "id": "new2026-paper-c-japanese-test-1-january-2026-duration-30-mins-max-marks-20-c-q7-153",
        "paperId": "paper-c-japanese-test-1-january-2026-duration-30-mins-max-marks-20",
        "paperTitle": "Paper C — Japanese Test 1, January 2026 Duration: 30 mins · Max Marks: 20",
        "sectionId": "new2026",
        "sectionTitle": "📄 Paper C — Japanese Test 1, January 2026 Duration: 30 mins · Max Marks: 20",
        "number": "C-Q7.",
        "prompt": "Write these numbers or months in Japanese: (2 marks)ALL papers",
        "options": [],
        "explanation": [
          "1) 350 → san-byaku go-juu",
          "2) 194 → hyaku kyuu-juu-yon",
          "3) September → ku-gatsu",
          "4) 11,687 → ichiman-issen-roppyaku-hachi-juu-nana",
          "MONTHS: ichi(1)~juu-ni(12)-gatsu · NUMBERS: hyaku(100)·sen(1000)·ichiman(10000)"
        ],
        "prediction": {
          "score": 92,
          "label": "Near Certain — numbers/months expression in all papers"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "new2026",
          "paneTitle": "New Papers 2026",
          "meta": "📋 New Papers — Current Semester (2025–2026) · 5 Papers · ~45 Questions\nPre-test Unit 3 (2025) · VI Sem Mid-Sem II (2026) · Japanese Test 1 (Jan 2026) · VII Sem Mid-Sem I (2026) · Pre-test Unit 2 (Feb 2026)"
        }
      },
      {
        "id": "new2026-paper-c-japanese-test-1-january-2026-duration-30-mins-max-marks-20-c-q8-154",
        "paperId": "paper-c-japanese-test-1-january-2026-duration-30-mins-max-marks-20",
        "paperTitle": "Paper C — Japanese Test 1, January 2026 Duration: 30 mins · Max Marks: 20",
        "sectionId": "new2026",
        "sectionTitle": "📄 Paper C — Japanese Test 1, January 2026 Duration: 30 mins · Max Marks: 20",
        "number": "C-Q8.",
        "prompt": "Express today's date (year, month, day) in Japanese: (1 mark)ALL papers",
        "options": [],
        "explanation": [
          "FORMAT: [Year]-nen [Month]-gatsu [Day]-nichi",
          "e.g. Nisen-nijuu-roku-nen ichi-gatsu sanjuu-ichi-nichi. (2026 January 31st)"
        ],
        "prediction": {
          "score": 93,
          "label": "Near Certain — date expression in all papers"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "new2026",
          "paneTitle": "New Papers 2026",
          "meta": "📋 New Papers — Current Semester (2025–2026) · 5 Papers · ~45 Questions\nPre-test Unit 3 (2025) · VI Sem Mid-Sem II (2026) · Japanese Test 1 (Jan 2026) · VII Sem Mid-Sem I (2026) · Pre-test Unit 2 (Feb 2026)"
        }
      },
      {
        "id": "new2026-paper-c-japanese-test-1-january-2026-duration-30-mins-max-marks-20-c-q9-155",
        "paperId": "paper-c-japanese-test-1-january-2026-duration-30-mins-max-marks-20",
        "paperTitle": "Paper C — Japanese Test 1, January 2026 Duration: 30 mins · Max Marks: 20",
        "sectionId": "new2026",
        "sectionTitle": "📄 Paper C — Japanese Test 1, January 2026 Duration: 30 mins · Max Marks: 20",
        "number": "C-Q9.",
        "prompt": "Introduce yourself in Japanese. Write 5 sentences. (3 marks)ALL papers",
        "options": [],
        "explanation": [
          "Watashi no namae wa [name] desu. (My name is [name].)",
          "Watashi wa [age]-sai desu. (I am [age] years old.)",
          "[City]-ni sunde imasu. (I live in [city].)",
          "Watashi wa [dept] no gakusei desu. (I am a student of [dept].)",
          "Watashi wa yo-nin kazoku desu. (My family has 4 members.)"
        ],
        "prediction": {
          "score": 97,
          "label": "Near Certain — self-introduction in ALL 8 papers"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "new2026",
          "paneTitle": "New Papers 2026",
          "meta": "📋 New Papers — Current Semester (2025–2026) · 5 Papers · ~45 Questions\nPre-test Unit 3 (2025) · VI Sem Mid-Sem II (2026) · Japanese Test 1 (Jan 2026) · VII Sem Mid-Sem I (2026) · Pre-test Unit 2 (Feb 2026)"
        }
      }
    ]
  },
  {
    "id": "paper-d-vii-sem-b-e-mid-semester-exam-i-2026-duration-1-hour-max-marks-20",
    "title": "Paper D — VII Sem B.E. Mid Semester Exam I, 2026 Duration: 1 Hour · Max Marks: 20",
    "source": "Japanese_Practice_QBank.html",
    "sections": [
      {
        "id": "new2026-paper-d-vii-sem-b-e-mid-semester-exam-i-2026-duration-1-hour-max-marks-20",
        "pane": "new2026",
        "title": "📄 Paper D — VII Sem B.E. Mid Semester Exam I, 2026 Duration: 1 Hour · Max Marks: 20"
      }
    ],
    "questions": [
      {
        "id": "new2026-paper-d-vii-sem-b-e-mid-semester-exam-i-2026-duration-1-hour-max-marks-20-d-q1-156",
        "paperId": "paper-d-vii-sem-b-e-mid-semester-exam-i-2026-duration-1-hour-max-marks-20",
        "paperTitle": "Paper D — VII Sem B.E. Mid Semester Exam I, 2026 Duration: 1 Hour · Max Marks: 20",
        "sectionId": "new2026",
        "sectionTitle": "📄 Paper D — VII Sem B.E. Mid Semester Exam I, 2026 Duration: 1 Hour · Max Marks: 20",
        "number": "D-Q1.",
        "prompt": "Match the same meaning words (10 items): (2 marks)ALL papers",
        "options": [],
        "explanation": [
          "1) sukoshi → e. a little",
          "2) maa → d. (so-so / well)",
          "3) onaji → c. same/cool",
          "4) ima → j. now",
          "5) wakai → i. young",
          "6) shashin → f. photo",
          "7) umi → h. the sea",
          "8) taisetsu → c. important",
          "9) suzushii → d. cool/refreshing",
          "10) eki → b. station"
        ],
        "prediction": {
          "score": 96,
          "label": "Near Certain — vocab matching in every paper"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "new2026",
          "paneTitle": "New Papers 2026",
          "meta": "📋 New Papers — Current Semester (2025–2026) · 5 Papers · ~45 Questions\nPre-test Unit 3 (2025) · VI Sem Mid-Sem II (2026) · Japanese Test 1 (Jan 2026) · VII Sem Mid-Sem I (2026) · Pre-test Unit 2 (Feb 2026)"
        }
      },
      {
        "id": "new2026-paper-d-vii-sem-b-e-mid-semester-exam-i-2026-duration-1-hour-max-marks-20-d-q2-157",
        "paperId": "paper-d-vii-sem-b-e-mid-semester-exam-i-2026-duration-1-hour-max-marks-20",
        "paperTitle": "Paper D — VII Sem B.E. Mid Semester Exam I, 2026 Duration: 1 Hour · Max Marks: 20",
        "sectionId": "new2026",
        "sectionTitle": "📄 Paper D — VII Sem B.E. Mid Semester Exam I, 2026 Duration: 1 Hour · Max Marks: 20",
        "number": "D-Q2.",
        "prompt": "Put the correct particle into the brackets: (2 marks)ALL papers",
        "options": [],
        "explanation": [
          "1) Tomodachi ( no ) ie ( ni/e ) ikimasu. → I go to my friend's house.",
          "2) Are ( mo ) watashi ( no ) kuruma desu. → That is my car also.",
          "3) Daigaku ( de ) benkyou ( o ) shimasu. → I study at university.",
          "4) Gyuunyuu ( o ) nomi-masu. → I drink milk.",
          "5) Koohii ( ga ) suki desu. → I like coffee.",
          "6) Anata ( wa ) gakusei ( desuka ) ? → Are you a student?"
        ],
        "prediction": {
          "score": 97,
          "label": "Near Certain — particles in ALL 8 papers"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "new2026",
          "paneTitle": "New Papers 2026",
          "meta": "📋 New Papers — Current Semester (2025–2026) · 5 Papers · ~45 Questions\nPre-test Unit 3 (2025) · VI Sem Mid-Sem II (2026) · Japanese Test 1 (Jan 2026) · VII Sem Mid-Sem I (2026) · Pre-test Unit 2 (Feb 2026)"
        }
      },
      {
        "id": "new2026-paper-d-vii-sem-b-e-mid-semester-exam-i-2026-duration-1-hour-max-marks-20-d-q3-158",
        "paperId": "paper-d-vii-sem-b-e-mid-semester-exam-i-2026-duration-1-hour-max-marks-20",
        "paperTitle": "Paper D — VII Sem B.E. Mid Semester Exam I, 2026 Duration: 1 Hour · Max Marks: 20",
        "sectionId": "new2026",
        "sectionTitle": "📄 Paper D — VII Sem B.E. Mid Semester Exam I, 2026 Duration: 1 Hour · Max Marks: 20",
        "number": "D-Q3.",
        "prompt": "Write 5 nouns related to family member with English meaning: (1 mark)ALL papers",
        "options": [],
        "explanation": [
          "chichi(father) · haha(mother) · ani(older brother) · ane(older sister) · otouto(younger brother)",
          "imouto(younger sister) · sofu(grandfather) · sobo(grandmother) · ojisan(uncle) · obasan(aunt)"
        ],
        "prediction": {
          "score": 92,
          "label": "Near Certain — family nouns in all papers"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "new2026",
          "paneTitle": "New Papers 2026",
          "meta": "📋 New Papers — Current Semester (2025–2026) · 5 Papers · ~45 Questions\nPre-test Unit 3 (2025) · VI Sem Mid-Sem II (2026) · Japanese Test 1 (Jan 2026) · VII Sem Mid-Sem I (2026) · Pre-test Unit 2 (Feb 2026)"
        }
      },
      {
        "id": "new2026-paper-d-vii-sem-b-e-mid-semester-exam-i-2026-duration-1-hour-max-marks-20-d-q4-159",
        "paperId": "paper-d-vii-sem-b-e-mid-semester-exam-i-2026-duration-1-hour-max-marks-20",
        "paperTitle": "Paper D — VII Sem B.E. Mid Semester Exam I, 2026 Duration: 1 Hour · Max Marks: 20",
        "sectionId": "new2026",
        "sectionTitle": "📄 Paper D — VII Sem B.E. Mid Semester Exam I, 2026 Duration: 1 Hour · Max Marks: 20",
        "number": "D-Q4.",
        "prompt": "Apply correct conjugated form of \"aru\", \"iru\" to the bracket: (2 marks)ALL papers",
        "options": [],
        "explanation": [
          "1) Koko ni mise ga ( arimasu ). → Here is a shop.",
          "2) Kare wa koko ni ( imasen deshita ). → He was not here.",
          "3) Neko ga ( imasu ). → There is a cat.",
          "4) Ie wa ( dewa arimasen / ja arimasen ). → There was no house.",
          "5) Ki ga ( arimashita ). → There was a tree."
        ],
        "prediction": {
          "score": 97,
          "label": "Near Certain — aru/iru in ALL 8 papers"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "new2026",
          "paneTitle": "New Papers 2026",
          "meta": "📋 New Papers — Current Semester (2025–2026) · 5 Papers · ~45 Questions\nPre-test Unit 3 (2025) · VI Sem Mid-Sem II (2026) · Japanese Test 1 (Jan 2026) · VII Sem Mid-Sem I (2026) · Pre-test Unit 2 (Feb 2026)"
        }
      },
      {
        "id": "new2026-paper-d-vii-sem-b-e-mid-semester-exam-i-2026-duration-1-hour-max-marks-20-d-q5-160",
        "paperId": "paper-d-vii-sem-b-e-mid-semester-exam-i-2026-duration-1-hour-max-marks-20",
        "paperTitle": "Paper D — VII Sem B.E. Mid Semester Exam I, 2026 Duration: 1 Hour · Max Marks: 20",
        "sectionId": "new2026",
        "sectionTitle": "📄 Paper D — VII Sem B.E. Mid Semester Exam I, 2026 Duration: 1 Hour · Max Marks: 20",
        "number": "D-Q5.",
        "prompt": "Write 5 Japanese greetings with English meaning: (2 marks)ALL papers",
        "options": [],
        "explanation": [
          "1) Ohayou gozaimasu → Good morning",
          "2) Konnichiwa → Good afternoon",
          "3) Oyasumi nasai → Good night",
          "4) Konbanwa → Good evening",
          "5) Sayounara → Goodbye",
          "6) Sumimasen → Excuse me",
          "7) Arigatou gozaimasu → Thank you very much"
        ],
        "prediction": {
          "score": 93,
          "label": "Near Certain — greetings in all papers"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "new2026",
          "paneTitle": "New Papers 2026",
          "meta": "📋 New Papers — Current Semester (2025–2026) · 5 Papers · ~45 Questions\nPre-test Unit 3 (2025) · VI Sem Mid-Sem II (2026) · Japanese Test 1 (Jan 2026) · VII Sem Mid-Sem I (2026) · Pre-test Unit 2 (Feb 2026)"
        }
      },
      {
        "id": "new2026-paper-d-vii-sem-b-e-mid-semester-exam-i-2026-duration-1-hour-max-marks-20-d-q6-161",
        "paperId": "paper-d-vii-sem-b-e-mid-semester-exam-i-2026-duration-1-hour-max-marks-20",
        "paperTitle": "Paper D — VII Sem B.E. Mid Semester Exam I, 2026 Duration: 1 Hour · Max Marks: 20",
        "sectionId": "new2026",
        "sectionTitle": "📄 Paper D — VII Sem B.E. Mid Semester Exam I, 2026 Duration: 1 Hour · Max Marks: 20",
        "number": "D-Q6.",
        "prompt": "Translate into English / Japanese: (2 marks)ALL papers",
        "options": [],
        "explanation": [
          "1) Aisukuriimu wa tsumeta-kute oishikatta. → Ice cream was cold and tasty.",
          "2) Tanaka san wa kaisha no keieisha deshita. → Mr. Tanaka was the company manager.",
          "3) I didn't eat breakfast today. → Watashi wa kyou asa gohan o tabemasen deshita.",
          "4) I am a student of engineering department. → Watashi wa kougakubu no gakusei desu.",
          "5) How much is this watch? → Kono tokei wa ikura desuka?"
        ],
        "prediction": {
          "score": 90,
          "label": "Near Certain — translation in every paper"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "new2026",
          "paneTitle": "New Papers 2026",
          "meta": "📋 New Papers — Current Semester (2025–2026) · 5 Papers · ~45 Questions\nPre-test Unit 3 (2025) · VI Sem Mid-Sem II (2026) · Japanese Test 1 (Jan 2026) · VII Sem Mid-Sem I (2026) · Pre-test Unit 2 (Feb 2026)"
        }
      },
      {
        "id": "new2026-paper-d-vii-sem-b-e-mid-semester-exam-i-2026-duration-1-hour-max-marks-20-d-q7-162",
        "paperId": "paper-d-vii-sem-b-e-mid-semester-exam-i-2026-duration-1-hour-max-marks-20",
        "paperTitle": "Paper D — VII Sem B.E. Mid Semester Exam I, 2026 Duration: 1 Hour · Max Marks: 20",
        "sectionId": "new2026",
        "sectionTitle": "📄 Paper D — VII Sem B.E. Mid Semester Exam I, 2026 Duration: 1 Hour · Max Marks: 20",
        "number": "D-Q7.",
        "prompt": "Write these number / date / times in Japanese: (2 marks)ALL papers",
        "options": [],
        "explanation": [
          "1) April 29th → Shi-gatsu nijuu-ku-nichi",
          "2) 11,830 → Ichiman-issen-happyaku-san-juu",
          "3) 7:24 PM → Gogo nana-ji nijuu-yon-fun",
          "4) 9:08 AM → Gozen ku-ji happun / ku-ji zero-hachi-fun"
        ],
        "prediction": {
          "score": 92,
          "label": "Near Certain — numbers and times in all papers"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "new2026",
          "paneTitle": "New Papers 2026",
          "meta": "📋 New Papers — Current Semester (2025–2026) · 5 Papers · ~45 Questions\nPre-test Unit 3 (2025) · VI Sem Mid-Sem II (2026) · Japanese Test 1 (Jan 2026) · VII Sem Mid-Sem I (2026) · Pre-test Unit 2 (Feb 2026)"
        }
      },
      {
        "id": "new2026-paper-d-vii-sem-b-e-mid-semester-exam-i-2026-duration-1-hour-max-marks-20-d-q8-163",
        "paperId": "paper-d-vii-sem-b-e-mid-semester-exam-i-2026-duration-1-hour-max-marks-20",
        "paperTitle": "Paper D — VII Sem B.E. Mid Semester Exam I, 2026 Duration: 1 Hour · Max Marks: 20",
        "sectionId": "new2026",
        "sectionTitle": "📄 Paper D — VII Sem B.E. Mid Semester Exam I, 2026 Duration: 1 Hour · Max Marks: 20",
        "number": "D-Q8.",
        "prompt": "Express today's date (year, month, day) in Japanese. (1 mark)ALL papers",
        "options": [],
        "explanation": [
          "Nisen-nijuu-roku-nen ichi-gatsu futsuka. (2026 January 2nd)",
          "FORMAT: [YYYY]-nen + [M]-gatsu + [D]-nichi"
        ],
        "prediction": {
          "score": 93,
          "label": "Near Certain — date in ALL papers"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "new2026",
          "paneTitle": "New Papers 2026",
          "meta": "📋 New Papers — Current Semester (2025–2026) · 5 Papers · ~45 Questions\nPre-test Unit 3 (2025) · VI Sem Mid-Sem II (2026) · Japanese Test 1 (Jan 2026) · VII Sem Mid-Sem I (2026) · Pre-test Unit 2 (Feb 2026)"
        }
      },
      {
        "id": "new2026-paper-d-vii-sem-b-e-mid-semester-exam-i-2026-duration-1-hour-max-marks-20-d-q9-164",
        "paperId": "paper-d-vii-sem-b-e-mid-semester-exam-i-2026-duration-1-hour-max-marks-20",
        "paperTitle": "Paper D — VII Sem B.E. Mid Semester Exam I, 2026 Duration: 1 Hour · Max Marks: 20",
        "sectionId": "new2026",
        "sectionTitle": "📄 Paper D — VII Sem B.E. Mid Semester Exam I, 2026 Duration: 1 Hour · Max Marks: 20",
        "number": "D-Q9.",
        "prompt": "Choose correct suffix word (~ku nai, katta, ni naru, ku shite, deshita) — match English: (2 marks)ALL papers",
        "options": [],
        "explanation": [
          "1) Kirei ( ni naru ). → It becomes beautiful. (ni naru = become)",
          "2) Ooki ( katta ). → It was big. (~katta = past tense i-adj)",
          "3) Omoshiro ( ku nai ). → It is not interesting. (~ku nai = negative i-adj)",
          "4) Atsu ( ku shite ) kudasai. → Please make it hot. (~ku shite = te-form)",
          "5) Shizuka ( deshita ). → It was quiet. (na-adj past = deshita)",
          "KEY PATTERN: i-adj: takai→takaku · past: takakatta · neg: takakunai"
        ],
        "prediction": {
          "score": 88,
          "label": "Near Certain — adjective conjugation suffix in all papers"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "new2026",
          "paneTitle": "New Papers 2026",
          "meta": "📋 New Papers — Current Semester (2025–2026) · 5 Papers · ~45 Questions\nPre-test Unit 3 (2025) · VI Sem Mid-Sem II (2026) · Japanese Test 1 (Jan 2026) · VII Sem Mid-Sem I (2026) · Pre-test Unit 2 (Feb 2026)"
        }
      },
      {
        "id": "new2026-paper-d-vii-sem-b-e-mid-semester-exam-i-2026-duration-1-hour-max-marks-20-d-q10-165",
        "paperId": "paper-d-vii-sem-b-e-mid-semester-exam-i-2026-duration-1-hour-max-marks-20",
        "paperTitle": "Paper D — VII Sem B.E. Mid Semester Exam I, 2026 Duration: 1 Hour · Max Marks: 20",
        "sectionId": "new2026",
        "sectionTitle": "📄 Paper D — VII Sem B.E. Mid Semester Exam I, 2026 Duration: 1 Hour · Max Marks: 20",
        "number": "D-Q10.",
        "prompt": "Introduce yourself in Japanese. Make 5 sentences. (3 marks)ALL papers",
        "options": [],
        "explanation": [],
        "prediction": {
          "score": 97,
          "label": "Near Certain — self-introduction in ALL 8 papers"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "new2026",
          "paneTitle": "New Papers 2026",
          "meta": "📋 New Papers — Current Semester (2025–2026) · 5 Papers · ~45 Questions\nPre-test Unit 3 (2025) · VI Sem Mid-Sem II (2026) · Japanese Test 1 (Jan 2026) · VII Sem Mid-Sem I (2026) · Pre-test Unit 2 (Feb 2026)"
        }
      }
    ]
  },
  {
    "id": "paper-e-japanese-pre-test-unit-2-february-2026-duration-60-mins-max-marks-20",
    "title": "Paper E — Japanese Pre-test Unit 2, February 2026 Duration: 60 mins · Max Marks: 20",
    "source": "Japanese_Practice_QBank.html",
    "sections": [
      {
        "id": "new2026-paper-e-japanese-pre-test-unit-2-february-2026-duration-60-mins-max-marks-20",
        "pane": "new2026",
        "title": "📄 Paper E — Japanese Pre-test Unit 2, February 2026 Duration: 60 mins · Max Marks: 20"
      }
    ],
    "questions": [
      {
        "id": "new2026-paper-e-japanese-pre-test-unit-2-february-2026-duration-60-mins-max-marks-20-e-q1a-166",
        "paperId": "paper-e-japanese-pre-test-unit-2-february-2026-duration-60-mins-max-marks-20",
        "paperTitle": "Paper E — Japanese Pre-test Unit 2, February 2026 Duration: 60 mins · Max Marks: 20",
        "sectionId": "new2026",
        "sectionTitle": "📄 Paper E — Japanese Pre-test Unit 2, February 2026 Duration: 60 mins · Max Marks: 20",
        "number": "E-Q1a.",
        "prompt": "Write 5 animals or colors with English meaning: (1 mark)2 Papers",
        "options": [],
        "explanation": [
          "Colors: aka(red) · shiro(white) · kuro(black) · ao(blue) · kiiro(yellow) · midori(green) · murasaki(purple) · kin(gold) · gin(silver)",
          "Animals: inu(dog) · neko(cat) · tori(bird) · sakana(fish) · zou(elephant) · tora(tiger) · kuma(bear) · usagi(rabbit)"
        ],
        "prediction": {
          "score": 78,
          "label": "Very Likely — colors/animals in new papers"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "new2026",
          "paneTitle": "New Papers 2026",
          "meta": "📋 New Papers — Current Semester (2025–2026) · 5 Papers · ~45 Questions\nPre-test Unit 3 (2025) · VI Sem Mid-Sem II (2026) · Japanese Test 1 (Jan 2026) · VII Sem Mid-Sem I (2026) · Pre-test Unit 2 (Feb 2026)"
        }
      },
      {
        "id": "new2026-paper-e-japanese-pre-test-unit-2-february-2026-duration-60-mins-max-marks-20-e-q1b-167",
        "paperId": "paper-e-japanese-pre-test-unit-2-february-2026-duration-60-mins-max-marks-20",
        "paperTitle": "Paper E — Japanese Pre-test Unit 2, February 2026 Duration: 60 mins · Max Marks: 20",
        "sectionId": "new2026",
        "sectionTitle": "📄 Paper E — Japanese Pre-test Unit 2, February 2026 Duration: 60 mins · Max Marks: 20",
        "number": "E-Q1b.",
        "prompt": "Write 5 words related to body with English meaning: (1 mark)2 Papers",
        "options": [],
        "explanation": [
          "mune(chest) · kao(face) · te(hand) · mimi(ear) · atama(head) · me(eye) · kuchi(mouth)",
          "hana(nose) · ashi(leg) · kubi(neck) · kata(shoulder) · onaka(stomach) · senaka(back)"
        ],
        "prediction": {
          "score": 90,
          "label": "Near Certain — body parts in all papers"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "new2026",
          "paneTitle": "New Papers 2026",
          "meta": "📋 New Papers — Current Semester (2025–2026) · 5 Papers · ~45 Questions\nPre-test Unit 3 (2025) · VI Sem Mid-Sem II (2026) · Japanese Test 1 (Jan 2026) · VII Sem Mid-Sem I (2026) · Pre-test Unit 2 (Feb 2026)"
        }
      },
      {
        "id": "new2026-paper-e-japanese-pre-test-unit-2-february-2026-duration-60-mins-max-marks-20-e-q3-168",
        "paperId": "paper-e-japanese-pre-test-unit-2-february-2026-duration-60-mins-max-marks-20",
        "paperTitle": "Paper E — Japanese Pre-test Unit 2, February 2026 Duration: 60 mins · Max Marks: 20",
        "sectionId": "new2026",
        "sectionTitle": "📄 Paper E — Japanese Pre-test Unit 2, February 2026 Duration: 60 mins · Max Marks: 20",
        "number": "E-Q3.",
        "prompt": "Translation into Japanese — 5W questions: (2 marks)ALL papers",
        "options": [],
        "explanation": [
          "1) Who is that person? → Ano hito wa dare desuka?",
          "2) Why do you like anime? → Naze anime ga suki desuka?",
          "3) Where is your house? → Anata no ie wa doko ni arimasu ka?",
          "4) How do you go to university? → Douyatte daigaku ni ikimasu ka?",
          "5) When will you go to Udupi? → Anata wa itsu Udupi ni ikimasu ka?"
        ],
        "prediction": {
          "score": 92,
          "label": "Near Certain — 5W translation in all papers"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "new2026",
          "paneTitle": "New Papers 2026",
          "meta": "📋 New Papers — Current Semester (2025–2026) · 5 Papers · ~45 Questions\nPre-test Unit 3 (2025) · VI Sem Mid-Sem II (2026) · Japanese Test 1 (Jan 2026) · VII Sem Mid-Sem I (2026) · Pre-test Unit 2 (Feb 2026)"
        }
      },
      {
        "id": "new2026-paper-e-japanese-pre-test-unit-2-february-2026-duration-60-mins-max-marks-20-e-q4-169",
        "paperId": "paper-e-japanese-pre-test-unit-2-february-2026-duration-60-mins-max-marks-20",
        "paperTitle": "Paper E — Japanese Pre-test Unit 2, February 2026 Duration: 60 mins · Max Marks: 20",
        "sectionId": "new2026",
        "sectionTitle": "📄 Paper E — Japanese Pre-test Unit 2, February 2026 Duration: 60 mins · Max Marks: 20",
        "number": "E-Q4.",
        "prompt": "Put suitable counter suffix from choice (ken, ppon, hiki, dai, mai, hon, satsu, chaku): (2 marks)ALL papers",
        "options": [],
        "explanation": [
          "1) 1( ppon ) no enpitsu → 1 pencil",
          "2) 3( hiki ) no inu → 3 dogs",
          "3) 3( ken ) no ie → 3 houses",
          "4) 1( dai ) no kuruma → 1 car",
          "5) 2( satsu ) no hon → 2 books"
        ],
        "prediction": {
          "score": 95,
          "label": "Near Certain — counter suffixes in ALL papers"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "new2026",
          "paneTitle": "New Papers 2026",
          "meta": "📋 New Papers — Current Semester (2025–2026) · 5 Papers · ~45 Questions\nPre-test Unit 3 (2025) · VI Sem Mid-Sem II (2026) · Japanese Test 1 (Jan 2026) · VII Sem Mid-Sem I (2026) · Pre-test Unit 2 (Feb 2026)"
        }
      },
      {
        "id": "new2026-paper-e-japanese-pre-test-unit-2-february-2026-duration-60-mins-max-marks-20-e-q5-170",
        "paperId": "paper-e-japanese-pre-test-unit-2-february-2026-duration-60-mins-max-marks-20",
        "paperTitle": "Paper E — Japanese Pre-test Unit 2, February 2026 Duration: 60 mins · Max Marks: 20",
        "sectionId": "new2026",
        "sectionTitle": "📄 Paper E — Japanese Pre-test Unit 2, February 2026 Duration: 60 mins · Max Marks: 20",
        "number": "E-Q5.",
        "prompt": "Match the words: (2 marks)2 Papers",
        "options": [],
        "explanation": [
          "1) kega → c. injury",
          "2) gakki → e. musical instruments",
          "3) iro → d. color",
          "4) aji → a. taste",
          "5) kasa → b. umbrella"
        ],
        "prediction": {
          "score": 90,
          "label": "Near Certain — vocab matching in all papers"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "new2026",
          "paneTitle": "New Papers 2026",
          "meta": "📋 New Papers — Current Semester (2025–2026) · 5 Papers · ~45 Questions\nPre-test Unit 3 (2025) · VI Sem Mid-Sem II (2026) · Japanese Test 1 (Jan 2026) · VII Sem Mid-Sem I (2026) · Pre-test Unit 2 (Feb 2026)"
        }
      },
      {
        "id": "new2026-paper-e-japanese-pre-test-unit-2-february-2026-duration-60-mins-max-marks-20-e-q6-171",
        "paperId": "paper-e-japanese-pre-test-unit-2-february-2026-duration-60-mins-max-marks-20",
        "paperTitle": "Paper E — Japanese Pre-test Unit 2, February 2026 Duration: 60 mins · Max Marks: 20",
        "sectionId": "new2026",
        "sectionTitle": "📄 Paper E — Japanese Pre-test Unit 2, February 2026 Duration: 60 mins · Max Marks: 20",
        "number": "E-Q6.",
        "prompt": "Make sentences using following words: (3 marks)ALL papers",
        "options": [],
        "explanation": [
          "1) hoshii (want): Watashi wa kuruma ga hoshii desu. (I want a car.)",
          "2) -tai (want to do): Kuruma o unten shitai desu. (I want to drive a car.)",
          "3) dekiru (can): Watashi wa Nihongo ga dekimasu. (I can speak Japanese.)"
        ],
        "prediction": {
          "score": 95,
          "label": "Near Certain — hoshii/tai/dekiru in SEE papers + ALL new papers"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "new2026",
          "paneTitle": "New Papers 2026",
          "meta": "📋 New Papers — Current Semester (2025–2026) · 5 Papers · ~45 Questions\nPre-test Unit 3 (2025) · VI Sem Mid-Sem II (2026) · Japanese Test 1 (Jan 2026) · VII Sem Mid-Sem I (2026) · Pre-test Unit 2 (Feb 2026)"
        }
      },
      {
        "id": "new2026-paper-e-japanese-pre-test-unit-2-february-2026-duration-60-mins-max-marks-20-e-q7-172",
        "paperId": "paper-e-japanese-pre-test-unit-2-february-2026-duration-60-mins-max-marks-20",
        "paperTitle": "Paper E — Japanese Pre-test Unit 2, February 2026 Duration: 60 mins · Max Marks: 20",
        "sectionId": "new2026",
        "sectionTitle": "📄 Paper E — Japanese Pre-test Unit 2, February 2026 Duration: 60 mins · Max Marks: 20",
        "number": "E-Q7.",
        "prompt": "Put words to match English meaning (body/appearance): (2 marks)ALL papers",
        "options": [],
        "explanation": [
          "1) Watashi wa ( megane ) o ( kakete ) imasu. → I'm wearing specs/glasses.",
          "2) Ben san wa ( se ) ga ( takai ) desu. → Ben is tall.",
          "3) Kinou no ( kega ) ga ( itai ) desu. → Yesterday's injury is painful.",
          "4) Rei san wa ( kami ) ga ( nagai ) desu. → Rei has long hair.",
          "5) Hiro san wa ( me ) ga ( aokute ) kawaii desu. → Hiro has blue eyes and is cute.",
          "BODY VOCAB: se(height) · kami(hair) · me(eyes) · kami(glasses=megane) · kao(face) · hana(nose)"
        ],
        "prediction": {
          "score": 88,
          "label": "Near Certain — body/appearance fill-in in all papers"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "new2026",
          "paneTitle": "New Papers 2026",
          "meta": "📋 New Papers — Current Semester (2025–2026) · 5 Papers · ~45 Questions\nPre-test Unit 3 (2025) · VI Sem Mid-Sem II (2026) · Japanese Test 1 (Jan 2026) · VII Sem Mid-Sem I (2026) · Pre-test Unit 2 (Feb 2026)"
        }
      },
      {
        "id": "new2026-paper-e-japanese-pre-test-unit-2-february-2026-duration-60-mins-max-marks-20-e-q8-173",
        "paperId": "paper-e-japanese-pre-test-unit-2-february-2026-duration-60-mins-max-marks-20",
        "paperTitle": "Paper E — Japanese Pre-test Unit 2, February 2026 Duration: 60 mins · Max Marks: 20",
        "sectionId": "new2026",
        "sectionTitle": "📄 Paper E — Japanese Pre-test Unit 2, February 2026 Duration: 60 mins · Max Marks: 20",
        "number": "E-Q8.",
        "prompt": "Translate into Japanese / English: (2 marks)ALL papers",
        "options": [],
        "explanation": [
          "1) Kare wa gyuunyuu o nonde imasu. → He is drinking milk.",
          "2) Ani ga kotoshi kara shuushoku shimasu. → My older brother will start working this year.",
          "3) Ken is married. → Ken san wa kekkon shite imasu.",
          "4) Tokyo is bigger than Kyoto. → Tokyo wa Kyoto yori ookii desu.",
          "5) Can I drive your car? → Anata no kuruma o unten shite mo ii desuka?"
        ],
        "prediction": {
          "score": 90,
          "label": "Near Certain — translation in every paper; comparison sentences (yori) important"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "new2026",
          "paneTitle": "New Papers 2026",
          "meta": "📋 New Papers — Current Semester (2025–2026) · 5 Papers · ~45 Questions\nPre-test Unit 3 (2025) · VI Sem Mid-Sem II (2026) · Japanese Test 1 (Jan 2026) · VII Sem Mid-Sem I (2026) · Pre-test Unit 2 (Feb 2026)"
        }
      },
      {
        "id": "new2026-paper-e-japanese-pre-test-unit-2-february-2026-duration-60-mins-max-marks-20-e-q9-174",
        "paperId": "paper-e-japanese-pre-test-unit-2-february-2026-duration-60-mins-max-marks-20",
        "paperTitle": "Paper E — Japanese Pre-test Unit 2, February 2026 Duration: 60 mins · Max Marks: 20",
        "sectionId": "new2026",
        "sectionTitle": "📄 Paper E — Japanese Pre-test Unit 2, February 2026 Duration: 60 mins · Max Marks: 20",
        "number": "E-Q9.",
        "prompt": "Write about your family members in 5 sentences. (3 marks)ALL papers",
        "options": [],
        "explanation": [],
        "prediction": {
          "score": 92,
          "label": "Near Certain — family description in ALL 8 papers"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "new2026",
          "paneTitle": "New Papers 2026",
          "meta": "📋 New Papers — Current Semester (2025–2026) · 5 Papers · ~45 Questions\nPre-test Unit 3 (2025) · VI Sem Mid-Sem II (2026) · Japanese Test 1 (Jan 2026) · VII Sem Mid-Sem I (2026) · Pre-test Unit 2 (Feb 2026)"
        }
      }
    ]
  },
  {
    "id": "new-patterns-confirmed-by-current-semester-papers-questions",
    "title": "NEW PATTERNS CONFIRMED by Current Semester Papers Questions",
    "source": "Japanese_Practice_QBank.html",
    "sections": [
      {
        "id": "new2026-new-patterns-confirmed-by-current-semester-papers-questions-that-now-have-even-h",
        "pane": "new2026",
        "title": "🔑 NEW PATTERNS CONFIRMED by Current Semester Papers Questions that now have even higher certainty"
      }
    ],
    "questions": [
      {
        "id": "new2026-new-patterns-confirmed-by-current-semester-papers-questions-untitled-175",
        "paperId": "new-patterns-confirmed-by-current-semester-papers-questions",
        "paperTitle": "NEW PATTERNS CONFIRMED by Current Semester Papers Questions",
        "sectionId": "new2026",
        "sectionTitle": "🔑 NEW PATTERNS CONFIRMED by Current Semester Papers Questions that now have even higher certainty",
        "number": "📊",
        "prompt": "Questions that now appear in 5+ of 8 total papers — upgraded to Near Certain:",
        "options": [],
        "explanation": [
          "✅ Particle fill-in (wa/ga/o/ni/de/no) — appears in ALL 8 papers · 97%",
          "✅ aru/iru conjugation — appears in ALL 8 papers · 97%",
          "✅ Self-introduction (5 sentences) — appears in ALL 8 papers · 97%",
          "✅ Daily routine (5-6 sentences) — appears in ALL 8 papers · 97%",
          "✅ Vocabulary matching (10 words) — appears in ALL 8 papers · 96%",
          "✅ Translation E→J and J→E — appears in ALL 8 papers · 95%",
          "✅ Counter suffixes (nin/dai/mai/satsu etc.) — appears in ALL 8 papers · 95%",
          "✅ hoshii / -tai / dekiru sentences — appears in 6/8 papers · 95%",
          "✅ Numbers, times, dates in Japanese — appears in ALL 8 papers · 93%",
          "✅ Greetings list — appears in ALL 8 papers · 93%",
          "✅ Kanji matching (日月山川木火水) — appears in 6/8 papers · 93%",
          "✅ 5W sentences (dare/doko/nani/itsu/naze) — appears in 7/8 papers · 92%",
          "✅ Family member nouns/description — appears in ALL 8 papers · 92%",
          "✅ Direction fill-in (massugu/migi/hidari) — appears in 5/8 papers · 90%",
          "✅ Adjective conjugation suffixes (~katta/~kunai/~deshita) — appears in 4/8 papers · 88%"
        ],
        "prediction": {
          "score": 97,
          "label": "The above patterns are essentially guaranteed in your exam tomorrow"
        },
        "source": {
          "file": "Japanese_Practice_QBank.html",
          "pane": "new2026",
          "paneTitle": "New Papers 2026",
          "meta": "📋 New Papers — Current Semester (2025–2026) · 5 Papers · ~45 Questions\nPre-test Unit 3 (2025) · VI Sem Mid-Sem II (2026) · Japanese Test 1 (Jan 2026) · VII Sem Mid-Sem I (2026) · Pre-test Unit 2 (Feb 2026)"
        }
      }
    ]
  }
];

export const QUESTION_PAPER_TOTAL = 175;
