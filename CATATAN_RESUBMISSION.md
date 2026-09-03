# Catatan Resubmission Dicoding

## Automation Testing
Automation testing telah dilengkapi. Cypress sekarang mencakup 6 skenario utama:
1. Halaman login tampil dengan benar.
2. Login gagal menampilkan pesan error.
3. Login berhasil mengarahkan ke beranda.
4. Registrasi berhasil mengarahkan ke login.
5. Pengguna terautentikasi dapat membuat thread.
6. Pengguna terautentikasi dapat menambahkan komentar.

Selain E2E, project tetap memiliki pengujian reducer, asynchronous thunk, dan React component.

## CI/CD dan Deployment
Workflow GitHub Actions menjalankan lint, unit/component test, production build, Storybook build, dan Cypress E2E pada push serta pull request ke `main`.

**Sebelum submit:**
- hubungkan repository GitHub ke Vercel;
- pastikan deployment production sukses;
- salin URL `https://<project>.vercel.app`;
- tempel URL tersebut pada catatan submission Dicoding;
- lampirkan screenshot GitHub Actions yang hijau;
- lampirkan screenshot ruleset/branch protection yang menunjukkan rule Active, target `main`, Require pull request, dan Require status checks;
- lampirkan screenshot PR yang menunjukkan required checks berhasil.

> Bukti CI/CD, branch protection, dan Vercel harus berasal dari akun/repository asli dan tidak dapat digantikan dengan gambar buatan.
