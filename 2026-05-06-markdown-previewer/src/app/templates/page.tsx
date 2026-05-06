"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const templates = [
  {
    id: "readme",
    category: "Open Source",
    icon: "📦",
    title: "Project README",
    description: "A comprehensive README template for open-source projects with badges, installation steps, and usage examples.",
    tags: ["GitHub", "Documentation", "Open Source"],
    content: `# Project Name

![Version](https://img.shields.io/badge/version-1.0.0-blue) ![License](https://img.shields.io/badge/license-MIT-green)

> A short, punchy description of what this project does.

## ✨ Features

- 🚀 **Fast** — Built for performance from the ground up
- 🎨 **Beautiful** — Clean and modern design
- 🔒 **Secure** — Security-first architecture
- 📱 **Responsive** — Works on all screen sizes

## 📦 Installation

\`\`\`bash
# Clone the repository
git clone https://github.com/username/project-name

# Install dependencies
cd project-name
npm install

# Start development server
npm run dev
\`\`\`

## 🚀 Usage

\`\`\`typescript
import { ProjectName } from 'project-name';

const result = ProjectName.doSomething({
  option1: 'value',
  option2: true,
});

console.log(result);
\`\`\`

## 📖 API Reference

### \`doSomething(options)\`

| Parameter | Type     | Description                |
|-----------|----------|----------------------------|
| option1   | \`string\` | Description of option1     |
| option2   | \`boolean\`| Description of option2     |

## 🤝 Contributing

Contributions are always welcome! See \`CONTRIBUTING.md\` for ways to get started.

## 📝 License

[MIT](LICENSE) © Your Name
`,
  },
  {
    id: "blog",
    category: "Writing",
    icon: "✍️",
    title: "Blog Post",
    description: "Structured blog post template with introduction, sections, code examples, and a compelling conclusion.",
    tags: ["Blog", "Writing", "Content"],
    content: `# The Complete Guide to [Topic]

*Published on ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} · 8 min read*

---

## Introduction

Hook your readers immediately. What problem are you solving? Why should they keep reading? Give them a reason in the first two sentences.

**In this guide, you'll learn:**

- How to [outcome 1]
- Why [concept] matters for [audience]
- Practical steps to [goal]

---

## Part 1: Understanding the Basics

Start with foundational concepts. Don't assume too much — write for someone smart but unfamiliar with the topic.

> "The expert in anything was once a beginner." — Helen Hayes

### Key Concept

Explain the concept clearly. Use analogies. Make it human.

\`\`\`javascript
// Concrete code example
function example() {
  return "This is what it looks like in practice";
}
\`\`\`

---

## Part 2: Going Deeper

Now build on what they just learned. Add nuance. Show the gotchas.

### Common Mistakes

1. **Mistake #1**: Explain it and why it happens
2. **Mistake #2**: Explain it and how to avoid it
3. **Mistake #3**: Explain it with a concrete example

---

## Part 3: Real-World Application

Now bring it all together with a real example. Walk through it step by step.

---

## Conclusion

Summarize the key takeaways in 3 bullets:

- **Takeaway 1**: One sentence
- **Takeaway 2**: One sentence
- **Takeaway 3**: One sentence

What should readers do next? Give them a clear call to action.

---

*Did you find this helpful? Share it with someone who'd benefit.*
`,
  },
  {
    id: "meeting-notes",
    category: "Productivity",
    icon: "📋",
    title: "Meeting Notes",
    description: "Structured meeting notes with attendees, agenda, action items, and decisions made.",
    tags: ["Work", "Meetings", "Productivity"],
    content: `# Meeting: [Topic / Project Name]

**Date:** ${new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
**Time:** 10:00 AM – 11:00 AM
**Location:** Zoom / Room 204

---

## 👥 Attendees

- **Alice Johnson** (Facilitator) — Product Manager
- **Bob Smith** — Lead Engineer
- **Carol Lee** — Design Lead
- **David Kim** — QA Engineer

---

## 📋 Agenda

1. Sprint review — 15 min
2. Blocker discussion — 20 min
3. Roadmap alignment — 15 min
4. AOB — 10 min

---

## 📝 Discussion Notes

### Sprint Review

- Completed: User auth flow, dashboard redesign
- In progress: Payment integration (80% done)
- Blocked: API rate limits from third-party service

### Blocker Discussion

The third-party payment API is limiting requests to 100/min, which breaks our checkout flow under load.

**Decision:** Switch to Stripe as the primary payment provider by next sprint.

### Roadmap Alignment

Q3 priorities confirmed:
1. Mobile app launch
2. Analytics dashboard
3. API v2 public release

---

## ✅ Action Items

| # | Action | Owner | Due Date |
|---|--------|-------|----------|
| 1 | Evaluate Stripe integration | Bob | Jun 15 |
| 2 | Update design mockups for mobile | Carol | Jun 12 |
| 3 | Write test cases for payment flow | David | Jun 18 |
| 4 | Send updated roadmap to stakeholders | Alice | Jun 10 |

---

## 📌 Decisions Made

- ✅ Switch payment provider to Stripe
- ✅ Mobile app launch target: August 1
- ❌ Rejected: outsourcing QA (will hire internally)

---

**Next Meeting:** ${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })} at 10:00 AM
`,
  },
  {
    id: "api-docs",
    category: "Technical",
    icon: "🔌",
    title: "API Documentation",
    description: "Clean API documentation template with endpoints, request/response examples, and authentication details.",
    tags: ["API", "Technical", "Docs"],
    content: `# API Reference

**Base URL:** \`https://api.example.com/v1\`
**Version:** 1.0.0
**Authentication:** Bearer Token

---

## Authentication

Include your API key in the \`Authorization\` header:

\`\`\`http
Authorization: Bearer YOUR_API_KEY
\`\`\`

---

## Endpoints

### Get All Users

\`\`\`
GET /users
\`\`\`

Returns a paginated list of users.

**Query Parameters**

| Parameter | Type    | Required | Description              |
|-----------|---------|----------|--------------------------|
| page      | integer | No       | Page number (default: 1) |
| limit     | integer | No       | Items per page (max: 100)|
| search    | string  | No       | Filter by name or email  |

**Response**

\`\`\`json
{
  "data": [
    {
      "id": "usr_01HX4B2QRZW1S8M9",
      "name": "Alice Johnson",
      "email": "alice@example.com",
      "created_at": "2024-01-15T09:00:00Z"
    }
  ],
  "pagination": {
    "total": 142,
    "page": 1,
    "limit": 20,
    "pages": 8
  }
}
\`\`\`

---

### Create User

\`\`\`
POST /users
\`\`\`

**Request Body**

\`\`\`json
{
  "name": "Bob Smith",
  "email": "bob@example.com",
  "role": "member"
}
\`\`\`

**Response** \`201 Created\`

\`\`\`json
{
  "id": "usr_02HX4B2QRZW1S8N0",
  "name": "Bob Smith",
  "email": "bob@example.com",
  "role": "member",
  "created_at": "2024-06-10T14:32:00Z"
}
\`\`\`

---

## Error Codes

| Code | Message             | Description                            |
|------|---------------------|----------------------------------------|
| 400  | Bad Request         | Invalid request body or parameters     |
| 401  | Unauthorized        | Missing or invalid API key             |
| 403  | Forbidden           | Insufficient permissions               |
| 404  | Not Found           | Resource does not exist                |
| 429  | Too Many Requests   | Rate limit exceeded (100 req/min)      |
| 500  | Internal Server Error | Something went wrong on our end     |

---

## Rate Limiting

Requests are limited to **100 per minute** per API key. Exceeded requests return a \`429\` status with a \`Retry-After\` header.
`,
  },
  {
    id: "weekly-review",
    category: "Productivity",
    icon: "📅",
    title: "Weekly Review",
    description: "Personal weekly review template for tracking accomplishments, reflections, and goals.",
    tags: ["Personal", "Review", "Productivity"],
    content: `# Weekly Review — Week of ${new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}

---

## 🎯 This Week's Goals

- [ ] Goal 1: Describe it clearly
- [ ] Goal 2: Make it specific and measurable
- [ ] Goal 3: Keep it achievable

---

## ✅ Accomplishments

What did you actually get done this week?

1. **Big Win #1** — A couple sentences about what you achieved
2. **Big Win #2** — What impact did it have?
3. **Small Wins** — List a few smaller things that still matter

---

## 🚧 What Didn't Get Done (and Why)

Be honest here. Was it a planning problem, a focus problem, or unexpected blockers?

- Task X — Got blocked by [reason]
- Task Y — Underestimated complexity
- Task Z — De-prioritized in favor of [something more important]

---

## 💡 Key Learnings

What did you learn this week — technical, personal, professional?

1. **Learning 1**: What it was and why it matters
2. **Learning 2**: How you'll apply it going forward

---

## 🌡️ Energy & Focus Check-in

*Rate each on a scale of 1–5*

| Area         | Score | Notes                        |
|--------------|-------|------------------------------|
| Focus        | 4/5   | Solid, minor afternoon dips  |
| Energy       | 3/5   | Could sleep better           |
| Stress       | 2/5   | Low — good week              |
| Satisfaction | 4/5   | Proud of the work done       |

---

## 🔭 Next Week's Top 3

1. **Priority 1** — Why it's #1
2. **Priority 2** — Why it matters
3. **Priority 3** — The stretch goal

---

## 💬 One Sentence Summary

*If you had to describe this week in one sentence:*

> "This week I ..."
`,
  },
  {
    id: "changelog",
    category: "Technical",
    icon: "📜",
    title: "Changelog",
    description: "Standard changelog format following Keep a Changelog conventions for versioned software projects.",
    tags: ["Technical", "Release", "Versioning"],
    content: `# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added
- Dark mode support across all pages
- Keyboard shortcut \`Ctrl+S\` to save

### Changed
- Improved loading performance by 40%

### Fixed
- Fixed overflow issue on mobile navigation

---

## [2.1.0] — ${new Date().toISOString().split("T")[0]}

### Added
- New dashboard analytics widget
- CSV export for reports
- User role management in admin panel
- Email notification preferences

### Changed
- Upgraded to React 19
- Rewrote data fetching layer with TanStack Query
- Improved error messages throughout the app

### Deprecated
- \`legacyMode\` option will be removed in v3.0.0

### Fixed
- Fixed race condition in concurrent API requests (#234)
- Fixed broken pagination when filtering by date (#218)
- Corrected timezone handling for EU users (#201)

---

## [2.0.0] — 2024-03-01

### Breaking Changes
- \`getUser(id)\` now returns \`Promise<User | null>\` instead of throwing
- Renamed \`config.theme\` to \`config.colorScheme\`

### Added
- Complete UI redesign
- Multi-workspace support
- REST API v2

### Removed
- Removed deprecated v1 API endpoints
- Removed IE11 support

---

## [1.0.0] — 2024-01-01

- Initial public release 🎉
`,
  },
];

const categories = ["All", "Open Source", "Writing", "Productivity", "Technical"];

export default function TemplatesPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [copied, setCopied] = useState<string | null>(null);
  const router = useRouter();

  const filtered = templates.filter((t) => {
    const matchCat = category === "All" || t.category === category;
    const matchSearch =
      search === "" ||
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase()) ||
      t.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  const handleUseTemplate = (content: string) => {
    sessionStorage.setItem("md-template", content);
    router.push("/editor");
  };

  const handleCopy = async (id: string, content: string) => {
    await navigator.clipboard.writeText(content);
    setCopied(id);
    setTimeout(() => setCopied(null), 1800);
  };

  return (
    <div className="min-h-screen bg-[#0f1117] py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-white mb-3">Template Library</h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Professional Markdown templates to jumpstart any document. Click to open in the editor.
          </p>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="flex-1 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">🔍</span>
            <input
              type="text"
              placeholder="Search templates..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-500 outline-none focus:border-indigo-500 transition-colors text-sm"
            />
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-all ${
                  category === cat
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-800 text-slate-400 hover:text-white border border-slate-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-slate-500 mb-5">
          {filtered.length} template{filtered.length !== 1 ? "s" : ""} found
        </p>

        {/* Template grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((template) => (
            <div
              key={template.id}
              className="group bg-[#161b27] border border-slate-800 hover:border-indigo-700/60 rounded-xl p-5 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{template.icon}</span>
                  <div>
                    <h3 className="font-semibold text-white text-sm">{template.title}</h3>
                    <span className="text-xs text-indigo-400">{template.category}</span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-slate-400 leading-relaxed mb-4">{template.description}</p>

              <div className="flex items-center gap-2 mb-4 flex-wrap">
                {template.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 bg-slate-800 text-slate-400 rounded-full border border-slate-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Preview snippet */}
              <div className="bg-[#0f1117] rounded-lg p-3 mb-4 border border-slate-800 font-mono text-xs text-slate-500 overflow-hidden max-h-20 relative">
                <pre className="whitespace-pre-wrap leading-relaxed">{template.content.slice(0, 200)}...</pre>
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#0f1117] to-transparent" />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleUseTemplate(template.content)}
                  className="flex-1 py-2 text-sm bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-all"
                >
                  Use Template →
                </button>
                <button
                  onClick={() => handleCopy(template.id, template.content)}
                  className="px-4 py-2 text-sm bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 transition-all"
                >
                  {copied === template.id ? "✅" : "📋"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-slate-500">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-lg font-medium text-slate-400">No templates found</p>
            <p className="text-sm mt-1">Try a different search term or category</p>
          </div>
        )}
      </div>
    </div>
  );
}
