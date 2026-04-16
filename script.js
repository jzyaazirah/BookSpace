/**
 * BookSpace - Vulcan Edition (Dark Red & Orange)
 * Core Application Logic with Rupee Localization
 */

const app = {
    // Initial Data
    books: [
        { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", isbn: "978-0-7432-7356-5", category: "Classic", dateAdded: "2023-05-12", totalStock: 8, borrowedCount: 0, available: true, borrowedBy: null, borrowerName: null, borrowCount: 0, borrowDate: null, dueDate: null },
        { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", isbn: "978-0-06-112008-4", category: "Classic", dateAdded: "2023-06-18", totalStock: 2, borrowedCount: 0, available: true, borrowedBy: null, borrowerName: null, borrowCount: 0, borrowDate: null, dueDate: null },
        { id: 3, title: "1984", author: "George Orwell", isbn: "978-0-452-28423-4", category: "Dystopian", dateAdded: "2023-11-12", totalStock: 15, borrowedCount: 0, available: true, borrowedBy: null, borrowerName: null, borrowCount: 0, borrowDate: null, dueDate: null },
        { id: 4, title: "Pride and Prejudice", author: "Jane Austen", isbn: "978-0-14-143951-8", category: "Romance", dateAdded: "2023-01-20", totalStock: 5, borrowedCount: 0, available: true, borrowedBy: null, borrowerName: null, borrowCount: 0, borrowDate: null, dueDate: null },
        { id: 5, title: "The Hobbit", author: "J.R.R. Tolkien", isbn: "978-0-547-92822-7", category: "Fantasy", dateAdded: "2023-12-15", totalStock: 3, borrowedCount: 0, available: true, borrowedBy: null, borrowerName: null, borrowCount: 0, borrowDate: null, dueDate: null },
        { id: 6, title: "Atomic Habits", author: "James Clear", isbn: "978-1-84-794183-1", category: "Education", dateAdded: "2024-01-10", totalStock: 22, borrowedCount: 0, available: true, borrowedBy: null, borrowerName: null, borrowCount: 0, borrowDate: null, dueDate: null },
        { id: 7, title: "The Alchemist", author: "Paulo Coelho", isbn: "978-0-06-112241-5", category: "Philosophical", dateAdded: "2023-03-25", totalStock: 1, borrowedCount: 0, available: true, borrowedBy: null, borrowerName: null, borrowCount: 0, borrowDate: null, dueDate: null },
        { id: 8, title: "Dune", author: "Frank Herbert", isbn: "978-0-441-17271-9", category: "Sci-Fi", dateAdded: "2024-02-05", totalStock: 9, borrowedCount: 0, available: true, borrowedBy: null, borrowerName: null, borrowCount: 0, borrowDate: null, dueDate: null },
        { id: 9, title: "The Psychology of Money", author: "Morgan Housel", isbn: "978-0-857-19768-9", category: "Finance", dateAdded: "2024-03-01", totalStock: 12, borrowedCount: 0, available: true, borrowedBy: null, borrowerName: null, borrowCount: 0, borrowDate: null, dueDate: null },
        { id: 10, title: "Clean Code", author: "Robert C. Martin", isbn: "978-0-13-235088-4", category: "Technology", dateAdded: "2023-07-15", totalStock: 4, borrowedCount: 0, available: true, borrowedBy: null, borrowerName: null, borrowCount: 0, borrowDate: null, dueDate: null },
        { id: 11, title: "Zero to One", author: "Peter Thiel", isbn: "978-0-804-13929-8", category: "Business", dateAdded: "2023-08-10", totalStock: 7, borrowedCount: 0, available: true, borrowedBy: null, borrowerName: null, borrowCount: 0, borrowDate: null, dueDate: null },
        { id: 12, title: "The Midnight Library", author: "Matt Haig", isbn: "978-0-525-55947-4", category: "Fiction", dateAdded: "2024-01-22", totalStock: 6, borrowedCount: 0, available: true, borrowedBy: null, borrowerName: null, borrowCount: 0, borrowDate: null, dueDate: null },
        { id: 13, title: "Sapiens", author: "Yuval Noah Harari", isbn: "978-0-06-231609-5", category: "History", dateAdded: "2023-04-18", totalStock: 11, borrowedCount: 0, available: true, borrowedBy: null, borrowerName: null, borrowCount: 0, borrowDate: null, dueDate: null },
        { id: 14, title: "Deep Work", author: "Cal Newport", isbn: "978-1-45-558669-1", category: "Self-Help", dateAdded: "2024-02-28", totalStock: 4, borrowedCount: 0, available: true, borrowedBy: null, borrowerName: null, borrowCount: 0, borrowDate: null, dueDate: null },
        { id: 15, title: "The Silent Patient", author: "Alex Michaelides", isbn: "978-1-25-030169-7", category: "Thriller", dateAdded: "2024-03-15", totalStock: 5, borrowedCount: 0, available: true, borrowedBy: null, borrowerName: null, borrowCount: 0, borrowDate: null, dueDate: null },
        { id: 16, title: "Project Hail Mary", author: "Andy Weir", isbn: "978-0-593-13520-4", category: "Space", dateAdded: "2024-04-01", totalStock: 8, borrowedCount: 0, available: true, borrowedBy: null, borrowerName: null, borrowCount: 0, borrowDate: null, dueDate: null }
    ],
    users: [
        { id: 1, username: "admin", password: "admin123", role: "admin", fullName: "System Admin", rollNo: "ADM-001", institute: "BookSpace Central", age: 30, fines: 0 },
        { id: 2, username: "john", password: "john123", role: "member", fullName: "John Doe", rollNo: "STU-2024-001", institute: "Tech Institute of Excellence", age: 21, fines: 0, borrowedBooks: [] }
    ],
    currentUser: null,
    nextBookId: 17,
    nextUserId: 3,

    init() {
        this.loadData();
        this.bindEvents();
        console.log("BookSpace Vulcan UI & Rupee Localization Active.");
    },

    saveData() {
        localStorage.setItem('bsv_books', JSON.stringify(this.books));
        localStorage.setItem('bsv_users', JSON.stringify(this.users));
        localStorage.setItem('bsv_nextId', this.nextBookId);
    },

    loadData() {
        const books = localStorage.getItem('bsv_books');
        const users = localStorage.getItem('bsv_users');
        if (books) this.books = JSON.parse(books);
        if (users) this.users = JSON.parse(users);

        // Migrate old book records that are missing new fields
        this.books.forEach(b => {
            if (b.borrowedCount === undefined) b.borrowedCount = 0;
            if (!b.totalStock) b.totalStock = Math.floor(Math.random() * 12) + 1;
            if (!b.category) b.category = 'General';
            if (!b.dateAdded) b.dateAdded = '2024-01-01';
            // Recalculate available from borrowedCount
            b.available = b.borrowedCount < b.totalStock;
        });

        // Deduplicate users by username (fix for old duplicate saves)
        const seen = new Set();
        this.users = this.users.filter(u => {
            if (seen.has(u.username)) return false;
            seen.add(u.username);
            return true;
        });
    },

    bindEvents() {
        document.getElementById('showRegister')?.addEventListener('click', (e) => { e.preventDefault(); this.toggleAuth('registerSection'); });
        document.getElementById('showLogin')?.addEventListener('click', (e) => { e.preventDefault(); this.toggleAuth('loginSection'); });
        document.getElementById('loginBtn')?.addEventListener('click', () => this.login());
        document.getElementById('registerBtn')?.addEventListener('click', () => this.register());
        document.querySelectorAll('.nav-item').forEach(item => item.addEventListener('click', (e) => this.switchTab(e)));
        document.getElementById('searchInput')?.addEventListener('input', () => this.filterBooks());
        document.getElementById('addBookBtn')?.addEventListener('click', () => {
            const isEdit = document.getElementById('editBookId').value !== '';
            if (isEdit) this.updateBook();
            else this.addBook();
        });
    },

    handleInstituteChange(val) {
        const otherInput = document.getElementById('regInstituteOther');
        if (val === 'other') {
            otherInput.classList.remove('hidden');
        } else {
            otherInput.classList.add('hidden');
        }
    },

    toggleAuth(id) {
        document.getElementById('loginSection').classList.add('hidden');
        document.getElementById('registerSection').classList.add('hidden');
        document.getElementById(id).classList.remove('hidden');
    },

    switchTab(e) {
        const item = e.currentTarget;
        const tabId = item.getAttribute('data-tab');
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
        document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
        document.getElementById(tabId).classList.remove('hidden');

        if (tabId === 'borrow-tab') this.filterBooks();
        if (tabId === 'my-books-tab') this.renderMyBooks();
        if (tabId === 'fines-tab') this.renderFines();
        if (tabId === 'profile-tab') this.renderProfileEdit();
        if (tabId === 'admin-dashboard-tab') {
            this.renderAdminStats();
            this.renderAdminBookTable();
        }
        if (tabId === 'admin-inventory-tab') this.renderInventory();
        if (tabId === 'admin-members-tab') this.renderMembers();
    },

    login() {
        const type = document.getElementById('userType').value;
        const u = document.getElementById('username').value.trim();
        const p = document.getElementById('password').value.trim();
        const user = this.users.find(usr => usr.username === u && usr.password === p && usr.role === type);
        
        if (user) {
            this.currentUser = user;
            document.getElementById('authWrapper').classList.add('hidden');
            document.getElementById('appWrapper').classList.remove('hidden');
            
            this.refreshProfileUI();

            if (user.role === 'admin') {
                document.getElementById('adminNav').classList.remove('hidden');
                document.getElementById('memberNav').classList.add('hidden');
                document.querySelector('#adminNav .nav-item').click();
            } else {
                document.getElementById('memberNav').classList.remove('hidden');
                document.getElementById('adminNav').classList.add('hidden');
                document.querySelector('#memberNav .nav-item').click();
            }
        } else { alert("Access denied. Please check your credentials and account type."); }
    },

    refreshProfileUI() {
        const user = this.currentUser;
        if (!user) return;

        const profileHTML = user.role === 'member' ? `
            <div class="profile-summary">
                <strong>${user.fullName || user.username}</strong>
                <span>${user.rollNo || ''}</span><br>
                <span>${user.institute || ''} | Age: ${user.age || ''}</span>
            </div>
        ` : `<div class="profile-summary"><strong>System Admin</strong><span>${user.username}</span></div>`;

        // Always target the stable container — never re-create #memberName
        const container = document.getElementById('profileNavContainer');
        if (container) {
            container.innerHTML = `
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom:8px">
                    <div style="width: 32px; height: 32px; background: var(--primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px;">👤</div>
                    <span id="memberName" style="font-weight: 600;">${user.username}</span>
                </div>
                ${profileHTML}
            `;
        }
    },

    renderProfileEdit() {
        const u = this.currentUser;
        document.getElementById('editFullName').value = u.fullName || '';
        document.getElementById('editRollNo').value = u.rollNo || '';
        document.getElementById('editAge').value = u.age || '';
        document.getElementById('editInstitute').value = u.institute || '';
    },

    saveProfile() {
        const fn = document.getElementById('editFullName').value.trim();
        const rn = document.getElementById('editRollNo').value.trim();
        const age = document.getElementById('editAge').value;
        const inst = document.getElementById('editInstitute').value.trim();

        if (!fn || !rn || !age || !inst) { alert("Please fill all details."); return; }

        // Update fields in-place on both currentUser and the users array entry
        const target = this.users.find(u => u.username === this.currentUser.username);
        if (target) {
            target.fullName = fn;
            target.rollNo = rn;
            target.age = parseInt(age);
            target.institute = inst;
            // Keep currentUser in sync (it's the same reference after find)
            this.currentUser = target;
        }

        this.saveData();
        alert("Profile updated successfully!");
        this.refreshProfileUI();
        document.querySelector('[data-tab="borrow-tab"]').click();
    },

    register() {
        const u = document.getElementById('regUsername').value.trim();
        const p = document.getElementById('regPassword').value.trim();
        const fn = document.getElementById('regFullName').value.trim();
        const rn = document.getElementById('regRollNo').value.trim();
        const age = document.getElementById('regAge').value;
        const instSelect = document.getElementById('regInstitute').value;
        const instOther = document.getElementById('regInstituteOther').value.trim();
        
        const institute = instSelect === 'other' ? instOther : instSelect;

        if (!u || !p || !fn || !rn || !age || !institute) {
            alert("Please fill all required profile details.");
            return;
        }

        if (this.users.find(usr => usr.username === u)) {
            alert("Username already exists.");
            return;
        }

        this.users.push({ 
            id: this.nextUserId++, 
            username: u, 
            password: p, 
            role: 'member', 
            fullName: fn,
            rollNo: rn,
            age: parseInt(age),
            institute: institute,
            fines: 0, 
            borrowedBooks: [] 
        });
        this.saveData();
        alert("Account created successfully! Welcome to BookSpace.");
        this.toggleAuth('loginSection');
    },

    logout() {
        this.currentUser = null;
        document.getElementById('appWrapper').classList.add('hidden');
        document.getElementById('authWrapper').classList.remove('hidden');
    },

    filterBooks() {
        const query = document.getElementById('searchInput').value.toLowerCase();
        const cat = document.getElementById('categoryFilter').value;
        const status = document.getElementById('statusFilter').value;

        const list = this.books.filter(b => {
            const matchesSearch = b.title.toLowerCase().includes(query)
                || b.author.toLowerCase().includes(query)
                || (b.isbn || '').toLowerCase().includes(query);
            const matchesCat = cat === 'all' || b.category === cat;
            const avail = (b.totalStock || 1) - (b.borrowedCount || 0);
            const matchesStatus = status === 'all'
                || (status === 'available' ? avail > 0 : avail <= 0);
            return matchesSearch && matchesCat && matchesStatus;
        });

        this.renderBooksTable(list);
    },


    renderBooksTable(list) {
        const tbody = document.getElementById('bookListTableBody');
        tbody.innerHTML = list.map(b => {
            const total = b.totalStock || 1;
            const borrowed = b.borrowedCount || 0;
            const avail = total - borrowed;
            const pct = Math.max(0, (avail / total) * 100);
            const canBorrow = avail > 0;
            return `
                <tr>
                    <td>
                        <div style="font-weight:600; font-size:15px; color:var(--text)">${b.title}</div>
                        <div style="font-size:12px; color:var(--text-muted)">by ${b.author}</div>
                    </td>
                    <td><span class="badge" style="background:rgba(255,107,107,0.1); color:var(--primary)">${b.category || 'General'}</span></td>
                    <td>${b.dateAdded ? new Date(b.dateAdded).toLocaleDateString() : 'N/A'}</td>
                    <td>
                        <div style="font-size:14px; font-weight:600">${avail} / ${total} available</div>
                        <div class="stock-bar"><div class="stock-progress" style="width:${pct}%"></div></div>
                    </td>
                    <td>
                        <button class="${canBorrow ? '' : 'secondary'}" ${canBorrow ? '' : 'disabled'} onclick="app.borrowBook(${b.id})" style="padding:6px 12px; font-size:12px">
                            ${canBorrow ? 'Borrow' : 'All Checked Out'}
                        </button>
                    </td>
                </tr>
            `;
        }).join('') || '<tr><td colspan="5" style="text-align:center; padding:40px; color:var(--text-muted)">No books matching your search.</td></tr>';
    },

    borrowBook(id) {
        const book = this.books.find(b => b.id === id);
        if (!book) return;

        // Ensure borrowedCount field exists
        if (book.borrowedCount === undefined) book.borrowedCount = 0;
        const avail = book.totalStock - book.borrowedCount;
        if (avail <= 0) { alert("All copies are currently checked out."); return; }

        const active = this.currentUser.borrowedBooks.filter(l => !l.returned).length;
        if (active >= 3) { alert("Maximum 3 books can be borrowed at once."); return; }

        const now = new Date();
        const due = new Date(); due.setDate(due.getDate() + 14);

        book.borrowedCount++;
        book.available = book.borrowedCount < book.totalStock;
        book.borrowerName = this.currentUser.username;
        book.borrowCount = (book.borrowCount || 0) + 1;

        this.currentUser.borrowedBooks.push({
            bookId: book.id,
            title: book.title,
            author: book.author,
            borrowDate: now.toISOString(),
            dueDate: due.toISOString(),
            returned: false,
            returnDate: null
        });

        this.saveData();
        alert(`Successfully borrowed "${book.title}"! Due by ${due.toLocaleDateString()}`);
        this.filterBooks();
    },

    renderMyBooks() {
        const tbody = document.getElementById('borrowedBooksTableBody');
        const loans = this.currentUser.borrowedBooks; // Show all history
        
        tbody.innerHTML = loans.map(l => {
            const borrowDateStr = l.borrowDate ? new Date(l.borrowDate).toLocaleDateString() : 'N/A';
            const dueDateStr = l.dueDate ? new Date(l.dueDate).toLocaleDateString() : 'N/A';
            const returnDateStr = l.returnDate ? new Date(l.returnDate).toLocaleDateString() : 'Pending';

            return `
                <tr>
                    <td>
                        <div style="font-weight: 500;">${l.title}</div>
                        <small style="color:var(--text-muted)">${l.author || 'N/A'}</small>
                    </td>
                    <td>${borrowDateStr}</td>
                    <td>${dueDateStr}</td>
                    <td>
                        <span class="badge ${l.returned ? 'badge-success' : 'badge-danger'}">
                            ${l.returned ? 'Returned' : 'Active'}
                        </span>
                    </td>
                    <td>
                        ${!l.returned ? `<button class="secondary" onclick="app.returnBook(${l.bookId})" style="padding:4px 10px; font-size:11px">Return Book</button>` : `<small style="color:var(--success)">Finished: ${returnDateStr}</small>`}
                    </td>
                </tr>
            `;
        }).reverse().join('') || '<tr><td colspan="5" style="text-align:center; padding:40px; color:var(--text-muted)">No borrow history.</td></tr>';
    },

    returnBook(id) {
        const book = this.books.find(b => b.id === id);
        const loan = this.currentUser.borrowedBooks.find(l => l.bookId === id && !l.returned);
        if (!book || !loan) { alert("Could not find loan record."); return; }

        const due = new Date(loan.dueDate);
        const now = new Date();

        if (now > due) {
            const days = Math.ceil((now - due) / (1000 * 60 * 60 * 24));
            this.currentUser.fines += (days * 10);
            alert(`Book returned late! Fine of ₹${days * 10} recorded.`);
        }

        loan.returned = true;
        loan.returnDate = now.toISOString();

        // Decrement borrowedCount, update available flag
        if (book.borrowedCount === undefined) book.borrowedCount = 0;
        book.borrowedCount = Math.max(0, book.borrowedCount - 1);
        book.available = book.borrowedCount < book.totalStock;
        if (book.borrowedCount === 0) book.borrowerName = null;

        this.saveData();
        this.renderMyBooks();
        alert("Thank you! Book returned to library inventory.");
    },

    renderFines() {
        const f = this.currentUser.fines || 0;
        document.getElementById('finesInfo').innerHTML = `
            <div class="stat-card" style="text-align:center; padding:50px">
                <span>Outstanding Fine</span>
                <div class="value" style="font-size:60px; color:${f > 0 ? 'var(--primary)' : 'var(--success)'}">₹${f}</div>
                ${f > 0 ? `<button onclick="app.payFine()" style="margin-top:20px">Pay now via UPI/Card</button>` : '<p style="color:var(--success); margin-top:20px">No pending payments.</p>'}
            </div>
        `;
    },

    payFine() {
        if(confirm(`Pay ₹${this.currentUser.fines}?`)) {
            this.currentUser.fines = 0;
            this.saveData();
            this.renderFines();
        }
    },

    renderAdminStats() {
        const total = this.books.length;
        const out = this.books.filter(b => !b.available).length;
        const available = total - out;
        const members = this.users.filter(u => u.role === 'member').length;
        const rev = this.users.reduce((s, u) => s + (u.fines || 0), 0);
        
        document.getElementById('adminStats').innerHTML = `
            <div class="stat-card">
                <div style="font-size: 24px; margin-bottom: 5px;">📚</div>
                <span>Total Catalog</span>
                <div class="value">${total}</div>
                <small style="color: var(--text-muted)">Books in system</small>
            </div>
            <div class="stat-card">
                <div style="font-size: 24px; margin-bottom: 5px;">✅</div>
                <span>Available</span>
                <div class="value" style="color: var(--success)">${available}</div>
                <small style="color: var(--text-muted)">Ready for checkout</small>
            </div>
            <div class="stat-card">
                <div style="font-size: 24px; margin-bottom: 5px;">📤</div>
                <span>On Loan</span>
                <div class="value" style="color: var(--primary)">${out}</div>
                <small style="color: var(--text-muted)">Currently with members</small>
            </div>
            <div class="stat-card">
                <div style="font-size: 24px; margin-bottom: 5px;">💰</div>
                <span>Revenue</span>
                <div class="value">₹${rev}</div>
                <small style="color: var(--text-muted)">Unpaid fines</small>
            </div>
        `;
    },

    renderAdminBookTable() {
        const tbody = document.getElementById('adminBookTableBody');
        tbody.innerHTML = this.books.map(b => `
            <tr>
                <td>
                    <div style="font-weight: 600;">${b.title}</div>
                    <div style="font-size: 12px; color: var(--text-muted);">${b.author}</div>
                </td>
                <td>
                    <span class="badge ${b.available ? 'badge-success' : 'badge-danger'}">
                        ${b.available ? 'Available' : 'Borrowed'}
                    </span>
                </td>
                <td>
                    ${b.available ? '<span style="color: var(--text-muted); font-size: 12px;">—</span>' : `<span style="font-weight: 500;">${b.borrowerName}</span>`}
                </td>
                <td>
                    <div style="font-size: 14px;">${b.borrowCount || 0}</div>
                    <small style="font-size: 10px; color: var(--text-muted);">Total checkouts</small>
                </td>
                <td>
                    ${!b.available ? `<button class="secondary" style="font-size: 12px; padding: 5px 10px;" onclick="app.adminReturnBook(${b.id})">Force Return</button>` : '<span style="color: var(--text-muted); font-size: 12px;">No Actions</span>'}
                </td>
            </tr>
        `).join('');
    },

    adminReturnBook(id) {
        const book = this.books.find(b => b.id === id);
        if (!book || book.available) return;

        // Find user who has it
        const userWithBook = this.users.find(u => u.username === book.borrowerName);
        if (userWithBook) {
            const loan = userWithBook.borrowedBooks.find(l => l.bookId === id && !l.returned);
            if (loan) {
                // Return logic (same as user return but without assuming currentUser)
                const due = new Date(loan.dueDate);
                const now = new Date();
                if (now > due) {
                    const days = Math.ceil((now - due)/(1000*60*60*24));
                    userWithBook.fines += (days * 10);
                }
                loan.returned = true;
            }
        }

        book.available = true;
        book.borrowerName = null;
        this.saveData();
        this.renderAdminStats();
        this.renderAdminBookTable();
        alert(`Book "${book.title}" has been returned to inventory.`);
    },

    renderInventory() {
        const tbody = document.getElementById('inventoryTableBody');
        tbody.innerHTML = this.books.map(b => `
            <tr>
                <td>
                    <div style="font-weight:600">${b.title}</div>
                    <div style="font-size:12px; color:var(--text-muted)">${b.author}</div>
                </td>
                <td><span class="badge secondary">${b.category || 'General'}</span></td>
                <td><small>${b.isbn}</small></td>
                <td>
                    <div style="font-size:13px">${b.available ? 'In Stock' : 'On Loan'}</div>
                    <small style="color:var(--text-muted)">Copies: ${b.totalStock || 1}</small>
                </td>
                <td>
                    <button class="secondary" onclick="app.showEditBook(${b.id})" style="padding:4px 8px; font-size:11px">Edit</button>
                    <button class="danger" onclick="app.deleteBook(${b.id})" style="padding:4px 8px; font-size:11px; margin-left:5px">Del</button>
                </td>
            </tr>
        `).join('') || '<tr><td colspan="5" style="text-align:center; padding:40px">Empty inventory.</td></tr>';
    },

    showEditBook(id) {
        const book = this.books.find(b => b.id === id);
        if (!book) return;

        document.getElementById('editBookId').value = book.id;
        document.getElementById('bookTitle').value = book.title;
        document.getElementById('bookAuthor').value = book.author;
        document.getElementById('bookCategory').value = book.category || 'Fiction';
        document.getElementById('bookStockCount').value = book.totalStock || 1;

        document.getElementById('invActionTitle').textContent = "Update Existing Book";
        document.getElementById('addBookBtn').textContent = "Update Info";
        document.getElementById('cancelEditBtn').classList.remove('hidden');
    },

    resetBookForm() {
        document.getElementById('editBookId').value = '';
        document.getElementById('bookTitle').value = '';
        document.getElementById('bookAuthor').value = '';
        document.getElementById('bookStockCount').value = '';
        document.getElementById('invActionTitle').textContent = "Acquire New Title";
        document.getElementById('addBookBtn').textContent = "Add Book";
        document.getElementById('cancelEditBtn').classList.add('hidden');
        document.getElementById('addBookBtn').onclick = () => this.addBook();
    },

    updateBook() {
        const id = parseInt(document.getElementById('editBookId').value);
        const t = document.getElementById('bookTitle').value.trim();
        const a = document.getElementById('bookAuthor').value.trim();
        const c = document.getElementById('bookCategory').value;
        const s = document.getElementById('bookStockCount').value;

        if (!t || !a) return;

        const book = this.books.find(b => b.id === id);
        if (book) {
            book.title = t;
            book.author = a;
            book.category = c;
            book.totalStock = parseInt(s);
            this.saveData();
            this.renderInventory();
            this.resetBookForm();
            alert("Book updated successfully.");
        }
    },

    addBook() {
        const t = document.getElementById('bookTitle').value.trim();
        const a = document.getElementById('bookAuthor').value.trim();
        const c = document.getElementById('bookCategory').value;
        const s = document.getElementById('bookStockCount').value || 1;
        
        if (!t || !a) return;
        
        this.books.push({ 
            id: this.nextBookId++, 
            title: t, 
            author: a, 
            category: c,
            isbn: 'ISBN-' + Math.floor(1000 + Math.random() * 9000), 
            dateAdded: new Date().toISOString().split('T')[0],
            totalStock: parseInt(s),
            available: true, 
            borrowerName: null, 
            borrowCount: 0 
        });
        
        this.saveData();
        this.renderInventory();
        document.getElementById('bookTitle').value = '';
        document.getElementById('bookAuthor').value = '';
    },

    deleteBook(id) {
        if(confirm("Delete book?")) {
            this.books = this.books.filter(b => b.id !== id);
            this.saveData();
            this.renderInventory();
        }
    },

    renderMembers() {
        document.getElementById('membersList').innerHTML = this.users.filter(u => u.role === 'member').map(m => `
            <div class="stat-card" style="display:flex; justify-content:space-between; align-items:center;">
                <div>
                    <div style="font-weight:700; font-size:16px">${m.fullName || m.username}</div>
                    <div style="font-size:12px; color:var(--text-muted); margin-bottom:5px">
                        ID: ${m.rollNo || 'N/A'} | ${m.institute || 'N/A'} | Age: ${m.age || 'N/A'}
                    </div>
                    <div style="font-size:13px; color:${m.fines > 0 ? 'var(--primary)' : 'var(--success)'}">
                        Outstanding Balance: ₹${m.fines}
                    </div>
                </div>
                ${m.fines > 0 ? `<button onclick="app.waiver(${m.id})" style="width:auto; padding:8px 20px; font-size:12px">Clear Dues</button>` : '<span style="color:var(--success); font-size:12px">Clear</span>'}
            </div>
        `).join('') || '<p style="text-align:center; padding:20px; color:var(--text-muted)">No members registered.</p>';
    },

    waiver(id) {
        this.users.find(u => u.id === id).fines = 0;
        this.saveData();
        this.renderMembers();
    }
};

document.addEventListener('DOMContentLoaded', () => app.init());
window.app = app;
