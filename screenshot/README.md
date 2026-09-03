# Bukti CI/CD Wajib

Folder ini sengaja hanya berisi tiga bukti utama dengan nama persis sesuai arahan reviewer Dicoding:

1. `1_ci_check_error.png` — GitHub Actions Run #17, `quality-check` gagal pada pengujian (`npm test`).
2. `2_ci_check_pass.png` — GitHub Actions Run #18, `quality-check` dan `end-to-end` berhasil.
3. `3_branch_protection.png` — ruleset `Protect main` aktif untuk branch `main`, mewajibkan Pull Request dan status checks, serta memblokir force push.

URL production Vercel: https://ruang-suara-automation-cicd.vercel.app
