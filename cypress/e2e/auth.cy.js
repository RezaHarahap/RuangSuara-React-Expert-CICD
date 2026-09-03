describe('Authentication flow', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/v1/threads', { statusCode: 200, body: { status: 'success', data: { threads: [] } } });
    cy.intercept('GET', '**/v1/users', { statusCode: 200, body: { status: 'success', data: { users: [] } } });
  });

  /**
   * Skenario: halaman login tampil dengan benar.
   * - pengguna membuka /login;
   * - input email, password, dan tombol masuk harus terlihat.
   */
  it('should display the login page correctly', () => {
    cy.visit('/login');
    cy.get('[data-testid="email-input"]').should('be.visible');
    cy.get('[data-testid="password-input"]').should('be.visible');
    cy.get('[data-testid="login-button"]').should('be.visible');
  });

  /**
   * Skenario: login gagal.
   * - pengguna mengirim kredensial yang salah;
   * - API mengembalikan error;
   * - aplikasi tetap di halaman login dan menampilkan pesan error.
   */
  it('should show an error and stay on the login page when credentials are invalid', () => {
    cy.intercept('POST', '**/v1/login', {
      statusCode: 401,
      body: { status: 'fail', message: 'Email atau password salah' },
    }).as('loginFailed');

    cy.visit('/login');
    cy.get('[data-testid="email-input"]').type('wrong@example.com');
    cy.get('[data-testid="password-input"]').type('password-salah');
    cy.get('[data-testid="login-button"]').click();

    cy.wait('@loginFailed');
    cy.location('pathname').should('eq', '/login');
    cy.contains('Email atau password salah').should('be.visible');
  });

  /**
   * Skenario: login berhasil.
   * - API login dan profil mengembalikan respons sukses;
   * - pengguna diarahkan ke beranda;
   * - identitas pengguna tampil pada header.
   */
  it('should log in and redirect the user to the home page', () => {
    cy.intercept('POST', '**/v1/login', {
      statusCode: 200,
      body: { status: 'success', data: { token: 'e2e-token' } },
    }).as('login');
    cy.intercept('GET', '**/v1/users/me', {
      statusCode: 200,
      body: {
        status: 'success',
        data: {
          user: {
            id: 'user-e2e',
            name: 'Reza E2E',
            email: 'reza@example.com',
            avatar: 'https://example.com/avatar.png',
          },
        },
      },
    }).as('profile');

    cy.visit('/login');
    cy.get('[data-testid="email-input"]').type('reza@example.com');
    cy.get('[data-testid="password-input"]').type('rahasia123');
    cy.get('[data-testid="login-button"]').click();

    cy.wait('@login');
    cy.wait('@profile');
    cy.location('pathname').should('eq', '/');
    cy.get('img[alt="Reza E2E"]').should('be.visible');
  });

  /**
   * Skenario: registrasi berhasil.
   * - pengguna mengisi formulir registrasi;
   * - API registrasi sukses;
   * - aplikasi mengarahkan pengguna ke halaman login.
   */
  it('should register a new user and redirect to login', () => {
    cy.intercept('POST', '**/v1/register', {
      statusCode: 201,
      body: {
        status: 'success',
        data: {
          user: { id: 'user-new', name: 'Reza Baru', email: 'baru@example.com' },
        },
      },
    }).as('register');

    cy.visit('/register');
    cy.get('input[placeholder="Nama kamu"]').type('Reza Baru');
    cy.get('input[placeholder="nama@email.com"]').type('baru@example.com');
    cy.get('input[placeholder="Minimal 6 karakter"]').type('rahasia123');
    cy.contains('button', 'Buat akun').click();

    cy.wait('@register');
    cy.location('pathname').should('eq', '/login');
  });
});
