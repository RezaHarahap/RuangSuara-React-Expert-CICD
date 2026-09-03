# Panduan CI/CD dan Bukti Submission

## Repository

GitHub: https://github.com/RezaHarahap/RuangSuara-Automation-CICD

## 1. Bukti CI gagal

GitHub Actions Run #17:
https://github.com/RezaHarahap/RuangSuara-Automation-CICD/actions/runs/33576965681

Run tersebut sengaja dibuat gagal pada branch/PR terpisah untuk memenuhi bukti wajib reviewer. Job `quality-check` gagal pada langkah `npm test`, sementara branch `main` tidak terkena perubahan gagal tersebut.

Bukti: `screenshot/1_ci_check_error.png`.

## 2. Bukti CI berhasil setelah diperbaiki

GitHub Actions Run #18:
https://github.com/RezaHarahap/RuangSuara-Automation-CICD/actions/runs/33577042275

Setelah test sementara yang sengaja gagal dihapus, `quality-check` dan `end-to-end` kembali sukses.

Bukti: `screenshot/2_ci_check_pass.png`.

## 3. Branch protection

Ruleset `Protect main` berstatus Active dan menargetkan branch `main` dengan aturan utama:

- Require a pull request before merging.
- Require status checks to pass.
- Block force pushes.

Bukti: `screenshot/3_branch_protection.png`.

## Deployment production

Production Vercel:
https://ruang-suara-automation-cicd.vercel.app

## Catatan keamanan branch utama

PR #4 yang digunakan untuk membuat bukti CI gagal ditutup tanpa merge setelah CI kembali hijau. Dengan demikian, branch `main` tetap menggunakan kode yang lulus pengujian.
