const authenticatedUser = {
  id: 'user-e2e',
  name: 'Reza E2E',
  email: 'reza@example.com',
  avatar: 'https://example.com/avatar.png',
};

function visitAsAuthenticated(path) {
  cy.intercept('GET', '**/v1/users/me', {
    statusCode: 200,
    body: { status: 'success', data: { user: authenticatedUser } },
  }).as('profile');

  cy.visit(path, {
    onBeforeLoad(win) {
      win.localStorage.setItem('ruangsuara_access_token', 'e2e-token');
    },
  });
  cy.wait('@profile');
}

describe('Thread and comment flow', () => {
  /**
   * Skenario: membuat thread.
   * - pengguna yang sudah login membuka halaman thread baru;
   * - API create thread sukses;
   * - aplikasi mengarahkan pengguna ke detail thread yang baru dibuat.
   */
  it('should create a thread and redirect to its detail page', () => {
    cy.intercept('POST', '**/v1/threads', {
      statusCode: 201,
      body: {
        status: 'success',
        data: {
          thread: {
            id: 'thread-new',
            title: 'Automation Testing React',
            body: 'Menguji alur membuat thread dengan Cypress.',
            category: 'testing',
            ownerId: 'user-e2e',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
            createdAt: '2026-09-01T00:00:00.000Z',
          },
        },
      },
    }).as('createThread');

    cy.intercept('GET', '**/v1/threads/thread-new', {
      statusCode: 200,
      body: {
        status: 'success',
        data: {
          detailThread: {
            id: 'thread-new',
            title: 'Automation Testing React',
            body: 'Menguji alur membuat thread dengan Cypress.',
            category: 'testing',
            createdAt: '2026-09-01T00:00:00.000Z',
            owner: authenticatedUser,
            upVotesBy: [],
            downVotesBy: [],
            comments: [],
          },
        },
      },
    });

    visitAsAuthenticated('/new');
    cy.get('input[placeholder="Apa yang ingin kamu diskusikan?"]').type('Automation Testing React');
    cy.get('input[placeholder="Contoh: teknologi"]').type('testing');
    cy.get('textarea[placeholder="Ceritakan latar belakang dan pertanyaanmu..."]')
      .type('Menguji alur membuat thread dengan Cypress.');
    cy.contains('button', 'Terbitkan diskusi').click();

    cy.wait('@createThread');
    cy.location('pathname').should('eq', '/threads/thread-new');
  });

  /**
   * Skenario: menambahkan komentar.
   * - pengguna yang sudah login membuka detail thread;
   * - API create comment sukses;
   * - komentar baru langsung muncul pada daftar komentar.
   */
  it('should add a comment to a thread', () => {
    cy.intercept('GET', '**/v1/threads/thread-1', {
      statusCode: 200,
      body: {
        status: 'success',
        data: {
          detailThread: {
            id: 'thread-1',
            title: 'Diskusi Cypress',
            body: 'Isi diskusi.',
            category: 'testing',
            createdAt: '2026-09-01T00:00:00.000Z',
            owner: authenticatedUser,
            upVotesBy: [],
            downVotesBy: [],
            comments: [],
          },
        },
      },
    }).as('threadDetail');

    cy.intercept('POST', '**/v1/threads/thread-1/comments', {
      statusCode: 201,
      body: {
        status: 'success',
        data: {
          comment: {
            id: 'comment-new',
            content: 'Komentar dari Cypress',
            createdAt: '2026-09-01T00:01:00.000Z',
            owner: authenticatedUser,
            upVotesBy: [],
            downVotesBy: [],
          },
        },
      },
    }).as('createComment');

    visitAsAuthenticated('/threads/thread-1');
    cy.wait('@threadDetail');
    cy.get('textarea[placeholder="Tulis tanggapan yang konstruktif..."]').type('Komentar dari Cypress');
    cy.contains('button', 'Kirim komentar').click();

    cy.wait('@createComment');
    cy.contains('Komentar dari Cypress').should('be.visible');
    cy.contains('1 Komentar').should('be.visible');
  });
});
