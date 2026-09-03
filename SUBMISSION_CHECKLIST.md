# Checklist Submission Automation Testing & CI/CD RuangSuara

## Kriteria wajib

- [x] Registrasi dan login akun
- [x] Daftar thread dan detail beserta komentar
- [x] Membuat thread dan komentar (pengguna terautentikasi)
- [x] Loading indicator untuk proses API
- [x] Konfigurasi ESLint dan lint tanpa error
- [x] React Strict Mode
- [x] State API berada pada Redux Store
- [x] REST API hanya dipanggil di asynchronous thunk
- [x] Folder UI dan state terpisah
- [x] Komponen modular dan reusable
- [x] Pengujian reducer dengan narasi skenario
- [x] Pengujian asynchronous thunk dengan narasi skenario
- [x] Pengujian React component dengan narasi skenario
- [x] Cypress E2E: login page, login gagal, login berhasil, registrasi, membuat thread, menambah komentar
- [x] GitHub Actions menjalankan lint, test, build, dan Cypress E2E
- [x] Bukti CI gagal asli tersedia: `screenshot/1_ci_check_error.png`
- [x] Bukti CI kembali lulus tersedia: `screenshot/2_ci_check_pass.png`
- [x] Ruleset `Protect main` Active
- [x] Require a pull request before merging
- [x] Require status checks to pass
- [x] Block force pushes
- [x] Bukti branch protection tersedia: `screenshot/3_branch_protection.png`
- [x] Deployment production Vercel aktif
- [x] URL Vercel tercantum di README
- [x] React Ecosystem: Storybook dan PropTypes
- [x] Minimal 2 stories: ThreadCard dan VoteButtons

## Bukti screenshot wajib dalam ZIP

- `screenshot/1_ci_check_error.png`
- `screenshot/2_ci_check_pass.png`
- `screenshot/3_branch_protection.png`

## URL penting

- Repository: https://github.com/RezaHarahap/RuangSuara-Automation-CICD
- CI gagal Run #17: https://github.com/RezaHarahap/RuangSuara-Automation-CICD/actions/runs/33576965681
- CI pass Run #18: https://github.com/RezaHarahap/RuangSuara-Automation-CICD/actions/runs/33577042275
- Production: https://ruang-suara-automation-cicd.vercel.app
