# DSA Bootcamp Java — Assignment Tracker ⚡

A modern, responsive, and interactive study tracker containing every question from the [kunal-kushwaha/DSA-Bootcamp-Java](https://github.com/kunal-kushwaha/DSA-Bootcamp-Java/tree/main/assignments) repository, starting from **Arrays** all the way through **Trees**.

Organized **Topic-wise** and **Difficulty-wise** (Easy, Medium, Hard), with zero video distractions and 100% focus on problem-solving.

---

## 🎯 Features

- **Topic Wise & Difficulty Wise Views**: Seamlessly switch between viewing problems organized by topic (e.g. Arrays, Recursion, Trees) or across the entire bootcamp sorted by difficulty level.
- **Direct Problem Links**: One-click direct links to problems on **LeetCode**, **GeeksforGeeks**, **CodeChef**, **HackerRank**, and **SPOJ**.
- **Interactive Checkboxes & Progress Tracking**: Check off problems as you solve them. All progress and completion percentages are saved persistently in browser `localStorage`.
- **Bookmark & Star**: Star problems you want to revisit before technical interviews.
- **Pattern Practice**: 35 ASCII pattern challenges with visual code representations.
- **Instant Search (`/`)**: Fast multi-term search across problem titles, platforms, and company tags.
- **Surprise Me**: Click to get a random unsolved challenge from your active topic or difficulty category.
- **Zero Distractions**: Strictly problem statements, direct links, and patterns — no video links or YouTube redirects.

---

## 📚 Topics Covered

| # | Topic | Questions | Easy | Medium | Hard | Other / Patterns |
|---|---|:---:|:---:|:---:|:---:|:---:|
| 05 | **Arrays** | 41 | 28 | 10 | 3 | — |
| 06 | **Searching** | 42 | 17 | 17 | 8 | — |
| 07 | **Sorting** | 43 | 30 | 12 | 1 | — |
| 08 | **Strings** | 52 | 25 | 19 | 8 | — |
| 09 | **Patterns** | 35 | — | — | — | 35 Patterns |
| 10 | **Recursion** | 80 | 27 | 34 | 19 | — |
| 11 | **Bitwise** | 28 | 19 | 6 | 3 | — |
| 12 | **Maths** | 28 | 11 | 13 | 4 | — |
| 13 | **Complexities** | 2 | — | — | — | 2 Sheets |
| 14 | **OOP** | 19 | — | — | — | 19 Problems |
| 15 | **Linked List** | 46 | 11 | 29 | 6 | — |
| 16 | **Stacks & Queues** | 34 | 12 | 16 | 6 | — |
| 17 | **Trees** | 54 | 16 | 17 | 21 | — |
| 18 | **Heaps** | — | — | — | — | *(Placeholder in repo)* |

---

## 🚀 How to Run Locally

You can run this project with any local HTTP server:

```bash
# Using Node http-server
npx http-server -p 5500 -c-1

# Or with Python
python -m http.server 5500
```

Then visit [http://localhost:5500](http://localhost:5500) in your browser.

### Re-extracting Questions
If the upstream Kunal Kushwaha repository is updated, simply run:

```bash
node scripts/extract.js
```

This will fetch the latest assignment files, parse the topics and questions, and update `data.js`.

---

## 🌐 Deploy to GitHub Pages

To make this tracker accessible online:
1. Go to your repository settings on GitHub (**Settings > Pages**).
2. Under **Build and deployment**, select **Deploy from a branch**.
3. Choose the `main` branch and `/ (root)` folder, then click **Save**.
4. Your site will be live at `https://<your-username>.github.io/Kunal-kushwaha-assignment/`!

---

## 📄 License & Credits

Problem curriculum and questions credit: [Kunal Kushwaha & WeMakeDevs](https://github.com/kunal-kushwaha/DSA-Bootcamp-Java).
Website created for structured interview preparation and tracking.
