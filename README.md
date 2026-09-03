# RuangSuara

Aplikasi forum diskusi React yang menggunakan Dicoding Forum API dan menerapkan automation testing pada reducer, asynchronous thunk, React component, serta End-to-End.

## Deployment

Production Vercel: **https://ruang-suara-automation-cicd.vercel.app**

URL tersebut merupakan deployment production yang digunakan sebagai bukti kriteria Deployment Aplikasi pada submission Dicoding.

## Perintah

Gunakan Node.js 20 LTS atau 22. Jalankan `npm ci`, `npm run lint`, `npm test`, `npm run e2e`, `npm run build`, dan `npm run build-storybook`.

TypeScript dikunci pada versi `5.9.3` agar Cypress 14 dapat dijalankan secara konsisten, baik dari ZIP lokal maupun GitHub Actions.

## Automation Testing

Cypress E2E mencakup enam skenario utama:

1. halaman login tampil dengan benar;
2. login gagal;
3. login berhasil;
4. registrasi berhasil;
5. membuat thread;
6. menambahkan komentar.

Selain E2E, proyek memiliki pengujian reducer, asynchronous thunk, dan React component.

## React ecosystem

Storybook digunakan untuk dokumentasi komponen terisolasi (`npm run storybook`) dan PropTypes untuk validasi kontrak props. Stories tersedia untuk `ThreadCard` dan `VoteButtons`.

## Fitur

Registrasi, login, thread, komentar, optimistic vote thread dan komentar, leaderboard, filter kategori, loading indicator, notifikasi, desain responsif, dan penanganan konten API secara aman.

## CI/CD

Workflow GitHub Actions menjalankan lint, unit/component test, production build, Storybook build, dan Cypress E2E pada Pull Request serta push menuju `main`/`master`.

Bukti submission terbaru tersedia pada folder `screenshot` dengan nama wajib `1_ci_check_error.png`, `2_ci_check_pass.png`, dan `3_branch_protection.png`. Detailnya dijelaskan dalam `PANDUAN_CICD.md`.
